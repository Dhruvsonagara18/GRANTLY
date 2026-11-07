import React from 'react';
import {
  BarChart3,
  PieChart as PieIcon,
  TrendingUp,
  DollarSign,
  Award,
  Bookmark,
  Briefcase
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useApp } from '../context/AppContext';

export default function Insights() {
  const { allScholarships, applications, savedIds, totalPotentialFunding, theme } = useApp();

  const isDark = theme === 'dark';
  const gridStroke = isDark ? '#334155' : '#F1F5F9';
  const tickFill = isDark ? '#94A3B8' : '#64748B';
  const tooltipStyle = {
    backgroundColor: isDark ? '#0F172A' : '#FFFFFF',
    borderColor: isDark ? '#334155' : '#E2E8F0',
    color: isDark ? '#F8FAFC' : '#0F172A',
    borderRadius: '12px',
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    fontSize: '12px',
    padding: '8px 12px'
  };

  // 1. Scholarships by Category
  const categoryCounts = {};
  allScholarships.forEach((s) => {
    categoryCounts[s.category] = (categoryCounts[s.category] || 0) + 1;
  });
  const categoryData = Object.keys(categoryCounts).map((cat) => ({
    name: cat,
    count: categoryCounts[cat]
  }));

  // 2. Award Distribution (e.g. <1L, 1-2L, 2-3L, >3L)
  const awardDistribution = [
    { bracket: '< ₹1 Lakh', count: allScholarships.filter(s => s.amountValue < 100000).length },
    { bracket: '₹1L - ₹2L', count: allScholarships.filter(s => s.amountValue >= 100000 && s.amountValue < 200000).length },
    { bracket: '₹2L - ₹3L', count: allScholarships.filter(s => s.amountValue >= 200000 && s.amountValue < 300000).length },
    { bracket: '> ₹3 Lakhs', count: allScholarships.filter(s => s.amountValue >= 300000).length }
  ];

  // 3. By Education Level
  const levelCounts = {};
  allScholarships.forEach((s) => {
    levelCounts[s.educationLevel] = (levelCounts[s.educationLevel] || 0) + 1;
  });
  const levelData = Object.keys(levelCounts).map((lvl) => ({
    name: lvl,
    value: levelCounts[lvl]
  }));
  const LEVEL_COLORS = ['#6D28D9', '#4F46E5', '#06B6D4', '#10B981', '#F59E0B'];

  // 4. Application Status Breakdown
  const appStatusCounts = {};
  applications.forEach((a) => {
    appStatusCounts[a.status] = (appStatusCounts[a.status] || 0) + 1;
  });
  const appData = Object.keys(appStatusCounts).map((st) => ({
    name: st,
    count: appStatusCounts[st]
  }));

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-6xl mx-auto">
        {/* HEADER */}
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-brand-600 dark:text-brand-400" />
            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Opportunity Insights & Analytics
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Macro-level overview of funding distribution, eligibility cutoffs, and pipeline status
          </p>
        </div>

        {/* TOP METRICS SUMMARY */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Total Program Pool</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">16 Endowments</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">National & State tiers</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Total Award Ceiling</p>
            <p className="text-2xl font-black text-brand-700 dark:text-brand-400 mt-1">
              ₹{(totalPotentialFunding / 100000).toFixed(1)} Lakhs
            </p>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-0.5 font-semibold">Eligible student fit</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Active Pipelines</p>
            <p className="text-2xl font-black text-indigo-700 dark:text-indigo-400 mt-1">{applications.length} Submissions</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Tracked in lifecycle</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Watchlist Depth</p>
            <p className="text-2xl font-black text-purple-700 dark:text-purple-400 mt-1">{savedIds.length} Saved</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Personal bookmarked</p>
          </div>
        </div>

        {/* CHARTS GRID 1: Category Bar Chart & Education Pie Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Chart 1: Category Distribution */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 transition-colors">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              Scholarships by Category
            </h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridStroke} />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: tickFill }} interval={0} angle={-10} textAnchor="end" />
                  <YAxis tick={{ fontSize: 11, fill: tickFill }} allowDecimals={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="count" fill="#6D28D9" radius={[6, 6, 0, 0]} barSize={36} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Education Level Donut */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 transition-colors">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              Opportunities by Education Level
            </h3>
            <div className="h-64 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={levelData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {levelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={LEVEL_COLORS[index % LEVEL_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="flex flex-wrap justify-center gap-3 text-xs">
              {levelData.map((d, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: LEVEL_COLORS[i % LEVEL_COLORS.length] }} />
                  <span className="text-slate-600 dark:text-slate-300 font-medium">{d.name} ({d.value})</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CHARTS GRID 2: Award Distribution & Application Pipeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Chart 3: Award Distribution */}
          <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 transition-colors">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              Award Amount Brackets
            </h3>
            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={awardDistribution} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridStroke} />
                  <XAxis dataKey="bracket" tick={{ fontSize: 11, fill: tickFill }} />
                  <YAxis tick={{ fontSize: 11, fill: tickFill }} allowDecimals={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="count" fill="#4F46E5" radius={[6, 6, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 4: Student Application Pipeline Breakdown */}
          <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 transition-colors">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              Your Pipeline Status Breakdown
            </h3>
            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={appData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridStroke} />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: tickFill }} interval={0} angle={-15} textAnchor="end" />
                  <YAxis tick={{ fontSize: 11, fill: tickFill }} allowDecimals={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="count" fill="#10B981" radius={[6, 6, 0, 0]} barSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}