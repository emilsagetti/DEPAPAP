#!/bin/bash

# Configuration
LOCAL_DOCS_DIR="./docs"
REMOTE_WEBROOT="/var/www/u3390483/data/www/depalaw.ru"
DOMAIN="depalaw.ru"

echo "🚀 Starting deployment process..."

# 1. Check local docs
if [ ! -d "$LOCAL_DOCS_DIR" ]; then
    echo "❌ Error: Local directory '$LOCAL_DOCS_DIR' not found!"
    exit 1
fi

if [ -z "$(ls -A $LOCAL_DOCS_DIR)" ]; then
    echo "⚠️ Warning: '$LOCAL_DOCS_DIR' is empty. Nothing to deploy."
    exit 0
fi

echo "✅ Local docs directory found via check."

# 2. Backup using Expect script
echo "📦 Creating remote backup..."
./deploy/ssh_backup.exp
if [ $? -eq 0 ]; then
    echo "✅ Backup process attempted (checked via SSH)."
else
    echo "⚠️ Backup script encountered an issue (check connection)."
    # We proceed anyway as backup might fail if _backup dir doesn't exist or permissions issue, but upload is critical
fi

# 3. Upload using Expect script
echo "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
echo "⬆️ Uploading files via SFTP..."
./deploy/sftp_upload.exp
UPLOAD_STATUS=$?

if [ $UPLOAD_STATUS -eq 0 ]; then
    echo "✅ Upload completed successfully."
else
    echo "❌ Upload failed."
    exit 1
fi

# 4. Generate public links
echo "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
echo "🎉 Deployment Finished!"
echo "📄 Public Links:"

for file in "$LOCAL_DOCS_DIR"/*; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        echo " - Local: $file"
        echo "   -> Remote: $REMOTE_WEBROOT/docs/$filename"
        echo "   -> URL: https://$DOMAIN/docs/$filename"
        echo "----------------------------------------"
    fi
done
