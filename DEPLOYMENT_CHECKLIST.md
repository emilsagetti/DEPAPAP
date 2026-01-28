# 📋 Production Deployment Checklist for depalaw.ru

## Pre-Deployment Preparation

### Local Environment
- [ ] All code committed to git
- [ ] Frontend builds without errors (`npm run build`)
- [ ] Backend builds without errors (`npm run build`)
- [ ] All tests passing
- [ ] No console errors in development

### Server Access
- [ ] SSH access confirmed: `ssh u3390483_SAGETTI@31.31.196.161`
- [ ] FTP access confirmed (FileZilla or similar)
- [ ] ISPmanager panel accessible: server159.hosting.reg.ru:1500

---

## Step 1: DNS Configuration

- [ ] DNS A record: `depalaw.ru → 31.31.196.161`
- [ ] DNS CNAME/A record: `www.depalaw.ru → depalaw.ru` (or same IP)
- [ ] DNS propagation verified: `dig depalaw.ru +short`
- [ ] Both domains resolve to correct IP

---

## Step 2: ISPmanager Website Setup

- [ ] Website created in ISPmanager for `depalaw.ru`
- [ ] Alias `www.depalaw.ru` added
- [ ] Web root path noted: `/var/www/u3390483/data/www/depalaw.ru`
- [ ] PHP disabled (not needed)
- [ ] nginx selected as web server

---

## Step 3: SSL Certificate

- [ ] Let's Encrypt certificate requested for both domains
- [ ] Certificate installed successfully
- [ ] Auto-renewal enabled
- [ ] HTTP → HTTPS redirect enabled
- [ ] Test: `https://depalaw.ru` shows green padlock

---

## Step 4: Server Environment

### Node.js & Tools
- [ ] Node.js installed (v18+ or v20+): `node -v`
- [ ] npm installed: `npm -v`
- [ ] PM2 installed globally: `npm install -g pm2`
- [ ] PM2 version check: `pm2 -v`

### Directories Created
- [ ] Backend directory: `mkdir -p /var/www/u3390483/depalaw-api`
- [ ] Logs directory: `mkdir -p /var/www/u3390483/logs`
- [ ] Permissions set correctly: `chown -R u3390483:u3390483 /var/www/u3390483/`

---

## Step 5: Frontend Deployment

### Build
- [ ] Navigate to frontend directory
- [ ] Run build script: `./build-production.sh`
- [ ] Verify `dist/` folder created
- [ ] Check `dist/index.html` exists
- [ ] Check `dist/assets/` folder exists

### Upload
- [ ] Upload `dist/*` contents to `/var/www/u3390483/data/www/depalaw.ru/`
- [ ] Verify files on server: `ls -la /var/www/u3390483/data/www/depalaw.ru/`
- [ ] `index.html` is in root (not in `dist/` subfolder)
- [ ] File permissions correct (644 for files, 755 for directories)

### Test
- [ ] Open `https://depalaw.ru` in browser
- [ ] Page loads without errors
- [ ] Check browser console for errors
- [ ] Static assets load (images, CSS, JS)

---

## Step 6: Backend Deployment

### Prepare Archive
- [ ] Navigate to backend-nestjs directory
- [ ] Run: `./prepare-deploy.sh`
- [ ] Verify `backend-deploy.tar.gz` created

### Upload
- [ ] Upload archive: `scp backend-deploy.tar.gz u3390483_SAGETTI@31.31.196.161:/var/www/u3390483/depalaw-api/`
- [ ] SSH into server
- [ ] Extract: `cd /var/www/u3390483/depalaw-api && tar -xzf backend-deploy.tar.gz`
- [ ] Remove archive: `rm backend-deploy.tar.gz`

### Build
- [ ] Install dependencies: `npm ci --production=false`
- [ ] Build TypeScript: `npm run build`
- [ ] Verify `dist/` folder created
- [ ] Check `dist/main.js` exists

### Environment Configuration
- [ ] Copy template: `cp .env.production.template .env.production`
- [ ] Edit `.env.production`: `nano .env.production`
- [ ] Set `NODE_ENV=production`
- [ ] Set `PORT=8000`
- [ ] Generate JWT_SECRET (32+ chars): `openssl rand -base64 32`
- [ ] Generate JWT_REFRESH_SECRET (different): `openssl rand -base64 32`
- [ ] Set CORS_ORIGINS: `https://depalaw.ru,https://www.depalaw.ru`
- [ ] Configure database (if using)
- [ ] Configure Tinkoff payment keys (if using)
- [ ] Save and exit

---

## Step 7: PM2 Process Management

### Start Backend
- [ ] Copy ecosystem config: `cp ecosystem.config.json /var/www/u3390483/depalaw-api/`
- [ ] Start PM2: `pm2 start ecosystem.config.json`
- [ ] Check status: `pm2 status` (should show "online")
- [ ] View logs: `pm2 logs depalaw-api --lines 50`
- [ ] No errors in logs

### Configure Auto-Start
- [ ] Save PM2 config: `pm2 save`
- [ ] Setup startup script: `pm2 startup`
- [ ] Run the command PM2 outputs (copy-paste)
- [ ] Verify: `systemctl status pm2-u3390483` (or similar)

### Test Backend
- [ ] Test locally on server: `curl http://127.0.0.1:8000/api/`
- [ ] Should return API response (not connection refused)
- [ ] Check specific endpoint: `curl http://127.0.0.1:8000/api/health`

---

## Step 8: nginx Configuration

### Backup
- [ ] Find nginx config: `grep -r "depalaw.ru" /etc/nginx/`
- [ ] Backup config: `cp /etc/nginx/vhosts/depalaw.ru.conf /etc/nginx/vhosts/depalaw.ru.conf.backup`

### Configure
- [ ] Edit config: `nano /etc/nginx/vhosts/depalaw.ru.conf`
- [ ] Add API proxy location block (`/api/`)
- [ ] Add WebSocket location block (`/socket.io/`)
- [ ] Add SPA fallback (`try_files $uri $uri/ /index.html;`)
- [ ] Add security headers
- [ ] Add gzip compression
- [ ] Verify SSL certificate paths
- [ ] Save and exit

### Test & Reload
- [ ] Test config: `nginx -t`
- [ ] If OK, reload: `systemctl reload nginx` or `service nginx reload`
- [ ] Check nginx status: `systemctl status nginx`
- [ ] Check error log: `tail -f /var/www/u3390483/logs/depalaw.ru-error.log`

---

## Step 9: Final Verification

### Frontend Tests
- [ ] **HTTPS**: `https://depalaw.ru` loads
- [ ] **WWW**: `https://www.depalaw.ru` loads
- [ ] **HTTP Redirect**: `http://depalaw.ru` redirects to HTTPS
- [ ] **SSL Valid**: Green padlock in browser, no warnings
- [ ] **SPA Routing**: `https://depalaw.ru/cabinet` loads (not 404)
- [ ] **Direct Links**: `https://depalaw.ru/auth` loads
- [ ] **Browser Back/Forward**: Navigation works correctly

### Backend/API Tests
- [ ] **API Root**: `curl https://depalaw.ru/api/` returns response
- [ ] **Health Check**: `curl https://depalaw.ru/api/health` (if exists)
- [ ] **Auth Endpoint**: `curl https://depalaw.ru/api/auth/me` (should return 401 or user data)
- [ ] **No 502 Errors**: API responds, not "Bad Gateway"

### Integration Tests
- [ ] **Registration**: Register new user works
- [ ] **Login**: Login works
- [ ] **No CORS Errors**: Check browser console
- [ ] **API Calls**: Frontend can call backend
- [ ] **WebSocket**: Chat/real-time features work (if applicable)
- [ ] **File Upload**: Upload features work (if applicable)

### Performance Tests
- [ ] **Page Load**: < 3 seconds
- [ ] **API Response**: < 500ms for simple requests
- [ ] **No Memory Leaks**: `pm2 monit` shows stable memory
- [ ] **No CPU Spikes**: CPU usage normal

---

## Step 10: Monitoring & Logs

### Setup Monitoring
- [ ] PM2 monitoring: `pm2 monit`
- [ ] Log rotation configured (check ISPmanager)
- [ ] Disk space checked: `df -h`
- [ ] Memory usage checked: `free -h`

### Log Verification
- [ ] Backend logs: `pm2 logs depalaw-api`
- [ ] nginx access log: `tail -f /var/www/u3390483/logs/depalaw.ru-access.log`
- [ ] nginx error log: `tail -f /var/www/u3390483/logs/depalaw.ru-error.log`
- [ ] No critical errors in any logs

---

## Step 11: Security

- [ ] All secrets changed in `.env.production`
- [ ] JWT secrets are strong (32+ characters)
- [ ] Database password is strong
- [ ] SSH key-based auth enabled (optional but recommended)
- [ ] Firewall configured (allow only 22, 80, 443)
- [ ] fail2ban installed and configured (optional)
- [ ] Regular backups scheduled

---

## Step 12: Documentation

- [ ] Server credentials documented securely
- [ ] Deployment process documented
- [ ] Environment variables documented
- [ ] Troubleshooting guide created
- [ ] Team notified of deployment

---

## Post-Deployment

### Immediate Actions
- [ ] Monitor logs for 1 hour
- [ ] Test all critical user flows
- [ ] Check error tracking (if configured)
- [ ] Notify stakeholders of successful deployment

### Within 24 Hours
- [ ] Monitor server resources
- [ ] Check for any user-reported issues
- [ ] Verify SSL certificate auto-renewal works
- [ ] Test backup/restore procedure

### Within 1 Week
- [ ] Review performance metrics
- [ ] Optimize based on real usage
- [ ] Set up monitoring alerts (optional)
- [ ] Plan next deployment improvements

---

## Rollback Plan

If something goes wrong:

### Frontend Rollback
```bash
# Restore previous dist/ from backup
scp -r backup/dist/* u3390483_SAGETTI@31.31.196.161:/var/www/u3390483/data/www/depalaw.ru/
```

### Backend Rollback
```bash
# SSH into server
ssh u3390483_SAGETTI@31.31.196.161
cd /var/www/u3390483/depalaw-api

# Restore from git (if using)
git checkout previous-working-commit
npm run build
pm2 restart depalaw-api

# Or restore from backup
tar -xzf backup/backend-backup.tar.gz
npm run build
pm2 restart depalaw-api
```

### nginx Rollback
```bash
# Restore backup config
sudo cp /etc/nginx/vhosts/depalaw.ru.conf.backup /etc/nginx/vhosts/depalaw.ru.conf
sudo nginx -t
sudo systemctl reload nginx
```

---

## Contacts & Resources

- **REG.RU Support**: support@reg.ru
- **Server IP**: 31.31.196.161
- **Panel**: server159.hosting.reg.ru:1500
- **FTP User**: u3390483_SAGETTI

### Documentation
- [Full Deployment Plan](deployment_plan.md)
- [Quick Reference](DEPLOYMENT_QUICK_REFERENCE.md)
- [ISPmanager Docs](https://docs.ispsystem.com/)
- [PM2 Docs](https://pm2.keymetrics.io/docs/)
- [nginx Docs](https://nginx.org/en/docs/)

---

## ✅ Deployment Complete!

Once all items are checked:
- [ ] **DEPLOYMENT SUCCESSFUL** ✨
- [ ] Production URL: https://depalaw.ru
- [ ] All systems operational
- [ ] Monitoring active
- [ ] Team notified

**Deployed by**: _________________  
**Date**: _________________  
**Version**: _________________  
**Notes**: _________________
