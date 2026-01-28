# Quick Reference Guide for Production Deployment

## 📋 Pre-Deployment Checklist

### Server Information
- **Domain**: depalaw.ru
- **IP**: 31.31.196.161
- **FTP User**: u3390483_SAGETTI
- **FTP Password**: Butaeva1984
- **Panel**: server159.hosting.reg.ru:1500

### Expected Paths on Server
```
/var/www/u3390483/
├── data/www/depalaw.ru/          # Frontend (web root)
├── depalaw-api/                   # Backend application
└── logs/                          # Application logs
```

---

## 🚀 Quick Deployment Steps

### 1. Build Frontend
```bash
cd frontend
./build-production.sh
```

### 2. Upload Frontend
```bash
# Via SCP
scp -r dist/* u3390483_SAGETTI@31.31.196.161:/var/www/u3390483/data/www/depalaw.ru/

# Or use FTP client (FileZilla, etc.)
# Host: 31.31.196.161
# User: u3390483_SAGETTI
# Upload dist/* to /depalaw.ru/
```

### 3. Prepare Backend
```bash
cd backend-nestjs
./prepare-deploy.sh
```

### 4. Upload Backend
```bash
scp backend-deploy.tar.gz u3390483_SAGETTI@31.31.196.161:/var/www/u3390483/depalaw-api/
```

### 5. Deploy Backend on Server
```bash
# SSH into server
ssh u3390483_SAGETTI@31.31.196.161

# Extract and setup
cd /var/www/u3390483/depalaw-api
tar -xzf backend-deploy.tar.gz
rm backend-deploy.tar.gz

# Install and build
npm ci --production=false
npm run build

# Configure environment
nano .env.production
# (Copy from .env.production.template and fill in secrets)

# Start with PM2
pm2 start ecosystem.config.json
pm2 save
pm2 startup  # Run the command it outputs
```

### 6. Configure nginx
```bash
# On server
sudo cp /etc/nginx/vhosts/depalaw.ru.conf /etc/nginx/vhosts/depalaw.ru.conf.backup
sudo nano /etc/nginx/vhosts/depalaw.ru.conf
# (Copy configuration from nginx-depalaw.ru.conf)

# Test and reload
sudo nginx -t
sudo systemctl reload nginx
```

---

## 🔍 Verification Commands

### Check Frontend
```bash
curl -I https://depalaw.ru
# Should return 200 OK

curl https://depalaw.ru
# Should return HTML
```

### Check Backend
```bash
# On server
pm2 status
pm2 logs depalaw-api --lines 50

# Test API
curl http://127.0.0.1:8000/api/
curl https://depalaw.ru/api/
```

### Check nginx
```bash
sudo nginx -t
sudo systemctl status nginx
tail -f /var/www/u3390483/logs/depalaw.ru-access.log
```

---

## 🛠️ Common Maintenance Tasks

### Update Frontend
```bash
# Local
cd frontend
npm run build

# Upload
scp -r dist/* u3390483_SAGETTI@31.31.196.161:/var/www/u3390483/data/www/depalaw.ru/
```

### Update Backend
```bash
# Local
cd backend-nestjs
./prepare-deploy.sh
scp backend-deploy.tar.gz u3390483_SAGETTI@31.31.196.161:/var/www/u3390483/depalaw-api/

# Server
ssh u3390483_SAGETTI@31.31.196.161
cd /var/www/u3390483/depalaw-api
tar -xzf backend-deploy.tar.gz
npm run build
pm2 restart depalaw-api
```

### View Logs
```bash
# Backend logs
pm2 logs depalaw-api
pm2 logs depalaw-api --lines 200

# nginx logs
tail -f /var/www/u3390483/logs/depalaw.ru-access.log
tail -f /var/www/u3390483/logs/depalaw.ru-error.log
```

### Restart Services
```bash
# Backend
pm2 restart depalaw-api

# nginx
sudo systemctl reload nginx

# Full restart
pm2 restart all
sudo systemctl restart nginx
```

---

## 🐛 Troubleshooting

### Frontend Issues

**Blank page**:
```bash
# Check if files uploaded correctly
ls -la /var/www/u3390483/data/www/depalaw.ru/
# Should see index.html, assets/, etc.

# Check nginx error log
tail -f /var/www/u3390483/logs/depalaw.ru-error.log
```

**404 on routes** (e.g., /cabinet):
```bash
# Check nginx config has:
# try_files $uri $uri/ /index.html;

sudo nginx -t
sudo systemctl reload nginx
```

### Backend Issues

**502 Bad Gateway**:
```bash
# Check if backend is running
pm2 status

# Check backend logs
pm2 logs depalaw-api --lines 100

# Restart backend
pm2 restart depalaw-api
```

**CORS errors**:
```bash
# Check CORS_ORIGINS in .env.production
nano /var/www/u3390483/depalaw-api/.env.production

# Should have:
# CORS_ORIGINS=https://depalaw.ru,https://www.depalaw.ru

# Rebuild and restart
cd /var/www/u3390483/depalaw-api
npm run build
pm2 restart depalaw-api
```

### SSL Issues

**Certificate not valid**:
```bash
# Check certificate in ISPmanager
# Or renew manually:
certbot renew --nginx
```

---

## 📊 Monitoring

### PM2 Monitoring
```bash
pm2 monit                    # Real-time monitoring
pm2 status                   # Process status
pm2 info depalaw-api        # Detailed info
pm2 logs depalaw-api        # Live logs
```

### System Resources
```bash
htop                         # CPU/Memory usage
df -h                        # Disk space
free -h                      # Memory usage
```

### Log Analysis
```bash
# Count requests
wc -l /var/www/u3390483/logs/depalaw.ru-access.log

# Find errors
grep "error" /var/www/u3390483/logs/depalaw.ru-error.log

# API response times
tail -f /var/www/u3390483/logs/depalaw.ru-access.log | grep "/api/"
```

---

## 🔐 Security Reminders

- [ ] Change all secrets in `.env.production`
- [ ] Use strong JWT secrets (32+ characters)
- [ ] Enable firewall (allow only 22, 80, 443)
- [ ] Regular backups of database
- [ ] Keep Node.js and npm updated
- [ ] Monitor logs for suspicious activity
- [ ] Set up fail2ban for SSH protection

---

## 📞 Support Contacts

- **REG.RU Support**: support@reg.ru
- **ISPmanager Docs**: https://docs.ispsystem.com/
- **PM2 Docs**: https://pm2.keymetrics.io/docs/
- **nginx Docs**: https://nginx.org/en/docs/

---

## 📝 Notes

- Backend runs on port 8000 (localhost only)
- Frontend served by nginx on ports 80/443
- PM2 auto-restarts backend on crashes
- nginx auto-redirects HTTP → HTTPS
- Logs rotate automatically (check ISPmanager settings)
