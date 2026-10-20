# 📦 CPA Lead Dashboard - Complete Package

## 🎯 Apa Ini?

CPA Lead Dashboard adalah aplikasi web lengkap untuk menerima dan menampilkan data lead dari berbagai platform CPA (Cost Per Action) secara real-time.

### Platform yang Didukung:
- ✅ **Imonetizeit** - `<click_id>`, `<payout>`, `<country>`
- ✅ **Trafee** - `{track}`, `{sum}`, `{country}`
- ✅ **Clickdealer** - `#s2#`, `#price#`, `#country#`

## 🚀 Fitur Utama

- **🔄 Real-time Updates** - Data muncul otomatis tanpa refresh
- **🌍 Country Flags** - Tampilan bendera negara (🇺🇸🇬🇧🇨🇦🇦🇺)
- **📊 Advanced Filtering** - Filter berdasarkan tanggal dan ID
- **📤 Export Data** - Download data dalam format CSV/JSON
- **📱 Responsive Design** - Bekerja di desktop dan mobile
- **🎯 Multi-Platform** - Support 3 platform CPA utama

## 📋 System Requirements

### Minimum:
- **Node.js** 18.0+
- **npm** 8.0+
- **RAM** 512MB
- **Storage** 100MB

### Recommended:
- **Node.js** 20.0+
- **RAM** 1GB+
- **Storage** 1GB+

## 🔧 Cara Instalasi

### Opsi 1: Auto-Install (Rekomendasi)
```bash
# Extract file
unzip cpa-lead-dashboard-v1.0.0.zip
cd cpa-lead-dashboard

# Jalankan installer
bash install.sh

# Start aplikasi
npm run dev
```

### Opsi 2: Manual Install
```bash
# Extract file
unzip cpa-lead-dashboard-v1.0.0.zip
cd cpa-lead-dashboard

# Install dependencies
npm install

# Setup database
npm run db:push

# Start aplikasi
npm run dev
```

### Opsi 3: Development Mode
```bash
# Untuk development
npm run dev

# Untuk production
npm run build
npm start
```

## 🌐 Akses Aplikasi

Setelah instalasi, buka browser dan navigasikan ke:
- **Development**: http://localhost:3000
- **Production**: http://localhost:3000 (atau port yang dikonfigurasi)

## 🔗 Postback Configuration

### Imonetizeit
```
URL: http://yourdomain.com/api/postback/imonetizeit
Method: GET/POST
Required: <click_id>, <payout>, <country>
Optional: <click_id2-5>, <token_1-2>, <os>, <traffic_type>
```

### Trafee
```
URL: http://yourdomain.com/api/postback/trafee
Method: GET/POST
Required: {track}, {sum}, {country}
Optional: {name}, {goal}, {currency}, {ext_click_id}
```

### Clickdealer
```
URL: http://yourdomain.com/api/postback/clickdealer
Method: GET/POST
Required: #s2#, #price#, #country#
Optional: #leadid#, #affid#, #oid#, #campid#
```

## 📁 Struktur File

```
cpa-lead-dashboard/
├── 📄 package.json              # Dependencies & scripts
├── 📄 README.md                 # Dokumentasi utama
├── 📄 .env.example              # Environment template
├── 📁 src/                      # Source code
│   ├── 📁 app/                  # Next.js app router
│   │   ├── 📄 page.tsx         # Main dashboard
│   │   └── 📁 api/             # API endpoints
│   ├── 📁 components/           # React components
│   ├── 📁 lib/                 # Utilities
│   └── 📁 hooks/               # Custom hooks
├── 📁 prisma/                   # Database
│   └── 📄 schema.prisma        # Database schema
├── 📁 public/                   # Static files
├── 📁 dist/                     # Distribution files
│   ├── 📄 INSTALLATION.md      # Installation guide
│   ├── 📄 USER_GUIDE.md        # User guide
│   ├── 📄 QUICK_START.md       # Quick start
│   └── 📄 install.sh           # Auto-install script
├── 📄 Dockerfile                # Docker config
├── 📄 docker-compose.yml        # Docker Compose
└── 📄 nginx.conf                # Nginx config
```

## 🧪 Testing

### Test API Endpoints
```bash
# Test leads API
curl http://localhost:3000/api/leads

# Test postback endpoints
curl "http://localhost:3000/api/postback/imonetizeit?click_id=test&payout=5.50&country=US"
```

### Test Real-time Updates
1. Buka dashboard di browser
2. Kirim test postback
3. Verifikasi data muncul otomatis

## 🚀 Deployment

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

### Vercel (Recommended)
1. Push ke GitHub
2. Import ke Vercel
3. Deploy otomatis

## 📊 Database Schema

Aplikasi menggunakan SQLite dengan Prisma ORM. Model utama:

```prisma
model Lead {
  id              String   @id @default(cuid())
  platform        String   // imonetizeit, trafee, clickdealer
  clickId         String?  // Primary ID
  country         String?
  payout          Float?
  currency        String?
  createdAt       DateTime @default(now())
  // ... lebih banyak field
}
```

## 🔍 Monitoring & Logging

### Development Logs
```bash
npm run dev 2>&1 | tee app.log
```

### Production Logs
```bash
pm2 logs cpa-dashboard
```

### Database Monitoring
```bash
npm run db:studio
```

## 🛠️ Troubleshooting

### Common Issues

**Port 3000 sudah digunakan:**
```bash
# Kill process
lsof -ti:3000 | xargs kill -9

# Atau gunakan port lain
PORT=3001 npm run dev
```

**Database permission error:**
```bash
chmod 664 prisma/dev.db
chmod 775 prisma/
```

**Dependencies installation failed:**
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## 📚 Documentation

- **Installation Guide**: `dist/INSTALLATION.md`
- **User Guide**: `dist/USER_GUIDE.md`
- **Deployment Guide**: `DEPLOYMENT.md`
- **Quick Start**: `dist/QUICK_START.md`

## 🎨 Screenshots

*(Screenshots akan ditambahkan)*

## 📞 Support

### Self-Service
1. Baca dokumentasi di folder `dist/`
2. Check troubleshooting section
3. Test dengan sample data

### Community
- GitHub Issues: Report bugs & request features
- Discord: Live chat support

### Professional Support
- Email: support@yourdomain.com
- Priority support for enterprise users

## 🔄 Updates

### Version 1.0.0 (Current)
- ✅ Real-time lead tracking
- ✅ Multi-platform support
- ✅ Export functionality
- ✅ Responsive design
- ✅ WebSocket integration

### Upcoming Features
- 🔄 Analytics dashboard
- 🔄 Custom notifications
- 🔄 Advanced reporting
- 🔄 API authentication
- 🔄 Multi-user support

## 📄 License

MIT License - Free untuk penggunaan personal dan commercial.

---

## 🎉 Selamat Menggunakan!

Terima kasih telah menggunakan CPA Lead Dashboard. Jika Anda memiliki pertanyaan atau membutuhkan bantuan, jangan ragu untuk menghubungi support.

**Happy Tracking! 🚀**