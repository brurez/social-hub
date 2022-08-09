from api.models import Friendship, Profile


class ProfileService:
    @staticmethod
    def get_friends(profile_id):
        friend_profile_ids = Friendship.objects.filter(profile_id=profile_id).values_list('friend_profile_id',
                                                                                          flat=True)
        friends = Profile.objects.filter(id__in=friend_profile_ids)
        return friends

    @staticmethod
    def create_friendship(profile_id, friend_profile_id):
        Friendship.objects.create(profile_id=profile_id, friend_profile_id=friend_profile_id)
