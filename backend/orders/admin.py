from django.contrib import admin
from .models import Order


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    """Admin configuration for Order model"""
    
    list_display = ['id', 'title', 'client', 'service_type', 'status', 'created_at']
    list_filter = ['status', 'service_type', 'created_at']
    search_fields = ['title', 'description', 'client__email', 'client__first_name', 'client__last_name']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Основная информация', {
            'fields': ('client', 'title', 'service_type', 'description')
        }),
        ('Статус', {
            'fields': ('status',)
        }),
        ('Временные метки', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
