# Generated by Django 5.1.4 on 2025-01-12 13:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0008_alter_composition_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='composition',
            name='name',
            field=models.CharField(default='', max_length=12),
        ),
        migrations.AlterField(
            model_name='playlist',
            name='name',
            field=models.CharField(default='', max_length=12),
        ),
    ]
