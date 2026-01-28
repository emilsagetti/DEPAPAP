from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from .models import Profile, Company, Subscription

User = get_user_model()

@receiver(post_save, sender=User)
def create_related_models(sender, instance, created, **kwargs):
    if created:
        # Create Profile
        Profile.objects.create(user=instance)
        
        # Create Company (placeholder name)
        company = Company.objects.create(
            name=f"Company of {instance.email}",
            owner=instance
        )
        
        # Create Subscription (Trial)
        Subscription.objects.create(
            company=company,
            plan_code='start',
            status='trial',
            limits={'requests': 3, 'consultations': 1, 'storage_gb': 1},
            usage={'requests': 0, 'consultations': 0, 'storage_gb': 0}
        )
