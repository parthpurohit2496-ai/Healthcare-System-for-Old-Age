import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { UserPlus, Users, Search, AlertCircle } from 'lucide-react';

const PatientData = () => {
  const { patients, addPatient, helpers } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Form fields
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [familyContacts, setFamilyContacts] = useState('');
  const [fitStatus, setFitStatus] = useState('Fit');
  const [disease, setDisease] = useState('');
  const [formMsg, setFormMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !age || !familyContacts) {
      setFormMsg('Please fill in Name, Age, and Family Contacts.');
      return;
    }
    
    addPatient({
      name,
      age: parseInt(age),
      bloodGroup,
      familyContacts,
      fitStatus,
      disease,
      helperId: null
    });

    setFormMsg('Patient registered successfully!');
    setName('');
    setAge('');
    setBloodGroup('O+');
    setFamilyContacts('');
    setFitStatus('Fit');
    setDisease('');
    setTimeout(() => setFormMsg(''), 3000);
  };

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.disease.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">Patient Registry</h2>
        <p className="text-slate-500 text-sm font-semibold">Register and manage elder patient databases.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Form: Add Patient */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 h-fit">
          <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
            <UserPlus className="text-indigo-600" size={18} />
            <span>Register New Elder</span>
          </h3>

          {formMsg && (
            <div className="mt-4 p-2.5 bg-emerald-50 border border-emerald-100 rounded text-center text-xs font-semibold text-emerald-700">
              {formMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Full Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded bg-slate-50 border border-slate-300 focus:border-indigo-500 focus:outline-none text-slate-700 text-xs font-semibold transition-colors"
                placeholder="e.g. Ram Prasad"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Age</label>
                <input 
                  type="number" 
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-slate-50 border border-slate-300 focus:border-indigo-500 focus:outline-none text-slate-700 text-xs font-semibold transition-colors"
                  placeholder="e.g. 75"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Blood Group</label>
                <select 
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-slate-50 border border-slate-300 focus:border-indigo-500 focus:outline-none text-slate-700 text-xs font-semibold transition-colors"
                >
                  {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Family Contacts (Phone)</label>
              <input 
                type="text" 
                value={familyContacts}
                onChange={(e) => setFamilyContacts(e.target.value)}
                className="w-full px-3 py-2 rounded bg-slate-50 border border-slate-300 focus:border-indigo-500 focus:outline-none text-slate-700 text-xs font-semibold transition-colors"
                placeholder="e.g. 9876543210, 9812345678"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Current Fitness Status</label>
              <select 
                value={fitStatus}
                onChange={(e) => setFitStatus(e.target.value)}
                className="w-full px-3 py-2 rounded bg-slate-50 border border-slate-300 focus:border-indigo-500 focus:outline-none text-slate-700 text-xs font-semibold transition-colors"
              >
                <option value="Fit">Fit (Healthy / Stable)</option>
                <option value="Unfit">Unfit (Needs Close Monitoring)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Disease / Health Conditions</label>
              <textarea 
                value={disease}
                onChange={(e) => setDisease(e.target.value)}
                className="w-full px-3 py-2 rounded bg-slate-50 border border-slate-300 focus:border-indigo-500 focus:outline-none text-slate-700 text-xs font-semibold transition-colors min-h-[80px]"
                placeholder="e.g. Severe Hypertension, Arthritis, Diabetes"
              />
            </div>

            <button 
              type="submit"
              className="w-full mt-2 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded shadow transition-colors active:scale-[0.98]"
            >
              Add Patient
            </button>
          </form>
        </div>

        {/* Right Table: Patient List */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-2">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Users className="text-indigo-600" size={18} />
                <span>Registered Patients ({patients.length})</span>
              </h3>
              
              <div className="relative">
                <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search name or disease..."
                  className="pl-8 pr-3 py-1.5 rounded-full border border-slate-300 focus:outline-none focus:border-indigo-500 text-xs text-slate-700 bg-slate-50 w-full sm:w-48 font-medium"
                />
              </div>
            </div>

            <div className="overflow-x-auto mt-4">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                    <th className="py-2.5 font-semibold">ID</th>
                    <th className="py-2.5 font-semibold">Name</th>
                    <th className="py-2.5 font-semibold">Age / Blood</th>
                    <th className="py-2.5 font-semibold">Health Status</th>
                    <th className="py-2.5 font-semibold">Assigned Helper</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {filteredPatients.map(patient => {
                    const assignedHelper = helpers.find(h => h.id === patient.helperId);
                    return (
                      <tr key={patient.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 font-mono font-bold text-slate-500">{patient.id}</td>
                        <td className="py-3 font-semibold">{patient.name}</td>
                        <td className="py-3 font-medium">Age {patient.age} ({patient.bloodGroup})</td>
                        <td className="py-3">
                          <span className={`px-2 py-0.5 rounded-full font-bold inline-flex items-center gap-1 ${patient.fitStatus === 'Fit' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-700 border border-red-100 animate-pulse'}`}>
                            <AlertCircle size={10} />
                            <span>{patient.fitStatus}</span>
                          </span>
                        </td>
                        <td className="py-3 font-medium">
                          {assignedHelper ? (
                            <span className="text-emerald-700">{assignedHelper.name}</span>
                          ) : (
                            <span className="text-slate-400 italic">None</span>
                          )}
                        </td>
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

export default PatientData;
