import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Award,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Search,
  FileCheck,
  Clock,
  Compass,
  Star,
  ChevronDown,
  Building,
  Target,
  Users,
  ChevronRight
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useApp } from '../context/AppContext';

export default function Landing() {
  const { allScholarships, user } = useApp();
  const navigate = useNavigate();

  const [activeFaq, setActiveFaq] = useState(null);

  const featured = allScholarships.filter(s => s.featured).slice(0, 3);

  const faqs = [
    {
      q: "How does GRANTLY determine scholarship eligibility?",
      a: "GRANTLY uses a 4-pillar deterministic algorithm evaluating your education level, academic score (CGPA or percentage), family annual income, and domicile location with 25% weight per pillar. It highlights satisfied conditions, unmatched criteria, and actionable gap analysis."
    },
    {
      q: "Is GRANTLY free for students?",
      a: "Yes! GRANTLY is built to empower students from every socio-economic background to discover and track educational funding without paywalls or hidden fees."
    },
    {
      q: "Can I manage external government and private scholarships in one place?",
      a: "Absolutely. GRANTLY acts as your central Opportunity OS. You can discover opportunities, prepare checklists for required documents, set timeline milestones, and log real application statuses from initiation to award."
    },
    {
      q: "How does the Document Readiness Center work?",
      a: "Instead of scrambling right before deadlines, our Readiness Center maps the specific required documents for each scholarship (e.g. income certificates, university marksheets, bonafide letters) and monitors your readiness percentage in real-time."
    },
    {
      q: "Which state and national schemes are covered?",
      a: "GRANTLY tracks national central sector programs (NSP, Pragati, DST Fellowships) alongside major state portals including Gujarat MYSY, Digital Gujarat, and leading private endowments."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#0B0F19] text-[#111827] dark:text-[#F8FAFC] transition-colors">
      <Navbar />

      <main className="flex-1">
        {/* SECTION 1: HERO SECTION */}
        <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
          {/* Subtle background ambient gradients */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-brand-100/50 via-indigo-50/30 to-transparent dark:from-brand-950/20 dark:via-indigo-950/10 blur-3xl pointer-events-none -z-10" />
          <div className="absolute -top-24 right-10 w-80 h-80 bg-brand-400/10 dark:bg-brand-500/5 rounded-full blur-2xl pointer-events-none -z-10" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              {/* Left Column: Copy & CTAs */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-xs font-semibold shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
                  <span>The Intelligent Scholarship Discovery & Management OS</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.12]">
                  Your Future Shouldn't Be Limited by <span className="gradient-text">Finance</span>.
                </h1>

                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                  Discover scholarships that match your ambitions. Track applications, prepare documents, and unlock educational opportunities with <strong>GRANTLY</strong>.
                </p>

                {/* Primary & Secondary CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                  <Link
                    to="/explore"
                    className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-lg shadow-brand-500/25 hover:shadow-brand-500/35 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                  >
                    <span>Find My Scholarships</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    to="/quiz"
                    className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-bold text-sm border border-slate-200 dark:border-slate-700 shadow-xs transition-all flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                    <span>Take 60s Match Quiz</span>
                  </Link>

                  <Link
                    to="/dashboard"
                    className="w-full sm:w-auto px-5 py-3.5 rounded-2xl text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 font-semibold text-sm transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>View Dashboard</span>
                  </Link>
                </div>

                {/* Trust Badges */}
                <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Deterministic Match Engine</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Verified Eligibility Guidelines</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Zero Data Resale</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Hero Visual & Floating Opportunity Cards */}
              <div className="lg:col-span-5 relative">
                {/* Main Showcase Card */}
                <div className="relative mx-auto max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200/80 dark:border-slate-800 transition-all">
                  {/* Top Bar of Card */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 flex items-center justify-center font-bold text-xs">
                        MY
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white">MYSY Higher Education Grant</p>
                        <p className="text-[10px] text-slate-400">Government of Gujarat</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      100% Match
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="py-4 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-slate-400">Annual Subvention</span>
                      <span className="text-2xl font-black text-brand-700 dark:text-brand-400">₹1,00,000</span>
                    </div>

                    {/* Progress Bar of Compatibility */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-medium text-slate-500 dark:text-slate-400">
                        <span>Gujarat Domicile & 8.6 CGPA Fit</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">All Criteria Satisfied</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-brand-600 to-indigo-600 rounded-full w-[100%]" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
                      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                        <span className="text-[10px] text-slate-400 block">Cutoff Requirement</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">8.0+ CGPA</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                        <span className="text-[10px] text-slate-400 block">Remaining Window</span>
                        <span className="font-semibold text-amber-600 dark:text-amber-400">Closing Soon</span>
                      </div>
                    </div>
                  </div>

                  {/* Card CTA */}
                  <div className="pt-2">
                    <Link
                      to="/explore"
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-brand-600 dark:bg-brand-600 dark:hover:bg-brand-500 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>Explore Matched Grants</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Floating Preview Card 1: Student Readiness */}
                <div className="hidden sm:block absolute -bottom-6 -left-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-slate-200 dark:border-slate-800 max-w-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                      <FileCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-900 dark:text-white">Document Readiness</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">5 of 7 certified docs verified</p>
                    </div>
                  </div>
                </div>

                {/* Floating Preview Card 2: Live Deadline Alert */}
                <div className="hidden sm:block absolute -top-6 -right-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl p-3.5 shadow-xl border border-rose-100 dark:border-rose-950/60 max-w-[220px]">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                    <span className="text-xs font-bold text-slate-900 dark:text-white">Deadline Warning</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Apex STEM Fellowship closes in 3 days</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: PLATFORM STATISTICS */}
        <section className="border-y border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 py-12 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-3xl sm:text-4xl font-black text-brand-700 dark:text-brand-400 tracking-tight">₹45+ Lakhs</p>
                <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 mt-1">Cataloged Funding Opportunities</p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">16</p>
                <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 mt-1">Verified Scholarship Programs</p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-black text-indigo-600 dark:text-indigo-400 tracking-tight">4-Pillar</p>
                <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 mt-1">Deterministic Matching</p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight">100%</p>
                <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 mt-1">Transparent Criteria</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: HOW GRANTLY WORKS */}
        <section id="how-it-works" className="py-20 bg-slate-50 dark:bg-slate-900 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 px-3 py-1 rounded-full border border-brand-200 dark:border-brand-800">
                Simple 4-Step Journey
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mt-3">
                From Confusion to Educational Funding
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
                No more scattered tabs or missed deadlines. Follow a systematic path built for student success.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  step: "01",
                  title: "Build Profile",
                  desc: "Declare your degree, CGPA, state domicile, and financial criteria in under 2 minutes.",
                  icon: Users,
                  color: "from-brand-600 to-indigo-600"
                },
                {
                  step: "02",
                  title: "Smart Matching",
                  desc: "Our deterministic engine scores compatibility with clear explanations and gap analysis.",
                  icon: Target,
                  color: "from-indigo-600 to-purple-600"
                },
                {
                  step: "03",
                  title: "Prepare Documents",
                  desc: "Follow scholarship-tailored checklists so your marksheets and certificates are ready.",
                  icon: FileCheck,
                  color: "from-purple-600 to-brand-700"
                },
                {
                  step: "04",
                  title: "Track & Achieve",
                  desc: "Monitor application stages from review to final grant disbursement without stress.",
                  icon: Award,
                  color: "from-brand-700 to-slate-900"
                }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 relative group hover:shadow-card-hover transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl font-black text-slate-200 dark:text-slate-700 group-hover:text-brand-300 dark:group-hover:text-brand-500 transition-colors">
                        {item.step}
                      </span>
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${item.color} flex items-center justify-center text-white shadow-sm`}>
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 4: FEATURED SCHOLARSHIPS */}
        <section className="py-20 bg-white dark:bg-slate-950 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">High-Impact Opportunities</span>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-1">Featured Scholarships</h2>
              </div>
              <Link
                to="/explore"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300"
              >
                <span>View all 16 opportunities</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featured.map((scholarship) => (
                <div
                  key={scholarship.id}
                  className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between hover:border-brand-300 dark:hover:border-brand-500/50 hover:shadow-card-hover transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
                        {scholarship.category}
                      </span>
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        {scholarship.eligibility?.score}% Match
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-2">
                      {scholarship.title}
                    </h3>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 mb-3">{scholarship.organization}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed mb-4">
                      {scholarship.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">Award Amount</p>
                      <p className="text-lg font-extrabold text-brand-700 dark:text-brand-400">{scholarship.amount}</p>
                    </div>
                    <Link
                      to={`/scholarship/${scholarship.id}`}
                      className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-brand-600 dark:bg-brand-600 dark:hover:bg-brand-500 text-white font-semibold text-xs transition-colors"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: ETHICAL SMART MATCHING EXPLANATION */}
        <section id="features" className="py-20 bg-slate-900 text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-6">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-300 bg-brand-800/60 px-3 py-1 rounded-full border border-brand-700">
                  Ethical Smart Matching
                </span>
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                  Transparent Compatibility, Not False Promises.
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Traditional scholarship aggregators flood students with dead links and misleading guarantees. GRANTLY evaluates every opportunity across 4 clear pillars:
                </p>

                <div className="space-y-4 pt-2">
                  {[
                    { title: "25% Education Level", desc: "Verifies undergraduate, postgraduate, or diploma tier requirements." },
                    { title: "25% Academic Score", desc: "Compares CGPA and 12th board percentages against official cutoff guidelines." },
                    { title: "25% Family Income Ceiling", desc: "Checks economic thresholds (EWS / General / Need-based limit)." },
                    { title: "25% Domicile & Location", desc: "Validates national quotas or strict state-specific residency requirements." }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-2xl bg-slate-800/70 border border-slate-700">
                      <div className="w-6 h-6 rounded-lg bg-brand-500/20 text-brand-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{item.title}</h4>
                        <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual Interactive Match Card */}
              <div className="lg:col-span-6">
                <div className="bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-2xl space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-700">
                    <div>
                      <span className="text-xs font-semibold text-slate-400">Gujarat State Scheme</span>
                      <h4 className="text-lg font-bold text-white">MYSY Gujarat Assistance</h4>
                    </div>
                    <span className="px-3 py-1 rounded-xl text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Likely Match (100%)
                    </span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-700">
                      <span className="text-slate-300">Undergraduate Tier Match</span>
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> +25%
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-700">
                      <span className="text-slate-300">CGPA 8.6 meets minimum 8.0</span>
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> +25%
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-700">
                      <span className="text-slate-300">Income ₹3.8 LPA within ₹6.0 LPA limit</span>
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> +25%
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-700">
                      <span className="text-slate-300">Gujarat Domicile Verified</span>
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> +25%
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-brand-900/40 border border-brand-700/50 flex items-center justify-between">
                    <div>
                      <p className="text-[11px] text-brand-300 font-semibold">Total Compatibility</p>
                      <p className="text-2xl font-black text-white">100% Match</p>
                    </div>
                    <Link
                      to="/explore"
                      className="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-400 text-white font-bold text-xs transition-colors"
                    >
                      Run Your Fit
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: APPLICATION MANAGEMENT PREVIEW */}
        <section className="py-20 bg-slate-50 dark:bg-slate-900 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 px-3 py-1 rounded-full border border-brand-200 dark:border-brand-800">
                End-to-End Tracking
              </span>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-3">
                Your Complete Application Journey
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">
                A structured 5-stage pipeline moving you seamlessly from discovery to result.
              </p>
            </div>

            {/* Visual 5-Stage Journey */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 max-w-4xl mx-auto text-center">
              {[
                { stage: "DISCOVERED", desc: "Identified via smart match", active: true },
                { stage: "ELIGIBILITY CHECKED", desc: "4-pillar criteria verified", active: true },
                { stage: "DOCUMENTS PREPARED", desc: "Checklist certified", active: true },
                { stage: "SUBMITTED", desc: "Application logged", active: true },
                { stage: "FINAL RESULT", desc: "Award disbursement", active: false }
              ].map((step, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border transition-all ${
                    step.active
                      ? 'bg-white dark:bg-slate-800 border-brand-200 dark:border-slate-700 shadow-sm'
                      : 'bg-slate-100/70 dark:bg-slate-850/50 border-dashed border-slate-300 dark:border-slate-700'
                  }`}
                >
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    step.active ? 'bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                  }`}>
                    Stage {idx + 1}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-2">{step.stage}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: STUDENT EXPERIENCES */}
        <section className="py-20 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 px-3 py-1 rounded-full border border-brand-200 dark:border-brand-800">
                Student Case Studies
              </span>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-3">
                Built For Students Navigating Real Challenges
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  quote: "Navigating state and central scholarship portals used to be overwhelming. GRANTLY helped me track Gujarat's MYSY scheme alongside national STEM fellowships without losing track of deadlines.",
                  author: "Dhruv Sonagara",
                  meta: "3rd Year B.Tech • Government Engineering College, Gujarat",
                  avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80"
                },
                {
                  quote: "The Document Readiness checklist is essential. Knowing 2 weeks in advance that I needed a signed bonafide from the dean saved my fellowship application from being disqualified.",
                  author: "Sneha Patel",
                  meta: "M.Tech Data Science • Gujarat Technological University",
                  avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80"
                },
                {
                  quote: "The comparison studio made it completely clear which scholarship covered tuition subvention and which included hostel allowances. No other portal provides this clarity.",
                  author: "Rohan Iyer",
                  meta: "Polytechnic Diploma in Mechanical",
                  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
                }
              ].map((testi, idx) => (
                <div key={idx} className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic">
                      "{testi.quote}"
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-6 mt-4 border-t border-slate-200 dark:border-slate-800">
                    <img
                      src={testi.avatar}
                      alt={testi.author}
                      className="w-10 h-10 rounded-full object-cover border border-brand-200 dark:border-brand-700"
                    />
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">{testi.author}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">{testi.meta}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 8: FREQUENTLY ASKED QUESTIONS */}
        <section className="py-20 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 px-3 py-1 rounded-full border border-brand-200 dark:border-brand-800">
                Frequently Asked Questions
              </span>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-3">
                Everything You Need to Know
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-900 dark:text-white hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                        activeFaq === idx ? 'rotate-180 text-brand-600 dark:text-brand-400' : ''
                      }`}
                    />
                  </button>
                  {activeFaq === idx && (
                    <div className="px-5 pb-5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 9: FINAL CTA */}
        <section className="py-20 bg-gradient-to-tr from-brand-900 via-brand-800 to-indigo-900 text-white text-center relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
            <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/10 text-brand-200 border border-white/20">
              Start Your Scholarship Journey Today
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Ready to Claim the Educational Opportunities You Deserve?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Explore cataloged scholarships with real deterministic matching, deadline alerts, and document tracking.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/explore"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white text-brand-900 font-bold text-sm shadow-xl hover:bg-brand-50 transition-all flex items-center justify-center gap-2"
              >
                <span>Find My Scholarships</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/dashboard"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-brand-700/60 hover:bg-brand-700 text-white font-bold text-sm border border-brand-400/30 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-brand-300" />
                <span>Go to Student Dashboard</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
