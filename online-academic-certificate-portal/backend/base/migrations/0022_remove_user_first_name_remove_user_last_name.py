# Generated by Django 4.0.5 on 2022-10-22 07:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0021_user_otp'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='first_name',
        ),
        migrations.RemoveField(
            model_name='user',
            name='last_name',
        ),
    ]
