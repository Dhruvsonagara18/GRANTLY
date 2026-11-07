import React, { useState } from 'react';
import {
  User,
  GraduationCap,
  DollarSign,
  Heart,
  Save,
  CheckCircle2,
  Sparkles,
  Building,
  MapPin,
  Mail,
  Phone
} from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useApp } from '../context/AppContext';

export default function Profile() {
  const { user, updateUserProfile } = useApp();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    state: user?.state || 'Maharashtra',
    city: user?.city || 'Pune',
    gender: user?.gender || 'Male',
    // Education
    educationLevel: user?.education?.level || 'Undergraduate',
    degree: user?.education?.degree || '',
    institution: user?.education?.institution || '',
    year: user?.education?.year || '3rd Year',
    // Academics
    cgpa: user?.academics?.cgpa || 8.4,
    percentage: user?.academics?.percentage || 84,
    twelfthPercentage: user?.academics?.twelfthPercentage || 88.5,
    // Financial
    annualFamilyIncome: user?.financial?.annualFamilyIncome || 420000,
    socialCategory: user?.financial?.socialCategory || 'General-EWS',
    hasIncomeCertificate: user?.financial?.hasIncomeCertificate ?? true,
    // Preferences
    categories: user?.preferences?.categories || ['Merit-based', 'Need-based'],
    minAwardAmount: user?.preferences?.minAwardAmount || 50000
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserProfile({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      state: formData.state,
      city: formData.city,
      gender: formData.gender,
      education: {
        level: formData.educationLevel,
        degree: formData.degree,
        institution: formData.institution,
        year: formData.year
      },
      academics: {
        cgpa: Number(formData.cgpa),
        percentage: Number(formData.percentage),
        twelfthPercentage: Number(formData.twelfthPercentage)
      },
      financial: {
        annualFamilyIncome: Number(formData.annualFamilyIncome),
        socialCategory: formData.socialCategory,
        hasIncomeCertificate: formData.hasIncomeCertificate
      },
      preferences: {
        categories: formData.categories,
        minAwardAmount: Number(formData.minAwardAmount)
      }
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-brand-600" />
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                Student Profile
              </h1>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Updates immediately recalculate your deterministic scholarship eligibility scores across the platform.
            </p>
          </div>

          {savedSuccess && (
            <div className="px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-1.5 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Profile Updated & Matches Refreshed!</span>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* PROFILE SUMMARY HERO */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
                alt="Avatar"
                className="w-16 h-16 rounded-full object-cover border-2 border-brand-500 shadow-sm"
              />
              <div>
                <h3 className="text-lg font-bold text-slate-900">{formData.name}</h3>
                <p className="text-xs text-slate-500">{formData.degree} • {formData.institution}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-brand-50 text-brand-700">
                    CGPA: {formData.cgpa}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700">
                    {formData.socialCategory}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600">
                    Domicile: {formData.state}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-500/20 transition-all shrink-0"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>

          {/* CARD 1: Basic Information */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <User className="w-4 h-4 text-brand-600" />
              <span>Personal Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Domicile State</label>
                <select
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-500 outline-none"
                >
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Other">Other State</option>
                </select>
              </div>
            </div>
          </div>

          {/* CARD 2: Education & Academics */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-brand-600" />
              <span>Academic Credentials</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Education Level</label>
                <select
                  value={formData.educationLevel}
                  onChange={(e) => setFormData({ ...formData, educationLevel: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-500 outline-none font-medium"
                >
                  <option value="Undergraduate">Undergraduate</option>
                  <option value="Postgraduate">Postgraduate</option>
                  <option value="Doctoral">Doctoral</option>
                  <option value="Diploma">Diploma / Polytechnic</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Degree Title</label>
                <input
                  type="text"
                  value={formData.degree}
                  onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Current Academic Year</label>
                <select
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-500 outline-none"
                >
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="Final Year">Final Year</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">CGPA (Scale 10)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  value={formData.cgpa}
                  onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-500 outline-none font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">College Marks (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.percentage}
                  onChange={(e) => setFormData({ ...formData, percentage: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-500 outline-none font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">12th Board Score (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.twelfthPercentage}
                  onChange={(e) => setFormData({ ...formData, twelfthPercentage: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-500 outline-none font-bold"
                />
              </div>
            </div>
          </div>

          {/* CARD 3: Financial & Category Profile */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-brand-600" />
              <span>Financial & Demographic Background</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Gross Annual Family Income (₹)
                </label>
                <input
                  type="number"
                  step="10000"
                  value={formData.annualFamilyIncome}
                  onChange={(e) => setFormData({ ...formData, annualFamilyIncome: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-500 outline-none font-bold"
                />
                <p className="text-[10px] text-slate-400 mt-1">
                  ₹{(formData.annualFamilyIncome / 100000).toFixed(1)} LPA
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                <select
                  value={formData.socialCategory}
                  onChange={(e) => setFormData({ ...formData, socialCategory: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-500 outline-none"
                >
                  <option value="General">General</option>
                  <option value="General-EWS">General - EWS</option>
                  <option value="OBC-NCL">OBC - Non Creamy Layer</option>
                  <option value="SC">SC (Scheduled Caste)</option>
                  <option value="ST">ST (Scheduled Tribe)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-500/20 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save & Update Eligibility Scores</span>
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
