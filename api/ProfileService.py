from django.db.models import Q

from api.models import Friendship, Profile, User


# Module to handle retrieval and changes on the Profile model
class ProfileService:
    # get all friends of a profile
    @staticmethod
    def get_friends(profile_id):
        friend_profile_ids = Friendship.objects.filter(profile_id=profile_id).values_list('friend_profile_id',
                                                                                          flat=True)
        friends = Profile.objects.filter(id__in=friend_profile_ids)
        return friends

    # creates a friendship between two profiles
    @staticmethod
    def create_friendship(profile_id, friend_profile_id):
        Friendship.objects.create(profile_id=profile_id, friend_profile_id=friend_profile_id)

    # returns all profiles where the name matches the search query
    @staticmethod
    def search_profiles_by_name(query):
        users = User.objects.filter(Q(first_name__icontains=query) | Q(last_name__icontains=query))[:10]
        profiles = Profile.objects.filter(user__in=users)
        return profiles
