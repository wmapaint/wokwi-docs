import React from 'react';
import './Navigation.css';

interface NavigationProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeView, setActiveView }) => {
  return (
    <nav className="navigation">
      <ul>
        <li>
          <button 
            className={activeView === 'dashboard' ? 'active' : ''}
            onClick={() => setActiveView('dashboard')}
          >
            Dashboard Produksi
          </button>
        </li>
        <li>
          <button 
            className={activeView === 'reports' ? 'active' : ''}
            onClick={() => setActiveView('reports')}
          >
            Laporan Produksi
          </button>
        </li>
        <li>
          <button 
            className={activeView === 'iot' ? 'active' : ''}
            onClick={() => setActiveView('iot')}
          >
            Integrasi IoT
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;