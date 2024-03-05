from django.contrib import admin
from django.urls import path, include
from RentApp import views
from .views import create_invoice

urlpatterns = [
    path('register', views.register_user.as_view()),
    path('login', views.login_user.as_view()),
    path('category', views.add_category.as_view()),
    path('product', views.add_product.as_view()),
    path('categories', views.get_category.as_view()),
    path('invoice', create_invoice.as_view()),
    path('invoices', views.get_invoices_by_status.as_view()),
    path('<str:category>', views.get_products_by_category.as_view())
]
