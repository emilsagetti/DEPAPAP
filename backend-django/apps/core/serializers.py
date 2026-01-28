from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Profile, Company, Subscription

User = get_user_model()

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('position', 'avatar')

class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = '__all__'

class CompanySerializer(serializers.ModelSerializer):
    subscription = SubscriptionSerializer(read_only=True)
    
    class Meta:
        model = Company
        fields = '__all__'

class UserCreateSerializer(BaseUserCreateSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email', 'password', 'first_name', 'last_name', 'phone')

class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)
    company = CompanySerializer(read_only=True)
    subscription_status = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'phone', 'role', 'profile', 'company', 'subscription_status')

    def get_subscription_status(self, obj):
        if hasattr(obj, 'company') and hasattr(obj.company, 'subscription'):
            return obj.company.subscription.status
        return None
