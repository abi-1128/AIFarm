from django.db import models
from django.conf import settings
from land.models import Land

class Crop(models.Model):
    name = models.CharField(max_length=100)
    ideal_soil = models.CharField(max_length=100)
    ideal_season = models.CharField(max_length=50) # Monsoon, Winter, Summer
    water_requirement = models.CharField(max_length=50) # High, Medium, Low
    yield_estimate = models.FloatField(help_text="Expected yield in tons per acre")
    description = models.TextField()

    def __str__(self):
        return self.name

class Recommendation(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    land = models.ForeignKey(Land, on_delete=models.CASCADE)
    crop = models.ForeignKey(Crop, on_delete=models.CASCADE)
    reason = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.crop.name} for {self.user.username}"

class Task(models.Model):
    recommendation = models.ForeignKey(Recommendation, on_delete=models.CASCADE, related_name='tasks')
    step_number = models.IntegerField()
    title = models.CharField(max_length=200)
    instruction = models.TextField()
    is_completed = models.BooleanField(default=False)
    scheduled_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"{self.title} - Step {self.step_number}"
