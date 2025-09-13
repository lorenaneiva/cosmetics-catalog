from django.shortcuts import render
from rest_framework import viewsets
from django.contrib.auth.models import User
from . import models
from . import serializers
from rest_framework import filters

class LoginViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = serializers.LoginSerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = models.Product.objects.order_by('-date_added')
    serializer_class = serializers.ProductSerializer 
    search_fields = ['=id','name','description','category__name','brand__name']
    ordering_fields = ['price']

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = models.Category.objects.order_by('-date_added')
    serializer_class = serializers.CategorySerializer

class BrandViewSet(viewsets.ModelViewSet):
    queryset = models.Brand.objects.order_by('-date_added')
    serializer_class = serializers.BrandSerializer

class ImageViewSet(viewsets.ModelViewSet):
    queryset = models.Image.objects.all()
    serializer_class = serializers.ImageSerializer

