from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Order
from .serializers import OrderSerializer


class OrderViewSet(viewsets.ModelViewSet):
    """ViewSet for Order model with role-based access control"""
    
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        """
        Filter orders based on user role:
        - Clients see only their own orders
        - Lawyers and Admins see all orders
        """
        user = self.request.user
        
        if user.role == 'client':
            return Order.objects.filter(client=user)
        elif user.role in ['lawyer', 'admin']:
            return Order.objects.all()
        else:
            return Order.objects.none()
    
    def perform_create(self, serializer):
        """Auto-assign the current user as the client"""
        serializer.save(client=self.request.user)
    
    @action(detail=True, methods=['patch'], permission_classes=[permissions.IsAuthenticated])
    def update_status(self, request, pk=None):
        """Update order status (lawyers/admins only)"""
        order = self.get_object()
        
        if request.user.role not in ['lawyer', 'admin']:
            return Response(
                {'error': 'Only lawyers and admins can update order status'},
                status=403
            )
        
        status = request.data.get('status')
        if status in dict(Order.STATUS_CHOICES):
            order.status = status
            order.save()
            serializer = self.get_serializer(order)
            return Response(serializer.data)
        
        return Response({'error': 'Invalid status'}, status=400)
