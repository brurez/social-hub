from django.contrib.auth.models import User, auth
from rest_framework import status

from api.ApiError import ApiError
from api.UserService import UserService


# Module to handle authentication
class AuthService:
    # returns the user logged in if any
    @staticmethod
    def get_current_user(request):
        if request.user.is_authenticated:
            return request.user

        raise ApiError('Unauthorized', status.HTTP_401_UNAUTHORIZED)

    # creates a new user
    @staticmethod
    def sign_up(email, first_name, last_name, password, password2):
        if password == password2:
            if User.objects.filter(email=email).exists():
                raise ApiError('That email is being used', status.HTTP_400_BAD_REQUEST)

            return UserService.create_new_user(email, password, first_name, last_name)

        else:
            raise ApiError('Passwords do not match', status.HTTP_400_BAD_REQUEST)

    # logs in a user
    @staticmethod
    def sign_in(request, email, password):
        user = auth.authenticate(username=email, password=password)
        if user is not None:
            auth.login(request, user)
            return True

        raise ApiError('Invalid credentials', status.HTTP_401_UNAUTHORIZED)

    # logs out a user
    @staticmethod
    def logout(request):
        auth.logout(request)
        return True
