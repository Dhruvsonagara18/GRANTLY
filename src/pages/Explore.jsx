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
  Compass
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

      // 6. Minimum Compatibility Match Score
      if (sch.eligibility.score < minMatchScore) {
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
  }, [allScholarships, searchTerm, selectedCategory, selectedFunding, selectedEducation, selectedLocation, minMatchScore, sortBy]);

  const hasActiveFilters =
    Boolean(searchTerm) ||
    selectedCategory !== 'All' ||
    selectedFunding !== 'All' ||
    selectedEducation !== 'All' ||
    selectedLocation !== 'All' ||
    minMatchScore > 0;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* HEADER & SEARCH BAR */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-brand-600 dark:text-brand-400" />
              <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Explore Scholarships
              </h1>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Deterministic matching calculated against your <strong className="text-slate-800 dark:text-slate-200">{user?.education?.degree}</strong> in {user?.city}, {user?.state} ({user?.academics?.cgpa} CGPA).
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-xs">
              Showing <strong className="text-brand-700 dark:text-brand-400">{filteredScholarships.length}</strong> of {allScholarships.length} programs
            </span>
          </div>
        </div>

        {/* SEARCH AND CONTROL BAR */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search by title, organization, tags (STEM, MYSY, Tech)..."
                className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100/70 dark:hover:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-brand-500 outline-none transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => handleSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
              <div className="relative flex-1 sm:w-48">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full pl-3 pr-8 py-2.5 text-xs font-semibold text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none appearance-none cursor-pointer"
                >
                  <option value="match">Highest Match Score</option>
                  <option value="award-desc">Award: High to Low</option>
                  <option value="award-asc">Award: Low to High</option>
                  <option value="deadline">Closing Soonest</option>
                  <option value="applicants">Most Popular</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Grid vs List toggle */}
              <div className="flex items-center rounded-xl bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-white dark:bg-slate-900 text-brand-700 dark:text-brand-400 shadow-xs' : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                  title="Grid view"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-colors ${
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
                className="md:hidden p-2.5 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800"
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

            {/* Category Dropdown */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 font-medium outline-none"
            >
              <option value="All">All Categories</option>
              <option value="Merit-based">Merit-based</option>
              <option value="Need-based">Need-based</option>
              <option value="Merit-cum-Need">Merit-cum-Need</option>
            </select>

            {/* Funding Dropdown */}
            <select
              value={selectedFunding}
              onChange={(e) => setSelectedFunding(e.target.value)}
              className="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 font-medium outline-none"
            >
              <option value="All">All Funding Types</option>
              <option value="Government">Government Schemes</option>
              <option value="Private">Private Foundations</option>
            </select>

            {/* Education Tier */}
            <select
              value={selectedEducation}
              onChange={(e) => setSelectedEducation(e.target.value)}
              className="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 font-medium outline-none"
            >
              <option value="All">All Education Levels</option>
              <option value="Undergraduate">Undergraduate</option>
              <option value="Postgraduate">Postgraduate</option>
              <option value="Doctoral">Doctoral</option>
              <option value="Diploma">Diploma / Polytechnic</option>
            </select>

            {/* Location Scope with Gujarat */}
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 font-medium outline-none"
            >
              <option value="All">All Scopes</option>
              <option value="Gujarat">Gujarat Domicile Only</option>
              <option value="National">National Only</option>
              <option value="State">State Schemes Only</option>
              <option value="Maharashtra">Maharashtra Domicile</option>
              <option value="Delhi">Delhi Domicile</option>
            </select>

            {/* Compatibility Threshold */}
            <select
              value={minMatchScore}
              onChange={(e) => setMinMatchScore(Number(e.target.value))}
              className="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 font-medium outline-none"
            >
              <option value="0">All Match Scores</option>
              <option value="50">≥ 50% Compatibility</option>
              <option value="75">≥ 75% High Match</option>
              <option value="90">≥ 90% Near Perfect</option>
            </select>

            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="ml-auto inline-flex items-center gap-1 text-rose-600 dark:text-rose-400 hover:text-rose-700 font-semibold px-2 py-1 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
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
                Keyword: "{searchTerm}"
                <X className="w-3 h-3 cursor-pointer" onClick={() => handleSearchChange('')} />
              </span>
            )}
            {selectedCategory !== 'All' && (
              <span className="px-2.5 py-1 rounded-full bg-brand-50 dark:bg-brand-950/80 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800 flex items-center gap-1">
                Category: {selectedCategory}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory('All')} />
              </span>
            )}
            {selectedEducation !== 'All' && (
              <span className="px-2.5 py-1 rounded-full bg-brand-50 dark:bg-brand-950/80 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800 flex items-center gap-1">
                Tier: {selectedEducation}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedEducation('All')} />
              </span>
            )}
            {selectedLocation !== 'All' && (
              <span className="px-2.5 py-1 rounded-full bg-brand-50 dark:bg-brand-950/80 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800 flex items-center gap-1">
                Region: {selectedLocation}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedLocation('All')} />
              </span>
            )}
            {minMatchScore > 0 && (
              <span className="px-2.5 py-1 rounded-full bg-brand-50 dark:bg-brand-950/80 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800 flex items-center gap-1">
                Score ≥ {minMatchScore}%
                <X className="w-3 h-3 cursor-pointer" onClick={() => setMinMatchScore(0)} />
              </span>
            )}
          </div>
        )}

        {/* RESULTS GRID / LIST */}
        {filteredScholarships.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center mx-auto">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">No scholarships match your filters</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1 leading-relaxed">
                Try loosening your filters, removing search terms, or resetting your match threshold.
              </p>
            </div>
            <button
              onClick={clearAllFilters}
              className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-sm transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-4'
            }
          >
            {filteredScholarships.map((scholarship) => (
              <ScholarshipCard
                key={scholarship.id}
                scholarship={scholarship}
                viewMode={viewMode}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
