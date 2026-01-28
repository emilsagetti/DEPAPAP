from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ServiceRequestViewSet, DocumentViewSet, 
    ThreadViewSet, InvoiceViewSet, DashboardViewSet
)

router = DefaultRouter()
router.register(r'requests', ServiceRequestViewSet, basename='request')
router.register(r'documents', DocumentViewSet, basename='document')
router.register(r'threads', ThreadViewSet, basename='thread')
router.register(r'invoices', InvoiceViewSet, basename='invoice')
router.register(r'dashboard', DashboardViewSet, basename='dashboard')

urlpatterns = [
    path('', include(router.urls)),
]
