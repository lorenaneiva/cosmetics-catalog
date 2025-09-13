from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from . import models
from django.contrib.auth.models import User

class LoginSerializer(serializers.ModelSerializer):
      class Meta:
            model = User
            fields = ('username','password')
class CategorySerializer(serializers.ModelSerializer):
      name = serializers.CharField(
            validators = [UniqueValidator(
                  queryset = models.Category.objects.all(),
                  message="já existe uma categoria com esse nome",
                  lookup='iexact' # trata 'Perfume' e 'perfume' como iguais
                  )])
      class Meta:
            model = models.Category
            fields = ('id','name', 'description', 'date_added')
            read_only_fields = ['id']  

class BrandSerializer(serializers.ModelSerializer):      
      name = serializers.CharField(
            validators = [UniqueValidator(
                  queryset = models.Brand.objects.all(),
                  message="já existe uma marca com esse nome",
                  lookup='iexact'
                  )])
      class Meta:
            model = models.Brand
            fields = ('id', 'name', 'description', 'date_added')

class ImageSerializer(serializers.ModelSerializer):

      class Meta:
            model = models.Image
            fields = ('id','product','image','alt_text')
            
class ProductSerializer(serializers.ModelSerializer):
            
      images = ImageSerializer(many=True,read_only=True)

      
      price = serializers.DecimalField(
            max_digits=10, decimal_places=2,
            min_value=0,
            error_messages={'invalid':'Digite um valor válido'} #caso digite caractere!=num
)
      class Meta:
            model = models.Product
            fields = ('id','name','description','price','category','brand','images')
      def validate_price(self,value):
            if value < 0: 
                  raise serializers.ValidationError('O valor deve ser maior que zero.')
            return value