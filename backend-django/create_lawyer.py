from apps.core.models import User, Profile

def create_lawyer():
    email = 'lawyer@depa.ai'
    password = 'lawyer_password_123'
    
    print(f"Checking user {email}...")
    
    if User.objects.filter(email=email).exists():
        print(f"User {email} already exists. Updating...")
        user = User.objects.get(email=email)
        user.set_password(password)
        user.role = 'lawyer'
        user.save()
    else:
        print(f"Creating user {email}...")
        user = User.objects.create_user(
            email=email,
            password=password,
            role='lawyer',
            first_name='Александр',
            last_name='Петров'
        )
    
    # Ensure profile exists
    Profile.objects.get_or_create(
        user=user,
        defaults={'position': 'Senior Legal Counsel'}
    )

    print(f"\nSUCCESS! Lawyer account ready:")
    print(f"Email: {email}")
    print(f"Password: {password}")
    print(f"Role: Lawyer")

create_lawyer()
