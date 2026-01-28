from django.db import models
from django.contrib.auth import get_user_model
from apps.core.models import Company

User = get_user_model()

class ServiceRequest(models.Model):
    STATUS_CHOICES = (
        ('pending', 'На рассмотрении'),
        ('in_progress', 'В работе'),
        ('done', 'Готово'),
        ('canceled', 'Отменено'),
        ('waiting_user', 'Ждем ответа'),
    )
    
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='requests')
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='created_requests')
    assigned_to = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='assigned_requests')
    
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    service_type = models.CharField(max_length=100)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.title} ({self.status})"


class Document(models.Model):
    CATEGORY_CHOICES = (
        ('statutory', 'Уставные'),
        ('contract', 'Договоры'),
        ('accounting', 'Бухгалтерия'),
        ('personnel', 'Кадры'),
        ('judicial', 'Судебное'),
        ('other', 'Другое'),
    )

    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='documents')
    uploaded_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='other')
    file = models.FileField(upload_to='documents/%Y/%m/')
    file_size = models.CharField(max_length=20, blank=True) # e.g. "2.4 MB"
    
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Thread(models.Model):
    STATUS_CHOICES = (
        ('active', 'Active'),
        ('closed', 'Closed'),
    )
    
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='threads')
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    
    subject = models.CharField(max_length=255)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    created_at = models.DateTimeField(auto_now_add=True)
    last_message_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.subject


class Message(models.Model):
    thread = models.ForeignKey(Thread, on_delete=models.CASCADE, related_name='messages')
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    
    text = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Message by {self.author} in {self.thread}"


class Invoice(models.Model):
    STATUS_CHOICES = (
        ('unpaid', 'Не оплачено'),
        ('paid', 'Оплачено'),
        ('pending', 'В обработке'),
    )
    
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='invoices')
    
    number = models.CharField(max_length=50)
    description = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='unpaid')
    date = models.DateField()
    file = models.FileField(upload_to='invoices/', blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Invoice {self.number} - {self.amount}"


class Transaction(models.Model):
    TYPE_CHOICES = (
        ('deposit', 'Пополнение'),
        ('write_off', 'Списание'),
    )
    
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='transactions')
    
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    description = models.CharField(max_length=255)
    date = models.DateTimeField()
    
    def __str__(self):
        return f"{self.getType_display()} {self.amount}"
