import React from 'react';
import { Link } from 'react-router-dom';
import { Award, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-400 text-sm border-t border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Col 1: Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-500 to-indigo-500 flex items-center justify-center text-white shadow-md">
                <Award className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">GRANTLY</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Unified Scholarship Discovery & Management Platform. Transforming educational financial assistance into an organized, transparent student journey.
            </p>
            <p className="text-xs font-semibold text-brand-400">
              "Discover. Qualify. Apply. Achieve."
            </p>
          </div>

          {/* Col 2: Discovery */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Discovery Engine</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/explore" className="hover:text-white transition-colors">Explore All Scholarships</Link></li>
              <li><Link to="/quiz" className="hover:text-white transition-colors">Interactive Match Quiz</Link></li>
              <li><Link to="/compare" className="hover:text-white transition-colors">Scholarship Comparison Studio</Link></li>
              <li><Link to="/deadlines" className="hover:text-white transition-colors">Upcoming Deadlines Radar</Link></li>
              <li><Link to="/calendar" className="hover:text-white transition-colors">Monthly Funding Calendar</Link></li>
            </ul>
          </div>

          {/* Col 3: Student Management */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Opportunity OS</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/dashboard" className="hover:text-white transition-colors">Student Dashboard</Link></li>
              <li><Link to="/applications" className="hover:text-white transition-colors">Application Tracker</Link></li>
              <li><Link to="/documents" className="hover:text-white transition-colors">Document Readiness Center</Link></li>
              <li><Link to="/planner" className="hover:text-white transition-colors">Preparation Planner</Link></li>
              <li><Link to="/insights" className="hover:text-white transition-colors">Opportunity Analytics</Link></li>
              <li><Link to="/assistant" className="hover:text-white transition-colors">Grantly AI Assistant</Link></li>
            </ul>
          </div>

          {/* Col 4: Platform Integrity */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Integrity & Verification</h4>
            <div className="p-3.5 rounded-2xl bg-slate-800/80 dark:bg-slate-900 border border-slate-700/60 text-[11px] leading-relaxed text-slate-300 space-y-2">
              <div className="flex items-center gap-1.5 text-brand-300 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Eligibility Transparency</span>
              </div>
              <p>
                Compatibility scores are deterministic evaluations based on verified eligibility guidelines. Final disbursements are awarded directly by official sponsors.
              </p>
            </div>
            <p className="text-[11px] text-slate-500">
              Built with React, Vite, Tailwind CSS & Recharts.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 GRANTLY Platform. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-slate-400">Discover • Qualify • Apply • Achieve</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
