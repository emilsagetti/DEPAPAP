#!/bin/bash
# Install dependencies
pip install -r requirements.txt

# Run migrations
python3 manage.py migrate

# Collect static files (if needed)
# python3 manage.py collectstatic --noinput

# Start Gunicorn (or dev server if gunicorn not installed yet)
# Using runserver 0.0.0.0:8000 for simplicity as per current setup, 
# but recommending gunicorn for true prod.
if command -v gunicorn &> /dev/null; then
    gunicorn baa_legal_backend.wsgi:application --bind 0.0.0.0:8000 --workers 3
else
    echo "Gunicorn not found, using install..."
    pip install gunicorn
    gunicorn baa_legal_backend.wsgi:application --bind 0.0.0.0:8000 --workers 3
fi
