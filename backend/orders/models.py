from django.db import models
from django.conf import settings


class Order(models.Model):
    """Order model for legal services"""
    
    SERVICE_TYPES = [
        ('consultation', 'Консультация'),
        ('outsourcing', 'Правовой аутсорсинг'),
        ('contract', 'Проверка договора'),
        ('crisis', 'Антикризисное управление'),
    ]
    
    STATUS_CHOICES = [
        ('pending', 'Ожидает обработки'),
        ('awaiting_payment', 'Ожидает оплаты'),
        ('in_progress', 'В работе'),
        ('completed', 'Завершен'),
    ]
    
    client = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='orders',
        verbose_name='Клиент'
    )
    title = models.CharField(
        max_length=255,
        verbose_name='Заголовок'
    )
    service_type = models.CharField(
        max_length=50,
        choices=SERVICE_TYPES,
        verbose_name='Тип услуги'
    )
    description = models.TextField(
        verbose_name='Описание'
    )
    status = models.CharField(
        max_length=50,
        choices=STATUS_CHOICES,
        default='pending',
        verbose_name='Статус'
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Дата создания'
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name='Дата обновления'
    )
    
    class Meta:
        verbose_name = 'Заказ'
        verbose_name_plural = 'Заказы'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.title} ({self.get_service_type_display()})"
