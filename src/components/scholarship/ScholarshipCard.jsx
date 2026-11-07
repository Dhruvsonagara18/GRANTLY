import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bookmark,
  ArrowLeftRight,
  Calendar,
  Building,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  HelpCircle,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Tag
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import EligibilityBreakdownModal from './EligibilityBreakdownModal';

export default function ScholarshipCard({ scholarship, viewMode = 'grid' }) {
  const {
    isSaved,
    toggleSaveScholarship,
    isInCompare,
    addToCompare,
    removeFromCompare,
    addApplication,
    applications
  } = useApp();

  const [showEligibilityModal, setShowEligibilityModal] = useState(false);

  const saved = isSaved(scholarship.id);
  const compared = isInCompare(scholarship.id);
  const existingApp = applications.find(a => a.scholarshipId === scholarship.id);

  const { eligibility, deadlineInfo } = scholarship;
  const score = eligibility?.score ?? 0;

  // Match indicator badge styling
  let badgeTheme = {
    bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    icon: CheckCircle2,
    text: 'Likely Match'
  };

  if (score < 50) {
    badgeTheme = {
      bg: 'bg-rose-50 text-rose-700 border-rose-200',
      icon: XCircle,
      text: 'Low Match'
    };
  } else if (score < 80) {
    badgeTheme = {
      bg: 'bg-amber-50 text-amber-700 border-amber-200',
      icon: AlertTriangle,
      text: 'Needs Verification'
    };
  }

  const StatusIcon = badgeTheme.icon;

  if (viewMode === 'list') {
    return (
      <>
        <div className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-brand-300 hover:shadow-card-hover transition-all duration-200">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${badgeTheme.bg}`}>
                  <StatusIcon className="w-3.5 h-3.5" />
                  <span>{score}% — {badgeTheme.text}</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                  {scholarship.category}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200">
                  {scholarship.educationLevel}
                </span>
                {scholarship.location && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-50 text-slate-600 border border-slate-200">
                    📍 {scholarship.location === 'State' ? scholarship.state : 'All India'}
                  </span>
                )}
              </div>

              <Link to={`/scholarship/${scholarship.id}`} className="group">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                  {scholarship.title}
                </h3>
              </Link>

              <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                <Building className="w-3.5 h-3.5 text-slate-400" />
                <span>{scholarship.organization}</span>
              </div>
            </div>

            {/* Right Meta & Actions */}
            <div className="flex flex-wrap items-center gap-4 lg:gap-6 justify-between lg:justify-end border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-100">
              <div>
                <p className="text-[11px] text-slate-400 font-medium">Award Amount</p>
                <p className="text-base font-extrabold text-brand-700">{scholarship.amount}</p>
              </div>

              <div>
                <p className="text-[11px] text-slate-400 font-medium">Application Deadline</p>
                <p className={`text-xs font-semibold ${deadlineInfo?.isUrgent ? 'text-rose-600 font-bold' : 'text-slate-700'}`}>
                  {deadlineInfo?.formattedDate} ({deadlineInfo?.label})
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleSaveScholarship(scholarship.id)}
                  className={`p-2 rounded-xl border transition-colors ${
                    saved
                      ? 'bg-brand-50 border-brand-300 text-brand-600'
                      : 'border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50'
                  }`}
                  title={saved ? "Remove from saved" : "Save scholarship"}
                >
                  <Bookmark className={`w-4 h-4 ${saved ? 'fill-brand-600' : ''}`} />
                </button>

                <button
                  onClick={() => compared ? removeFromCompare(scholarship.id) : addToCompare(scholarship.id)}
                  className={`p-2 rounded-xl border transition-colors ${
                    compared
                      ? 'bg-indigo-50 border-indigo-300 text-indigo-600'
                      : 'border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50'
                  }`}
                  title={compared ? "In Comparison (Click to remove)" : "Add to Comparison (Max 3)"}
                >
                  <ArrowLeftRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setShowEligibilityModal(true)}
                  className="px-3 py-1.5 text-xs font-medium text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 rounded-xl transition-colors"
                >
                  Eligibility Details
                </button>

                <Link
                  to={`/scholarship/${scholarship.id}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs transition-all shadow-xs"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {showEligibilityModal && (
          <EligibilityBreakdownModal
            scholarship={scholarship}
            onClose={() => setShowEligibilityModal(false)}
          />
        )}
      </>
    );
  }

  // Grid View (Default)
  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between hover:border-brand-300 hover:shadow-card-hover transition-all duration-200 group relative">
        {/* Top Header: Match Badge & Action Buttons */}
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <button
              onClick={() => setShowEligibilityModal(true)}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-transform hover:scale-105 ${badgeTheme.bg}`}
              title="Click to view detailed deterministic criteria breakdown"
            >
              <StatusIcon className="w-3.5 h-3.5 shrink-0" />
              <span>{score}% Match</span>
            </button>

            <div className="flex items-center gap-1">
              <button
                onClick={() => compared ? removeFromCompare(scholarship.id) : addToCompare(scholarship.id)}
                className={`p-1.5 rounded-lg border transition-colors ${
                  compared
                    ? 'bg-indigo-50 border-indigo-300 text-indigo-600'
                    : 'border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50'
                }`}
                title={compared ? "In Comparison (Click to remove)" : "Compare up to 3 scholarships"}
              >
                <ArrowLeftRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => toggleSaveScholarship(scholarship.id)}
                className={`p-1.5 rounded-lg border transition-colors ${
                  saved
                    ? 'bg-brand-50 border-brand-300 text-brand-600'
                    : 'border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50'
                }`}
                title={saved ? "Saved" : "Save scholarship"}
              >
                <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-brand-600' : ''}`} />
              </button>
            </div>
          </div>

          {/* Title & Organization */}
          <Link to={`/scholarship/${scholarship.id}`} className="block group-hover:text-brand-600 transition-colors">
            <h3 className="font-bold text-slate-900 text-base leading-snug line-clamp-2 mb-1 group-hover:text-brand-600 transition-colors">
              {scholarship.title}
            </h3>
          </Link>

          <p className="text-xs text-slate-500 flex items-center gap-1.5 mb-3">
            <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{scholarship.organization}</span>
          </p>

          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
            {scholarship.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-600">
              {scholarship.category}
            </span>
            <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-indigo-50 text-indigo-700">
              {scholarship.educationLevel}
            </span>
            <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-50 text-slate-500 border border-slate-200">
              {scholarship.location === 'State' ? scholarship.state : 'National'}
            </span>
          </div>
        </div>

        {/* Footer Meta & CTAs */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase font-semibold text-slate-400">Award Value</p>
              <p className="text-base font-extrabold text-brand-700">{scholarship.amount}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase font-semibold text-slate-400">Deadline</p>
              <p className={`text-xs font-semibold ${deadlineInfo?.isUrgent ? 'text-rose-600 font-bold' : 'text-slate-700'}`}>
                {deadlineInfo?.label}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setShowEligibilityModal(true)}
              className="w-full py-2 px-2 text-center text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 rounded-xl transition-colors"
            >
              Check Fit
            </button>
            <Link
              to={`/scholarship/${scholarship.id}`}
              className="w-full py-2 px-2 text-center text-xs font-semibold text-white bg-slate-900 hover:bg-brand-700 rounded-xl transition-colors flex items-center justify-center gap-1"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {showEligibilityModal && (
        <EligibilityBreakdownModal
          scholarship={scholarship}
          onClose={() => setShowEligibilityModal(false)}
        />
      )}
    </>
  );
}
