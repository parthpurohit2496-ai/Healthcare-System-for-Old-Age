import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { Pill, Plus, Search } from 'lucide-react';

const MedicineData = () => {
  const { medicines, addMedicine, patients } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Form fields
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [time, setTime] = useState('');
  const [patientId, setPatientId] = useState('');
  const [formMsg, setFormMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !company || !time || !patientId) {
      setFormMsg('Please fill in all fields.');
      return;
    }
    
    addMedicine({
      name,
      company,
      time,
      patientId
    });

    setFormMsg('Medicine configured successfully!');
    setName('');
    setCompany('');
    setTime('');
    setPatientId('');
    setTimeout(() => setFormMsg(''), 3000);
  };

  const filteredMedicines = medicines.filter(m => {
    const patientName = patients.find(p => p.id === m.patientId)?.name || '';
    return (
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patientName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">Medicine (Dava) Manager</h2>
        <p className="text-slate-500 text-sm font-semibold">Configure daily medicines and frequencies for elders.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Form: Add Medicine */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 h-fit">
          <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Plus className="text-indigo-600" size={18} />
            <span>Add Patient Medicine</span>
          </h3>

          {formMsg && (
            <div className="mt-4 p-2.5 bg-emerald-50 border border-emerald-100 rounded text-center text-xs font-semibold text-emerald-700">
              {formMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Target Patient</label>
              <select 
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                className="w-full px-3 py-2 rounded bg-slate-50 border border-slate-300 focus:border-indigo-500 focus:outline-none text-slate-700 text-xs font-semibold transition-colors"
                required
              >
                <option value="">-- Choose Patient --</option>
                {patients.map(p => (
                  <option key={p.id} value={p.id}>{p.name} (ID: {p.id})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Medicine Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded bg-slate-50 border border-slate-300 focus:border-indigo-500 focus:outline-none text-slate-700 text-xs font-semibold transition-colors"
                placeholder="e.g. Metformin 500mg"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Pharmaceutical Company</label>
              <input 
                type="text" 
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-3 py-2 rounded bg-slate-50 border border-slate-300 focus:border-indigo-500 focus:outline-none text-slate-700 text-xs font-semibold transition-colors"
                placeholder="e.g. Cipla / Sun Pharma"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Dosing Schedule (Time)</label>
              <input 
                type="text" 
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3 py-2 rounded bg-slate-50 border border-slate-300 focus:border-indigo-500 focus:outline-none text-slate-700 text-xs font-semibold transition-colors"
                placeholder="e.g. 08:00 AM (Before Meal), 08:00 PM"
                required
              />
            </div>

            <button 
              type="submit"
              className="w-full mt-2 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded shadow transition-colors active:scale-[0.98]"
            >
              Add Medicine
            </button>
          </form>
        </div>

        {/* Right Table: Medicine List */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-2">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Pill className="text-indigo-600" size={18} />
                <span>Medicine Logs ({medicines.length})</span>
              </h3>
              
              <div className="relative">
                <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search medicine or patient..."
                  className="pl-8 pr-3 py-1.5 rounded-full border border-slate-300 focus:outline-none focus:border-indigo-500 text-xs text-slate-700 bg-slate-50 w-full sm:w-48 font-medium"
                />
              </div>
            </div>

            <div className="overflow-x-auto mt-4">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                    <th className="py-2.5 font-semibold">Patient</th>
                    <th className="py-2.5 font-semibold">Medicine Name</th>
                    <th className="py-2.5 font-semibold">Company</th>
                    <th className="py-2.5 font-semibold">Dosing Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {filteredMedicines.map(med => {
                    const patient = patients.find(p => p.id === med.patientId);
                    return (
                      <tr key={med.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 font-semibold text-slate-900">{patient ? patient.name : 'Unknown'}</td>
                        <td className="py-3 font-semibold text-indigo-700 flex items-center gap-1.5">
                          <Pill size={12} />
                          <span>{med.name}</span>
                        </td>
                        <td className="py-3 font-medium text-slate-500">{med.company}</td>
                        <td className="py-3 font-bold text-slate-600 bg-slate-50/50 px-2 py-0.5 rounded border border-slate-100 max-w-[180px] truncate">{med.time}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MedicineData;
