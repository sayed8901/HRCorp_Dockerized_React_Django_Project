# Generated by Django 4.2.4 on 2024-08-24 05:09

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Employee',
            fields=[
                ('employee_id', models.CharField(max_length=10, primary_key=True, serialize=False)),
            ],
        ),
    ]