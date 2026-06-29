import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { Heart, ArrowLeft } from 'lucide-react';

const OldPersonLogin = () => {
  const [patientId, setPatientId] = useState('P001');
  const [password, setPassword] = useState('elder123');
  const [error, setError] = useState('');
  const { loginUser, patients } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const patient = patients.find(p => p.id.toUpperCase() === patientId.toUpperCase());

    if (!patient) {
      setError('Patient ID not found.');
      return;
    }

    loginUser('Old Person', patient.id, patient.name);
    navigate('/old-person/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center relative overflow-hidden text-white">
      {/* Background blur */}
      <div className="absolute top-[-20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-purple-950/40 blur-[100px]" />

      <div className="w-full max-w-md p-8 rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-md shadow-2xl relative z-10">
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft size={14} />
          <span>Portal Select</span>
        </button>

        <div className="text-center mb-8">
          <div className="inline-flex p-3 rounded-full bg-purple-500/10 text-purple-400 mb-3">
            <Heart size={28} />
          </div>
          <h2 className="font-extrabold text-2xl tracking-tight">Elder Portal Login</h2>
          <p className="text-slate-400 text-xs mt-1 font-medium">Log in to view health reports, chat with helpers, or trigger SOS.</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900/30 border border-red-500/50 rounded text-red-200 text-xs font-semibold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Elder Patient ID</label>
            <input 
              type="text" 
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              className="w-full px-4 py-2.5 rounded bg-slate-850 border border-slate-700/80 focus:border-purple-500 focus:outline-none text-slate-100 text-sm font-semibold transition-colors"
              placeholder="e.g. P001"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded bg-slate-850 border border-slate-700/80 focus:border-purple-500 focus:outline-none text-slate-100 text-sm font-semibold transition-colors"
              placeholder="Enter password"
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full mt-2 py-2.5 bg-purple-650 hover:bg-purple-550 text-white font-bold text-sm rounded shadow-lg transition-colors active:scale-[0.98]"
          >
            Access My Dashboard
          </button>
        </form>

        <div className="text-center mt-6 text-xs text-slate-400">
          <p>Don't have an account? <button onClick={() => navigate('/old-person/signup')} className="text-purple-400 hover:underline font-bold">Register here</button></p>
        </div>
      </div>
    </div>
  );
};

export default OldPersonLogin;
