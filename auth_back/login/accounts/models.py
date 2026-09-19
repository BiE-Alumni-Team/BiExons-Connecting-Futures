from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models

class UserManager(BaseUserManager):
    def create_user(self, email, first_name, last_name, reg_no, id_no, session, password=None, **extra_fields):
        if not email:
            raise ValueError("Email is required")
        email = self.normalize_email(email)
        user = self.model(
            email=email,
            first_name=first_name,
            last_name=last_name,
            reg_no=reg_no,
            id_no=id_no,
            session=session,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, first_name, last_name, reg_no, id_no, session, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, first_name, last_name, reg_no, id_no, session, password, **extra_fields)



class User(AbstractBaseUser, PermissionsMixin):
    #   Basic Info
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    reg_no = models.CharField(max_length=20, unique=True)
    id_no = models.CharField(max_length=20, unique=True)
    session = models.CharField(max_length=20)
    batch = models.CharField(max_length=20, blank=True, null=True)
    
    #   Details or About
    phone = models.CharField(max_length=15, blank=True, null=True)
    profile_photo = models.ImageField(upload_to='profile_photos/', blank=True, null=True)
    workplace = models.CharField(max_length=200, blank=True, null=True)
    designation = models.CharField(max_length=100, blank=True, null=True)
    location = models.CharField(max_length=200, blank=True, null=True)
    about_me = models.TextField(blank=True, null=True)
    mentorship_available = models.BooleanField(default=False)
    job_referral_available = models.BooleanField(default=False)
    
    #   auth
    is_verified = models.BooleanField(default=False)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'reg_no', 'id_no', 'session']


    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.email})"

class Education(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='education')
    degree = models.CharField(max_length=200)
    institution = models.CharField(max_length=200)
    department = models.CharField(max_length=200, blank=True, null=True)
    specialization = models.CharField(max_length=300, blank=True, null=True)
    start_year = models.IntegerField()
    end_year = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return f"{self.degree} - {self.institution}"