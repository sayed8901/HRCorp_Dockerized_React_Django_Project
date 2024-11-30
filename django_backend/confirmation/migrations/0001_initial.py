# Generated by Django 4.2.4 on 2024-08-26 18:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('employment', '0011_employmentinfo_is_confirmed'),
        ('employee', '0004_alter_employee_employee_id'),
    ]

    operations = [
        migrations.CreateModel(
            name='ConfirmationInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('confirmation_effective_date', models.DateField()),
                ('confirmed_grade', models.PositiveSmallIntegerField(choices=[(1, 1), (2, 2), (3, 3), (4, 4), (5, 5), (6, 6), (7, 7), (8, 8), (9, 9), (10, 10), (11, 11), (12, 12)])),
                ('confirmed_step', models.PositiveSmallIntegerField(choices=[(1, 1), (2, 2), (3, 3), (4, 4), (5, 5), (6, 6), (7, 7), (8, 8), (9, 9), (10, 10)])),
                ('confirmed_designation', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='employment.designation')),
                ('employee', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='employee.employee')),
            ],
        ),
    ]