import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Compass,
  Sparkles,
  Radar,
  ArrowLeftRight,
  Bookmark,
  Briefcase,
  FileCheck2,
  Clock,
  CalendarDays,
  ListTodo,
  BarChart3,
  BotMessageSquare,
  User,
  Settings,
  LogOut,
  RotateCcw,
  X,
  Award,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Sidebar({ isOpen, onClose }) {
  const { user, logout, resetDemo, readiness, applications, savedIds } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navGroups = [
    {
      title: "OVERVIEW",
      items: [
        { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard }
      ]
    },
    {
      title: "DISCOVER",
      items: [
        { name: "Explore Scholarships", path: "/explore", icon: Compass, badge: "16" },
        { name: "Scholarship Quiz", path: "/quiz", icon: Sparkles },
        { name: "Compare Studio", path: "/compare", icon: ArrowLeftRight }
      ]
    },
    {
      title: "MANAGE",
      items: [
        { name: "Saved Scholarships", path: "/saved", icon: Bookmark, badge: savedIds.length > 0 ? savedIds.length : null },
        { name: "My Applications", path: "/applications", icon: Briefcase, badge: applications.length > 0 ? applications.length : null },
        { name: "Document Readiness", path: "/documents", icon: FileCheck2 },
        { name: "Deadlines Intelligence", path: "/deadlines", icon: Clock },
        { name: "Scholarship Calendar", path: "/calendar", icon: CalendarDays },
        { name: "Application Planner", path: "/planner", icon: ListTodo }
      ]
    },
    {
      title: "INSIGHTS",
      items: [
        { name: "Opportunity Analytics", path: "/insights", icon: BarChart3 },
        { name: "Grantly Assistant", path: "/assistant", icon: BotMessageSquare, highlight: true }
      ]
    },
    {
      title: "ACCOUNT",
      items: [
        { name: "My Profile", path: "/profile", icon: User },
        { name: "Settings", path: "/settings", icon: Settings }
      ]
    }
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white border-r border-slate-200">
      {/* Brand Header */}
      <div className="flex items-center justify-between px-6 h-20 border-b border-slate-100">
        <NavLink to="/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-700 via-brand-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-brand-500/25">
            <Award className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-slate-900">GRANTLY</span>
            <p className="text-[10px] uppercase font-semibold text-brand-600 tracking-wider">Opportunity OS</p>
          </div>
        </NavLink>
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Student Readiness Mini-Banner */}
      <div className="mx-4 my-3 p-3 rounded-xl bg-gradient-to-br from-brand-50 via-indigo-50 to-purple-50 border border-brand-100/80">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="font-semibold text-brand-900 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            Readiness Score
          </span>
          <span className="font-bold text-brand-700">{readiness.score}/100</span>
        </div>
        <div className="w-full h-1.5 bg-brand-200/50 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-brand-600 to-indigo-600 rounded-full transition-all duration-500"
            style={{ width: `${readiness.score}%` }}
          />
        </div>
        <p className="text-[11px] text-slate-500 mt-1.5 truncate">
          {readiness.label}
        </p>
      </div>

      {/* Navigation Links Scrollable Area */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-6">
        {navGroups.map((group, idx) => (
          <div key={idx} className="space-y-1">
            <div className="px-3 text-[11px] font-bold tracking-wider uppercase text-slate-400">
              {group.title}
            </div>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-brand-50 text-brand-700 font-semibold shadow-xs'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      } ${item.highlight ? 'border border-brand-200/60 bg-brand-50/30' : ''}`
                    }
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className="px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-brand-100 text-brand-700">
                        {item.badge}
                      </span>
                    )}
                    {item.highlight && !item.badge && (
                      <span className="px-1.5 py-0.2 text-[9px] font-bold uppercase rounded bg-brand-600 text-white">
                        AI
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Sidebar Footer with Reset Demo & Profile info */}
      <div className="p-4 border-t border-slate-100 space-y-2 bg-slate-50/50">
        <button
          onClick={resetDemo}
          className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 text-[11px] font-medium text-slate-600 hover:text-brand-700 bg-white hover:bg-brand-50 border border-slate-200 rounded-lg transition-colors"
          title="Reset sample profile, applications, and documents to fresh demo benchmark"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
          <span>Reset Demo Data</span>
        </button>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
              alt={user?.name || "User"}
              className="w-8 h-8 rounded-full object-cover border border-brand-200 shrink-0"
            />
            <div className="min-w-0 truncate">
              <p className="text-xs font-semibold text-slate-800 truncate">{user?.name || "Student"}</p>
              <p className="text-[10px] text-slate-500 truncate">{user?.education?.degree || "Undergraduate"}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 h-screen sticky top-0 shrink-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity" onClick={onClose} />
          <div className="relative flex flex-col w-72 max-w-xs h-full z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
