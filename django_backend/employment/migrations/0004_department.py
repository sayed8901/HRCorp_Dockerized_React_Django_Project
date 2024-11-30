# Generated by Django 4.2.4 on 2024-08-24 17:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('employment', '0003_personalinfo_email'),
    ]

    operations = [
        migrations.CreateModel(
            name='Department',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('slug', models.SlugField(max_length=100, unique=True)),
            ],
        ),
    ]
