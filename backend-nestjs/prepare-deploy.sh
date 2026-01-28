#!/bin/bash

# Backend Deployment Preparation Script
# Prepares backend for deployment to production server

set -e

echo "🚀 Preparing Backend for Production Deployment..."

cd "$(dirname "$0")"

# Create deployment archive
echo "📦 Creating deployment archive..."

# Exclude unnecessary files
tar --exclude='node_modules' \
    --exclude='dist' \
    --exclude='.git' \
    --exclude='*.log' \
    --exclude='.env*' \
    --exclude='coverage' \
    --exclude='test' \
    -czf backend-deploy.tar.gz .

echo "✅ Archive created: backend-deploy.tar.gz"
echo ""
echo "📤 Upload to server:"
echo "scp backend-deploy.tar.gz u3390483_SAGETTI@31.31.196.161:/var/www/u3390483/depalaw-api/"
echo ""
echo "📝 Then on server, run:"
echo "cd /var/www/u3390483/depalaw-api"
echo "tar -xzf backend-deploy.tar.gz"
echo "rm backend-deploy.tar.gz"
echo "npm ci --production=false"
echo "npm run build"
echo "pm2 restart depalaw-api || pm2 start dist/main.js --name depalaw-api"
echo ""
