from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('products', views.ProductViewSet)
router.register('categories', views.CategoryViewSet)
router.register('brands', views.BrandViewSet)
router.register('images', views.ImageViewSet)


urlpatterns = [
    path('api/', include(router.urls)) 
]
