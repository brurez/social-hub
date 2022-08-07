from django.http import HttpResponse

from api.ApiError import ApiError
from api.ApiResponse import ApiResponse
from api.AuthService import AuthService
from rest_framework.decorators import api_view
from rest_framework import status
from django.contrib.auth.decorators import login_required

# Create your views here.
from api.models import User
from api.serializers import UserSerializer


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
        AuthService.sign_in(request, email, password)
        return ApiResponse(status=status.HTTP_201_CREATED)
    except Exception as e:
        return ApiResponse(error_message=str(e), status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def signin(request):
    email = request.data['email']
    password = request.data['password']

    try:
        AuthService.sign_in(request, email, password)
        return ApiResponse()
    except Exception as e:
        return ApiResponse(error_message=str(e), status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def logout(request):
    AuthService.logout(request)
    return ApiResponse()


@api_view(['GET'])
def get_current_user(request):
    try:
        user = User.objects.get(username=request.user.username)
        if user is None:
            raise ApiError('User not found', status.HTTP_401_UNAUTHORIZED)

        serializer = UserSerializer(user)
        return ApiResponse(data=serializer.data)
    except ApiError as e:
        return ApiResponse(error_message=str(e), status=e.status)
