from typing import Any
from django.db import models
from django.contrib.auth.models import UserManager, AbstractBaseUser, PermissionsMixin
from django.utils import timezone
from django.contrib.auth import get_user_model  # Добавьте этот импорт
import uuid


class CustomUserManager(UserManager):
    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError("You have not provided a valid e-mail address")

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_user(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        extra_fields.setdefault('is_premium', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_premium', True)
        return self._create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(blank=True, default='', unique=True)
    name = models.CharField(max_length=255, blank=True, default='')
    avatar = models.ImageField(
        upload_to='images/avatar/', blank=True, max_length=100)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_premium = models.BooleanField(default=False)

    date_joined = models.DateTimeField(default=timezone.now)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def get_name(self):
        return self.name


class Playlist(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255, default='')
    compositions = models.ManyToManyField('Composition', blank=True)
    image = models.ImageField(
        upload_to='images/cover/', blank=True, max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name


class Composition(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_id = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    name = models.CharField(max_length=255, default='')
    category = models.CharField(max_length=255, default='')
    time = models.DurationField()
    text = models.TextField()
    image = models.ImageField(
        upload_to='images/cover/', blank=True, max_length=100)
    style = models.CharField(max_length=255, default='')
    audio_file = models.FileField(upload_to='audio/')
    playlist_id = models.ForeignKey(
        Playlist, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.name


class History(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    time_of_listening = models.DateTimeField(auto_now_add=True)
    compositions = models.ManyToManyField('Composition', blank=True)

    def __str__(self):
        compositions_names = ", ".join(
            [composition.name for composition in self.compositions.all()])
        return f"Listening to: {compositions_names} at {self.time_of_listening}" if compositions_names else f"Listening at {self.time_of_listening}"
