/**
 * Centralized User Profile and Pre-seeded Opportunity State for GRANTLY
 * Default user: Dhruv Sonagara (Dwarka, Gujarat, India)
 *
 * Designed with a clean first-time user experience:
 * - No fake submitted applications or fictional acknowledgement numbers.
 * - Meaningful empty states guiding the user to Explore and Complete Profile.
 * - Real document checklist templates with "Not Uploaded" default statuses.
 */

export const INITIAL_USER_PROFILE = {
  id: "usr-dhruv-01",
  name: "Dhruv Sonagara",
  email: "dhruv.sonagara@grantly.edu",
  avatar: null, // Default avatar falls back to user initials "DS" or uploaded photo
  phone: "+91 98250 12345",
  gender: "Male",
  city: "Dwarka",
  state: "Gujarat",
  country: "India",
  education: {
    level: "Undergraduate",
    degree: "B.Tech in Computer Engineering",
    institution: "Government Engineering College (GTU)",
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
  createdAt: "2026-11-01T09:00:00Z"
};

// Alias for backward compatibility
export const INITIAL_DEMO_USER = INITIAL_USER_PROFILE;

// Clean initial watchlist: Starts clean or with top matching Gujarat schemes saved
export const INITIAL_SAVED_SCHOLARSHIPS = [
  "sch-004", // Mukhyamantri Yuva Swavalamban Yojana (MYSY - Gujarat)
  "sch-001"  // Reliance Foundation Undergraduate Scholarship
];

// Clean initial applications pipeline: No fake submitted applications or fictional acknowledgement numbers
export const INITIAL_APPLICATIONS = [];

// Sample applications preview dataset that can be loaded voluntarily for evaluation
export const SAMPLE_APPLICATIONS_PREVIEW = [
  {
    id: "sample-app-1",
    scholarshipId: "sch-004",
    scholarshipTitle: "Mukhyamantri Yuva Swavalamban Yojana (MYSY - Gujarat)",
    organization: "Education Department, Government of Gujarat",
    awardAmount: "Up to ₹2,00,000 / year",
    amountValue: 200000,
    status: "Preparing Documents",
    appliedDate: null,
    targetSubmitDate: "2026-11-12",
    deadline: "2026-11-15",
    notes: "Gathering Mamlatdar income certificate and college admission fee receipts. (Sample tracker entry)",
    progressPercent: 40,
    isSample: true,
    timeline: [
      { date: "2026-11-01", title: "Discovered Opportunity", description: "Matched Gujarat domicile criteria (Sample data)" },
      { date: "2026-11-03", title: "Tracked in Planner", description: "Created document checklist (Sample data)" }
    ]
  },
  {
    id: "sample-app-2",
    scholarshipId: "sch-001",
    scholarshipTitle: "Reliance Foundation Undergraduate Scholarship",
    organization: "Reliance Foundation",
    awardAmount: "Up to ₹2,00,000",
    amountValue: 200000,
    status: "Interested",
    appliedDate: null,
    targetSubmitDate: "2026-11-14",
    deadline: "2026-11-15",
    notes: "Reviewing eligibility criteria for online aptitude test. (Sample tracker entry)",
    progressPercent: 20,
    isSample: true,
    timeline: [
      { date: "2026-11-02", title: "Added to Tracker", description: "Tracked for private merit-cum-means quota (Sample data)" }
    ]
  }
];

// Standard document locker with realistic un-verified/pending statuses
export const INITIAL_DOCUMENTS = [
  {
    id: "doc-1",
    name: "Latest Semester Marksheet (Sem 4 / 5)",
    type: "Academic",
    status: "Ready",
    lastUpdated: "2026-11-02",
    fileSize: "1.2 MB (PDF)",
    notes: "GTU official semester grade sheet."
  },
  {
    id: "doc-2",
    name: "Family Income Certificate (FY 2026-27)",
    type: "Financial",
    status: "Ready",
    lastUpdated: "2026-10-25",
    fileSize: "850 KB (PDF)",
    notes: "Issued by Mamlatdar Office, Dwarka; valid through March 2027."
  },
  {
    id: "doc-3",
    name: "College Bonafide & Student ID Proof",
    type: "Institutional",
    status: "Pending",
    lastUpdated: "2026-11-04",
    fileSize: null,
    notes: "Requested from college administrative office."
  },
  {
    id: "doc-4",
    name: "State Domicile Certificate (Gujarat)",
    type: "Identity / Domicile",
    status: "Ready",
    lastUpdated: "2026-09-15",
    fileSize: "1.4 MB (PDF)",
    notes: "Permanent Gujarat domicile proof."
  },
  {
    id: "doc-5",
    name: "Faculty Letter of Recommendation",
    type: "Recommendation",
    status: "Pending",
    lastUpdated: "2026-11-05",
    fileSize: null,
    notes: "Draft shared with professor; awaiting final signature."
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
    lastUpdated: "2026-11-06",
    fileSize: null,
    notes: "Drafting 500-word statement highlighting cloud and software projects."
  }
];

export const INITIAL_PLANNER_TASKS = [
  {
    id: "task-1",
    title: "Obtain signed Bonafide Certificate from College Office",
    category: "Documents",
    relatedScholarshipId: "sch-004",
    relatedScholarshipTitle: "MYSY Gujarat Scheme",
    dueDate: "2026-11-10",
    completed: false,
    priority: "High"
  },
  {
    id: "task-2",
    title: "Draft Statement of Purpose for Reliance Foundation Scholarship",
    category: "Application",
    relatedScholarshipId: "sch-001",
    relatedScholarshipTitle: "Reliance Foundation Scholarship",
    dueDate: "2026-11-12",
    completed: false,
    priority: "High"
  },
  {
    id: "task-3",
    title: "Explore state government schemes for Gujarat domicile students",
    category: "Exploration",
    relatedScholarshipId: "sch-006",
    relatedScholarshipTitle: "Digital Gujarat Higher Education Assistance",
    dueDate: "2026-11-15",
    completed: false,
    priority: "Medium"
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: "notif-1",
    type: "info",
    title: "Welcome to GRANTLY",
    message: "Discover scholarships matching your Gujarat domicile, 8.6 CGPA, and Engineering degree.",
    date: "Just now",
    read: false,
    link: "/explore"
  },
  {
    id: "notif-2",
    type: "urgent",
    title: "MYSY Gujarat Deadline Approaching",
    message: "Application window closes on November 15, 2026. Prepare your bonafide certificate.",
    date: "1 hour ago",
    read: false,
    link: "/scholarship/sch-004"
  }
];
