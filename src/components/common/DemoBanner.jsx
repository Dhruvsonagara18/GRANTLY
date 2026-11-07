import React from 'react';
import { Sparkles, RotateCcw, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function DemoBanner() {
  const { resetDemo, user } = useApp();

  return (
    <div className="bg-gradient-to-r from-brand-900 via-indigo-900 to-slate-900 text-white text-xs px-4 py-2 border-b border-brand-800/50">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-brand-200">DEMO EVALUATION MODE:</span>
          <span className="text-slate-300 hidden sm:inline">
            Active profile: <strong className="text-white">{user?.name}</strong> (PICT B.Tech • 8.4 CGPA • EWS Eligible)
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[11px] text-slate-300 hidden md:inline flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            LocalStorage Sandboxed Session
          </span>
          <button
            onClick={resetDemo}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-white font-medium text-[11px] border border-white/20 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Demo State</span>
          </button>
        </div>
      </div>
    </div>
  );
}
