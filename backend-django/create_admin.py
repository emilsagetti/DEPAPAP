import os
import django
import sys

# Add the project directory to the sys.path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'baa_legal_backend.settings')
django.setup()

from apps.core.models import User, Profile

def create_admin():
    email = 'admin@depa.ai'
    password = 'AdminPass123!'
    
    print(f"Checking user {email}...")
    
    if User.objects.filter(email=email).exists():
        print(f"User {email} already exists. Updating...")
        user = User.objects.get(email=email)
        user.set_password(password)
        user.role = 'admin'
        user.is_staff = True
        user.is_superuser = True
        user.save()
    else:
        print(f"Creating superuser {email}...")
        # create_superuser helps with is_staff/is_superuser
        user = User.objects.create_superuser(
            email=email,
            password=password,
            first_name='Admin',
            last_name='System'
        )
        user.role = 'admin'
        user.save()
    
    # Ensure profile exists
    Profile.objects.get_or_create(
        user=user,
        defaults={'position': 'System Administrator'}
    )

    print(f"\nSUCCESS! Admin account ready:")
    print(f"Email: {email}")
    print(f"Password: {password}")
    print(f"Role: Admin")

if __name__ == '__main__':
    create_admin()
