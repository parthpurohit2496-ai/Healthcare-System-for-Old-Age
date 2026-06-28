import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { Users, UserCheck, AlertTriangle, FileClock, CalendarClock, ShieldAlert, Check, X, Bell } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const { 
    patients, helpers, sosAlerts, auditLogs, leaves, updateLeaveStatus, resolveSos 
  } = useContext(AppContext);

  // States for 3D tilt coordinates
  const [tiltStyles, setTiltStyles] = useState({
    patients: {},
    helpers: {},
    unfit: {},
    leaves: {},
    leavePanel: {},
    auditPanel: {}
  });

  // Stats calculation
  const totalHelpers = helpers.length;
  const pendingHelpers = helpers.filter(h => h.status === 'Pending').length;
  const totalPatients = patients.length;
  const unfitPatients = patients.filter(p => p.fitStatus === 'Unfit').length;
  const activeSos = sosAlerts.filter(s => s.active);
  const pendingLeaves = leaves.filter(l => l.status === 'Pending');

  // Card Mouse Move Handler (Mouse Tilt & Follow Glow)
  const handleCardMouseMove = (e, cardKey) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Relative position: range [-1, 1]
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const dx = (x - xc) / xc;
    const dy = (y - yc) / yc;

    // Tilt degrees (max 5deg)
    const tiltX = -dy * 5;
    const tiltY = dx * 5;

    setTiltStyles(prev => ({
      ...prev,
      [cardKey]: {
        '--mouse-x': `${x}px`,
        '--mouse-y': `${y}px`,
        transform: `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-6px)`,
        transition: 'transform 0.05s ease-out'
      }
    }));
  };

  // Card Mouse Leave (Reset Tilt)
  const handleCardMouseLeave = (cardKey) => {
    setTiltStyles(prev => ({
      ...prev,
      [cardKey]: {
        transform: 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)',
        transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
      }
    }));
  };

  return (
    <div className="space-y-8 select-none">
      
      {/* Welcome & Live Status Header */}
      <div className="flex items-center justify-between border-b border-blue-100/30 pb-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">Admin Overview</h2>
          <p className="text-slate-500 text-sm font-semibold">Central Monitoring & Operations Dashboard</p>
        </div>
        <div className="text-xs px-3..5 py-1.5 rounded-full bg-blue-50/50 text-blue-700 font-extrabold border border-blue-100 flex items-center gap-2 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
          <span>Live Sync Active</span>
        </div>
      </div>

      {/* SOS Alerts Panel */}
      {activeSos.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-500/10 border border-red-500/25 rounded-3xl p-6 shadow-sm animate-pulse-sos"
        >
          <div className="flex items-center gap-2 text-red-700 font-black text-base mb-4">
            <AlertTriangle className="animate-bounce" />
            <h3>CRITICAL EMERGENCY SOS ALERTS ({activeSos.length})</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeSos.map(sos => (
              <div key={sos.id} className="bg-white/80 backdrop-blur-md p-4.5 rounded-2xl border border-red-200 shadow-md flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">Patient: {sos.patientName} (ID: {sos.patientId})</h4>
                  <p className="text-xs text-red-650 mt-1 font-semibold">Message: {sos.details}</p>
                  <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-wider">Triggered: {sos.time}</p>
                </div>
                <button 
                  onClick={() => resolveSos(sos.id)}
                  className="px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 shadow"
                >
                  <Check size={14} />
                  <span>Resolve</span>
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Grid Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Patients */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          onMouseMove={(e) => handleCardMouseMove(e, 'patients')}
          onMouseLeave={() => handleCardMouseLeave('patients')}
          style={{ ...tiltStyles.patients }}
          className="group border-glow-wrapper card-3d relative rounded-3xl p-6 bg-white/8 backdrop-blur-md border border-blue-500/12 shadow-[0_15px_30px_rgba(0,0,0,0.02)] hover:bg-white/12 mouse-glow-container overflow-hidden flex items-center justify-between premium-card-shadow"
        >
          <div className="border-glow-element" style={{ '--glow-color': '#3b82f6' }} />
          <div className="mouse-glow-bg" />
          <div className="animate-shine-sweep" />
          
          <div className="relative z-10">
            <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Total Patients</span>
            <h3 className="text-3xl font-black text-slate-800 mt-1">{totalPatients}</h3>
            <p className="text-[10px] text-slate-400 font-bold mt-1.5 uppercase tracking-wider">Elders Registered</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-blue-50/50 text-blue-600 relative z-10 border border-blue-100/30">
            <Users size={22} />
          </div>
        </motion.div>

        {/* Active Helpers */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onMouseMove={(e) => handleCardMouseMove(e, 'helpers')}
          onMouseLeave={() => handleCardMouseLeave('helpers')}
          style={{ ...tiltStyles.helpers }}
          className="group border-glow-wrapper card-3d relative rounded-3xl p-6 bg-white/8 backdrop-blur-md border border-blue-500/12 shadow-[0_15px_30px_rgba(0,0,0,0.02)] hover:bg-white/12 mouse-glow-container overflow-hidden flex items-center justify-between premium-card-shadow"
        >
          <div className="border-glow-element" style={{ '--glow-color': '#10b981' }} />
          <div className="mouse-glow-bg" />
          <div className="animate-shine-sweep" />
          
          <div className="relative z-10">
            <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Active Helpers</span>
            <h3 className="text-3xl font-black text-slate-800 mt-1">{totalHelpers}</h3>
            <p className="text-[10px] text-orange-600 font-extrabold mt-1.5">({pendingHelpers} pending approvals)</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-emerald-50/50 text-emerald-600 relative z-10 border border-emerald-100/30">
            <UserCheck size={22} />
          </div>
        </motion.div>

        {/* Unfit Patients */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          onMouseMove={(e) => handleCardMouseMove(e, 'unfit')}
          onMouseLeave={() => handleCardMouseLeave('unfit')}
          style={{ ...tiltStyles.unfit }}
          className="group border-glow-wrapper card-3d relative rounded-3xl p-6 bg-white/8 backdrop-blur-md border border-blue-500/12 shadow-[0_15px_30px_rgba(0,0,0,0.02)] hover:bg-white/12 mouse-glow-container overflow-hidden flex items-center justify-between premium-card-shadow"
        >
          <div className="border-glow-element" style={{ '--glow-color': '#ef4444' }} />
          <div className="mouse-glow-bg" />
          <div className="animate-shine-sweep" />
          
          <div className="relative z-10">
            <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Unfit Patients</span>
            <h3 className="text-3xl font-black text-red-650 mt-1">{unfitPatients}</h3>
            <p className="text-[10px] text-slate-400 font-bold mt-1.5 uppercase tracking-wider">Critical Vitals Alert</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-red-50/50 text-red-600 relative z-10 border border-red-100/30">
            <ShieldAlert size={22} />
          </div>
        </motion.div>

        {/* Pending Leaves */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onMouseMove={(e) => handleCardMouseMove(e, 'leaves')}
          onMouseLeave={() => handleCardMouseLeave('leaves')}
          style={{ ...tiltStyles.leaves }}
          className="group border-glow-wrapper card-3d relative rounded-3xl p-6 bg-white/8 backdrop-blur-md border border-blue-500/12 shadow-[0_15px_30px_rgba(0,0,0,0.02)] hover:bg-white/12 mouse-glow-container overflow-hidden flex items-center justify-between premium-card-shadow"
        >
          <div className="border-glow-element" style={{ '--glow-color': '#f59e0b' }} />
          <div className="mouse-glow-bg" />
          <div className="animate-shine-sweep" />
          
          <div className="relative z-10">
            <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Pending Leaves</span>
            <h3 className="text-3xl font-black text-slate-800 mt-1">{pendingLeaves.length}</h3>
            <p className="text-[10px] text-slate-400 font-bold mt-1.5 uppercase tracking-wider">Awaiting Review</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-yellow-50/50 text-yellow-600 relative z-10 border border-yellow-100/30">
            <CalendarClock size={22} />
          </div>
        </motion.div>

      </div>

      {/* Two Column details panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Helper Leave Requests */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          onMouseMove={(e) => handleCardMouseMove(e, 'leavePanel')}
          onMouseLeave={() => handleCardMouseLeave('leavePanel')}
          style={{ ...tiltStyles.leavePanel }}
          className="group border-glow-wrapper card-3d relative rounded-3xl p-6 bg-white/8 backdrop-blur-md border border-blue-500/12 shadow-[0_15px_30px_rgba(0,0,0,0.02)] hover:bg-white/12 mouse-glow-container overflow-hidden flex flex-col justify-between premium-card-shadow min-h-[380px]"
        >
          <div className="border-glow-element" style={{ '--glow-color': '#3b82f6' }} />
          <div className="mouse-glow-bg" />
          <div className="animate-shine-sweep" />

          <div className="relative z-10 w-full">
            <h3 className="text-base font-bold text-slate-800 border-b border-blue-100/30 pb-3 flex items-center gap-2">
              <CalendarClock className="text-blue-600" size={18} />
              <span>Leave & Availability Requests</span>
            </h3>
            {pendingLeaves.length === 0 ? (
              <p className="text-xs text-slate-400 py-16 text-center font-medium">No pending leave requests.</p>
            ) : (
              <div className="divide-y divide-blue-50/20 mt-3 max-h-[260px] overflow-y-auto pr-1 no-scrollbar">
                {pendingLeaves.map(leave => (
                  <div key={leave.id} className="py-4.5 flex items-center justify-between text-slate-800">
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900">{leave.helperName}</h4>
                      <p className="text-[10px] text-slate-450 font-bold mt-0.5">Date: {leave.date} ({leave.duration})</p>
                      <p className="text-xs text-slate-500 italic mt-1.5 bg-white/50 border border-slate-200/40 px-3 py-1.5 rounded-xl font-semibold max-w-[280px]">
                        Reason: {leave.reason}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => updateLeaveStatus(leave.id, 'Approved')}
                        className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-100/30 transition-all flex items-center justify-center"
                        title="Approve"
                      >
                        <Check size={16} />
                      </button>
                      <button 
                        onClick={() => updateLeaveStatus(leave.id, 'Rejected')}
                        className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-100/30 transition-all flex items-center justify-center"
                        title="Reject"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Audit Log Feed */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          onMouseMove={(e) => handleCardMouseMove(e, 'auditPanel')}
          onMouseLeave={() => handleCardMouseLeave('auditPanel')}
          style={{ ...tiltStyles.auditPanel }}
          className="group border-glow-wrapper card-3d relative rounded-3xl p-6 bg-white/8 backdrop-blur-md border border-blue-500/12 shadow-[0_15px_30px_rgba(0,0,0,0.02)] hover:bg-white/12 mouse-glow-container overflow-hidden flex flex-col justify-between premium-card-shadow min-h-[380px]"
        >
          <div className="border-glow-element" style={{ '--glow-color': '#3b82f6' }} />
          <div className="mouse-glow-bg" />
          <div className="animate-shine-sweep" />

          <div className="relative z-10 w-full">
            <h3 className="text-base font-bold text-slate-800 border-b border-blue-100/30 pb-3 flex items-center gap-2">
              <FileClock className="text-blue-600" size={18} />
              <span>Recent Activity Feed</span>
            </h3>
            <div className="divide-y divide-blue-50/20 mt-3 max-h-[260px] overflow-y-auto pr-1 no-scrollbar">
              {auditLogs.slice(0, 10).map(log => (
                <div key={log.id} className="py-3 flex items-start justify-between text-slate-800">
                  <div className="flex-1 pr-4">
                    <p className="text-xs font-semibold text-slate-700 leading-relaxed">{log.message}</p>
                    <span className="text-[9px] text-slate-400 font-bold block mt-0.5 uppercase tracking-wider">{log.date}</span>
                  </div>
                  <span className="text-[9px] px-2.5 py-1.5 rounded-full bg-white/50 border border-slate-200/40 text-slate-600 font-extrabold uppercase select-none tracking-wider shadow-sm">
                    {log.actor}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>

    </div>
  );
};

export default AdminDashboard;
