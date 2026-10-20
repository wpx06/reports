# CPA Lead Dashboard - Setup Guide

## 📋 Table of Contents
1. [System Requirements](#system-requirements)
2. [Quick Start](#quick-start)
3. [Detailed Installation](#detailed-installation)
4. [Configuration](#configuration)
5. [Testing](#testing)
6. [Troubleshooting](#troubleshooting)

## 🔧 System Requirements

### Minimum Requirements:
- **Node.js**: 18.0 or higher
- **npm**: 8.0 or higher
- **RAM**: 512MB minimum
- **Storage**: 100MB free space
- **OS**: Windows 10+, macOS 10.15+, Ubuntu 18.04+

### Recommended Requirements:
- **Node.js**: 20.0 or higher
- **RAM**: 1GB or higher
- **Storage**: 1GB free space
- **CPU**: 2 cores or higher

## 🚀 Quick Start (5 Minutes)

### Option 1: Automatic Installation
```bash
# Download and run installer
curl -fsSL https://raw.githubusercontent.com/your-repo/cpa-dashboard/main/install.sh | bash

# Or with wget
wget -qO- https://raw.githubusercontent.com/your-repo/cpa-dashboard/main/install.sh | bash
```

### Option 2: Manual Installation
```bash
# 1. Extract the downloaded package
unzip cpa-lead-dashboard.zip
cd cpa-lead-dashboard

# 2. Install dependencies
npm install

# 3. Setup database
npm run db:push

# 4. Start the application
npm run dev

# 5. Open browser
# Navigate to http://localhost:3000
```

## 📖 Detailed Installation

### Step 1: Download the Package

Download from one of these sources:
- **GitHub Releases**: https://github.com/your-repo/cpa-dashboard/releases
- **Direct Link**: https://your-domain.com/cpa-lead-dashboard.zip
- **Git Clone**: `git clone https://github.com/your-repo/cpa-dashboard.git`

### Step 2: Extract the Package

**Windows:**
```cmd
# Using PowerShell
Expand-Archive cpa-lead-dashboard.zip -DestinationPath .

# Using Explorer
Right-click on zip file → Extract All...
```

**macOS/Linux:**
```bash
unzip cpa-lead-dashboard.zip
cd cpa-lead-dashboard
```

### Step 3: Install Node.js (if not installed)

**Windows:**
1. Download from https://nodejs.org
2. Run the installer (.msi)
3. Follow the installation wizard

**macOS:**
```bash
# Using Homebrew
brew install node

# Or download from https://nodejs.org
```

**Linux (Ubuntu/Debian):**
```bash
# Using NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Or using Snap
sudo snap install node --classic
```

**Verify Installation:**
```bash
node --version  # Should show v18.0.0 or higher
npm --version   # Should show 8.0.0 or higher
```

### Step 4: Install Dependencies

```bash
# Navigate to project directory
cd cpa-lead-dashboard

# Install all dependencies
npm install

# This will install:
# - Next.js 15 (React framework)
# - Prisma (Database ORM)
# - Socket.IO (Real-time communication)
# - Tailwind CSS (Styling)
# - shadcn/ui (UI components)
# - And other required packages
```

### Step 5: Setup Database

```bash
# Initialize the database
npm run db:push

# This will:
# - Create the SQLite database file
# - Create the Lead table with all required fields
# - Setup database indexes for performance
```

### Step 6: Configure Environment

```bash
# Copy environment template
cp .env.example .env

# Edit the environment file
nano .env  # or use any text editor
```

**Environment Variables:**
```env
# Database configuration
DATABASE_URL="file:./dev.db"

# Optional: Add custom configuration
# NODE_ENV="development"
# PORT=3000
```

### Step 7: Start the Application

**Development Mode:**
```bash
npm run dev
```

**Production Mode:**
```bash
npm run build
npm start
```

### Step 8: Access the Application

Open your web browser and navigate to:
- **Development**: http://localhost:3000
- **Production**: http://localhost:3000 (or your configured port)

## ⚙️ Configuration

### Basic Configuration

Edit the `.env` file to configure basic settings:

```env
# Database
DATABASE_URL="file:./dev.db"

# Server
NODE_ENV="development"
PORT=3000

# Optional: Custom settings
# MAX_LEADS_DISPLAY=100
# EXPORT_LIMIT=10000
```

### Advanced Configuration

For advanced configuration, you can modify:

1. **Database Settings** (`prisma/schema.prisma`)
2. **Server Configuration** (`next.config.js`)
3. **Environment Variables** (`.env`)

### Postback URL Configuration

After installation, configure your CPA platforms with these URLs:

```
Imonetizeit:  https://yourdomain.com/api/postback/imonetizeit
Trafee:       https://yourdomain.com/api/postback/trafee
Clickdealer:  https://yourdomain.com/api/postback/clickdealer
```

## 🧪 Testing

### Test the Installation

1. **Basic Functionality Test:**
   ```bash
   # Test API endpoints
   curl http://localhost:3000/api/leads
   
   # Test postback endpoint
   curl "http://localhost:3000/api/postback/imonetizeit?click_id=test123&payout=5.50&country=US"
   ```

2. **WebSocket Test:**
   - Open the dashboard in browser
   - Send a test postback
   - Verify real-time update

3. **Export Test:**
   - Click the Export button
   - Verify CSV/JSON download

### Test Postback Integration

**Test Imonetizeit Postback:**
```bash
curl -X POST "http://localhost:3000/api/postback/imonetizeit" \
  -d "click_id=test123&payout=5.50&country=US&os=Android"
```

**Test Trafee Postback:**
```bash
curl -X POST "http://localhost:3000/api/postback/trafee" \
  -d "track=test456&sum=10.00&country=GB&name=Test Offer"
```

**Test Clickdealer Postback:**
```bash
curl -X POST "http://localhost:3000/api/postback/clickdealer" \
  -d "s2=test789&price=7.25&country=CA&leadid=lead123"
```

## 🔧 Troubleshooting

### Common Issues and Solutions

#### 1. Port Already in Use
**Error:** `Error: listen EADDRINUSE :::3000`

**Solution:**
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or use different port
PORT=3001 npm run dev
```

#### 2. Database Permission Error
**Error:** `Error: EACCES: permission denied`

**Solution:**
```bash
# Fix database permissions
chmod 664 prisma/dev.db
chmod 775 prisma/

# Or run with sudo (not recommended for production)
sudo npm run dev
```

#### 3. Node.js Version Too Old
**Error:** `Error: Node.js version 16.x is not supported`

**Solution:**
```bash
# Update Node.js using nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 20
nvm use 20
```

#### 4. Dependencies Installation Failed
**Error:** `npm ERR! code ERESOLVE`

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall dependencies
npm install
```

#### 5. WebSocket Connection Failed
**Error:** `WebSocket connection failed`

**Solution:**
```bash
# Check if port is open
telnet localhost 3000

# Restart the application
npm run dev

# Check browser console for errors
```

#### 6. Leads Not Appearing
**Possible Causes:**
- Incorrect postback URL
- Firewall blocking requests
- Database not initialized

**Solutions:**
```bash
# Verify postback URL
curl -v "http://localhost:3000/api/postback/imonetizeit?click_id=test"

# Check database
npm run db:push

# Check logs
npm run dev 2>&1 | tee app.log
```

### Performance Issues

#### Slow Loading Times
```bash
# Check system resources
top  # Linux/macOS
tasklist  # Windows

# Optimize database
npm run db:push -- --force-reset
```

#### High Memory Usage
```bash
# Restart application
pm2 restart cpa-dashboard

# Or manually
pkill -f "next"
npm run dev
```

### Getting Help

If you encounter issues not covered here:

1. **Check the logs:**
   ```bash
   npm run dev 2>&1 | tee debug.log
   ```

2. **Verify system requirements:**
   ```bash
   node --version
   npm --version
   ```

3. **Check network connectivity:**
   ```bash
   curl -I http://localhost:3000
   ```

4. **Create an issue on GitHub:**
   - Go to https://github.com/your-repo/cpa-dashboard/issues
   - Include error messages and system information

## 📞 Support

### Documentation
- **User Guide**: See `USER_GUIDE.md`
- **API Documentation**: See `API_DOCS.md`
- **Deployment Guide**: See `DEPLOYMENT.md`

### Community
- **GitHub Issues**: https://github.com/your-repo/cpa-dashboard/issues
- **Discussions**: https://github.com/your-repo/cpa-dashboard/discussions

### Professional Support
- Email: support@yourdomain.com
- Discord: https://discord.gg/your-server

---

## 🎉 Next Steps

After successful installation:

1. **Configure your CPA platforms** with the postback URLs
2. **Test the integration** with sample data
3. **Set up monitoring** for production use
4. **Configure backup** for your database
5. **Consider SSL setup** for production deployment

Happy tracking! 🚀