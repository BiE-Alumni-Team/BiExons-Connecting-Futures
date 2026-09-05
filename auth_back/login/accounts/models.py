from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    reg_no = models.CharField(max_length=20, unique=True)
    id_no = models.CharField(max_length=20, unique=True)
    session = models.CharField(max_length=20)
    batch = models.CharField(max_length=20, blank=True, null=True)
    phone = models.CharField(max_length=15, blank=True, null=True)
    profile_photo = models.ImageField(upload_to='profile_photos/', blank=True, null=True)
    workplace = models.CharField(max_length=200, blank=True, null=True)
    designation = models.CharField(max_length=100, blank=True, null=True)
    is_verified = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.username} ({self.reg_no})"
