import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  FileText,
  Calendar,
  Building,
  ArrowRight,
  Edit3,
  Trash2,
  ChevronDown,
  Filter
} from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useApp } from '../context/AppContext';

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

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Rejected':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Under Review':
      case 'Applied':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Preparing Documents':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-6xl mx-auto">
        {/* HEADER & TOP STATS */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-brand-600" />
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                Application Tracking Center
              </h1>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Log progress, document checklists, and submission timestamps ({applications.length} tracked)
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-500/20 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Track New Opportunity</span>
            </button>
          </div>
        </div>

        {/* 5-STAGE VISUAL JOURNEY BANNER */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3 text-center sm:text-left">
            Standard Application Lifecycle
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-center text-xs">
            <div className="flex-1 w-full p-2.5 rounded-xl bg-brand-50 text-brand-900 font-bold border border-brand-200">
              1. DISCOVERED
            </div>
            <span className="text-slate-300 font-bold hidden sm:inline">→</span>
            <div className="flex-1 w-full p-2.5 rounded-xl bg-indigo-50 text-indigo-900 font-bold border border-indigo-200">
              2. ELIGIBILITY CHECKED
            </div>
            <span className="text-slate-300 font-bold hidden sm:inline">→</span>
            <div className="flex-1 w-full p-2.5 rounded-xl bg-amber-50 text-amber-900 font-bold border border-amber-200">
              3. DOCS PREPARED
            </div>
            <span className="text-slate-300 font-bold hidden sm:inline">→</span>
            <div className="flex-1 w-full p-2.5 rounded-xl bg-purple-50 text-purple-900 font-bold border border-purple-200">
              4. SUBMITTED
            </div>
            <span className="text-slate-300 font-bold hidden sm:inline">→</span>
            <div className="flex-1 w-full p-2.5 rounded-xl bg-emerald-50 text-emerald-900 font-bold border border-emerald-200">
              5. FINAL RESULT
            </div>
          </div>
        </div>

        {/* FILTER TABS */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setFilterStatus('All')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              filterStatus === 'All'
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
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
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  filterStatus === st
                    ? 'bg-brand-600 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {st} ({count})
              </button>
            );
          })}
        </div>

        {/* APPLICATIONS LIST */}
        {filteredApplications.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4 max-w-md mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">No applications under this filter</h3>
              <p className="text-xs text-slate-500 mt-1">
                You can move items between stages or track new scholarships from the catalog.
              </p>
            </div>
            <button
              onClick={() => setFilterStatus('All')}
              className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200"
            >
              Show All Applications
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredApplications.map((app) => (
              <div
                key={app.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:border-brand-300 transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusBadge(app.status)}`}>
                        {app.status}
                      </span>
                      <span className="text-xs font-bold text-brand-700">{app.awardAmount}</span>
                    </div>

                    <Link
                      to={`/scholarship/${app.scholarshipId}`}
                      className="text-base font-bold text-slate-900 hover:text-brand-600 transition-colors block"
                    >
                      {app.scholarshipTitle}
                    </Link>
                    <p className="text-xs text-slate-400">{app.organization}</p>
                  </div>

                  {/* Status Dropdown Controller */}
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <select
                        value={app.status}
                        onChange={(e) => updateApplicationStatus(app.id, e.target.value)}
                        className="pl-3 pr-8 py-1.5 text-xs font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none cursor-pointer"
                      >
                        {statuses.map((st) => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    <button
                      onClick={() => removeApplication(app.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Remove application from tracker"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Progress bar of current stage */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-semibold text-slate-500">
                    <span>Preparation & Review Progress</span>
                    <span>{app.progressPercent}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-brand-600 to-emerald-500 rounded-full transition-all duration-300"
                      style={{ width: `${app.progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Notes section with edit mode */}
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs">
                  {editingAppId === app.id ? (
                    <div className="space-y-2">
                      <textarea
                        value={tempNotes}
                        onChange={(e) => setTempNotes(e.target.value)}
                        className="w-full p-2 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:border-brand-500"
                        rows={2}
                      />
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => setEditingAppId(null)}
                          className="px-2.5 py-1 text-slate-500 hover:text-slate-700 text-xs"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSaveNotes(app.id)}
                          className="px-3 py-1 bg-brand-600 text-white rounded-lg text-xs font-semibold"
                        >
                          Save Notes
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Personal Application Notes</span>
                        <p className="text-slate-700 mt-0.5">{app.notes || 'No notes added yet.'}</p>
                      </div>
                      <button
                        onClick={() => {
                          setEditingAppId(app.id);
                          setTempNotes(app.notes || '');
                        }}
                        className="p-1 text-slate-400 hover:text-brand-600 shrink-0"
                        title="Edit notes"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Audit Timeline */}
                {app.timeline && app.timeline.length > 0 && (
                  <div className="pt-2 border-t border-slate-100">
                    <p className="text-[10px] uppercase font-bold text-slate-400 mb-2">Stage History</p>
                    <div className="space-y-1.5 text-[11px]">
                      {app.timeline.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-slate-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" />
                          <span className="font-semibold text-slate-800">{item.date}:</span>
                          <span>{item.title}</span>
                          <span className="text-slate-400">({item.description})</span>
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
            <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs" onClick={() => setShowAddModal(false)} />
            <div className="relative bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 z-10 space-y-4">
              <h3 className="text-base font-bold text-slate-900">Track New Scholarship</h3>
              <p className="text-xs text-slate-500">
                Choose an opportunity from the GRANTLY catalog to initialize a dedicated tracking lifecycle.
              </p>

              <form onSubmit={handleAddNewApp} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Select Scholarship</label>
                  <select
                    value={selectedSchId}
                    onChange={(e) => setSelectedSchId(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-500 outline-none"
                    required
                  >
                    <option value="">Choose scholarship...</option>
                    {allScholarships.map((s) => (
                      <option key={s.id} value={s.id}>{s.title} ({s.amount})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Initial Status</label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-500 outline-none"
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
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-xl shadow-xs"
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
