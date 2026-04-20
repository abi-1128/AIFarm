from rest_framework import viewsets, permissions
from .models import Land
from .serializers import LandSerializer

class LandViewSet(viewsets.ModelViewSet):
    serializer_class = LandSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Land.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
