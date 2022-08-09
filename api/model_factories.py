import factory
from .models import *


class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User

    email = factory.Faker('email')
    first_name = factory.Faker('first_name')
    last_name = factory.Faker('last_name')
    password = factory.Faker('password')


class ProfileFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Profile

    biography = factory.Faker('text')
    location = factory.Faker('city')
    profile_pic = factory.Faker('image_url')
    user = factory.SubFactory(UserFactory)


class StatusPostFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = StatusPost

    title = factory.Faker('sentence')
    description = factory.Faker('text')
    image = factory.Faker('image_url')
    user = factory.SubFactory(UserFactory)
    created_at = factory.Faker('date_time')
