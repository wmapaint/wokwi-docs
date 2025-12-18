import React from 'react';
import MachineStatusCard from './MachineStatusCard';
import ProductionChart from './ProductionChart';
import './ProductionDashboard.css';

interface IoTDataItem {
  id: number;
  machineId: string;
  status: string;
  temperature: number;
  pressure: number;
  productionRate: number;
  timestamp: Date;
}

interface ProductionDashboardProps {
  iotData: IoTDataItem[];
}

const ProductionDashboard: React.FC<ProductionDashboardProps> = ({ iotData }) => {
  // Hitung total mesin
  const totalMachines = iotData.length;
  const runningMachines = iotData.filter(m => m.status === 'running').length;
  const idleMachines = iotData.filter(m => m.status === 'idle').length;
  const maintenanceMachines = iotData.filter(m => m.status === 'maintenance').length;

  // Hitung produksi total
  const totalProduction = iotData.reduce((sum, machine) => sum + machine.productionRate, 0);

  return (
    <div className="production-dashboard">
      <h2>Dashboard Produksi</h2>
      
      <div className="dashboard-summary">
        <div className="summary-card">
          <h3>Total Mesin</h3>
          <p className="summary-number">{totalMachines}</p>
        </div>
        <div className="summary-card">
          <h3>Mesin Aktif</h3>
          <p className="summary-number running">{runningMachines}</p>
        </div>
        <div className="summary-card">
          <h3>Mesin Idle</h3>
          <p className="summary-number idle">{idleMachines}</p>
        </div>
        <div className="summary-card">
          <h3>Maintenance</h3>
          <p className="summary-number maintenance">{maintenanceMachines}</p>
        </div>
        <div className="summary-card">
          <h3>Produksi Total</h3>
          <p className="summary-number">{totalProduction} unit/jam</p>
        </div>
      </div>

      <div className="dashboard-charts">
        <ProductionChart iotData={iotData} />
      </div>

      <div className="machine-status-grid">
        {iotData.map(machine => (
          <MachineStatusCard key={machine.id} machine={machine} />
        ))}
      </div>
    </div>
  );
};

export default ProductionDashboard;