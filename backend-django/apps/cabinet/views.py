from rest_framework import viewsets, status, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db.models import Count, Q
from django.shortcuts import get_object_or_404

from .models import ServiceRequest, Document, Thread, Message, Invoice, Transaction
from .serializers import (
    ServiceRequestSerializer, DocumentSerializer, 
    ThreadSerializer, MessageSerializer, 
    InvoiceSerializer, TransactionSerializer
)
from .permissions import IsOwnerOrCompany

class BaseCabinetViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrCompany]
    
    def get_queryset(self):
        # Filter by user's company
        if self.request.user.company:
            return self.model.objects.filter(company=self.request.user.company)
        return self.model.objects.none()

    def perform_create(self, serializer):
        # Auto-assign company and creator
        serializer.save(
            company=self.request.user.company,
            created_by=self.request.user
        )

class ServiceRequestViewSet(BaseCabinetViewSet):
    model = ServiceRequest
    queryset = ServiceRequest.objects.all()
    serializer_class = ServiceRequestSerializer

class DocumentViewSet(BaseCabinetViewSet):
    model = Document
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer

    def perform_create(self, serializer):
        serializer.save(
            company=self.request.user.company,
            uploaded_by=self.request.user,
            file_size=f"{self.request.FILES['file'].size / 1024 / 1024:.2f} MB"
        )

class ThreadViewSet(BaseCabinetViewSet):
    model = Thread
    queryset = Thread.objects.all()
    serializer_class = ThreadSerializer
    
    @action(detail=True, methods=['post'])
    def add_message(self, request, pk=None):
        thread = self.get_object()
        serializer = MessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(
                thread=thread,
                author=request.user
            )
            thread.last_message_at = serializer.instance.created_at
            thread.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['get'])
    def messages(self, request, pk=None):
        thread = self.get_object()
        messages = thread.messages.all().order_by('created_at')
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)

class InvoiceViewSet(BaseCabinetViewSet):
    model = Invoice
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer
    http_method_names = ['get'] # Read-only for now

class DashboardViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        company = request.user.company
        requests = ServiceRequest.objects.filter(company=company)
        docs = Document.objects.filter(company=company)
        invoices = Invoice.objects.filter(company=company)
        
        active_requests_count = requests.exclude(status='done').count()
        docs_count = docs.count()
        balance = 15400 # Mock balance from subscription integration later
        
        recent_activity = [] # TODO: Aggregate recent signals
        
        return Response({
            'stats': {
                'activeRequests': active_requests_count,
                'documentsCount': docs_count,
                'consultationsAvailable': 2, # TODO: real limits
                'balance': balance,
            },
            'recentRequests': ServiceRequestSerializer(requests.order_by('-updated_at')[:3], many=True).data
        })
