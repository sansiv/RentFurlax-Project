from django.db import models
from django.utils import timezone

# Create your models here.

# To register data on RentFlux App users
class RentAppUsers(models.Model):
    first_name= models.CharField(max_length=255)
    last_name= models.CharField(max_length=255)
    username= models.CharField(max_length=30)
    email= models.EmailField()
    phone= models.CharField(max_length=10)
    address= models.TextField()
    password= models.CharField(max_length=128)

    def __str__(self):
        return self.first_name+" "+ self.last_name
    

# To register different categories of products
class Category(models.Model):
    type= models.CharField(max_length=255, unique=True)
    imageurl= models.TextField()

    def __str__(self):
        return self.type


# To register different products and its properties
class Product(models.Model):
    name= models.CharField(max_length=255)
    description= models.TextField()
    condition= models.CharField(max_length=255)
    noofdays= models.IntegerField()
    category= models.ForeignKey(Category, on_delete=models.CASCADE)
    options= models.JSONField()
    rentaloptions= models.JSONField()

    def __str__(self):
        return self.name
    

# To register invoices for products  
class Invoice(models.Model):
    username= models.CharField(max_length=30, default='user')
    products = models.ManyToManyField(Product)
    products_details= models.JSONField(default=dict)
    generated_on= models.DateTimeField(default=timezone.now)
    status= models.CharField(max_length=50, choices=[
        ('ORDERED','Ordered'),
        ('CANCELLED', 'Cancelled'),
        ('DELIVERED', 'Delivered'),
    ])  
    total_amount= models.DecimalField(max_digits=10, decimal_places=2)
