from django.contrib import admin

from messaging.models import Message, Chat

admin.site.register(Message)
admin.site.register(Chat)
# Register your models here.
