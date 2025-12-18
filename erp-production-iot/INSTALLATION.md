# Instalasi Aplikasi ERP Produksi Terintegrasi IoT

## Prasyarat Sistem
- Node.js versi 16 atau lebih baru
- npm atau yarn package manager

## Instalasi Dependensi

Karena keterbatasan memori di lingkungan development, instalasi dependensi perlu dilakukan secara bertahap:

### 1. Instal dependensi utama
```bash
npm install react-router-dom --legacy-peer-deps
```

### 2. Instal dependensi chart
```bash
npm install chart.js react-chartjs-2 --legacy-peer-deps
```

### 3. Instal dependensi IoT
```bash
npm install socket.io-client date-fns --legacy-peer-deps
```

### 4. Instal dependensi form (opsional)
```bash
npm install react-hook-form yup --legacy-peer-deps
```

## Konfigurasi Development Server

1. Pastikan semua dependensi telah terinstal
2. Jalankan development server:
```bash
npm run dev
```

3. Buka browser dan akses `http://localhost:5173`

## Konfigurasi IoT

Untuk menghubungkan dengan perangkat IoT, Anda perlu:

1. Menyiapkan MQTT broker (misalnya Mosquitto) atau WebSocket server
2. Mengganti konfigurasi di komponen IoTIntegration dengan alamat broker Anda
3. Pastikan perangkat IoT Anda mengirim data ke topik yang sesuai

## Struktur Proyek

```
src/
├── components/
│   ├── Navigation.tsx
│   ├── ProductionDashboard.tsx
│   ├── ProductionReport.tsx
│   ├── IoTIntegration.tsx
│   ├── MachineStatusCard.tsx
│   ├── ProductionChart.tsx
│   └── (dan lainnya)
├── App.tsx
└── main.tsx
```

## Fitur Utama

1. **Dashboard Produksi** - Menampilkan status real-time mesin produksi
2. **Laporan Produksi** - Menyediakan laporan historis dan filter
3. **Integrasi IoT** - Menyediakan antarmuka untuk perangkat IoT
4. **Visualisasi Data** - Menampilkan grafik produksi dan metrik