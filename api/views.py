from django.contrib import messages
from django.http import HttpResponse
from django.shortcuts import redirect
from api.models import User


# Create your views here.


def index(request):
    return HttpResponse('This is the API root path')


def signup(request):
    if request.method == 'POST':
        username = request.POST['username']
        email = request.POST['email']
        password = request.POST['password']
        password2 = request.POST['password2']

        if password == password2:
            if User.objects.filter(username=username).exists():
                messages.error(request, 'That username is taken')
                return redirect('signup')
            elif User.objects.filter(email=email).exists():
                messages.error(request, 'That email is being used')
                return redirect('signup')
            else:
                user = User.objects.create_user(username=username, email=email, password=password)
                user.save()
                messages.success(request, 'You are now registered and can log in')
                return redirect('signin')
        else:
            messages.info(request, 'Passwords do not match')
