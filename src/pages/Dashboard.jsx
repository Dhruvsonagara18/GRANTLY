import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Bookmark,
  Briefcase,
  Clock,
  TrendingUp,
  ArrowRight,
  Target,
  ChevronRight,
  MapPin,
  CheckCircle2,
  Compass,
  FileText
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
    tasks,
    totalPotentialFunding,
    readiness,
    theme
  } = useApp();

  // 1. High Matching Recommendations (Eligible or Potentially Eligible >= 70% score)
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
    { name: 'Applied / In Review', value: statusCounts.Applied + statusCounts['Under Review'], color: '#6366F1' },
    { name: 'Approved', value: statusCounts.Approved, color: '#10B981' },
    { name: 'Rejected', value: statusCounts.Rejected, color: '#EF4444' }
  ].filter(d => d.value > 0);

  const displayChartData = chartData.length > 0 ? chartData : [{ name: 'Empty Pipeline', value: 1, color: theme === 'dark' ? '#334155' : '#E2E8F0' }];

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
              Welcome back, {user?.name || "Dhruv Sonagara"}!
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              Based on your <strong className="text-white">{user?.education?.degree || "academic profile"}</strong> and <strong className="text-white">{user?.academics?.cgpa || 8.6} CGPA</strong> in <strong className="text-white">{user?.city || "Dwarka"}, {user?.state || "Gujarat"}</strong>, you have matching funding opportunities open right now.
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
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-brand-200 dark:hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between text-slate-400 dark:text-slate-500 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">Matching Grants</span>
              <Target className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">{recommendations.length}</p>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">≥70% compatibility</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-brand-200 dark:hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between text-slate-400 dark:text-slate-500 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">Saved Watchlist</span>
              <Bookmark className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">{savedIds.length}</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-1">Bookmarked</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-brand-200 dark:hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between text-slate-400 dark:text-slate-500 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">In Progress</span>
              <Briefcase className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">{applications.length}</p>
            <p className="text-[11px] text-amber-600 dark:text-amber-400 font-medium mt-1">Active pipelines</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-brand-200 dark:hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between text-slate-400 dark:text-slate-500 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">Urgent Window</span>
              <Clock className="w-4 h-4 text-rose-600 dark:text-rose-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-rose-600 dark:text-rose-400">{urgentDeadlines.length}</p>
            <p className="text-[11px] text-rose-600 dark:text-rose-400 font-semibold mt-1">Closing in ≤ 7 days</p>
          </div>

          <div className="col-span-2 lg:col-span-1 bg-gradient-to-br from-brand-50 to-indigo-50/50 dark:from-slate-900 dark:to-brand-950/40 rounded-2xl p-4 sm:p-5 border border-brand-200 dark:border-slate-700 shadow-xs">
            <div className="flex items-center justify-between text-brand-700 dark:text-brand-300 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">Potential Funding</span>
              <TrendingUp className="w-4 h-4" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-brand-700 dark:text-brand-400">
              ₹{(totalPotentialFunding / 100000).toFixed(1)}L
            </p>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">Verified eligible pool</p>
          </div>
        </div>

        {/* WIDGET A: TOP RECOMMENDED SCHOLARSHIPS */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                <span>Top Matched Opportunities</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Calibrated against your B.Tech engineering stream, 8.6 CGPA, and Dwarka, Gujarat domicile
              </p>
            </div>
            <Link
              to="/explore"
              className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 flex items-center gap-1"
            >
              <span>Explore All ({allScholarships.length})</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((sch) => (
              <ScholarshipCard key={sch.id} scholarship={sch} viewMode="grid" />
            ))}
          </div>
        </div>

        {/* TWO-COLUMN LOWER SECTION: PIPELINES, TASKS & READINESS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Widgets B & G (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Widget B: Urgent Upcoming Deadlines Countdown */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                    <Clock className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                    <span>Deadlines Closing Within 7 Days</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Prioritize preparation for approaching submission windows</p>
                </div>
                <Link to="/deadlines" className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300">
                  Full Radar
                </Link>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {urgentDeadlines.map((sch) => (
                  <div key={sch.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 p-2 rounded-xl transition-colors">
                    <div className="min-w-0">
                      <Link to={`/scholarship/${sch.id}`} className="font-bold text-xs text-slate-900 dark:text-white hover:text-brand-600 dark:hover:text-brand-400 truncate block">
                        {sch.title}
                      </Link>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                        <span>{sch.organization}</span>
                        <span>•</span>
                        <span className="font-semibold text-brand-700 dark:text-brand-400">{sch.amount}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        sch.deadlineInfo?.isUrgent
                          ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
                          : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                      }`}>
                        {sch.deadlineInfo?.label}
                      </span>
                      <Link
                        to={`/scholarship/${sch.id}`}
                        className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-brand-600 dark:bg-slate-800 dark:hover:bg-brand-600 text-white text-xs font-medium transition-colors cursor-pointer"
                      >
                        Review
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Widget G: Application Pipeline */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 transition-colors">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                  <span>Recent Application Pipeline</span>
                </h3>
                <Link to="/applications" className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300">
                  Manage Tracker
                </Link>
              </div>

              {applications.length === 0 ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/80 text-brand-600 dark:text-brand-400 flex items-center justify-center mx-auto">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">No Applications Currently Tracked</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                      Discover verified scholarships matching your credentials and start tracking your preparation journey.
                    </p>
                  </div>
                  <Link
                    to="/explore"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-2xs transition-colors"
                  >
                    <span>Browse Scholarships</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {applications.slice(0, 3).map((app) => (
                    <div key={app.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-slate-900 dark:text-white">{app.scholarshipTitle}</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-brand-100 dark:bg-brand-900/60 text-brand-800 dark:text-brand-200">
                            {app.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{app.notes}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-xs font-bold text-brand-700 dark:text-brand-400">{app.awardAmount}</p>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500">Target: {app.targetSubmitDate}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
                {readiness.label}: {readiness.breakdown.documents.percentage}% of prerequisite documents are verified and ready in your locker.
              </p>

              <div className="pt-2">
                <Link
                  to="/documents"
                  className="w-full py-2.5 px-4 rounded-xl bg-white text-brand-900 font-bold text-xs text-center block hover:bg-brand-50 transition-colors cursor-pointer"
                >
                  Boost Readiness Score
                </Link>
              </div>
            </div>

            {/* Widget C: Application Status Donut Chart */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 transition-colors">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                Application Pipeline Distribution
              </h3>

              <div className="h-44 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={displayChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={70}
                      paddingAngle={displayChartData.length > 1 ? 4 : 0}
                      dataKey="value"
                    >
                      {displayChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: theme === 'dark' ? '#0F172A' : '#FFFFFF',
                        borderColor: theme === 'dark' ? '#334155' : '#E2E8F0',
                        color: theme === 'dark' ? '#F8FAFC' : '#0F172A',
                        borderRadius: '12px',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                        fontSize: '12px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {chartData.length > 0 ? (
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 dark:text-slate-400">
                  {chartData.map((d, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                      <span className="truncate">{d.name} ({d.value})</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[11px] text-center text-slate-400 dark:text-slate-500">
                  No active applications. Track an opportunity to see pipeline metrics.
                </p>
              )}
            </div>

            {/* Widget E: Action Items & Planner */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 transition-colors">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                  Priority Action Checklist
                </h3>
                <Link to="/planner" className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline">
                  Planner
                </Link>
              </div>

              <div className="space-y-2">
                {pendingTasks.map((t) => (
                  <div key={t.id} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 text-xs flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-600 dark:bg-brand-400 shrink-0 mt-1.5" />
                    <div className="min-w-0">
                      <p className="font-bold text-slate-900 dark:text-white leading-snug">{t.title}</p>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">Due {t.dueDate} • {t.category}</p>
                    </div>
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