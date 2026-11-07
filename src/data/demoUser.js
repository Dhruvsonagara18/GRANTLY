/**
 * Pre-filled demo user profile for judge presentation & instant exploration
 * Meets all criteria from Section 5, 6, 21, and 29.
 */

export const INITIAL_DEMO_USER = {
  id: "usr-demo-01",
  name: "Aarav Sharma",
  email: "aarav.sharma@grantly.demo",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  phone: "+91 98765 43210",
  gender: "Male",
  state: "Maharashtra",
  city: "Pune",
  education: {
    level: "Undergraduate",
    degree: "B.Tech in Computer Science & Engineering",
    institution: "Pune Institute of Computer Technology (PICT)",
    year: "3rd Year",
    expectedGraduation: "2027",
    specialization: "Artificial Intelligence & Data Engineering"
  },
  academics: {
    cgpa: 8.4,
    cgpaScale: 10,
    percentage: 84,
    twelfthPercentage: 88.5,
    tenthPercentage: 92.0,
    hasActiveBacklogs: false
  },
  financial: {
    annualFamilyIncome: 420000, // ₹4.2 LPA
    incomeCategory: "Economically Weaker Section (EWS)",
    socialCategory: "General-EWS",
    hasIncomeCertificate: true,
    certificateValidTill: "2027-03-31"
  },
  preferences: {
    categories: ["Merit-based", "Need-based", "STEM / Engineering"],
    fundingTypes: ["Government", "Private"],
    minAwardAmount: 50000,
    willingToRelocate: true,
    targetDeadlineMonths: ["November", "December", "January"]
  },
  onboardingCompleted: true,
  createdAt: "2026-10-15T09:00:00Z"
};

export const INITIAL_SAVED_SCHOLARSHIPS = [
  "sch-001", // Apex STEM
  "sch-002", // Pragati Need-Cum-Merit
  "sch-004", // Maharashtra State Higher Education
  "sch-007"  // NextGen Software Engineers
];

export const INITIAL_APPLICATIONS = [
  {
    id: "app-101",
    scholarshipId: "sch-001",
    scholarshipTitle: "Apex STEM Future Leaders Fellowship",
    organization: "Global Technology Foundation",
    awardAmount: "₹2,50,000 / year",
    amountValue: 250000,
    status: "Preparing Documents", // Statuses: Interested, Preparing Documents, Applied, Under Review, Approved, Rejected
    appliedDate: null,
    targetSubmitDate: "2026-11-09",
    deadline: "2026-11-10",
    notes: "Need to finish faculty recommendation letter from Prof. Kulkarni and polish GitHub portfolio.",
    progressPercent: 75,
    timeline: [
      { date: "2026-10-20", title: "Discovered Opportunity", description: "Identified via Grantly Smart Match (94% Compatibility)" },
      { date: "2026-10-25", title: "Eligibility Confirmed", description: "Checked CGPA 8.4 vs required 8.2; verified all criteria" },
      { date: "2026-11-02", title: "Document Checklist Initiated", description: "Uploaded college ID, marksheets & SOP draft" }
    ]
  },
  {
    id: "app-102",
    scholarshipId: "sch-002",
    scholarshipTitle: "Pragati National Need-Cum-Merit Support Grant",
    organization: "Ministry of Education & Human Resources",
    awardAmount: "₹1,20,000 / year",
    amountValue: 120000,
    status: "Applied",
    appliedDate: "2026-11-01",
    targetSubmitDate: "2026-11-01",
    deadline: "2026-11-13",
    notes: "Submitted via NSP portal. Application tracking acknowledgement #NSP-2026-88192.",
    progressPercent: 100,
    timeline: [
      { date: "2026-10-18", title: "Discovered Opportunity", description: "Ranked as High Match on National quota" },
      { date: "2026-10-22", title: "Documents Verified", description: "Income certificate verified from Tehsildar" },
      { date: "2026-11-01", title: "Application Submitted", description: "Form successfully submitted on external government portal" }
    ]
  },
  {
    id: "app-103",
    scholarshipId: "sch-004",
    scholarshipTitle: "Maharashtra State Higher Education Assistance Scheme",
    organization: "Directorate of Technical Education, Maharashtra",
    awardAmount: "₹65,000 / year",
    amountValue: 65000,
    status: "Under Review",
    appliedDate: "2026-10-28",
    targetSubmitDate: "2026-10-28",
    deadline: "2026-11-09",
    notes: "Scrutiny in progress at Institute desk. Awaiting DTE nodal officer sign-off.",
    progressPercent: 100,
    timeline: [
      { date: "2026-10-16", title: "Discovered", description: "State domicile priority matching" },
      { date: "2026-10-28", title: "Submitted", description: "Applied on MahaDBT portal" },
      { date: "2026-11-04", title: "College Verified", description: "PICT Principal desk approved verification" }
    ]
  },
  {
    id: "app-104",
    scholarshipId: "sch-007",
    scholarshipTitle: "NextGen Software Engineers Excellence Award",
    organization: "Silicon Edge Foundation & Tech Giants Alliance",
    awardAmount: "₹1,80,000 / year",
    amountValue: 180000,
    status: "Interested",
    appliedDate: null,
    targetSubmitDate: "2026-11-11",
    deadline: "2026-11-12",
    notes: "Must review coding assessment syllabus before initiating formal application.",
    progressPercent: 20,
    timeline: [
      { date: "2026-11-03", title: "Saved to Pipeline", description: "Added to exploration watchlist" }
    ]
  }
];

export const INITIAL_DOCUMENTS = [
  {
    id: "doc-1",
    name: "Latest Semester Marksheet (Sem 4 / 5)",
    type: "Academic",
    status: "Ready", // Ready, Pending, Missing, Action Required
    lastUpdated: "2026-10-25",
    fileSize: "1.2 MB (PDF)",
    notes: "Official signed grade sheet from university exam controller."
  },
  {
    id: "doc-2",
    name: "Valid Family Income Certificate (FY 2026-27)",
    type: "Financial",
    status: "Ready",
    lastUpdated: "2026-10-20",
    fileSize: "850 KB (PDF)",
    notes: "Issued by Pune Sub-Divisional Magistrate, valid until March 2027."
  },
  {
    id: "doc-3",
    name: "College Bonafide & Student ID Proof",
    type: "Institutional",
    status: "Ready",
    lastUpdated: "2026-10-22",
    fileSize: "620 KB (PDF)",
    notes: "Current semester bonafide stating roll number and registration."
  },
  {
    id: "doc-4",
    name: "State Domicile Certificate (Maharashtra)",
    type: "Identity / Domicile",
    status: "Ready",
    lastUpdated: "2026-09-15",
    fileSize: "1.4 MB (PDF)",
    notes: "Permanent domicile verification issued by Maha e-Seva."
  },
  {
    id: "doc-5",
    name: "Faculty Letter of Recommendation (Prof. Kulkarni)",
    type: "Recommendation",
    status: "Pending",
    lastUpdated: "2026-11-04",
    fileSize: null,
    notes: "Draft shared with professor; awaiting final signed letterhead copy."
  },
  {
    id: "doc-6",
    name: "Nationalized Bank Account Passbook / Cancelled Cheque",
    type: "Banking",
    status: "Ready",
    lastUpdated: "2026-10-20",
    fileSize: "500 KB (PDF)",
    notes: "Aadhaar-seeded savings account with SBI Pune branch."
  },
  {
    id: "doc-7",
    name: "Statement of Purpose (SOP) & Project Portfolio",
    type: "Personal Statement",
    status: "Pending",
    lastUpdated: "2026-11-05",
    fileSize: null,
    notes: "Working on 500-word draft highlighting AI & open source contributions."
  }
];

export const INITIAL_PLANNER_TASKS = [
  {
    id: "task-1",
    title: "Obtain signed Letter of Recommendation from Prof. Kulkarni",
    category: "Documents",
    relatedScholarshipId: "sch-001",
    relatedScholarshipTitle: "Apex STEM Fellowship",
    dueDate: "2026-11-08",
    completed: false,
    priority: "High"
  },
  {
    id: "task-2",
    title: "Finalize Statement of Purpose (500 words) for Apex STEM",
    category: "Application",
    relatedScholarshipId: "sch-001",
    relatedScholarshipTitle: "Apex STEM Fellowship",
    dueDate: "2026-11-09",
    completed: false,
    priority: "High"
  },
  {
    id: "task-3",
    title: "Complete Silicon Edge 45-minute coding screening challenge",
    category: "Assessment",
    relatedScholarshipId: "sch-007",
    relatedScholarshipTitle: "NextGen Software Engineers",
    dueDate: "2026-11-11",
    completed: false,
    priority: "Medium"
  },
  {
    id: "task-4",
    title: "Check MahaDBT portal for Institute desk approval updates",
    category: "Follow-up",
    relatedScholarshipId: "sch-004",
    relatedScholarshipTitle: "Maharashtra State Scheme",
    dueDate: "2026-11-07",
    completed: true,
    priority: "Low"
  },
  {
    id: "task-5",
    title: "Review eligibility for BioSciences grant with academic advisor",
    category: "Exploration",
    relatedScholarshipId: "sch-011",
    relatedScholarshipTitle: "BioSciences Pioneers Grant",
    dueDate: "2026-11-15",
    completed: false,
    priority: "Low"
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: "notif-1",
    type: "urgent", // urgent, warning, success, info
    title: "Apex STEM Fellowship Deadline in 3 Days!",
    message: "Final date is November 10, 2026. You have 2 documents pending preparation.",
    date: "2 hours ago",
    read: false,
    link: "/scholarship/sch-001"
  },
  {
    id: "notif-2",
    type: "info",
    title: "94% High Match Opportunity Discovered",
    message: "Silicon Edge NextGen Software Engineers Award matches your CS major and 8.4 CGPA.",
    date: "1 day ago",
    read: false,
    link: "/scholarship/sch-007"
  },
  {
    id: "notif-3",
    type: "success",
    title: "MahaDBT Scrutiny Progressed",
    message: "Your application for Maharashtra State Assistance was verified by college principal.",
    date: "2 days ago",
    read: true,
    link: "/applications"
  },
  {
    id: "notif-4",
    type: "warning",
    title: "Document Readiness at 71%",
    message: "Complete 2 remaining checklist documents (SOP & Letter of Recommendation) to reach 100%.",
    date: "3 days ago",
    read: true,
    link: "/documents"
  }
];
