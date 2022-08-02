from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.

User = get_user_model()


class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    biography = models.TextField(max_length=500, blank=True)
    profile_pic = models.ImageField(upload_to='profile_pics', default='profile_pics/default.png')
    location = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.user.username
