from django.contrib import admin
from .models import User, Composition, Playlist, Notification
# Register your models here.


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'name', 'avatar', 'date_joined')


@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'description', 'image')
    filter_horizontal = ('users',)


@admin.register(Playlist)
class PlaylistAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'user_id', 'description', 'image_display')
    search_fields = ('name', 'user_id__email')
    list_filter = ('user_id',)
    filter_horizontal = ('compositions',)

    def image_display(self, obj):
        if obj.image:
            return f'<img src="{obj.image.url}" width="50" height="50" style="object-fit: cover;" />'
        return "No Image"
    image_display.allow_tags = True
    image_display.short_description = "Cover Image"


@admin.register(Composition)
class CompositionAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'user_id', 'is_premium',
                    'category', 'style', 'audio_file_display', 'image_display')
    search_fields = ('name', 'user_id__email', 'category', 'style')
    list_filter = ('is_premium', 'category', 'style')
    filter_horizontal = ('playlist_id',)

    def audio_file_display(self, obj):
        if obj.audio_file:
            return f'<a href="{obj.audio_file.url}" target="_blank">Listen</a>'
        return "No Audio"
    audio_file_display.allow_tags = True
    audio_file_display.short_description = "Audio File"

    def image_display(self, obj):
        if obj.image:
            return f'<img src="{obj.image.url}" width="50" height="50" style="object-fit: cover;" />'
        return "No Image"
    image_display.allow_tags = True
    image_display.short_description = "Cover Image"
