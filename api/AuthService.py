from django.contrib.auth.models import User, auth

from api.UserService import UserService


class AuthService:
    @staticmethod
    def sign_up(email, first_name, last_name, password, password2):
        if password == password2:
            if User.objects.filter(email=email).exists():
                raise Exception('That email is being used')

            return UserService.create_new_user(email, password, first_name, last_name)

        else:
            raise Exception('Passwords do not match')

    @staticmethod
    def sign_in(request, email, password):
        user = auth.authenticate(username=email, password=password)
        if user is not None:
            auth.login(request, user)
            return True

        raise Exception('Invalid credentials')


    @staticmethod
    def logout(request):
        auth.logout(request)
        return True
