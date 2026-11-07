import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Award,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  GraduationCap,
  BookOpen,
  DollarSign,
  Heart,
  TrendingUp,
  Building,
  Target
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Onboarding() {
  const { user, updateUserProfile } = useApp();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  // Form states initialized with existing user or reasonable defaults
  const [formData, setFormData] = useState({
    name: user?.name || 'Aarav Sharma',
    phone: user?.phone || '+91 98765 43210',
    state: user?.state || 'Maharashtra',
    city: user?.city || 'Pune',
    gender: user?.gender || 'Male',
    // Education
    educationLevel: user?.education?.level || 'Undergraduate',
    degree: user?.education?.degree || 'B.Tech in Computer Science',
    institution: user?.education?.institution || 'Pune Institute of Computer Technology',
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
    categories: user?.preferences?.categories || ['Merit-based', 'Need-based', 'STEM / Engineering'],
    minAwardAmount: user?.preferences?.minAwardAmount || 50000
  });

  const nextStep = () => {
    if (step < 6) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleFinish = () => {
    updateUserProfile({
      name: formData.name,
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
        twelfthPercentage: Number(formData.twelfthPercentage),
        hasActiveBacklogs: false
      },
      financial: {
        annualFamilyIncome: Number(formData.annualFamilyIncome),
        socialCategory: formData.socialCategory,
        hasIncomeCertificate: formData.hasIncomeCertificate
      },
      preferences: {
        categories: formData.categories,
        minAwardAmount: Number(formData.minAwardAmount)
      },
      onboardingCompleted: true
    });

    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full mx-auto">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>Profile Personalization Flow</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Tailor Your Scholarship Engine
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Step {step} of 6 — Calibrating deterministic eligibility rules
          </p>

          {/* Progress Bar */}
          <div className="mt-4 w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brand-600 to-indigo-600 transition-all duration-300 rounded-full"
              style={{ width: `${(step / 6) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-brand-500/5 border border-slate-200">
          {/* STEP 1: Basic Details */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Target className="w-5 h-5 text-brand-600" />
                <span>Step 1: Basic Contact & Domicile</span>
              </h2>
              <p className="text-xs text-slate-500">
                State domicile is used to match state-sponsored scholarships and fee reimbursements.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
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

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-500 outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Education Information */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-brand-600" />
                <span>Step 2: Educational Standing</span>
              </h2>
              <p className="text-xs text-slate-500">
                Helps filter undergraduate versus postgraduate research programs and vocational diploma grants.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Education Level</label>
                  <select
                    value={formData.educationLevel}
                    onChange={(e) => setFormData({ ...formData, educationLevel: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-500 outline-none"
                  >
                    <option value="Undergraduate">Undergraduate (B.Tech, B.Sc, B.Com, BA, MBBS)</option>
                    <option value="Postgraduate">Postgraduate (M.Tech, M.S., MBA, M.Sc)</option>
                    <option value="Doctoral">Doctoral (Ph.D., Research Fellowship)</option>
                    <option value="Diploma">Diploma / Polytechnic</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Degree / Course</label>
                  <input
                    type="text"
                    value={formData.degree}
                    onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-500 outline-none"
                    placeholder="e.g. B.Tech Computer Science"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">College / University Name</label>
                  <input
                    type="text"
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-500 outline-none"
                    placeholder="e.g. Pune Institute of Computer Technology"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Current Academic Year</label>
                  <select
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-500 outline-none"
                  >
                    <option value="1st Year">1st Year / Fresher</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="Final Year">Final Year</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Academic Performance */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-brand-600" />
                <span>Step 3: Academic Performance</span>
              </h2>
              <p className="text-xs text-slate-500">
                Merit-based scholarships require verifiable cutoff scores (CGPA or 12th board percentage).
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Current CGPA (out of 10)</label>
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
                  <label className="block text-xs font-semibold text-slate-700 mb-1">College Percentage (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="100"
                    value={formData.percentage}
                    onChange={(e) => setFormData({ ...formData, percentage: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">12th Board Score (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="100"
                    value={formData.twelfthPercentage}
                    onChange={(e) => setFormData({ ...formData, twelfthPercentage: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-500 outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Financial Information (Optional) */}
          {step === 4 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-brand-600" />
                <span>Step 4: Financial Profile (Optional)</span>
              </h2>
              <p className="text-xs text-slate-500">
                Needed for Need-based, EWS, and Government tuition subventions. You can adjust this anytime.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Annual Gross Family Income (₹)
                  </label>
                  <input
                    type="number"
                    step="10000"
                    value={formData.annualFamilyIncome}
                    onChange={(e) => setFormData({ ...formData, annualFamilyIncome: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-500 outline-none font-bold"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">
                    ₹{(formData.annualFamilyIncome / 100000).toFixed(1)} LPA (Lakhs Per Annum)
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Socio-Economic Category</label>
                  <select
                    value={formData.socialCategory}
                    onChange={(e) => setFormData({ ...formData, socialCategory: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-500 outline-none"
                  >
                    <option value="General">General</option>
                    <option value="General-EWS">General - EWS (Economically Weaker Section)</option>
                    <option value="OBC-NCL">OBC - Non-Creamy Layer</option>
                    <option value="SC">SC (Scheduled Caste)</option>
                    <option value="ST">ST (Scheduled Tribe)</option>
                    <option value="Minority">Religious / Linguistic Minority</option>
                  </select>
                </div>

                <div className="sm:col-span-2 pt-2">
                  <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.hasIncomeCertificate}
                      onChange={(e) => setFormData({ ...formData, hasIncomeCertificate: e.target.checked })}
                      className="rounded text-brand-600 focus:ring-brand-500 h-4 w-4"
                    />
                    <span>I possess or can readily obtain a competent authority Family Income Certificate (Tahsildar / SDM)</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Interests and Preferences */}
          {step === 5 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Heart className="w-5 h-5 text-brand-600" />
                <span>Step 5: Funding Preferences</span>
              </h2>
              <p className="text-xs text-slate-500">
                Select target categories to prioritize in your personalized discovery feed.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex flex-wrap gap-2">
                  {['Merit-based', 'Need-based', 'Government', 'Private', 'STEM / Engineering', 'Women in Tech'].map((cat) => {
                    const selected = formData.categories.includes(cat);
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => {
                          if (selected) {
                            setFormData({
                              ...formData,
                              categories: formData.categories.filter((c) => c !== cat)
                            });
                          } else {
                            setFormData({
                              ...formData,
                              categories: [...formData.categories, cat]
                            });
                          }
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                          selected
                            ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>

                <div className="pt-3">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Minimum Target Award (₹)
                  </label>
                  <input
                    type="number"
                    step="10000"
                    value={formData.minAwardAmount}
                    onChange={(e) => setFormData({ ...formData, minAwardAmount: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-500 outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: Generate Recommendations */}
          {step === 6 && (
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-brand-500/30 animate-pulse">
                <Sparkles className="w-8 h-8" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900">Calculations Complete!</h2>
                <p className="text-xs text-slate-600 max-w-md mx-auto mt-2 leading-relaxed">
                  We evaluated 16 cataloged opportunities against your {formData.educationLevel} tier, {formData.cgpa} CGPA, and {formData.state} domicile.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-brand-50 border border-brand-200/80 max-w-sm mx-auto text-left space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600">High Match Opportunities:</span>
                  <span className="font-bold text-brand-700">6 Scholarships</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600">Estimated Potential Award:</span>
                  <span className="font-bold text-emerald-700">₹8,50,000</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600">Urgent Deadlines:</span>
                  <span className="font-bold text-rose-600">2 within 7 days</span>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {step < 6 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-500/20 transition-all flex items-center gap-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinish}
                className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-brand-600 text-white text-xs font-bold shadow-lg transition-all flex items-center gap-2"
              >
                <span>Launch My Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
