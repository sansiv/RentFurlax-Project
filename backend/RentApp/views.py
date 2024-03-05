from django.shortcuts import render
from django.http import JsonResponse
from .models import RentAppUsers, Category, Product, Invoice
from .serializers import UserSerializer, CategorySerializer, ProductSerializer, InvoiceSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

# Create your views here.

# To register user-details
class register_user(APIView):

    def post(self, request):
        username= request.data.get("username")
        password= request.data.get("password")
        email= request.data.get("email")

        if not username or not password:
            return Response({'message': 'Username and password are required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        if not email:
            return Response({'message': 'Email is required.'}, status=status.HTTP_400_BAD_REQUEST)
        

        serializer= UserSerializer(data= request.data)
        # Checking for existing usernames or emails
        try:    
            if serializer.is_valid():
                serializer.save()
                return Response({'message': 'success', 'data': serializer.data}, status=status.HTTP_200_OK)
        except:
            return Response({'message': 'Username or Email already exists.'}, status=status.HTTP_400_BAD_REQUEST)
         
        

# To login the user
class login_user(APIView):

    def post(self,request):
        username= request.data.get('username')
        password= request.data.get('password')

        # Performing Authentication for the RentAppUser
        try:
            user= RentAppUsers.objects.get(username= username, password= password)
            return JsonResponse({'message': 'Login Successful'}, status=status.HTTP_200_OK)
        except RentAppUsers.DoesNotExist:
            return JsonResponse({'message': 'Invalid username or password'}, status=status.HTTP_400_BAD_REQUEST)


# To add new categories
class add_category(APIView):
    #permission_classes = [IsAuthenticated] # admin-only use

    def post(self, request):
        serializer= CategorySerializer(data= request.data)     

        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'success', 'data': serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'error', 'data': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        

# To add new products       
class add_product(APIView):
    #permission_classes = [IsAuthenticated] # admin-only use

    def post(self, request):
        serializer= ProductSerializer(data= request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'success', 'data': serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'error', 'data': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


# To fetch the list of available categories 
class get_category(APIView):

    def get(self, request):
        categories= Category.objects.all() # Retrieves all the existing categories from DB
        serializer= CategorySerializer(categories, many=True)
        return Response({'message': 'success', 'data': serializer.data}, status=status.HTTP_200_OK)
    

# To fetch products by category
class get_products_by_category(APIView):
    
    def get(self, request, *args, **kwargs):
        by_category= kwargs.get("category")
        
        try:
            id= Category.objects.get(type=by_category).id # Retrieves the corresponding ID of the category from the category name provided.
            products= Product.objects.filter(category=id)  # Filters the products based on the category specified.
            serializer= ProductSerializer(products, many=True)
            return Response({'message': 'success', 'data': serializer.data}, status=status.HTTP_200_OK)
        except Category.DoesNotExist:
            return Response({'message': 'error', 'data': 'Invalid Category'}, status=status.HTTP_400_BAD_REQUEST)
        

# To create invoice for user
class create_invoice(APIView):
    
    #permission_classes = [IsAuthenticated] # admin-only use
    def post(self, request, *args, **kwargs):
        serializer = InvoiceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'success', 'data': serializer.data}, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors) 
            return Response({"message": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


# To fetch invoice by status or otherwise return all invoices     
class get_invoices_by_status(APIView):

    def get(self, request, *args, **kwargs):
        status_param = request.query_params.get('status') # Fetching the "status" param.

        # Fetch invoices based on the provided status, or return all invoices if status is not provided
        try:
            if status_param:
                invoices = Invoice.objects.filter(status=status_param)
            else:
                invoices = Invoice.objects.all()

            serializer = InvoiceSerializer(invoices, many=True)
            return Response({"message": "success", "data": serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)  

