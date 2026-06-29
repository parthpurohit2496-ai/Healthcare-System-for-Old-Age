import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { MessageSquare, Send, Bell } from 'lucide-react';

const Announcements = () => {
  const { announcements, broadcastAnnouncement } = useContext(AppContext);
  const [text, setText] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    broadcastAnnouncement(text);
    setMsg('Announcement broadcasted successfully!');
    setText('');
    setTimeout(() => setMsg(''), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">Announcements</h2>
        <p className="text-slate-500 text-sm font-semibold">Broadcast newsletters or announcements to all registered Elders.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Form: Broadcast */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 h-fit">
          <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Send className="text-indigo-600" size={18} />
            <span>Create Broadcast</span>
          </h3>

          {msg && (
            <div className="mt-4 p-2.5 bg-emerald-50 border border-emerald-100 rounded text-center text-xs font-semibold text-emerald-700">
              {msg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Announcement Content</label>
              <textarea 
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full px-3 py-2 rounded bg-slate-50 border border-slate-300 focus:border-indigo-500 focus:outline-none text-slate-700 text-xs font-semibold transition-colors min-h-[120px]"
                placeholder="Write announcements details..."
                required
              />
            </div>

            <button 
              type="submit"
              className="w-full mt-2 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded shadow transition-colors active:scale-[0.98] flex items-center justify-center gap-1.5"
            >
              <Send size={14} />
              <span>Broadcast Now</span>
            </button>
          </form>
        </div>

        {/* Right List: Previous Broadcasts */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Bell className="text-indigo-600" size={18} />
              <span>Broadcast History ({announcements.length})</span>
            </h3>

            {announcements.length === 0 ? (
              <p className="text-sm text-slate-400 py-8 text-center font-medium">No previous announcements found.</p>
            ) : (
              <div className="divide-y divide-slate-100 mt-2 max-h-[450px] overflow-y-auto pr-1">
                {announcements.map(ann => (
                  <div key={ann.id} className="py-4 text-slate-850">
                    <div className="flex items-center justify-between text-slate-400 text-[10px] font-bold">
                      <span className="flex items-center gap-1">
                        <MessageSquare size={12} className="text-indigo-500" />
                        <span>System Broadcast</span>
                      </span>
                      <span>{ann.date}</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-800 mt-2 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                      {ann.text}
                    </p>
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

export default Announcements;
