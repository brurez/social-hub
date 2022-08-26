from django.urls import path
from . import views

urlpatterns = [
    path('users/<int:user1_id>/chats/', views.chats, name="chats"),
]