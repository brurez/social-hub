from django.http import HttpResponse

from api.ProfileService import ProfileService
from api.StatusPostService import StatusPostService
from api.UserService import UserService
from api.ApiError import ApiError
from api.ApiResponse import ApiResponse
from api.AuthService import AuthService
from rest_framework.decorators import api_view
from rest_framework import status

# Create your views here.
from api.models import User, Profile
from api.serializers import UserSerializer, ProfileSerializer, StatusPostSerializer


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
        profile = Profile.objects.get(user=user)
        if user is None:
            raise ApiError('User not found', status.HTTP_401_UNAUTHORIZED)

        serializer = UserSerializer(user)
        return ApiResponse(data={**serializer.data, "profile_id": profile.id})
    except ApiError as e:
        print(e)
        return ApiResponse(error_message=str(e), status=e.status)
    except Exception as e:
        print(e)
        return ApiResponse(error_message=str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def users(request, user_id):
    try:
        if request.method == 'GET':
            if user_id is None:
                users = UserService.get_all_users()
                serializer = UserSerializer(users, many=True)
                return ApiResponse(data=serializer.data)
            else:
                user = UserService.get_user_by_id(user_id)
                serializer = UserSerializer(user)
                return ApiResponse(data=serializer.data)

        if request.method == 'POST':
            email = request.data['email']
            first_name = request.data['first_name']
            last_name = request.data['last_name']
            password = request.data['password']
            password2 = request.data['password2']

            AuthService.sign_up(email, first_name, last_name, password, password2)
            AuthService.sign_in(request, email, password)
            return ApiResponse(status=status.HTTP_201_CREATED)

        if request.method == 'PUT':
            first_name = request.data['first_name']
            last_name = request.data['last_name']
            location = request.data['location']
            biography = request.data['biography']
            profile_pic = request.data.get('profile_pic')

            user = AuthService.get_current_user(request)
            email = user.email

            UserService.update_user_profile(email, first_name, last_name, location, biography,
                                            profile_pic)
            user = UserService.get_user_by_email(email)
            user_serializer = UserSerializer(user)
            return ApiResponse(data=user_serializer.data)

    except ApiError as e:
        print(e)
        return ApiResponse(error_message=str(e), status=e.status)
    except Exception as e:
        print(e)
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


@api_view(['GET'])
def profiles(request, profile_id=None):
    try:
        if profile_id is not None:
            one_profile = UserService.get_profile(profile_id)
            profile_serializer = ProfileSerializer(one_profile)
            return ApiResponse(data=profile_serializer.data)
        else:
            all_profiles = UserService.get_profiles()
            profile_serializer = ProfileSerializer(all_profiles, many=True)
            return ApiResponse(data=profile_serializer.data)
    except Exception as e:
        return ApiResponse(error_message=str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET', 'POST'])
def status_posts(request, status_post_id=None):
    try:
        if request.method == 'GET':
            if status_post_id is not None:
                one_status_post = StatusPostService.get_status_post(status_post_id)
                status_post_serializer = StatusPostSerializer(one_status_post)
                return ApiResponse(data=status_post_serializer.data)
            else:
                all_status_posts = StatusPostService.get_status_posts()
                status_post_serializer = StatusPostSerializer(all_status_posts, many=True)
                return ApiResponse(data=status_post_serializer.data)

        if request.method == 'POST':
            title = request.data['title']
            description = request.data['description']
            image = request.data.get('image')
            user = request.user
            StatusPostService.create_status_post(
                {"title": title, "description": description, "image": image, "user": user})
            return ApiResponse()
    except Exception as e:
        return ApiResponse(error_message=str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET', 'POST'])
def profile_friendships(request, profile_id):
    user = request.user
    try:
        if request.method == 'GET':
            profile = Profile.objects.get(id=profile_id)
            friend_profiles = ProfileService.get_friends(profile.id)
            serializer = ProfileSerializer(friend_profiles, many=True)
            return ApiResponse(data=serializer.data)

        if request.method == 'POST':
            profile = Profile.objects.get(user_id=user.id)
            if profile_id != profile.id:
                raise ApiError('You can only add friendships to your own profile', status.HTTP_401_UNAUTHORIZED)
            friend_profile_id = request.data['friend_profile_id']
            ProfileService.create_friendship(profile.id, friend_profile_id)
            return ApiResponse(status=status.HTTP_201_CREATED)
    except ApiError as e:
        print(e)
        return ApiResponse(error_message=str(e), status=e.status)
    except Exception as e:
        print(e)
        return ApiResponse(error_message=str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def search_profiles(request):
    try:
        query = request.GET.get('q')
        profiles = ProfileService.search_profiles_by_name(query)
        serializer = ProfileSerializer(profiles, many=True)
        return ApiResponse(data=serializer.data)
    except Exception as e:
        return ApiResponse(error_message=str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
