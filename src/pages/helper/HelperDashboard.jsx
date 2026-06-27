import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { 
  CheckSquare, Activity, Pill, LogIn, LogOut, Plus, AlertCircle, 
  Heart, Sun, Clock, Check, Award, Flame, Sparkles, Star
} from 'lucide-react';
import { motion } from 'framer-motion';

const HelperDashboard = () => {
  const { 
    activeUser, patients, medicines, tasks, toggleTask, addCustomTask, 
    checkInHelper, checkOutHelper, attendance, logVitals 
  } = useContext(AppContext);

  // States
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [sugar, setSugar] = useState('');
  const [pulse, setPulse] = useState('');
  const [vitalsMsg, setVitalsMsg] = useState('');
  const [customTask, setCustomTask] = useState('');
  const [taskTime, setTaskTime] = useState('09:00 AM');
  
  // Sparkle trigger on checkbox click
  const [activeSparkleId, setActiveSparkleId] = useState(null);

  // Card hover 3D tilt coordinates
  const [tiltStyles, setTiltStyles] = useState({
    patient: {},
    checklist: {},
    medicine: {},
    vitals: {}
  });

  // Time state for the header widget
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  if (!activeUser) return null;

  // Assignments lookup
  const assignedPatient = patients.find(p => p.helperId === activeUser.id);
  const patientMedicines = assignedPatient ? medicines.filter(m => m.patientId === assignedPatient.id) : [];
  const patientTasks = assignedPatient ? tasks.filter(t => t.patientId === assignedPatient.id) : [];

  // Attendance check
  const todayStr = new Date().toISOString().split('T')[0];
  const todayAttendance = attendance.find(a => a.helperId === activeUser.id && a.date === todayStr);
  const isCheckedIn = !!todayAttendance;
  const isCheckedOut = todayAttendance && !!todayAttendance.checkOut;

  // Completion analytics
  const completedTasksCount = patientTasks.filter(t => t.completed).length;
  const totalTasksCount = patientTasks.length;
  const completionPercentage = totalTasksCount > 0 ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0;

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

    // Tilt degrees (max 6deg)
    const tiltX = -dy * 6;
    const tiltY = dx * 6;

    setTiltStyles(prev => ({
      ...prev,
      [cardKey]: {
        '--mouse-x': `${x}px`,
        '--mouse-y': `${y}px`,
        transform: `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-8px)`,
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

  const handleVitalsSave = (e) => {
    e.preventDefault();
    if (!systolic || !diastolic || !sugar || !pulse) return;

    logVitals(assignedPatient.id, systolic, diastolic, sugar, pulse);
    setVitalsMsg('Vitals recorded successfully!');
    setSystolic('');
    setDiastolic('');
    setSugar('');
    setPulse('');
    setTimeout(() => setVitalsMsg(''), 3000);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!customTask.trim()) return;

    addCustomTask(assignedPatient.id, activeUser.id, customTask, taskTime);
    setCustomTask('');
    setTaskTime('09:00 AM');
  };

  const handleTaskToggleClick = (taskId, isCurrentlyCompleted) => {
    toggleTask(taskId);
    if (!isCurrentlyCompleted) {
      setActiveSparkleId(taskId);
      setTimeout(() => setActiveSparkleId(null), 1000);
    }
  };

  // Generate 12 premium static background gold sparkles
  const bgSparkles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${(i * 9) + 4}%`,
    top: `${(i % 2 === 0 ? 18 : 72) + (i % 3) * 4}%`,
    delay: `${-(i * 2.2)}s`,
    duration: `${14 + (i % 3) * 4}s`,
    size: `${(i % 3) * 2 + 3}px`
  }));

  return (
    <div className="relative min-h-[85vh] text-slate-800 pb-12 select-none">
      
      {/* ================= GORGEOUS ZEN NATURE BACKGROUND IMAGE LAYER ================= */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-3xl">
        {/* Real Generated Beautiful Zen Nature Landscape Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-[0.85] z-0" 
          style={{ backgroundImage: "url('/bg_nature.png')" }} 
        />
        
        {/* Soft white-mint glaze overlay to maintain high text contrast & legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/35 via-white/15 to-white/25 z-0" />
        
        {/* Sage/Mint glowing blobs */}
        <div className="absolute top-[10%] left-[20%] w-[450px] h-[450px] rounded-full bg-[#DDF7E3]/35 blur-[85px]" />
        <div className="absolute bottom-[20%] right-[15%] w-[450px] h-[450px] rounded-full bg-[#A7C7A3]/10 blur-[105px]" />

        {/* Floating golden wellness sparkles (Slow motion) */}
        {bgSparkles.map(sp => (
          <div 
            key={sp.id}
            className="bg-particle text-yellow-500/25 font-bold"
            style={{
              left: sp.left,
              top: sp.top,
              fontSize: sp.size,
              '--delay': sp.delay,
              '--duration': sp.duration,
              '--max-opacity': 0.4
            }}
          >
            ✦
          </div>
        ))}

        {/* Static vector wave outline at the bottom */}
        <div className="absolute bottom-0 inset-x-0 h-[220px] opacity-[0.06] text-emerald-800">
          <svg className="w-full h-full" viewBox="0 0 1440 220" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M0,160 L48,154.7 C96,149 192,139 288,144 C384,149 480,171 576,176 C672,181 768,171 864,154.7 C960,139 1056,117 1152,112 C1248,107 1344,117 1392,122.7 L1440,128 L1440,250 L1392,250 C1344,250 1248,250 1152,250 C1056,250 960,250 864,250 C768,250 672,250 576,250 C480,250 384,250 288,250 C192,250 96,250 48,250 L0,250 Z" />
          </svg>
        </div>
      </div>
      {/* ==================================================================== */}

      <div className="relative z-10 space-y-8 p-1">
        
        {/* ================= HEADER HERO SECTION ================= */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-3xl bg-white/25 backdrop-blur-md border border-emerald-100/30 p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-[0_15px_30px_rgba(0,0,0,0.03)]"
        >
          {/* Subtle Lotus decoration */}
          <div className="absolute right-[-40px] top-[-30px] opacity-[0.04] text-emerald-800 pointer-events-none rotate-12">
            <svg width="180" height="180" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12,2C12,2 6,8 6,12C6,15.31 8.69,18 12,18C15.31,18 18,15.31 18,12C18,8 12,2 12,2Z" />
            </svg>
          </div>

          <div className="space-y-1.5 max-w-xl">
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-widest">
              <Award size={14} />
              <span>Dedicated Caregiver Workspace</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
              Welcome back, <span className="text-emerald-700">{activeUser.name.split(' ')[0]}</span> 👋
            </h2>
            <p className="text-slate-500 text-xs italic font-medium leading-relaxed">
              "To care for those who once cared for us is one of the highest honors." — Thank you for your warmth and service today.
            </p>
          </div>

          {/* Widgets and Check-In panel */}
          <div className="flex flex-wrap items-center gap-4">
            
            {/* Exciting Caregiver Streak & Care Index Widgets */}
            <div className="flex items-center gap-2">
              {/* Shift Streak */}
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-orange-50 text-orange-700 font-extrabold text-[10px] uppercase border border-orange-100 shadow-sm animate-pulse">
                <Flame size={12} className="fill-orange-500" />
                <span>🔥 5 Days Streak</span>
              </div>
              {/* Care Score Index */}
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 font-extrabold text-[10px] uppercase border border-emerald-100 shadow-sm">
                <Star size={12} className="fill-emerald-500 text-emerald-600" />
                <span>🌟 Care Index: 9.8</span>
              </div>
            </div>

            {/* Clock Widget */}
            <div className="flex items-center gap-3 px-3 py-2 rounded-2xl bg-white/50 border border-slate-100 text-xs font-semibold text-slate-650 shadow-sm">
              <div className="flex items-center gap-1 text-emerald-600">
                <Sun size={14} />
                <span>24°C Calm</span>
              </div>
              <div className="w-[1px] h-3 bg-slate-200" />
              <div className="flex items-center gap-1.5">
                <Clock size={13} />
                <span>{time}</span>
              </div>
            </div>

            {/* Check In / Out Buttons */}
            <div className="flex items-center gap-2">
              {isCheckedOut ? (
                <div className="text-xs px-3.5 py-2 rounded-2xl bg-slate-100 text-slate-555 font-extrabold border border-slate-200">
                  Shift Closed ({todayAttendance.checkOut})
                </div>
              ) : isCheckedIn ? (
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] uppercase font-black text-emerald-750 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 mr-1 shadow-sm">
                    ● Active Shift
                  </span>
                  <button 
                    onClick={() => checkOutHelper(activeUser.id)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-650 text-xs font-extrabold rounded-2xl border border-rose-250/30 transition-all duration-300 shadow-sm"
                  >
                    <LogOut size={13} />
                    <span>Check Out</span>
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => checkInHelper(activeUser.id)}
                  className="flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-xs font-extrabold rounded-2xl transition-all duration-300 shadow-md shadow-emerald-500/10"
                >
                  <LogIn size={13} />
                  <span>Start Duty Shift</span>
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* ================= MAIN ASSIGNMENT VIEW ================= */}
        {!assignedPatient ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/80 backdrop-blur-md border border-emerald-100/40 rounded-[24px] p-10 text-center shadow-xl shadow-emerald-900/5"
          >
            <AlertCircle size={44} className="text-amber-500 mx-auto mb-3.5" />
            <h3 className="text-xl font-bold text-slate-800">No Patient Linked</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-2 leading-relaxed font-semibold">
              You do not have a linked patient schedule. Please contact the administrator to bind your account to an Elder Patient.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* 1. Left Column: Patient details & Vitals logging */}
            <div className="space-y-8 lg:col-span-1">
              
              {/* Patient Info Card */}
              <div 
                onMouseMove={(e) => handleCardMouseMove(e, 'patient')}
                onMouseLeave={() => handleCardMouseLeave('patient')}
                style={{
                  ...tiltStyles.patient,
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.05)'
                }}
                className="group border-glow-wrapper card-3d relative rounded-[24px] p-6 glass-card-calm hover:bg-white/85 mouse-glow-container overflow-hidden"
              >
                <div className="border-glow-element" style={{ '--glow-color': '#10b981' }} />
                <div className="mouse-glow-bg" />

                <div className="relative z-10 flex items-center justify-between border-b border-emerald-100/30 pb-4 mb-4">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Assigned Patient</h3>
                  {/* Glowing pulsing heartbeat vector */}
                  <Heart className="text-emerald-550 fill-emerald-500 animate-pulse" size={14} />
                </div>

                <div className="relative z-10 flex items-center gap-4">
                  {/* Patient initials Avatar with Care Progress Ring */}
                  <div className="relative w-16 h-16 flex items-center justify-center bg-gradient-to-tr from-emerald-100 to-mint rounded-full border border-emerald-200/50 shadow-sm text-emerald-800 font-black text-lg">
                    {assignedPatient.name.split(' ').map(n=>n[0]).join('')}
                    {/* Completion Ring */}
                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                      <circle cx="32" cy="32" r="30" fill="none" stroke="#e2e8f0" strokeWidth="2.5" />
                      <circle cx="32" cy="32" r="30" fill="none" stroke="#16a34a" strokeWidth="2.5" 
                              strokeDasharray="188.4" 
                              strokeDashoffset={188.4 - (188.4 * completionPercentage) / 100} 
                              strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-black text-lg text-slate-800 group-hover:text-emerald-700 transition-colors">
                      {assignedPatient.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-[9px] font-black uppercase text-amber-800 bg-amber-50 border border-amber-200/50 px-2 py-0.5 rounded-md">
                        Blood: {assignedPatient.bloodGroup}
                      </span>
                      <span className="text-[9px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                        {assignedPatient.age} Yrs Old
                      </span>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 mt-5 space-y-2">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Primary Conditions</p>
                  <div className="flex flex-wrap gap-1.5">
                    {assignedPatient.disease ? assignedPatient.disease.split(',').map((cond, idx) => (
                      <span key={idx} className="text-[10px] font-bold text-emerald-700 bg-emerald-50/50 border border-emerald-100/40 px-2.5 py-1 rounded-full">
                        {cond.trim()}
                      </span>
                    )) : (
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-50 p-1.5 rounded-lg w-full">
                        None registered
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Vitals Form Card */}
              <div 
                onMouseMove={(e) => handleCardMouseMove(e, 'vitals')}
                onMouseLeave={() => handleCardMouseLeave('vitals')}
                style={{
                  ...tiltStyles.vitals,
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.05)'
                }}
                className="group border-glow-wrapper card-3d relative rounded-[24px] p-6 glass-card-calm hover:bg-white/85 mouse-glow-container overflow-hidden"
              >
                <div className="border-glow-element" style={{ '--glow-color': '#10b981' }} />
                <div className="mouse-glow-bg" />

                <div className="relative z-10 flex items-center gap-2 border-b border-emerald-100/30 pb-4 mb-4">
                  <Activity className="text-emerald-600" size={18} />
                  <h3 className="text-sm font-bold text-slate-800">Log Health Vitals</h3>
                </div>

                {vitalsMsg && (
                  <div className="relative z-10 mb-4 p-3 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-800 shadow-sm">
                    <Check size={14} className="bg-emerald-600 text-white rounded-full p-0.5" />
                    <span>{vitalsMsg}</span>
                  </div>
                )}

                <form onSubmit={handleVitalsSave} className="relative z-10 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <input 
                        type="number" 
                        value={systolic}
                        onChange={(e) => setSystolic(e.target.value)}
                        placeholder="e.g. 120"
                        className="peer w-full px-3 py-2.5 rounded-xl bg-white/60 border border-slate-200 focus:border-emerald-500 focus:outline-none text-slate-700 text-xs font-semibold shadow-sm transition-colors"
                        required
                      />
                      <label className="absolute left-3 top-[-7px] bg-[#f5f8f6] px-1 text-[9px] font-black text-slate-400 uppercase tracking-wider transition-all peer-focus:text-emerald-600">
                        BP Systolic
                      </label>
                    </div>
                    <div className="relative">
                      <input 
                        type="number" 
                        value={diastolic}
                        onChange={(e) => setDiastolic(e.target.value)}
                        placeholder="e.g. 80"
                        className="peer w-full px-3 py-2.5 rounded-xl bg-white/60 border border-slate-200 focus:border-emerald-500 focus:outline-none text-slate-700 text-xs font-semibold shadow-sm transition-colors"
                        required
                      />
                      <label className="absolute left-3 top-[-7px] bg-[#f5f8f6] px-1 text-[9px] font-black text-slate-400 uppercase tracking-wider transition-all peer-focus:text-emerald-600">
                        BP Diastolic
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <input 
                        type="number" 
                        value={sugar}
                        onChange={(e) => setSugar(e.target.value)}
                        placeholder="e.g. 110"
                        className="peer w-full px-3 py-2.5 rounded-xl bg-white/60 border border-slate-200 focus:border-emerald-500 focus:outline-none text-slate-700 text-xs font-semibold shadow-sm transition-colors"
                        required
                      />
                      <label className="absolute left-3 top-[-7px] bg-[#f5f8f6] px-1 text-[9px] font-black text-slate-400 uppercase tracking-wider transition-all peer-focus:text-emerald-600">
                        Sugar (mg/dL)
                      </label>
                    </div>
                    <div className="relative">
                      <input 
                        type="number" 
                        value={pulse}
                        onChange={(e) => setPulse(e.target.value)}
                        placeholder="e.g. 72"
                        className="peer w-full px-3 py-2.5 rounded-xl bg-white/60 border border-slate-200 focus:border-emerald-500 focus:outline-none text-slate-700 text-xs font-semibold shadow-sm transition-colors"
                        required
                      />
                      <label className="absolute left-3 top-[-7px] bg-[#f5f8f6] px-1 text-[9px] font-black text-slate-400 uppercase tracking-wider transition-all peer-focus:text-emerald-600">
                        Pulse (bpm)
                      </label>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={!isCheckedIn || isCheckedOut}
                    className="w-full mt-2 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-extrabold text-xs rounded-2xl shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {!isCheckedIn ? 'Check-In to Save Vitals' : 'Save Health Vitals'}
                  </button>
                </form>
              </div >

            </div>

            {/* 2. Middle Column: Daily Task Checklist */}
            <div className="space-y-8 lg:col-span-1">
              <div 
                onMouseMove={(e) => handleCardMouseMove(e, 'checklist')}
                onMouseLeave={() => handleCardMouseLeave('checklist')}
                style={{
                  ...tiltStyles.checklist,
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.05)'
                }}
                className="group border-glow-wrapper card-3d relative rounded-[24px] p-6 glass-card-calm hover:bg-white/85 mouse-glow-container overflow-hidden flex flex-col justify-between min-h-[460px]"
              >
                <div className="border-glow-element" style={{ '--glow-color': '#10b981' }} />
                <div className="mouse-glow-bg" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between border-b border-emerald-100/30 pb-4 mb-4">
                    <div className="flex items-center gap-2">
                      <CheckSquare className="text-emerald-600" size={18} />
                      <h3 className="text-sm font-bold text-slate-800">Shift Duty Checklist</h3>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                      {completedTasksCount}/{totalTasksCount} Done ({completionPercentage}%)
                    </span>
                  </div>

                  <div className="w-full h-1.5 bg-slate-100 rounded-full mb-4 overflow-hidden">
                    <div 
                      className="h-full bg-emerald-600 rounded-full transition-all duration-500 ease-out" 
                      style={{ width: `${completionPercentage}%` }} 
                    />
                  </div>

                  {/* Exciting Complete Celebration Banner */}
                  {completionPercentage === 100 && totalTasksCount > 0 && (
                    <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-center gap-1.5 text-[10px] font-black text-emerald-800 animate-pulse mb-3.5 shadow-sm">
                      <Sparkles size={13} className="text-yellow-500 fill-yellow-400" />
                      <span>ALL SHIFT DUTIES COMPLETED!</span>
                    </div>
                  )}

                  {patientTasks.length === 0 ? (
                    <p className="text-xs text-slate-400 py-10 text-center font-medium">No shift tasks configured for today.</p>
                  ) : (
                    <div className="space-y-3 max-h-[200px] overflow-y-auto pr-1 no-scrollbar">
                      {patientTasks.map(task => (
                        <div key={task.id} className="relative flex items-start gap-3 p-3 rounded-2xl bg-white/50 border border-slate-200/50 hover:bg-emerald-50/20 hover:border-emerald-100/20 transition-all duration-300">
                          {/* Sparkle pop up indicator */}
                          {activeSparkleId === task.id && (
                            <div className="absolute left-2 top-2 z-20 text-yellow-500 pointer-events-none">
                              <Sparkles size={14} className="fill-yellow-400 animate-pulse" />
                            </div>
                          )}
                          
                          <input 
                            type="checkbox" 
                            checked={task.completed}
                            disabled={!isCheckedIn || isCheckedOut}
                            onChange={() => handleTaskToggleClick(task.id, task.completed)}
                            className="mt-0.5 w-4 h-4 rounded-full border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                          />
                          <div className="leading-tight">
                            <p className={`text-xs font-bold transition-all duration-300 ${task.completed ? 'line-through text-slate-400 opacity-60' : 'text-slate-850'}`}>
                              {task.task}
                            </p>
                            <span className="text-[9px] text-slate-400 font-bold mt-0.5 block">{task.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Add Custom Task Form */}
                <form onSubmit={handleAddTask} className="relative z-10 border-t border-emerald-100/30 pt-4 mt-6 flex flex-col gap-3">
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={customTask}
                      onChange={(e) => setCustomTask(e.target.value)}
                      placeholder="Add custom task..."
                      disabled={!isCheckedIn || isCheckedOut}
                      className="flex-1 px-3 py-2 rounded-xl bg-white/60 border border-slate-200 focus:outline-none focus:border-emerald-500 text-xs font-semibold text-slate-700 disabled:opacity-50 shadow-sm"
                    />
                    <input 
                      type="text" 
                      value={taskTime}
                      onChange={(e) => setTaskTime(e.target.value)}
                      placeholder="e.g. 09:00 AM"
                      disabled={!isCheckedIn || isCheckedOut}
                      className="w-24 px-2 py-2 rounded-xl bg-white/60 border border-slate-200 focus:outline-none focus:border-emerald-500 text-[10px] font-bold text-center text-slate-700 disabled:opacity-50 shadow-sm"
                    />
                  </div>
                  <button 
                    type="submit"
                    disabled={!isCheckedIn || isCheckedOut}
                    className="w-full py-2.5 bg-[#DDF7E3] hover:bg-emerald-100 text-emerald-800 border border-emerald-250/20 font-extrabold text-xs rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1"
                  >
                    <Plus size={12} />
                    <span>Add Shift Task</span>
                  </button>
                </form>
              </div>
            </div>

            {/* 3. Right Column: Medicine Reminder Guide */}
            <div className="space-y-8 lg:col-span-1">
              <div 
                onMouseMove={(e) => handleCardMouseMove(e, 'medicine')}
                onMouseLeave={() => handleCardMouseLeave('medicine')}
                style={{
                  ...tiltStyles.medicine,
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.05)'
                }}
                className="group border-glow-wrapper card-3d relative rounded-[24px] p-6 glass-card-calm hover:bg-white/85 mouse-glow-container overflow-hidden min-h-[460px]"
              >
                <div className="border-glow-element" style={{ '--glow-color': '#10b981' }} />
                <div className="mouse-glow-bg" />

                <div className="relative z-10 flex items-center gap-2 border-b border-emerald-100/30 pb-4 mb-4">
                  <Pill className="text-emerald-600" size={18} />
                  <h3 className="text-sm font-bold text-slate-800">Medicine (Dava) Schedule</h3>
                </div>

                {patientMedicines.length === 0 ? (
                  <p className="relative z-10 text-xs text-slate-400 py-12 text-center font-medium">No medicine schedule configured.</p>
                ) : (
                  <div className="relative z-10 mt-4 space-y-4 max-h-[350px] overflow-y-auto pr-1 no-scrollbar">
                    {patientMedicines.map((med, idx) => {
                      const lowerTime = med.time.toLowerCase();
                      const isMorning = lowerTime.includes('am') || lowerTime.includes('morning');
                      const isNight = lowerTime.includes('pm') && (lowerTime.includes('8') || lowerTime.includes('9') || lowerTime.includes('10') || lowerTime.includes('night'));
                      
                      let tagStyles = "bg-teal-50 text-teal-800 border-teal-100";
                      if (isMorning) tagStyles = "bg-amber-50 text-amber-800 border-amber-250/50";
                      else if (isNight) tagStyles = "bg-indigo-50 text-indigo-800 border-indigo-150/40";

                      return (
                        <div key={med.id} className="relative pl-5 group/item">
                          {/* Pulsing indicator dot */}
                          <div className="absolute left-[3px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white shadow-sm z-10 animate-pulse" />
                          
                          {idx < patientMedicines.length - 1 && (
                            <div className="absolute left-[7px] top-1/2 bottom-[-28px] w-[1px] border-l border-dashed border-emerald-250/50" />
                          )}

                          <div className="p-3.5 rounded-2xl bg-white/50 border border-slate-200/50 flex flex-col gap-1 hover:bg-emerald-50/15 hover:border-emerald-100/30 transition-all duration-300 shadow-sm relative overflow-hidden">
                            <span className={`text-[9px] uppercase font-black px-2.5 py-0.5 rounded border w-fit ${tagStyles}`}>
                              {med.time}
                            </span>
                            <div className="flex items-center justify-between mt-1">
                              <h4 className="font-extrabold text-xs text-slate-800">{med.name}</h4>
                              <span className="text-[9px] font-bold text-slate-400 italic">Qty: 1 Tab</span>
                            </div>
                            <p className="text-[9px] text-slate-400 font-bold mt-0.5 uppercase tracking-wider">{med.company}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

          </div>
        )}

        {/* ================= BOTTOM MOTIVATION WELLNESS CARD ================= */}
        <div className="relative overflow-hidden rounded-[32px] bg-white/20 backdrop-blur-md border border-emerald-100/30 p-8 md:p-12 text-center shadow-[0_20px_45px_rgba(0,0,0,0.04)] max-w-5xl mx-auto flex flex-col items-center justify-center group">
          {/* Eucalyptus Branch Left */}
          <div className="absolute left-[-20px] bottom-[-20px] opacity-[0.06] text-emerald-800 rotate-45 pointer-events-none select-none">
            <svg width="220" height="220" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17,8C8,10 5.9,16.17 3.82,21.34L2.18,20.66C4.26,15.49 6.34,9 15.67,7C12.5,5 9,5 5,7L4,5C9,3 13,3 17,5C20,3.7 22.3,4.3 22.3,4.3C22.3,4.3 21.7,7 17,8Z" />
            </svg>
          </div>

          <div className="relative w-28 h-20 mb-4 flex items-center justify-center text-emerald-600/25 pointer-events-none">
            {/* Golden Sparkles floating */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles size={48} className="text-yellow-400/40 animate-pulse absolute" />
            </div>
            <svg width="84" height="84" viewBox="0 0 24 24" fill="currentColor" className="relative z-10">
              <path d="M12,2C12,2 6,8 6,12C6,15.31 8.69,18 12,18C15.31,18 18,15.31 18,12C18,8 12,2 12,2Z" />
            </svg>
          </div>

          <p className="text-sm font-black text-emerald-800 uppercase tracking-widest mb-2">
            Daily Reflection
          </p>
          
          <h3 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight max-w-2xl leading-relaxed">
            "You make a difference every day. <br />
            <span className="text-emerald-700">Every act of kindness heals another life.</span>"
          </h3>
          
          <p className="text-xs text-slate-400 mt-3 font-semibold">
            Health Care Network | Nurturing Wellness & Calm Caregiving
          </p>
        </div>

      </div>
    </div>
  );
};

export default HelperDashboard;
