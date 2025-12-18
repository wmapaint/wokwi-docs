import React, { useState, useEffect } from 'react';
import './IoTIntegration.css';

interface IoTDevice {
  id: number;
  deviceId: string;
  deviceType: string;
  location: string;
  status: string;
  lastUpdate: Date;
  sensorData: {
    temperature?: number;
    pressure?: number;
    humidity?: number;
    vibration?: number;
    productionRate?: number;
  };
}

interface IoTIntegrationProps {
  iotData: any[]; // Tipe sementara, akan diperbaiki setelah instalasi dependensi
}

const IoTIntegration: React.FC<IoTIntegrationProps> = ({ iotData }) => {
  const [devices, setDevices] = useState<IoTDevice[]>([
    {
      id: 1,
      deviceId: 'SENSOR-001',
      deviceType: 'Temperature',
      location: 'Production Line A',
      status: 'online',
      lastUpdate: new Date(),
      sensorData: { temperature: 65.2, productionRate: 45 }
    },
    {
      id: 2,
      deviceId: 'SENSOR-002',
      deviceType: 'Pressure',
      location: 'Production Line A',
      status: 'online',
      lastUpdate: new Date(),
      sensorData: { pressure: 1.2 }
    },
    {
      id: 3,
      deviceId: 'SENSOR-003',
      deviceType: 'Humidity',
      location: 'Storage Area',
      status: 'offline',
      lastUpdate: new Date(Date.now() - 1000 * 60 * 15), // 15 menit yang lalu
      sensorData: { humidity: 45.3 }
    },
    {
      id: 4,
      deviceId: 'VIBRATION-001',
      deviceType: 'Vibration',
      location: 'Machine M001',
      status: 'online',
      lastUpdate: new Date(),
      sensorData: { vibration: 0.8 }
    }
  ]);
  
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'connecting' | 'disconnected'>('disconnected');
  const [mqttBroker, setMqttBroker] = useState('mqtt://localhost:1883');
  const [selectedDevice, setSelectedDevice] = useState<IoTDevice | null>(null);

  // Simulasi koneksi IoT
  useEffect(() => {
    // Dalam implementasi nyata, ini akan terhubung ke MQTT broker atau WebSocket
    const timer = setTimeout(() => {
      setConnectionStatus('connected');
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleConnect = () => {
    setConnectionStatus('connecting');
    // Simulasi koneksi
    setTimeout(() => {
      setConnectionStatus('connected');
    }, 2000);
  };

  const handleDisconnect = () => {
    setConnectionStatus('disconnected');
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'online': return '#2ecc71';
      case 'offline': return '#e74c3c';
      case 'warning': return '#f39c12';
      default: return '#95a5a6';
    }
  };

  const getConnectionStatusColor = () => {
    switch(connectionStatus) {
      case 'connected': return '#2ecc71';
      case 'connecting': return '#f39c12';
      case 'disconnected': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  return (
    <div className="iot-integration">
      <h2>Integrasi IoT</h2>
      
      <div className="connection-panel">
        <div className="connection-info">
          <h3>Status Koneksi IoT</h3>
          <div className="status-indicator" style={{ backgroundColor: getConnectionStatusColor() }}>
            {connectionStatus === 'connected' ? 'Terkoneksi' : 
             connectionStatus === 'connecting' ? 'Menghubungkan...' : 'Terputus'}
          </div>
        </div>
        
        <div className="connection-controls">
          <input
            type="text"
            value={mqttBroker}
            onChange={(e) => setMqttBroker(e.target.value)}
            placeholder="Alamat MQTT Broker"
          />
          <button 
            onClick={handleConnect}
            disabled={connectionStatus === 'connecting' || connectionStatus === 'connected'}
          >
            Hubungkan
          </button>
          <button 
            onClick={handleDisconnect}
            disabled={connectionStatus !== 'connected'}
          >
            Putuskan
          </button>
        </div>
      </div>
      
      <div className="iot-dashboard">
        <div className="device-list">
          <h3>Perangkat Terhubung</h3>
          <div className="device-grid">
            {devices.map(device => (
              <div 
                key={device.id} 
                className={`device-card ${selectedDevice?.id === device.id ? 'selected' : ''}`}
                onClick={() => setSelectedDevice(device)}
              >
                <div className="device-header">
                  <h4>{device.deviceId}</h4>
                  <span 
                    className="device-status" 
                    style={{ backgroundColor: getStatusColor(device.status) }}
                  >
                    {device.status}
                  </span>
                </div>
                
                <div className="device-details">
                  <p><strong>Tipe:</strong> {device.deviceType}</p>
                  <p><strong>Lokasi:</strong> {device.location}</p>
                  <p><strong>Update Terakhir:</strong> {new Date(device.lastUpdate).toLocaleTimeString()}</p>
                  
                  <div className="sensor-data">
                    {device.sensorData.temperature !== undefined && (
                      <p><strong>Suhu:</strong> {device.sensorData.temperature}°C</p>
                    )}
                    {device.sensorData.pressure !== undefined && (
                      <p><strong>Tekanan:</strong> {device.sensorData.pressure} bar</p>
                    )}
                    {device.sensorData.humidity !== undefined && (
                      <p><strong>Kelembaban:</strong> {device.sensorData.humidity}%</p>
                    )}
                    {device.sensorData.vibration !== undefined && (
                      <p><strong>Vibrasi:</strong> {device.sensorData.vibration} mm/s</p>
                    )}
                    {device.sensorData.productionRate !== undefined && (
                      <p><strong>Produksi:</strong> {device.sensorData.productionRate} unit/jam</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {selectedDevice && (
          <div className="device-detail-panel">
            <h3>Detail Perangkat</h3>
            <div className="device-detail-content">
              <h4>{selectedDevice.deviceId}</h4>
              <p><strong>Tipe:</strong> {selectedDevice.deviceType}</p>
              <p><strong>Lokasi:</strong> {selectedDevice.location}</p>
              <p><strong>Status:</strong> {selectedDevice.status}</p>
              <p><strong>Update Terakhir:</strong> {new Date(selectedDevice.lastUpdate).toLocaleString()}</p>
              
              <h4>Data Sensor</h4>
              {selectedDevice.sensorData.temperature !== undefined && (
                <p>Suhu: {selectedDevice.sensorData.temperature}°C</p>
              )}
              {selectedDevice.sensorData.pressure !== undefined && (
                <p>Tekanan: {selectedDevice.sensorData.pressure} bar</p>
              )}
              {selectedDevice.sensorData.humidity !== undefined && (
                <p>Kelembaban: {selectedDevice.sensorData.humidity}%</p>
              )}
              {selectedDevice.sensorData.vibration !== undefined && (
                <p>Vibrasi: {selectedDevice.sensorData.vibration} mm/s</p>
              )}
              {selectedDevice.sensorData.productionRate !== undefined && (
                <p>Produksi: {selectedDevice.sensorData.productionRate} unit/jam</p>
              )}
              
              <div className="device-actions">
                <button className="action-btn refresh">Refresh</button>
                <button className="action-btn configure">Konfigurasi</button>
                <button className="action-btn calibrate">Kalibrasi</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IoTIntegration;