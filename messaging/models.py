from django.db import models

# Create your models here.
from api.models import User


class Chat(models.Model):
    users = models.ManyToManyField(User)
    created_at = models.DateTimeField(auto_now_add=True)


class Message(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    text = models.TextField(max_length=500)
