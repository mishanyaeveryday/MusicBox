from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import *

urlpatterns = [
    path('users/', get_user, name='get_user'),
    path('users/create/', create_user, name='create_user'),
    path('users/login/', login, name='login'),
    path('users/verify_otp/', VerifyOTPView.as_view(), name='VerifyOTPView'),
    path('users/<uuid:pk>/', user_detail, name='user_detail'),
    path('playlists/', get_playlists, name='get_playlists'),
    path('playlists/create/', create_playlist, name='create_playlist'),
    path('playlists/<uuid:pk>/', playlist_detail, name='playlist_detail'),
    path('playlists/<uuid:pk>/compositions/',
         get_compositions_from_playlist, name='get_compositions_from_playlist'),
    path('compositions/', get_compositions, name='get_compositions'),
    path('compositions/cat/<str:category>', get_compositions_by_category,
         name='get_compositions_by_category'),
    path('compositions/create/', create_composition, name='create_composition'),
    path('compositions/<uuid:pk>/', composition_detail, name='composition_detail'),
    path('history/', get_history, name='get_history'),
    path('users/<uuid:pk>/notification/',
         get_notifications, name='get_notifications'),
    path('notification/<uuid:pk>', notification_detail,
         name='notification_detail'),
    path('history/create/', create_history, name='create_history'),
    path('history/<uuid:pk>/', history_detail, name='history_detail'),
    path('token/', validate_token, name='validate_token()'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
