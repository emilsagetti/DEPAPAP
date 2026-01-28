from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models
from django.utils import timezone


class UserManager(BaseUserManager):
    """Custom user manager for email-based authentication"""
    
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('role', 'admin')
        
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        
        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    """Custom user model with role-based access"""
    
    # Core fields
    email = models.EmailField(unique=True, verbose_name="Email")
    first_name = models.CharField(max_length=150, verbose_name="Имя")
    last_name = models.CharField(max_length=150, verbose_name="Фамилия")
    phone = models.CharField(max_length=20, blank=True, verbose_name="Телефон")
    
    # Role-based fields
    USER_ROLES = [
        ('client', 'Клиент'),
        ('lawyer', 'Юрист'),
        ('admin', 'Администратор'),
        ('content_manager', 'Контент-менеджер'),
        ('director', 'Руководитель')
    ]
    role = models.CharField(max_length=20, choices=USER_ROLES, default='client', verbose_name="Роль")
    
    # Status fields
    is_active = models.BooleanField(default=True, verbose_name="Активен")
    is_staff = models.BooleanField(default=False, verbose_name="Доступ в админку")
    date_joined = models.DateTimeField(default=timezone.now, verbose_name="Дата регистрации")
    
    # Lawyer-specific fields
    specialization = models.TextField(blank=True, verbose_name="Специализация")
    license_number = models.CharField(max_length=100, blank=True, verbose_name="Номер лицензии")
    bio = models.TextField(blank=True, verbose_name="О себе")
    
    # Profile photo
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True, verbose_name="Фото профиля")
    
    # Company fields (for clients)
    company_name = models.CharField(max_length=255, blank=True, verbose_name="Название компании")
    inn = models.CharField(max_length=12, blank=True, verbose_name="ИНН")
    ogrn = models.CharField(max_length=15, blank=True, verbose_name="ОГРН")
    kpp = models.CharField(max_length=9, blank=True, verbose_name="КПП")
    legal_address = models.TextField(blank=True, verbose_name="Юридический адрес")
    
    # Relations
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'role']
    
    objects = UserManager()
    
    class Meta:
        verbose_name = "Пользователь"
        verbose_name_plural = "Пользователи"
        ordering = ['-date_joined']
    
    def __str__(self):
        return f"{self.get_full_name()} ({self.get_role_display()})"
    
    def get_full_name(self):
        return f"{self.first_name} {self.last_name}".strip()
    
    def get_short_name(self):
        return self.first_name
