import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { ClipboardList, Trash2, Search } from 'lucide-react';

const AuditLog = () => {
  const { auditLogs } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = auditLogs.filter(log => 
    log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.actor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">System Audit Log</h2>
          <p className="text-slate-500 text-sm font-semibold">Security audit trail of all transactions and changes.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-2 mb-4">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <ClipboardList className="text-indigo-600" size={18} />
            <span>Audit Trail ({filteredLogs.length} events)</span>
          </h3>

          <div className="relative">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search audit trail..."
              className="pl-8 pr-3 py-1.5 rounded-full border border-slate-300 focus:outline-none focus:border-indigo-500 text-xs text-slate-700 bg-slate-50 w-full sm:w-56 font-medium"
            />
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-slate-100">
          <div className="max-h-[500px] overflow-y-auto pr-1">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider sticky top-0">
                <tr>
                  <th className="px-4 py-3 font-semibold">Timestamp</th>
                  <th className="px-4 py-3 font-semibold">Activity Event</th>
                  <th className="px-4 py-3 font-semibold">Author / Actor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center py-8 text-slate-400 font-semibold text-sm">
                      No matching audit records found.
                    </td>
                  </tr>
                ) : (
                  filteredLogs.map(log => (
                    <tr key={log.id} className="hover:bg-slate-55 transition-colors">
                      <td className="px-4 py-3 font-mono text-[10px] text-slate-400 font-bold whitespace-nowrap">{log.date}</td>
                      <td className="px-4 py-3 font-medium text-slate-800">{log.message}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="text-[10px] px-2.5 py-0.5 rounded bg-indigo-50 text-indigo-700 font-bold uppercase border border-indigo-100">
                          {log.actor}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditLog;
