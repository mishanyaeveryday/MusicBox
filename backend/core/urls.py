from django.urls import path
from .views import *

urlpatterns = [
    path('users/', get_user, name='get_user'),
    path('users/create/', create_user, name='create_user'),
    path('users/<uuid:pk>/', user_detail, name='user_detail'),
    path('playlists/', get_playlists, name='get_playlists'),
    path('playlists/create/', create_playlist, name='create_playlist'),
    path('playlists/<uuid:pk>/', playlist_detail, name='playlist_detail'),
]
