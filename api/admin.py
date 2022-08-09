from django.contrib import admin
from .models import Profile, StatusPost, Friendship

# Register your models here.

admin.site.register(Profile)
admin.site.register(StatusPost)
admin.site.register(Friendship)

