# Create your views here.
from rest_framework import status
from rest_framework.decorators import api_view

from messaging.ChatService import ChatService
from messaging.MessagingResponse import MessagingResponse
from messaging.serializers import ChatSerializer

# return a chat room with the two users
@api_view(['GET'])
def chats(request, user1_id):
    try:
        user2_id = request.GET.get('user2_id')
        chat = ChatService.get_chat(user1_id, user2_id)
        serializer = ChatSerializer(chat, many=False)
        return MessagingResponse(data=serializer.data)
    except Exception as e:
        return MessagingResponse(error_message=str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
