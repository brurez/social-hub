from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate
from rest_framework.test import APITestCase

from api.model_factories import UserFactory
from messaging.model_factories import ChatFactory, MessageFactory


class RestAPITestCase(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.user1 = UserFactory.create()
        self.user2 = UserFactory.create()
        self.another_user = UserFactory.create()
        self.chat = ChatFactory.create()
        self.chat.users.set([self.user1, self.user2])
        self.message1 = MessageFactory.create(chat=self.chat, user=self.user1)

    def test_get_chats(self):
        response = self.client.get('/messaging/users/' + str(self.user1.id) + '/chats/?user2_id=' + str(self.user2.id))
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        result = response.json()
        self.assertEqual(self.message1.text, result["data"][0]['messages'][0]['text'])
        self.assertEqual(self.message1.user.id, result["data"][0]['messages'][0]['user']['id'])
