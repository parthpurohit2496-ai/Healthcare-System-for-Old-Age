import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { Calendar, Send, ClipboardList } from 'lucide-react';

const LeaveRequest = () => {
  const { activeUser, leaves, requestLeave } = useContext(AppContext);
  const [duration, setDuration] = useState('1 Day');
  const [date, setDate] = useState('');
  const [reason, setReason] = useState('');
  const [msg, setMsg] = useState('');

  if (!activeUser) return null;

  const helperLeaves = leaves.filter(l => l.helperId === activeUser.id);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !reason) return;

    requestLeave(activeUser.id, activeUser.name, duration, reason, date);
    setMsg('Leave request submitted successfully!');
    setDate('');
    setReason('');
    setTimeout(() => setMsg(''), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">Leave & Availability</h2>
        <p className="text-slate-500 text-sm font-semibold">Request leaves or configure shift unavailability.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Form: Request Leave */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 h-fit">
          <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Send className="text-emerald-600" size={18} />
            <span>Submit Request</span>
          </h3>

          {msg && (
            <div className="mt-4 p-2.5 bg-emerald-50 border border-emerald-100 rounded text-center text-xs font-semibold text-emerald-700">
              {msg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Leave Date</label>
              <input 
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 rounded bg-slate-50 border border-slate-300 focus:border-emerald-500 focus:outline-none text-slate-700 text-xs font-semibold transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Duration</label>
              <select 
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3 py-2 rounded bg-slate-50 border border-slate-300 focus:border-emerald-500 focus:outline-none text-slate-700 text-xs font-semibold transition-colors"
              >
                {['Half Day (Morning)', 'Half Day (Evening)', '1 Day', '2 Days', '3 Days', 'Extended Leave'].map(dur => (
                  <option key={dur} value={dur}>{dur}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Reason details</label>
              <textarea 
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-3 py-2 rounded bg-slate-50 border border-slate-300 focus:border-emerald-500 focus:outline-none text-slate-700 text-xs font-semibold transition-colors min-h-[90px]"
                placeholder="Explain the reason for absence..."
                required
              />
            </div>

            <button 
              type="submit"
              className="w-full mt-2 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded shadow transition-colors active:scale-[0.98]"
            >
              Submit Leave Request
            </button>
          </form>
        </div>

        {/* Right List: History */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
              <ClipboardList className="text-emerald-600" size={18} />
              <span>Leave Request History ({helperLeaves.length})</span>
            </h3>

            {helperLeaves.length === 0 ? (
              <p className="text-sm text-slate-400 py-8 text-center font-medium">No leave requests submitted yet.</p>
            ) : (
              <div className="divide-y divide-slate-100 mt-2 max-h-[450px] overflow-y-auto pr-1">
                {helperLeaves.map(leave => (
                  <div key={leave.id} className="py-4 flex items-center justify-between text-slate-850">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">Date: {leave.date}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-500 font-bold uppercase">
                          {leave.duration}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 italic mt-1.5 bg-slate-50 p-2.5 rounded border border-slate-100">
                        Reason: {leave.reason}
                      </p>
                    </div>

                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                      leave.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                      leave.status === 'Rejected' ? 'bg-red-50 text-red-700 border border-red-100' :
                      'bg-yellow-50 text-yellow-700 border border-yellow-100'
                    }`}>
                      {leave.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default LeaveRequest;
