from rest_framework import status

from api.ApiError import ApiError
from api.models import StatusPost, Profile


# Module to handle status posts
class StatusPostService:
    @staticmethod
    def get_status_post(status_post_id):
        return StatusPost.objects.get(id=status_post_id)

    @staticmethod
    def get_status_posts():
        return StatusPost.objects.all()

    @staticmethod
    def create_status_post(data):
        return StatusPost.objects.create(**data)

    @staticmethod
    def get_status_posts_by_profile_id(profile_id):
        profile = Profile.objects.get(id=profile_id)
        return StatusPost.objects.filter(user_id=profile.user_id)

    @staticmethod
    def update_status_post(post_id, data):
        status_post = StatusPost.objects.get(id=post_id)
        # checks if the user is the onwner of the post
        if status_post.user.id != data['user'].id:
            raise ApiError('Unauthorized', status.HTTP_401_UNAUTHORIZED)

        status_post.title = data['title']
        status_post.description = data['description']
        status_post.image = data['image']
        status_post.save()
        return status_post
