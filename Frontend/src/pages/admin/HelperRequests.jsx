import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { UserCheck, Check, UserMinus, Plus } from 'lucide-react';

const HelperRequests = () => {
  const { helpers, patients, approveHelper, assignHelper } = useContext(AppContext);
  const [selectedHelper, setSelectedHelper] = useState('');
  const [selectedPatient, setSelectedPatient] = useState('');
  const [assignMsg, setAssignMsg] = useState('');

  const pendingHelpers = helpers.filter(h => h.status === 'Pending');
  const approvedHelpers = helpers.filter(h => h.status === 'Approved');
  
  // Unassigned patients
  const unassignedPatients = patients.filter(p => !p.helperId);

  const handleAssign = (e) => {
    e.preventDefault();
    if (!selectedHelper || !selectedPatient) {
      setAssignMsg('Please select both a helper and a patient.');
      return;
    }
    assignHelper(selectedHelper, selectedPatient);
    setAssignMsg('Helper assigned successfully!');
    setSelectedHelper('');
    setSelectedPatient('');
    setTimeout(() => setAssignMsg(''), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">Helper Administration</h2>
        <p className="text-slate-500 text-sm font-semibold">Approve registrations and assign helpers to elders.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Helper Lists */}
        <div className="lg:col-span-2 space-y-6">
          {/* Pending Approval Requests */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
              <UserMinus className="text-orange-600" size={18} />
              <span>Pending Signups ({pendingHelpers.length})</span>
            </h3>
            {pendingHelpers.length === 0 ? (
              <p className="text-sm text-slate-400 py-6 text-center font-medium">No pending helper signup requests.</p>
            ) : (
              <div className="divide-y divide-slate-100 mt-2">
                {pendingHelpers.map(helper => (
                  <div key={helper.id} className="py-3 flex items-center justify-between text-slate-850">
                    <div>
                      <h4 className="font-semibold text-sm">{helper.name}</h4>
                      <p className="text-xs text-slate-500">Phone: {helper.phone} | Email: {helper.email}</p>
                    </div>
                    <button 
                      onClick={() => approveHelper(helper.id)}
                      className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-bold transition-all flex items-center gap-1 shadow-sm"
                    >
                      <Check size={12} />
                      <span>Approve</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Approved Helpers */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
              <UserCheck className="text-emerald-600" size={18} />
              <span>Approved Care Helpers ({approvedHelpers.length})</span>
            </h3>
            {approvedHelpers.length === 0 ? (
              <p className="text-sm text-slate-400 py-6 text-center font-medium">No approved helpers registered yet.</p>
            ) : (
              <div className="divide-y divide-slate-100 mt-2">
                {approvedHelpers.map(helper => {
                  const assignedPat = patients.find(p => p.id === helper.assignedPatientId);
                  return (
                    <div key={helper.id} className="py-3 flex items-center justify-between text-slate-850">
                      <div>
                        <h4 className="font-semibold text-sm">{helper.name}</h4>
                        <p className="text-xs text-slate-500">ID: {helper.id} | Phone: {helper.phone}</p>
                      </div>
                      <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${assignedPat ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' : 'bg-slate-100 text-slate-500 border border-slate-200'}`}>
                        {assignedPat ? `Assigned to: ${assignedPat.name}` : 'Unassigned'}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Helper Assignment Form */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 h-fit">
          <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Plus className="text-indigo-600" size={18} />
            <span>Assign Helper to Elder</span>
          </h3>

          {assignMsg && (
            <div className={`mt-4 p-2.5 rounded text-center text-xs font-semibold ${assignMsg.includes('successfully') ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
              {assignMsg}
            </div>
          )}

          <form onSubmit={handleAssign} className="mt-4 flex flex-col gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Select Helper</label>
              <select 
                value={selectedHelper}
                onChange={(e) => setSelectedHelper(e.target.value)}
                className="w-full px-3 py-2 rounded bg-slate-50 border border-slate-300 focus:border-indigo-500 focus:outline-none text-slate-700 text-xs font-semibold transition-colors"
                required
              >
                <option value="">-- Choose Approved Helper --</option>
                {approvedHelpers.map(h => (
                  <option key={h.id} value={h.id}>{h.name} (ID: {h.id})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Select Elder/Patient</label>
              <select 
                value={selectedPatient}
                onChange={(e) => setSelectedPatient(e.target.value)}
                className="w-full px-3 py-2 rounded bg-slate-50 border border-slate-300 focus:border-indigo-500 focus:outline-none text-slate-700 text-xs font-semibold transition-colors"
                required
              >
                <option value="">-- Choose Patient --</option>
                {/* Prioritize showing unassigned patients but allow reassignment if needed */}
                {patients.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} (ID: {p.id}){p.helperId ? ' [Assigned]' : ' [Needs Helper]'}
                  </option>
                ))}
              </select>
            </div>

            <button 
              type="submit"
              className="w-full mt-2 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded shadow transition-colors active:scale-[0.98]"
            >
              Assign Helper
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default HelperRequests;
