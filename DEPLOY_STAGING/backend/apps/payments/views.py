from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
import uuid
from .models import Payment
from .services import TinkoffPaymentService

class InitPaymentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        amount = request.data.get('amount')
        description = request.data.get('description')
        
        if not amount:
            return Response({'error': 'Amount is required'}, status=status.HTTP_400_BAD_REQUEST)
            
        # Create internal order ID
        order_id = str(uuid.uuid4())
        
        # Create Payment record
        payment = Payment.objects.create(
            user=request.user,
            amount=amount,
            order_id=order_id,
            description=description or 'Payment',
            status='NEW'
        )
        
        try:
            # Call T-Bank API
            result = TinkoffPaymentService.init_payment(
                amount=amount,
                order_id=order_id,
                description=description,
                customer_key=str(request.user.id), # Ensure this is unique per user
                email=request.user.email
            )
            
            # Update Payment record
            payment.payment_id = result.get('payment_id')
            payment.payment_url = result.get('payment_url')
            payment.status = 'PENDING'
            payment.save()
            
            return Response({
                'paymentUrl': payment.payment_url,
                'paymentId': payment.payment_id,
                'orderId': order_id
            })
            
        except Exception as e:
            payment.status = 'ERROR'
            payment.save()
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
