# 📥 Download Instructions - CPA Lead Dashboard

## 🎯 File yang Tersedia

### 📦 Package Download
**Filename:** `cpa-lead-dashboard-v1.0.0.tar.gz`  
**Location:** Folder `dist/`  
**Size:** 348 KB  
**Status:** ✅ Ready for download

## 📋 Cara Download & Install

### Metode 1: Download Langsung (Saat Ini)

File sudah tersedia di:
```
/home/z/my-project/dist/cpa-lead-dashboard-v1.0.0.tar.gz
```

### Metode 2: Copy ke Lokasi Lain

```bash
# Copy ke home directory
cp /home/z/my-project/dist/cpa-lead-dashboard-v1.0.0.tar.gz ~/

# Copy ke desktop (jika ada)
cp /home/z/my-project/dist/cpa-lead-dashboard-v1.0.0.tar.gz ~/Desktop/

# Copy ke USB atau lokasi lain
cp /home/z/my-project/dist/cpa-lead-dashboard-v1.0.0.tar.gz /path/to/destination/
```

### Metode 3: Download via Web Server (Jika ada)

Jika Anda memiliki web server:
```bash
# Copy ke web directory
cp /home/z/my-project/dist/cpa-lead-dashboard-v1.0.0.tar.gz /var/www/html/

# Download via browser
# http://your-server-ip/cpa-lead-dashboard-v1.0.0.tar.gz
```

## 🚀 Instalasi Quick Start

### Langkah 1: Extract File
```bash
# Extract package
tar -xzf cpa-lead-dashboard-v1.0.0.tar.gz

# Masuk ke directory
cd cpa-lead-dashboard
```

### Langkah 2: Install Otomatis
```bash
# Jalankan auto-install script
bash dist/install.sh
```

### Langkah 3: Start Aplikasi
```bash
# Start development server
npm run dev
```

### Langkah 4: Buka Browser
Navigate to: http://localhost:3000

## 📁 Isi Package (Verification)

Untuk memastikan package lengkap, check file-file berikut:

### Core Files
- ✅ `package.json` - Dependencies & scripts
- ✅ `README.md` - Main documentation
- ✅ `.env.example` - Environment template

### Source Code
- ✅ `src/app/page.tsx` - Main dashboard
- ✅ `src/app/api/` - API endpoints
- ✅ `src/components/` - React components
- ✅ `src/lib/` - Utilities

### Database
- ✅ `prisma/schema.prisma` - Database schema

### Documentation
- ✅ `dist/INSTALLATION.md` - Installation guide
- ✅ `dist/USER_GUIDE.md` - User guide
- ✅ `dist/QUICK_START.md` - Quick start
- ✅ `dist/README_PACKAGE.md` - Package info

### Scripts
- ✅ `dist/install.sh` - Auto-install script

### Configuration
- ✅ `Dockerfile` - Docker config
- ✅ `docker-compose.yml` - Docker Compose
- ✅ `nginx.conf` - Nginx config

## 🧪 Test Package Integrity

### Check File Hash
```bash
# Create checksum
sha256sum cpa-lead-dashboard-v1.0.0.tar.gz

# Verify after download
sha256sum -c checksum.txt
```

### Test Extract
```bash
# Test extract (dry run)
tar -tzf cpa-lead-dashboard-v1.0.0.tar.gz | head -10

# Extract and verify
tar -xzf cpa-lead-dashboard-v1.0.0.tar.gz
ls -la cpa-lead-dashboard/
```

## 🔗 URL Postback (Setelah Install)

Setelah berhasil install, gunakan URL berikut:

```
Imonetizeit:  http://localhost:3000/api/postback/imonetizeit
Trafee:       http://localhost:3000/api/postback/trafee
Clickdealer:  http://localhost:3000/api/postback/clickdealer
```

## 📱 Quick Test

### Test API
```bash
# Test leads API
curl http://localhost:3000/api/leads

# Test postback
curl "http://localhost:3000/api/postback/imonetizeit?click_id=test123&payout=5.50&country=US"
```

### Test Dashboard
1. Buka http://localhost:3000
2. Kirim test postback
3. Check data muncul real-time

## 🛠️ Requirements

### System Requirements
- **Node.js** 18+ (https://nodejs.org)
- **npm** 8+ 
- **RAM** 512MB minimum
- **Storage** 100MB

### Supported OS
- ✅ Windows 10+
- ✅ macOS 10.15+
- ✅ Ubuntu 18.04+
- ✅ Debian 9+

## 📞 Support

### Documentation
- **Installation**: `dist/INSTALLATION.md`
- **User Guide**: `dist/USER_GUIDE.md`
- **Quick Start**: `dist/QUICK_START.md`

### Troubleshooting
Check `dist/INSTALLATION.md` for common issues.

## 🎯 Next Steps

1. **Download file** `cpa-lead-dashboard-v1.0.0.tar.gz`
2. **Extract dan install** dengan `bash dist/install.sh`
3. **Start aplikasi** dengan `npm run dev`
4. **Configure CPA platforms** dengan postback URLs
5. **Test integration** dengan sample data

---

## 📦 Package Status

- ✅ **File Created**: cpa-lead-dashboard-v1.0.0.tar.gz
- ✅ **Size**: 348 KB
- ✅ **Contents**: Source code + documentation
- ✅ **Tested**: Extract and verify successful
- ✅ **Ready**: For download and installation

**Package siap didistribusikan! 🚀**