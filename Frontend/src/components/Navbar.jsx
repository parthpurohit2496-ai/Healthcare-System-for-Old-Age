import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { LogOut, User, Bell, HeartPulse, Clock, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onToggleSidebar, isSidebarOpen }) => {
  const { activeUser, logoutUser, sosAlerts } = useContext(AppContext);
  const navigate = useNavigate();

  // Live clock state
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = time.toLocaleDateString('en-US', { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  });
  
  const formattedTime = time.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit',
    hour12: true 
  });

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  const getThemeClasses = () => {
    if (!activeUser) return 'bg-white/10 backdrop-blur-xl border-b border-slate-200/25 text-slate-800';
    switch (activeUser.role) {
      case 'Admin':
        return 'bg-white/15 backdrop-blur-xl border-b border-blue-100/20 text-slate-800 shadow-[0_1px_12px_rgba(59,130,246,0.02)]';
      case 'Helper':
        return 'bg-white/15 backdrop-blur-xl border-b border-emerald-100/20 text-slate-800 shadow-[0_1px_12px_rgba(22,163,74,0.02)]';
      case 'Old Person':
        return 'bg-white/15 backdrop-blur-xl border-b border-purple-100/20 text-slate-800 shadow-[0_1px_12px_rgba(168,85,247,0.02)]';
      default:
        return 'bg-white/10 backdrop-blur-xl border-b border-slate-200/25 text-slate-800';
    }
  };

  const getHeartColor = () => {
    if (!activeUser) return 'text-slate-650';
    switch (activeUser.role) {
      case 'Admin': return 'text-blue-600 fill-blue-500/20';
      case 'Helper': return 'text-emerald-600 fill-emerald-500/20';
      case 'Old Person': return 'text-purple-650 fill-purple-500/20';
      default: return 'text-slate-650';
    }
  };

  const activeSosCount = sosAlerts.filter(s => s.active).length;

  return (
    <header className={`h-16 px-6 flex items-center justify-between transition-all duration-300 select-none z-30 relative ${getThemeClasses()}`}>
      <div className="flex items-center gap-3">
        {activeUser && (
          <button 
            onClick={onToggleSidebar}
            className="md:hidden p-2 rounded-xl bg-slate-800/5 hover:bg-slate-800/10 text-slate-700 transition-colors border border-slate-300/10"
            aria-label="Toggle Menu"
          >
            {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        )}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <HeartPulse size={22} className={`animate-pulse ${getHeartColor()}`} />
          <span className="font-black text-xl tracking-tight text-slate-800">Health Care</span>
          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-slate-850/10 text-slate-650 uppercase font-black tracking-wider">v2.0</span>
        </div>
      </div>

      {/* ================= CENTRAL CLOCK & PORTAL STATUS REMINDERS ================= */}
      {activeUser && (
        <div className="hidden md:flex items-center gap-3 bg-slate-900/5 backdrop-blur-md px-4 py-2 rounded-2xl border border-slate-350/10 text-[11px] font-black text-slate-650 shadow-[inset_0_1px_2px_rgba(0,0,0,0.015)]">
          <Clock size={13} className="text-slate-500" />
          <span>{formattedDate}</span>
          <span className="text-slate-300/60 font-medium">•</span>
          <span className="tabular-nums text-slate-800">{formattedTime}</span>
          <span className="text-slate-300/60 font-medium">•</span>
          {activeUser.role === 'Admin' && (
            <span className="text-[9px] text-blue-650 uppercase tracking-widest font-black">🌿 Wisdom Console</span>
          )}
          {activeUser.role === 'Helper' && (
            <span className="text-[9px] text-emerald-650 uppercase tracking-widest font-black">🌿 Zen Care active</span>
          )}
          {activeUser.role === 'Old Person' && (
            <span className="text-[9px] text-purple-650 uppercase tracking-widest font-black">🌿 Quiet Peace active</span>
          )}
        </div>
      )}

      {activeUser ? (
        <div className="flex items-center gap-6">
          {activeUser.role === 'Admin' && activeSosCount > 0 && (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-red-650 text-white rounded-full text-xs font-black animate-pulse shadow-sm">
              <Bell size={13} />
              <span>{activeSosCount} SOS Active</span>
            </div>
          )}

          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-slate-800/10 text-slate-700 border border-slate-300/20">
              <User size={15} />
            </div>
            <div className="text-right leading-none">
              <p className="font-extrabold text-xs text-slate-800">{activeUser.name}</p>
              <span className="text-[9px] text-slate-500 uppercase tracking-widest font-black block mt-0.5">{activeUser.role}</span>
            </div>
          </div>

          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-3.5 py-2 text-xs rounded-xl bg-slate-850/10 hover:bg-slate-850/15 border border-slate-300/30 text-slate-700 hover:text-slate-800 transition-all font-black"
          >
            <LogOut size={13} />
            <span>Logout</span>
          </button>
        </div>
      ) : (
        <div className="text-xs font-black uppercase tracking-widest text-slate-450">Healthcare Service Portal</div>
      )}
    </header>
  );
};

export default Navbar;
