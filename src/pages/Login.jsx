import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Award, Eye, EyeOff, ArrowRight, Lock, Mail, ShieldCheck, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Login() {
  const [email, setEmail] = useState('dhruv.sonagara@grantly.edu');
  const [password, setPassword] = useState('student2026');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, loginDemo } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve destination from router state or default to /dashboard
  const from = location.state?.from
    ? (typeof location.state.from === 'string'
        ? location.state.from
        : `${location.state.from.pathname || '/dashboard'}${location.state.from.search || ''}`)
    : '/dashboard';

  const hasRedirectTarget = Boolean(location.state?.from);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }
    login(email, password);
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-700 via-brand-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-brand-500/25">
            <Award className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">GRANTLY</span>
        </Link>
        <h2 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">Welcome Back</h2>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Sign in to your scholarship discovery & management workspace</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white dark:bg-slate-900 py-8 px-6 shadow-xl shadow-brand-500/5 sm:rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
          {/* Automatic Return URL Banner */}
          {hasRedirectTarget && (
            <div className="p-3.5 rounded-2xl bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 text-xs text-brand-800 dark:text-brand-300 flex items-start gap-2.5">
              <Lock className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Sign-in Required</p>
                <p className="text-[11px] text-brand-700 dark:text-brand-400 mt-0.5">
                  Please log in to continue. You will be automatically redirected right back to your requested page.
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-xs text-rose-700 dark:text-rose-300">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:border-brand-500 outline-none transition-all"
                  placeholder="student@example.edu"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-10 py-2.5 text-xs text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:border-brand-500 outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400">
                <input type="checkbox" defaultChecked className="rounded text-brand-600 focus:ring-brand-500" />
                <span>Remember me</span>
              </label>
              <a href="#" className="font-semibold text-brand-600 dark:text-brand-400 hover:underline">
                Forgot password?
              </a>
            </div>

            <div className="pt-2 space-y-2">
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Sign In to Student Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => {
                  loginDemo();
                  navigate(from, { replace: true });
                }}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Quick Sign-In as Dhruv Sonagara</span>
              </button>
            </div>
          </form>

          {/* Architectural Authenticity Notice */}
          <div className="mt-5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed text-center">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Client-Side Architecture:</span> This hackathon deployment persists sessions and student profiles via client LocalStorage. No external backend authentication server is claimed or required.
          </div>

          <p className="mt-5 text-center text-xs text-slate-500 dark:text-slate-400">
            Don&apos;t have an account?{' '}
            <Link
              to="/signup"
              state={{ from: location.state?.from }}
              className="font-semibold text-brand-600 dark:text-brand-400 hover:underline"
            >
              Create student account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
