import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  Plus,
  Trash2,
  ChevronDown,
  Edit3,
  Compass,
  Sparkles,
  ArrowRight,
  Info
} from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useApp } from '../context/AppContext';
import { SAMPLE_APPLICATIONS_PREVIEW } from '../data/demoUser';

export default function Applications() {
  const { applications, updateApplicationStatus, updateApplicationNotes, removeApplication, allScholarships, addApplication } = useApp();

  const [filterStatus, setFilterStatus] = useState('All');
  const [editingAppId, setEditingAppId] = useState(null);
  const [tempNotes, setTempNotes] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedSchId, setSelectedSchId] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Interested');

  const statuses = [
    'Interested',
    'Preparing Documents',
    'Applied',
    'Under Review',
    'Approved',
    'Rejected'
  ];

  const filteredApplications = applications.filter((app) => {
    if (filterStatus === 'All') return true;
    return app.status === filterStatus;
  });

  const handleSaveNotes = (appId) => {
    updateApplicationNotes(appId, tempNotes);
    setEditingAppId(null);
  };

  const handleAddNewApp = (e) => {
    e.preventDefault();
    if (!selectedSchId) return;
    const scholarship = allScholarships.find((s) => s.id === selectedSchId);
    if (scholarship) {
      addApplication(scholarship, selectedStatus);
      setShowAddModal(false);
      setSelectedSchId('');
    }
  };

  const handleLoadSamplePreview = () => {
    SAMPLE_APPLICATIONS_PREVIEW.forEach(sample => {
      const exists = applications.some(a => a.scholarshipId === sample.scholarshipId);
      if (!exists) {
        const sch = allScholarships.find(s => s.id === sample.scholarshipId);
        if (sch) {
          addApplication(sch, sample.status, sample.notes);
        }
      }
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800';
      case 'Rejected':
        return 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800';
      case 'Under Review':
      case 'Applied':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800';
      case 'Preparing Documents':
        return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-6xl mx-auto">
        {/* HEADER & TOP STATS */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-brand-600 dark:text-brand-400" />
              <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Application Tracking Center
              </h1>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Log progress, document checklists, and submission timestamps ({applications.length} tracked)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-500/20 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Track New Opportunity</span>
            </button>
          </div>
        </div>

        {/* 5-STAGE VISUAL JOURNEY BANNER */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 text-center sm:text-left">
            Standard Application Lifecycle
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-center text-xs">
            <div className="flex-1 w-full p-2.5 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-900 dark:text-brand-300 font-bold border border-brand-200 dark:border-brand-800">
              1. DISCOVERED
            </div>
            <span className="text-slate-300 dark:text-slate-700 font-bold hidden sm:inline">→</span>
            <div className="flex-1 w-full p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-900 dark:text-indigo-300 font-bold border border-indigo-200 dark:border-indigo-800">
              2. ELIGIBILITY CHECKED
            </div>
            <span className="text-slate-300 dark:text-slate-700 font-bold hidden sm:inline">→</span>
            <div className="flex-1 w-full p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 font-bold border border-amber-200 dark:border-amber-800">
              3. DOCS PREPARED
            </div>
            <span className="text-slate-300 dark:text-slate-700 font-bold hidden sm:inline">→</span>
            <div className="flex-1 w-full p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-900 dark:text-purple-300 font-bold border border-purple-200 dark:border-purple-800">
              4. SUBMITTED
            </div>
            <span className="text-slate-300 dark:text-slate-700 font-bold hidden sm:inline">→</span>
            <div className="flex-1 w-full p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 font-bold border border-emerald-200 dark:border-emerald-800">
              5. FINAL RESULT
            </div>
          </div>
        </div>

        {/* FILTER TABS */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setFilterStatus('All')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              filterStatus === 'All'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
            }`}
          >
            All Applications ({applications.length})
          </button>
          {statuses.map((st) => {
            const count = applications.filter((a) => a.status === st).length;
            return (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  filterStatus === st
                    ? 'bg-brand-600 text-white'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                }`}
              >
                {st} ({count})
              </button>
            );
          })}
        </div>

        {/* APPLICATIONS LIST OR EMPTY STATE */}
        {applications.length === 0 ? (
          /* EMPTY STATE FOR CLEAN FIRST-TIME EXPERIENCE */
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 text-center border border-slate-200 dark:border-slate-800 space-y-5 max-w-lg mx-auto shadow-xs transition-colors">
            <div className="w-14 h-14 rounded-2xl bg-brand-50 dark:bg-brand-950/80 text-brand-600 dark:text-brand-400 flex items-center justify-center mx-auto">
              <Briefcase className="w-7 h-7" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Applications in Tracker Yet</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-md mx-auto">
                GRANTLY organizes your entire scholarship pipeline—from gathering documents to submission milestones—without missing deadlines.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
              <Link
                to="/explore"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition-all shadow-sm"
              >
                <Compass className="w-4 h-4" />
                <span>Explore Scholarships</span>
              </Link>

              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Track an Opportunity</span>
              </button>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80">
              <button
                type="button"
                onClick={handleLoadSamplePreview}
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Load Sample Tracker Records (For Evaluation)</span>
              </button>
            </div>
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-4 max-w-md mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center mx-auto">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">No applications under &quot;{filterStatus}&quot;</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                You can change the filter tab or update stages of your existing tracked opportunities.
              </p>
            </div>
            <button
              onClick={() => setFilterStatus('All')}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
            >
              Show All Applications
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredApplications.map((app) => (
              <div
                key={app.id}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-brand-300 dark:hover:border-slate-700 transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusBadge(app.status)}`}>
                        {app.status}
                      </span>
                      <span className="text-xs font-bold text-brand-700 dark:text-brand-400">{app.awardAmount}</span>
                      {app.isSample && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                          Sample Evaluation Record
                        </span>
                      )}
                    </div>

                    <Link
                      to={`/scholarship/${app.scholarshipId}`}
                      className="text-base font-bold text-slate-900 dark:text-white hover:text-brand-600 dark:hover:text-brand-400 transition-colors block"
                    >
                      {app.scholarshipTitle}
                    </Link>
                    <p className="text-xs text-slate-400 dark:text-slate-500">{app.organization}</p>
                  </div>

                  {/* Status Dropdown Controller */}
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <select
                        value={app.status}
                        onChange={(e) => updateApplicationStatus(app.id, e.target.value)}
                        className="pl-3 pr-8 py-1.5 text-xs font-bold text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none cursor-pointer"
                      >
                        {statuses.map((st) => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    <button
                      onClick={() => removeApplication(app.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                      title="Remove application from tracker"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Progress bar of current stage */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                    <span>Preparation & Review Progress</span>
                    <span>{app.progressPercent}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-brand-600 to-emerald-500 rounded-full transition-all duration-300"
                      style={{ width: `${app.progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Notes section with edit mode */}
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 text-xs">
                  {editingAppId === app.id ? (
                    <div className="space-y-2">
                      <textarea
                        value={tempNotes}
                        onChange={(e) => setTempNotes(e.target.value)}
                        className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs outline-none focus:border-brand-500 text-slate-900 dark:text-white"
                        rows={2}
                      />
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => setEditingAppId(null)}
                          className="px-2.5 py-1 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 text-xs cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSaveNotes(app.id)}
                          className="px-3 py-1 bg-brand-600 text-white rounded-lg text-xs font-semibold cursor-pointer"
                        >
                          Save Notes
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">Personal Application Notes</span>
                        <p className="text-slate-700 dark:text-slate-300 mt-0.5">{app.notes || 'No notes added yet.'}</p>
                      </div>
                      <button
                        onClick={() => {
                          setEditingAppId(app.id);
                          setTempNotes(app.notes || '');
                        }}
                        className="p-1 text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 shrink-0 cursor-pointer"
                        title="Edit notes"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Audit Timeline */}
                {app.timeline && app.timeline.length > 0 && (
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                    <p className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 mb-2">Stage History</p>
                    <div className="space-y-1.5 text-[11px]">
                      {app.timeline.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" />
                          <span className="font-semibold text-slate-800 dark:text-slate-200">{item.date}:</span>
                          <span>{item.title}</span>
                          <span className="text-slate-400 dark:text-slate-500">({item.description})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* MODAL: Track New Opportunity */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-xs" onClick={() => setShowAddModal(false)} />
            <div className="relative bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-800 z-10 space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Track Opportunity</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Choose a verified scholarship from the catalog to initialize a dedicated tracking lifecycle.
              </p>

              <form onSubmit={handleAddNewApp} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Select Scholarship</label>
                  <select
                    value={selectedSchId}
                    onChange={(e) => setSelectedSchId(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl focus:border-brand-500 outline-none"
                    required
                  >
                    <option value="">Choose scholarship...</option>
                    {allScholarships.map((s) => (
                      <option key={s.id} value={s.id}>{s.title} ({s.amount})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Initial Status</label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl focus:border-brand-500 outline-none"
                  >
                    {statuses.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-2 pt-2 justify-end">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
                  >
                    Initialize Application
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