import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeftRight,
  Plus,
  X,
  CheckCircle2,
  XCircle,
  Building,
  Calendar,
  DollarSign,
  GraduationCap,
  Sparkles,
  FileText,
  ArrowRight
} from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useApp } from '../context/AppContext';

export default function Compare() {
  const { allScholarships, compareIds, removeFromCompare, addToCompare, clearCompare, addApplication } = useApp();

  const [selectedToAdd, setSelectedToAdd] = useState('');

  // Selected scholarships objects
  const comparedScholarships = allScholarships.filter((s) => compareIds.includes(s.id));
  const availableToAdd = allScholarships.filter((s) => !compareIds.includes(s.id));

  const handleAdd = (e) => {
    const id = e.target.value;
    if (id) {
      addToCompare(id);
      setSelectedToAdd('');
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <ArrowLeftRight className="w-5 h-5 text-brand-600" />
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                Scholarship Comparison Studio
              </h1>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Side-by-side analysis of up to 3 programs ({comparedScholarships.length}/3 selected)
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Add Scholarship Dropdown */}
            {comparedScholarships.length < 3 && availableToAdd.length > 0 && (
              <div className="relative">
                <select
                  value={selectedToAdd}
                  onChange={handleAdd}
                  className="px-3 py-2 text-xs font-semibold text-brand-700 bg-brand-50 border border-brand-200 rounded-xl focus:outline-none cursor-pointer"
                >
                  <option value="">+ Add scholarship to compare...</option>
                  {availableToAdd.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title} ({s.amount})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {comparedScholarships.length > 0 && (
              <button
                onClick={clearCompare}
                className="px-3 py-2 text-xs font-medium text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl border border-slate-200 transition-colors"
              >
                Clear All
              </button>
            )}
          </div>
        </div>

        {comparedScholarships.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4 max-w-md mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto">
              <ArrowLeftRight className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">No Scholarships in Comparison</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1 leading-relaxed">
                Add up to 3 scholarships to compare their funding values, eligibility requirements, and deadlines side-by-side.
              </p>
            </div>
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-500/20 transition-all"
            >
              <span>Choose Scholarships from Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                {/* Header Row: Scholarship Titles & Remove Button */}
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/70">
                    <th className="p-4 sm:p-6 w-1/4 text-xs font-bold uppercase tracking-wider text-slate-400">
                      Criteria Metric
                    </th>
                    {comparedScholarships.map((sch) => (
                      <th key={sch.id} className="p-4 sm:p-6 w-1/4 align-top relative">
                        <button
                          onClick={() => removeFromCompare(sch.id)}
                          className="absolute top-4 right-4 p-1 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Remove from comparison"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <div className="pr-6 space-y-1">
                          <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold border ${sch.eligibility?.statusClass}`}>
                            {sch.eligibility?.score}% Match
                          </span>
                          <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2">
                            {sch.title}
                          </h3>
                          <p className="text-[11px] text-slate-500">{sch.organization}</p>
                        </div>
                      </th>
                    ))}
                    {/* Fill empty columns if fewer than 3 */}
                    {[...Array(3 - comparedScholarships.length)].map((_, i) => (
                      <th key={i} className="p-4 sm:p-6 w-1/4 text-center align-middle bg-slate-50/30 border-dashed border-l border-slate-200">
                        <div className="py-8 text-center text-xs text-slate-400">
                          <Plus className="w-6 h-6 mx-auto mb-1 text-slate-300" />
                          <span>Empty Slot</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 text-xs">
                  {/* Award Amount */}
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 sm:p-6 font-bold text-slate-600">Annual Award Value</td>
                    {comparedScholarships.map((sch) => (
                      <td key={sch.id} className="p-4 sm:p-6">
                        <span className="text-base font-black text-brand-700">{sch.amount}</span>
                        <p className="text-[10px] text-slate-400 mt-0.5">{sch.fundingType} scheme</p>
                      </td>
                    ))}
                    {[...Array(3 - comparedScholarships.length)].map((_, i) => <td key={i} className="bg-slate-50/20" />)}
                  </tr>

                  {/* Deadline Window */}
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 sm:p-6 font-bold text-slate-600">Application Deadline</td>
                    {comparedScholarships.map((sch) => (
                      <td key={sch.id} className="p-4 sm:p-6">
                        <span className={`font-bold ${sch.deadlineInfo?.isUrgent ? 'text-rose-600' : 'text-slate-800'}`}>
                          {sch.deadlineInfo?.formattedDate}
                        </span>
                        <p className="text-[10px] text-slate-500 mt-0.5">({sch.deadlineInfo?.label})</p>
                      </td>
                    ))}
                    {[...Array(3 - comparedScholarships.length)].map((_, i) => <td key={i} className="bg-slate-50/20" />)}
                  </tr>

                  {/* Education Tier */}
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 sm:p-6 font-bold text-slate-600">Target Education Level</td>
                    {comparedScholarships.map((sch) => (
                      <td key={sch.id} className="p-4 sm:p-6">
                        <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-semibold">
                          {sch.educationLevel}
                        </span>
                      </td>
                    ))}
                    {[...Array(3 - comparedScholarships.length)].map((_, i) => <td key={i} className="bg-slate-50/20" />)}
                  </tr>

                  {/* Academic Cutoff */}
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 sm:p-6 font-bold text-slate-600">Academic Minimum</td>
                    {comparedScholarships.map((sch) => (
                      <td key={sch.id} className="p-4 sm:p-6 font-medium text-slate-800">
                        {sch.academicCriteria?.description}
                      </td>
                    ))}
                    {[...Array(3 - comparedScholarships.length)].map((_, i) => <td key={i} className="bg-slate-50/20" />)}
                  </tr>

                  {/* Family Income Limit */}
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 sm:p-6 font-bold text-slate-600">Income Limit</td>
                    {comparedScholarships.map((sch) => (
                      <td key={sch.id} className="p-4 sm:p-6 font-medium text-slate-800">
                        {sch.incomeCriteria?.description}
                      </td>
                    ))}
                    {[...Array(3 - comparedScholarships.length)].map((_, i) => <td key={i} className="bg-slate-50/20" />)}
                  </tr>

                  {/* Geographic Scope */}
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 sm:p-6 font-bold text-slate-600">Location / Domicile</td>
                    {comparedScholarships.map((sch) => (
                      <td key={sch.id} className="p-4 sm:p-6 font-medium text-slate-800">
                        {sch.location === 'State' ? `State of ${sch.state}` : 'All India (National)'}
                      </td>
                    ))}
                    {[...Array(3 - comparedScholarships.length)].map((_, i) => <td key={i} className="bg-slate-50/20" />)}
                  </tr>

                  {/* Required Documents Count */}
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 sm:p-6 font-bold text-slate-600">Documents Required</td>
                    {comparedScholarships.map((sch) => (
                      <td key={sch.id} className="p-4 sm:p-6">
                        <span className="font-bold text-slate-900">{sch.documents.length} Documents</span>
                        <ul className="text-[11px] text-slate-500 list-disc list-inside mt-1 space-y-0.5">
                          {sch.documents.slice(0, 3).map((d, idx) => (
                            <li key={idx} className="truncate">{d}</li>
                          ))}
                          {sch.documents.length > 3 && (
                            <li className="text-slate-400">+{sch.documents.length - 3} more</li>
                          )}
                        </ul>
                      </td>
                    ))}
                    {[...Array(3 - comparedScholarships.length)].map((_, i) => <td key={i} className="bg-slate-50/20" />)}
                  </tr>

                  {/* Bottom Action CTAs */}
                  <tr className="bg-slate-50/70">
                    <td className="p-4 sm:p-6 font-bold text-slate-600">Quick Actions</td>
                    {comparedScholarships.map((sch) => (
                      <td key={sch.id} className="p-4 sm:p-6 space-y-2">
                        <Link
                          to={`/scholarship/${sch.id}`}
                          className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-brand-600 text-white font-bold text-xs text-center block transition-colors"
                        >
                          View Details
                        </Link>
                        <button
                          onClick={() => addApplication(sch, 'Preparing Documents')}
                          className="w-full py-1.5 px-3 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-700 font-semibold text-xs border border-brand-200 transition-colors"
                        >
                          Add to Applications
                        </button>
                      </td>
                    ))}
                    {[...Array(3 - comparedScholarships.length)].map((_, i) => <td key={i} className="bg-slate-50/20" />)}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
