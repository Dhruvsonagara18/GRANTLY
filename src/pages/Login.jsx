import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Award, Eye, EyeOff, Sparkles, ArrowRight, ShieldAlert, Lock, Mail } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Login() {
  const [email, setEmail] = useState('aarav.sharma@grantly.demo');
  const [password, setPassword] = useState('demo1234');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, loginDemo } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }
    login(email, password);
    navigate('/dashboard');
  };

  const handleInstantDemo = () => {
    loginDemo();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-700 via-brand-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-brand-500/25">
            <Award className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-black tracking-tight text-slate-900">GRANTLY</span>
        </Link>
        <h2 className="mt-4 text-2xl font-bold text-slate-900">Welcome Back</h2>
        <p className="mt-1 text-xs text-slate-500">Sign in to your scholarship management OS</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-xl shadow-brand-500/5 sm:rounded-3xl border border-slate-200">
          {/* Quick Demo Access Callout */}
          <div className="mb-6 p-4 rounded-2xl bg-brand-50 border border-brand-200/80">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-brand-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-brand-600" />
                Hackathon Judge Quick Access
              </span>
              <span className="text-[10px] uppercase font-bold text-brand-700 bg-white px-2 py-0.5 rounded-md border border-brand-200">
                1-Click
              </span>
            </div>
            <p className="text-xs text-slate-600 mb-3 leading-relaxed">
              Explore the fully populated student profile (Aarav Sharma • 8.4 CGPA • EWS) with sample applications and documents.
            </p>
            <button
              onClick={handleInstantDemo}
              className="w-full py-2.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <span>Launch Demo Account Instantly</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <span className="relative px-3 bg-white text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Or sign in with credentials
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all"
                  placeholder="student@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-10 py-2 text-xs text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-brand-600 text-white font-bold text-xs shadow-sm transition-colors"
              >
                Sign In to Dashboard
              </button>
            </div>
          </form>

          {/* Security Disclosure */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-start gap-2 text-[11px] text-slate-400">
            <ShieldAlert className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <p>
              Demo notice: Sessions are persisted locally in browser LocalStorage. This simulated authentication is designed for prototype evaluation.
            </p>
          </div>

          <p className="mt-6 text-center text-xs text-slate-500">
            Don't have an account?{' '}
            <Link to="/signup" className="font-semibold text-brand-600 hover:text-brand-700">
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
