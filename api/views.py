from django.contrib import messages
from django.http import HttpResponse
from api.ApiResponse import ApiResponse
from api.AuthService import AuthService
from api.models import User
from rest_framework.decorators import api_view
from rest_framework import status


# Create your views here.


def index(request):
    return HttpResponse('This is the API root path')


@api_view(['POST'])
def signup(request):
    email = request.data['email']
    first_name = request.data['firstName']
    last_name = request.data['lastName']
    password = request.data['password']
    password2 = request.data['password2']

    try:
        AuthService.sign_up(email, first_name, last_name, password, password2)
        return ApiResponse(status=status.HTTP_201_CREATED)
    except Exception as e:
        return ApiResponse(str(e), status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def signin(request):
    username = request.POST['username']
    email = request.POST['email']
