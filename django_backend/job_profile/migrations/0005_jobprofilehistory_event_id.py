# Generated by Django 4.2.4 on 2024-08-26 17:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('job_profile', '0004_alter_jobprofilehistory_event_type'),
    ]

    operations = [
        migrations.AddField(
            model_name='jobprofilehistory',
            name='event_id',
            field=models.CharField(blank=True, help_text='ID of the event related to this job profile history', max_length=10, null=True),
        ),
    ]
