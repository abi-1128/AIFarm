from rest_framework import serializers
from .models import Land

class LandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Land
        fields = '__all__'
        read_only_fields = ('owner',)
