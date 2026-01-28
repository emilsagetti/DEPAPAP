from rest_framework import serializers
from .models import Order


class OrderSerializer(serializers.ModelSerializer):
    """Serializer for Order model"""
    
    client_name = serializers.CharField(
        source='client.get_full_name',
        read_only=True
    )
    client_email = serializers.EmailField(
        source='client.email',
        read_only=True
    )
    service_type_display = serializers.CharField(
        source='get_service_type_display',
        read_only=True
    )
    status_display = serializers.CharField(
        source='get_status_display',
        read_only=True
    )
    
    class Meta:
        model = Order
        fields = [
            'id',
            'client',
            'client_name',
            'client_email',
            'title',
            'service_type',
            'service_type_display',
            'description',
            'status',
            'status_display',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'client', 'created_at', 'updated_at']
