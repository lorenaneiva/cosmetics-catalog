from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    date_added = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = 'Categoria'
        verbose_name_plural = 'Categorias'


class Brand(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    date_added = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name ='Marca'
        verbose_name_plural = 'Marcas'


class Product(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10,decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE)
    date_added = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name ='Produto'
        verbose_name_plural = 'Produtos'
    

    
class Image(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to="products/")
    alt_text = models.CharField(max_length=200, blank=True)
    def __str__(self):
        return self.alt_text
    class Meta:
        verbose_name ='Imagem'
        verbose_name_plural = 'Imagens'