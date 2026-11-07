import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Bookmark,
  ArrowLeftRight,
  Building,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileText,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Share2,
  ExternalLink,
  HelpCircle,
  Calendar,
  AlertCircle
} from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import EligibilityBreakdownModal from '../components/scholarship/EligibilityBreakdownModal';
import { useApp } from '../context/AppContext';

export default function ScholarshipDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    allScholarships,
    isSaved,
    toggleSaveScholarship,
    isInCompare,
    addToCompare,
    removeFromCompare,
    addApplication,
    applications,
    documents
  } = useApp();

  const [showEligibilityModal, setShowEligibilityModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const scholarship = allScholarships.find((s) => s.id === id);

  if (!scholarship) {
    return (
      <DashboardLayout>
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-4 max-w-lg mx-auto my-12">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Scholarship Not Found</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            The scholarship record you requested might have expired or does not exist in our catalog.
          </p>
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-600 text-white text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Explore</span>
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const saved = isSaved(scholarship.id);
  const compared = isInCompare(scholarship.id);
  const existingApp = applications.find((a) => a.scholarshipId === scholarship.id);

  const { eligibility, deadlineInfo } = scholarship;
  const verdict = eligibility?.verdict || "Potentially Eligible";
  const isEligible = verdict === "Eligible";
  const isPotentially = verdict === "Potentially Eligible";
  const isNotEligible = verdict === "Not Eligible";

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleTrackApplication = (initialStatus = 'Preparing Documents') => {
    addApplication(scholarship, initialStatus);
    navigate('/applications');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between">
          <Link
            to="/explore"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Explore Scholarships</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-medium flex items-center gap-1.5 shadow-xs cursor-pointer"
              title="Copy link"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">{copiedLink ? 'Copied!' : 'Share'}</span>
            </button>

            <button
              onClick={() => compared ? removeFromCompare(scholarship.id) : addToCompare(scholarship.id)}
              className={`p-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer ${
                compared
                  ? 'bg-indigo-50 dark:bg-indigo-950/80 border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <ArrowLeftRight className="w-4 h-4" />
              <span className="hidden sm:inline">{compared ? 'In Comparison' : 'Compare'}</span>
            </button>

            <button
              onClick={() => toggleSaveScholarship(scholarship.id)}
              className={`p-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer ${
                saved
                  ? 'bg-brand-50 dark:bg-brand-950/80 border-brand-300 dark:border-brand-700 text-brand-700 dark:text-brand-300'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${saved ? 'fill-brand-700 dark:fill-brand-400' : ''}`} />
              <span className="hidden sm:inline">{saved ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>

        {/* TOP HERO OVERVIEW CARD */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-card space-y-6 transition-colors">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="space-y-3 flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowEligibilityModal(true)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-transform hover:scale-105 cursor-pointer ${
                    isEligible
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
                      : isPotentially
                      ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
                      : 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
                  }`}
                >
                  {isEligible && <CheckCircle2 className="w-3.5 h-3.5" />}
                  {isPotentially && <AlertTriangle className="w-3.5 h-3.5" />}
                  {isNotEligible && <XCircle className="w-3.5 h-3.5" />}
                  <span>{verdict} — {eligibility.score}% Compat</span>
                </button>

                {scholarship.isVerified ? (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{scholarship.verificationStatus || 'Verified Scheme'}</span>
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                    Illustrative Sample Record
                  </span>
                )}

                <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {scholarship.category}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">
                  {scholarship.educationLevel}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                  📍 {scholarship.location === 'State' ? scholarship.state : 'All India'}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                {scholarship.title}
              </h1>

              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                <Building className="w-4 h-4 text-slate-400" />
                <span className="font-semibold text-slate-800 dark:text-slate-200">{scholarship.organization}</span>
                <span className="text-slate-300 dark:text-slate-600">•</span>
                <span>{scholarship.fundingType} Scheme</span>
                {scholarship.lastVerified && (
                  <>
                    <span className="text-slate-300 dark:text-slate-600">•</span>
                    <span className="text-[11px] text-slate-400 dark:text-slate-500">Verified: {scholarship.lastVerified}</span>
                  </>
                )}
              </div>
            </div>

            {/* Right Meta Column: Award & Deadline */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-brand-50 to-indigo-50/50 dark:from-slate-800 dark:to-brand-950/40 border border-brand-200/80 dark:border-slate-700 shrink-0 w-full md:w-72 space-y-3 text-center sm:text-left">
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">Award Amount</p>
                <p className="text-2xl font-black text-brand-700 dark:text-brand-400">{scholarship.amount}</p>
              </div>

              <div className="pt-2 border-t border-brand-100 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">Deadline</p>
                  <p className={`text-xs font-bold ${deadlineInfo?.isUrgent ? 'text-rose-600 dark:text-rose-400' : 'text-slate-800 dark:text-slate-200'}`}>
                    {deadlineInfo?.formattedDate}
                  </p>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  deadlineInfo?.isUrgent ? 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300' : 'bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300'
                }`}>
                  {deadlineInfo?.label}
                </span>
              </div>

              {scholarship.officialUrl && (
                <a
                  href={scholarship.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-brand-400 text-slate-700 dark:text-slate-200 hover:text-brand-600 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                >
                  <span>Open Official Application Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              {existingApp ? (
                <Link
                  to="/applications"
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-brand-600 dark:bg-brand-600 text-white font-bold text-xs text-center block transition-colors shadow-sm"
                >
                  Status: {existingApp.status} (Open Tracker)
                </Link>
              ) : (
                <button
                  onClick={() => handleTrackApplication('Preparing Documents')}
                  className="w-full py-2.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Track in My Applications</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed pt-2 border-t border-slate-100 dark:border-slate-800">
            {scholarship.description}
          </p>
        </div>

        {/* TWO-COLUMN DETAILS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Main: Eligibility Details, Gaps, Required Docs */}
          <div className="lg:col-span-8 space-y-6">
            {/* Deterministic Match Breakdown */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">Eligibility Evaluation</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowEligibilityModal(true)}
                  className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline cursor-pointer"
                >
                  View Full Report
                </button>
              </div>

              {/* Ineligibility Reasons (if any) */}
              {eligibility.reasonsForIneligibility && eligibility.reasonsForIneligibility.length > 0 && (
                <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-800 dark:text-rose-300 space-y-1">
                  <p className="font-bold text-rose-950 dark:text-rose-200 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                    <span>Ineligibility Notice</span>
                  </p>
                  <ul className="list-disc list-inside space-y-0.5 text-[11px] pt-1">
                    {eligibility.reasonsForIneligibility.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Missing Information (if any) */}
              {eligibility.missingInfo && eligibility.missingInfo.length > 0 && (
                <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-300 space-y-1">
                  <p className="font-bold text-amber-950 dark:text-amber-200 flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span>Missing Verification Information</span>
                  </p>
                  <ul className="list-disc list-inside space-y-0.5 text-[11px] pt-1">
                    {eligibility.missingInfo.map((m, i) => (
                      <li key={i}>{m}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Matched & Unmatched List */}
              <div className="space-y-2 pt-2">
                {eligibility.matchedConditions.map((c, i) => (
                  <div key={i} className="p-3 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-800 text-xs flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-emerald-950 dark:text-emerald-200">{c.title}</p>
                      <p className="text-emerald-800 dark:text-emerald-300 text-[11px] mt-0.5">{c.detail}</p>
                    </div>
                  </div>
                ))}

                {eligibility.unmatchedConditions.map((c, i) => (
                  <div key={i} className="p-3 rounded-xl bg-rose-50/60 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-800 text-xs flex items-start gap-2.5">
                    <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-rose-950 dark:text-rose-200">{c.title}</p>
                      <p className="text-rose-800 dark:text-rose-300 text-[11px] mt-0.5">{c.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Document Checklist for this Scholarship */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">Required Document Checklist</h3>
                </div>
                <Link to="/documents" className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline">
                  Document Locker
                </Link>
              </div>

              <div className="space-y-2">
                {scholarship.documents.map((docName, idx) => {
                  const isReady = documents.some(d => d.name.toLowerCase().includes(docName.toLowerCase().split(' ')[0]) && d.status === 'Ready');
                  return (
                    <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-md bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center text-[10px] font-bold text-slate-600 dark:text-slate-300">
                          {idx + 1}
                        </span>
                        <span className="font-medium text-slate-800 dark:text-slate-200">{docName}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isReady
                          ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                          : 'bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                      }`}>
                        {isReady ? 'Prepared in Locker' : 'Pending Preparation'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Application Instructions */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 transition-colors">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Application Instructions</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {scholarship.applicationInstructions}
              </p>
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="text-slate-500 dark:text-slate-400">Official Source: {scholarship.officialSource}</span>
                {scholarship.officialUrl && (
                  <a
                    href={scholarship.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-brand-600 dark:text-brand-400 hover:underline"
                  >
                    <span>Visit Authority Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar: Criteria Snapshot, Quick Actions */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 transition-colors">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Eligibility Criteria Snapshot</h3>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-400 dark:text-slate-500 block font-medium">Minimum Academic Cutoff</span>
                  <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">{scholarship.academicCriteria?.description}</p>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-slate-400 dark:text-slate-500 block font-medium">Family Income Limit</span>
                  <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">{scholarship.incomeCriteria?.description}</p>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-slate-400 dark:text-slate-500 block font-medium">Field of Study</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {scholarship.fieldOfStudy?.map((f, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px]">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-slate-400 dark:text-slate-500 block font-medium">Available Seats / Recipients</span>
                  <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                    {scholarship.seatsAvailable} awards across {scholarship.totalApplicants} applicants
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Ask Assistant Callout */}
            <div className="bg-gradient-to-tr from-brand-900 to-indigo-900 rounded-3xl p-6 text-white space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-300" />
                <h4 className="font-bold text-xs tracking-wider uppercase text-brand-200">Have Questions?</h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Ask Grantly AI Assistant to explain the required documents or guide your Statement of Purpose draft for this grant.
              </p>
              <Link
                to="/assistant"
                className="w-full py-2 px-3 rounded-xl bg-white text-brand-900 font-bold text-xs text-center block hover:bg-brand-50 transition-colors cursor-pointer"
              >
                Ask Assistant About This Grant
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
    </DashboardLayout>
  );
}