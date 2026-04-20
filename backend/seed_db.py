import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from django.contrib.auth import get_user_model
from crops.models import Crop
from land.models import Land
from marketplace.models import Product

User = get_user_model()

def seed_db():
    # 1. Create Users
    admin, _ = User.objects.get_or_create(username='admin', email='admin@agriai.com', role='ADMIN')
    if _: admin.set_password('admin123'); admin.save()
    
    farmer, _ = User.objects.get_or_create(username='farmer_joe', email='joe@farm.com', role='LANDOWNER', location='Punjab, India')
    if _: farmer.set_password('farmer123'); farmer.save()

    buyer, _ = User.objects.get_or_create(username='city_buyer', email='buyer@market.com', role='BUYER')
    if _: buyer.set_password('buyer123'); buyer.save()

    # 2. Create Crops
    crops_data = [
        {'name': 'Basmati Rice', 'ideal_soil': 'Clayey, Loamy', 'ideal_season': 'Monsoon', 'water_requirement': 'High', 'yield_estimate': 2.5, 'description': 'Premium long-grain rice with distinct aroma.'},
        {'name': 'Hard Red Wheat', 'ideal_soil': 'Loamy', 'ideal_season': 'Winter', 'water_requirement': 'Medium', 'yield_estimate': 1.8, 'description': 'High-protein wheat used for bread flour.'},
        {'name': 'Yellow Corn', 'ideal_soil': 'Sandy Loam', 'ideal_season': 'Summer', 'water_requirement': 'Medium', 'yield_estimate': 3.2, 'description': 'Sweet corn variety ideal for local markets.'},
        {'name': 'Soybeans', 'ideal_soil': 'Loamy', 'ideal_season': 'Monsoon', 'water_requirement': 'Medium', 'yield_estimate': 1.2, 'description': 'Oilseed crop with high protein content.'},
    ]
    for c_data in crops_data:
        Crop.objects.get_or_create(**c_data)

    # 3. Create Land for Farmer
    land, _ = Land.objects.get_or_create(
        owner=farmer,
        location='Ludhiana Farm A',
        size=15.5,
        soil_type='Loamy',
        water_source='Tube Well'
    )

    # 4. Create Products
    products_data = [
        {'seller': farmer, 'crop_name': 'Premium Basmati Rice', 'price_per_kg': 85.0, 'quantity_available': 500, 'location': 'Ludhiana', 'description': 'Naturally grown Basmati from our Punjab fields.'},
        {'seller': farmer, 'crop_name': 'Organic Wheat', 'price_per_kg': 42.0, 'quantity_available': 1200, 'location': 'Ludhiana', 'description': 'Pesticide-free wheat harvest.'},
    ]
    for p_data in products_data:
        Product.objects.get_or_create(**p_data)

    print("Database seeded successfully!")

if __name__ == "__main__":
    seed_db()
