import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { ShieldCheck, Heart, HelpingHand, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const LandingPage = () => {
  const navigate = useNavigate();
  const { activeUser } = useContext(AppContext);

  // Parallax state based on mouse coordinates for page background
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // 3D Tilt state for the three cards
  const [tiltStyles, setTiltStyles] = useState({
    admin: {},
    helper: {},
    elder: {}
  });

  // Ripple state for clicking animation
  const [ripples, setRipples] = useState({
    admin: null,
    helper: null,
    elder: null
  });

  useEffect(() => {
    if (activeUser) {
      if (activeUser.role === 'Admin') navigate('/admin/dashboard');
      if (activeUser.role === 'Helper') navigate('/helper/dashboard');
      if (activeUser.role === 'Old Person') navigate('/old-person/dashboard');
    }
  }, [activeUser, navigate]);

  // Global mouse move listener for parallax background layers
  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (e.clientY - innerHeight / 2) / (innerHeight / 2);
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, []);

  // Card Mouse Move Handler (Mouse Tilt & Follow Glow)
  const handleCardMouseMove = (e, key) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Relative position from center: range [-1, 1]
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const dx = (x - xc) / xc;
    const dy = (y - yc) / yc;

    // Tilt angles (max 8 degrees for premium restraint)
    const tiltX = -dy * 8;
    const tiltY = dx * 8;

    setTiltStyles(prev => ({
      ...prev,
      [key]: {
        transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-8px)`,
        '--mouse-x': `${x}px`,
        '--mouse-y': `${y}px`,
        transition: 'transform 0.05s ease-out'
      }
    }));
  };

  // Card Mouse Leave (Reset Tilt)
  const handleCardMouseLeave = (key) => {
    setTiltStyles(prev => ({
      ...prev,
      [key]: {
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
        transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
      }
    }));
  };

  // Card Click Handler (Triggers Ripple + Navigates)
  const handleCardClick = (e, key, route) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setRipples(prev => ({
      ...prev,
      [key]: { x, y }
    }));

    // Wait for ripple animation to complete before route navigation
    setTimeout(() => {
      setRipples(prev => ({
        ...prev,
        [key]: null
      }));
      navigate(route);
    }, 450);
  };

  // Generate 25 premium floating background particles
  const particles = Array.from({ length: 25 }, (_, i) => {
    const isPlus = i % 3 === 0;
    return {
      id: i,
      char: isPlus ? '+' : '•',
      size: isPlus ? '14px' : '4px',
      color: isPlus ? 'text-teal-500/20' : 'text-purple-400/35',
      left: `${(i * 4) + 2}%`,
      delay: `${-(i * 1.8)}s`,
      duration: `${18 + (i % 4) * 4}s`,
      maxOpacity: isPlus ? 0.15 : 0.45
    };
  });

  return (
    <div className="min-h-screen bg-[#0b1220] flex flex-col justify-between text-slate-100 relative overflow-hidden select-none">
      
      {/* ================= BACKGROUND LAYERS (PARALLAX & GLOWS) ================= */}
      
      {/* 1. Deep Mesh Gradient Blobs */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: `translate(${mousePos.x * 25}px, ${mousePos.y * 20}px)`
        }}
      >
        <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full bg-purple-900/10 blur-[130px] animate-light-move" />
        <div className="absolute bottom-[10%] right-[5%] w-[550px] h-[550px] rounded-full bg-teal-950/15 blur-[140px] animate-light-move" style={{ animationDelay: '-8s' }} />
        <div className="absolute top-[35%] left-[30%] w-[350px] h-[350px] rounded-full bg-blue-900/5 blur-[100px] animate-light-move" style={{ animationDelay: '-15s' }} />
      </div>

      {/* 2. Soft Animated Light Beams */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none transition-transform duration-700 ease-out opacity-40"
        style={{
          transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 10}px)`
        }}
      >
        <div className="absolute top-[-10%] left-[25%] w-[80px] h-[120%] bg-gradient-to-b from-purple-500/5 via-transparent to-transparent transform rotate-[-20deg] blur-lg animate-beam-glow" />
        <div className="absolute top-[-10%] right-[30%] w-[120%] h-[120%] bg-gradient-to-b from-teal-500/5 via-transparent to-transparent transform rotate-[-20deg] blur-lg animate-beam-glow" style={{ animationDelay: '-5s' }} />
      </div>

      {/* 3. Floating Medical Particles & Tiny Stars */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none transition-transform duration-1000 ease-out"
        style={{
          transform: `translate(${mousePos.x * 35}px, ${mousePos.y * 30}px)`
        }}
      >
        {particles.map(p => (
          <div 
            key={p.id}
            className={`bg-particle font-bold select-none ${p.color}`}
            style={{
              left: p.left,
              fontSize: p.size,
              '--delay': p.delay,
              '--duration': p.duration,
              '--max-opacity': p.maxOpacity
            }}
          >
            {p.char}
          </div>
        ))}
      </div>

      {/* 4. Smooth Animated SVG Wave Mesh */}
      <div 
        className="absolute inset-x-0 bottom-0 h-[48%] z-0 pointer-events-none overflow-hidden opacity-[0.25] transition-transform duration-700 ease-out select-none"
        style={{
          transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -8}px)`
        }}
      >
        <svg className="absolute w-full h-full bottom-0 left-0" viewBox="0 0 1440 320" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            fill="url(#wave-gradient-1)" 
            d="M0,192L48,197.3C96,203,192,213,288,192C384,171,480,117,576,128C672,139,768,213,864,229.3C960,245,1056,203,1152,176C1248,149,1344,139,1392,133.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            className="animate-wave-slow"
          ></path>
          <path 
            fill="url(#wave-gradient-2)" 
            d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,224C672,213,768,171,864,144C960,117,1056,107,1152,122.7C1248,139,1344,181,1392,202.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            className="animate-wave-medium"
          ></path>
          <defs>
            <linearGradient id="wave-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#c084fc" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#f472b6" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0.85" />
            </linearGradient>
            <linearGradient id="wave-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.75" />
              <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#c084fc" stopOpacity="0.75" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Grid Mesh Background lines */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />

      {/* Navigation Header */}
      <header className="px-8 py-5 flex items-center justify-between border-b border-white/5 backdrop-blur-md bg-slate-950/10 z-10">
        <div className="flex items-center gap-2">
          <Heart className="text-pink-500 fill-pink-500 animate-pulse" size={18} />
          <span className="font-extrabold text-sm tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-500">
            HEALTH CARE NETWORK
          </span>
        </div>
        <div className="text-[10px] uppercase font-bold tracking-widest text-slate-500">v2.0 Stable</div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-6 py-16 flex flex-col items-center justify-center flex-1 text-center z-10 relative">
        
        {/* Soft Radial Glow behind Main Heading */}
        <div className="absolute w-[580px] h-[340px] rounded-full bg-gradient-to-tr from-purple-500/5 to-cyan-500/5 blur-[100px] pointer-events-none z-0 top-[20%] left-1/2 -translate-x-1/2" />

        {/* Hero Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4 leading-tight relative z-10"
        >
          Empowering Care, <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-400">
            Nurturing Elder Lives
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="text-slate-400 text-sm md:text-base max-w-xl mb-14 leading-relaxed font-medium relative z-10"
        >
          A centralized, real-time collaboration network connecting Administrators, dedicated Care Helpers, and Elders for seamless medical tracking and urgent assistance.
        </motion.p>

        {/* Cards Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl px-4 relative z-10"
        >
          
          {/* Admin Card (Blue Accent) */}
          <div 
            onClick={(e) => handleCardClick(e, 'admin', '/admin/login')}
            onMouseMove={(e) => handleCardMouseMove(e, 'admin')}
            onMouseLeave={() => handleCardMouseLeave('admin')}
            style={{ 
              '--glow-color': '#3b82f6',
              ...tiltStyles.admin 
            }}
            className="group cursor-pointer border-glow-wrapper card-3d relative rounded-2xl p-8 glass-card-premium hover:bg-slate-950/30 flex flex-col items-center overflow-hidden mouse-glow-container shadow-[0_15px_30px_-20px_rgba(59,130,246,0.1)] hover:shadow-[0_25px_45px_-10px_rgba(59,130,246,0.3)] transition-shadow duration-300"
          >
            {/* Click Ripple Wave */}
            {ripples.admin && (
              <span 
                className="ripple-wave" 
                style={{ left: ripples.admin.x, top: ripples.admin.y }} 
              />
            )}

            {/* Moving Gradient Border */}
            <div className="border-glow-element" />

            {/* Mouse-follow glow background */}
            <div className="mouse-glow-bg" />

            {/* Floating particles inside the card */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-[0.15]">
              <div className="bg-particle text-blue-500/20 font-bold" style={{ left: '15%', top: '25%', '--duration': '7s', '--delay': '0s' }}>•</div>
              <div className="bg-particle text-blue-400/25 font-bold" style={{ left: '80%', top: '45%', '--duration': '9s', '--delay': '-2.5s' }}>•</div>
              <div className="bg-particle text-blue-500/20 font-bold" style={{ left: '35%', top: '75%', '--duration': '8s', '--delay': '-5s' }}>•</div>
            </div>

            {/* Internal scanline line glow */}
            <div className="animate-line-glow text-blue-500 top-1/3" />

            {/* Glowing bottom accent line */}
            <div className="absolute bottom-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-20 group-hover:opacity-100 transition-opacity blur-[1px] z-10" />

            {/* Icon & Orbit Ring */}
            <div className="relative w-24 h-24 flex items-center justify-center mb-6">
              {/* Planetary Orbit Ring */}
              <div className="absolute w-[120%] h-[30%] transform rotate-[-25deg] pointer-events-none">
                <div className="w-full h-full border-2 border-blue-500/20 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.2)] group-hover:border-blue-500/50 transition-all duration-500 animate-orbit-spin" />
              </div>
              {/* Core Icon with float pulse */}
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-950 to-blue-800 border-2 border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:text-white transition-all duration-500 relative z-10 premium-glow-blue animate-float-pulse logo-blink-hover">
                <ShieldCheck size={24} />
              </div>
            </div>

            <h3 className="font-extrabold text-lg mb-2 text-slate-100 group-hover:text-blue-400 transition-colors z-10">Admin Portal</h3>
            <p className="text-slate-400 text-xs leading-relaxed max-w-[240px] mb-8 font-medium z-10">
              Manage helpers, register elder patients, configure medicine schedules, and review audit logs.
            </p>
            
            {/* Animated Hover Arrow */}
            <div className="mt-auto flex items-center gap-1.5 text-blue-400 text-xs font-bold z-10">
              <span>Access Portal</span>
              <ArrowRight size={14} className="transform translate-x-[-6px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-out" />
            </div>
          </div>

          {/* Helper Card (Emerald Green Accent) */}
          <div 
            onClick={(e) => handleCardClick(e, 'helper', '/helper/login')}
            onMouseMove={(e) => handleCardMouseMove(e, 'helper')}
            onMouseLeave={() => handleCardMouseLeave('helper')}
            style={{ 
              '--glow-color': '#10b981',
              ...tiltStyles.helper 
            }}
            className="group cursor-pointer border-glow-wrapper card-3d relative rounded-2xl p-8 glass-card-premium hover:bg-slate-950/30 flex flex-col items-center overflow-hidden mouse-glow-container shadow-[0_15px_30px_-20px_rgba(16,185,129,0.1)] hover:shadow-[0_25px_45px_-10px_rgba(16,185,129,0.3)] transition-shadow duration-300"
          >
            {/* Click Ripple Wave */}
            {ripples.helper && (
              <span 
                className="ripple-wave" 
                style={{ left: ripples.helper.x, top: ripples.helper.y }} 
              />
            )}

            {/* Moving Gradient Border */}
            <div className="border-glow-element" />

            {/* Mouse-follow glow background */}
            <div className="mouse-glow-bg" />

            {/* Floating particles inside the card */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-[0.15]">
              <div className="bg-particle text-emerald-500/20 font-bold" style={{ left: '15%', top: '25%', '--duration': '7s', '--delay': '0s' }}>•</div>
              <div className="bg-particle text-emerald-455/25 font-bold" style={{ left: '80%', top: '45%', '--duration': '9s', '--delay': '-2.5s' }}>•</div>
              <div className="bg-particle text-emerald-500/20 font-bold" style={{ left: '35%', top: '75%', '--duration': '8s', '--delay': '-5s' }}>•</div>
            </div>

            {/* Internal scanline line glow */}
            <div className="animate-line-glow text-emerald-500 top-1/2" />

            {/* Glowing bottom accent line */}
            <div className="absolute bottom-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-20 group-hover:opacity-100 transition-opacity blur-[1px] z-10" />

            {/* Icon & Orbit Ring */}
            <div className="relative w-24 h-24 flex items-center justify-center mb-6">
              {/* Planetary Orbit Ring */}
              <div className="absolute w-[120%] h-[30%] transform rotate-[-25deg] pointer-events-none">
                <div className="w-full h-full border-2 border-emerald-500/20 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.2)] group-hover:border-emerald-500/50 transition-all duration-500 animate-orbit-spin" />
              </div>
              {/* Core Icon with float pulse */}
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-950 to-emerald-800 border-2 border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:text-white transition-all duration-500 relative z-10 premium-glow-emerald animate-float-pulse logo-blink-hover">
                <HelpingHand size={24} />
              </div>
            </div>

            <h3 className="font-extrabold text-lg mb-2 text-slate-100 group-hover:text-emerald-400 transition-colors z-10">Helper Portal</h3>
            <p className="text-slate-400 text-xs leading-relaxed max-w-[240px] mb-8 font-medium z-10">
              Check-in for shifts, track daily checklists, log elder vitals (BP, sugar), and manage leave availability.
            </p>
            
            {/* Animated Hover Arrow */}
            <div className="mt-auto flex items-center gap-1.5 text-emerald-400 text-xs font-bold z-10">
              <span>Access Portal</span>
              <ArrowRight size={14} className="transform translate-x-[-6px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-out" />
            </div>
          </div>

          {/* Elder Card (Purple Accent) */}
          <div 
            onClick={(e) => handleCardClick(e, 'elder', '/old-person/login')}
            onMouseMove={(e) => handleCardMouseMove(e, 'elder')}
            onMouseLeave={() => handleCardMouseLeave('elder')}
            style={{ 
              '--glow-color': '#a855f7',
              ...tiltStyles.elder 
            }}
            className="group cursor-pointer border-glow-wrapper card-3d relative rounded-2xl p-8 glass-card-premium hover:bg-slate-950/30 flex flex-col items-center overflow-hidden mouse-glow-container shadow-[0_15px_30px_-20px_rgba(168,85,247,0.1)] hover:shadow-[0_25px_45px_-10px_rgba(168,85,247,0.3)] transition-shadow duration-300"
          >
            {/* Click Ripple Wave */}
            {ripples.elder && (
              <span 
                className="ripple-wave" 
                style={{ left: ripples.elder.x, top: ripples.elder.y }} 
              />
            )}

            {/* Moving Gradient Border */}
            <div className="border-glow-element" />

            {/* Mouse-follow glow background */}
            <div className="mouse-glow-bg" />

            {/* Floating particles inside the card */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-[0.15]">
              <div className="bg-particle text-purple-500/20 font-bold" style={{ left: '15%', top: '25%', '--duration': '7s', '--delay': '0s' }}>•</div>
              <div className="bg-particle text-purple-400/25 font-bold" style={{ left: '80%', top: '45%', '--duration': '9s', '--delay': '-2.5s' }}>•</div>
              <div className="bg-particle text-purple-500/20 font-bold" style={{ left: '35%', top: '75%', '--duration': '8s', '--delay': '-5s' }}>•</div>
            </div>

            {/* Internal scanline line glow */}
            <div className="animate-line-glow text-purple-500 top-2/3" />

            {/* Glowing bottom accent line */}
            <div className="absolute bottom-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-20 group-hover:opacity-100 transition-opacity blur-[1px] z-10" />

            {/* Icon & Orbit Ring */}
            <div className="relative w-24 h-24 flex items-center justify-center mb-6">
              {/* Planetary Orbit Ring */}
              <div className="absolute w-[120%] h-[30%] transform rotate-[-25deg] pointer-events-none">
                <div className="w-full h-full border-2 border-purple-500/20 rounded-full shadow-[0_0_12px_rgba(168,85,247,0.2)] group-hover:border-purple-500/50 transition-all duration-500 animate-orbit-spin" />
              </div>
              {/* Core Icon with float pulse */}
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-purple-950 to-purple-800 border-2 border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:text-white transition-all duration-500 relative z-10 premium-glow-purple animate-float-pulse logo-blink-hover">
                <Heart size={24} />
              </div>
            </div>

            <h3 className="font-extrabold text-lg mb-2 text-slate-100 group-hover:text-purple-450 transition-colors z-10">Elder Portal</h3>
            <p className="text-slate-400 text-xs leading-relaxed max-w-[240px] mb-8 font-medium z-10">
              View health charts, schedule appointments, chat with assigned helpers, and access emergency SOS services.
            </p>
            
            {/* Animated Hover Arrow */}
            <div className="mt-auto flex items-center gap-1.5 text-purple-400 text-xs font-bold z-10">
              <span>Access Portal</span>
              <ArrowRight size={14} className="transform translate-x-[-6px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-out" />
            </div>
          </div>

      </motion.div>
    </main>

    {/* Footer Section */}
    <footer className="py-8 border-t border-white/5 text-center text-xs text-slate-500 z-10 bg-slate-950/20">
      &copy; {new Date().getFullYear()} Health Care Network. All rights reserved. Designed for elder support and care excellence.
    </footer>
  </div>
  );
};

export default LandingPage;
