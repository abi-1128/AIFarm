import requests
import os
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions

class WeatherView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        lat = request.query_params.get('lat')
        lon = request.query_params.get('lon')
        
        # Simple mock weather for now
        # In real case: requests.get(f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={os.getenv('WEATHER_API_KEY')}")
        
        weather_data = {
            "location": f"{lat}, {lon}",
            "temp": 28.5,
            "condition": "Partly Cloudy",
            "humidity": 65,
            "wind_speed": 12,
            "forecast": [
                {"day": "Monday", "temp": 30, "condition": "Sunny"},
                {"day": "Tuesday", "temp": 27, "condition": "Rainy"},
                {"day": "Wednesday", "temp": 29, "condition": "Cloudy"},
            ],
            "alerts": ["Rain expected in next 24 hours. Plan irrigation accordingly."]
        }
        
        return Response(weather_data)
