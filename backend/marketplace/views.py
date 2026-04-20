from django.db.models import Q
from rest_framework import viewsets, permissions, status
from rest_framework.exceptions import ValidationError
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Product, Order
from .serializers import ProductSerializer, OrderSerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(seller=self.request.user)
        
    @action(detail=False, methods=['get'])
    def my_listings(self, request):
        products = Product.objects.filter(seller=request.user)
        serializer = self.get_serializer(products, many=True)
        return Response(serializer.data)

class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'ADMIN':
            return Order.objects.all()
        # Users see orders where they are the buyer OR where they are the seller of the product
        return Order.objects.filter(Q(buyer=user) | Q(product__seller=user))

    def perform_create(self, serializer):
        product = serializer.validated_data['product']
        quantity = serializer.validated_data['quantity']
        
        if product.quantity_available < quantity:
            raise ValidationError("Not enough quantity available in stock.")
            
        total_price = product.price_per_kg * quantity
        
        # Deduct from inventory
        product.quantity_available -= quantity
        product.save()
        
        serializer.save(buyer=self.request.user, total_price=total_price)
