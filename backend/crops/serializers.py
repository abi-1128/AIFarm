from rest_framework import serializers
from .models import Crop, Recommendation, Task

class CropSerializer(serializers.ModelSerializer):
    class Meta:
        model = Crop
        fields = '__all__'

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'

class RecommendationSerializer(serializers.ModelSerializer):
    crop_details = CropSerializer(source='crop', read_only=True)
    tasks = TaskSerializer(many=True, read_only=True)

    class Meta:
        model = Recommendation
        fields = ('id', 'user', 'land', 'crop', 'reason', 'timestamp', 'crop_details', 'tasks')
        read_only_fields = ('user', 'timestamp', 'crop', 'reason')
