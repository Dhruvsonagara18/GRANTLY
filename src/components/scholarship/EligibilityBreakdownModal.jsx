import React from 'react';
import {
  X,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  AlertCircle,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Bookmark,
  ExternalLink,
  HelpCircle,
  FileCheck2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function EligibilityBreakdownModal({ scholarship, onClose }) {
  const { isSaved, toggleSaveScholarship, addApplication } = useApp();
  const { eligibility } = scholarship;

  const saved = isSaved(scholarship.id);

  const verdict = eligibility?.verdict || "Potentially Eligible";
  const isEligible = verdict === "Eligible";
  const isPotentially = verdict === "Potentially Eligible";
  const isNotEligible = verdict === "Not Eligible";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200 my-8">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-brand-900 via-brand-800 to-indigo-900 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-brand-200">
            <Sparkles className="w-4 h-4 text-brand-300" />
            <span>Deterministic Match Evaluation</span>
          </div>

          <h2 className="text-xl font-bold pr-8">{scholarship.title}</h2>
          <p className="text-xs text-brand-200 mt-1">{scholarship.organization}</p>

          {/* Large Match Display */}
          <div className="mt-5 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-white">{eligibility.score}%</span>
                <span className="text-sm font-bold text-brand-200">Indicative Compatibility</span>
              </div>
              <p className="text-xs text-slate-200 mt-1">
                {eligibility.summary}
              </p>
            </div>

            <div className="shrink-0">
              <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold border ${
                isEligible
                  ? 'bg-emerald-500/20 text-emerald-200 border-emerald-400/40'
                  : isPotentially
                  ? 'bg-amber-500/20 text-amber-200 border-amber-400/40'
                  : 'bg-rose-500/20 text-rose-200 border-rose-400/40'
              }`}>
                {isEligible && <CheckCircle2 className="w-4 h-4 text-emerald-300" />}
                {isPotentially && <AlertTriangle className="w-4 h-4 text-amber-300" />}
                {isNotEligible && <XCircle className="w-4 h-4 text-rose-300" />}
                <span>{verdict}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6 text-slate-900 dark:text-slate-100">
          {/* Reasons for Ineligibility Banner (if any) */}
          {eligibility.reasonsForIneligibility && eligibility.reasonsForIneligibility.length > 0 && (
            <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 space-y-2">
              <h4 className="text-xs font-bold text-rose-900 dark:text-rose-200 flex items-center gap-1.5">
                <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                <span>Reasons for Ineligibility</span>
              </h4>
              <ul className="space-y-1 text-xs text-rose-800 dark:text-rose-300 list-disc list-inside">
                {eligibility.reasonsForIneligibility.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Missing Information Banner (if any) */}
          {eligibility.missingInfo && eligibility.missingInfo.length > 0 && (
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 space-y-2">
              <h4 className="text-xs font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Information Needed to Complete Verification</span>
              </h4>
              <ul className="space-y-1 text-xs text-amber-800 dark:text-amber-300 list-disc list-inside">
                {eligibility.missingInfo.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Satisfied Criteria */}
          {eligibility.matchedConditions.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5 mb-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Satisfied Conditions ({eligibility.matchedConditions.length})</span>
              </h4>
              <div className="space-y-2">
                {eligibility.matchedConditions.map((cond, i) => (
                  <div key={i} className="p-3 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-800 text-xs">
                    <p className="font-semibold text-emerald-950 dark:text-emerald-200">{cond.title}</p>
                    <p className="text-emerald-800 dark:text-emerald-300 mt-0.5">{cond.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Unmatched Conditions & Gap Analysis */}
          {eligibility.unmatchedConditions.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400 flex items-center gap-1.5 mb-2.5">
                <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                <span>Unmet Criteria / Discrepancies ({eligibility.unmatchedConditions.length})</span>
              </h4>
              <div className="space-y-2">
                {eligibility.unmatchedConditions.map((cond, i) => (
                  <div key={i} className="p-3 rounded-xl bg-rose-50/60 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-800 text-xs">
                    <p className="font-semibold text-rose-950 dark:text-rose-200">{cond.title}</p>
                    <p className="text-rose-800 dark:text-rose-300 mt-0.5">{cond.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Application Requirements Checklist */}
          {scholarship.documents && scholarship.documents.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-2.5">
                <FileCheck2 className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                <span>Official Documentation Requirements ({scholarship.documents.length})</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {scholarship.documents.map((doc, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                    <span className="font-medium text-slate-800 dark:text-slate-200">📄 {doc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Transparency Disclaimer */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-500 dark:text-slate-400 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-700 dark:text-slate-300">Official Award Notice:</p>
              <p className="mt-0.5">{eligibility.disclaimer}</p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleSaveScholarship(scholarship.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-colors flex items-center gap-1.5 cursor-pointer ${
                saved
                  ? 'bg-brand-50 dark:bg-brand-950/80 border-brand-300 dark:border-brand-700 text-brand-700 dark:text-brand-300'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-brand-700 dark:fill-brand-400' : ''}`} />
              <span>{saved ? 'Saved in Watchlist' : 'Save Scholarship'}</span>
            </button>

            {scholarship.officialUrl && (
              <a
                href={scholarship.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 flex items-center gap-1.5"
              >
                <span>Official Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                addApplication(scholarship, 'Preparing Documents');
                onClose();
              }}
              className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
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