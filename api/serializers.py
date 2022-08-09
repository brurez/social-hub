from rest_framework import serializers

from api.models import User, Profile, StatusPost


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


class StatusPostSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True, many=False)

    class Meta:
        model = StatusPost
        fields = ('id', 'title', 'description', 'image', 'created_at', 'user')
        depth = 1