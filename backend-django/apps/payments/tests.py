from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from unittest.mock import patch, MagicMock
from .models import Payment
from .services import TinkoffPaymentService

User = get_user_model()

class PaymentServiceTest(TestCase):
    def test_token_generation(self):
        # Test data based on T-Bank documentation examples or simple logic
        params = {
            'Amount': 10000,
            'OrderId': '123456',
            'TerminalKey': 'TestTerminal',
            'Description': 'Test Payment',
        }
        # Assuming PASSWORD in settings is 'tinkoff' (default in our settings.py)
        # Sorted keys: Amount, Description, OrderId, Password, TerminalKey
        # Values: 10000 + Test Payment + 123456 + tinkoff + TestTerminal
        # String to hash: "10000Test Payment123456tinkoffTestTerminal"
        
        # We just verify it returns a string and doesn't crash
        token = TinkoffPaymentService._generate_token(params)
        self.assertTrue(isinstance(token, str))
        self.assertEqual(len(token), 64) # SHA-256 is 64 chars

class InitPaymentViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            email='test@example.com',
            password='testpassword123',
            first_name='Test',
            last_name='User'
        )
        self.client.force_authenticate(user=self.user)
        self.url = '/api/payments/init'

    @patch('apps.payments.views.TinkoffPaymentService.init_payment')
    def test_init_payment_success(self, mock_init):
        # Mock the service response
        mock_init.return_value = {
            'payment_url': 'https://securepay.tinkoff.ru/test/payment',
            'payment_id': '12345',
            'status': 'NEW'
        }

        data = {
            'amount': 50000,
            'description': 'Test Subscription'
        }

        response = self.client.post(self.url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['paymentUrl'], 'https://securepay.tinkoff.ru/test/payment')
        self.assertEqual(response.data['paymentId'], '12345')
        
        # Verify Payment created in DB
        payment = Payment.objects.get(order_id=response.data['orderId'])
        self.assertEqual(payment.user, self.user)
        self.assertEqual(payment.amount, 50000)
        self.assertEqual(payment.payment_id, '12345')
        self.assertEqual(payment.status, 'PENDING')

    def test_init_payment_unauthorized(self):
        self.client.logout()
        data = {'amount': 50000}
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
