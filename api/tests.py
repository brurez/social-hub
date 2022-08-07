import os
import sys
import django
from rest_framework import status

from api.models import User

sys.path.append('/home/bruno/Code/bsc/social_hub')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'social_hub.settings')
django.setup()

from rest_framework.test import APIRequestFactory
from rest_framework.test import APITestCase


class RestAPITestCase(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory()


    def test_signup(self):
        response = self.client.post('/api/signup/',
                                    format='json',
                                    data={'email': 'test@email.com', 'firstName': 'Testfirst',
                                          'lastName': 'Testlast', 'password': 'testpassword',
                                          'password2': 'testpassword'})
        self.assertEqual(status.HTTP_201_CREATED, response.status_code)
        user = User.objects.get(email='test@email.com')
        self.assertEqual('test@email.com', user.username)
        self.assertEqual('test@email.com', user.email)
        self.assertEqual('Testfirst', user.first_name)
        self.assertEqual('Testlast', user.last_name)
        # hashed password is stored in the database
        self.assertGreater(len(user.password), 16)

