import React, { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { Settings, ShieldAlert, Key } from 'lucide-react';

const AdminSettings = () => {
  const { addLog } = useContext(AppContext);
  const [adminId, setAdminId] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [success, setSuccess] = useState('');

  const handleUpdate = (e) => {
    e.preventDefault();
    addLog(`Administrator changed login ID to: ${adminId} and updated password`, "Admin");
    setSuccess('Credentials updated successfully (Session Mock)!');
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">System Settings</h2>
        <p className="text-slate-500 text-sm font-semibold">Configure administrative controls and security credentials.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Update credentials */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 h-fit">
          <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Key className="text-indigo-600" size={18} />
            <span>Update Credentials</span>
          </h3>

          {success && (
            <div className="mt-4 p-2.5 bg-emerald-50 border border-emerald-100 rounded text-center text-xs font-semibold text-emerald-700">
              {success}
            </div>
          )}

          <form onSubmit={handleUpdate} className="mt-4 flex flex-col gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Admin Username/ID</label>
              <input 
                type="text" 
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                className="w-full px-3 py-2 rounded bg-slate-50 border border-slate-300 focus:border-indigo-500 focus:outline-none text-slate-700 text-xs font-semibold transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">New Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 rounded bg-slate-50 border border-slate-300 focus:border-indigo-500 focus:outline-none text-slate-700 text-xs font-semibold transition-colors"
                required
              />
            </div>

            <button 
              type="submit"
              className="w-full mt-2 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded shadow transition-colors active:scale-[0.98]"
            >
              Update Credentials
            </button>
          </form>
        </div>

        {/* Roles management */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 h-fit">
          <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
            <ShieldAlert className="text-indigo-600" size={18} />
            <span>Sub-Admin Roles & Permissions</span>
          </h3>

          <div className="divide-y divide-slate-100 mt-4 text-xs">
            <div className="py-2.5 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-850">Super Administrator</h4>
                <p className="text-slate-400 font-medium">Full read/write permissions for all portals.</p>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-bold uppercase">Active</span>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-850">Medical Coordinator (Sub-Admin)</h4>
                <p className="text-slate-400 font-medium">Read/write access to patient vitals & medicines.</p>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-400 font-bold uppercase">Mock Config</span>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-850">Logistics Coordinator (Sub-Admin)</h4>
                <p className="text-slate-400 font-medium">Read/write access to helper schedules & checklists.</p>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-400 font-bold uppercase">Mock Config</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminSettings;
