# Generated by Django 4.2.4 on 2024-08-25 05:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('employment', '0007_alter_employmentinfo_probation_period_months'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employmentinfo',
            name='probation_period_months',
            field=models.IntegerField(choices=[(6, 6), (3, 3)], default=6),
        ),
    ]