from rest_framework import serializers

from api.serializers import UserSerializer
from messaging.models import Chat, Message


class MessageSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False, read_only=True)

    class Meta:
        model = Message
        fields = ('id', 'text', 'created_at', 'user')
        depth = 1
        ordering = ['-created_at']


class ChatSerializer(serializers.ModelSerializer):
    messages = MessageSerializer(many=True)
    users = UserSerializer(many=True, read_only=True)

    class Meta:
        model = Chat
        fields = ('id', 'users', 'messages')
        depth = 2
