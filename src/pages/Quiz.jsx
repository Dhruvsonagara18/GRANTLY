import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  GraduationCap,
  Building,
  Target,
  DollarSign,
  Compass,
  RotateCcw
} from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import ScholarshipCard from '../components/scholarship/ScholarshipCard';
import { useApp } from '../context/AppContext';

export default function Quiz() {
  const { allScholarships, setQuizResults } = useApp();

  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    field: 'Engineering & Technology',
    year: '3rd Year',
    scoreRange: '8.0+ CGPA (First Class with Distinction)',
    state: 'Gujarat',
    type: 'Merit-based',
    fundingRange: 'Above ₹1,00,000 / year'
  });

  const [results, setResults] = useState(null);

  const questions = [
    {
      id: 1,
      title: "What is your primary field of study?",
      subtitle: "Helps identify specialized STEM, Medical, or Humanities grants.",
      field: 'field',
      options: [
        "Engineering & Technology",
        "Computer Science & AI",
        "Medicine & BioSciences",
        "Humanities & Social Sciences",
        "Commerce & Business",
        "General Sciences"
      ]
    },
    {
      id: 2,
      title: "Which academic year are you currently enrolled in?",
      subtitle: "Some endowments target incoming freshers while others support 3rd/final year projects.",
      field: 'year',
      options: [
        "1st Year / Fresher",
        "2nd Year",
        "3rd Year",
        "Final Year / Postgraduate",
        "Doctoral Scholar"
      ]
    },
    {
      id: 3,
      title: "What is your typical academic performance range?",
      subtitle: "Used to match merit cutoffs and fellowship benchmarks.",
      field: 'scoreRange',
      options: [
        "8.0+ CGPA (First Class with Distinction)",
        "7.0 - 7.9 CGPA (First Class)",
        "6.0 - 6.9 CGPA (Second Class)",
        "Below 6.0 CGPA"
      ]
    },
    {
      id: 4,
      title: "What is your permanent domicile state?",
      subtitle: "Unlocks dedicated state-funded fee reimbursements.",
      field: 'state',
      options: [
        "Gujarat",
        "Maharashtra",
        "Karnataka",
        "Delhi (NCT)",
        "Tamil Nadu",
        "Uttar Pradesh",
        "Other State / All India"
      ]
    },
    {
      id: 5,
      title: "What type of financial support are you seeking?",
      subtitle: "Choose the primary category that aligns with your criteria.",
      field: 'type',
      options: [
        "Merit-based (Academic Excellence)",
        "Need-based (EWS / Tuition Reimbursement)",
        "Women in Tech / Diversity Grant",
        "Research & Ph.D. Stipend"
      ]
    },
    {
      id: 6,
      title: "What target annual funding range are you targeting?",
      subtitle: "Helps sort high-value endowments from micro-grants.",
      field: 'fundingRange',
      options: [
        "Above ₹2,00,000 / year (Full Support)",
        "₹1,00,000 - ₹2,00,000 / year",
        "₹50,000 - ₹1,00,000 / year",
        "Any Amount Helps"
      ]
    }
  ];

  const currentQ = questions[step - 1];

  const handleSelectOption = (opt) => {
    setAnswers((prev) => ({ ...prev, [currentQ.field]: opt }));
    if (step < questions.length) {
      setStep(step + 1);
    } else {
      calculateQuizMatches();
    }
  };

  const calculateQuizMatches = () => {
    // Score all scholarships based on quiz answers
    const matches = allScholarships.map((s) => {
      let quizScore = s.eligibility?.score || 50;

      // Bonus for state match
      if (answers.state !== 'Other State / All India' && s.state === answers.state) {
        quizScore += 15;
      }

      // Bonus for category match
      if (answers.type.includes('Merit') && s.category === 'Merit-based') quizScore += 10;
      if (answers.type.includes('Need') && s.category === 'Need-based') quizScore += 10;
      if (answers.type.includes('Women') && s.tags?.includes('Women in Tech')) quizScore += 20;

      return {
        ...s,
        customQuizScore: Math.min(100, quizScore)
      };
    }).sort((a, b) => b.customQuizScore - a.customQuizScore).slice(0, 4);

    setResults(matches);
    setQuizResults(matches);
  };

  const restartQuiz = () => {
    setStep(1);
    setResults(null);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* HEADER */}
        <div className="text-center max-w-lg mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
            <span>Interactive Opportunity Matcher</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Scholarship Discovery Quiz
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Answer 6 quick questions to discover your best matching grants in 60 seconds.
          </p>
        </div>

        {!results ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl shadow-brand-500/5 max-w-2xl mx-auto space-y-6 transition-colors">
            {/* Progress */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-400 dark:text-slate-500">
                <span>QUESTION {step} OF {questions.length}</span>
                <span className="text-brand-600 dark:text-brand-400">{Math.round((step / questions.length) * 100)}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-brand-600 to-indigo-600 rounded-full transition-all duration-300"
                  style={{ width: `${(step / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                {currentQ.title}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">{currentQ.subtitle}</p>
            </div>

            {/* Options */}
            <div className="space-y-2.5">
              {currentQ.options.map((opt, idx) => {
                const isSelected = answers[currentQ.field] === opt;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(opt)}
                    className={`w-full p-4 rounded-2xl border text-left text-xs font-semibold transition-all flex items-center justify-between group cursor-pointer ${
                      isSelected
                        ? 'border-brand-600 dark:border-brand-500 bg-brand-50 dark:bg-brand-950/50 text-brand-900 dark:text-brand-200 ring-2 ring-brand-500/20'
                        : 'border-slate-200 dark:border-slate-800 hover:border-brand-300 dark:hover:border-brand-700 hover:bg-slate-50/70 dark:hover:bg-slate-800/60 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <span>{opt}</span>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                      isSelected ? 'border-brand-600 bg-brand-600 text-white' : 'border-slate-300 dark:border-slate-600 group-hover:border-slate-400'
                    }`}>
                      {isSelected ? <CheckCircle2 className="w-3.5 h-3.5" /> : null}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Back Button */}
            {step > 1 && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous question</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          /* RESULTS SECTION */
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-brand-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-300">
                  Quiz Recommendations
                </span>
                <h2 className="text-2xl font-black">
                  Top Matched Opportunities For You
                </h2>
                <p className="text-xs text-brand-100 max-w-lg">
                  Calibrated for {answers.field} • {answers.year} • {answers.state} Domicile.
                </p>
              </div>

              <button
                onClick={restartQuiz}
                className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 text-brand-900 dark:text-brand-300 font-bold text-xs flex items-center gap-1.5 hover:bg-brand-50 dark:hover:bg-slate-800 transition-colors shadow-xs cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Quiz</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {results.map((sch) => (
                <ScholarshipCard key={sch.id} scholarship={sch} viewMode="grid" />
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}