import React from 'react';
import './MachineStatusCard.css';

interface Machine {
  id: number;
  machineId: string;
  status: string;
  temperature: number;
  pressure: number;
  productionRate: number;
  timestamp: Date;
}

interface MachineStatusCardProps {
  machine: Machine;
}

const MachineStatusCard: React.FC<MachineStatusCardProps> = ({ machine }) => {
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'running': return '#2ecc71';
      case 'idle': return '#f39c12';
      case 'maintenance': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'running': return 'Berjalan';
      case 'idle': return 'Idle';
      case 'maintenance': return 'Perawatan';
      default: return status;
    }
  };

  return (
    <div className="machine-status-card">
      <div className="card-header">
        <h3>{machine.machineId}</h3>
        <span 
          className="status-indicator" 
          style={{ backgroundColor: getStatusColor(machine.status) }}
        >
          {getStatusText(machine.status)}
        </span>
      </div>
      
      <div className="card-content">
        <div className="metric">
          <span className="metric-label">Suhu:</span>
          <span className="metric-value">{machine.temperature}°C</span>
        </div>
        
        <div className="metric">
          <span className="metric-label">Tekanan:</span>
          <span className="metric-value">{machine.pressure} bar</span>
        </div>
        
        <div className="metric">
          <span className="metric-label">Produksi:</span>
          <span className="metric-value">{machine.productionRate} unit/jam</span>
        </div>
        
        <div className="metric">
          <span className="metric-label">Terakhir Update:</span>
          <span className="metric-value">{new Date(machine.timestamp).toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
};

export default MachineStatusCard;