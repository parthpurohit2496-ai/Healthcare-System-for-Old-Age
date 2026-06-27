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
          navActive: 'bg-patient-light text-patient-primary border-r-4 border-patient-accent',
          hover: 'hover:bg-slate-100 transition-all duration-200'
        };
      default:
        return {
          navActive: 'bg-slate-100 text-slate-800',
          hover: 'hover:bg-slate-50 transition-all duration-200'
        };
    }
  };

  const theme = getSidebarTheme();

  const getSidebarClasses = () => {
    if (activeUser.role === 'Helper') {
      return "w-64 bg-white/15 backdrop-blur-xl border-r border-emerald-100/20 h-[calc(100vh-4rem)] flex flex-col justify-between py-4 shadow-[4px_0_24px_rgba(0,0,0,0.02)] select-none rounded-r-[24px] relative z-20 text-slate-700";
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
          <div className="space-y-1">
            <NavLink 
              to="/helper/dashboard" 
              className={({ isActive }) => `flex items-center gap-3 px-6 py-3 text-sm font-medium transition-all group ${isActive ? theme.navActive : theme.hover}`}
            >
              <LayoutDashboard size={18} className="group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 text-emerald-600" />
              <span>Dashboard</span>
            </NavLink>

            <NavLink 
              to="/helper/leaves" 
              className={({ isActive }) => `flex items-center gap-3 px-6 py-3 text-sm font-medium transition-all group ${isActive ? theme.navActive : theme.hover}`}
            >
              <ClipboardList size={18} className="group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300 text-emerald-600" />
              <span>Leaves & Availability</span>
            </NavLink>
          </div>
        )}

        {activeUser.role === 'Old Person' && (
          <>
            <NavLink 
              to="/old-person/dashboard" 
              className={({ isActive }) => `flex items-center gap-3 px-6 py-3 text-sm font-medium text-slate-600 transition-all ${isActive ? theme.navActive : theme.hover}`}
            >
              <LayoutDashboard size={18} />
              <span>My Dashboard</span>
            </NavLink>
          </>
        )}
      </div>

      {/* Sidebar bottom decoration/quote card */}
      <div className="px-6 flex flex-col gap-3">
        {activeUser.role === 'Helper' && (
          <div className="p-3.5 rounded-2xl bg-white/20 border border-emerald-100/20 shadow-sm relative overflow-hidden group">
            {/* Eucalyptus leaf background decoration outline */}
            <div className="absolute right-[-10px] bottom-[-10px] opacity-[0.08] text-emerald-800 pointer-events-none group-hover:scale-110 transition-transform duration-500">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17,8C8,10 5.9,16.17 3.82,21.34L2.18,20.66C4.26,15.49 6.34,9 15.67,7C12.5,5 9,5 5,7L4,5C9,3 13,3 17,5C20,3.7 22.3,4.3 22.3,4.3C22.3,4.3 21.7,7 17,8Z" />
              </svg>
            </div>
            <p className="text-[10px] text-emerald-800/60 font-bold uppercase tracking-wider mb-1">Weekly Focus</p>
            <p className="text-[11px] text-emerald-800 leading-relaxed font-semibold italic">
              "Your caring patience makes a healing difference every single day."
            </p>
          </div>
        )}

        <div className="pt-3 border-t border-slate-200/30 flex flex-col gap-1 text-[11px] text-slate-500">
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
