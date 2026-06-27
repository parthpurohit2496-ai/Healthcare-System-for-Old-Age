import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { 
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend 
} from 'recharts';
import { 
  Heart, AlertTriangle, Link2, MessageSquare, Send, Bell, Pill, Utensils, FileText,
  Activity, Star, Sparkles, Sun, Clock
} from 'lucide-react';
import { motion } from 'framer-motion';

const OldPersonDashboard = () => {
  const { 
    activeUser, patients, vitals, medicines, chats, sendMessage, 
    triggerSos, addFeedback, updateFoodLog, announcements, helpers, sosAlerts 
  } = useContext(AppContext);

  // States
  const [familyLinked, setFamilyLinked] = useState(false);
  const [familyEmail, setFamilyEmail] = useState('');
  const [chatText, setChatText] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState('');

  // Food inputs
  const [breakfast, setBreakfast] = useState('');
  const [lunch, setLunch] = useState('');
  const [dinner, setDinner] = useState('');
  const [foodMsg, setFoodMsg] = useState('');

  // Time state
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  // Card hover 3D tilt coordinates
  const [tiltStyles, setTiltStyles] = useState({
    chart: {},
    family: {},
    announcements: {},
    reports: {},
    food: {},
    meds: {},
    chat: {},
    feedback: {}
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  if (!activeUser) return null;

  // Find this patient
  const patient = patients.find(p => p.id === activeUser.id);
  if (!patient) return <div className="text-center py-8">Patient not found in registry.</div>;

  // Find assigned helper
  const assignedHelper = helpers.find(h => h.id === patient.helperId);

  // Vitals for this patient
  const patientVitals = vitals.filter(v => v.patientId === patient.id);
  const lastVitals = patientVitals[patientVitals.length - 1];

  // Medicines
  const patientMeds = medicines.filter(m => m.patientId === patient.id);

  // Chat filter
  const patientChats = chats.filter(c => c.sender === patient.id || c.receiver === patient.id);

  // SOS status
  const activeSos = sosAlerts.find(s => s.patientId === patient.id && s.active);

  const handleSosTrigger = () => {
    triggerSos(patient.id, "EMERGENCY: Elder triggered manually from dashboard.");
  };

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatText.trim()) return;
    const receiverId = patient.helperId || 'Family';
    sendMessage(chatText, receiverId);
    setChatText('');
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;
    addFeedback(patient.id, feedbackText);
    setFeedbackText('');
    setFeedbackMsg('Feedback submitted successfully.');
    setTimeout(() => setFeedbackMsg(''), 3000);
  };

  const handleFoodSubmit = (e) => {
    e.preventDefault();
    updateFoodLog(patient.id, breakfast, lunch, dinner);
    setFoodMsg('Meals updated successfully!');
    setTimeout(() => setFoodMsg(''), 3000);
  };

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
    const tiltX = -dy * 5;
    const tiltY = dx * 5;

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

  // Get current today food log
  const todayStr = new Date().toISOString().split('T')[0];
  const todayFood = patient.foodLogs?.find(f => f.date === todayStr);

  // Generate 12 premium static background gold sparkles
  const bgSparkles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${(i * 9) + 4}%`,
    top: `${(i % 2 === 0 ? 15 : 75) + (i % 3) * 4}%`,
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
        
        {/* Soft white-lavender glaze overlay to ensure high contrast & role-specific purple theme */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F9F5FB]/80 via-[#FDFCFD]/65 to-[#F5F2F9]/75 z-0" />
        
        {/* Purple/Lavender glowing blobs */}
        <div className="absolute top-[10%] left-[20%] w-[450px] h-[450px] rounded-full bg-purple-100/30 blur-[85px]" />
        <div className="absolute bottom-[20%] right-[15%] w-[450px] h-[450px] rounded-full bg-indigo-50/20 blur-[105px]" />

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
        <div className="absolute bottom-0 inset-x-0 h-[220px] opacity-[0.06] text-purple-800">
          <svg className="w-full h-full" viewBox="0 0 1440 220" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M0,160 L48,154.7 C96,149 192,139 288,144 C384,149 480,171 576,176 C672,181 768,171 864,154.7 C960,139 1056,117 1152,112 C1248,107 1344,117 1392,122.7 L1440,128 L1440,250 L1392,250 C1344,250 1248,250 1152,250 C1056,250 960,250 864,250 C768,250 672,250 576,250 C480,250 384,250 288,250 C192,250 96,250 48,250 L0,250 Z" />
          </svg>
        </div>
      </div>
      {/* ==================================================================== */}

      <div className="relative z-10 space-y-8 p-1">
        
        {/* ================= TOP WELCOME PANEL + SOS EMERGENCY TRIGGER ================= */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-3xl bg-white/30 backdrop-blur-md border border-purple-100/30 p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-[0_15px_30px_rgba(0,0,0,0.03)]"
        >
          {/* Subtle flower logo background decoration */}
          <div className="absolute right-[-40px] top-[-30px] opacity-[0.03] text-purple-800 pointer-events-none rotate-12">
            <svg width="180" height="180" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12,2C12,2 6,8 6,12C6,15.31 8.69,18 12,18C15.31,18 18,15.31 18,12C18,8 12,2 12,2Z" />
            </svg>
          </div>

          <div className="space-y-1.5 max-w-xl">
            <div className="flex items-center gap-2 text-purple-700 font-bold text-xs uppercase tracking-widest">
              <Star size={14} className="fill-purple-300" />
              <span>Assisted Elderly Portal</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
              Hello, <span className="text-purple-700">{patient.name.split(' ')[0]}</span> 🌸
            </h2>
            <p className="text-slate-500 text-sm font-semibold">
              Track your health records, log meals, and contact care helpers.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* Clock Widget */}
            <div className="flex items-center gap-3 px-3 py-2 rounded-2xl bg-white/50 border border-purple-100/20 text-xs font-semibold text-slate-650 shadow-sm">
              <div className="flex items-center gap-1 text-purple-650">
                <Sun size={14} />
                <span>24°C Calm</span>
              </div>
              <div className="w-[1px] h-3 bg-purple-150/20" />
              <div className="flex items-center gap-1.5">
                <Clock size={13} />
                <span>{time}</span>
              </div>
            </div>

            {/* SOS Alert Button */}
            <div>
              {activeSos ? (
                <div className="px-6 py-3 bg-red-150 border border-red-200 rounded-2xl text-center animate-pulse shadow-sm">
                  <span className="font-extrabold text-red-700 text-sm flex items-center gap-1.5 justify-center">
                    <AlertTriangle />
                    SOS TRANSMITTING...
                  </span>
                  <p className="text-[10px] text-red-600 font-bold mt-1">Medical assistance has been notified.</p>
                </div>
              ) : (
                <button 
                  onClick={handleSosTrigger}
                  className="flex items-center gap-2 px-6 py-3.5 bg-red-950/35 backdrop-blur-md border border-red-500/40 text-red-200 hover:text-white hover:bg-red-900/45 hover:border-red-400/55 font-extrabold text-xs uppercase tracking-wider rounded-2xl shadow-[0_12px_24px_rgba(239,68,68,0.18)] transition-all active:scale-[0.97]"
                >
                  <AlertTriangle size={15} className="text-red-400 animate-pulse" />
                  <span>EMERGENCY SOS</span>
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* ================= MAIN ASSIGNMENT VIEW ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Health vitals chart */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Vitals History Line Chart */}
            <div 
              onMouseMove={(e) => handleCardMouseMove(e, 'chart')}
              onMouseLeave={() => handleCardMouseLeave('chart')}
              style={{
                ...tiltStyles.chart,
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.04)'
              }}
              className="group border-glow-wrapper card-3d relative rounded-3xl p-6 bg-white/8 opacity-95 backdrop-blur-md border border-purple-500/16 hover:bg-white/12 mouse-glow-container overflow-hidden flex flex-col justify-between"
            >
              <div className="border-glow-element" style={{ '--glow-color': '#a855f7' }} />
              <div className="mouse-glow-bg" />
              <div className="animate-shine-sweep" />

              <div className="relative z-10">
                <h3 className="text-base font-bold text-slate-800 border-b border-purple-100/30 pb-3 flex items-center gap-2">
                  <Heart className="text-red-500 fill-red-500" size={18} />
                  <span>My Health Vitals History</span>
                </h3>
                {patientVitals.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-12 font-medium">No vitals logged yet by care helper.</p>
                ) : (
                  <div className="h-64 mt-4 w-full text-slate-600 font-bold">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={patientVitals} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="date" stroke="#94a3b8" fontSize={9} tickLine={false} />
                        <YAxis stroke="#94a3b8" fontSize={9} tickLine={false} />
                        <Tooltip />
                        <Legend verticalAlign="top" height={36} fontSize={10} />
                        <Line type="monotone" dataKey="bpSystolic" name="Systolic (BP)" stroke="#a855f7" strokeWidth={2.5} activeDot={{ r: 6 }} />
                        <Line type="monotone" dataKey="bpDiastolic" name="Diastolic (BP)" stroke="#c084fc" strokeWidth={2} />
                        <Line type="monotone" dataKey="sugar" name="Sugar" stroke="#10b981" strokeWidth={2} />
                        <Line type="monotone" dataKey="pulse" name="Pulse Rate" stroke="#f43f5e" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>

              {/* Current Vitals Readings */}
              {lastVitals && (
                <div className="relative z-10 grid grid-cols-4 gap-4 mt-6 pt-4 border-t border-purple-100/30 text-center">
                  <div className="bg-purple-50/40 p-2.5 rounded-2xl border border-purple-100/40">
                    <p className="text-[9px] text-slate-400 font-black uppercase tracking-wider">Blood Pressure</p>
                    <h4 className="text-base font-black text-purple-750 mt-1">{lastVitals.bpSystolic}/{lastVitals.bpDiastolic}</h4>
                    <span className="text-[8px] text-slate-450 font-bold uppercase tracking-widest">mmHg</span>
                  </div>
                  <div className="bg-emerald-50/40 p-2.5 rounded-2xl border border-emerald-100/40">
                    <p className="text-[9px] text-slate-400 font-black uppercase tracking-wider">Sugar Level</p>
                    <h4 className="text-base font-black text-emerald-700 mt-1">{lastVitals.sugar}</h4>
                    <span className="text-[8px] text-slate-450 font-bold uppercase tracking-widest">mg/dL</span>
                  </div>
                  <div className="bg-rose-50/40 p-2.5 rounded-2xl border border-rose-100/40">
                    <p className="text-[9px] text-slate-400 font-black uppercase tracking-wider">Heart Pulse</p>
                    <h4 className="text-base font-black text-rose-700 mt-1">{lastVitals.pulse}</h4>
                    <span className="text-[8px] text-slate-450 font-bold uppercase tracking-widest">bpm</span>
                  </div>
                  <div className="bg-slate-50/40 p-2.5 rounded-2xl border border-slate-200/40">
                    <p className="text-[9px] text-slate-400 font-black uppercase tracking-wider">Care Status</p>
                    <h4 className={`text-xs font-black mt-2.5 uppercase ${patient.fitStatus === 'Fit' ? 'text-emerald-750' : 'text-red-650'}`}>
                      {patient.fitStatus}
                    </h4>
                  </div>
                </div>
              )}
            </div>

            {/* Interactive Actions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Link Family Member Card */}
              <div 
                onMouseMove={(e) => handleCardMouseMove(e, 'family')}
                onMouseLeave={() => handleCardMouseLeave('family')}
                style={{
                  ...tiltStyles.family,
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.04)'
                }}
                className="group border-glow-wrapper card-3d relative rounded-3xl p-6 bg-white/8 opacity-95 backdrop-blur-md border border-purple-500/16 hover:bg-white/12 mouse-glow-container overflow-hidden flex flex-col justify-between"
              >
                <div className="border-glow-element" style={{ '--glow-color': '#a855f7' }} />
                <div className="mouse-glow-bg" />
                <div className="animate-shine-sweep" />

                <div className="relative z-10">
                  <h3 className="text-base font-bold text-slate-800 border-b border-purple-100/30 pb-3 flex items-center gap-2">
                    <Link2 className="text-purple-600" size={18} />
                    <span>Link Family Member</span>
                  </h3>
                  
                  {familyLinked ? (
                    <div className="mt-4 p-3 bg-emerald-50/50 text-emerald-800 text-xs font-semibold rounded-2xl border border-emerald-100 text-center shadow-sm">
                      Linked: <strong className="text-emerald-900">{familyEmail}</strong> (View-Only Mode)
                    </div>
                  ) : (
                    <div className="mt-4 space-y-3">
                      <p className="text-xs text-slate-400 leading-relaxed font-semibold">
                        Grant view-only health records access to family members by entering their email address.
                      </p>
                      <input 
                        type="email" 
                        value={familyEmail}
                        onChange={(e) => setFamilyEmail(e.target.value)}
                        placeholder="family@member.com"
                        className="w-full px-3 py-2.5 rounded-xl bg-white/60 border border-slate-200 focus:outline-none focus:border-purple-500 text-xs font-semibold text-slate-700 shadow-sm"
                      />
                      <button 
                        onClick={() => familyEmail && setFamilyLinked(true)}
                        className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-extrabold text-xs rounded-xl shadow-sm transition-all"
                      >
                        Authorize Access
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Announcements Panel */}
              <div 
                onMouseMove={(e) => handleCardMouseMove(e, 'announcements')}
                onMouseLeave={() => handleCardMouseLeave('announcements')}
                style={{
                  ...tiltStyles.announcements,
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.04)'
                }}
                className="group border-glow-wrapper card-3d relative rounded-3xl p-6 bg-white/8 opacity-95 backdrop-blur-md border border-purple-500/16 hover:bg-white/12 mouse-glow-container overflow-hidden flex flex-col justify-between"
              >
                <div className="border-glow-element" style={{ '--glow-color': '#a855f7' }} />
                <div className="mouse-glow-bg" />
                <div className="animate-shine-sweep" />

                <div className="relative z-10 w-full">
                  <h3 className="text-base font-bold text-slate-800 border-b border-purple-100/30 pb-3 flex items-center gap-2">
                    <Bell className="text-purple-650" size={18} />
                    <span>Announcements</span>
                  </h3>
                  <div className="mt-3 space-y-2 max-h-[140px] overflow-y-auto pr-1 no-scrollbar">
                    {announcements.length === 0 ? (
                      <p className="text-xs text-slate-400 py-6 text-center font-medium">No announcements logged.</p>
                    ) : (
                      announcements.map(ann => (
                        <div key={ann.id} className="p-2.5 rounded-2xl bg-white/50 border border-slate-200/50 text-xs text-slate-800 shadow-sm">
                          <p className="font-bold text-slate-900 leading-relaxed">{ann.text}</p>
                          <span className="text-[9px] text-slate-400 font-bold block mt-1 uppercase tracking-widest">{ann.date}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

            </div>

            {/* Diagnostic Reports and Food Log */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Reports Uploaded by Admin */}
              <div 
                onMouseMove={(e) => handleCardMouseMove(e, 'reports')}
                onMouseLeave={() => handleCardMouseLeave('reports')}
                style={{
                  ...tiltStyles.reports,
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.04)'
                }}
                className="group border-glow-wrapper card-3d relative rounded-3xl p-6 bg-white/8 opacity-95 backdrop-blur-md border border-purple-500/16 hover:bg-white/12 mouse-glow-container overflow-hidden flex flex-col justify-between"
              >
                <div className="border-glow-element" style={{ '--glow-color': '#a855f7' }} />
                <div className="mouse-glow-bg" />
                <div className="animate-shine-sweep" />

                <div className="relative z-10 w-full">
                  <h3 className="text-base font-bold text-slate-800 border-b border-purple-100/30 pb-3 flex items-center gap-2">
                    <FileText className="text-purple-600" size={18} />
                    <span>Medical Reports ({patient.reports?.length || 0})</span>
                  </h3>
                  {(patient.reports?.length || 0) === 0 ? (
                    <p className="text-xs text-slate-400 py-10 text-center font-medium">No reports uploaded by administrator.</p>
                  ) : (
                    <div className="mt-3 space-y-3 max-h-[220px] overflow-y-auto pr-1 no-scrollbar">
                      {patient.reports.map(rep => (
                        <div key={rep.id} className="p-2.5 rounded-2xl bg-white/50 border border-slate-200/50 text-xs text-slate-855 shadow-sm">
                          <div className="flex justify-between items-center text-[9px] font-bold text-slate-400">
                            <span>{rep.type}</span>
                            <span>{rep.date}</span>
                          </div>
                          <h5 className="font-bold text-slate-900 mt-1">{rep.summary}</h5>
                          {rep.details && <p className="text-[10px] text-slate-500 italic mt-1 font-semibold">{rep.details}</p>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Food Log update */}
              <div 
                onMouseMove={(e) => handleCardMouseMove(e, 'food')}
                onMouseLeave={() => handleCardMouseLeave('food')}
                style={{
                  ...tiltStyles.food,
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.04)'
                }}
                className="group border-glow-wrapper card-3d relative rounded-3xl p-6 bg-white/8 opacity-95 backdrop-blur-md border border-purple-500/16 hover:bg-white/12 mouse-glow-container overflow-hidden flex flex-col justify-between"
              >
                <div className="border-glow-element" style={{ '--glow-color': '#a855f7' }} />
                <div className="mouse-glow-bg" />
                <div className="animate-shine-sweep" />

                <div className="relative z-10 w-full">
                  <h3 className="text-base font-bold text-slate-800 border-b border-purple-100/30 pb-3 flex items-center gap-2">
                    <Utensils className="text-purple-650" size={18} />
                    <span>My Daily Food Logs</span>
                  </h3>
                  {foodMsg && (
                    <div className="mt-2 p-2 bg-emerald-50/50 text-emerald-800 text-xs font-semibold rounded-2xl border border-emerald-100 text-center shadow-sm">
                      {foodMsg}
                    </div>
                  )}
                  
                  <form onSubmit={handleFoodSubmit} className="mt-3 flex flex-col gap-2.5">
                    <div>
                      <label className="block text-[9px] font-black text-slate-400 uppercase tracking-wider mb-0.5">Breakfast</label>
                      <input 
                        type="text" 
                        value={breakfast}
                        onChange={(e) => setBreakfast(e.target.value)}
                        placeholder={todayFood?.breakfast || "e.g. Poha / Oats"}
                        className="w-full px-3 py-2 rounded-xl bg-white/60 border border-slate-200 focus:outline-none focus:border-purple-500 text-xs font-semibold text-slate-700 shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-black text-slate-400 uppercase tracking-wider mb-0.5">Lunch</label>
                      <input 
                        type="text" 
                        value={lunch}
                        onChange={(e) => setLunch(e.target.value)}
                        placeholder={todayFood?.lunch || "e.g. Rice, Dal & Salad"}
                        className="w-full px-3 py-2 rounded-xl bg-white/60 border border-slate-200 focus:outline-none focus:border-purple-500 text-xs font-semibold text-slate-700 shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-black text-slate-400 uppercase tracking-wider mb-0.5">Dinner</label>
                      <input 
                        type="text" 
                        value={dinner}
                        onChange={(e) => setDinner(e.target.value)}
                        placeholder={todayFood?.dinner || "e.g. Soup / Light Salad"}
                        className="w-full px-3 py-2 rounded-xl bg-white/60 border border-slate-200 focus:outline-none focus:border-purple-500 text-xs font-semibold text-slate-700 shadow-sm"
                      />
                    </div>
                    <button 
                      type="submit"
                      className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-extrabold text-xs rounded-xl shadow-sm mt-1"
                    >
                      Update Today's Meals
                    </button>
                  </form>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Chat with Helper/Family & Feedback */}
          <div className="space-y-8 lg:col-span-1">
            
            {/* Active Medicines Checklist */}
            <div 
              onMouseMove={(e) => handleCardMouseMove(e, 'meds')}
              onMouseLeave={() => handleCardMouseLeave('meds')}
              style={{
                ...tiltStyles.meds,
                boxShadow: '0 20px 40px rgba(124, 58, 237, 0.06)'
              }}
              className="group border-glow-wrapper card-3d relative rounded-3xl p-6 bg-purple-500/15 backdrop-blur-md border border-purple-400/25 hover:bg-purple-500/22 mouse-glow-container overflow-hidden premium-card-shadow"
            >
              <div className="border-glow-element" style={{ '--glow-color': '#a855f7' }} />
              <div className="mouse-glow-bg" />
              <div className="animate-shine-sweep" />

              <div className="relative z-10 w-full">
                <h3 className="text-sm font-black text-purple-900 uppercase tracking-widest border-b border-purple-100/30 pb-3 flex items-center gap-2">
                  <img src="/capsule.png" alt="capsule" className="w-5 h-5 object-contain" />
                  <span>Active Medicines</span>
                </h3>
                {patientMeds.length === 0 ? (
                  <p className="text-xs text-purple-750 py-6 text-center font-medium">No medicine schedule configured.</p>
                ) : (
                  <div className="mt-4 space-y-3">
                    {patientMeds.map(med => (
                      <div key={med.id} className="p-3.5 rounded-2xl bg-white/35 backdrop-blur-md border border-purple-100/30 text-xs text-purple-900 shadow-sm relative overflow-hidden group/item">
                        {/* Custom capsule image badge */}
                        <img src="/capsule.png" alt="capsule" className="absolute right-2 top-2.5 w-6 h-6 object-contain opacity-80 pointer-events-none group-hover/item:scale-110 transition-transform duration-300" />
                        <h4 className="font-extrabold text-base text-purple-950 pr-8 tracking-tight">{med.name}</h4>
                        <p className="text-[10px] text-purple-800/80 font-bold mt-0.5">Company: {med.company}</p>
                        <div className="mt-2.5 w-fit px-3 py-1 rounded-full bg-purple-100 text-purple-800 border border-purple-200/50 text-[10px] text-purple-900 font-black uppercase tracking-wider">
                          Schedule: {med.time}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Chat Panel with Helper */}
            <div 
              onMouseMove={(e) => handleCardMouseMove(e, 'chat')}
              onMouseLeave={() => handleCardMouseLeave('chat')}
              style={{
                ...tiltStyles.chat,
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.04)'
              }}
              className="group border-glow-wrapper card-3d relative rounded-3xl p-6 bg-white/8 opacity-95 backdrop-blur-md border border-purple-500/16 hover:bg-white/12 mouse-glow-container overflow-hidden flex flex-col justify-between h-[360px]"
            >
              <div className="border-glow-element" style={{ '--glow-color': '#a855f7' }} />
              <div className="mouse-glow-bg" />
              <div className="animate-shine-sweep" />

              <div className="relative z-10 w-full">
                <h3 className="text-base font-bold text-slate-800 border-b border-purple-100/30 pb-3 flex items-center gap-2">
                  <MessageSquare className="text-purple-600" size={18} />
                  <span>Chat with Care Provider</span>
                </h3>
                
                <div className="mt-3 space-y-2 h-[200px] overflow-y-auto pr-1 text-xs no-scrollbar">
                  {patientChats.length === 0 ? (
                    <p className="text-slate-400 py-12 text-center font-medium">No messages yet. Send a query below.</p>
                  ) : (
                    patientChats.map((chat, idx) => (
                      <div 
                        key={idx} 
                        className={`p-2.5 rounded-2xl max-w-[85%] shadow-sm ${
                          chat.sender === patient.id 
                            ? 'bg-purple-50/50 text-purple-800 ml-auto border border-purple-100/40' 
                            : 'bg-white/60 text-slate-800 border border-slate-200/50'
                        }`}
                      >
                        <span className="text-[8px] font-black text-slate-400 block mb-0.5 uppercase tracking-widest">{chat.senderName}</span>
                        <p className="font-semibold leading-relaxed">{chat.text}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <form onSubmit={handleSendChat} className="relative z-10 border-t border-purple-100/30 pt-3 mt-4 flex gap-1.5 w-full">
                <input 
                  type="text" 
                  value={chatText}
                  onChange={(e) => setChatText(e.target.value)}
                  placeholder={assignedHelper ? `Msg Helper ${assignedHelper.name}...` : "Send message..."}
                  className="flex-1 px-3 py-2 rounded-xl bg-white/60 border border-slate-200 focus:outline-none focus:border-purple-500 text-xs font-semibold text-slate-700 shadow-sm"
                />
                <button 
                  type="submit" 
                  className="p-2.5 bg-gradient-to-tr from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white rounded-xl transition-all shadow-md shadow-purple-500/10 flex items-center justify-center"
                >
                  <Send size={12} />
                </button>
              </form>
            </div>

            {/* Feedback Form */}
            <div 
              onMouseMove={(e) => handleCardMouseMove(e, 'feedback')}
              onMouseLeave={() => handleCardMouseLeave('feedback')}
              style={{
                ...tiltStyles.feedback,
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.04)'
              }}
              className="group border-glow-wrapper card-3d relative rounded-3xl p-6 bg-white/8 opacity-95 backdrop-blur-md border border-purple-500/16 hover:bg-white/12 mouse-glow-container overflow-hidden"
            >
              <div className="border-glow-element" style={{ '--glow-color': '#a855f7' }} />
              <div className="mouse-glow-bg" />
              <div className="animate-shine-sweep" />

              <div className="relative z-10 w-full">
                <h3 className="text-base font-bold text-slate-800 border-b border-purple-100/30 pb-3 flex items-center gap-2">
                  <MessageSquare className="text-purple-650" size={18} />
                  <span>Feedback / Complaint</span>
                </h3>

                {feedbackMsg && (
                  <div className="mt-2.5 p-2 bg-emerald-50/50 text-emerald-800 text-xs font-semibold rounded-2xl border border-emerald-100 text-center shadow-sm">
                    {feedbackMsg}
                  </div>
                )}

                <form onSubmit={handleFeedbackSubmit} className="mt-4 flex flex-col gap-3">
                  <textarea 
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder="Write feedback/complaints for administrators..."
                    className="w-full px-3 py-2 rounded-xl bg-white/60 border border-slate-200 focus:border-purple-500 focus:outline-none text-slate-700 text-xs font-semibold min-h-[80px] shadow-sm"
                    required
                  />
                  <button 
                    type="submit"
                    className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-extrabold text-xs rounded-xl shadow-sm transition-all"
                  >
                    Submit Feedback
                  </button>
                </form>
              </div>
            </div>

          </div>

        </div>

        {/* ================= BOTTOM REFLECTION WELLNESS CARD ================= */}
        <div className="relative overflow-hidden rounded-[32px] bg-white/20 backdrop-blur-md border border-purple-100/30 p-8 md:p-12 text-center shadow-[0_20px_45px_rgba(0,0,0,0.03)] max-w-5xl mx-auto flex flex-col items-center justify-center group">
          {/* Mirror shine sweep reflection */}
          <div className="animate-shine-sweep" />

          {/* Eucalyptus Branch Left */}
          <div className="absolute left-[-20px] bottom-[-20px] opacity-[0.06] text-purple-800 rotate-45 pointer-events-none select-none">
            <svg width="220" height="220" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17,8C8,10 5.9,16.17 3.82,21.34L2.18,20.66C4.26,15.49 6.34,9 15.67,7C12.5,5 9,5 5,7L4,5C9,3 13,3 17,5C20,3.7 22.3,4.3 22.3,4.3C22.3,4.3 21.7,7 17,8Z" />
            </svg>
          </div>

          <div className="relative w-28 h-20 mb-4 flex items-center justify-center text-purple-600/20 pointer-events-none">
            {/* Golden Sparkles floating */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles size={48} className="text-yellow-400/40 animate-pulse absolute" />
            </div>
            <svg width="84" height="84" viewBox="0 0 24 24" fill="currentColor" className="relative z-10">
              <path d="M12,2C12,2 6,8 6,12C6,15.31 8.69,18 12,18C15.31,18 18,15.31 18,12C18,8 12,2 12,2Z" />
            </svg>
          </div>

          <p className="text-sm font-black text-purple-800 uppercase tracking-widest mb-2">
            Daily Reflection
          </p>
          
          <h3 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight max-w-2xl leading-relaxed">
            "Your health is your greatest wealth. <br />
            <span className="text-purple-750">We are here to support and walk beside you.</span>"
          </h3>
          
          <p className="text-xs text-slate-400 mt-3 font-semibold">
            Health Care Network | Caring Partnerships & Elderly Wellness
          </p>
        </div>

      </div>
    </div>
  );
};

export default OldPersonDashboard;
