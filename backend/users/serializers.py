from rest_framework import serializers
from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer
from .models import User


class UserRegistrationSerializer(BaseUserCreateSerializer):
    """Custom user registration serializer"""
    
    class Meta(BaseUserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email', 'password', 'first_name', 'last_name', 'phone', 'role')
        extra_kwargs = {
            'password': {'write_only': True}
        }
    
    def create(self, validated_data):
        # Set default role to 'client' if not provided
        if 'role' not in validated_data:
            validated_data['role'] = 'client'
        
        user = User.objects.create_user(**validated_data)
        return user


class UserSerializer(serializers.ModelSerializer):
    """Serializer for user data retrieval"""
    avatar_url = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'phone', 'role', 'date_joined', 'avatar', 'avatar_url', 'company_name', 'inn', 'ogrn', 'kpp', 'legal_address')
        read_only_fields = ('id', 'date_joined')
    
    def get_avatar_url(self, obj):
        if obj.avatar:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.avatar.url)
            return obj.avatar.url
        return None

