import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'baa_legal_backend.settings')
django.setup()

from apps.core.models import User, Profile, Company, Subscription

def create_client():
    email = 'new@depa.ai'
    password = 'password123'
    
    # 1. Delete if exists to fully flush state
    if User.objects.filter(email=email).exists():
        print(f"Deleting existing user {email}...")
        try:
            User.objects.get(email=email).delete()
        except Exception as e:
            print(f"Error deleting user: {e}")
        
    print(f"Creating fresh user {email}...")
    user = User.objects.create_user(
        email=email,
        password=password,
        role='client',
        first_name='Иван',
        last_name='Иванов',
        phone='+79001234567'
    )
    
    # 2. Update Profile (created by signal)
    print("Configuring profile...")
    profile, _ = Profile.objects.get_or_create(user=user)
    profile.position = 'Генеральный директор'
    profile.save()

    # 3. Update Company (created by signal)
    print("Configuring company...")
    # FIX: Use 'owner' instead of 'user'
    company, _ = Company.objects.get_or_create(owner=user)
    company.name = 'ООО "Стартап"'
    company.inn = '1234567890'
    company.industry = 'IT'
    company.save()

    # 4. Create Subscription (Active for "After Purchase" simulation)
    print("Setting up subscription...")
    # Clean up any existing sub just in case
    Subscription.objects.filter(company=company).delete()
    
    Subscription.objects.create(
        company=company,
        plan_code='business',
        status='active', # <--- Changed to active
        limits={'users': 5, 'docs': 100}
    )

    print(f"\nSUCCESS! Fresh Client account ready (Active Subscription):")
    print(f"Email: {email}")
    print(f"Password: {password}")
    print(f"Role: Client")

if __name__ == '__main__':
    create_client()
