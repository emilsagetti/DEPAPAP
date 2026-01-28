import hashlib
import json
import requests
from django.conf import settings

class TinkoffPaymentService:
    @staticmethod
    def _generate_token(params):
        """
        Signs the request parameters using SHA-256 for T-Bank API authentication.
        Excludes specific keys and concatenates values sorted by key + SecretKey.
        """
        token_params = params.copy()
        
        # Keys to exclude from token generation
        exclude_keys = ['Token', 'Shops', 'Receipt', 'DATA']
        for key in exclude_keys:
            if key in token_params:
                del token_params[key]
        
        token_params['Password'] = settings.TINKOFF_SECRET_KEY
        
        # Sort by key and concatenate values
        sorted_keys = sorted(token_params.keys())
        concatenated_values = ''.join(str(token_params[key]) for key in sorted_keys)
        
        # Calculate SHA-256 hash
        return hashlib.sha256(concatenated_values.encode('utf-8')).hexdigest()

    @staticmethod
    def init_payment(amount, order_id, description=None, customer_key=None, email=None):
        """
        Initializes a payment session with T-Bank.
        Returns the payment URL and payment ID.
        """
        # Convert amount to kopecks securely
        try:
            amount_kopecks = int(float(amount) * 100)
        except (ValueError, TypeError):
            raise Exception(f"Invalid amount format: {amount}")

        payload = {
            'TerminalKey': settings.TINKOFF_TERMINAL_KEY,
            'Amount': amount_kopecks,
            'OrderId': str(order_id),
            'Description': description or f"Payment for Order {order_id}",
        }
        
        if customer_key:
            payload['CustomerKey'] = str(customer_key)

        # ---------------------------------------------------------------------
        # Fiscal Data (Receipt) - MANDATORY
        # ---------------------------------------------------------------------
        receipt_email = email or f"customer_{order_id}@example.com"
        
        receipt = {
            "Email": receipt_email,
            "Taxation": "usn_income", # Simplified tax system (common for legal firms)
            "Items": [
                {
                    "Name": (description or "Payment for services")[:128], # Truncate to safe length
                    "Price": amount_kopecks,
                    "Quantity": 1.00,
                    "Amount": amount_kopecks,
                    "Tax": "none",
                    "PaymentMethod": "full_prepayment",
                    "PaymentObject": "service"
                }
            ]
        }
        
        payload['Receipt'] = receipt
            
        # Add Token (Signature)
        payload['Token'] = TinkoffPaymentService._generate_token(payload)
        
        url = f"{settings.TINKOFF_API_URL}/Init"
        
        # DEBUG LOGGING
        print(f"DEBUG: T-Bank Init URL: {url}")
        print(f"DEBUG: T-Bank Payload: {json.dumps(payload, ensure_ascii=False)}")
        
        try:
            # Need to pass json=payload. Requests automatically dumps dict to json.
            # Receipt is a dict, so it will be nested correctly.
            response = requests.post(url, json=payload, timeout=10)
            response.raise_for_status()
            data = response.json()
            
            if not data.get('Success', False):
                raise Exception(f"T-Bank API Error: {data.get('Message')} ({data.get('Details')})")
                
            return {
                'payment_url': data.get('PaymentURL'),
                'payment_id': data.get('PaymentId'),
                'status': data.get('Status')
            }
            
        except requests.exceptions.RequestException as e:
            raise Exception(f"Failed to connect to T-Bank API: {str(e)}")

    @staticmethod
    def check_status(payment_id):
        """
        Checks the status of a payment.
        """
        payload = {
            'TerminalKey': settings.TINKOFF_TERMINAL_KEY,
            'PaymentId': str(payment_id),
        }
        
        payload['Token'] = TinkoffPaymentService._generate_token(payload)
        
        url = f"{settings.TINKOFF_API_URL}/GetState"
        
        try:
            response = requests.post(url, json=payload, timeout=10)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            raise Exception(f"Failed to check payment status: {str(e)}")

    @staticmethod
    def cancel_payment(payment_id, amount=None):
        """
        Cancels a payment (Refund/Void).
        """
        payload = {
            'TerminalKey': settings.TINKOFF_TERMINAL_KEY,
            'PaymentId': str(payment_id),
        }
        
        if amount:
            payload['Amount'] = int(amount * 100) # Optional partial refund
            
        payload['Token'] = TinkoffPaymentService._generate_token(payload)
        
        url = f"{settings.TINKOFF_API_URL}/Cancel"
        
        # DEBUG LOGGING
        print(f"DEBUG: T-Bank Cancel URL: {url}")
        
        try:
            response = requests.post(url, json=payload, timeout=10)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            raise Exception(f"Failed to cancel payment: {str(e)}")
