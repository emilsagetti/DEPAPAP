
from apps.core.models import User, Company, Subscription
from django.utils import timezone
from datetime import timedelta

def create_free_client():
    email = 'free@depa.ai'
    password = 'free_password_123'
    
    print(f"Checking user {email}...")
    
    # 1. Create User
    if User.objects.filter(email=email).exists():
        print(f"User {email} already exists. Updating...")
        user = User.objects.get(email=email)
        user.set_password(password)
        user.role = 'client'
        user.save()
    else:
        print(f"Creating user {email}...")
        user = User.objects.create_user(
            email=email,
            password=password,
            role='client'
        )
    
    # 2. Create Company
    print("Ensuring company exists...")
    company, created = Company.objects.get_or_create(
        owner=user,
        defaults={
            'name': 'DEPA Free User Ltd',
            'inn': '2222222222',
            'industry': 'Retail'
        }
    )
    
    # 3. Create Subscription with EXPIRED status
    print("Setting subscription to expired/canceled...")
    sub, sub_created = Subscription.objects.get_or_create(
        company=company,
        defaults={
            'plan_code': 'start',
            'status': 'canceled',
            'price_month': 0,
            # Expired a month ago
            'renew_at': timezone.now() - timedelta(days=30)
        }
    )
    
    # Force update to ensure it's canceled
    sub.status = 'canceled'
    sub.plan_code = 'start'
    sub.renew_at = timezone.now() - timedelta(days=30)
    sub.save()

    print(f"\nSUCCESS! Free account ready:")
    print(f"Email: {email}")
    print(f"Password: {password}")
    print(f"Subscription: Canceled/Expired")

create_free_client()
