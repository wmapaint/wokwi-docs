import React, { useState, useEffect } from 'react';
import ProductionDashboard from './components/ProductionDashboard';
import ProductionReport from './components/ProductionReport';
import IoTIntegration from './components/IoTIntegration';
import Navigation from './components/Navigation';
import './App.css';

const App = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [iotData, setIotData] = useState<any[]>([]);

  // Simulasi data IoT
  useEffect(() => {
    // Dalam implementasi nyata, ini akan terhubung ke WebSocket/MQTT
    const mockIoTData = [
      { id: 1, machineId: 'M001', status: 'running', temperature: 65.2, pressure: 1.2, productionRate: 45, timestamp: new Date() },
      { id: 2, machineId: 'M002', status: 'idle', temperature: 42.1, pressure: 0.8, productionRate: 0, timestamp: new Date() },
      { id: 3, machineId: 'M003', status: 'maintenance', temperature: 35.0, pressure: 0.0, productionRate: 0, timestamp: new Date() },
    ];
    
    setIotData(mockIoTData);
  }, []);

  const renderActiveView = () => {
    switch(activeView) {
      case 'dashboard':
        return <ProductionDashboard iotData={iotData} />;
      case 'reports':
        return <ProductionReport />;
      case 'iot':
        return <IoTIntegration iotData={iotData} />;
      default:
        return <ProductionDashboard iotData={iotData} />;
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Sistem ERP Produksi Terintegrasi IoT</h1>
      </header>
      
      <Navigation activeView={activeView} setActiveView={setActiveView} />
      
      <main className="app-main">
        {renderActiveView()}
      </main>
    </div>
  );
};

export default App;
