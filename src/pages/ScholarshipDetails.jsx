import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Bookmark,
  ArrowLeftRight,
  Calendar,
  Building,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  DollarSign,
  GraduationCap,
  MapPin,
  Clock,
  ArrowRight,
  Share2,
  HelpCircle
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
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4 max-w-lg mx-auto my-12">
          <h2 className="text-xl font-bold text-slate-900">Scholarship Not Found</h2>
          <p className="text-xs text-slate-500">
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
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-brand-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Explore Scholarships</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 text-xs font-medium flex items-center gap-1.5 shadow-xs"
              title="Copy link"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">{copiedLink ? 'Copied!' : 'Share'}</span>
            </button>

            <button
              onClick={() => compared ? removeFromCompare(scholarship.id) : addToCompare(scholarship.id)}
              className={`p-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-colors shadow-xs ${
                compared
                  ? 'bg-indigo-50 border-indigo-300 text-indigo-700'
                  : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
            >
              <ArrowLeftRight className="w-4 h-4" />
              <span className="hidden sm:inline">{compared ? 'In Comparison' : 'Compare'}</span>
            </button>

            <button
              onClick={() => toggleSaveScholarship(scholarship.id)}
              className={`p-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-colors shadow-xs ${
                saved
                  ? 'bg-brand-50 border-brand-300 text-brand-700'
                  : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${saved ? 'fill-brand-700' : ''}`} />
              <span className="hidden sm:inline">{saved ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>

        {/* TOP HERO OVERVIEW CARD */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="space-y-3 flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${eligibility.statusClass}`}>
                  {eligibility.score}% — {eligibility.status}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                  {scholarship.category}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
                  {scholarship.educationLevel}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-50 text-slate-600 border border-slate-200">
                  📍 {scholarship.location === 'State' ? scholarship.state : 'All India'}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                {scholarship.title}
              </h1>

              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
                <Building className="w-4 h-4 text-slate-400" />
                <span className="font-semibold">{scholarship.organization}</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500">{scholarship.fundingType} Scheme</span>
              </div>
            </div>

            {/* Right Meta Column: Award & Deadline */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-brand-50 to-indigo-50/50 border border-brand-200/80 shrink-0 w-full md:w-72 space-y-3 text-center sm:text-left">
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Total Award Value</p>
                <p className="text-2xl font-black text-brand-700">{scholarship.amount}</p>
              </div>

              <div className="pt-2 border-t border-brand-100 flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">Deadline</p>
                  <p className={`text-xs font-bold ${deadlineInfo?.isUrgent ? 'text-rose-600' : 'text-slate-800'}`}>
                    {deadlineInfo?.formattedDate}
                  </p>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  deadlineInfo?.isUrgent ? 'bg-rose-100 text-rose-700' : 'bg-brand-100 text-brand-700'
                }`}>
                  {deadlineInfo?.label}
                </span>
              </div>

              {existingApp ? (
                <Link
                  to="/applications"
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 text-white font-bold text-xs text-center block transition-colors shadow-sm"
                >
                  Status: {existingApp.status} (Open Tracker)
                </Link>
              ) : (
                <button
                  onClick={() => handleTrackApplication('Preparing Documents')}
                  className="w-full py-2.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <span>Track in My Applications</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          <p className="text-sm text-slate-700 leading-relaxed pt-2 border-t border-slate-100">
            {scholarship.description}
          </p>
        </div>

        {/* TWO-COLUMN DETAILS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Main (8 cols): Eligibility Details, Gaps, Required Docs */}
          <div className="lg:col-span-8 space-y-6">
            {/* Deterministic Match Breakdown */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-600" />
                  <h3 className="font-bold text-slate-900 text-sm">Deterministic Eligibility Breakdown</h3>
                </div>
                <button
                  onClick={() => setShowEligibilityModal(true)}
                  className="text-xs font-semibold text-brand-600 hover:text-brand-700"
                >
                  View Full Report
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="text-[10px] text-slate-400 font-semibold">Education Level</p>
                  <p className="text-sm font-black text-slate-900 mt-0.5">{eligibility.breakdown.education}/25</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="text-[10px] text-slate-400 font-semibold">Academic Score</p>
                  <p className="text-sm font-black text-slate-900 mt-0.5">{eligibility.breakdown.academic}/25</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="text-[10px] text-slate-400 font-semibold">Income Bracket</p>
                  <p className="text-sm font-black text-slate-900 mt-0.5">{eligibility.breakdown.income}/25</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="text-[10px] text-slate-400 font-semibold">Location / Domicile</p>
                  <p className="text-sm font-black text-slate-900 mt-0.5">{eligibility.breakdown.location}/25</p>
                </div>
              </div>

              {/* Matched & Unmatched List */}
              <div className="space-y-2 pt-2">
                {eligibility.matchedConditions.map((c, i) => (
                  <div key={i} className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 text-xs flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-emerald-950">{c.title}</p>
                      <p className="text-emerald-800 text-[11px] mt-0.5">{c.detail}</p>
                    </div>
                  </div>
                ))}

                {eligibility.unmatchedConditions.map((c, i) => (
                  <div key={i} className="p-3 rounded-xl bg-rose-50/60 border border-rose-100 text-xs flex items-start gap-2.5">
                    <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-rose-950">{c.title}</p>
                      <p className="text-rose-800 text-[11px] mt-0.5">{c.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Document Checklist for this Scholarship */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-brand-600" />
                  <h3 className="font-bold text-slate-900 text-sm">Required Document Checklist</h3>
                </div>
                <Link to="/documents" className="text-xs font-semibold text-brand-600 hover:text-brand-700">
                  Document Readiness Center
                </Link>
              </div>

              <div className="space-y-2">
                {scholarship.documents.map((docName, idx) => {
                  // Check if user has this doc marked ready in their global document locker
                  const isReady = documents.some(d => d.name.toLowerCase().includes(docName.toLowerCase().split(' ')[0]) && d.status === 'Ready');
                  return (
                    <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-md bg-white border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">
                          {idx + 1}
                        </span>
                        <span className="font-medium text-slate-800">{docName}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isReady
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {isReady ? 'Prepared in Locker' : 'Pending Preparation'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Application Instructions */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
              <h3 className="font-bold text-slate-900 text-sm">Official Application Instructions</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {scholarship.applicationInstructions}
              </p>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400">Source: {scholarship.officialSource}</span>
                <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Scheme Details Verified</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right Sidebar (4 cols): Criteria Snapshot, Quick Actions */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              <h3 className="font-bold text-slate-900 text-sm">Eligibility Criteria Snapshot</h3>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-400 block font-medium">Minimum Academic Cutoff</span>
                  <p className="font-bold text-slate-800 mt-0.5">{scholarship.academicCriteria?.description}</p>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <span className="text-slate-400 block font-medium">Family Income Limit</span>
                  <p className="font-bold text-slate-800 mt-0.5">{scholarship.incomeCriteria?.description}</p>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <span className="text-slate-400 block font-medium">Eligible Field of Study</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {scholarship.fieldOfStudy?.map((f, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px]">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <span className="text-slate-400 block font-medium">Available Seats / Recipients</span>
                  <p className="font-bold text-slate-800 mt-0.5">
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
                className="w-full py-2 px-3 rounded-xl bg-white text-brand-900 font-bold text-xs text-center block hover:bg-brand-50 transition-colors"
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
