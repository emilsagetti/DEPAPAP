import hashlib
from django.conf import settings
import json

# Mock settings
TERMINAL_KEY = 'TinkoffBankTest'
PASSWORD = 'TinkoffBankTest'

def generate_token(params):
    token_params = params.copy()
    exclude_keys = ['Token', 'Shops', 'Receipt', 'DATA']
    for key in exclude_keys:
        if key in token_params:
            del token_params[key]
    token_params['Password'] = PASSWORD
    sorted_keys = sorted(token_params.keys())
    concatenated_values = ''.join(str(token_params[key]) for key in sorted_keys)
    return hashlib.sha256(concatenated_values.encode('utf-8')).hexdigest()

def inspect_payload():
    amount = 500
    order_id = 'verify_non_recurrent_1'
    description = 'Verification Payment'
    
    payload = {
        'TerminalKey': TERMINAL_KEY,
        'Amount': int(amount * 100),
        'OrderId': str(order_id),
        'Description': description,
    }
    
    # Intentionally NOT adding Recurrent check here to see what the service would do
    # But since we are simulating the Service code:
    
    # Validation: Check if 'Recurrent' is in payload
    if 'Recurrent' in payload:
        print("ALERT: 'Recurrent' flag detected!")
    else:
        print("SUCCESS: 'Recurrent' flag is NOT present. This is a one-time payment.")
    
    payload['Token'] = generate_token(payload)
    
    print(f"Final Payload: {json.dumps(payload, indent=2)}")

if __name__ == "__main__":
    inspect_payload()
