# Generated by Django 4.2.4 on 2024-08-25 11:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('job_profile', '0002_alter_jobprofilehistory_event_type'),
    ]

    operations = [
        migrations.RenameField(
            model_name='jobprofilehistory',
            old_name='event_date',
            new_name='effective_date',
        ),
        migrations.RemoveField(
            model_name='jobprofilehistory',
            name='entry_date',
        ),
        migrations.AlterField(
            model_name='jobprofilehistory',
            name='event_type',
            field=models.CharField(choices=[('Joining', 'Joining'), ('Confirmation', 'Confirmation'), ('Promotion', 'Promotion'), ('Separation', 'Separation'), ('Transfer', 'Transfer'), ('Training', 'Training')], max_length=50),
        ),
    ]
