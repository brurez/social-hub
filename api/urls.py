from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path('signup/', views.signup, name="signup"),
    path('signin/', views.signin, name="signin"),
    path('logout/', views.logout, name="logout"),
    path('current_user/', views.get_current_user, name="get_current_user"),
    path('user_profile/', views.user_profile, name="user_profile"),
    path('profiles/', views.profiles, name="profiles"),
]