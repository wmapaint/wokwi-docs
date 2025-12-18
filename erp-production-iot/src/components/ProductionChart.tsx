import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './ProductionChart.css';

// Daftarkan komponen Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Machine {
  id: number;
  machineId: string;
  status: string;
  temperature: number;
  pressure: number;
  productionRate: number;
  timestamp: Date;
}

interface ProductionChartProps {
  iotData: Machine[];
}

const ProductionChart: React.FC<ProductionChartProps> = ({ iotData }) => {
  const chartData = {
    labels: iotData.map(machine => machine.machineId),
    datasets: [
      {
        label: 'Tingkat Produksi (unit/jam)',
        data: iotData.map(machine => machine.productionRate),
        backgroundColor: iotData.map(machine => 
          machine.status === 'running' ? 'rgba(46, 204, 113, 0.7)' :
          machine.status === 'idle' ? 'rgba(243, 156, 18, 0.7)' :
          'rgba(231, 76, 60, 0.7)'
        ),
        borderColor: iotData.map(machine => 
          machine.status === 'running' ? 'rgba(46, 204, 113, 1)' :
          machine.status === 'idle' ? 'rgba(243, 156, 18, 1)' :
          'rgba(231, 76, 60, 1)'
        ),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Grafik Tingkat Produksi per Mesin',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Unit per Jam'
        }
      },
    },
  };

  return (
    <div className="production-chart">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default ProductionChart;