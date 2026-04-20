import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from crops.models import Crop
from marketplace.models import Product
from users.models import User

def seed():
    # 1. Crops
    crops_data = [
        {
            'name': 'Basmati Rice',
            'ideal_soil': 'Clayey, Silty Clay',
            'ideal_season': 'Monsoon',
            'water_requirement': 'High',
            'yield_estimate': 2.5,
            'description': 'Premium long-grain high-yield rice variety.'
        },
        {
            'name': 'Sharbati Wheat',
            'ideal_soil': 'Loamy, Well-drained',
            'ideal_season': 'Winter',
            'water_requirement': 'Medium',
            'yield_estimate': 1.8,
            'description': 'Elite wheat variety known for texture and quality.'
        },
        {
            'name': 'Yellow Maize',
            'ideal_soil': 'Sandy Loam',
            'ideal_season': 'Summer',
            'water_requirement': 'Medium',
            'yield_estimate': 3.2,
            'description': 'Hybrid corn optimized for industrial and fodder use.'
        }
    ]

    for c_data in crops_data:
        Crop.objects.get_or_create(name=c_data['name'], defaults=c_data)
        print(f"Ensured crop: {c_data['name']}")

    # 2. Marketplace Products
    seller, _ = User.objects.get_or_create(username='farmer_joe', defaults={'email': 'joe@farm.com', 'role': 'LANDOWNER'})
    
    products_data = [
        {
            'seller': seller,
            'crop_name': 'Basmati Rice Premium (Extra Long)',
            'price_per_kg': 120,
            'quantity_available': 500,
            'location': 'Dehradun Valley, India',
            'description': 'Aged 2 years, naturally fragrant high-grade rice.',
            'image_url': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=2000&auto=format&fit=crop'
        },
        {
            'seller': seller,
            'crop_name': 'Organic Sharbati Wheat Flour',
            'price_per_kg': 65,
            'quantity_available': 1200,
            'location': 'Madhya Pradesh, India',
            'description': 'Sustainably farmed, stone-ground for nutrition.',
            'image_url': 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=2000&auto=format&fit=crop'
        },
        {
            'seller': seller,
            'crop_name': 'Sweet Golden Maize',
            'price_per_kg': 45,
            'quantity_available': 2000,
            'location': 'Maharashtra, India',
            'description': 'High-protein yellow maize for export.',
            'image_url': 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=2000&auto=format&fit=crop'
        }
    ]

    for p_data in products_data:
        Product.objects.get_or_create(crop_name=p_data['crop_name'], seller=p_data['seller'], defaults=p_data)
        print(f"Ensured product: {p_data['crop_name']}")

if __name__ == "__main__":
    seed()
