# Generated by Django 4.0.5 on 2022-10-22 06:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0020_provisionalcertificate_courier_delivery_place'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='otp',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]