from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from land.views import LandViewSet
from crops.views import CropViewSet, RecommendationViewSet, TaskViewSet
from marketplace.views import ProductViewSet, OrderViewSet
from ai_mentor.views import ChatMentorViewSet
from weather.views import WeatherView

router = DefaultRouter()
router.register(r'lands', LandViewSet, basename='land')
router.register(r'crops', CropViewSet, basename='crop')
router.register(r'recommendations', RecommendationViewSet, basename='recommendation')
router.register(r'tasks', TaskViewSet, basename='task')
router.register(r'products', ProductViewSet, basename='product')
router.register(r'orders', OrderViewSet, basename='order')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('users.urls')),
    path('api/weather/', WeatherView.as_view(), name='weather'),
    path('api/chat/', ChatMentorViewSet.as_view({'post': 'create', 'get': 'list'}), name='chat'),
    path('api/', include(router.urls)),
]
