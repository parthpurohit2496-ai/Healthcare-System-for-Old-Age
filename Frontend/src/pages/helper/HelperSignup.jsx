import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { UserPlus, ArrowLeft } from 'lucide-react';

const HelperSignup = () => {
  const { signupHelper } = useContext(AppContext);
  const navigate = useNavigate();

  // Form Fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      signupHelper({ name, phone, email, password });
      setSuccess(true);
      setName('');
      setPhone('');
      setEmail('');
      setPassword('');
      setError('');
    } catch (err) {
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center relative overflow-hidden text-white">
      {/* Background blur */}
      <div className="absolute top-[-20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-emerald-950/40 blur-[100px]" />

      <div className="w-full max-w-md p-8 rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-md shadow-2xl relative z-10">
        <button 
          onClick={() => navigate('/helper/login')} 
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft size={14} />
          <span>Back to Login</span>
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex p-3 rounded-full bg-emerald-500/10 text-emerald-400 mb-3">
            <UserPlus size={28} />
          </div>
          <h2 className="font-extrabold text-2xl tracking-tight">Helper Registration</h2>
          <p className="text-slate-400 text-xs mt-1 font-medium">Join the Karmyog Care Network. Await admin approval post-signup.</p>
        </div>

        {success ? (
          <div className="bg-emerald-950/60 border border-emerald-500/40 rounded-xl p-6 text-center shadow-lg">
            <h3 className="font-bold text-emerald-400 text-lg mb-2">Registration Submitted!</h3>
            <p className="text-xs text-slate-350 leading-relaxed mb-4">
              Your details have been recorded. Once the administrator approves your request, you will be able to log in.
            </p>
            <button 
              onClick={() => navigate('/helper/login')}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-bold transition-colors w-full"
            >
              Back to Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {error && (
              <div className="p-3 bg-red-900/30 border border-red-500/50 rounded text-red-200 text-xs font-semibold text-center">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Full Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded bg-slate-850 border border-slate-700/80 focus:border-emerald-500 focus:outline-none text-slate-100 text-xs font-semibold transition-colors"
                placeholder="e.g. Aman Kumar"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Phone Number</label>
              <input 
                type="text" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 rounded bg-slate-850 border border-slate-700/80 focus:border-emerald-500 focus:outline-none text-slate-100 text-xs font-semibold transition-colors"
                placeholder="e.g. 9898989898"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded bg-slate-850 border border-slate-700/80 focus:border-emerald-500 focus:outline-none text-slate-100 text-xs font-semibold transition-colors"
                placeholder="e.g. name@karmyog.org"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 rounded bg-slate-850 border border-slate-700/80 focus:border-emerald-500 focus:outline-none text-slate-100 text-xs font-semibold transition-colors"
                placeholder="Choose password"
                required
              />
            </div>

            <button 
              type="submit" 
              className="w-full mt-2 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded shadow transition-colors active:scale-[0.98]"
            >
              Submit Registration
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default HelperSignup;
