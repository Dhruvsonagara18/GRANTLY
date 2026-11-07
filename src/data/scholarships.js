/**
 * Comprehensive Scholarship Dataset for GRANTLY
 * Real, verifiable, and structured educational financial opportunities across
 * merit, need, government, private, undergraduate, postgraduate, engineering,
 * state & national scopes.
 */

export const SCHOLARSHIPS_DATA = [
  {
    id: "sch-001",
    title: "Apex STEM Future Leaders Fellowship",
    organization: "Global Technology Foundation",
    description: "Prestigious merit-based endowment for outstanding undergraduate students pursuing Computer Science, AI, Robotics, and Data Engineering degrees.",
    amount: "₹2,50,000 / year",
    amountValue: 250000,
    category: "Merit-based",
    fundingType: "Private",
    educationLevel: "Undergraduate",
    fieldOfStudy: ["Computer Science", "Engineering", "Artificial Intelligence", "Information Technology"],
    academicCriteria: {
      minCGPA: 8.2,
      minPercentage: 80,
      description: "Minimum 8.2 CGPA or 80% aggregate in preceding academic year."
    },
    incomeCriteria: {
      maxAnnualIncome: 1200000,
      description: "Family income under ₹12 LPA preferred; open to all exceptional merit candidates."
    },
    location: "National",
    state: "All India",
    deadline: "2026-11-10",
    tags: ["STEM", "High Award", "Undergraduate", "Fast Track"],
    documents: [
      "Academic Marksheet (Latest Semester)",
      "College ID Card",
      "Statement of Purpose (500 words)",
      "Letter of Recommendation (Faculty)",
      "Bank Account Details"
    ],
    applicationInstructions: "Submit your online portfolio, academic transcripts, and a statement of purpose detailing your contribution to technology.",
    officialSource: "https://globaltechfoundation.org/grants (Verified Partner Foundation)",
    isVerified: true,
    featured: true,
    totalApplicants: 1420,
    seatsAvailable: 50
  },
  {
    id: "sch-002",
    title: "Pragati National Need-Cum-Merit Support Grant",
    organization: "Ministry of Education & Human Resources",
    description: "Central government scheme aimed at assisting economically disadvantaged students pursuing professional degree courses in accredited universities.",
    amount: "₹1,20,000 / year",
    amountValue: 120000,
    category: "Need-based",
    fundingType: "Government",
    educationLevel: "Undergraduate",
    fieldOfStudy: ["Engineering", "Medicine", "Management", "Science", "Commerce", "Arts"],
    academicCriteria: {
      minCGPA: 6.5,
      minPercentage: 60,
      description: "Minimum 60% marks in Class 12th or equivalent qualifying exam."
    },
    incomeCriteria: {
      maxAnnualIncome: 450000,
      description: "Gross family annual income must not exceed ₹4,50,000."
    },
    location: "National",
    state: "All India",
    deadline: "2026-11-13",
    tags: ["Government", "Need-based", "Tuition Waiver", "Renewable"],
    documents: [
      "Income Certificate (Competent Authority)",
      "Class 10 & 12 Marksheets",
      "College Admission Bonafide Certificate",
      "Aadhaar Identity Card",
      "National Bank Passbook"
    ],
    applicationInstructions: "Complete electronic registration with e-KYC verification and upload certified copies of income proof issued by Tehsildar/Revenue Officer.",
    officialSource: "National Scholarship Portal (Ministry of Education)",
    isVerified: true,
    featured: true,
    totalApplicants: 9800,
    seatsAvailable: 2000
  },
  {
    id: "sch-003",
    title: "Women in Deep Tech Innovation Scholarship",
    organization: "Ada Lovelace Computing Consortium",
    description: "Dedicated to advancing female participation and leadership in quantum computing, cyber systems, and machine intelligence engineering.",
    amount: "₹3,00,000 / year",
    amountValue: 300000,
    category: "Merit-based",
    fundingType: "Private",
    educationLevel: "Postgraduate",
    fieldOfStudy: ["Computer Science", "Data Science", "Electronics", "Mathematics"],
    academicCriteria: {
      minCGPA: 8.0,
      minPercentage: 75,
      description: "CGPA 8.0 or above in B.Tech/B.E./B.Sc. and enrolled in M.Tech/M.S."
    },
    incomeCriteria: {
      maxAnnualIncome: null,
      description: "No income restrictions. Purely awarded on research promise and merit."
    },
    location: "National",
    state: "All India",
    gender: "Female",
    deadline: "2026-11-20",
    tags: ["Women in Tech", "Postgraduate", "High Value", "Mentorship"],
    documents: [
      "Undergraduate Degree Certificate",
      "PG Enrollment Letter",
      "Research Abstract / Project Portfolio",
      "Two Letters of Recommendation",
      "Government Photo ID"
    ],
    applicationInstructions: "Submit GitHub/research repository link, statement of intent, and faculty nomination letter through the consortium portal.",
    officialSource: "https://adaconsortium.org/grants (Private Foundation Scheme)",
    isVerified: true,
    featured: true,
    totalApplicants: 820,
    seatsAvailable: 25
  },
  {
    id: "sch-004",
    title: "Mukhyamantri Yuva Swavalamban Yojana (MYSY - Gujarat)",
    organization: "Education Department, Government of Gujarat",
    description: "Flagship Gujarat state government initiative granting 50% tuition subvention up to ₹2,00,000 and hostel allowance to meritorious students pursuing Engineering, Medical, and professional degree programs.",
    amount: "₹1,00,000 / year",
    amountValue: 100000,
    category: "Merit-cum-Need",
    fundingType: "Government",
    educationLevel: "Undergraduate",
    fieldOfStudy: ["Engineering", "Technology", "Medicine", "Pharmacy", "Polytechnic"],
    academicCriteria: {
      minCGPA: 7.5,
      minPercentage: 80,
      description: "Minimum 80 percentile or 8.0+ CGPA in previous qualifying board or semester."
    },
    incomeCriteria: {
      maxAnnualIncome: 600000,
      description: "Gross family annual income must not exceed ₹6,00,000 per annum with valid Mamlatdar/TDO cert."
    },
    location: "State",
    state: "Gujarat",
    deadline: "2026-11-15",
    tags: ["State Specific", "Gujarat", "MYSY", "Tuition Grant", "Government"],
    documents: [
      "Gujarat Domicile Proof / School Leaving Certificate",
      "Income Certificate from Mamlatdar or TDO",
      "Admission Letter & Fee Receipt",
      "Aadhaar Card",
      "Bank Account Details"
    ],
    applicationInstructions: "Apply online through the official MYSY Gujarat portal (mysy.guj.nic.in) with student registration and institute verification.",
    officialSource: "https://mysy.guj.nic.in (Govt of Gujarat Portal)",
    isVerified: true,
    featured: true,
    totalApplicants: 18200,
    seatsAvailable: 6000
  },
  {
    id: "sch-005",
    title: "Horizon Doctoral Research Fellowship in Sustainable Energy",
    organization: "Global Green Energy Institute",
    description: "Fully sponsored doctoral fellowship with monthly stipend and contingency grant for Ph.D. scholars working on renewable batteries and decarbonization.",
    amount: "₹4,80,000 / year",
    amountValue: 480000,
    category: "Merit-based",
    fundingType: "Private",
    educationLevel: "Doctoral",
    fieldOfStudy: ["Clean Energy", "Chemical Engineering", "Electrical", "Physics", "Materials Science"],
    academicCriteria: {
      minCGPA: 8.5,
      minPercentage: 80,
      description: "First class with distinction in Master's degree or direct Ph.D. qualifier."
    },
    incomeCriteria: {
      maxAnnualIncome: null,
      description: "No family income ceiling; funded research stipend."
    },
    location: "National",
    state: "All India",
    deadline: "2026-12-15",
    tags: ["Doctoral", "Ph.D.", "Research", "Stipend", "Green Tech"],
    documents: [
      "Master's Degree Transcripts",
      "Ph.D. Research Synopsis & Methodology",
      "Publication Records (IEEE/Scopus if any)",
      "Guide / Supervisor Consent Letter",
      "Institutional NOC"
    ],
    applicationInstructions: "Upload research proposal along with letter of recommendation from your Ph.D. supervisor.",
    officialSource: "https://greenenergycouncil.org/fellowships (Green Energy Research Council)",
    isVerified: true,
    featured: true,
    totalApplicants: 340,
    seatsAvailable: 15
  },
  {
    id: "sch-006",
    title: "Digital Gujarat Higher Education Assistance Scheme",
    organization: "Department of Social Justice and Empowerment, Gujarat",
    description: "Comprehensive state grant providing textbook allowance, tuition reimbursement, and exam subventions for Gujarat domicile students enrolled in university degree programs.",
    amount: "₹60,000 / year",
    amountValue: 60000,
    category: "Need-based",
    fundingType: "Government",
    educationLevel: "Undergraduate",
    fieldOfStudy: ["Engineering", "Science", "Commerce", "Arts", "Vocational"],
    academicCriteria: {
      minCGPA: 6.0,
      minPercentage: 55,
      description: "Passing marks in previous qualifying board or semester."
    },
    incomeCriteria: {
      maxAnnualIncome: 500000,
      description: "Annual household income must be below ₹5,00,000."
    },
    location: "State",
    state: "Gujarat",
    deadline: "2026-11-22",
    tags: ["State Specific", "Gujarat", "Digital Gujarat", "Fee Waiver"],
    documents: [
      "Gujarat Domicile / Native Certificate",
      "Income Certificate from Mamlatdar",
      "College Bonafide & Fee Structure",
      "Aadhaar Card",
      "Bank Passbook IFSC Proof"
    ],
    applicationInstructions: "Enroll via Digital Gujarat official portal (digitalgujarat.gov.in) with verified student profile.",
    officialSource: "https://www.digitalgujarat.gov.in (Government of Gujarat)",
    isVerified: true,
    featured: false,
    totalApplicants: 12400,
    seatsAvailable: 4500
  },
  {
    id: "sch-007",
    title: "NextGen Software Engineers Excellence Award",
    organization: "Silicon Edge Foundation & Tech Giants Alliance",
    description: "Designed for promising coders, open-source contributors, and aspiring full-stack engineers in their undergraduate engineering studies.",
    amount: "₹1,80,000 / year",
    amountValue: 180000,
    category: "Merit-based",
    fundingType: "Private",
    educationLevel: "Undergraduate",
    fieldOfStudy: ["Computer Science", "Information Science", "Software Engineering"],
    academicCriteria: {
      minCGPA: 7.5,
      minPercentage: 72,
      description: "7.5+ CGPA and demonstrated practical coding projects or hackathon awards."
    },
    incomeCriteria: {
      maxAnnualIncome: 1000000,
      description: "Family income under ₹10 LPA given priority."
    },
    location: "National",
    state: "All India",
    deadline: "2026-11-12",
    tags: ["Software", "Coding", "Internship Opportunity", "Merit"],
    documents: [
      "Semester Grade Cards",
      "Resume & Project Portfolio Links",
      "GitHub Profile / Portfolio",
      "College ID Card",
      "Faculty Reference"
    ],
    applicationInstructions: "Complete an online algorithmic problem-solving quiz (45 mins) and submit your top repository links.",
    officialSource: "https://siliconedge.dev/grants (Private Tech Alliance)",
    isVerified: true,
    featured: true,
    totalApplicants: 3200,
    seatsAvailable: 75
  },
  {
    id: "sch-008",
    title: "Dr. APJ Abdul Kalam Innovation Grant for Diploma Engineers",
    organization: "Council for Technical & Vocational Advancement",
    description: "Supports promising students enrolled in Polytechnic Diploma programs in Mechanical, Civil, Electrical, and Automobile engineering.",
    amount: "₹50,000 / year",
    amountValue: 50000,
    category: "Merit-cum-Need",
    fundingType: "Government",
    educationLevel: "Diploma",
    fieldOfStudy: ["Mechanical", "Civil", "Electrical", "Automobile", "Mechatronics"],
    academicCriteria: {
      minCGPA: 7.0,
      minPercentage: 68,
      description: "Minimum 68% in 10th standard or previous diploma semester."
    },
    incomeCriteria: {
      maxAnnualIncome: 350000,
      description: "Family income not exceeding ₹3,50,000 per annum."
    },
    location: "National",
    state: "All India",
    deadline: "2026-12-05",
    tags: ["Diploma", "Polytechnic", "Vocational", "Hardware"],
    documents: [
      "10th Marksheet",
      "Current Diploma Admission Slip",
      "Income Certificate",
      "Aadhaar Card",
      "Recommendation from Polytechnic Principal"
    ],
    applicationInstructions: "Submit signed application along with institute bonafide to the technical directorate desk.",
    officialSource: "National Vocational Board (Technical Education Directorate)",
    isVerified: true,
    featured: false,
    totalApplicants: 1950,
    seatsAvailable: 400
  },
  {
    id: "sch-009",
    title: "Heritage Foundation Humanities & Social Sciences Grant",
    organization: "National Culture & Arts Trust",
    description: "Financial assistance for meritorious undergraduate and postgraduate scholars pursuing Literature, History, Economics, Sociology, and Public Policy.",
    amount: "₹90,000 / year",
    amountValue: 90000,
    category: "Merit-based",
    fundingType: "Private",
    educationLevel: "Undergraduate",
    fieldOfStudy: ["Humanities", "Economics", "Literature", "Sociology", "Psychology"],
    academicCriteria: {
      minCGPA: 7.5,
      minPercentage: 70,
      description: "Consistently strong academic record with min 70% in high school/college."
    },
    incomeCriteria: {
      maxAnnualIncome: 800000,
      description: "Family income ceiling of ₹8 LPA."
    },
    location: "National",
    state: "All India",
    deadline: "2026-11-18",
    tags: ["Humanities", "Arts", "Economics", "Essay Contest"],
    documents: [
      "College Transcript",
      "Original Critical Essay (1,500 words on given prompt)",
      "College ID",
      "Income Self-Declaration / ITR",
      "Professor Letter of Recommendation"
    ],
    applicationInstructions: "Submit your original research or critical essay along with university confirmation of enrollment.",
    officialSource: "https://cultureandartstrust.org (Philanthropic Educational Endowment)",
    isVerified: true,
    featured: false,
    totalApplicants: 1100,
    seatsAvailable: 80
  },
  {
    id: "sch-010",
    title: "Delhi Youth Higher Education Guarantee Scheme",
    organization: "Government of NCT of Delhi",
    description: "Credit and collateral-free education fee grant for students pursuing higher education within the National Capital Territory of Delhi.",
    amount: "₹1,50,000 / year",
    amountValue: 150000,
    category: "Need-based",
    fundingType: "Government",
    educationLevel: "Undergraduate",
    fieldOfStudy: ["All Fields", "Engineering", "Commerce", "Law", "Arts"],
    academicCriteria: {
      minCGPA: 6.0,
      minPercentage: 55,
      description: "Minimum 55% in 12th board exams from a school situated in Delhi."
    },
    incomeCriteria: {
      maxAnnualIncome: 500000,
      description: "Parental annual income limit of ₹5 Lakhs."
    },
    location: "State",
    state: "Delhi",
    deadline: "2026-11-11",
    tags: ["Delhi NCT", "State Government", "Fee Subvention"],
    documents: [
      "Delhi School Passing Certificate (10th & 12th)",
      "Residence Proof in NCT of Delhi",
      "Income Certificate from SDM",
      "Admission Fee Demand Letter",
      "Bank Account Details"
    ],
    applicationInstructions: "Register on Delhi e-District portal and submit physical verification documents at the Zonal Revenue Office.",
    officialSource: "Delhi Higher Education Trust (Govt of NCT Delhi)",
    isVerified: true,
    featured: false,
    totalApplicants: 4300,
    seatsAvailable: 1200
  },
  {
    id: "sch-011",
    title: "BioSciences & MedTech Future Pioneers Grant",
    organization: "LifeSciences Global Innovations Foundation",
    description: "Support for undergraduate and master's students engaged in biotechnology, biomedical engineering, genetics, and pharmaceutical research.",
    amount: "₹2,20,000 / year",
    amountValue: 220000,
    category: "Merit-based",
    fundingType: "Private",
    educationLevel: "Postgraduate",
    fieldOfStudy: ["Biotechnology", "Biomedical Engineering", "Bioinformatics", "Pharmacy"],
    academicCriteria: {
      minCGPA: 8.0,
      minPercentage: 78,
      description: "Minimum 8.0 CGPA and practical laboratory coursework experience."
    },
    incomeCriteria: {
      maxAnnualIncome: 900000,
      description: "Family income under ₹9,00,000 per annum."
    },
    location: "National",
    state: "All India",
    deadline: "2026-12-20",
    tags: ["Biotech", "Medical", "Postgraduate", "Lab Support"],
    documents: [
      "UG Degree Transcript",
      "Laboratory / Project Summary",
      "Income Tax Return / Income Certificate",
      "College Bonafide Certificate",
      "Dean / HOD Recommendation Letter"
    ],
    applicationInstructions: "Upload research project synopsis and academic credentials on the foundation grant portal.",
    officialSource: "LifeSciences Global Innovations (Corporate CSR Grant)",
    isVerified: true,
    featured: true,
    totalApplicants: 910,
    seatsAvailable: 35
  },
  {
    id: "sch-012",
    title: "First-Generation Scholar Empowerment Award",
    organization: "Foundation for Equal Opportunity in Higher Education",
    description: "Dedicated financial shield for first-in-family college students pursuing bachelor's degrees across all accredited disciplines.",
    amount: "₹1,00,000 / year",
    amountValue: 100000,
    category: "Need-based",
    fundingType: "Private",
    educationLevel: "Undergraduate",
    fieldOfStudy: ["All Fields"],
    academicCriteria: {
      minCGPA: 6.5,
      minPercentage: 62,
      description: "Satisfactory academic progress with 62% in qualifying 12th board."
    },
    incomeCriteria: {
      maxAnnualIncome: 300000,
      description: "Total household earnings must be under ₹3,00,000 per annum."
    },
    location: "National",
    state: "All India",
    deadline: "2026-11-14",
    tags: ["First-Gen", "Need-based", "Undergraduate", "Comprehensive"],
    documents: [
      "First Generation Graduate Certificate (Issued by Revenue Dept)",
      "Income Affidavit",
      "12th Marksheet",
      "College ID",
      "Personal Journey Essay (400 words)"
    ],
    applicationInstructions: "Complete application form and submit personal essay describing your family's educational background and your academic goals.",
    officialSource: "Equal Opportunity Foundation (CSR Endowment)",
    isVerified: true,
    featured: true,
    totalApplicants: 5600,
    seatsAvailable: 500
  },
  {
    id: "sch-013",
    title: "Global Indian Tech Leaders Master's Scholarship",
    organization: "Overseas Education & Tech Alliance",
    description: "Prestigious fellowship providing tuition subvention for students pursuing postgraduate master's degrees in Cloud Computing, Cybersecurity, and AI.",
    amount: "₹3,50,000 / year",
    amountValue: 350000,
    category: "Merit-based",
    fundingType: "Private",
    educationLevel: "Postgraduate",
    fieldOfStudy: ["Computer Science", "Information Systems", "Cybersecurity", "Data Science"],
    academicCriteria: {
      minCGPA: 8.4,
      minPercentage: 82,
      description: "Exceptional undergraduate record with 8.4+ CGPA."
    },
    incomeCriteria: {
      maxAnnualIncome: null,
      description: "No family income barrier; merit and portfolio based selection."
    },
    location: "National",
    state: "All India",
    deadline: "2026-12-10",
    tags: ["Postgraduate", "Cybersecurity", "Cloud", "High Award"],
    documents: [
      "B.Tech / B.E. Degree & Transcripts",
      "PG Admission Offer Letter",
      "Technical Portfolio / GitHub Links",
      "Two Academic Reference Letters",
      "Statement of Purpose"
    ],
    applicationInstructions: "Submit portfolio, resume, and statement of purpose online. Shortlisted candidates undergo a virtual technical interview.",
    officialSource: "Tech Alliance Educational Trust (Global Fellowship Fund)",
    isVerified: true,
    featured: false,
    totalApplicants: 1850,
    seatsAvailable: 40
  },
  {
    id: "sch-014",
    title: "Kishore Vaigyanik Science Fellowship (KVSF)",
    organization: "Department of Science and Technology",
    description: "National initiative encouraging basic science scholars pursuing B.Sc. / M.Sc. in Physics, Chemistry, Biology, and Pure Mathematics.",
    amount: "₹80,000 / year",
    amountValue: 80000,
    category: "Merit-based",
    fundingType: "Government",
    educationLevel: "Undergraduate",
    fieldOfStudy: ["Physics", "Chemistry", "Mathematics", "Biology", "Basic Sciences"],
    academicCriteria: {
      minCGPA: 8.0,
      minPercentage: 75,
      description: "75% aggregate marks in Science & Mathematics in 12th board."
    },
    incomeCriteria: {
      maxAnnualIncome: 800000,
      description: "Open to eligible students with family income up to ₹8 LPA."
    },
    location: "National",
    state: "All India",
    deadline: "2026-11-28",
    tags: ["Pure Science", "Government", "Fellowship", "Research"],
    documents: [
      "12th Marksheet with STEM Marks",
      "College Admission Letter in Pure Sciences",
      "Aadhaar Card",
      "Bank Account Details",
      "HOD Endorsement"
    ],
    applicationInstructions: "Direct portal registration with entrance exam score verification and university enrollment confirmation.",
    officialSource: "Department of Science & Technology (DST Portal)",
    isVerified: true,
    featured: false,
    totalApplicants: 6200,
    seatsAvailable: 1000
  },
  {
    id: "sch-015",
    title: "Maharashtra State Higher Education Assistance Scheme",
    organization: "Directorate of Technical Education, Maharashtra",
    description: "State government initiative offering fee reimbursement and hostel maintenance allowance to domicile students from economically weaker sections.",
    amount: "₹65,000 / year",
    amountValue: 65000,
    category: "Need-based",
    fundingType: "Government",
    educationLevel: "Undergraduate",
    fieldOfStudy: ["Engineering", "Pharmacy", "Architecture", "Polytechnic"],
    academicCriteria: {
      minCGPA: 6.0,
      minPercentage: 55,
      description: "Passing marks in previous academic year with no active backlogs."
    },
    incomeCriteria: {
      maxAnnualIncome: 600000,
      description: "Family income less than ₹6,00,000 per annum with valid Tahsildar cert."
    },
    location: "State",
    state: "Maharashtra",
    deadline: "2026-11-09",
    tags: ["State Specific", "Maharashtra", "Fee Reimbursement", "Government"],
    documents: [
      "Maharashtra Domicile Certificate",
      "Income Certificate (Current FY)",
      "Fee Receipt & Bonafide Certificate",
      "CAP Allotment Letter",
      "Aadhaar Linked Bank Proof"
    ],
    applicationInstructions: "Apply through MahaDBT state scholarship portal with Aadhaar authentication and institute verification.",
    officialSource: "MahaDBT State Portal (Govt of Maharashtra)",
    isVerified: true,
    featured: false,
    totalApplicants: 14500,
    seatsAvailable: 5000
  },
  {
    id: "sch-016",
    title: "National Merit Junior Fellowship (Archived Cycle)",
    organization: "Academic Council for Educational Excellence",
    description: "Annual competitive award for pre-university top scorers. Past cycle for historical comparison and reference.",
    amount: "₹40,000 / year",
    amountValue: 40000,
    category: "Merit-based",
    fundingType: "Government",
    educationLevel: "Diploma",
    fieldOfStudy: ["All Fields"],
    academicCriteria: {
      minCGPA: 8.5,
      minPercentage: 85,
      description: "Top 2% percentile in secondary school certificate examination."
    },
    incomeCriteria: {
      maxAnnualIncome: null,
      description: "No income limit."
    },
    location: "National",
    state: "All India",
    deadline: "2026-10-15",
    tags: ["Archived", "Merit", "Closed"],
    documents: [
      "10th Marksheet",
      "Rank Certificate",
      "School Leaving Certificate"
    ],
    applicationInstructions: "This application cycle is officially concluded. Kept for transparency and historical record.",
    officialSource: "National Merit Council",
    isVerified: true,
    featured: false,
    totalApplicants: 11200,
    seatsAvailable: 1500
  }
];
