import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { FileSpreadsheet, Plus, FileText } from 'lucide-react';

const ReportPage = () => {
  const { patients, addReport } = useContext(AppContext);
  const [patientId, setPatientId] = useState('');
  const [reportType, setReportType] = useState('Blood Test');
  const [summary, setSummary] = useState('');
  const [details, setDetails] = useState('');
  const [formMsg, setFormMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!patientId || !reportType || !summary) {
      setFormMsg('Please fill in all fields.');
      return;
    }

    addReport(patientId, reportType, summary, details);
    setFormMsg('Report uploaded and linked successfully!');
    setPatientId('');
    setReportType('Blood Test');
    setSummary('');
    setDetails('');
    setTimeout(() => setFormMsg(''), 3000);
  };

  // Extract all reports from all patients for a master list
  const allReports = patients.reduce((acc, patient) => {
    if (patient.reports) {
      const reportsWithPatient = patient.reports.map(r => ({
        ...r,
        patientName: patient.name,
        patientId: patient.id
      }));
      return [...acc, ...reportsWithPatient];
    }
    return acc;
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">Report Manager</h2>
        <p className="text-slate-500 text-sm font-semibold">Upload medical diagnostics, laboratory tests, and clinical reports.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Form: Add Report */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 h-fit">
          <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Plus className="text-indigo-600" size={18} />
            <span>Upload Diagnostic Report</span>
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
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Report Type</label>
              <select 
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full px-3 py-2 rounded bg-slate-50 border border-slate-300 focus:border-indigo-500 focus:outline-none text-slate-700 text-xs font-semibold transition-colors"
              >
                {['Blood Test', 'Cardiogram (ECG)', 'Bone Scan', 'Urinalysis', 'X-Ray', 'Prescription Sheet', 'General Report'].map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Key Diagnostic Summary</label>
              <input 
                type="text" 
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full px-3 py-2 rounded bg-slate-50 border border-slate-300 focus:border-indigo-500 focus:outline-none text-slate-700 text-xs font-semibold transition-colors"
                placeholder="e.g. HbA1c: 7.8% (Elevated), BP: 140/90"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Full Report Details</label>
              <textarea 
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="w-full px-3 py-2 rounded bg-slate-50 border border-slate-300 focus:border-indigo-500 focus:outline-none text-slate-700 text-xs font-semibold transition-colors min-h-[90px]"
                placeholder="Detailed annotations or recommendation details..."
              />
            </div>

            <button 
              type="submit"
              className="w-full mt-2 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded shadow transition-colors active:scale-[0.98]"
            >
              Upload Report
            </button>
          </form>
        </div>

        {/* Right Table: Diagnostic Logs */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
              <FileSpreadsheet className="text-indigo-600" size={18} />
              <span>Diagnostic Logs & Reports ({allReports.length})</span>
            </h3>

            {allReports.length === 0 ? (
              <p className="text-sm text-slate-400 py-8 text-center font-medium">No diagnostic reports uploaded yet.</p>
            ) : (
              <div className="space-y-4 mt-4 max-h-[450px] overflow-y-auto pr-1">
                {allReports.map(report => (
                  <div key={report.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:shadow transition-all text-slate-800">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                          {report.type}
                        </span>
                        <h4 className="font-bold text-sm text-slate-900 mt-1.5">{report.patientName} (ID: {report.patientId})</h4>
                      </div>
                      <span className="text-xs text-slate-400 font-semibold">{report.date}</span>
                    </div>
                    
                    <p className="text-xs font-bold text-slate-700 mt-2 flex items-start gap-1">
                      <FileText size={14} className="text-slate-400 shrink-0" />
                      <span>{report.summary}</span>
                    </p>
                    
                    {report.details && (
                      <p className="text-xs text-slate-500 mt-1.5 pl-5 border-l border-slate-300 italic font-medium">
                        {report.details}
                      </p>
                    )}
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

export default ReportPage;
