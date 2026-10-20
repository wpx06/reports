# 🚀 CPA Lead Dashboard - Quick Start Guide

## 📋 Langkah Instalasi (5 Menit)

### Metode 1: Instalasi Otomatis (Rekomendasi)

```bash
# 1. Download file
# Simpan file cpa-lead-dashboard-v1.0.0.zip

# 2. Extract file
unzip cpa-lead-dashboard-v1.0.0.zip
cd cpa-lead-dashboard

# 3. Jalankan installer otomatis
bash install.sh

# 4. Start aplikasi
npm run dev

# 5. Buka browser
# http://localhost:3000
```

### Metode 2: Instalasi Manual

```bash
# 1. Extract file
unzip cpa-lead-dashboard-v1.0.0.zip
cd cpa-lead-dashboard

# 2. Install dependencies
npm install

# 3. Setup database
npm run db:push

# 4. Start aplikasi
npm run dev

# 5. Buka browser
# http://localhost:3000
```

## 🔗 Postback URLs

Setelah instalasi, konfigurasi CPA platform Anda dengan URL berikut:

```
Imonetizeit:  http://localhost:3000/api/postback/imonetizeit
Trafee:       http://localhost:3000/api/postback/trafee
Clickdealer:  http://localhost:3000/api/postback/clickdealer
```

## 🧪 Testing Postback

**Test Imonetizeit:**
```bash
curl "http://localhost:3000/api/postback/imonetizeit?click_id=test123&payout=5.50&country=US"
```

**Test Trafee:**
```bash
curl "http://localhost:3000/api/postback/trafee?track=test456&sum=10.00&country=GB"
```

**Test Clickdealer:**
```bash
curl "http://localhost:3000/api/postback/clickdealer?s2=test789&price=7.25&country=CA"
```

## 📱 Fitur Utama

- ✅ **Real-time Updates** - Data muncul otomatis
- ✅ **Multi-Platform** - Support 3 platform CPA
- ✅ **Country Flags** - Tampilan bendera negara 🇺🇸🇬🇧🇨🇦
- ✅ **Advanced Filter** - Filter tanggal & ID
- ✅ **Export Data** - Download CSV/JSON
- ✅ **Responsive** - Mobile friendly

## 🛠️ Requirements

- **Node.js** 18+ 
- **npm** 8+
- **RAM** 512MB minimum
- **Storage** 100MB

## 📞 Support

Jika ada masalah:
1. Baca `dist/INSTALLATION.md`
2. Baca `dist/USER_GUIDE.md`
3. Check troubleshooting section

---

**Selamat menggunakan CPA Lead Dashboard! 🎉**