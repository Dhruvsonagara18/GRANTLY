import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Bookmark,
  Briefcase,
  Clock,
  TrendingUp,
  Award,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  FileCheck2,
  Building,
  Target,
  Calendar,
  ChevronRight,
  Radar,
  HelpCircle
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import DashboardLayout from '../components/layout/DashboardLayout';
import ScholarshipCard from '../components/scholarship/ScholarshipCard';
import { useApp } from '../context/AppContext';

export default function Dashboard() {
  const {
    user,
    allScholarships,
    savedIds,
    applications,
    documents,
    tasks,
    totalPotentialFunding,
    readiness
  } = useApp();

  // 1. High Matching Recommendations (>= 75% score)
  const recommendations = allScholarships
    .filter(s => s.eligibility?.score >= 70 && !s.deadlineInfo?.isClosed)
    .sort((a, b) => b.eligibility.score - a.eligibility.score)
    .slice(0, 3);

  // 2. Upcoming Deadlines (urgent & upcoming)
  const urgentDeadlines = allScholarships
    .filter(s => !s.deadlineInfo?.isClosed && s.deadlineInfo?.daysRemaining <= 7)
    .sort((a, b) => a.deadlineInfo.daysRemaining - b.deadlineInfo.daysRemaining)
    .slice(0, 4);

  // 3. Application Status Distribution for Donut Chart
  const statusCounts = {
    Interested: 0,
    'Preparing Documents': 0,
    Applied: 0,
    'Under Review': 0,
    Approved: 0,
    Rejected: 0
  };

  applications.forEach(a => {
    if (statusCounts[a.status] !== undefined) statusCounts[a.status]++;
  });

  const chartData = [
    { name: 'Interested', value: statusCounts.Interested, color: '#94A3B8' },
    { name: 'Preparing Documents', value: statusCounts['Preparing Documents'], color: '#F59E0B' },
    { name: 'Applied / In Review', value: statusCounts.Applied + statusCounts['Under Review'], color: '#4F46E5' },
    { name: 'Approved', value: statusCounts.Approved, color: '#10B981' },
    { name: 'Rejected', value: statusCounts.Rejected, color: '#EF4444' }
  ].filter(d => d.value > 0);

  // Fallback if no apps yet
  const displayChartData = chartData.length > 0 ? chartData : [{ name: 'No Applications', value: 1, color: '#E2E8F0' }];

  // 4. Pending Tasks / Next Steps
  const pendingTasks = tasks.filter(t => !t.completed).slice(0, 4);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* TOP WELCOME & HIGHLIGHTS */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-brand-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-full bg-brand-500/10 blur-3xl pointer-events-none" />

          <div className="space-y-2 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-brand-200 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-brand-300" />
              <span>Personalized Opportunity Stream</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Welcome back, {user?.name || "Student"}!
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              Based on your <strong className="text-white">{user?.education?.degree || "academic profile"}</strong> and <strong className="text-white">{user?.academics?.cgpa || 8.4} CGPA</strong>, you have matching funding opportunities open right now.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 relative z-10 shrink-0">
            <Link
              to="/explore"
              className="px-5 py-2.5 rounded-xl bg-white hover:bg-brand-50 text-brand-900 font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
            >
              <span>Explore Scholarships</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/assistant"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-300" />
              <span>Grantly AI</span>
            </Link>
          </div>
        </div>

        {/* KEY PLATFORM METRICS */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs hover:border-brand-200 transition-colors">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">Matching Grants</span>
              <Target className="w-4 h-4 text-brand-600" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900">{recommendations.length}</p>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1">≥70% compatibility</p>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs hover:border-brand-200 transition-colors">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">Saved Watchlist</span>
              <Bookmark className="w-4 h-4 text-indigo-600" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900">{savedIds.length}</p>
            <p className="text-[11px] text-slate-500 font-medium mt-1">Bookmarked</p>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs hover:border-brand-200 transition-colors">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">In Progress</span>
              <Briefcase className="w-4 h-4 text-amber-600" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900">{applications.length}</p>
            <p className="text-[11px] text-amber-600 font-medium mt-1">Active pipelines</p>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs hover:border-brand-200 transition-colors">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">Urgent Window</span>
              <Clock className="w-4 h-4 text-rose-600" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-rose-600">{urgentDeadlines.length}</p>
            <p className="text-[11px] text-rose-600 font-semibold mt-1">Closing in ≤ 7 days</p>
          </div>

          <div className="col-span-2 lg:col-span-1 bg-gradient-to-br from-brand-50 to-indigo-50/50 rounded-2xl p-4 sm:p-5 border border-brand-200 shadow-xs">
            <div className="flex items-center justify-between text-brand-700 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">Potential Funding</span>
              <TrendingUp className="w-4 h-4" />
            </div>
            <p className="text-xl sm:text-2xl font-black text-brand-900">
              ₹{(totalPotentialFunding / 100000).toFixed(1)} Lakhs
            </p>
            <p className="text-[10px] text-brand-600 mt-1">Matching opportunities (Distinguished from disbursed funds)</p>
          </div>
        </div>

        {/* MAIN DASHBOARD GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Recommended for You (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Widget A: Recommended For You */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-brand-600" />
                    <span>Recommended For You</span>
                  </h2>
                  <p className="text-xs text-slate-500">
                    Highest compatibility opportunities based on your education tier, CGPA, and state.
                  </p>
                </div>
                <Link
                  to="/explore"
                  className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
                >
                  <span>View All</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {recommendations.map((scholarship) => (
                  <ScholarshipCard key={scholarship.id} scholarship={scholarship} viewMode="grid" />
                ))}
              </div>
            </div>

            {/* Widget B: Upcoming Deadlines Radar */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Critical Deadlines Radar</h3>
                    <p className="text-xs text-slate-500">Prioritize submissions closing within this week</p>
                  </div>
                </div>
                <Link
                  to="/deadlines"
                  className="text-xs font-semibold text-brand-600 hover:text-brand-700"
                >
                  View Deadline Calendar
                </Link>
              </div>

              <div className="divide-y divide-slate-100">
                {urgentDeadlines.map((sch) => (
                  <div key={sch.id} className="py-3 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <Link
                        to={`/scholarship/${sch.id}`}
                        className="text-xs font-bold text-slate-900 hover:text-brand-600 transition-colors truncate block"
                      >
                        {sch.title}
                      </Link>
                      <p className="text-[11px] text-slate-400">{sch.organization} • {sch.amount}</p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        sch.deadlineInfo?.isUrgent
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {sch.deadlineInfo?.label}
                      </span>
                      <Link
                        to={`/scholarship/${sch.id}`}
                        className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-brand-600 text-white text-xs font-medium transition-colors"
                      >
                        Review
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Widget G: Application Pipeline History */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-brand-600" />
                  <span>Recent Application Pipeline</span>
                </h3>
                <Link to="/applications" className="text-xs font-semibold text-brand-600 hover:text-brand-700">
                  Manage Tracker
                </Link>
              </div>

              <div className="space-y-3">
                {applications.slice(0, 3).map((app) => (
                  <div key={app.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900">{app.scholarshipTitle}</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-brand-100 text-brand-800">
                          {app.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">{app.notes}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs font-bold text-brand-700">{app.awardAmount}</p>
                      <p className="text-[10px] text-slate-400">Target: {app.targetSubmitDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Widgets C, E, F (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Widget F: Scholarship Readiness Score */}
            <div className="bg-gradient-to-br from-brand-900 to-indigo-900 rounded-3xl p-6 text-white shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-300">
                  Readiness Center
                </span>
                <span className="text-2xl font-black">{readiness.score}/100</span>
              </div>

              <div className="w-full h-2.5 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-400 to-teal-300 rounded-full transition-all duration-500"
                  style={{ width: `${readiness.score}%` }}
                />
              </div>

              <p className="text-xs text-brand-100 leading-relaxed">
                {readiness.label}: {readiness.breakdown.documents.percentage}% of your required documents are verified and ready.
              </p>

              <div className="pt-2">
                <Link
                  to="/documents"
                  className="w-full py-2.5 px-4 rounded-xl bg-white text-brand-900 font-bold text-xs text-center block hover:bg-brand-50 transition-colors"
                >
                  Boost Readiness Score
                </Link>
              </div>
            </div>

            {/* Widget C: Application Status Donut Chart */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              <h3 className="font-bold text-slate-900 text-sm">Application Breakdown</h3>

              <div className="h-48 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={displayChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {displayChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                {chartData.map((d, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                    <span className="text-slate-600 truncate">{d.name} ({d.value})</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Widget E: Your Next Steps (Planner Tasks) */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-brand-600" />
                  <span>Actionable Next Steps</span>
                </h3>
                <Link to="/planner" className="text-xs font-semibold text-brand-600 hover:text-brand-700">
                  Open Planner
                </Link>
              </div>

              <div className="space-y-2.5">
                {pendingTasks.map((t) => (
                  <div key={t.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold text-slate-900 leading-snug">{t.title}</p>
                      <span className={`px-1.5 py-0.5 text-[9px] font-bold rounded ${
                        t.priority === 'High' ? 'bg-rose-100 text-rose-700' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {t.priority}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">Due {t.dueDate} • {t.relatedScholarshipTitle || t.category}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
