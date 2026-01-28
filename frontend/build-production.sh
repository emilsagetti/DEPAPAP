#!/bin/bash

# Production Deployment Script for depalaw.ru
# This script builds the frontend for production deployment

set -e  # Exit on error

echo "🚀 Building Frontend for Production..."

# Navigate to frontend directory
cd "$(dirname "$0")"

# Install dependencies (if needed)
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm ci
fi

# Build for production
echo "🔨 Building Vite app..."
npm run build

# Verify build
if [ ! -d "dist" ]; then
    echo "❌ Build failed: dist directory not found"
    exit 1
fi

echo "✅ Build successful!"
echo ""
echo "📁 Build output in: $(pwd)/dist"
echo ""
echo "Next steps:"
echo "1. Upload contents of dist/ to server web root:"
echo "   scp -r dist/* u3390483_SAGETTI@31.31.196.161:/var/www/u3390483/data/www/depalaw.ru/"
echo ""
echo "2. Or use FTP:"
echo "   Host: 31.31.196.161"
echo "   User: u3390483_SAGETTI"
echo "   Path: /depalaw.ru/"
echo ""
