# Generated by Django 4.0.5 on 2022-09-15 03:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0005_alter_provisionalcertificate_chairman_status_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='testTable',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20)),
                ('roll', models.CharField(max_length=20)),
                ('subject', models.CharField(max_length=20)),
            ],
        ),
    ]
