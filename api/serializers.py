from rest_framework import serializers

from api.models import User, Profile, StatusPost


class UserInputSerializer(serializers.Serializer):
    email = serializers.EmailField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    password = serializers.CharField()
    password2 = serializers.CharField()

    # validates if password and password2 are the same
    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError({"password": "Passwords don't match"})
        return data


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
