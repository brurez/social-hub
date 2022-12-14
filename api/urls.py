from django.urls import path
from . import views
urlpatterns = [
    path('', views.index, name="index"),
    path('signin/', views.signin, name="signin"),
    path('logout/', views.logout, name="logout"),
    path('current_user/', views.get_current_user, name="get_current_user"),
    path('user_profile/', views.user_profile, name="user_profile"),
    path('users/<int:user_id>/', views.users, name="users"),
    path('users/', views.users, name="users"),
    path('profiles/<int:profile_id>/', views.profiles, name="profiles"),
    path('profiles/', views.profiles, name="profiles"),
    path('profiles/search/', views.search_profiles, name="search_profiles"),
    path('profiles/<int:profile_id>/status_posts/', views.profile_status_posts, name="profile_status_posts"),
    path('profiles/<int:profile_id>/friendships/', views.profile_friendships, name="profile_friendships"),
    path('status_posts/<int:status_post_id>/', views.status_posts, name="status_posts"),
    path('status_posts/', views.status_posts, name="status_posts"),
]

