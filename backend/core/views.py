from django.contrib.auth import login, get_user_model
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404
from django.http import HttpRequest
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .utils import send_otp, send_info_about_created_account
from .models import User, Playlist, Composition, History
from .serializer import UserSerializer, PlaylistSerializer, CompositionSerializer, HistorySerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils import timezone
from rest_framework.views import APIView
from rest_framework import status
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.exceptions import NotFound
import random
import datetime
from django.views.decorators.csrf import csrf_exempt
# Create your views here.


@api_view(['GET'])
def get_user(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def create_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        user.set_password(request.data['password'])
        user.save()

        refresh = RefreshToken.for_user(user)

        response_data = {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }

        send_info_about_created_account(user.email, user.username)

        return Response(response_data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login(request):
    try:
        user = get_user_model().objects.get(username=request.data['username'])

        if not user.check_password(request.data['password']):
            return Response({"detail": "Invalid credentials."}, status=status.HTTP_400_BAD_REQUEST)

        otp = random.randint(100000, 999999)
        otp_expiry = timezone.now() + datetime.timedelta(minutes=10)
        user.otp = otp
        user.otp_expiry = otp_expiry
        user.save()

        if send_otp(user.email, otp):
            print(f"OTP {otp} sent to {user.email}")
        else:
            return Response({"detail": "Failed to send OTP."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        refresh = RefreshToken.for_user(user)
        response_data = {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "user": {
                "username": user.username,
                "email": user.email
            }
        }

        return Response(response_data, status=status.HTTP_200_OK)

    except User.DoesNotExist:
        raise NotFound({"detail": "User not found"})


class VerifyOTPView(APIView):
    permission_classes = [AllowAny]

    @csrf_exempt
    def post(self, request, *args, **kwargs):
        otp = request.data.get('otp')
        email = request.data.get('email')

        if not otp or not email:
            return Response(
                {"detail": "OTP and email are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            user = User.objects.get(email=email)

            if user.otp != otp:
                return Response(
                    {"detail": "Invalid OTP."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            if user.otp_expiry < timezone.now():
                return Response(
                    {"detail": "OTP has expired."},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            user.otp = None
            user.otp_expiry = None
            user.max_otp_try = 3
            user.otp_max_out = None
            user.save()
            refresh = RefreshToken.for_user(user)
            return Response(
                {"access": str(refresh.access_token), "refresh": str(refresh)},
                status=status.HTTP_200_OK,
            )

        except ObjectDoesNotExist:
            return Response(
                {"detail": "User not found."},
                status=status.HTTP_404_NOT_FOUND,
            )


@api_view(['GET', 'PUT', 'DELETE'])
def user_detail(request, pk):
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = UserSerializer(user)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status. HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_playlists(request):
    playlists = Playlist.objects.all()
    serializer = PlaylistSerializer(playlists, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def create_playlist(request):
    serializer = PlaylistSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def playlist_detail(request, pk):
    try:
        playlist = Playlist.objects.get(pk=pk)
    except Playlist.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = PlaylistSerializer(playlist)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = PlaylistSerializer(playlist, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status. HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        playlist.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_compositions(request):
    compositions = Composition.objects.all()
    serializer = CompositionSerializer(compositions, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def create_composition(request):
    serializer = CompositionSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def composition_detail(request, pk):
    try:
        composition = Composition.objects.get(pk=pk)
    except Composition.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CompositionSerializer(composition)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = CompositionSerializer(composition, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status. HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        composition.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_history(request):
    histories = History.objects.all()
    serializer = HistorySerializer(histories, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def create_history(request):
    serializer = HistorySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def history_detail(request, pk):
    try:
        history = History.objects.get(pk=pk)
    except History.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = HistorySerializer(history)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = HistorySerializer(history, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status. HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        history.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
