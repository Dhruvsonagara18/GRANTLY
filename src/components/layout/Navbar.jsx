import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Award, Menu, X, ArrowRight, Sparkles, Compass } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, loginDemo } = useApp();
  const navigate = useNavigate();

  const handleDemoAccess = () => {
    loginDemo();
    navigate('/dashboard');
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-700 via-brand-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
              <Award className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold tracking-tight text-slate-900 group-hover:text-brand-700 transition-colors">
                GRANTLY
              </span>
              <span className="hidden sm:inline-block ml-2 px-1.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase bg-brand-50 text-brand-700 rounded border border-brand-200">
                PRO
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <Link to="/" className="hover:text-brand-600 transition-colors">Home</Link>
            <Link to="/explore" className="hover:text-brand-600 transition-colors flex items-center gap-1.5">
              <span>Explore Scholarships</span>
              <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-emerald-50 text-emerald-600 rounded-full border border-emerald-200">16 Live</span>
            </Link>
            <a href="#how-it-works" className="hover:text-brand-600 transition-colors">How It Works</a>
            <a href="#features" className="hover:text-brand-600 transition-colors">Features</a>
            <Link to="/quiz" className="hover:text-brand-600 transition-colors flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              <span>Match Quiz</span>
            </Link>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
              >
                <span>Go to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <>
                <button
                  onClick={handleDemoAccess}
                  className="px-4 py-2 text-sm font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 rounded-xl transition-colors border border-brand-200 flex items-center gap-1.5"
                  title="One-click judge preview with prefilled student data"
                >
                  <Sparkles className="w-4 h-4 text-brand-600" />
                  <span>Instant Demo</span>
                </button>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-brand-700 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-brand-700 text-white font-semibold text-sm transition-all shadow-sm"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={handleDemoAccess}
              className="px-3 py-1.5 text-xs font-semibold text-brand-700 bg-brand-50 rounded-lg border border-brand-200"
            >
              Demo
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-3">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-700"
          >
            Home
          </Link>
          <Link
            to="/explore"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-700"
          >
            Explore Scholarships
          </Link>
          <Link
            to="/quiz"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-700"
          >
            Scholarship Discovery Quiz
          </Link>
          <Link
            to="/login"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-700"
          >
            Log In
          </Link>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleDemoAccess();
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-brand-600 text-white font-semibold text-center text-sm shadow-sm"
            >
              Explore Demo Experience
            </button>
            <Link
              to="/signup"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-900 text-white font-semibold text-center text-sm"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
