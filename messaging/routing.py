from django.urls import re_path

from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/chat/(?P<user1_id>\w+)/(?P<user2_id>\w+)/$', consumers.ChatConsumer.as_asgi()),
]