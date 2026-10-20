# 📦 CPA Lead Dashboard - Package Information

## 🎯 File Download Tersedia

### 📁 Main Package
**File:** `cpa-lead-dashboard-v1.0.0.tar.gz`  
**Size:** 348 KB (compressed)  
**Contains:** Source code lengkap + documentation

### 📋 Cara Download

#### Metode 1: Direct Download
File sudah tersedia di folder `dist/` dengan nama:
```
cpa-lead-dashboard-v1.0.0.tar.gz
```

#### Metode 2: Extract & Install
```bash
# 1. Extract file
tar -xzf cpa-lead-dashboard-v1.0.0.tar.gz
cd cpa-lead-dashboard

# 2. Install otomatis
bash dist/install.sh

# 3. Start aplikasi
npm run dev
```

#### Metode 3: Manual Install
```bash
# 1. Extract file
tar -xzf cpa-lead-dashboard-v1.0.0.tar.gz
cd cpa-lead-dashboard

# 2. Install dependencies
npm install

# 3. Setup database
npm run db:push

# 4. Start aplikasi
npm run dev
```

## 📁 Isi Package

### Source Code
- ✅ **Frontend**: Next.js 15 + TypeScript + Tailwind CSS
- ✅ **Backend**: API Routes + Prisma ORM + Socket.IO
- ✅ **Database**: SQLite dengan schema lengkap
- ✅ **UI Components**: shadcn/ui components

### API Endpoints
- ✅ `/api/postback/imonetizeit` - Imonetizeit postback
- ✅ `/api/postback/trafee` - Trafee postback  
- ✅ `/api/postback/clickdealer` - Clickdealer postback
- ✅ `/api/leads` - Get leads data
- ✅ `/api/export` - Export CSV/JSON

### Documentation
- ✅ **INSTALLATION.md** - Panduan instalasi lengkap
- ✅ **USER_GUIDE.md** - Panduan pengguna
- ✅ **QUICK_START.md** - Quick start guide
- ✅ **DEPLOYMENT.md** - Panduan deployment
- ✅ **README.md** - Dokumentasi utama

### Configuration Files
- ✅ **package.json** - Dependencies & scripts
- ✅ **.env.example** - Environment template
- ✅ **Dockerfile** - Docker configuration
- ✅ **docker-compose.yml** - Docker Compose
- ✅ **nginx.conf** - Nginx configuration
- ✅ **install.sh** - Auto-install script

## 🚀 Quick Start (3 Langkah)

### 1. Extract
```bash
tar -xzf cpa-lead-dashboard-v1.0.0.tar.gz
cd cpa-lead-dashboard
```

### 2. Install
```bash
bash dist/install.sh
```

### 3. Start
```bash
npm run dev
```

Buka browser: http://localhost:3000

## 🔗 Postback URLs

Setelah instalasi, gunakan URL berikut:

```
Imonetizeit:  http://localhost:3000/api/postback/imonetizeit
Trafee:       http://localhost:3000/api/postback/trafee
Clickdealer:  http://localhost:3000/api/postback/clickdealer
```

## 🧪 Test Installation

### Test Postback
```bash
# Test Imonetizeit
curl "http://localhost:3000/api/postback/imonetizeit?click_id=test123&payout=5.50&country=US"

# Test Trafee
curl "http://localhost:3000/api/postback/trafee?track=test456&sum=10.00&country=GB"

# Test Clickdealer
curl "http://localhost:3000/api/postback/clickdealer?s2=test789&price=7.25&country=CA"
```

### Test Dashboard
1. Buka http://localhost:3000
2. Kirim test postback
3. Verifikasi data muncul real-time

## 📋 Requirements

### System Requirements
- **Node.js** 18+ (https://nodejs.org)
- **npm** 8+ (included with Node.js)
- **RAM** 512MB minimum
- **Storage** 100MB free space

### Supported OS
- ✅ Windows 10+
- ✅ macOS 10.15+
- ✅ Ubuntu 18.04+
- ✅ Debian 9+
- ✅ CentOS 7+

## 🛠️ Installation Methods

### Method 1: Auto-Install (Recommended)
```bash
bash dist/install.sh
```

### Method 2: Manual Install
```bash
npm install
npm run db:push
npm run dev
```

### Method 3: Docker
```bash
docker-compose up -d
```

### Method 4: Development
```bash
npm run dev
```

## 📊 Features

### Real-time Features
- ✅ WebSocket connection
- ✅ Live lead updates
- ✅ Auto-refresh table
- ✅ Connection status indicator

### Data Management
- ✅ Advanced filtering
- ✅ Search functionality
- ✅ Date range selection
- ✅ Export to CSV/JSON
- ✅ Pagination support

### UI/UX Features
- ✅ Responsive design
- ✅ Country flags display
- ✅ Platform badges
- ✅ Dark/light theme ready
- ✅ Mobile optimized

## 🔧 Configuration

### Environment Variables
```env
DATABASE_URL="file:./dev.db"
NODE_ENV="development"
PORT=3000
```

### Database Configuration
- **Type**: SQLite
- **ORM**: Prisma
- **Location**: `prisma/dev.db`
- **Backup**: Manual export recommended

## 🚀 Deployment Options

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm start
```

### Docker
```bash
docker-compose up -d
```

### Vercel
1. Push to GitHub
2. Import to Vercel
3. Deploy automatically

### Traditional Hosting
1. Build application
2. Setup reverse proxy
3. Configure SSL
4. Deploy with PM2

## 📞 Support

### Documentation
- **Installation**: `dist/INSTALLATION.md`
- **User Guide**: `dist/USER_GUIDE.md`
- **Quick Start**: `dist/QUICK_START.md`
- **Deployment**: `DEPLOYMENT.md`

### Troubleshooting
Check `dist/INSTALLATION.md` for common issues and solutions.

### Community Support
- GitHub Issues for bug reports
- Documentation for self-help
- Email support for enterprise users

## 🎯 Next Steps

After successful installation:

1. **Configure CPA Platforms**
   - Set postback URLs
   - Test integration
   - Monitor incoming data

2. **Customize Dashboard**
   - Adjust filters
   - Set up exports
   - Configure alerts

3. **Monitor Performance**
   - Check server resources
   - Monitor database size
   - Set up backups

4. **Scale Up**
   - Move to production hosting
   - Set up SSL certificate
   - Configure monitoring

---

## 📦 Package Summary

- **Name**: CPA Lead Dashboard
- **Version**: 1.0.0
- **Size**: 348 KB (compressed)
- **Format**: tar.gz
- **License**: MIT
- **Support**: Documentation + Community

**Ready to download and install! 🚀**