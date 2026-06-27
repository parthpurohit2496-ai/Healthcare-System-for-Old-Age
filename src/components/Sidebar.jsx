import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { 
  LayoutDashboard, Users, UserPlus, HeartPulse, FileSpreadsheet, 
  Settings, Pill, Activity, BarChart3, ClipboardList, MessageSquare, AlertTriangle
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
          hover: 'hover:bg-slate-100'
        };
      case 'Helper':
        return {
          navActive: 'bg-helper-light text-helper-primary border-r-4 border-helper-accent',
          hover: 'hover:bg-slate-100'
        };
      case 'Old Person':
        return {
          navActive: 'bg-patient-light text-patient-primary border-r-4 border-patient-accent',
          hover: 'hover:bg-slate-100'
        };
      default:
        return {
          navActive: 'bg-slate-100 text-slate-800',
          hover: 'hover:bg-slate-50'
        };
    }
  };

  const theme = getSidebarTheme();

  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-[calc(100vh-4rem)] flex flex-col justify-between py-4 shadow-sm select-none">
      <div className="flex flex-col gap-1.5">
        <p className="px-6 text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-2">Portal Navigation</p>

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
            <NavLink 
              to="/helper/dashboard" 
              className={({ isActive }) => `flex items-center gap-3 px-6 py-3 text-sm font-medium text-slate-600 transition-all ${isActive ? theme.navActive : theme.hover}`}
            >
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </NavLink>

            <NavLink 
              to="/helper/leaves" 
              className={({ isActive }) => `flex items-center gap-3 px-6 py-3 text-sm font-medium text-slate-600 transition-all ${isActive ? theme.navActive : theme.hover}`}
            >
              <ClipboardList size={18} />
              <span>Leaves & Availability</span>
            </NavLink>
          </>
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

      <div className="px-6 pt-4 border-t border-slate-100 flex flex-col gap-1 text-[11px] text-slate-400">
        <p className="font-bold flex items-center gap-1 text-slate-700">
          <HeartPulse size={12} className="text-red-500" />
          <span>Health Care Network</span>
        </p>
        <p>Logged in: {activeUser.name}</p>
      </div>
    </aside>
  );
};

export default Sidebar;
