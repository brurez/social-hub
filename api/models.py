from PIL import Image
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

    def save(self, *args, **kwargs):
        super().save()

        if not self.profile_pic:
            return

        img = Image.open(self.profile_pic.path)
        width, height = img.size  # Get dimensions

        if width > 300 and height > 300:
            # keep ratio but shrink down
            img.thumbnail((width, height))

        # check which one is smaller
        if height < width:
            # make square by cutting off equal amounts left and right
            left = (width - height) / 2
            right = (width + height) / 2
            top = 0
            bottom = height
            img = img.crop((left, top, right, bottom))

        elif width < height:
            # make square by cutting off bottom
            left = 0
            right = width
            top = 0
            bottom = width
            img = img.crop((left, top, right, bottom))

        if width > 300 and height > 300:
            img.thumbnail((300, 300))

        img.save(self.profile_pic.path)


class StatusPost(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100, blank=False)
    description = models.TextField(max_length=500, blank=True)
    image = models.ImageField(upload_to='post_pics', default='post_pics/default.png')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Friendship(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    friend_profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='friend_profile')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('profile', 'friend_profile')

    def __str__(self):
        return self.profile.user.first_name + ' ' + self.friend_profile.user.first_name
