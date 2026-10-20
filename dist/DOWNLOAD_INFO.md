# 📦 CPA Lead Dashboard - Download Information

## 🚀 Cara Download Source Code

### Opsi 1: Download Langsung (Rekomendasi)

**Link Download:**
```
📁 [Download CPA Lead Dashboard v1.0.0](./cpa-lead-dashboard-v1.0.0.zip)
```

File ini berisi:
- ✅ Source code lengkap
- ✅ Database setup
- ✅ Tutorial instalasi
- ✅ Script otomatis
- ✅ Docker configuration
- ✅ Semua dokumentasi

### Opsi 2: Download Manual

Jika link di atas tidak berfungsi, ikuti langkah berikut:

1. **Download file-file berikut satu per satu:**
   - [package.json](../package.json)
   - [README.md](../README.md)
   - [DEPLOYMENT.md](../DEPLOYMENT.md)
   - [INSTALLATION.md](./INSTALLATION.md)
   - [USER_GUIDE.md](./USER_GUIDE.md)

2. **Download folder struktur:**
   - [src/](../src/) - Frontend code
   - [prisma/](../prisma/) - Database schema
   - [public/](../public/) - Static files

### Opsi 3: Git Clone (Untuk developer)

```bash
git clone https://github.com/your-username/cpa-lead-dashboard.git
cd cpa-lead-dashboard
```

## 📁 Isi Package Download

```
cpa-lead-dashboard-v1.0.0.zip
├── 📄 README.md                    # Dokumentasi utama
├── 📄 package.json                 # Dependencies & scripts
├── 📄 .env.example                 # Environment template
├── 📄 DEPLOYMENT.md                # Panduan deployment
├── 📄 INSTALLATION.md              # Panduan instalasi
├── 📄 USER_GUIDE.md                # Panduan pengguna
├── 📄 Dockerfile                   # Docker configuration
├── 📄 docker-compose.yml           # Docker Compose
├── 📄 nginx.conf                   # Nginx config
├── 📁 src/                         # Source code
│   ├── 📁 app/                     # Next.js app router
│   │   ├── 📄 page.tsx            # Main dashboard
│   │   └── 📁 api/                # API endpoints
│   │       ├── 📁 postback/        # Postback handlers
│   │       ├── 📁 leads/           # Leads API
│   │       └── 📁 export/          # Export API
│   ├── 📁 components/              # React components
│   │   └── 📁 ui/                 # UI components
│   ├── 📁 lib/                     # Utilities
│   │   ├── 📄 db.ts               # Database client
│   │   └── 📄 socket.ts           # WebSocket setup
│   └── 📁 hooks/                   # Custom hooks
├── 📁 prisma/                      # Database
│   ├── 📄 schema.prisma           # Database schema
│   └── 📁 migrations/             # Database migrations
├── 📁 public/                      # Static files
├── 📁 dist/                        # Distribution files
│   ├── 📄 INSTALLATION.md         # Installation guide
│   ├── 📄 USER_GUIDE.md           # User guide
│   └── 📄 DOWNLOAD_INFO.md        # This file
└── 📄 install.sh                   # Auto-install script
```

## 🔧 Cara Instalasi (Quick Start)

### 1. Extract File
```bash
# Windows
# Right-click → Extract All

# macOS/Linux
unzip cpa-lead-dashboard-v1.0.0.zip
cd cpa-lead-dashboard
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Database
```bash
npm run db:push
```

### 4. Start Application
```bash
npm run dev
```

### 5. Buka Browser
Navigate to: http://localhost:3000

## 📋 Postback URLs (Setelah Instalasi)

Setelah instalasi, gunakan URL berikut di dashboard CPA Anda:

```
Imonetizeit:  http://localhost:3000/api/postback/imonetizeit
Trafee:       http://localhost:3000/api/postback/trafee  
Clickdealer:  http://localhost:3000/api/postback/clickdealer
```

## 🎯 Fitur Utama

- ✅ **Real-time Updates** - Data muncul otomatis
- ✅ **Multi-Platform** - Support 3 platform CPA
- ✅ **Country Flags** - Tampilan bendera negara
- ✅ **Advanced Filter** - Filter tanggal & ID
- ✅ **Export Data** - Download CSV/JSON
- ✅ **Responsive** - Mobile friendly
- ✅ **WebSocket** - Real-time connection

## 🛠️ Requirements

- **Node.js** 18+ 
- **npm** 8+
- **RAM** 512MB minimum
- **Storage** 100MB

## 📞 Support

Jika mengalami masalah:
1. Baca file `INSTALLATION.md`
2. Baca file `USER_GUIDE.md`
3. Check troubleshooting section
4. Hubungi support

---

**Version:** 1.0.0  
**Last Updated:** 2024-01-15  
**Size:** ~15MB (zipped)  
**License:** MIT