import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, ArrowRight, ArrowLeftRight } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import ScholarshipCard from '../components/scholarship/ScholarshipCard';
import { useApp } from '../context/AppContext';

export default function Saved() {
  const { allScholarships, savedIds } = useApp();

  const savedScholarships = allScholarships.filter((s) => savedIds.includes(s.id));

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-brand-600 dark:text-brand-400 fill-brand-600 dark:fill-brand-400" />
              <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Saved Scholarships
              </h1>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Your personalized watchlist of interesting opportunities ({savedScholarships.length} saved)
            </p>
          </div>

          {savedScholarships.length > 0 && (
            <Link
              to="/compare"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 text-xs font-semibold shadow-xs transition-colors"
            >
              <ArrowLeftRight className="w-4 h-4 text-brand-600 dark:text-brand-400" />
              <span>Compare Saved Grants</span>
            </Link>
          )}
        </div>

        {savedScholarships.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-4 max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center mx-auto">
              <Bookmark className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Your Watchlist is Empty</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1 leading-relaxed">
                Bookmark interesting scholarships from the Explore catalog to track deadlines and compare requirements.
              </p>
            </div>
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-500/20 transition-all"
            >
              <span>Explore Scholarships</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedScholarships.map((scholarship) => (
              <ScholarshipCard
                key={scholarship.id}
                scholarship={scholarship}
                viewMode="grid"
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
