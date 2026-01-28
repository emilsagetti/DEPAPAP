from django.urls import path
from .views import InitPaymentView

urlpatterns = [
    path('init', InitPaymentView.as_view(), name='payment-init'),
]
