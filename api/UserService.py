from api.models import User, Profile


class UserService:

    @staticmethod
    def get_all_users():
        users = User.objects.all()
        return users

    @staticmethod
    def get_user_by_id(user_id):
        user = User.objects.get(id=user_id)
        return user

    @staticmethod
    def get_user_by_email(email):
        return User.objects.get(email=email)

    @staticmethod
    def create_new_user(email, password, first_name, last_name):
        user = User.objects.create_user(username=email, email=email, password=password, first_name=first_name,
                                        last_name=last_name)
        user.save()
        user = User.objects.get(email=email)
        profile = Profile.objects.create(user=user)
        profile.save()
        return user, profile

    @staticmethod
    def update_user_profile(email, first_name, last_name, location, biography, profile_pic):
        user = User.objects.get(email=email)
        user.first_name = first_name
        user.last_name = last_name
        user.save()
        profile = Profile.objects.get(user=user)
        profile.location = location
        profile.biography = biography
        profile.profile_pic = profile_pic if profile_pic else profile.profile_pic
        profile.save()

    @staticmethod
    def get_user_profile(email):
        user = User.objects.get(email=email)
        profile = Profile.objects.get(user=user)
        return profile

    @staticmethod
    def get_profiles():
        profiles = Profile.objects.all()
        return profiles

    @staticmethod
    def get_profile(profile_id):
        profile = Profile.objects.get(id=profile_id)
        return profile
