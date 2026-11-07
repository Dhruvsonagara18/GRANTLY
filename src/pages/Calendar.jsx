import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  Sparkles,
  Building,
  ArrowRight
} from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useApp } from '../context/AppContext';

export default function CalendarPage() {
  const { allScholarships } = useApp();

  // Selected Month: 0 = Nov 2026, 1 = Dec 2026, 2 = Jan 2027
  const months = [
    { name: 'November 2026', year: 2026, monthIndex: 10, days: 30, startDayOfWeek: 0 }, // Nov 1 2026 is Sunday (0)
    { name: 'December 2026', year: 2026, monthIndex: 11, days: 31, startDayOfWeek: 2 }, // Dec 1 2026 is Tuesday (2)
    { name: 'January 2027', year: 2027, monthIndex: 0, days: 31, startDayOfWeek: 5 }
  ];

  const [activeMonthIdx, setActiveMonthIdx] = useState(0);
  const [selectedDay, setSelectedDay] = useState(10); // default highlight Nov 10

  const currentMonth = months[activeMonthIdx];

  // Map scholarships closing in this active month
  const getScholarshipsForDay = (day) => {
    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    const monthNum = currentMonth.monthIndex + 1;
    const formattedMonth = monthNum < 10 ? `0${monthNum}` : `${monthNum}`;
    const dateString = `${currentMonth.year}-${formattedMonth}-${formattedDay}`;

    return allScholarships.filter((s) => s.deadline === dateString);
  };

  const selectedDayScholarships = getScholarshipsForDay(selectedDay);

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-brand-600 dark:text-brand-400" />
              <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Scholarship Calendar
              </h1>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Monthly overview of verified deadline milestones and application cutoffs
            </p>
          </div>

          {/* Month Switcher Controls */}
          <div className="flex items-center gap-2 bg-white dark:bg-slate-900 rounded-2xl p-1.5 border border-slate-200 dark:border-slate-800 shadow-xs">
            <button
              onClick={() => setActiveMonthIdx(Math.max(0, activeMonthIdx - 1))}
              disabled={activeMonthIdx === 0}
              className="p-1.5 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 px-3 min-w-[130px] text-center">
              {currentMonth.name}
            </span>
            <button
              onClick={() => setActiveMonthIdx(Math.min(months.length - 1, activeMonthIdx + 1))}
              disabled={activeMonthIdx === months.length - 1}
              className="p-1.5 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* CALENDAR GRID & DAY DETAILS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Calendar Table (8 cols) */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 transition-colors">
            <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider pb-2 border-b border-slate-100 dark:border-slate-800">
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {/* Offset days before start */}
              {[...Array(currentMonth.startDayOfWeek)].map((_, i) => (
                <div key={`offset-${i}`} className="h-20 rounded-2xl bg-slate-50/40 dark:bg-slate-950/20 p-2" />
              ))}

              {/* Month Days */}
              {[...Array(currentMonth.days)].map((_, i) => {
                const day = i + 1;
                const schs = getScholarshipsForDay(day);
                const isSelected = selectedDay === day;
                const isToday = currentMonth.year === 2026 && currentMonth.monthIndex === 10 && day === 7;

                return (
                  <div
                    key={`day-${day}`}
                    onClick={() => setSelectedDay(day)}
                    className={`h-20 sm:h-24 rounded-2xl p-2 border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-brand-600 dark:border-brand-500 bg-brand-50/50 dark:bg-brand-950/40 ring-2 ring-brand-500/20'
                        : schs.length > 0
                        ? 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-brand-300 dark:hover:border-brand-700'
                        : 'border-slate-100 dark:border-slate-800/60 bg-slate-50/30 dark:bg-slate-950/20 hover:bg-white dark:hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs font-bold ${
                          isSelected
                            ? 'text-brand-700 dark:text-brand-300 font-black'
                            : isToday
                            ? 'text-white bg-slate-900 dark:bg-brand-600 rounded-full w-5 h-5 flex items-center justify-center text-[10px]'
                            : 'text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {day}
                      </span>
                      {schs.length > 0 && (
                        <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                      )}
                    </div>

                    <div className="space-y-1 overflow-hidden">
                      {schs.slice(0, 1).map((s) => (
                        <div
                          key={s.id}
                          className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-brand-100 dark:bg-brand-950/60 text-brand-800 dark:text-brand-300 truncate"
                        >
                          {s.title}
                        </div>
                      ))}
                      {schs.length > 1 && (
                        <span className="text-[8px] font-bold text-slate-400 dark:text-slate-500 block truncate">
                          +{schs.length - 1} more
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Day Details Panel (4 cols) */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 transition-colors">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Selected Date
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                {currentMonth.name.split(' ')[0]} {selectedDay}, {currentMonth.year}
              </h3>
            </div>

            {selectedDayScholarships.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400 dark:text-slate-500 space-y-2">
                <Clock className="w-6 h-6 mx-auto text-slate-300 dark:text-slate-600" />
                <p>No scholarship deadlines scheduled for this day.</p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500">
                  Click highlighted dates on the calendar to inspect opportunities.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                  {selectedDayScholarships.length} Deadline(s) Closing Today:
                </p>
                {selectedDayScholarships.map((sch) => (
                  <div
                    key={sch.id}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2"
                  >
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300">
                      Closing Deadline
                    </span>
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white leading-snug">
                      {sch.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{sch.organization}</p>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                      <span className="font-extrabold text-brand-700 dark:text-brand-400 text-xs">{sch.amount}</span>
                      <Link
                        to={`/scholarship/${sch.id}`}
                        className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 flex items-center gap-1"
                      >
                        <span>Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}