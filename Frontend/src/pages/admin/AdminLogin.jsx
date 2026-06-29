import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

const AdminLogin = () => {
  const [adminId, setAdminId] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const { loginUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (adminId === 'admin' && password === 'admin123') {
      loginUser('Admin', 'ADM001', 'System Administrator');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid Administrator ID or Password.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center relative overflow-hidden text-white">
      {/* Background blur */}
      <div className="absolute top-[-20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-indigo-900/30 blur-[100px]" />

      <div className="w-full max-w-md p-8 rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-md shadow-2xl relative z-10">
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft size={14} />
          <span>Portal Select</span>
        </button>

        <div className="text-center mb-8">
          <div className="inline-flex p-3 rounded-full bg-indigo-500/10 text-indigo-400 mb-3">
            <ShieldAlert size={28} />
          </div>
          <h2 className="font-extrabold text-2xl tracking-tight">Admin Login</h2>
          <p className="text-slate-400 text-xs mt-1">Access the central administration control system.</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900/30 border border-red-500/50 rounded text-red-200 text-xs font-semibold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Admin ID</label>
            <input 
              type="text" 
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
              className="w-full px-4 py-2.5 rounded bg-slate-850 border border-slate-700/80 focus:border-indigo-500 focus:outline-none text-slate-100 text-sm font-semibold transition-colors"
              placeholder="Enter admin ID"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded bg-slate-850 border border-slate-700/80 focus:border-indigo-500 focus:outline-none text-slate-100 text-sm font-semibold transition-colors"
              placeholder="Enter password"
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full mt-2 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded shadow-lg transition-colors active:scale-[0.98]"
          >
            Authenticate & Access
          </button>
        </form>

        <div className="text-center mt-6 text-[11px] text-slate-500">
          <p>Demo Credentials: ID <code className="text-slate-400 font-mono font-bold">admin</code> / Password <code className="text-slate-400 font-mono font-bold">admin123</code></p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
