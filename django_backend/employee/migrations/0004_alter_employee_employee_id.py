# Generated by Django 4.2.4 on 2024-08-24 09:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('employee', '0003_alter_employee_employee_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employee',
            name='employee_id',
            field=models.CharField(editable=False, max_length=10, primary_key=True, serialize=False),
        ),
    ]