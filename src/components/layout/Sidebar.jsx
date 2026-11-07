import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Compass,
  Sparkles,
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
  X,
  Award,
  Sun,
  Moon,
  MapPin
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Avatar from '../common/Avatar';

export default function Sidebar({ isOpen, onClose }) {
  const { user, logout, readiness, applications, savedIds, theme, toggleTheme } = useApp();
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
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-colors">
      {/* Brand Header */}
      <div className="flex items-center justify-between px-6 h-20 border-b border-slate-100 dark:border-slate-800">
        <NavLink to="/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-700 via-brand-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-brand-500/25">
            <Award className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">GRANTLY</span>
            <p className="text-[10px] uppercase font-bold text-brand-600 dark:text-brand-400 tracking-wider">Opportunity OS</p>
          </div>
        </NavLink>
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Student Readiness Mini-Banner */}
      <div className="mx-4 my-3 p-3 rounded-2xl bg-gradient-to-br from-brand-50 via-indigo-50/60 to-purple-50/40 dark:from-slate-800 dark:via-slate-800/80 dark:to-brand-950/40 border border-brand-100/80 dark:border-slate-700">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="font-bold text-brand-900 dark:text-brand-200 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
            Readiness Score
          </span>
          <span className="font-extrabold text-brand-700 dark:text-brand-300">{readiness.score}/100</span>
        </div>
        <div className="w-full h-1.5 bg-brand-200/50 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-brand-600 to-indigo-600 rounded-full transition-all duration-500"
            style={{ width: `${readiness.score}%` }}
          />
        </div>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 truncate">
          {readiness.label}
        </p>
      </div>

      {/* Navigation Links Scrollable Area */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-6">
        {navGroups.map((group, idx) => (
          <div key={idx} className="space-y-1">
            <div className="px-3 text-[11px] font-bold tracking-wider uppercase text-slate-400 dark:text-slate-500">
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
                          ? 'bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 font-bold shadow-xs'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                      } ${item.highlight ? 'border border-brand-200/60 dark:border-brand-800/60 bg-brand-50/30 dark:bg-brand-950/30' : ''}`
                    }
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className="px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-brand-100 dark:bg-brand-900 text-brand-700 dark:text-brand-300">
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

      {/* Sidebar Footer with Theme Toggle & Profile Info */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-3 bg-slate-50/50 dark:bg-slate-900/50">
        {/* Quick Theme Switcher Pill */}
        <button
          onClick={toggleTheme}
          className="w-full flex items-center justify-between py-1.5 px-3 text-[11px] font-semibold text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl transition-colors"
          title="Toggle Dark / Light Mode"
        >
          <div className="flex items-center gap-1.5">
            {theme === 'dark' ? <Moon className="w-3.5 h-3.5 text-indigo-400" /> : <Sun className="w-3.5 h-3.5 text-amber-500" />}
            <span>Theme: {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
          </div>
          <span className="text-[10px] text-brand-600 dark:text-brand-400 uppercase font-bold">Switch</span>
        </button>

        {/* Profile Card with Avatar */}
        <div className="flex items-center justify-between pt-1">
          <NavLink to="/profile" onClick={onClose} className="flex items-center gap-2.5 min-w-0 group">
            <Avatar src={user?.avatar} name={user?.name || "Dhruv Sonagara"} size="sm" />
            <div className="min-w-0 truncate">
              <p className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors truncate">
                {user?.name || "Dhruv Sonagara"}
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate flex items-center gap-1">
                <MapPin className="w-2.5 h-2.5" />
                <span>{user?.city || "Dwarka"}, {user?.state || "Gujarat"}</span>
              </p>
            </div>
          </NavLink>
          <button
            onClick={handleLogout}
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors"
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
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity" onClick={onClose} />
          <div className="relative flex flex-col w-72 max-w-xs h-full z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
