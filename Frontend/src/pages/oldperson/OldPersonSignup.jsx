import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { Heart, ArrowLeft } from 'lucide-react';

const OldPersonSignup = () => {
  const { signupOldPerson } = useContext(AppContext);
  const navigate = useNavigate();

  // Form Fields
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [contacts, setContacts] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !age || !contacts) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const newPerson = signupOldPerson({
        name,
        age: parseInt(age),
        familyContacts: contacts,
        email,
        password,
        bloodGroup: 'O+' // Default
      });
      setSuccess(true);
      setError('');
    } catch (err) {
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center relative overflow-hidden text-white">
      {/* Background blur */}
      <div className="absolute top-[-20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-purple-950/40 blur-[100px]" />

      <div className="w-full max-w-md p-8 rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-md shadow-2xl relative z-10">
        <button 
          onClick={() => navigate('/old-person/login')} 
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft size={14} />
          <span>Back to Login</span>
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex p-3 rounded-full bg-purple-500/10 text-purple-400 mb-3">
            <Heart size={28} />
          </div>
          <h2 className="font-extrabold text-2xl tracking-tight">Elder Registration</h2>
          <p className="text-slate-400 text-xs mt-1 font-medium">Create your profile to monitor health and connect with care helpers.</p>
        </div>

        {success ? (
          <div className="bg-purple-950/60 border border-purple-500/40 rounded-xl p-6 text-center shadow-lg">
            <h3 className="font-bold text-purple-400 text-lg mb-2">Registration Complete!</h3>
            <p className="text-xs text-slate-350 leading-relaxed mb-4">
              Your profile has been created successfully. You can now log in using your ID and password.
            </p>
            <button 
              onClick={() => navigate('/old-person/login')}
              className="px-4 py-2 bg-purple-650 hover:bg-purple-550 text-white rounded text-xs font-bold transition-colors w-full"
            >
              Go to Login
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
                className="w-full px-3 py-2 rounded bg-slate-850 border border-slate-700/80 focus:border-purple-500 focus:outline-none text-slate-100 text-xs font-semibold transition-colors"
                placeholder="e.g. Savitri Devi"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Age</label>
              <input 
                type="number" 
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-3 py-2 rounded bg-slate-850 border border-slate-700/80 focus:border-purple-500 focus:outline-none text-slate-100 text-xs font-semibold transition-colors"
                placeholder="e.g. 80"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Family Contacts (Phone)</label>
              <input 
                type="text" 
                value={contacts}
                onChange={(e) => setContacts(e.target.value)}
                className="w-full px-3 py-2 rounded bg-slate-850 border border-slate-700/80 focus:border-purple-500 focus:outline-none text-slate-100 text-xs font-semibold transition-colors"
                placeholder="e.g. 9812345678"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded bg-slate-850 border border-slate-700/80 focus:border-purple-500 focus:outline-none text-slate-100 text-xs font-semibold transition-colors"
                placeholder="e.g. savitri@gmail.com"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 rounded bg-slate-850 border border-slate-700/80 focus:border-purple-500 focus:outline-none text-slate-100 text-xs font-semibold transition-colors"
                placeholder="Choose password"
                required
              />
            </div>

            <button 
              type="submit" 
              className="w-full mt-2 py-2 bg-purple-650 hover:bg-purple-550 text-white font-bold text-xs rounded shadow transition-colors active:scale-[0.98]"
            >
              Register Account
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default OldPersonSignup;
