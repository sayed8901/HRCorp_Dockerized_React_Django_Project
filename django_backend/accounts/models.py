from django.contrib.auth.models import AbstractUser
from django.db import models


# to implement & manage different types of user in our project
# step 1: we are inheriting & using AbstractUser from django
class CustomUser(AbstractUser):
    USER_TYPE_CHOICES = (
        ('admin', 'Admin'),
        ('power_user', 'Power_user'),
        ('standard_user', 'Standard_user'),
        ('viewer', 'Viewer'),
    )
    
    user_type = models.CharField(max_length = 20, choices = USER_TYPE_CHOICES, default = 'viewer')