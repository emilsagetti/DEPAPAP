import requests
import hashlib
import json

TERMINAL_KEY = '25858242'
PASSWORD = 'tinkoff' # Default test password, might need update if user has specific one
API_URL = 'https://securepay.tinkoff.ru/v2'

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


def test_config(terminal_key, password, api_url):
    import uuid
    order_id = str(uuid.uuid4())
    payload = {
        'TerminalKey': terminal_key,
        'Amount': 10000, 
        'OrderId': order_id,
        'Description': 'Test Payment',
    }
    payload['Token'] = generate_token(payload, password) # Need to update generate_token signature
    
    print(f"Testing Config: URL={api_url}, Key={terminal_key}...")
    try:
        response = requests.post(f"{api_url}/Init", json=payload, timeout=5)
        data = response.json()
        print(f"Response: {data.get('Success')} - {data.get('Message')} {data.get('Details') or ''}")
        return data
    except Exception as e:
        print(f"Error: {e}")

def generate_token(params, password):
    token_params = params.copy()
    exclude_keys = ['Token', 'Shops', 'Receipt', 'DATA']
    for key in exclude_keys:
        if key in token_params:
            del token_params[key]
    
    token_params['Password'] = password
    sorted_keys = sorted(token_params.keys())
    concatenated_values = ''.join(str(token_params[key]) for key in sorted_keys)
    return hashlib.sha256(concatenated_values.encode('utf-8')).hexdigest()

if __name__ == "__main__":
    # 1. User Creds + Production URL
    test_config('25858242', 'tinkoff', 'https://securepay.tinkoff.ru/v2')
    
    # 2. User Creds + Test URL
    test_config('25858242', 'tinkoff', 'https://rest-api-test.tinkoff.ru/v2')
    

    # 3. Generic Test Creds + Test URL (Failed previously)
    # test_config('TinkoffBankTest', 'TinkoffBankTest', 'https://rest-api-test.tinkoff.ru/v2')



    # 5. User Provided DEMO Credentials (Variations)
    terminal = '1769250074316DEMO'
    
    # Var 1: Original transcription (0, I)
    print("Testing Variation 1: 0, I")
    test_config(terminal, '0Bv#xynkVZIWb&&d', 'https://securepay.tinkoff.ru/v2')

    # Var 2: O instead of 0
    print("Testing Variation 2: O, I")
    test_config(terminal, 'OBv#xynkVZIWb&&d', 'https://securepay.tinkoff.ru/v2')

    # Var 3: l instead of I
    print("Testing Variation 3: 0, l")
    test_config(terminal, '0Bv#xynkVZlWb&&d', 'https://securepay.tinkoff.ru/v2')
    
    # Var 4: 1 instead of I
    print("Testing Variation 4: 0, 1")
    test_config(terminal, '0Bv#xynkVZ1Wb&&d', 'https://securepay.tinkoff.ru/v2')
