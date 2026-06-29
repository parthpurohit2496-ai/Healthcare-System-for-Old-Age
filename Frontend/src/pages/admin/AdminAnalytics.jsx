import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { BarChart3 } from 'lucide-react';

const AdminAnalytics = () => {
  const { patients, tasks } = useContext(AppContext);

  // 1. Fitness data
  const fitCount = patients.filter(p => p.fitStatus === 'Fit').length;
  const unfitCount = patients.filter(p => p.fitStatus === 'Unfit').length;
  
  const fitnessData = [
    { name: 'Fit / Stable', value: fitCount, color: '#10b981' }, // emerald-500
    { name: 'Critical / Unfit', value: unfitCount, color: '#ef4444' } // red-500
  ];

  // 2. Task completion data
  const completedTasks = tasks.filter(t => t.completed).length;
  const pendingTasks = tasks.filter(t => !t.completed).length;

  const taskData = [
    { name: 'Completed Tasks', value: completedTasks, color: '#3b82f6' }, // blue-500
    { name: 'Pending Tasks', value: pendingTasks, color: '#f59e0b' } // amber-500
  ];

  // 3. Combined data for charts
  const summaryStats = [
    { label: 'Patient Fitness Rate', value: patients.length ? `${Math.round((fitCount / patients.length) * 100)}%` : '0%', desc: 'Elders in healthy ranges' },
    { label: 'Task Completion Rate', value: tasks.length ? `${Math.round((completedTasks / tasks.length) * 100)}%` : '0%', desc: 'Shift duties logged' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">System Analytics</h2>
        <p className="text-slate-500 text-sm font-semibold">Real-time health trends and task completion metrics.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {summaryStats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">{stat.label}</span>
            <h3 className="text-4xl font-black text-slate-800 mt-1">{stat.value}</h3>
            <p className="text-xs text-slate-500 mt-1.5 font-medium">{stat.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Patient Fitness Distribution */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
              <BarChart3 className="text-indigo-600" size={16} />
              <span>Elder Fitness Distribution</span>
            </h3>
            {patients.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-12 font-medium">No patient data available.</p>
            ) : (
              <div className="h-64 mt-4 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={fitnessData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {fitnessData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>

        {/* Task Completion Progress */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
              <BarChart3 className="text-indigo-600" size={16} />
              <span>Daily Shift Tasks Progress</span>
            </h3>
            {tasks.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-12 font-medium">No tasks logged today.</p>
            ) : (
              <div className="h-64 mt-4 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={taskData} margin={{ top: 20, right: 20, left: -20, bottom: 5 }}>
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]}>
                      {taskData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminAnalytics;
