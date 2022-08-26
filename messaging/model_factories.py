import factory

from api.model_factories import UserFactory
from messaging.models import Chat, Message


class ChatFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Chat


class MessageFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Message

    user = factory.SubFactory(UserFactory)
    chat = factory.SubFactory(ChatFactory)
    created_at = factory.Faker('date_time')
    text = factory.Faker('text')
