import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { 
  LayoutDashboard, Users, UserPlus, FileSpreadsheet, 
  Settings, Pill, ClipboardList, MessageSquare, Heart, BarChart3
} from 'lucide-react';

const Sidebar = () => {
  const { activeUser, sosAlerts } = useContext(AppContext);

  if (!activeUser) return null;

  const activeSosCount = sosAlerts.filter(s => s.active).length;

  const getSidebarTheme = () => {
    switch (activeUser.role) {
      case 'Admin':
        return {
          navActive: 'bg-admin-light text-admin-primary border-r-4 border-admin-accent',
          hover: 'hover:bg-slate-100 transition-all duration-200'
        };
      case 'Helper':
        return {
          navActive: 'bg-[#DDF7E3]/55 text-emerald-800 border-l-4 border-emerald-600 shadow-[0_4px_12px_rgba(22,163,74,0.03)] font-black',
          hover: 'hover:bg-emerald-50/20 hover:text-emerald-700 hover:translate-x-1 transition-all duration-300 text-slate-600'
        };
      case 'Old Person':
        return {
          navActive: 'bg-[#F5F0FA]/60 text-purple-800 border-l-4 border-purple-650 shadow-[0_4px_12px_rgba(168,85,247,0.03)] font-black',
          hover: 'hover:bg-purple-50/20 hover:text-purple-750 hover:translate-x-1 transition-all duration-300 text-slate-600'
        };
      default:
        return {
          navActive: 'bg-slate-100 text-slate-800',
          hover: 'hover:bg-slate-55 transition-all duration-200'
        };
    }
  };

  const theme = getSidebarTheme();

  const getSidebarClasses = () => {
    if (activeUser.role === 'Helper') {
      return "w-64 bg-white/15 backdrop-blur-xl border-r border-emerald-100/20 h-[calc(100vh-4rem)] flex flex-col justify-between py-4 shadow-[4px_0_24px_rgba(0,0,0,0.02)] select-none rounded-r-[24px] relative z-20 text-slate-700";
    }
    if (activeUser.role === 'Old Person') {
      return "w-64 bg-white/15 backdrop-blur-xl border-r border-purple-100/20 h-[calc(100vh-4rem)] flex flex-col justify-between py-4 shadow-[4px_0_24px_rgba(0,0,0,0.02)] select-none rounded-r-[24px] relative z-20 text-slate-700";
    }
    return "w-64 bg-white border-r border-slate-200 h-[calc(100vh-4rem)] flex flex-col justify-between py-4 shadow-sm select-none";
  };

  return (
    <aside className={getSidebarClasses()}>
      <div className="flex flex-col gap-1.5">
        <p className="px-6 text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-3">Portal Navigation</p>

        {activeUser.role === 'Admin' && (
          <>
            <NavLink 
              to="/admin/dashboard" 
              className={({ isActive }) => `flex items-center gap-3 px-6 py-3 text-sm font-medium text-slate-600 transition-all ${isActive ? theme.navActive : theme.hover}`}
            >
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
              {activeSosCount > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                  {activeSosCount}
                </span>
              )}
            </NavLink>

            <NavLink 
              to="/admin/helper-requests" 
              className={({ isActive }) => `flex items-center gap-3 px-6 py-3 text-sm font-medium text-slate-600 transition-all ${isActive ? theme.navActive : theme.hover}`}
            >
              <UserPlus size={18} />
              <span>Helper Requests</span>
            </NavLink>

            <NavLink 
              to="/admin/patients" 
              className={({ isActive }) => `flex items-center gap-3 px-6 py-3 text-sm font-medium text-slate-600 transition-all ${isActive ? theme.navActive : theme.hover}`}
            >
              <Users size={18} />
              <span>Patient Data</span>
            </NavLink>

            <NavLink 
              to="/admin/medicines" 
              className={({ isActive }) => `flex items-center gap-3 px-6 py-3 text-sm font-medium text-slate-600 transition-all ${isActive ? theme.navActive : theme.hover}`}
            >
              <Pill size={18} />
              <span>Add Medicine (Dava)</span>
            </NavLink>

            <NavLink 
              to="/admin/reports" 
              className={({ isActive }) => `flex items-center gap-3 px-6 py-3 text-sm font-medium text-slate-600 transition-all ${isActive ? theme.navActive : theme.hover}`}
            >
              <FileSpreadsheet size={18} />
              <span>Add Patient Reports</span>
            </NavLink>

            <NavLink 
              to="/admin/analytics" 
              className={({ isActive }) => `flex items-center gap-3 px-6 py-3 text-sm font-medium text-slate-600 transition-all ${isActive ? theme.navActive : theme.hover}`}
            >
              <BarChart3 size={18} />
              <span>Analytics & Trends</span>
            </NavLink>

            <NavLink 
              to="/admin/audit-log" 
              className={({ isActive }) => `flex items-center gap-3 px-6 py-3 text-sm font-medium text-slate-600 transition-all ${isActive ? theme.navActive : theme.hover}`}
            >
              <ClipboardList size={18} />
              <span>Audit Log</span>
            </NavLink>

            <NavLink 
              to="/admin/announcements" 
              className={({ isActive }) => `flex items-center gap-3 px-6 py-3 text-sm font-medium text-slate-600 transition-all ${isActive ? theme.navActive : theme.hover}`}
            >
              <MessageSquare size={18} />
              <span>Announcements</span>
            </NavLink>

            <NavLink 
              to="/admin/settings" 
              className={({ isActive }) => `flex items-center gap-3 px-6 py-3 text-sm font-medium text-slate-600 transition-all ${isActive ? theme.navActive : theme.hover}`}
            >
              <Settings size={18} />
              <span>Settings & Roles</span>
            </NavLink>
          </>
        )}

        {activeUser.role === 'Helper' && (
          <>
            <div className="space-y-2">
              <NavLink 
                to="/helper/dashboard" 
                className={({ isActive }) => `relative overflow-hidden flex items-center gap-4 mx-3 px-5 py-3.5 rounded-2xl text-base font-medium transition-all group ${isActive ? theme.navActive : theme.hover}`}
              >
                {/* Mirror shine sweep reflection */}
                <div className="animate-shine-sweep" />
                <LayoutDashboard size={20} className="group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 text-emerald-600 relative z-10" />
                <span className="relative z-10">Dashboard</span>
              </NavLink>

              <NavLink 
                to="/helper/leaves" 
                className={({ isActive }) => `relative overflow-hidden flex items-center gap-4 mx-3 px-5 py-3.5 rounded-2xl text-base font-medium transition-all group ${isActive ? theme.navActive : theme.hover}`}
              >
                {/* Mirror shine sweep reflection */}
                <div className="animate-shine-sweep" />
                <ClipboardList size={20} className="group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300 text-emerald-600 relative z-10" />
                <span className="relative z-10">Leaves & Availability</span>
              </NavLink>
            </div>

            {/* ================= BEAUTIFUL BOTANICAL ARTWORK IN EMPTY SPACE ================= */}
            <div className="hidden md:flex flex-col items-center justify-center py-6 px-4 mt-8 opacity-90 transition-opacity duration-300">
              <svg viewBox="0 0 200 130" className="w-44 h-28 text-emerald-600/18 hover:text-emerald-500/30 transition-colors duration-500 pointer-events-none select-none">
                {/* Zen Balanced Stones Stack */}
                <ellipse cx="100" cy="105" rx="42" ry="12" fill="currentColor" />
                <ellipse cx="100" cy="85" rx="34" ry="10" fill="currentColor" opacity="0.9" />
                <ellipse cx="100" cy="68" rx="26" ry="8" fill="currentColor" opacity="0.95" />
                <ellipse cx="100" cy="53" rx="18" ry="6" fill="currentColor" />
                <ellipse cx="100" cy="41" rx="11" ry="4" fill="currentColor" opacity="0.85" />
                
                {/* Glowing Lotus Bloom on Top */}
                <path d="M100,16 C96,24 94,32 100,37 C106,32 104,24 100,16 Z" fill="#10b981" opacity="0.55" className="animate-pulse" />
                <path d="M100,22 C92,25 86,30 93,37 C100,37 99,28 100,22 Z" fill="#34d399" opacity="0.4" />
                <path d="M100,22 C108,25 114,30 107,37 C100,37 101,28 100,22 Z" fill="#34d399" opacity="0.4" />

                {/* Sparkle highlights */}
                <circle cx="50" cy="45" r="1.5" fill="#fbbf24" className="animate-pulse" />
                <circle cx="150" cy="65" r="2" fill="#fbbf24" className="animate-pulse" />
                <circle cx="135" cy="30" r="1.5" fill="#fbbf24" />
                <circle cx="65" cy="85" r="1" fill="#fbbf24" />
              </svg>
              <span className="text-[10px] text-emerald-800/40 font-black tracking-[0.2em] uppercase mt-2 select-none">
                Zen Harmony
              </span>
            </div>
          </>
        )}

        {activeUser.role === 'Old Person' && (
          <>
            <div className="space-y-2">
              <NavLink 
                to="/old-person/dashboard" 
                className={({ isActive }) => `relative overflow-hidden flex items-center gap-4 mx-3 px-5 py-3.5 rounded-2xl text-base font-medium transition-all group ${isActive ? theme.navActive : theme.hover}`}
              >
                {/* Mirror shine sweep reflection */}
                <div className="animate-shine-sweep" />
                <LayoutDashboard size={20} className="group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 text-purple-650 relative z-10" />
                <span className="relative z-10">My Dashboard</span>
              </NavLink>
            </div>

            {/* ================= BEAUTIFUL BOTANICAL ARTWORK IN EMPTY SPACE ================= */}
            <div className="hidden md:flex flex-col items-center justify-center py-6 px-4 mt-8 opacity-90 transition-opacity duration-300">
              <svg viewBox="0 0 200 130" className="w-44 h-28 text-purple-600/18 hover:text-purple-500/30 transition-colors duration-500 pointer-events-none select-none">
                {/* Lavender sprigs / abstract flower stems */}
                <path d="M90,110 C90,80 95,50 100,20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
                <path d="M110,110 C108,85 105,60 100,35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.8" />
                
                {/* Lavender buds */}
                <ellipse cx="100" cy="20" rx="4" ry="7" fill="#a855f7" opacity="0.65" />
                <ellipse cx="96" cy="35" rx="5" ry="3.5" fill="#a855f7" opacity="0.75" transform="rotate(-15, 96, 35)" />
                <ellipse cx="104" cy="38" rx="5" ry="3.5" fill="#c084fc" opacity="0.75" transform="rotate(15, 104, 38)" />
                <ellipse cx="100" cy="50" rx="6" ry="4" fill="#a855f7" />
                <ellipse cx="95" cy="62" rx="5" ry="3.5" fill="#c084fc" opacity="0.8" transform="rotate(-20, 95, 62)" />
                <ellipse cx="105" cy="65" rx="5" ry="3.5" fill="#a855f7" opacity="0.8" transform="rotate(20, 105, 65)" />
                <ellipse cx="100" cy="78" rx="6" ry="4" fill="#c084fc" />
                <ellipse cx="96" cy="90" rx="5" ry="3.5" fill="#a855f7" opacity="0.9" transform="rotate(-15, 96, 90)" />
                <ellipse cx="104" cy="92" rx="5" ry="3.5" fill="#c084fc" opacity="0.9" transform="rotate(15, 104, 92)" />

                {/* Floating gold highlights */}
                <circle cx="60" cy="35" r="1.5" fill="#fbbf24" className="animate-pulse" />
                <circle cx="140" cy="50" r="1.5" fill="#fbbf24" className="animate-pulse" />
                <circle cx="130" cy="85" r="1" fill="#fbbf24" />
              </svg>
              <span className="text-[10px] text-purple-800/40 font-black tracking-[0.2em] uppercase mt-2 select-none">
                Lavender Calm
              </span>
            </div>
          </>
        )}
      </div>

      {/* Sidebar bottom decoration/quote card */}
      <div className="flex flex-col gap-3">
        {activeUser.role === 'Helper' && (
          <div className="p-5 mx-3 rounded-[24px] bg-[#DDF7E3]/35 backdrop-blur-md border border-emerald-500/15 shadow-sm relative overflow-hidden group">
            {/* Mirror shine sweep reflection */}
            <div className="animate-shine-sweep" />
            {/* Eucalyptus leaf background decoration outline */}
            <div className="absolute right-[-8px] bottom-[-8px] opacity-[0.12] text-emerald-800 pointer-events-none group-hover:scale-110 transition-transform duration-500">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17,8C8,10 5.9,16.17 3.82,21.34L2.18,20.66C4.26,15.49 6.34,9 15.67,7C12.5,5 9,5 5,7L4,5C9,3 13,3 17,5C20,3.7 22.3,4.3 22.3,4.3C22.3,4.3 21.7,7 17,8Z" />
              </svg>
            </div>
            <p className="text-[11px] text-emerald-800/60 font-black uppercase tracking-widest mb-1.5">Weekly Focus</p>
            <p className="text-xs text-emerald-800 leading-relaxed font-extrabold italic">
              "Your caring patience makes a healing difference every single day."
            </p>
          </div>
        )}

        {activeUser.role === 'Old Person' && (
          <div className="p-5 mx-3 rounded-[24px] bg-[#F5F0FA]/40 backdrop-blur-md border border-purple-500/15 shadow-sm relative overflow-hidden group">
            {/* Mirror shine sweep reflection */}
            <div className="animate-shine-sweep" />
            {/* Flower decoration outline */}
            <div className="absolute right-[-8px] bottom-[-8px] opacity-[0.12] text-purple-800 pointer-events-none group-hover:scale-110 transition-transform duration-500">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,2C12,2 6,8 6,12C6,15.31 8.69,18 12,18C15.31,18 18,15.31 18,12C18,8 12,2 12,2Z" />
              </svg>
            </div>
            <p className="text-[11px] text-purple-800/60 font-black uppercase tracking-widest mb-1.5">Wellness Reflection</p>
            <p className="text-xs text-purple-800 leading-relaxed font-extrabold italic">
              "Quiet moments bring peace to the mind, strength to the body, and joy to the soul."
            </p>
          </div>
        )}

        <div className="px-6 pt-3 border-t border-slate-200/30 flex flex-col gap-1 text-[11px] text-slate-500">
          <p className="font-bold flex items-center gap-1 text-slate-700">
            <Heart size={12} className="text-emerald-600 fill-emerald-550 animate-pulse" />
            <span>Health Care</span>
          </p>
          <p className="truncate text-slate-600">Caregiver: {activeUser.name}</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
