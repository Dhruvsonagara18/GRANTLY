import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Clock,
  AlertTriangle,
  Calendar,
  CheckCircle2,
  CalendarDays,
  ArrowRight,
  Bookmark,
  Building,
  BellRing
} from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useApp } from '../context/AppContext';
import { groupScholarshipsByDeadline } from '../utils/deadline';

export default function Deadlines() {
  const { allScholarships, isSaved, toggleSaveScholarship, addApplication } = useApp();
  const [activeTab, setActiveTab] = useState('urgent'); // urgent, upcoming, later, closed

  const grouped = groupScholarshipsByDeadline(allScholarships);

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-rose-600 dark:text-rose-400" />
              <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Deadline Intelligence Center
              </h1>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Time-sensitive urgency radar calculated with dynamic day/hour offsets
            </p>
          </div>

          <Link
            to="/calendar"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 text-xs font-semibold shadow-xs transition-colors"
          >
            <CalendarDays className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            <span>Open Monthly Calendar</span>
          </Link>
        </div>

        {/* 4 CATEGORY STATUS CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => setActiveTab('urgent')}
            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
              activeTab === 'urgent'
                ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 ring-2 ring-rose-500/20 shadow-xs'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">Urgent</span>
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
            </div>
            <p className="text-2xl font-black text-rose-700 dark:text-rose-400">{grouped.urgent.length}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Closing in ≤ 3 days</p>
          </button>

          <button
            onClick={() => setActiveTab('upcoming')}
            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
              activeTab === 'upcoming'
                ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 ring-2 ring-amber-500/20 shadow-xs'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">Upcoming</span>
              <span className="w-2 h-2 rounded-full bg-amber-500" />
            </div>
            <p className="text-2xl font-black text-amber-700 dark:text-amber-400">{grouped.upcoming.length}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Closing in ≤ 7 days</p>
          </button>

          <button
            onClick={() => setActiveTab('later')}
            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
              activeTab === 'later'
                ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-800 ring-2 ring-indigo-500/20 shadow-xs'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Later</span>
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
            </div>
            <p className="text-2xl font-black text-indigo-700 dark:text-indigo-400">{grouped.later.length}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">&gt; 7 days window</p>
          </button>

          <button
            onClick={() => setActiveTab('closed')}
            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
              activeTab === 'closed'
                ? 'bg-slate-100 dark:bg-slate-800 border-slate-400 dark:border-slate-600 ring-2 ring-slate-400/20 shadow-xs'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Archived</span>
              <span className="w-2 h-2 rounded-full bg-slate-400" />
            </div>
            <p className="text-2xl font-black text-slate-700 dark:text-slate-300">{grouped.closed.length}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Past deadline</p>
          </button>
        </div>

        {/* LIST OF SCHOLARSHIPS IN SELECTED CATEGORY */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 transition-colors">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 dark:text-white text-base capitalize">
              {activeTab} Opportunities ({grouped[activeTab].length})
            </h3>
            <span className="text-xs text-slate-400 dark:text-slate-500">
              Reference Time: Active 2026 Academic Cycle
            </span>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {grouped[activeTab].map((sch) => {
              const saved = isSaved(sch.id);
              return (
                <div
                  key={sch.id}
                  className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 p-2 rounded-2xl transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${sch.eligibility?.statusClass}`}>
                        {sch.eligibility?.score}% Match
                      </span>
                      <span className="text-xs font-bold text-brand-700 dark:text-brand-400">{sch.amount}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium">
                        {sch.category}
                      </span>
                    </div>

                    <Link
                      to={`/scholarship/${sch.id}`}
                      className="text-sm font-bold text-slate-900 dark:text-white hover:text-brand-600 dark:hover:text-brand-400 transition-colors block"
                    >
                      {sch.title}
                    </Link>
                    <p className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5" />
                      <span>{sch.organization}</span>
                    </p>
                  </div>

                  {/* Right Deadline Countdown & CTAs */}
                  <div className="flex flex-wrap items-center gap-3 shrink-0">
                    <div className="text-right">
                      <p className={`text-xs font-extrabold ${sch.deadlineInfo.isUrgent ? 'text-rose-600 dark:text-rose-400' : 'text-slate-800 dark:text-slate-200'}`}>
                        {sch.deadlineInfo.label}
                      </p>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500">{sch.deadlineInfo.formattedDate}</p>
                    </div>

                    <button
                      onClick={() => toggleSaveScholarship(sch.id)}
                      className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                        saved
                          ? 'bg-brand-50 dark:bg-brand-950/50 border-brand-300 dark:border-brand-800 text-brand-600 dark:text-brand-400'
                          : 'border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                      }`}
                      title={saved ? 'Saved' : 'Save'}
                    >
                      <Bookmark className={`w-4 h-4 ${saved ? 'fill-brand-600 dark:fill-brand-400' : ''}`} />
                    </button>

                    <Link
                      to={`/scholarship/${sch.id}`}
                      className="px-3.5 py-2 rounded-xl bg-slate-900 dark:bg-brand-600 hover:bg-brand-600 dark:hover:bg-brand-500 text-white font-bold text-xs transition-colors flex items-center gap-1"
                    >
                      <span>Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}