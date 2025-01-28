from typing import Any
from django.db import models
from django.contrib.auth.models import UserManager, AbstractBaseUser, PermissionsMixin
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone
from django.contrib.auth import get_user_model
import uuid
from django.core.exceptions import ValidationError


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
    username = models.CharField(unique=True, max_length=30)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(blank=True, default='', unique=True)
    name = models.CharField(max_length=255, blank=True, default='')
    surname = models.CharField(max_length=255, blank=True, default='')
    avatar = models.ImageField(
        upload_to='images/avatar/', blank=True, max_length=100, default='images/avatar/default_avatar.png')
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_premium = models.BooleanField(default=False)
    otp = models.CharField(max_length=6, null=True, blank=True)
    otp_expiry = models.DateTimeField(blank=True, null=True)
    max_otp_try = models.CharField(max_length=2, default=3)
    otp_max_out = models.DateTimeField(blank=True, null=True)
    playlists = models.ManyToManyField('Playlist', blank=True)
    compositions = models.ManyToManyField('Composition', blank=True)

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


@receiver(post_save, sender=User)
def make_first_user_superuser(sender, instance, created, **kwargs):
    if created and User.objects.count() == 1:
        instance.is_superuser = True
        instance.is_staff = True
        instance.save()
        print(f"User {instance.username} is now a superuser!")


class Playlist(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_id = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    name = models.CharField(max_length=30, default='')
    compositions = models.ManyToManyField('Composition', blank=True)
    image = models.ImageField(
        upload_to='images/cover/', blank=True, max_length=100, default='images/cover/default_playlist.png')
    description = models.TextField()

    def __str__(self):
        return self.name


def validate_single_word(value):
    if ' ' in value.strip():
        raise ValidationError('Category must be a single word.')


class Composition(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_id = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    name = models.CharField(max_length=30, default='')
    is_premium = models.BooleanField(default=False)
    category = models.CharField(
        max_length=12,
        default='',
        validators=[validate_single_word]
    )
    text = models.TextField()
    image = models.ImageField(
        upload_to='images/cover/', blank=True, max_length=100, default='images/cover/default_composition.png')
    style = models.CharField(max_length=255, default='')
    audio_file = models.FileField(upload_to='audio/')
    playlist_id = models.ManyToManyField(
        Playlist, blank=True)

    def __str__(self):
        return self.name


class Notification(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=30, blank=False)
    description = models.TextField()
    image = models.ImageField(
        upload_to='images/notifications/', blank=True, max_length=100)
    users = models.ManyToManyField(
        User, blank=True)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
