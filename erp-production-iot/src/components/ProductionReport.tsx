import React, { useState } from 'react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import './ProductionReport.css';

// Interface untuk data laporan produksi
interface ProductionRecord {
  id: number;
  machineId: string;
  date: Date;
  startTime: string;
  endTime: string;
  unitsProduced: number;
  unitsRejected: number;
  efficiency: number; // dalam persen
  operator: string;
}

const ProductionReport: React.FC = () => {
  // Data contoh laporan produksi
  const [reportData] = useState<ProductionRecord[]>([
    {
      id: 1,
      machineId: 'M001',
      date: new Date(2025, 0, 15),
      startTime: '08:00',
      endTime: '16:00',
      unitsProduced: 450,
      unitsRejected: 12,
      efficiency: 94.2,
      operator: 'Budi Santoso'
    },
    {
      id: 2,
      machineId: 'M002',
      date: new Date(2025, 0, 15),
      startTime: '08:00',
      endTime: '16:00',
      unitsProduced: 380,
      unitsRejected: 8,
      efficiency: 91.5,
      operator: 'Andi Prasetyo'
    },
    {
      id: 3,
      machineId: 'M003',
      date: new Date(2025, 0, 15),
      startTime: '16:00',
      endTime: '00:00',
      unitsProduced: 420,
      unitsRejected: 15,
      efficiency: 89.7,
      operator: 'Rina Kumala'
    },
    {
      id: 4,
      machineId: 'M001',
      date: new Date(2025, 0, 14),
      startTime: '08:00',
      endTime: '16:00',
      unitsProduced: 435,
      unitsRejected: 10,
      efficiency: 95.1,
      operator: 'Budi Santoso'
    },
    {
      id: 5,
      machineId: 'M002',
      date: new Date(2025, 0, 14),
      startTime: '08:00',
      endTime: '16:00',
      unitsProduced: 395,
      unitsRejected: 7,
      efficiency: 93.2,
      operator: 'Andi Prasetyo'
    }
  ]);

  const [filterDate, setFilterDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [timeRange, setTimeRange] = useState<string>('all');

  // Filter data berdasarkan tanggal
  const filteredData = reportData.filter(record => 
    format(record.date, 'yyyy-MM-dd') === filterDate
  );

  // Fungsi untuk menghitung total statistik
  const totalUnits = filteredData.reduce((sum, record) => sum + record.unitsProduced, 0);
  const totalRejected = filteredData.reduce((sum, record) => sum + record.unitsRejected, 0);
  const avgEfficiency = filteredData.length > 0 
    ? (filteredData.reduce((sum, record) => sum + record.efficiency, 0) / filteredData.length).toFixed(1)
    : '0.0';

  return (
    <div className="production-report">
      <h2>Laporan Produksi</h2>
      
      <div className="report-controls">
        <div className="control-group">
          <label htmlFor="filter-date">Tanggal:</label>
          <input
            type="date"
            id="filter-date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </div>
        
        <div className="control-group">
          <label htmlFor="time-range">Rentang Waktu:</label>
          <select 
            id="time-range" 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="all">Semua</option>
            <option value="morning">Pagi (08:00-16:00)</option>
            <option value="evening">Sore (16:00-00:00)</option>
            <option value="night">Malam (00:00-08:00)</option>
          </select>
        </div>
      </div>
      
      <div className="report-summary">
        <div className="summary-item">
          <h3>Total Unit Diproduksi</h3>
          <p className="summary-value">{totalUnits}</p>
        </div>
        <div className="summary-item">
          <h3>Total Unit Ditolak</h3>
          <p className="summary-value rejected">{totalRejected}</p>
        </div>
        <div className="summary-item">
          <h3>Efisiensi Rata-rata</h3>
          <p className="summary-value">{avgEfficiency}%</p>
        </div>
      </div>
      
      <div className="report-table-container">
        <table className="report-table">
          <thead>
            <tr>
              <th>ID Mesin</th>
              <th>Tanggal</th>
              <th>Jam Kerja</th>
              <th>Operator</th>
              <th>Unit Diproduksi</th>
              <th>Unit Ditolak</th>
              <th>Efisiensi</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map(record => (
                <tr key={record.id}>
                  <td>{record.machineId}</td>
                  <td>{format(record.date, 'dd MMM yyyy', { locale: id })}</td>
                  <td>{record.startTime} - {record.endTime}</td>
                  <td>{record.operator}</td>
                  <td>{record.unitsProduced}</td>
                  <td>{record.unitsRejected}</td>
                  <td><span className={`efficiency ${record.efficiency >= 90 ? 'good' : record.efficiency >= 80 ? 'average' : 'poor'}`}>{record.efficiency}%</span></td>
                  <td>
                    <button className="action-btn view">Lihat</button>
                    <button className="action-btn export">Ekspor</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8}>Tidak ada data untuk tanggal yang dipilih</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductionReport;