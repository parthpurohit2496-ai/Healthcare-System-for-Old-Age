import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { AlertTriangle, Check } from 'lucide-react';

const SOSAlert = () => {
  const { sosAlerts, resolveSos, activeUser } = useContext(AppContext);

  // Only show to logged in Admin
  if (!activeUser || activeUser.role !== 'Admin') return null;

  const activeAlerts = sosAlerts.filter(s => s.active);

  if (activeAlerts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md w-full px-4 md:px-0">
      {activeAlerts.map(alert => (
        <div 
          key={alert.id} 
          className="bg-red-50 border-l-4 border-red-600 rounded shadow-xl p-4 flex items-start gap-3 border animate-pulse-sos text-slate-800"
        >
          <div className="p-2 bg-red-100 text-red-600 rounded-full">
            <AlertTriangle size={20} className="animate-bounce" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-red-700 text-sm">EMERGENCY SOS ALERT</span>
              <span className="text-xs text-slate-500 font-semibold">{alert.time}</span>
            </div>
            <h4 className="font-semibold text-slate-900 text-sm mt-0.5">Patient: {alert.patientName} (ID: {alert.patientId})</h4>
            <p className="text-xs text-slate-600 mt-1">{alert.details}</p>
            
            <button 
              onClick={() => resolveSos(alert.id)}
              className="mt-3 flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-bold transition-all shadow-md"
            >
              <Check size={14} />
              <span>Mark Resolved</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SOSAlert;
