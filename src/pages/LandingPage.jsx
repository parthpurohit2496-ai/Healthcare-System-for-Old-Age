import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { ShieldCheck, Heart, HelpingHand, ArrowRight } from 'lucide-react';

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

  return (
    <div className="min-h-screen bg-[#030712] flex flex-col justify-between text-white relative overflow-hidden select-none">
      {/* Background gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-900/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-teal-950/10 blur-[120px] pointer-events-none" />
      
      {/* Background waves/grid pattern mock with CSS */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Header */}
      <header className="px-8 py-6 flex items-center justify-between border-b border-slate-900 backdrop-blur-md bg-slate-950/20 z-10">
        <div className="flex items-center gap-2">
          <Heart className="text-pink-500 fill-pink-500 animate-pulse" size={20} />
          <span className="font-extrabold text-sm tracking-widest text-pink-500">
            HEALTH CARE NETWORK
          </span>
        </div>
        <div className="text-xs font-semibold text-slate-500">Healthcare Portal v2.0</div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12 flex flex-col items-center justify-center flex-1 text-center z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
          Empowering Care, <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 animate-pulse">
            Nurturing Elder Lives
          </span>
        </h1>
        <p className="text-slate-400 text-sm md:text-base max-w-xl mb-12 leading-relaxed font-medium">
          A centralized, real-time collaboration network connecting Administrators, dedicated Care Helpers, and Elders for seamless medical tracking and urgent assistance.
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl px-4">
          
          {/* Admin Card */}
          <div 
            onClick={() => navigate('/admin/login')}
            className="group cursor-pointer relative rounded-2xl p-8 bg-slate-950/40 border border-purple-500/20 backdrop-blur-md hover:border-purple-500/50 hover:bg-slate-950/60 transition-all duration-500 flex flex-col items-center hover:-translate-y-2 shadow-[0_10px_35px_-15px_rgba(168,85,247,0.15)] hover:shadow-[0_20px_40px_-10px_rgba(168,85,247,0.3)] overflow-hidden animate-card-float mirror-shine"
            style={{ animationDelay: '0s' }}
          >
            {/* Glowing bottom strip */}
            <div className="absolute bottom-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30 group-hover:opacity-100 transition-opacity blur-[1px]" />
            
            {/* Icon & Orbit Container */}
            <div className="relative w-24 h-24 flex items-center justify-center mb-6">
              {/* Orbit Ring */}
              <div className="absolute w-[120%] h-[30%] border border-purple-500/30 rounded-full transform rotate-[-25deg] shadow-[0_0_8px_rgba(168,85,247,0.1)] group-hover:border-purple-500/60 transition-all duration-500" />
              {/* Core Icon */}
              <div className="w-14 h-14 rounded-full bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:text-purple-355 group-hover:scale-110 transition-all duration-500 relative z-10 shadow-[0_0_15px_rgba(168,85,247,0.2)] logo-blink-hover">
                <ShieldCheck size={24} />
              </div>
            </div>

            <h3 className="font-extrabold text-lg mb-2 text-slate-100 group-hover:text-purple-400 transition-colors">Admin Portal</h3>
            <p className="text-slate-400 text-xs leading-relaxed max-w-[240px] mb-8 font-medium">
              Manage helpers, register elder patients, configure medicine schedules, and review audit logs.
            </p>
            <div className="mt-auto text-purple-400 group-hover:translate-x-1.5 transition-transform duration-300">
              <ArrowRight size={18} />
            </div>
          </div>

          {/* Helper Card */}
          <div 
            onClick={() => navigate('/helper/login')}
            className="group cursor-pointer relative rounded-2xl p-8 bg-slate-950/40 border border-teal-500/20 backdrop-blur-md hover:border-teal-500/50 hover:bg-slate-950/60 transition-all duration-500 flex flex-col items-center hover:-translate-y-2 shadow-[0_10px_35px_-15px_rgba(20,184,166,0.15)] hover:shadow-[0_20px_40px_-10px_rgba(20,184,166,0.3)] overflow-hidden animate-card-float mirror-shine"
            style={{ animationDelay: '0.2s' }}
          >
            {/* Glowing bottom strip */}
            <div className="absolute bottom-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-teal-500 to-transparent opacity-30 group-hover:opacity-100 transition-opacity blur-[1px]" />
            
            {/* Icon & Orbit Container */}
            <div className="relative w-24 h-24 flex items-center justify-center mb-6">
              {/* Orbit Ring */}
              <div className="absolute w-[120%] h-[30%] border border-teal-500/30 rounded-full transform rotate-[-25deg] shadow-[0_0_8px_rgba(20,184,166,0.1)] group-hover:border-teal-500/60 transition-all duration-500" />
              {/* Core Icon */}
              <div className="w-14 h-14 rounded-full bg-teal-950/60 border border-teal-500/30 flex items-center justify-center text-teal-400 group-hover:text-teal-355 group-hover:scale-110 transition-all duration-500 relative z-10 shadow-[0_0_15px_rgba(20,184,166,0.2)] logo-blink-hover">
                <HelpingHand size={24} />
              </div>
            </div>

            <h3 className="font-extrabold text-lg mb-2 text-slate-100 group-hover:text-teal-400 transition-colors">Helper Portal</h3>
            <p className="text-slate-400 text-xs leading-relaxed max-w-[240px] mb-8 font-medium">
              Check-in for shifts, track daily checklists, log elder vitals (BP, sugar), and manage leave availability.
            </p>
            <div className="mt-auto text-teal-400 group-hover:translate-x-1.5 transition-transform duration-300">
              <ArrowRight size={18} />
            </div>
          </div>

          {/* Elder Card */}
          <div 
            onClick={() => navigate('/old-person/login')}
            className="group cursor-pointer relative rounded-2xl p-8 bg-slate-950/40 border border-pink-500/20 backdrop-blur-md hover:border-pink-500/50 hover:bg-slate-950/60 transition-all duration-500 flex flex-col items-center hover:-translate-y-2 shadow-[0_10px_35px_-15px_rgba(236,72,153,0.15)] hover:shadow-[0_20px_40px_-10px_rgba(236,72,153,0.3)] overflow-hidden animate-card-float mirror-shine"
            style={{ animationDelay: '0.4s' }}
          >
            {/* Glowing bottom strip */}
            <div className="absolute bottom-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-30 group-hover:opacity-100 transition-opacity blur-[1px]" />
            
            {/* Icon & Orbit Container */}
            <div className="relative w-24 h-24 flex items-center justify-center mb-6">
              {/* Orbit Ring */}
              <div className="absolute w-[120%] h-[30%] border border-pink-500/30 rounded-full transform rotate-[-25deg] shadow-[0_0_8px_rgba(236,72,153,0.1)] group-hover:border-pink-500/60 transition-all duration-500" />
              {/* Core Icon */}
              <div className="w-14 h-14 rounded-full bg-pink-950/60 border border-pink-500/30 flex items-center justify-center text-pink-400 group-hover:text-pink-355 group-hover:scale-110 transition-all duration-500 relative z-10 shadow-[0_0_15px_rgba(236,72,153,0.2)] logo-blink-hover">
                <Heart size={24} />
              </div>
            </div>

            <h3 className="font-extrabold text-lg mb-2 text-slate-100 group-hover:text-pink-400 transition-colors">Elder Portal</h3>
            <p className="text-slate-400 text-xs leading-relaxed max-w-[240px] mb-8 font-medium">
              View health charts, schedule appointments, chat with assigned helpers, and access emergency SOS services.
            </p>
            <div className="mt-auto text-pink-400 group-hover:translate-x-1.5 transition-transform duration-300">
              <ArrowRight size={18} />
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-900/60 text-center text-xs text-slate-500 z-10 bg-slate-950/20">
        &copy; {new Date().getFullYear()} Health Care Network. All rights reserved. Designed for elderly support and care excellence.
      </footer>
    </div>
  );
};

export default LandingPage;
