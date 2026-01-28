
import requests
import sys

BASE_URL = 'http://localhost:8000/api'
EMAIL = 'test_pay_flow_2@example.com'
PASSWORD = 'TestPassword123!'

def run_test():
    session = requests.Session()
    
    # 1. Register
    print(f"1. Registering {EMAIL}...")
    reg_resp = session.post(f"{BASE_URL}/auth/users/", json={
        "email": EMAIL,
        "password": PASSWORD,
        "re_password": PASSWORD
    })
    
    # Handle if already exists
    if reg_resp.status_code == 400 and 'already exists' in reg_resp.text:
         print("   User exists, proceeding to login.")
    elif reg_resp.status_code != 201:
        print(f"   Registration failed: {reg_resp.text}")
        return

    # 2. Login
    print("2. Logging in...")
    login_resp = session.post(f"{BASE_URL}/auth/jwt/create/", json={
        "email": EMAIL,
        "password": PASSWORD
    })
    
    if login_resp.status_code != 200:
        print(f"   Login failed: {login_resp.text}")
        return
        
    token = login_resp.json()['access']
    headers = {'Authorization': f'Bearer {token}'}
    print("   Login successful, token received.")
    
    # 3. Init Payment
    print("3. Initializing Payment...")
    pay_resp = session.post(f"{BASE_URL}/payments/init", json={
        "amount": 150000,
        "description": "Test Business Plan",
        "userId": "current-user" # Ignored by backend in favor of token
    }, headers=headers)
    
    if pay_resp.status_code != 200:
        print(f"   Payment Init failed: {pay_resp.text}")
        return
        
    data = pay_resp.json()
    print("   Response:", data)
    
    if 'paymentUrl' in data and 'securepay.tinkoff.ru' in data['paymentUrl']:
        print("SUCCESS: Received valid T-Bank URL.")
    else:
        print("FAILURE: Did not receive valid T-Bank URL.")

if __name__ == "__main__":
    run_test()
