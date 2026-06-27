import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { ShieldCheck, Heart, HelpingHand } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const { activeUser } = useContext(AppContext);

  // If already logged in, redirect to respective dashboard
  React.useEffect(() => {
    if (activeUser) {
      if (activeUser.role === 'Admin') navigate('/admin/dashboard');
      if (activeUser.role === 'Helper') navigate('/helper/dashboard');
      if (activeUser.role === 'Old Person') navigate('/old-person/dashboard');
    }
  }, [activeUser, navigate]);

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-between text-white selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-900/20 blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-950/20 blur-[120px]" />

      <header className="px-8 py-6 flex items-center justify-between border-b border-slate-800 backdrop-blur-md bg-slate-900/50 z-10">
        <div className="flex items-center gap-2">
          <Heart className="text-red-500 fill-red-500 animate-pulse" size={24} />
          <span className="font-extrabold text-xl tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            HEALTH CARE NETWORK
          </span>
        </div>
        <div className="text-sm font-semibold text-slate-400">Healthcare Portal v2.0</div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 flex flex-col items-center justify-center flex-1 text-center z-10">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 max-w-4xl leading-tight">
          Empowering Care, <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
            Nurturing Elder Lives
          </span>
        </h1>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mb-12 font-medium">
          A centralized, real-time collaboration network connecting Administrators, dedicated Care Helpers, and Elders for seamless medical tracking and urgent assistance.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl px-4">
          {/* Admin Card */}
          <div 
            onClick={() => navigate('/admin/login')}
            className="group cursor-pointer rounded-2xl p-8 bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm hover:border-indigo-500/80 hover:bg-slate-800/80 transition-all duration-300 flex flex-col items-center hover:-translate-y-2 shadow-lg"
          >
            <div className="p-4 rounded-full bg-indigo-500/10 text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck size={36} />
            </div>
            <h3 className="font-bold text-xl mb-2 text-slate-100 group-hover:text-indigo-400 transition-colors">Admin Portal</h3>
            <p className="text-slate-400 text-sm">
              Manage helpers, register elder patients, configure medicine schedules, and review audit logs.
            </p>
          </div>

          {/* Helper Card */}
          <div 
            onClick={() => navigate('/helper/login')}
            className="group cursor-pointer rounded-2xl p-8 bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm hover:border-emerald-500/80 hover:bg-slate-800/80 transition-all duration-300 flex flex-col items-center hover:-translate-y-2 shadow-lg"
          >
            <div className="p-4 rounded-full bg-emerald-500/10 text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
              <HelpingHand size={36} />
            </div>
            <h3 className="font-bold text-xl mb-2 text-slate-100 group-hover:text-emerald-400 transition-colors">Helper Portal</h3>
            <p className="text-slate-400 text-sm">
              Check-in for shifts, track daily checklists, log elder vitals (BP, sugar), and manage leave availability.
            </p>
          </div>

          {/* Old Person Card */}
          <div 
            onClick={() => navigate('/old-person/login')}
            className="group cursor-pointer rounded-2xl p-8 bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm hover:border-purple-500/80 hover:bg-slate-800/80 transition-all duration-300 flex flex-col items-center hover:-translate-y-2 shadow-lg"
          >
            <div className="p-4 rounded-full bg-purple-500/10 text-purple-400 mb-6 group-hover:scale-110 transition-transform">
              <Heart size={36} />
            </div>
            <h3 className="font-bold text-xl mb-2 text-slate-100 group-hover:text-purple-400 transition-colors">Elder Portal</h3>
            <p className="text-slate-400 text-sm">
              View health charts, schedule appointments, chat with assigned helpers, and access emergency SOS services.
            </p>
          </div>
        </div>
      </main>

      <footer className="py-8 border-t border-slate-800/60 text-center text-xs text-slate-500 z-10 bg-slate-950/20">
        &copy; {new Date().getFullYear()} Health Care Network. All rights reserved. Designed for elderly support and care excellence.
      </footer>
    </div>
  );
};

export default LandingPage;
