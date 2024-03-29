from rest_framework import serializers
from .models import RentAppUsers, Category, Product, Invoice

# Creating serializer for the models

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model= RentAppUsers
        fields=('__all__')

class CategorySerializer(serializers.ModelSerializer):   

    class Meta:
        model= Category
        fields=('__all__')

class ProductSerializer(serializers.ModelSerializer): 

    class Meta:
        model= Product
        fields=('__all__')

class InvoiceSerializer(serializers.ModelSerializer):
    
    class Meta:
        model= Invoice
        fields=('__all__')





    
       