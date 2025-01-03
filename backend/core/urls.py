from django.urls import path
from .views import *

urlpatterns = [
    path('users/', get_user, name='get_user'),
    path('profiles/', get_profile, name='get_profile'),
    path('users/create/', create_user, name='create_user'),
    path('users/login/', login, name='login'),
    path('users/login/test_token/', test_token, name='test_token'),
    path('users/<uuid:pk>/', user_detail, name='user_detail'),
    path('playlists/', get_playlists, name='get_playlists'),
    path('playlists/create/', create_playlist, name='create_playlist'),
    path('playlists/<uuid:pk>/', playlist_detail, name='playlist_detail'),
    path('compositions/', get_compositions, name='get_compositions'),
    path('compositions/create/', create_composition, name='create_composition'),
    path('compositions/<uuid:pk>/', composition_detail, name='composition_detail'),
    path('history/', get_history, name='get_history'),
    path('history/create/', create_history, name='create_history'),
    path('history/<uuid:pk>/', history_detail, name='history_detail'),
]
