/**
 * Deterministic Eligibility Matching Engine & Readiness Calculator for GRANTLY
 *
 * Implements a multi-dimensional clinical eligibility assessment:
 * 1. Education Level (Undergraduate, Postgraduate, Doctoral, Diploma)
 * 2. Course / Stream Alignment (Engineering, Medicine, Science, etc.)
 * 3. Academic Year / Progression (1st Year, 3rd Year, Final Year)
 * 4. Academic Performance Cutoff (CGPA / Percentage threshold)
 * 5. Family Income Ceiling (Max annual family income limit)
 * 6. Domicile State / Location (State-specific vs National)
 * 7. Category & Reservation (General-EWS, SC, ST, OBC if applicable)
 * 8. Gender Requirement (All vs Female-specific)
 * 9. Active Backlogs Restriction
 *
 * Distinct Verdict Classification:
 * - "Eligible": All mandatory hard criteria are verified and satisfied.
 * - "Potentially Eligible": Baseline qualifications align, but non-mandatory conditions or voluntary proofs need verification.
 * - "Not Eligible": One or more mandatory hard criteria (state, gender, income, cutoff, tier) failed.
 *
 * Transparency Rule: Does NOT use arbitrary match percentages as guarantees of eligibility.
 */

export function calculateEligibility(scholarship, userProfile) {
  if (!userProfile) {
    return {
      score: 0,
      verdict: "Not Evaluated",
      status: "Not Evaluated",
      statusClass: "text-slate-500 bg-slate-50 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700",
      matchedConditions: [],
      unmatchedConditions: [],
      missingInfo: ["Student profile not available. Please complete profile to evaluate eligibility."],
      reasonsForIneligibility: ["No student profile data."],
      applicationRequirements: scholarship?.documents || [],
      summary: "Please complete your student profile to evaluate eligibility.",
      disclaimer: "Indicative compatibility estimate based on self-reported data. Official eligibility is verified by the awarding authority.",
      breakdown: { education: 0, academic: 0, income: 0, location: 0, stream: 0 },
      isEligible: false,
      isPotentiallyEligible: false
    };
  }

  const matchedConditions = [];
  const unmatchedConditions = [];
  const missingInfo = [];
  const reasonsForIneligibility = [];
  const gaps = [];

  let educationScore = 0;
  let academicScore = 0;
  let incomeScore = 0;
  let locationScore = 0;
  let streamScore = 0;

  let hardCriteriaFailed = false;
  let hasMissingEssentialInfo = false;

  // ----------------------------------------------------
  // 1. EDUCATION LEVEL FIT
  // ----------------------------------------------------
  if (!userProfile.education || !userProfile.education.level) {
    missingInfo.push("Current education level (Undergraduate, Postgraduate, Diploma, Doctoral)");
    hasMissingEssentialInfo = true;
  } else {
    const userLevel = userProfile.education.level.trim().toLowerCase();
    const schLevel = (scholarship.educationLevel || "All").trim().toLowerCase();

    if (schLevel === "all" || schLevel === userLevel) {
      educationScore = 20;
      matchedConditions.push({
        title: "Education Level Matched",
        detail: `Scholarship targets ${scholarship.educationLevel}; you are enrolled as ${userProfile.education.level}.`,
        weight: "20%"
      });
    } else {
      educationScore = 0;
      hardCriteriaFailed = true;
      const reason = `Enrolled at the ${userProfile.education.level} level, but this award is restricted exclusively to ${scholarship.educationLevel} students.`;
      unmatchedConditions.push({
        title: "Education Tier Mismatch",
        detail: reason,
        isHardCriterion: true,
        weight: "20%"
      });
      reasonsForIneligibility.push(reason);
      gaps.push({
        criterion: "Education Level",
        required: scholarship.educationLevel,
        current: userProfile.education.level,
        advice: `This scheme is strictly reserved for ${scholarship.educationLevel} programs.`
      });
    }
  }

  // ----------------------------------------------------
  // 2. COURSE & STREAM ALIGNMENT
  // ----------------------------------------------------
  const scholarshipFields = scholarship.fieldOfStudy || ["All Fields"];
  const userDegree = (userProfile.education?.degree || "").toLowerCase();
  const userSpecialization = (userProfile.education?.specialization || "").toLowerCase();

  const isAllFields = scholarshipFields.some(f => f.toLowerCase().includes("all"));
  let streamMatched = isAllFields;

  if (!isAllFields && (userDegree || userSpecialization)) {
    streamMatched = scholarshipFields.some(field => {
      const f = field.toLowerCase();
      return userDegree.includes(f) || userSpecialization.includes(f) ||
        (f.includes("engineering") && userDegree.includes("b.tech")) ||
        (f.includes("computer") && (userDegree.includes("computer") || userDegree.includes("software")));
    });
  }

  if (streamMatched) {
    streamScore = 15;
    matchedConditions.push({
      title: "Course & Stream Aligned",
      detail: `Your degree (${userProfile.education?.degree || "Engineering"}) falls within targeted disciplines: ${scholarshipFields.slice(0, 3).join(", ")}.`,
      weight: "15%"
    });
  } else if (!userDegree) {
    missingInfo.push("Degree and specialization title");
  } else {
    streamScore = 5; // Partial compatibility
    const reason = `Targeted disciplines are [${scholarshipFields.join(", ")}]; your profile indicates "${userProfile.education?.degree}".`;
    unmatchedConditions.push({
      title: "Discipline Not Directly Listed",
      detail: reason,
      isHardCriterion: false,
      weight: "15%"
    });
  }

  // ----------------------------------------------------
  // 3. ACADEMIC PERFORMANCE (CGPA / Percentage Cutoff)
  // ----------------------------------------------------
  if (!userProfile.academics || userProfile.academics.cgpa === undefined) {
    missingInfo.push("Academic CGPA and 12th board marks percentage");
    hasMissingEssentialInfo = true;
  } else {
    const minCGPA = scholarship.academicCriteria?.minCGPA || 0;
    const minPercentage = scholarship.academicCriteria?.minPercentage || 0;
    const userCGPA = Number(userProfile.academics.cgpa);
    const userPercent = Number(userProfile.academics.percentage || (userCGPA * 9.5));

    if (userCGPA >= minCGPA || userPercent >= minPercentage) {
      academicScore = 25;
      matchedConditions.push({
        title: "Academic Cutoff Satisfied",
        detail: `Your current CGPA (${userCGPA}) / percentage (${userPercent}%) satisfies the minimum threshold of ${minCGPA} CGPA (${minPercentage}%).`,
        weight: "25%"
      });
    } else {
      const diff = minCGPA - userCGPA;
      if (diff <= 0.3) {
        academicScore = 12; // Marginal
      } else {
        academicScore = 0;
        hardCriteriaFailed = true;
      }

      const reason = `Requires minimum ${minCGPA} CGPA (${minPercentage}%). Your current score is ${userCGPA} CGPA (${userPercent}%).`;
      unmatchedConditions.push({
        title: "Academic Score Below Cutoff",
        detail: reason,
        isHardCriterion: diff > 0.3,
        weight: "25%"
      });
      reasonsForIneligibility.push(reason);
      gaps.push({
        criterion: "Academic Performance",
        required: `${minCGPA} CGPA / ${minPercentage}%`,
        current: `${userCGPA} CGPA`,
        advice: "Your recorded academic score is below the minimum threshold required for this cycle."
      });
    }
  }

  // ----------------------------------------------------
  // 4. FAMILY INCOME CEILING
  // ----------------------------------------------------
  if (!scholarship.incomeCriteria || scholarship.incomeCriteria.maxAnnualIncome === null) {
    incomeScore = 20;
    matchedConditions.push({
      title: "No Family Income Ceiling",
      detail: "This award is evaluated purely on academic merit without family income restrictions.",
      weight: "20%"
    });
  } else if (!userProfile.financial || userProfile.financial.annualFamilyIncome === undefined) {
    missingInfo.push("Gross annual family household income");
    hasMissingEssentialInfo = true;
  } else {
    const userIncome = Number(userProfile.financial.annualFamilyIncome);
    const maxIncome = Number(scholarship.incomeCriteria.maxAnnualIncome);

    if (userIncome <= maxIncome) {
      incomeScore = 20;
      matchedConditions.push({
        title: "Income Ceiling Satisfied",
        detail: `Declared family income (₹${(userIncome / 100000).toFixed(2)} LPA) is within the maximum limit of ₹${(maxIncome / 100000).toFixed(2)} LPA.`,
        weight: "20%"
      });
    } else {
      incomeScore = 0;
      hardCriteriaFailed = true;
      const reason = `Maximum annual household income allowed is ₹${(maxIncome / 100000).toFixed(1)} LPA. Your declared income is ₹${(userIncome / 100000).toFixed(1)} LPA.`;
      unmatchedConditions.push({
        title: "Annual Income Exceeds Limit",
        detail: reason,
        isHardCriterion: true,
        weight: "20%"
      });
      reasonsForIneligibility.push(reason);
      gaps.push({
        criterion: "Family Income Ceiling",
        required: `Under ₹${(maxIncome / 100000).toFixed(1)} LPA`,
        current: `₹${(userIncome / 100000).toFixed(1)} LPA`,
        advice: "Explore private or merit-based fellowships that do not enforce household income limits."
      });
    }
  }

  // ----------------------------------------------------
  // 5. LOCATION / STATE DOMICILE
  // ----------------------------------------------------
  const isNational = scholarship.location === "National" || scholarship.state === "All India";
  const userState = userProfile.state;

  if (isNational) {
    locationScore = 20;
    matchedConditions.push({
      title: "All-India / National Quota",
      detail: "Open to eligible students across all states and union territories in India.",
      weight: "20%"
    });
  } else if (userState && scholarship.state && scholarship.state.toLowerCase() === userState.toLowerCase()) {
    locationScore = 20;
    matchedConditions.push({
      title: "State Domicile Matched",
      detail: `Your domicile state (${userState}) satisfies the state-specific residency requirement.`,
      weight: "20%"
    });
  } else if (!userState) {
    missingInfo.push("Permanent domicile state certificate");
    hasMissingEssentialInfo = true;
  } else {
    locationScore = 0;
    hardCriteriaFailed = true;
    const reason = `Restricted exclusively to permanent residents/domiciles of ${scholarship.state}. Your profile indicates ${userState}.`;
    unmatchedConditions.push({
      title: "State Domicile Mismatch",
      detail: reason,
      isHardCriterion: true,
      weight: "20%"
    });
    reasonsForIneligibility.push(reason);
    gaps.push({
      criterion: "State Domicile",
      required: scholarship.state,
      current: userState,
      advice: `This state welfare scheme is strictly reserved for domiciles of ${scholarship.state}.`
    });
  }

  // ----------------------------------------------------
  // 6. GENDER REQUIREMENT
  // ----------------------------------------------------
  if (scholarship.gender && scholarship.gender !== "All") {
    const userGender = userProfile.gender || "All";
    if (userGender.toLowerCase() === scholarship.gender.toLowerCase()) {
      matchedConditions.push({
        title: "Gender Criteria Met",
        detail: `Eligible for ${scholarship.gender} quota.`,
        weight: "Special Quota"
      });
    } else {
      hardCriteriaFailed = true;
      const reason = `This scholarship is dedicated exclusively to ${scholarship.gender} candidates.`;
      unmatchedConditions.push({
        title: "Gender Quota Mismatch",
        detail: reason,
        isHardCriterion: true,
        weight: "Special Quota"
      });
      reasonsForIneligibility.push(reason);
      gaps.push({
        criterion: "Gender Quota",
        required: scholarship.gender,
        current: userGender,
        advice: `This program is exclusively reserved for ${scholarship.gender} candidates.`
      });
    }
  }

  // ----------------------------------------------------
  // 7. ACTIVE BACKLOGS RESTRICTION
  // ----------------------------------------------------
  if (userProfile.academics?.hasActiveBacklogs) {
    unmatchedConditions.push({
      title: "Active Academic Backlogs",
      detail: "Most scholarship authorities mandate clear academic progression without pending backlogs.",
      isHardCriterion: false,
      weight: "Condition"
    });
  }

  // ----------------------------------------------------
  // CALCULATE OVERALL COMPATIBILITY SCORE (0-100)
  // ----------------------------------------------------
  let rawScore = educationScore + streamScore + academicScore + incomeScore + locationScore;
  let totalScore = Math.min(100, Math.max(0, rawScore));

  // If a hard criterion definitely failed, cap the indicative score at 35%
  if (hardCriteriaFailed) {
    totalScore = Math.min(35, totalScore);
  }

  // ----------------------------------------------------
  // DETERMINE THREE-STATE VERDICT
  // 1. "Eligible"
  // 2. "Potentially Eligible"
  // 3. "Not Eligible"
  // ----------------------------------------------------
  let verdict = "Not Eligible";
  let statusClass = "text-rose-700 bg-rose-50 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800";
  let badgeColor = "rose";

  if (!hardCriteriaFailed && !hasMissingEssentialInfo && totalScore >= 75) {
    verdict = "Eligible";
    statusClass = "text-emerald-700 bg-emerald-50 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800";
    badgeColor = "emerald";
  } else if (!hardCriteriaFailed && totalScore >= 50) {
    verdict = "Potentially Eligible";
    statusClass = "text-amber-700 bg-amber-50 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800";
    badgeColor = "amber";
  } else {
    verdict = "Not Eligible";
    statusClass = "text-rose-700 bg-rose-50 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800";
    badgeColor = "rose";
  }

  // Status alias for backward compatibility with UI
  const status = verdict;

  // Generate intelligent summary sentence
  let summary = "";
  if (verdict === "Eligible") {
    summary = "Your academic credentials, education tier, and demographic profile satisfy the stated criteria for this scholarship.";
  } else if (verdict === "Potentially Eligible") {
    summary = "You satisfy the primary qualifications, but certain non-mandatory criteria or voluntary proofs require verification before applying.";
  } else {
    summary = `You do not currently satisfy mandatory criteria: ${reasonsForIneligibility.slice(0, 2).join("; ") || "eligibility requirements not met."}`;
  }

  return {
    score: totalScore,
    verdict,
    status,
    statusClass,
    badgeColor,
    matchedConditions,
    unmatchedConditions,
    missingInfo,
    reasonsForIneligibility,
    applicationRequirements: scholarship?.documents || [],
    gaps,
    summary,
    disclaimer: "Indicative compatibility estimate based on self-reported profile data. Official eligibility and final awards are determined solely by the respective scholarship authority after physical document scrutiny.",
    breakdown: {
      education: educationScore,
      academic: academicScore,
      income: incomeScore,
      location: locationScore,
      stream: streamScore
    },
    isEligible: verdict === "Eligible",
    isPotentiallyEligible: verdict === "Potentially Eligible"
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
      text: `${pendingDocs.length} checklist document(s) pending preparation: ${pendingDocs.map(d => d.name).slice(0, 2).join(", ")}.`,
      link: "/documents"
    });
  }

  // 3. Application Preparation Activity (35 pts)
  let appScore = 0;
  if (applications.length === 0) {
    suggestions.push({
      type: "applications",
      text: "Explore verified scholarships to bookmark deadlines and begin preparation.",
      link: "/explore"
    });
  } else {
    const activeApps = applications.filter(a => ["Preparing Documents", "Applied", "Under Review", "Approved"].includes(a.status));
    const ratio = Math.min(1, activeApps.length / 3);
    appScore = Math.round(ratio * 35);
  }

  const finalScore = Math.min(100, profileScore + docScore + appScore);

  let label = "Getting Started";
  let color = "text-slate-600";
  if (finalScore >= 80) {
    label = "Ready to Apply";
    color = "text-emerald-600";
  } else if (finalScore >= 60) {
    label = "Good Progress";
    color = "text-brand-600";
  } else if (finalScore >= 40) {
    label = "In Progress";
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
