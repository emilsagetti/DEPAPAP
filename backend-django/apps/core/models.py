from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.utils.translation import gettext_lazy as _

class UserManager(BaseUserManager):
    """Define a model manager for User model with no username field."""

    def create_user(self, email, password=None, **extra_fields):
        """Create and save a User with the given email and password."""
        if not email:
            raise ValueError(_('The Email must be set'))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        if password:
            user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        """Create and save a SuperUser with the given email and password."""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))
        return self.create_user(email, password, **extra_fields)


class User(AbstractUser):
    username = None
    email = models.EmailField(_('email address'), unique=True)
    
    ROLE_CHOICES = (
        ('client', 'Client'),
        ('lawyer', 'Lawyer'),
        ('admin', 'Admin'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='client')
    phone = models.CharField(max_length=20, blank=True, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return self.email


class Company(models.Model):
    name = models.CharField(max_length=255)
    inn = models.CharField(max_length=12, blank=True, null=True)
    ogrn = models.CharField(max_length=15, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    industry = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    # Simple owner relationship for MVP
    owner = models.OneToOneField(User, on_delete=models.CASCADE, related_name='company')

    def __str__(self):
        return self.name


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    position = models.CharField(max_length=100, blank=True, null=True)
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    
    def __str__(self):
        return f"Profile of {self.user.email}"


class Subscription(models.Model):
    PLAN_CHOICES = (
        ('start', 'Start'),
        ('business', 'Business'),
        ('pro', 'Pro'),
    )
    STATUS_CHOICES = (
        ('trial', 'Trial'),
        ('active', 'Active'),
        ('canceled', 'Canceled'),
        ('expired', 'Expired'),
    )
    
    company = models.OneToOneField(Company, on_delete=models.CASCADE, related_name='subscription')
    plan_code = models.CharField(max_length=20, choices=PLAN_CHOICES, default='start')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='trial')
    price_month = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    started_at = models.DateTimeField(auto_now_add=True)
    renew_at = models.DateTimeField(blank=True, null=True)
    
    # Store limits as JSON
    limits = models.JSONField(default=dict) 
    # Store usage as JSON
    usage = models.JSONField(default=dict)

    def __str__(self):
        return f"{self.company.name} - {self.plan_code}"
