from api.models import StatusPost


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