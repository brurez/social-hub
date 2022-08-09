from django.http import HttpResponse

from api.UserService import UserService
from api.ApiError import ApiError
from api.ApiResponse import ApiResponse
from api.AuthService import AuthService
from rest_framework.decorators import api_view
from rest_framework import status

# Create your views here.
from api.models import User
from api.serializers import UserSerializer, ProfileSerializer


def index(request):
    return HttpResponse('This is the API root path')


@api_view(['POST'])
def signup(request):
    email = request.data['email']
    first_name = request.data['first_name']
    last_name = request.data['last_name']
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
        if request.user.is_authenticated is False:
            raise ApiError('You need to be logged in', status.HTTP_401_UNAUTHORIZED)

        user = User.objects.get(email=request.user.email)
        if user is None:
            raise ApiError('User not found', status.HTTP_401_UNAUTHORIZED)

        serializer = UserSerializer(user)
        return ApiResponse(data=serializer.data)
    except ApiError as e:
        return ApiResponse(error_message=str(e), status=e.status)
    except Exception as e:
        return ApiResponse(error_message=str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST', 'GET'])
def user_profile(request):
    try:
        if request.user.is_authenticated is False:
            raise ApiError('You need to be logged in', status.HTTP_401_UNAUTHORIZED)
    except ApiError as e:
        return ApiResponse(error_message=str(e), status=e.status)

    email = request.user.email

    if request.method == 'POST':
        first_name = request.data['first_name']
        last_name = request.data['last_name']
        location = request.data['location']
        biography = request.data['biography']
        profile_pic = request.data.get('profile_pic')

        try:
            UserService.update_user_profile(email, first_name, last_name, location, biography,
                                            profile_pic)
            user = UserService.get_user_by_email(email)
            user_serializer = UserSerializer(user)
            return ApiResponse(data=user_serializer.data)
        except Exception as e:
            return ApiResponse(error_message=str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    if request.method == 'GET':
        try:
            profile = UserService.get_user_profile(email)
            profile_serializer = ProfileSerializer(profile)
            return ApiResponse(data=profile_serializer.data)

        except Exception as e:
            return ApiResponse(error_message=str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
