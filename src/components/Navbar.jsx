import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { LogOut, User, Bell, HeartPulse } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { activeUser, logoutUser, sosAlerts } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  const getThemeClasses = () => {
    if (!activeUser) return 'bg-slate-800 text-white';
    switch (activeUser.role) {
      case 'Admin':
        return 'bg-admin-primary text-white';
      case 'Helper':
        return 'bg-helper-primary text-white';
      case 'Old Person':
        return 'bg-patient-primary text-white';
      default:
        return 'bg-slate-800 text-white';
    }
  };

  const activeSosCount = sosAlerts.filter(s => s.active).length;

  return (
    <header className={`h-16 px-6 flex items-center justify-between shadow-md transition-colors duration-300 ${getThemeClasses()}`}>
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
        <HeartPulse size={22} className="animate-pulse" />
        <span className="font-extrabold text-xl tracking-wide">Health Care</span>
        <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/20 uppercase font-semibold">v2.0</span>
      </div>

      {activeUser ? (
        <div className="flex items-center gap-6">
          {activeUser.role === 'Admin' && activeSosCount > 0 && (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-red-600 text-white rounded-full text-xs font-bold animate-pulse">
              <Bell size={14} />
              <span>{activeSosCount} SOS Active</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-full bg-white/25">
              <User size={16} />
            </div>
            <div className="text-right leading-none">
              <p className="font-medium text-sm">{activeUser.name}</p>
              <span className="text-[10px] text-white/70 uppercase tracking-wider font-semibold">{activeUser.role}</span>
            </div>
          </div>

          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-1.5 text-xs rounded bg-white/10 hover:bg-white/20 transition-all font-semibold"
          >
            <LogOut size={14} />
            <span>Logout</span>
          </button>
        </div>
      ) : (
        <div className="text-sm font-medium opacity-80">Healthcare Service Portal</div>
      )}
    </header>
  );
};

export default Navbar;
