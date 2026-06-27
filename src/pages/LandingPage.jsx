import React, { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { ShieldCheck, Heart, HelpingHand, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const LandingPage = () => {
  const navigate = useNavigate();
  const { activeUser } = useContext(AppContext);

  React.useEffect(() => {
    if (activeUser) {
      if (activeUser.role === 'Admin') navigate('/admin/dashboard');
      if (activeUser.role === 'Helper') navigate('/helper/dashboard');
      if (activeUser.role === 'Old Person') navigate('/old-person/dashboard');
    }
  }, [activeUser, navigate]);

  // Handle mouse position inside cards for radial reflection light
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  // Generate 15 static floating background particles
  const bgParticles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: `${(i * 7) + 5}%`,
    delay: `${-(i * 1.5)}s`,
    duration: `${15 + (i % 3) * 5}s`,
    size: `${(i % 3) + 2}px`
  }));

  return (
    <div className="min-h-screen bg-[#0b1220] flex flex-col justify-between text-slate-100 relative overflow-hidden select-none">
      
      {/* 1. Animated Particle Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {bgParticles.map(p => (
          <div 
            key={p.id}
            className="bg-particle"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              '--delay': p.delay,
              '--duration': p.duration
            }}
          />
        ))}
      </div>

      {/* 2. Background Neon Glow Spots (Slow Moving) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[15%] w-[450px] h-[450px] rounded-full bg-purple-900/10 blur-[110px] animate-light-move" />
        <div className="absolute bottom-[20%] right-[15%] w-[450px] h-[450px] rounded-full bg-teal-900/10 blur-[110px] animate-light-move" style={{ animationDelay: '-7s' }} />
      </div>

      {/* 3. Smooth Animated Vector Waves (behind the hero section) */}
      <div className="absolute inset-x-0 top-[10%] h-[55%] z-0 pointer-events-none overflow-hidden opacity-[0.25]">
        <svg className="absolute w-full h-full" viewBox="0 0 1440 400" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            fill="none"
            stroke="url(#grid-gradient-1)"
            strokeWidth="1.5"
            d="M0,192 Q360,110 720,240 T1440,160"
            className="animate-wave-slow"
          />
          <path 
            fill="none"
            stroke="url(#grid-gradient-2)"
            strokeWidth="1"
            d="M0,120 Q360,260 720,130 T1440,210"
            className="animate-wave-medium"
          />
          <defs>
            <linearGradient id="grid-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#ec4899" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="grid-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>
      </div>

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
        {/* Soft Radial Glow behind Heading */}
        <div className="absolute w-[600px] h-[350px] rounded-full bg-gradient-to-tr from-purple-500/5 to-cyan-500/5 blur-[100px] pointer-events-none z-0 top-[20%] left-1/2 -translate-x-1/2" />

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
          
          {/* Admin Card */}
          <div 
            onClick={() => navigate('/admin/login')}
            onMouseMove={handleMouseMove}
            style={{ '--glow-color': '#a855f7' }}
            className="group cursor-pointer border-glow-wrapper relative rounded-2xl p-8 glass-card-premium hover:bg-slate-950/30 flex flex-col items-center hover:-translate-y-2 overflow-hidden mouse-glow-container shadow-[0_15px_30px_-20px_rgba(168,85,247,0.1)] hover:shadow-[0_25px_45px_-10px_rgba(168,85,247,0.25)]"
          >
            {/* Moving Gradient Border */}
            <div className="border-glow-element" />

            {/* Mouse-follow glow background */}
            <div className="mouse-glow-bg" />

            {/* Internal scanline line glow */}
            <div className="animate-line-glow text-purple-500 top-1/3" />

            {/* Glowing bottom accent line */}
            <div className="absolute bottom-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-purple-500/80 to-transparent opacity-20 group-hover:opacity-100 transition-opacity blur-[1px] z-10" />

            {/* Icon & Orbit Ring */}
            <div className="relative w-24 h-24 flex items-center justify-center mb-6">
              {/* Planetary Orbit Ring */}
              <div className="absolute w-[120%] h-[30%] transform rotate-[-25deg] pointer-events-none">
                <div className="w-full h-full border-2 border-purple-500/20 rounded-full shadow-[0_0_12px_rgba(168,85,247,0.2)] group-hover:border-purple-500/50 transition-all duration-500 animate-orbit-spin" />
              </div>
              {/* Core Icon with float pulse */}
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-purple-950 to-purple-800 border-2 border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:text-white transition-all duration-500 relative z-10 premium-glow-purple animate-float-pulse logo-blink-hover">
                <ShieldCheck size={24} />
              </div>
            </div>

            <h3 className="font-extrabold text-lg mb-2 text-slate-100 group-hover:text-purple-450 transition-colors z-10">Admin Portal</h3>
            <p className="text-slate-400 text-xs leading-relaxed max-w-[240px] mb-8 font-medium z-10">
              Manage helpers, register elder patients, configure medicine schedules, and review audit logs.
            </p>
            
            {/* Animated Hover Arrow */}
            <div className="mt-auto flex items-center gap-1 text-purple-400 text-xs font-bold opacity-45 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all duration-300 z-10">
              <span>Access Access</span>
              <ArrowRight size={14} />
            </div>
          </div>

          {/* Helper Card */}
          <div 
            onClick={() => navigate('/helper/login')}
            onMouseMove={handleMouseMove}
            style={{ '--glow-color': '#14b8a6' }}
            className="group cursor-pointer border-glow-wrapper relative rounded-2xl p-8 glass-card-premium hover:bg-slate-950/30 flex flex-col items-center hover:-translate-y-2 overflow-hidden mouse-glow-container shadow-[0_15px_30px_-20px_rgba(20,184,166,0.1)] hover:shadow-[0_25px_45px_-10px_rgba(20,184,166,0.25)]"
          >
            {/* Moving Gradient Border */}
            <div className="border-glow-element" />

            {/* Mouse-follow glow background */}
            <div className="mouse-glow-bg" />

            {/* Internal scanline line glow */}
            <div className="animate-line-glow text-teal-500 top-1/2" />

            {/* Glowing bottom accent line */}
            <div className="absolute bottom-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-teal-500/80 to-transparent opacity-20 group-hover:opacity-100 transition-opacity blur-[1px] z-10" />

            {/* Icon & Orbit Ring */}
            <div className="relative w-24 h-24 flex items-center justify-center mb-6">
              {/* Planetary Orbit Ring */}
              <div className="absolute w-[120%] h-[30%] transform rotate-[-25deg] pointer-events-none">
                <div className="w-full h-full border-2 border-teal-500/20 rounded-full shadow-[0_0_12px_rgba(20,184,166,0.2)] group-hover:border-teal-500/50 transition-all duration-500 animate-orbit-spin" />
              </div>
              {/* Core Icon with float pulse */}
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-teal-950 to-teal-800 border-2 border-teal-500/30 flex items-center justify-center text-teal-400 group-hover:text-white transition-all duration-500 relative z-10 premium-glow-teal animate-float-pulse logo-blink-hover">
                <HelpingHand size={24} />
              </div>
            </div>

            <h3 className="font-extrabold text-lg mb-2 text-slate-100 group-hover:text-teal-450 transition-colors z-10">Helper Portal</h3>
            <p className="text-slate-400 text-xs leading-relaxed max-w-[240px] mb-8 font-medium z-10">
              Check-in for shifts, track daily checklists, log elder vitals (BP, sugar), and manage leave availability.
            </p>
            
            {/* Animated Hover Arrow */}
            <div className="mt-auto flex items-center gap-1 text-teal-400 text-xs font-bold opacity-45 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all duration-300 z-10">
              <span>Access Access</span>
              <ArrowRight size={14} />
            </div>
          </div>

          {/* Elder Card */}
          <div 
            onClick={() => navigate('/old-person/login')}
            onMouseMove={handleMouseMove}
            style={{ '--glow-color': '#ec4899' }}
            className="group cursor-pointer border-glow-wrapper relative rounded-2xl p-8 glass-card-premium hover:bg-slate-950/30 flex flex-col items-center hover:-translate-y-2 overflow-hidden mouse-glow-container shadow-[0_15px_30px_-20px_rgba(236,72,153,0.1)] hover:shadow-[0_25px_45px_-10px_rgba(236,72,153,0.25)]"
          >
            {/* Moving Gradient Border */}
            <div className="border-glow-element" />

            {/* Mouse-follow glow background */}
            <div className="mouse-glow-bg" />

            {/* Internal scanline line glow */}
            <div className="animate-line-glow text-pink-500 top-2/3" />

            {/* Glowing bottom accent line */}
            <div className="absolute bottom-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-pink-500/80 to-transparent opacity-20 group-hover:opacity-100 transition-opacity blur-[1px] z-10" />

            {/* Icon & Orbit Ring */}
            <div className="relative w-24 h-24 flex items-center justify-center mb-6">
              {/* Planetary Orbit Ring */}
              <div className="absolute w-[120%] h-[30%] transform rotate-[-25deg] pointer-events-none">
                <div className="w-full h-full border-2 border-pink-500/20 rounded-full shadow-[0_0_12px_rgba(236,72,153,0.2)] group-hover:border-pink-500/50 transition-all duration-500 animate-orbit-spin" />
              </div>
              {/* Core Icon with float pulse */}
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-pink-950 to-pink-800 border-2 border-pink-500/30 flex items-center justify-center text-pink-400 group-hover:text-white transition-all duration-500 relative z-10 premium-glow-pink animate-float-pulse logo-blink-hover">
                <Heart size={24} />
              </div>
            </div>

            <h3 className="font-extrabold text-lg mb-2 text-slate-100 group-hover:text-pink-450 transition-colors z-10">Elder Portal</h3>
            <p className="text-slate-400 text-xs leading-relaxed max-w-[240px] mb-8 font-medium z-10">
              View health charts, schedule appointments, chat with assigned helpers, and access emergency SOS services.
            </p>
            
            {/* Animated Hover Arrow */}
            <div className="mt-auto flex items-center gap-1 text-pink-400 text-xs font-bold opacity-45 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all duration-300 z-10">
              <span>Access Access</span>
              <ArrowRight size={14} />
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
