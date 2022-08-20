from django.contrib.auth.models import User, auth
from rest_framework import status

from api.ApiError import ApiError
from api.UserService import UserService


class AuthService:
    @staticmethod
    def get_current_user(request):
        if request.user.is_authenticated:
            return request.user

        raise ApiError(status.HTTP_401_UNAUTHORIZED, 'Unauthorized')

    @staticmethod
    def sign_up(email, first_name, last_name, password, password2):
        if password == password2:
            if User.objects.filter(email=email).exists():
                raise ApiError('That email is being used')

            return UserService.create_new_user(email, password, first_name, last_name)

        else:
            raise ApiError('Passwords do not match', status.HTTP_400_BAD_REQUEST)

    @staticmethod
    def sign_in(request, email, password):
        user = auth.authenticate(username=email, password=password)
        if user is not None:
            auth.login(request, user)
            return True

        raise ApiError('Invalid credentials', status.HTTP_401_UNAUTHORIZED)

    @staticmethod
    def logout(request):
        auth.logout(request)
        return True
