
from apps.core.models import User
from django.utils import timezone

def check_users():
    for email in ['admin@depa.ai', 'client@depa.ai', 'free@depa.ai']:
        try:
            user = User.objects.get(email=email)
            print(f"--- {email} ---")
            if hasattr(user, 'company') and hasattr(user.company, 'subscription'):
                sub = user.company.subscription
                print(f"Plan: {sub.plan_code}")
                print(f"Status: {sub.status}")
                print(f"Renew At: {sub.renew_at}")
                print(f"Now: {timezone.now()}")
                is_active = sub.status == 'active' and (sub.renew_at is None or sub.renew_at > timezone.now())
                print(f"Is Active Logically? {is_active}")
            else:
                print("No subscription/company found")
        except User.DoesNotExist:
            print(f"{email} - Not found")

check_users()
