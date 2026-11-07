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
  AlertTriangle,
  Sun,
  Moon,
  User,
  Palette
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useApp } from '../context/AppContext';

export default function Settings() {
  const { resetDemo, logout, theme, toggleTheme } = useApp();
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
      saved: localStorage.getItem('grantly_saved_scholarships'),
      theme: localStorage.getItem('grantly_theme')
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
            <SettingsIcon className="w-5 h-5 text-brand-600 dark:text-brand-400" />
            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Settings & Preferences
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage appearance themes, notifications, data backups, and account settings
          </p>
        </div>

        {savedNote && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Preferences saved successfully!</span>
          </div>
        )}

        {/* THEME SELECTOR */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 transition-colors">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
            <Palette className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            <span>Appearance & Theme</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => theme === 'dark' && toggleTheme()}
              className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                theme === 'light'
                  ? 'border-brand-600 bg-brand-50/50 dark:bg-brand-950/40 ring-2 ring-brand-500/20'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                  <Sun className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Light Mode</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Crisp white & soft gray styling</p>
                </div>
              </div>
              {theme === 'light' && (
                <CheckCircle2 className="w-5 h-5 text-brand-600" />
              )}
            </button>

            <button
              type="button"
              onClick={() => theme === 'light' && toggleTheme()}
              className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                theme === 'dark'
                  ? 'border-brand-500 bg-brand-950/40 ring-2 ring-brand-500/20'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-900/60 text-indigo-400 flex items-center justify-center">
                  <Moon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Dark Mode</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Charcoal slate & high contrast</p>
                </div>
              </div>
              {theme === 'dark' && (
                <CheckCircle2 className="w-5 h-5 text-brand-400" />
              )}
            </button>
          </div>
        </div>

        {/* NOTIFICATION PREFERENCES */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 transition-colors">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
            <Bell className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            <span>In-App Alert Channels</span>
          </h3>

          <form onSubmit={handleSavePreferences} className="space-y-3">
            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 cursor-pointer">
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">Urgent Deadline Countdown Alerts</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Alert me when saved scholarships are within 3 days of closing</p>
              </div>
              <input
                type="checkbox"
                checked={deadlineReminders}
                onChange={(e) => setDeadlineReminders(e.target.checked)}
                className="h-4 w-4 text-brand-600 rounded"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 cursor-pointer">
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">High Compatibility Matching Pushes</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Notify when an opportunity matches ≥ 85% of your profile</p>
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
                className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-brand-600 hover:bg-brand-600 dark:hover:bg-brand-500 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Save Preferences
              </button>
            </div>
          </form>
        </div>

        {/* DATA BACKUP & RESTORE */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 transition-colors">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            <span>Local Storage & System Integrity</span>
          </h3>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-300 space-y-3">
            <p>
              GRANTLY stores student applications, document readiness metadata, custom tasks, and theme preferences securely in client storage.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                onClick={handleExportData}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Local JSON Backup</span>
              </button>

              <button
                onClick={() => {
                  resetDemo();
                  alert('Profile, saved scholarships, documents, and planner reset to default state.');
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 font-semibold hover:bg-brand-100 dark:hover:bg-brand-900/60 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Default State</span>
              </button>
            </div>
          </div>
        </div>

        {/* SIGN OUT */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between transition-colors">
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">Sign Out of Session</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Safely log out of your current student account session</p>
          </div>
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 hover:bg-rose-100 dark:hover:bg-rose-900/50 text-xs font-bold transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}