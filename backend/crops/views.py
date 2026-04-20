from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import Crop, Recommendation, Task
from .serializers import CropSerializer, RecommendationSerializer, TaskSerializer
from land.models import Land

class CropViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Crop.objects.all()
    serializer_class = CropSerializer
    permission_classes = [permissions.IsAuthenticated]

class RecommendationViewSet(viewsets.ModelViewSet):
    serializer_class = RecommendationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Recommendation.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # AI Logic to select crop
        land = serializer.validated_data['land']
        
        # Priority 1: Match soil exactly
        recommended_crop = Crop.objects.filter(ideal_soil__icontains=land.soil_type).first()
        
        # Priority 2: Try any crop if no match
        if not recommended_crop:
            recommended_crop = Crop.objects.first()
            
        if not recommended_crop:
             # This should ideally not happen if DB is seeded
             reason = "No suitable crops found for your land profile at this time."
             serializer.save(user=self.request.user, reason=reason)
             return

        reason = f"Based on your soil type ({land.soil_type}) and location ({land.location}), {recommended_crop.name} is the best fit."
        
        recommendation = serializer.save(user=self.request.user, crop=recommended_crop, reason=reason)
        
        # Auto-generate tasks
        Task.objects.create(
            recommendation=recommendation,
            step_number=1,
            title="Land Preparation",
            instruction=f"Plow the 100% of your {land.size} acres and apply 10 tons of organic manure per acre for {recommended_crop.name}."
        )
        Task.objects.create(
            recommendation=recommendation,
            step_number=2,
            title="Sowing Seeds",
            instruction=f"Sow seeds at a depth of 5cm with 30cm spacing."
        )

class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(recommendation__user=self.request.user)
