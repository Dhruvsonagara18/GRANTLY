/**
 * Deterministic Eligibility Matching Engine & Readiness Calculator for GRANTLY
 * Implements Section 8, 14, 15 with 4-pillar deterministic scoring (25% each):
 * 1. Education Level & Degree Fit (25%)
 * 2. Academic Performance CGPA/Percentage (25%)
 * 3. Family Income Criteria (25%)
 * 4. Location / Domicile & Demographics (25%)
 */

export function calculateEligibility(scholarship, userProfile) {
  if (!userProfile) {
    return {
      score: 0,
      status: "Not Evaluated",
      statusClass: "text-gray-500 bg-gray-50",
      matchedConditions: [],
      unmatchedConditions: [],
      missingInfo: ["Student profile not available"],
      summary: "Please complete your profile to see eligibility score.",
      breakdown: { education: 0, academic: 0, income: 0, location: 0 },
      isEligible: false
    };
  }

  const matchedConditions = [];
  const unmatchedConditions = [];
  const missingInfo = [];
  const gaps = [];

  let educationScore = 0;
  let academicScore = 0;
  let incomeScore = 0;
  let locationScore = 0;

  // 1. EDUCATION LEVEL (25%)
  if (!userProfile.education || !userProfile.education.level) {
    missingInfo.push("Education level not provided in profile");
  } else {
    const userLevel = userProfile.education.level.toLowerCase();
    const schLevel = (scholarship.educationLevel || "").toLowerCase();

    if (schLevel === "all" || schLevel === userLevel) {
      educationScore = 25;
      matchedConditions.push({
        title: "Education Level Matched",
        detail: `Scholarship targets ${scholarship.educationLevel}; you are enrolled in ${userProfile.education.level}.`,
        weight: "25%"
      });
    } else {
      educationScore = 0;
      unmatchedConditions.push({
        title: "Education Level Mismatch",
        detail: `Requires ${scholarship.educationLevel}, but your current level is ${userProfile.education.level}.`,
        weight: "25%"
      });
      gaps.push({
        criterion: "Education Level",
        required: scholarship.educationLevel,
        current: userProfile.education.level,
        advice: `This opportunity requires enrollment at the ${scholarship.educationLevel} tier.`
      });
    }
  }

  // 2. ACADEMIC PERFORMANCE (25%)
  if (!userProfile.academics || userProfile.academics.cgpa === undefined) {
    missingInfo.push("Academic CGPA / Percentage not provided in profile");
  } else {
    const minCGPA = scholarship.academicCriteria?.minCGPA || 0;
    const minPercentage = scholarship.academicCriteria?.minPercentage || 0;
    const userCGPA = Number(userProfile.academics.cgpa);
    const userPercent = Number(userProfile.academics.percentage || (userCGPA * 9.5));

    if (userCGPA >= minCGPA || userPercent >= minPercentage) {
      academicScore = 25;
      matchedConditions.push({
        title: "Academic Criteria Satisfied",
        detail: `Your CGPA (${userCGPA}) satisfies the minimum threshold of ${minCGPA} CGPA.`,
        weight: "25%"
      });
    } else {
      // Partial scoring if very close (e.g., within 0.5 CGPA)
      const diff = minCGPA - userCGPA;
      if (diff <= 0.5) {
        academicScore = 12;
      } else {
        academicScore = 0;
      }
      unmatchedConditions.push({
        title: "Academic Score Below Target",
        detail: `Minimum required is ${minCGPA} CGPA (${minPercentage}%). Your current score is ${userCGPA} CGPA.`,
        weight: "25%"
      });
      gaps.push({
        criterion: "Academic Minimum",
        required: `${minCGPA} CGPA`,
        current: `${userCGPA} CGPA`,
        advice: "Your academic score is currently below the stated threshold. Explore scholarships with broader cutoffs or holistic project evaluations."
      });
    }
  }

  // 3. INCOME CRITERIA (25%)
  if (!scholarship.incomeCriteria || scholarship.incomeCriteria.maxAnnualIncome === null) {
    // Pure merit scholarship with no income barrier
    incomeScore = 25;
    matchedConditions.push({
      title: "No Family Income Ceiling",
      detail: "This award is evaluated purely on academic merit regardless of family income bracket.",
      weight: "25%"
    });
  } else if (!userProfile.financial || userProfile.financial.annualFamilyIncome === undefined) {
    missingInfo.push("Family income information not specified in profile");
  } else {
    const userIncome = Number(userProfile.financial.annualFamilyIncome);
    const maxIncome = Number(scholarship.incomeCriteria.maxAnnualIncome);

    if (userIncome <= maxIncome) {
      incomeScore = 25;
      matchedConditions.push({
        title: "Income Limit Satisfied",
        detail: `Family annual income (₹${(userIncome / 100000).toFixed(1)} LPA) is within the maximum limit of ₹${(maxIncome / 100000).toFixed(1)} LPA.`,
        weight: "25%"
      });
    } else {
      incomeScore = 0;
      unmatchedConditions.push({
        title: "Annual Income Exceeds Limit",
        detail: `Maximum allowed is ₹${(maxIncome / 100000).toFixed(1)} LPA. Your declared income is ₹${(userIncome / 100000).toFixed(1)} LPA.`,
        weight: "25%"
      });
      gaps.push({
        criterion: "Annual Family Income",
        required: `Under ₹${(maxIncome / 100000).toFixed(1)} LPA`,
        current: `₹${(userIncome / 100000).toFixed(1)} LPA`,
        advice: "Consider exploring private merit fellowships that do not evaluate family income ceilings."
      });
    }
  }

  // 4. LOCATION & DEMOGRAPHICS (25%)
  const isNational = scholarship.location === "National" || scholarship.state === "All India";
  const userState = userProfile.state;

  if (isNational) {
    locationScore = 25;
    matchedConditions.push({
      title: "National Coverage",
      detail: "Open to eligible students across all states and union territories in India.",
      weight: "25%"
    });
  } else if (userState && scholarship.state && scholarship.state.toLowerCase() === userState.toLowerCase()) {
    locationScore = 25;
    matchedConditions.push({
      title: "State Domicile Matched",
      detail: `Your domicile state (${userState}) directly matches the state-specific eligibility requirement.`,
      weight: "25%"
    });
  } else if (!userState) {
    missingInfo.push("State of domicile not recorded in profile");
  } else {
    locationScore = 0;
    unmatchedConditions.push({
      title: "State Domicile Mismatch",
      detail: `Restricted to permanent residents of ${scholarship.state}. Your profile indicates ${userState}.`,
      weight: "25%"
    });
    gaps.push({
      criterion: "Location / Domicile",
      required: scholarship.state,
      current: userState,
      advice: `This state scheme is strictly reserved for domiciles of ${scholarship.state}.`
    });
  }

  // Calculate final percentage score
  const totalScore = Math.min(100, Math.max(0, educationScore + academicScore + incomeScore + locationScore));

  // Determine Match Status
  let status = "Not a Match";
  let statusClass = "text-rose-700 bg-rose-50 border-rose-200";
  let badgeColor = "rose";

  if (totalScore >= 80) {
    status = "Likely Match";
    statusClass = "text-emerald-700 bg-emerald-50 border-emerald-200";
    badgeColor = "emerald";
  } else if (totalScore >= 50) {
    status = "Needs Verification";
    statusClass = "text-amber-700 bg-amber-50 border-amber-200";
    badgeColor = "amber";
  }

  // Generate intelligent summary sentence
  let summary = "";
  if (totalScore >= 80) {
    summary = "Your academic profile, education level, and demographic credentials demonstrate strong alignment with this scholarship.";
  } else if (totalScore >= 50) {
    summary = "You satisfy several baseline criteria, though certain requirements or missing documents warrant detailed verification.";
  } else {
    summary = "One or more mandatory eligibility requirements (such as income ceiling, state domicile, or education tier) are not met.";
  }

  return {
    score: totalScore,
    status,
    statusClass,
    badgeColor,
    matchedConditions,
    unmatchedConditions,
    missingInfo,
    gaps,
    summary,
    breakdown: {
      education: educationScore,
      academic: academicScore,
      income: incomeScore,
      location: locationScore
    },
    isEligible: totalScore >= 75
  };
}

/**
 * Calculates student's overall Scholarship Readiness Score (0-100)
 * Evaluates: Profile completeness (30%), Document readiness (35%), Application progress (35%)
 */
export function calculateReadinessScore(userProfile, documents = [], applications = []) {
  if (!userProfile) return { score: 0, breakdown: {}, suggestions: [] };

  const suggestions = [];

  // 1. Profile Completeness (30 pts)
  let profileFields = [
    Boolean(userProfile.name),
    Boolean(userProfile.email),
    Boolean(userProfile.education?.level),
    Boolean(userProfile.education?.institution),
    Boolean(userProfile.academics?.cgpa),
    Boolean(userProfile.financial?.annualFamilyIncome),
    Boolean(userProfile.state)
  ];
  const filledCount = profileFields.filter(Boolean).length;
  const profileScore = Math.round((filledCount / profileFields.length) * 30);

  if (filledCount < profileFields.length) {
    suggestions.push({
      type: "profile",
      text: "Fill out missing academic and financial details to unlock precise eligibility matching.",
      link: "/profile"
    });
  }

  // 2. Document Readiness (35 pts)
  const readyDocs = documents.filter(d => d.status === "Ready").length;
  const totalDocs = Math.max(1, documents.length);
  const docScore = Math.round((readyDocs / totalDocs) * 35);

  const pendingDocs = documents.filter(d => d.status !== "Ready");
  if (pendingDocs.length > 0) {
    suggestions.push({
      type: "documents",
      text: `${pendingDocs.length} required document(s) still pending: ${pendingDocs.map(d => d.name).slice(0, 2).join(", ")}.`,
      link: "/documents"
    });
  }

  // 3. Application Preparation Activity (35 pts)
  let appScore = 0;
  if (applications.length === 0) {
    suggestions.push({
      type: "applications",
      text: "Save your top matched scholarships to start tracking deadlines and document readiness.",
      link: "/explore"
    });
  } else {
    const activeApps = applications.filter(a => ["Preparing Documents", "Applied", "Under Review", "Approved"].includes(a.status));
    const ratio = Math.min(1, activeApps.length / 3);
    appScore = Math.round(ratio * 35);
  }

  const finalScore = Math.min(100, profileScore + docScore + appScore);

  let label = "Needs Improvement";
  let color = "text-rose-600";
  if (finalScore >= 80) {
    label = "Exceptional Readiness";
    color = "text-emerald-600";
  } else if (finalScore >= 60) {
    label = "Good Progress";
    color = "text-brand-600";
  } else if (finalScore >= 40) {
    label = "Moderate Readiness";
    color = "text-amber-600";
  }

  return {
    score: finalScore,
    label,
    color,
    breakdown: {
      profile: { score: profileScore, max: 30, percentage: Math.round((profileScore / 30) * 100) },
      documents: { score: docScore, max: 35, percentage: Math.round((docScore / 35) * 100) },
      applications: { score: appScore, max: 35, percentage: Math.round((appScore / 35) * 100) }
    },
    suggestions
  };
}
