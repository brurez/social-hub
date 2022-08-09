from rest_framework import serializers

from api.models import User, Profile


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name')


class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True, many=False)

    class Meta:
        model = Profile
        fields = ('id', 'location', 'biography', 'profile_pic', 'user')
        depth = 1
