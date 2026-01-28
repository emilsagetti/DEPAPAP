
from apps.core.models import User, Subscription
from django.utils import timezone
from datetime import timedelta

def unlock_free_user():
    email = 'free@depa.ai'
    try:
        user = User.objects.get(email=email)
        company = user.company
        sub = company.subscription
        
        # Unlock
        sub.status = 'active'
        sub.plan_code = 'pro' # Give them Pro just in case
        sub.renew_at = timezone.now() + timedelta(days=365)
        sub.save()
        
        print(f"SUCCESS: User {email} is now UNLOCKED (Active Pro Subscription).")
    except User.DoesNotExist:
        print(f"User {email} not found.")
    except Exception as e:
        print(f"Error: {e}")

unlock_free_user()
