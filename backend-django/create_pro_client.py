import os
import django
import sys

# Add the project directory to the sys.path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'baa_legal_backend.settings')
django.setup()

from apps.core.models import User, Company, Subscription, Profile
from django.utils import timezone
from datetime import timedelta

def create_pro_client():
    email = 'pro@depa.ai'
    password = 'ProClient123!'
    
    print(f"Checking user {email}...")
    
    # 1. Create User
    if User.objects.filter(email=email).exists():
        print(f"User {email} already exists. Updating...")
        user = User.objects.get(email=email)
        user.set_password(password)
        user.role = 'client'
        user.first_name = 'Pro'
        user.last_name = 'Client'
        user.save()
    else:
        print(f"Creating user {email}...")
        user = User.objects.create_user(
            email=email,
            password=password,
            first_name='Pro',
            last_name='Client',
            role='client'
        )
    
    # 2. Ensure Profile exists
    Profile.objects.get_or_create(
        user=user,
        defaults={'position': 'CEO'}
    )
    
    # 3. Create Company
    print("Ensuring company exists...")
    company, created = Company.objects.get_or_create(
        owner=user,
        defaults={
            'name': 'DEPA Pro Business Ltd',
            'inn': '7701234567',
            'kpp': '770101001',
            'ogrn': '1027700123456',
            'legal_address': '123456, г. Москва, ул. Примерная, д. 1',
            'industry': 'IT Services',
            'employee_count': 50
        }
    )
    
    # 4. Create Active PRO Subscription
    print("Setting up PRO subscription...")
    sub, sub_created = Subscription.objects.get_or_create(
        company=company,
        defaults={
            'plan_code': 'pro',
            'status': 'active',
            'price_month': 4990,
            'renew_at': timezone.now() + timedelta(days=30)
        }
    )
    
    # Force update to ensure it's active PRO
    sub.status = 'active'
    sub.plan_code = 'pro'
    sub.price_month = 4990
    sub.renew_at = timezone.now() + timedelta(days=30)
    sub.save()

    print(f"\n✅ SUCCESS! PRO account ready:")
    print(f"Email: {email}")
    print(f"Password: {password}")
    print(f"Role: Client")
    print(f"Company: {company.name}")
    print(f"Subscription: PRO (Active)")
    print(f"Renew at: {sub.renew_at.strftime('%Y-%m-%d')}")
    print(f"Price: {sub.price_month} ₽/month")

if __name__ == '__main__':
    create_pro_client()
