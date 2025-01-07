from django.apps import AppConfig
from django.utils import timezone
import django_seed.guessers


class CoreConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'core'

    def ready(self):
        import core.signals


def _timezone_format(value):
    return timezone.make_aware(value, timezone.get_current_timezone())


django_seed.guessers._timezone_format = _timezone_format
