import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  Bell,
  ShieldCheck,
  RotateCcw,
  Trash2,
  Download,
  CheckCircle2,
  LogOut,
  AlertTriangle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useApp } from '../context/AppContext';

export default function Settings() {
  const { resetDemo, logout } = useApp();
  const navigate = useNavigate();

  const [emailAlerts, setEmailAlerts] = useState(true);
  const [deadlineReminders, setDeadlineReminders] = useState(true);
  const [matchAlerts, setMatchAlerts] = useState(true);
  const [savedNote, setSavedNote] = useState(false);

  const handleSavePreferences = (e) => {
    e.preventDefault();
    setSavedNote(true);
    setTimeout(() => setSavedNote(false), 2500);
  };

  const handleExportData = () => {
    const data = {
      user: localStorage.getItem('grantly_user_profile'),
      applications: localStorage.getItem('grantly_applications'),
      documents: localStorage.getItem('grantly_documents'),
      tasks: localStorage.getItem('grantly_planner_tasks'),
      saved: localStorage.getItem('grantly_saved_scholarships')
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `grantly-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* HEADER */}
        <div>
          <div className="flex items-center gap-2">
            <SettingsIcon className="w-5 h-5 text-brand-600" />
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Settings & Preferences
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Manage notifications, local sandbox sessions, and demo data state
          </p>
        </div>

        {savedNote && (
          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Preferences saved successfully!</span>
          </div>
        )}

        {/* NOTIFICATION PREFERENCES */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Bell className="w-4 h-4 text-brand-600" />
            <span>In-App Alert Channels</span>
          </h3>

          <form onSubmit={handleSavePreferences} className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100 cursor-pointer">
              <div>
                <p className="text-xs font-bold text-slate-900">Urgent Deadline Countdown Alerts</p>
                <p className="text-[11px] text-slate-500">Alert me when saved scholarships are within 3 days of closing</p>
              </div>
              <input
                type="checkbox"
                checked={deadlineReminders}
                onChange={(e) => setDeadlineReminders(e.target.checked)}
                className="h-4 w-4 text-brand-600 rounded"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100 cursor-pointer">
              <div>
                <p className="text-xs font-bold text-slate-900">High Compatibility Matching Pushes</p>
                <p className="text-[11px] text-slate-500">Notify when an opportunity matches ≥ 85% of your profile</p>
              </div>
              <input
                type="checkbox"
                checked={matchAlerts}
                onChange={(e) => setMatchAlerts(e.target.checked)}
                className="h-4 w-4 text-brand-600 rounded"
              />
            </label>

            <div className="pt-2">
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-brand-600 text-white font-bold text-xs transition-colors"
              >
                Save Preferences
              </button>
            </div>
          </form>
        </div>

        {/* DATA BACKUP & DEMO RESET */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-600" />
            <span>LocalStorage Session & Demo Data</span>
          </h3>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 space-y-3">
            <p>
              GRANTLY stores student applications, document lockers, and tasks in your local browser sandbox without requiring an external centralized database for prototype evaluations.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                onClick={handleExportData}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold hover:bg-slate-100 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Local JSON Backup</span>
              </button>

              <button
                onClick={() => {
                  resetDemo();
                  alert('Demo account, saved scholarships, documents, and planner reset to fresh benchmarks!');
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-brand-50 border border-brand-200 text-brand-700 font-semibold hover:bg-brand-100 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Hackathon Demo Benchmarks</span>
              </button>
            </div>
          </div>
        </div>

        {/* SIGN OUT */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold text-slate-900">Sign Out of Session</h4>
            <p className="text-[11px] text-slate-500">Conclude your active demo review session</p>
          </div>
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 text-xs font-bold transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
