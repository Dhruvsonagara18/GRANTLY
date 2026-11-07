import React from 'react';
import {
  X,
  CheckCircle2,
  XCircle,
  AlertCircle,
  HelpCircle,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Bookmark
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export default function EligibilityBreakdownModal({ scholarship, onClose }) {
  const { user, isSaved, toggleSaveScholarship, addApplication } = useApp();
  const { eligibility } = scholarship;

  const saved = isSaved(scholarship.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200 my-8">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-brand-900 via-brand-800 to-indigo-900 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-brand-200">
            <Sparkles className="w-4 h-4 text-brand-300" />
            <span>Deterministic Match Engine</span>
          </div>

          <h2 className="text-xl font-bold pr-8">{scholarship.title}</h2>
          <p className="text-xs text-brand-200 mt-1">{scholarship.organization}</p>

          {/* Large Match Display */}
          <div className="mt-5 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-white">{eligibility.score}%</span>
                <span className="text-sm font-bold text-brand-200">Compatibility Score</span>
              </div>
              <p className="text-xs text-slate-200 mt-1">
                {eligibility.summary}
              </p>
            </div>

            <div className="shrink-0">
              <span className={`inline-block px-3 py-1.5 rounded-xl text-xs font-bold border ${eligibility.statusClass}`}>
                {eligibility.status}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">
          {/* 4-Pillar Score Breakdown */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Scoring Weights (25% per pillar)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <p className="text-[10px] text-slate-500 font-medium">Education Level</p>
                <p className="text-base font-extrabold text-slate-900 mt-0.5">
                  {eligibility.breakdown.education} / 25
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <p className="text-[10px] text-slate-500 font-medium">Academic Cutoff</p>
                <p className="text-base font-extrabold text-slate-900 mt-0.5">
                  {eligibility.breakdown.academic} / 25
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <p className="text-[10px] text-slate-500 font-medium">Family Income</p>
                <p className="text-base font-extrabold text-slate-900 mt-0.5">
                  {eligibility.breakdown.income} / 25
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <p className="text-[10px] text-slate-500 font-medium">Location / State</p>
                <p className="text-base font-extrabold text-slate-900 mt-0.5">
                  {eligibility.breakdown.location} / 25
                </p>
              </div>
            </div>
          </div>

          {/* Satisfied Criteria */}
          {eligibility.matchedConditions.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5 mb-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Satisfied Conditions ({eligibility.matchedConditions.length})</span>
              </h4>
              <div className="space-y-2">
                {eligibility.matchedConditions.map((cond, i) => (
                  <div key={i} className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 text-xs">
                    <p className="font-semibold text-emerald-950">{cond.title}</p>
                    <p className="text-emerald-800 mt-0.5">{cond.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Unmatched Conditions & Gap Analysis */}
          {eligibility.unmatchedConditions.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-700 flex items-center gap-1.5 mb-2.5">
                <XCircle className="w-4 h-4 text-rose-600" />
                <span>Eligibility Gaps ({eligibility.unmatchedConditions.length})</span>
              </h4>
              <div className="space-y-2">
                {eligibility.unmatchedConditions.map((cond, i) => (
                  <div key={i} className="p-3 rounded-xl bg-rose-50/60 border border-rose-100 text-xs">
                    <p className="font-semibold text-rose-950">{cond.title}</p>
                    <p className="text-rose-800 mt-0.5">{cond.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gap Analysis Insights */}
          {eligibility.gaps && eligibility.gaps.length > 0 && (
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
              <h4 className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>Gap Advisory & Next Steps</span>
              </h4>
              {eligibility.gaps.map((gap, idx) => (
                <div key={idx} className="text-xs text-amber-800">
                  <p>• <strong>{gap.criterion}:</strong> Required <em>{gap.required}</em> (Current: {gap.current}).</p>
                  <p className="text-amber-700 text-[11px] mt-0.5">{gap.advice}</p>
                </div>
              ))}
            </div>
          )}

          {/* Transparency Disclaimer */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
            <p>
              <strong>Important Notice:</strong> This score represents an estimated compatibility calculation based on self-reported profile data. Final grant decisions are solely determined by {scholarship.organization} upon document verification.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => toggleSaveScholarship(scholarship.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-colors flex items-center gap-1.5 ${
              saved
                ? 'bg-brand-50 border-brand-300 text-brand-700'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-brand-700' : ''}`} />
            <span>{saved ? 'Saved in Watchlist' : 'Save Scholarship'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                addApplication(scholarship, 'Preparing Documents');
                onClose();
              }}
              className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
            >
              <span>Track Application</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
