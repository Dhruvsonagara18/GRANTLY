import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  Filter,
  LayoutGrid,
  List,
  RotateCcw,
  SlidersHorizontal,
  ChevronDown,
  X,
  Compass,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import ScholarshipCard from '../components/scholarship/ScholarshipCard';
import { useApp } from '../context/AppContext';

export default function Explore() {
  const { allScholarships, user } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  // Search input initialized from URL param ?search=
  const initialSearch = searchParams.get('search') || '';
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedFunding, setSelectedFunding] = useState('All');
  const [selectedEducation, setSelectedEducation] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedVerification, setSelectedVerification] = useState('All'); // All, Verified, Government
  const [selectedVerdict, setSelectedVerdict] = useState('All'); // All, Eligible, Potentially
  const [minMatchScore, setMinMatchScore] = useState(0);
  const [sortBy, setSortBy] = useState('match');
  const [viewMode, setViewMode] = useState('grid');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    const urlQuery = searchParams.get('search');
    if (urlQuery !== null && urlQuery !== searchTerm) {
      setSearchTerm(urlQuery);
    }
  }, [searchParams]);

  const handleSearchChange = (val) => {
    setSearchTerm(val);
    if (val) {
      setSearchParams({ search: val });
    } else {
      setSearchParams({});
    }
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedFunding('All');
    setSelectedEducation('All');
    setSelectedLocation('All');
    setSelectedVerification('All');
    setSelectedVerdict('All');
    setMinMatchScore(0);
    setSortBy('match');
    setSearchParams({});
  };

  // Filter & Sort Logic
  const filteredScholarships = useMemo(() => {
    return allScholarships.filter((sch) => {
      // 1. Text Search across Title, Organization, Description, Tags
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesText =
          sch.title.toLowerCase().includes(query) ||
          sch.organization.toLowerCase().includes(query) ||
          sch.description.toLowerCase().includes(query) ||
          (sch.tags && sch.tags.some(t => t.toLowerCase().includes(query))) ||
          (sch.fieldOfStudy && sch.fieldOfStudy.some(f => f.toLowerCase().includes(query)));
        if (!matchesText) return false;
      }

      // 2. Category Filter
      if (selectedCategory !== 'All' && sch.category !== selectedCategory) {
        return false;
      }

      // 3. Funding Type Filter (Government vs Private)
      if (selectedFunding !== 'All' && sch.fundingType !== selectedFunding) {
        return false;
      }

      // 4. Education Level Filter
      if (selectedEducation !== 'All' && sch.educationLevel !== selectedEducation && sch.educationLevel !== 'All') {
        return false;
      }

      // 5. Location Filter
      if (selectedLocation === 'National' && sch.location !== 'National') return false;
      if (selectedLocation === 'State' && sch.location !== 'State') return false;
      if (selectedLocation === 'Gujarat' && sch.state !== 'Gujarat') return false;
      if (selectedLocation === 'Maharashtra' && sch.state !== 'Maharashtra') return false;
      if (selectedLocation === 'Delhi' && sch.state !== 'Delhi') return false;

      // 6. Verification Status Filter
      if (selectedVerification === 'Verified' && !sch.isVerified) return false;
      if (selectedVerification === 'Government' && sch.verificationStatus !== 'Verified Official Government Portal') return false;

      // 7. Verdict Filter (Eligible / Potentially Eligible)
      if (selectedVerdict === 'Eligible' && sch.eligibility?.verdict !== 'Eligible') return false;
      if (selectedVerdict === 'Potentially' && sch.eligibility?.verdict === 'Not Eligible') return false;

      // 8. Minimum Compatibility Match Score
      if (sch.eligibility?.score < minMatchScore) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'match') {
        return (b.eligibility?.score ?? 0) - (a.eligibility?.score ?? 0);
      }
      if (sortBy === 'award-desc') {
        return (b.amountValue ?? 0) - (a.amountValue ?? 0);
      }
      if (sortBy === 'award-asc') {
        return (a.amountValue ?? 0) - (b.amountValue ?? 0);
      }
      if (sortBy === 'deadline') {
        return (a.deadlineInfo?.daysRemaining ?? 999) - (b.deadlineInfo?.daysRemaining ?? 999);
      }
      if (sortBy === 'applicants') {
        return (b.totalApplicants ?? 0) - (a.totalApplicants ?? 0);
      }
      return 0;
    });
  }, [
    allScholarships,
    searchTerm,
    selectedCategory,
    selectedFunding,
    selectedEducation,
    selectedLocation,
    selectedVerification,
    selectedVerdict,
    minMatchScore,
    sortBy
  ]);

  const hasActiveFilters =
    searchTerm ||
    selectedCategory !== 'All' ||
    selectedFunding !== 'All' ||
    selectedEducation !== 'All' ||
    selectedLocation !== 'All' ||
    selectedVerification !== 'All' ||
    selectedVerdict !== 'All' ||
    minMatchScore > 0;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* TOP SEARCH & CONTROLS HEADER */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 transition-colors">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search scholarships by title, keyword, engineering branch, or provider..."
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:bg-white dark:focus:bg-slate-900 focus:border-brand-500 outline-none transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => handleSearchChange('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort & View Mode Toggles */}
            <div className="flex items-center gap-2.5 self-end md:self-auto">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <span className="hidden sm:inline">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
                >
                  <option value="match">Match Score (High to Low)</option>
                  <option value="award-desc">Award Amount (High to Low)</option>
                  <option value="award-asc">Award Amount (Low to High)</option>
                  <option value="deadline">Approaching Deadline</option>
                  <option value="applicants">Most Applicants</option>
                </select>
              </div>

              {/* View Toggle */}
              <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    viewMode === 'grid' ? 'bg-white dark:bg-slate-900 text-brand-700 dark:text-brand-400 shadow-xs' : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                  title="Grid view"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    viewMode === 'list' ? 'bg-white dark:bg-slate-900 text-brand-700 dark:text-brand-400 shadow-xs' : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                  title="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="md:hidden p-2.5 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800 cursor-pointer"
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* DESKTOP FILTER ROW */}
          <div className="hidden md:flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
            <span className="text-slate-400 dark:text-slate-500 font-semibold mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Filter by:
            </span>

            {/* Verdict Filter */}
            <select
              value={selectedVerdict}
              onChange={(e) => setSelectedVerdict(e.target.value)}
              className="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 font-medium outline-none cursor-pointer"
            >
              <option value="All">All Verdicts</option>
              <option value="Eligible">Eligible Only (100% Fit)</option>
              <option value="Potentially">Eligible & Potentially Eligible</option>
            </select>

            {/* Source Verification Filter */}
            <select
              value={selectedVerification}
              onChange={(e) => setSelectedVerification(e.target.value)}
              className="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 font-medium outline-none cursor-pointer"
            >
              <option value="All">All Records</option>
              <option value="Verified">Verified Official Sources Only</option>
              <option value="Government">Official Government Portals Only</option>
            </select>

            {/* Category Dropdown */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 font-medium outline-none cursor-pointer"
            >
              <option value="All">All Categories</option>
              <option value="Merit-based">Merit-based</option>
              <option value="Need-based">Need-based</option>
              <option value="Merit-cum-Need">Merit-cum-Need</option>
            </select>

            {/* Location Scope with Gujarat */}
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 font-medium outline-none cursor-pointer"
            >
              <option value="All">All Scopes</option>
              <option value="Gujarat">Gujarat Domicile Schemes</option>
              <option value="National">National / All India Schemes</option>
              <option value="State">State Specific Schemes</option>
              <option value="Maharashtra">Maharashtra Domicile</option>
              <option value="Delhi">Delhi Domicile</option>
            </select>

            {/* Education Tier */}
            <select
              value={selectedEducation}
              onChange={(e) => setSelectedEducation(e.target.value)}
              className="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 font-medium outline-none cursor-pointer"
            >
              <option value="All">All Education Levels</option>
              <option value="Undergraduate">Undergraduate</option>
              <option value="Postgraduate">Postgraduate</option>
              <option value="Doctoral">Doctoral</option>
            </select>

            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="ml-auto inline-flex items-center gap-1 text-rose-600 dark:text-rose-400 hover:text-rose-700 font-semibold px-2 py-1 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* ACTIVE FILTER CHIPS */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 dark:text-slate-500 font-medium">Active:</span>
            {searchTerm && (
              <span className="px-2.5 py-1 rounded-full bg-brand-50 dark:bg-brand-950/80 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800 flex items-center gap-1">
                Keyword: &quot;{searchTerm}&quot;
                <X className="w-3 h-3 cursor-pointer" onClick={() => handleSearchChange('')} />
              </span>
            )}
            {selectedVerdict !== 'All' && (
              <span className="px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                Verdict: {selectedVerdict}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedVerdict('All')} />
              </span>
            )}
            {selectedVerification !== 'All' && (
              <span className="px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 flex items-center gap-1">
                Source: {selectedVerification}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedVerification('All')} />
              </span>
            )}
            {selectedLocation !== 'All' && (
              <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 flex items-center gap-1">
                Scope: {selectedLocation}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedLocation('All')} />
              </span>
            )}
            <button
              onClick={clearAllFilters}
              className="text-[11px] text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 underline ml-1 cursor-pointer"
            >
              Clear all
            </button>
          </div>
        )}

        {/* RESULTS COUNT & META */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
          <p>
            Showing <strong className="text-slate-800 dark:text-slate-200">{filteredScholarships.length}</strong> verified opportunities matching criteria
          </p>
          <span className="text-[11px]">Active Academic Cycle 2026-27</span>
        </div>

        {/* SCHOLARSHIPS RESULTS GRID / LIST */}
        {filteredScholarships.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-4 max-w-md mx-auto my-6 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center mx-auto">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">No scholarships match your filters</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Try widening your search terms or resetting filters to explore broader opportunities.
              </p>
            </div>
            <button
              onClick={clearAllFilters}
              className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
            {filteredScholarships.map((sch) => (
              <ScholarshipCard key={sch.id} scholarship={sch} viewMode={viewMode} />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}