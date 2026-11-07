/**
 * Centralized User Profile and Pre-seeded Opportunity State for GRANTLY
 * Default user: Dhruv Sonagara (Dwarka, Gujarat, India)
 */

export const INITIAL_USER_PROFILE = {
  id: "usr-dhruv-01",
  name: "Dhruv Sonagara",
  email: "dhruv.sonagara@grantly.edu",
  avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80",
  phone: "+91 98250 12345",
  gender: "Male",
  city: "Dwarka",
  state: "Gujarat",
  country: "India",
  education: {
    level: "Undergraduate",
    degree: "B.Tech in Computer Engineering",
    institution: "Government Engineering College, Gujarat (GTU)",
    year: "3rd Year",
    expectedGraduation: "2027",
    specialization: "Software Systems & Cloud Architecture"
  },
  academics: {
    cgpa: 8.6,
    cgpaScale: 10,
    percentage: 86,
    twelfthPercentage: 89.2,
    tenthPercentage: 92.4,
    hasActiveBacklogs: false
  },
  financial: {
    annualFamilyIncome: 380000, // ₹3.8 LPA
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

// Alias for backward compatibility if imported elsewhere
export const INITIAL_DEMO_USER = INITIAL_USER_PROFILE;

export const INITIAL_SAVED_SCHOLARSHIPS = [
  "sch-004", // MYSY Gujarat
  "sch-001", // Apex STEM
  "sch-002", // Pragati National Grant
  "sch-007"  // NextGen Software Engineers
];

export const INITIAL_APPLICATIONS = [
  {
    id: "app-101",
    scholarshipId: "sch-004",
    scholarshipTitle: "Mukhyamantri Yuva Swavalamban Yojana (MYSY - Gujarat)",
    organization: "Education Department, Government of Gujarat",
    awardAmount: "₹1,00,000 / year",
    amountValue: 100000,
    status: "Under Review",
    appliedDate: "2026-10-28",
    targetSubmitDate: "2026-10-28",
    deadline: "2026-11-15",
    notes: "Applied via MYSY state portal. Institute scrutiny cleared; awaiting nodal officer disbursement authorization.",
    progressPercent: 90,
    timeline: [
      { date: "2026-10-15", title: "Discovered Opportunity", description: "Identified via Gujarat state quota matching (100% Match)" },
      { date: "2026-10-20", title: "Eligibility Confirmed", description: "Verified 8.6 CGPA & Gujarat domicile certificate" },
      { date: "2026-10-28", title: "Application Submitted", description: "Uploaded documents on MYSY Gujarat portal" },
      { date: "2026-11-03", title: "College Verified", description: "GEC Principal desk approved certificate scrutiny" }
    ]
  },
  {
    id: "app-102",
    scholarshipId: "sch-001",
    scholarshipTitle: "Apex STEM Future Leaders Fellowship",
    organization: "Global Technology Foundation",
    awardAmount: "₹2,50,000 / year",
    amountValue: 250000,
    status: "Preparing Documents",
    appliedDate: null,
    targetSubmitDate: "2026-11-09",
    deadline: "2026-11-10",
    notes: "Need to attach faculty recommendation letter and finalize Statement of Purpose.",
    progressPercent: 75,
    timeline: [
      { date: "2026-10-20", title: "Discovered Opportunity", description: "Smart Match compatibility 96%" },
      { date: "2026-10-25", title: "Eligibility Confirmed", description: "Satisfies CGPA 8.6 vs required 8.2" },
      { date: "2026-11-02", title: "Document Checklist Initiated", description: "Uploaded academic marksheets and portfolio draft" }
    ]
  },
  {
    id: "app-103",
    scholarshipId: "sch-002",
    scholarshipTitle: "Pragati National Need-Cum-Merit Support Grant",
    organization: "Ministry of Education & Human Resources",
    awardAmount: "₹1,20,000 / year",
    amountValue: 120000,
    status: "Applied",
    appliedDate: "2026-11-01",
    targetSubmitDate: "2026-11-01",
    deadline: "2026-11-13",
    notes: "Submitted on National Scholarship Portal. Acknowledgement #NSP-2026-88192.",
    progressPercent: 85,
    timeline: [
      { date: "2026-10-18", title: "Discovered", description: "National quota compatibility" },
      { date: "2026-10-24", title: "Documents Ready", description: "Income certificate verified" },
      { date: "2026-11-01", title: "Application Submitted", description: "Application registered on NSP portal" }
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
    notes: "Review coding assessment questions before initiating formal application.",
    progressPercent: 25,
    timeline: [
      { date: "2026-11-03", title: "Saved to Watchlist", description: "Tracked for software engineering priority" }
    ]
  }
];

export const INITIAL_DOCUMENTS = [
  {
    id: "doc-1",
    name: "Latest Semester Marksheet (Sem 4 / 5)",
    type: "Academic",
    status: "Ready",
    lastUpdated: "2026-10-25",
    fileSize: "1.2 MB (PDF)",
    notes: "Official signed grade sheet from Gujarat Technological University."
  },
  {
    id: "doc-2",
    name: "Valid Family Income Certificate (FY 2026-27)",
    type: "Financial",
    status: "Ready",
    lastUpdated: "2026-10-20",
    fileSize: "850 KB (PDF)",
    notes: "Issued by Mamlatdar Office, Dwarka, valid through March 2027."
  },
  {
    id: "doc-3",
    name: "College Bonafide & Student ID Proof",
    type: "Institutional",
    status: "Ready",
    lastUpdated: "2026-10-22",
    fileSize: "620 KB (PDF)",
    notes: "Current semester bonafide stating roll number and enrollment."
  },
  {
    id: "doc-4",
    name: "State Domicile Certificate (Gujarat)",
    type: "Identity / Domicile",
    status: "Ready",
    lastUpdated: "2026-09-15",
    fileSize: "1.4 MB (PDF)",
    notes: "Permanent Gujarat domicile verification."
  },
  {
    id: "doc-5",
    name: "Faculty Letter of Recommendation",
    type: "Recommendation",
    status: "Pending",
    lastUpdated: "2026-11-04",
    fileSize: null,
    notes: "Draft shared with department HOD; awaiting final letterhead copy."
  },
  {
    id: "doc-6",
    name: "Nationalized Bank Account Passbook",
    type: "Banking",
    status: "Ready",
    lastUpdated: "2026-10-20",
    fileSize: "500 KB (PDF)",
    notes: "Aadhaar-seeded savings account with SBI Dwarka branch."
  },
  {
    id: "doc-7",
    name: "Statement of Purpose (SOP) & Project Portfolio",
    type: "Personal Statement",
    status: "Pending",
    lastUpdated: "2026-11-05",
    fileSize: null,
    notes: "Drafting 500-word essay highlighting cloud and AI contributions."
  }
];

export const INITIAL_PLANNER_TASKS = [
  {
    id: "task-1",
    title: "Obtain signed Letter of Recommendation from Department HOD",
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
    title: "Verify MYSY Gujarat scrutiny status with college nodal officer",
    category: "Follow-up",
    relatedScholarshipId: "sch-004",
    relatedScholarshipTitle: "MYSY Gujarat Scheme",
    dueDate: "2026-11-07",
    completed: true,
    priority: "Low"
  },
  {
    id: "task-5",
    title: "Review eligibility for Digital Gujarat textbook grant",
    category: "Exploration",
    relatedScholarshipId: "sch-006",
    relatedScholarshipTitle: "Digital Gujarat Higher Education Grant",
    dueDate: "2026-11-15",
    completed: false,
    priority: "Low"
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: "notif-1",
    type: "urgent",
    title: "Apex STEM Fellowship Deadline in 3 Days!",
    message: "Final date is November 10, 2026. You have 2 documents pending preparation.",
    date: "2 hours ago",
    read: false,
    link: "/scholarship/sch-001"
  },
  {
    id: "notif-2",
    type: "info",
    title: "High Match Opportunity Identified",
    message: "MYSY Gujarat Scheme matches your Dwarka, Gujarat domicile and 8.6 CGPA.",
    date: "1 day ago",
    read: false,
    link: "/scholarship/sch-004"
  },
  {
    id: "notif-3",
    type: "success",
    title: "MYSY Scrutiny Progressed",
    message: "Your application for Gujarat Higher Education Assistance was verified by college desk.",
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
