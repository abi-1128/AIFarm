from django.db import models
from django.conf import settings

class Land(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='lands')
    location = models.CharField(max_length=255)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    size = models.FloatField(help_text="Size in acres")
    soil_type = models.CharField(max_length=100)
    water_source = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Land at {self.location} ({self.size} acres)"
