import os
import sys
import django
from rest_framework import status

from api.models import User
from .ProfileService import ProfileService
from .model_factories import *

sys.path.append('/home/bruno/Code/bsc/social_hub')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'social_hub.settings')
django.setup()

from rest_framework.test import APIRequestFactory, force_authenticate
from rest_framework.test import APITestCase


class RestAPITestCase(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.user = UserFactory.create()
        self.another_user = UserFactory.create()
        self.profile = ProfileFactory.create(user=self.user)
        self.another_profile = ProfileFactory.create(user=self.another_user)
        self.status_post = StatusPostFactory.create(user=self.user)

    def test_signup(self):
        response = self.client.post('/api/signup/',
                                    format='json',
                                    data={'email': 'test@email.com', 'first_name': 'Testfirst',
                                          'last_name': 'Testlast', 'password': 'testpassword',
                                          'password2': 'testpassword'})
        self.assertEqual(status.HTTP_201_CREATED, response.status_code)
        user = User.objects.get(email='test@email.com')
        self.assertEqual('test@email.com', user.username)
        self.assertEqual('test@email.com', user.email)
        self.assertEqual('Testfirst', user.first_name)
        self.assertEqual('Testlast', user.last_name)
        # hashed password is stored in the database
        self.assertGreater(len(user.password), 16)

    def test_update_user_profile(self):
        self.client.force_login(self.user)
        response = self.client.post('/api/user_profile/',
                                    format='json',
                                    data={'first_name': 'Testfirst',
                                          'last_name': 'Testlast', 'biography': 'Test biography', 'location': ''})
        # returns the correct status
        self.assertEqual(status.HTTP_200_OK, response.status_code)

        # saves the data correctly
        user = User.objects.get(email=self.user.email)
        profile = Profile.objects.get(user=user)
        self.assertEqual('Testfirst', user.first_name)
        self.assertEqual('Testlast', user.last_name)
        self.assertEqual('Test biography', profile.biography)
        self.assertEqual('', profile.location)

    def test_get_user_profile(self):
        self.client.force_login(self.user)
        response = self.client.get('/api/user_profile/')
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        result = response.json()
        self.assertEqual(self.user.first_name, result["data"]["user"]['first_name'])
        self.assertEqual(self.user.last_name, result["data"]["user"]['last_name'])
        self.assertEqual(self.user.email, result["data"]["user"]['email'])
        self.assertEqual(self.profile.biography, result["data"]['biography'])
        self.assertEqual(self.profile.location, result["data"]['location'])
        self.assertEqual(self.profile.profile_pic.url, result["data"]['profile_pic'])

    def test_get_current_user(self):
        self.client.force_login(self.user)
        response = self.client.get('/api/current_user/')
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        result = response.json()
        self.assertEqual(self.user.first_name, result["data"]['first_name'])
        self.assertEqual(self.user.last_name, result["data"]['last_name'])
        self.assertEqual(self.user.email, result["data"]['email'])

    def test_get_profiles(self):
        self.client.force_login(self.user)
        response = self.client.get('/api/profiles/')
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        result = response.json()
        self.assertEqual(self.user.first_name, result["data"][0]['user']['first_name'])
        self.assertEqual(self.user.last_name, result["data"][0]['user']['last_name'])
        self.assertEqual(self.user.email, result["data"][0]['user']['email'])
        self.assertEqual(self.profile.biography, result["data"][0]['biography'])
        self.assertEqual(self.profile.location, result["data"][0]['location'])
        self.assertEqual(self.profile.profile_pic.url, result["data"][0]['profile_pic'])

    def test_get_status_posts(self):
        self.client.force_login(self.user)
        response = self.client.get('/api/status_posts/')
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        result = response.json()
        self.assertEqual(self.status_post.description, result["data"][0]['description'])
        self.assertEqual(self.status_post.title, result["data"][0]['title'])
        self.assertEqual(self.status_post.image.url, result["data"][0]['image'])
        self.assertEqual(self.status_post.user.first_name, result["data"][0]['user']['first_name'])
        self.assertEqual(self.status_post.user.last_name, result["data"][0]['user']['last_name'])

    def test_get_status_post(self):
        self.client.force_login(self.user)
        response = self.client.get('/api/status_posts/' + str(self.status_post.id) + '/')
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        result = response.json()
        self.assertEqual(self.status_post.description, result["data"]['description'])
        self.assertEqual(self.status_post.title, result["data"]['title'])
        self.assertEqual(self.status_post.image.url, result["data"]['image'])
        self.assertEqual(self.status_post.user.first_name, result["data"]['user']['first_name'])
        self.assertEqual(self.status_post.user.last_name, result["data"]['user']['last_name'])

    def test_create_friendship(self):
        self.client.force_login(self.user)
        response = self.client.post('/api/profiles/' + str(self.profile.id) + '/friendships/',
                                    format='json',
                                    data={'friend_profile_id': self.another_profile.id})
        self.assertEqual(status.HTTP_201_CREATED, response.status_code)
        friendship = Friendship.objects.get(profile=self.profile, friend_profile=self.another_profile)
        self.assertIsNotNone(friendship)

    def test_get_friendships(self):
        ProfileService.create_friendship(self.profile.id, self.another_profile.id)
        self.client.force_login(self.user)
        response = self.client.get('/api/profiles/' + str(self.profile.id) + '/friendships/')
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        result = response.json()
        self.assertEqual(self.another_profile.id, result["data"][0]['id'])
        self.assertEqual(self.another_profile.user.first_name, result["data"][0]['user']['first_name'])
        self.assertEqual(self.another_profile.user.last_name, result["data"][0]['user']['last_name'])
