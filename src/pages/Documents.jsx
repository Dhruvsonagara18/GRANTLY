import React, { useState } from 'react';
import {
  FileCheck2,
  Plus,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileText,
  Upload,
  Info,
  ShieldCheck,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useApp } from '../context/AppContext';

export default function Documents() {
  const { documents, updateDocumentStatus, addDocument, readiness } = useApp();

  const [showAddModal, setShowAddModal] = useState(false);
  const [newDocName, setNewDocName] = useState('');
  const [newDocType, setNewDocType] = useState('Academic');
  const [newDocNotes, setNewDocNotes] = useState('');

  const readyCount = documents.filter((d) => d.status === 'Ready').length;
  const pendingCount = documents.length - readyCount;
  const percentage = Math.round((readyCount / Math.max(1, documents.length)) * 100);

  const handleAddNewDoc = (e) => {
    e.preventDefault();
    if (!newDocName) return;
    addDocument({
      name: newDocName,
      type: newDocType,
      notes: newDocNotes
    });
    setNewDocName('');
    setNewDocNotes('');
    setShowAddModal(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <FileCheck2 className="w-5 h-5 text-brand-600" />
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                Document Readiness Center
              </h1>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Verify prerequisite academic, financial, and domicile certificates before deadlines
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Custom Document</span>
          </button>
        </div>

        {/* READINESS METRICS CARD */}
        <div className="bg-gradient-to-r from-brand-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-300">
                Application Readiness
              </span>
              <div className="flex items-baseline gap-3 mt-1">
                <span className="text-4xl font-black">{percentage}%</span>
                <span className="text-sm font-semibold text-brand-200">
                  {readyCount} of {documents.length} documents prepared
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-xl bg-white/10 text-xs font-bold border border-white/20">
                {pendingCount === 0 ? 'Fully Ready' : `${pendingCount} Pending`}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-teal-300 rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-300">
            <Info className="w-4 h-4 text-brand-300 shrink-0" />
            <span>
              Disclaimer: Checking a document indicates personal preparation readiness in your local locker; it does not claim external official stamp verification.
            </span>
          </div>
        </div>

        {/* DOCUMENTS CHECKLIST */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900">Document Locker & Checklist</h2>

          <div className="divide-y divide-slate-100">
            {documents.map((doc) => {
              const isReady = doc.status === 'Ready';
              return (
                <div
                  key={doc.id}
                  className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <button
                        onClick={() => updateDocumentStatus(doc.id, isReady ? 'Pending' : 'Ready')}
                        className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                          isReady
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'border-slate-300 hover:border-brand-500'
                        }`}
                        title="Click to toggle status"
                      >
                        {isReady && <CheckCircle2 className="w-4 h-4" />}
                      </button>
                      <h4 className={`text-sm font-bold ${isReady ? 'text-slate-900' : 'text-slate-700'}`}>
                        {doc.name}
                      </h4>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600">
                        {doc.type}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 pl-7">{doc.notes}</p>
                    <p className="text-[10px] text-slate-400 pl-7">
                      Last logged: {doc.lastUpdated} {doc.fileSize && `• ${doc.fileSize}`}
                    </p>
                  </div>

                  {/* Status Toggle Buttons */}
                  <div className="flex items-center gap-2 pl-7 sm:pl-0">
                    <button
                      onClick={() => updateDocumentStatus(doc.id, isReady ? 'Pending' : 'Ready')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                        isReady
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                      }`}
                    >
                      {isReady ? 'Marked Ready' : 'Mark as Ready'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* GUIDANCE & BEST PRACTICES */}
        <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200 space-y-3">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-600" />
            <span>Document Preparation Guidelines for Students</span>
          </h3>
          <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside leading-relaxed">
            <li><strong>Income Certificates:</strong> Must be issued by a competent revenue officer (e.g., Tehsildar or Sub-Divisional Magistrate) within the current fiscal year.</li>
            <li><strong>Marksheets:</strong> Keep clean digital scans (under 2MB, PDF format) of both front and back sides showing university seal and controller sign.</li>
            <li><strong>Bonafide Letters:</strong> Request institutional bonafide with roll number, program branch, and current academic year at least 10 days before deadlines.</li>
            <li><strong>Bank Accounts:</strong> Ensure your savings account is seeded with Aadhaar and has active NPCI DBT subvention enabled for government transfers.</li>
          </ul>
        </div>

        {/* MODAL: Add Custom Document */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs" onClick={() => setShowAddModal(false)} />
            <div className="relative bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 z-10 space-y-4">
              <h3 className="text-base font-bold text-slate-900">Add Prerequisite Document</h3>
              <form onSubmit={handleAddNewDoc} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Document Name</label>
                  <input
                    type="text"
                    value={newDocName}
                    onChange={(e) => setNewDocName(e.target.value)}
                    placeholder="e.g. Research Publication Abstract"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-500 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Document Type</label>
                  <select
                    value={newDocType}
                    onChange={(e) => setNewDocType(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-500 outline-none"
                  >
                    <option value="Academic">Academic (Grades, Degrees)</option>
                    <option value="Financial">Financial (Income, Tax Proof)</option>
                    <option value="Institutional">Institutional (Bonafide, ID)</option>
                    <option value="Identity / Domicile">Identity / Domicile</option>
                    <option value="Recommendation">Letter of Recommendation</option>
                    <option value="Personal Statement">SOP / Essay</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Notes / Action Details</label>
                  <textarea
                    value={newDocNotes}
                    onChange={(e) => setNewDocNotes(e.target.value)}
                    placeholder="e.g. Awaiting faculty signature"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-500 outline-none"
                    rows={2}
                  />
                </div>

                <div className="flex gap-2 pt-2 justify-end">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-xl shadow-xs"
                  >
                    Add Document
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
