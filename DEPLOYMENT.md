# Deployment Guide

This guide covers various deployment options for the CPA Lead Dashboard.

## 1. Vercel Deployment (Recommended)

### Prerequisites
- GitHub account
- Vercel account

### Steps
1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo>
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure environment variables:
     - `DATABASE_URL`: Vercel will provide this automatically
   - Click "Deploy"

3. **Configure Postback URLs**
   Update your CPA platforms with the new Vercel URLs:
   - `https://your-domain.vercel.app/api/postback/imonetizeit`
   - `https://your-domain.vercel.app/api/postback/trafee`
   - `https://your-domain.vercel.app/api/postback/clickdealer`

## 2. Traditional Web Hosting

### Prerequisites
- SSH access to server
- Node.js 18+ installed
- Domain name

### Steps

1. **Server Setup**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Install PM2
   sudo npm install -g pm2
   
   # Install Nginx
   sudo apt install nginx -y
   ```

2. **Deploy Application**
   ```bash
   # Clone repository
   git clone <your-repo-url> /var/www/cpa-dashboard
   cd /var/www/cpa-dashboard
   
   # Install dependencies
   npm install
   
   # Setup database
   npm run db:push
   
   # Build application
   npm run build
   ```

3. **Configure PM2**
   ```bash
   # Create PM2 config
   cat > ecosystem.config.js << EOF
   module.exports = {
     apps: [{
       name: 'cpa-dashboard',
       script: 'npm',
       args: 'start',
       cwd: '/var/www/cpa-dashboard',
       env: {
         NODE_ENV: 'production',
         DATABASE_URL: 'file:./prod.db'
       }
     }]
   };
   EOF
   
   # Start application
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup
   ```

4. **Configure Nginx**
   ```bash
   # Create Nginx config
   sudo cat > /etc/nginx/sites-available/cpa-dashboard << EOF
   server {
       listen 80;
       server_name yourdomain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade \$http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host \$host;
           proxy_set_header X-Real-IP \$remote_addr;
           proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto \$scheme;
           proxy_cache_bypass \$http_upgrade;
       }
   }
   EOF
   
   # Enable site
   sudo ln -s /etc/nginx/sites-available/cpa-dashboard /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

5. **Setup SSL (Optional but Recommended)**
   ```bash
   # Install Certbot
   sudo apt install certbot python3-certbot-nginx -y
   
   # Get SSL certificate
   sudo certbot --nginx -d yourdomain.com
   ```

## 3. Docker Deployment

### Prerequisites
- Docker installed
- Docker Compose installed

### Steps

1. **Build and Run**
   ```bash
   # Clone repository
   git clone <your-repo-url>
   cd cpa-dashboard
   
   # Build and run with Docker Compose
   docker-compose up -d
   ```

2. **Configure Domain**
   Update `nginx.conf` with your domain name
   ```bash
   # Edit nginx.conf
   nano nginx.conf
   
   # Replace yourdomain.com with your actual domain
   ```

3. **Setup SSL**
   ```bash
   # Create SSL directory
   mkdir -p ssl
   
   # Add your SSL certificates
   # cert.pem and key.pem
   ```

4. **Restart Services**
   ```bash
   docker-compose down
   docker-compose up -d
   ```

## 4. Cloud Deployment

### AWS EC2

1. **Launch EC2 Instance**
   - Choose Ubuntu 20.04 LTS
   - Select t3.micro or larger
   - Configure security groups (HTTP, HTTPS, Custom 3000)

2. **Deploy Application**
   ```bash
   # SSH into instance
   ssh -i your-key.pem ubuntu@your-ec2-ip
   
   # Follow Traditional Web Hosting steps
   ```

### DigitalOcean

1. **Create Droplet**
   - Choose Ubuntu 20.04
   - Select basic plan ($6/month or higher)
   - Add your SSH key

2. **Deploy Application**
   - Follow Traditional Web Hosting steps

### Google Cloud Platform

1. **Create VM Instance**
   - Compute Engine > VM Instances
   - Choose e2-micro or larger
   - Allow HTTP and HTTPS traffic

2. **Deploy Application**
   - Follow Traditional Web Hosting steps

## Environment Configuration

### Production Environment Variables

```env
NODE_ENV=production
DATABASE_URL="file:./prod.db"
```

### Security Considerations

1. **Firewall Configuration**
   ```bash
   # UFW setup
   sudo ufw allow ssh
   sudo ufw allow 'Nginx Full'
   sudo ufw enable
   ```

2. **Database Security**
   - Regular backups
   - Proper file permissions
   - Consider PostgreSQL for production

3. **Application Security**
   - Use HTTPS
   - Keep dependencies updated
   - Monitor logs

## Monitoring and Maintenance

### Log Monitoring

```bash
# PM2 logs
pm2 logs

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# Application logs
journalctl -u nginx -f
```

### Database Backup

```bash
# Create backup script
cat > backup.sh << EOF
#!/bin/bash
DATE=\$(date +%Y%m%d_%H%M%S)
cp /var/www/cpa-dashboard/prisma/dev.db /var/backups/cpa-dashboard_\$DATE.db
find /var/backups -name "cpa-dashboard_*.db" -mtime +7 -delete
EOF

chmod +x backup.sh

# Add to crontab
crontab -e
# Add: 0 2 * * * /path/to/backup.sh
```

### Updates

```bash
# Update application
cd /var/www/cpa-dashboard
git pull
npm install
npm run build
pm2 restart cpa-dashboard
```

## Troubleshooting

### Common Issues

1. **Port 3000 already in use**
   ```bash
   sudo lsof -i :3000
   sudo kill -9 <PID>
   ```

2. **Database permission errors**
   ```bash
   sudo chown www-data:www-data /var/www/cpa-dashboard/prisma/dev.db
   sudo chmod 664 /var/www/cpa-dashboard/prisma/dev.db
   ```

3. **WebSocket connection issues**
   - Check Nginx configuration
   - Verify firewall settings
   - Ensure proper SSL setup

### Performance Optimization

1. **Enable Caching**
   - Configure Nginx caching
   - Use CDN for static assets

2. **Database Optimization**
   - Add indexes to frequently queried fields
   - Consider connection pooling

3. **Application Optimization**
   - Enable Next.js production optimizations
   - Monitor memory usage

## Postback URL Configuration

After deployment, update your CPA platforms with the correct postback URLs:

- **Imonetizeit**: `https://yourdomain.com/api/postback/imonetizeit`
- **Trafee**: `https://yourdomain.com/api/postback/trafee`
- **Clickdealer**: `https://yourdomain.com/api/postback/clickdealer`

Test each postback URL to ensure they're working correctly before going live.