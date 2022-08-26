from asgiref.sync import sync_to_async

from messaging.models import Chat, Message


# Module to handle chat and messages
class ChatService:
    # creates or gets a chat room with the two users
    @staticmethod
    @sync_to_async
    def initialize_chat(user1_id, user2_id):
        chat = ChatService.get_chat(user1_id, user2_id)
        if chat is None:
            chat = ChatService.create(user1_id, user2_id)

        return chat

    # gets a chat room with the two users
    @staticmethod
    def get_chat(user1_id, user2_id):
        return Chat.objects.filter(users=user1_id).filter(users=user2_id).first()

    # creates a chat room with the two users
    @staticmethod
    def create(user1_id, user2_id):
        chat = Chat.objects.create()
        chat.users.add(user1_id, user2_id)
        chat.save()
        return chat

    # add a message to the given chat room
    @staticmethod
    @sync_to_async
    def add_message(chat, user_id, text):
        message = Message.objects.create(user_id=user_id, chat=chat, text=text)
        message.save()
        return message
