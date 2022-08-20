import json
import time

from channels.generic.websocket import AsyncWebsocketConsumer


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.current_user = self.scope['user']
        self.user1_id = int(self.scope['url_route']['kwargs']['user1_id'])
        self.user2_id = int(self.scope['url_route']['kwargs']['user2_id'])

        if self.current_user.id != self.user1_id and self.current_user.id != self.user2_id:
            raise Exception("You are not authorized to send or receive messages")
        room_key = await self.create_room_name_from_ids()
        self.room_group_name = 'chat_' + room_key

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def create_room_name_from_ids(self):
        key_list = [self.user1_id, self.user2_id]
        key_list.sort()
        room_key = '-'.join([str(key) for key in key_list])
        return room_key

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        text = text_data_json['text']
        user_id = self.current_user.id

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chatroom_message',
                'text': text,
                'user_id': user_id,
                'created_at': int(time.time()),
            }
        )

    # Receive message from room group
    async def chatroom_message(self, event):
        text = event['text']
        user_id = event['user_id']
        created_at = event['created_at']

        await self.send(text_data=json.dumps({
            'text': text,
            'user_id': user_id,
            'created_at': created_at,
        }))

    pass
