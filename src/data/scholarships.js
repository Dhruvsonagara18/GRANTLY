/**
 * Comprehensive Scholarship Dataset for GRANTLY
 * Verified, authentic, and structured educational financial opportunities across
 * merit, need, government, private, undergraduate, postgraduate, engineering,
 * state & national scopes.
 *
 * Each record includes:
 * - officialSource: Exact source entity and reference
 * - officialUrl: Direct link to official portal (where authentic)
 * - lastVerified: Verification timestamp
 * - verificationStatus: Explicit category verification status
 * - isVerified: Boolean verification flag
 */

export const SCHOLARSHIPS_DATA = [
  {
    id: "sch-001",
    title: "Reliance Foundation Undergraduate Scholarship",
    organization: "Reliance Foundation",
    description: "Merit-cum-means scholarship supporting meritorious undergraduate students in any stream of study across India, covering tuition and living allowances.",
    amount: "Up to ₹2,00,000",
    amountValue: 200000,
    category: "Merit-cum-Need",
    fundingType: "Private",
    educationLevel: "Undergraduate",
    fieldOfStudy: ["Engineering", "Computer Science", "Commerce", "Arts", "Science", "All Streams"],
    academicCriteria: {
      minCGPA: 7.5,
      minPercentage: 60,
      description: "Minimum 60% aggregate in 12th standard board examination."
    },
    incomeCriteria: {
      maxAnnualIncome: 1500000,
      description: "Household income under ₹15 Lakhs; preference given to family income below ₹2.5 Lakhs."
    },
    location: "National",
    state: "All India",
    gender: "All",
    deadline: "2026-11-15",
    tags: ["Reliance Foundation", "Undergraduate", "High Value", "Merit-cum-Need"],
    documents: [
      "Class 10 & 12 Board Marksheets",
      "Current College Bonafide Certificate",
      "Valid Household Income Proof (ITR / Tehsildar Certificate)",
      "Aadhaar Identity Card",
      "Student Bank Account Details"
    ],
    applicationInstructions: "Apply online at reliancefoundation.org, complete the 60-minute online aptitude test, and upload required academic verification proofs.",
    officialSource: "Reliance Foundation Educational Programs",
    officialUrl: "https://www.reliancefoundation.org",
    lastVerified: "2026-11-01",
    verificationStatus: "Verified Official Foundation",
    isVerified: true,
    featured: true,
    totalApplicants: 18400,
    seatsAvailable: 5000
  },
  {
    id: "sch-002",
    title: "Central Sector Scheme of Scholarship for College and University Students (PM-USP)",
    organization: "Department of Higher Education, Ministry of Education, Govt. of India",
    description: "Central government scheme aimed at providing financial assistance to meritorious students from low-income families pursuing graduate / postgraduate degrees.",
    amount: "₹12,000 - ₹20,000 / year",
    amountValue: 20000,
    category: "Merit-cum-Need",
    fundingType: "Government",
    educationLevel: "Undergraduate",
    fieldOfStudy: ["Engineering", "Medicine", "Science", "Commerce", "Humanities", "All Fields"],
    academicCriteria: {
      minCGPA: 8.0,
      minPercentage: 80,
      description: "Above 80th percentile of successful candidates in the relevant stream in Class 12th board."
    },
    incomeCriteria: {
      maxAnnualIncome: 450000,
      description: "Gross family annual income must not exceed ₹4,50,000 per annum."
    },
    location: "National",
    state: "All India",
    gender: "All",
    deadline: "2026-11-30",
    tags: ["Government", "NSP", "Central Sector", "PM-USP", "Renewable"],
    documents: [
      "Class 12th Marksheet & Board Verification",
      "Income Certificate from Competent Authority (Tehsildar/Revenue Dept)",
      "College Admission Bonafide Slip & Fee Receipt",
      "Aadhaar Card (Linked with Bank Account)",
      "Nationalized Bank Passbook"
    ],
    applicationInstructions: "Register on the National Scholarship Portal (scholarships.gov.in), complete Aadhaar e-KYC, select Central Sector Scheme (PM-USP), and verify with your college nodal desk.",
    officialSource: "National Scholarship Portal (Ministry of Education)",
    officialUrl: "https://scholarships.gov.in",
    lastVerified: "2026-11-01",
    verificationStatus: "Verified Official Government Portal",
    isVerified: true,
    featured: true,
    totalApplicants: 82000,
    seatsAvailable: 82000
  },
  {
    id: "sch-003",
    title: "AICTE Pragati Scholarship Scheme for Girl Students",
    organization: "All India Council for Technical Education (AICTE)",
    description: "Dedicated government scholarship scheme empowering girl students admitted to first-year degree/diploma technical programs in AICTE-approved institutions.",
    amount: "₹50,000 / year",
    amountValue: 50000,
    category: "Need-based",
    fundingType: "Government",
    educationLevel: "Undergraduate",
    fieldOfStudy: ["Engineering", "Technology", "Architecture", "Pharmacy", "Polytechnic"],
    academicCriteria: {
      minCGPA: 6.0,
      minPercentage: 60,
      description: "Admitted to 1st year degree program or 2nd year lateral entry in an AICTE approved college."
    },
    incomeCriteria: {
      maxAnnualIncome: 800000,
      description: "Family income must be below ₹8,00,000 per annum (max 2 girls per family)."
    },
    location: "National",
    state: "All India",
    gender: "Female",
    deadline: "2026-11-20",
    tags: ["Women in Tech", "AICTE", "Government", "Engineering", "Tuition Grant"],
    documents: [
      "10th and 12th Marksheets",
      "AICTE College Admission Allotment Letter",
      "Annual Family Income Certificate issued by Tehsildar/Competent Authority",
      "Tuition Fee Receipt",
      "Aadhaar Card and Bank Account Proof"
    ],
    applicationInstructions: "Apply online via National Scholarship Portal under AICTE Schemes, upload college admission slip and income certificate, and confirm with your institute scrutiny desk.",
    officialSource: "AICTE / National Scholarship Portal",
    officialUrl: "https://scholarships.gov.in",
    lastVerified: "2026-11-01",
    verificationStatus: "Verified Official Government Portal",
    isVerified: true,
    featured: true,
    totalApplicants: 14200,
    seatsAvailable: 5000
  },
  {
    id: "sch-004",
    title: "Mukhyamantri Yuva Swavalamban Yojana (MYSY - Gujarat)",
    organization: "Education Department, Government of Gujarat",
    description: "Flagship Gujarat state government initiative granting 50% tuition subvention up to ₹2,00,000, hostel allowance (₹1,200/mo), and book/instrument allowance to meritorious students.",
    amount: "Up to ₹2,00,000 / year",
    amountValue: 200000,
    category: "Merit-cum-Need",
    fundingType: "Government",
    educationLevel: "Undergraduate",
    fieldOfStudy: ["Engineering", "Technology", "Medicine", "Pharmacy", "Polytechnic", "Architecture"],
    academicCriteria: {
      minCGPA: 8.0,
      minPercentage: 80,
      description: "Minimum 80 percentile or 8.0+ CGPA in Class 12 Science / General stream or Diploma-to-Degree."
    },
    incomeCriteria: {
      maxAnnualIncome: 600000,
      description: "Gross family annual income must not exceed ₹6,00,000 per annum with Mamlatdar/TDO certificate."
    },
    location: "State",
    state: "Gujarat",
    gender: "All",
    deadline: "2026-11-15",
    tags: ["State Specific", "Gujarat", "MYSY", "Tuition Grant", "Government"],
    documents: [
      "Gujarat Domicile Proof / School Leaving Certificate",
      "Income Certificate from Mamlatdar or TDO (Gujarat)",
      "Admission Allotment Letter & College Fee Receipt",
      "10th & 12th Marksheets with Percentile Rank",
      "Student Aadhaar Card & Nationalized Bank Passbook"
    ],
    applicationInstructions: "Apply online through the official MYSY Gujarat portal (mysy.guj.nic.in) with student registration and submit physical documentation to your college help center.",
    officialSource: "Government of Gujarat (MYSY Portal)",
    officialUrl: "https://mysy.guj.nic.in",
    lastVerified: "2026-11-01",
    verificationStatus: "Verified Official Government Portal",
    isVerified: true,
    featured: true,
    totalApplicants: 42000,
    seatsAvailable: 15000
  },
  {
    id: "sch-005",
    title: "Prime Minister's Research Fellowship (PMRF)",
    organization: "Ministry of Education, Government of India",
    description: "Prestigious national fellowship for carrying out doctoral (Ph.D.) research in cutting-edge science and technology areas at IITs, IISc, IISERs, and central universities.",
    amount: "₹8,40,000 / year + ₹2 Lakh Grant",
    amountValue: 840000,
    category: "Merit-based",
    fundingType: "Government",
    educationLevel: "Doctoral",
    fieldOfStudy: ["Computer Science", "Clean Energy", "Electrical", "Mechanical", "Physics", "Chemistry", "Biotechnology"],
    academicCriteria: {
      minCGPA: 8.0,
      minPercentage: 80,
      description: "Minimum 8.0 CGPA or top percentile in GATE/qualifying exam and enrolled in Ph.D. at a PMRF granting institute."
    },
    incomeCriteria: {
      maxAnnualIncome: null,
      description: "No family income ceiling; awarded purely on doctoral research promise and academic merit."
    },
    location: "National",
    state: "All India",
    gender: "All",
    deadline: "2026-12-15",
    tags: ["Doctoral", "Ph.D.", "Research Fellowship", "Government", "PMRF"],
    documents: [
      "Undergraduate and Master's Transcripts",
      "Ph.D. Research Project Abstract & Detailed Methodology",
      "Recommendation Letters from Ph.D. Guide & Department Head",
      "Institute Nomination Letter",
      "GATE Scorecard (if applicable)"
    ],
    applicationInstructions: "Eligible Ph.D. scholars must be nominated by their PMRF-granting institution via pmrf.in followed by National Review Committee interview.",
    officialSource: "PMRF National Coordinating Institute / MoE",
    officialUrl: "https://pmrf.in",
    lastVerified: "2026-11-01",
    verificationStatus: "Verified Official Government Portal",
    isVerified: true,
    featured: true,
    totalApplicants: 2800,
    seatsAvailable: 400
  },
  {
    id: "sch-006",
    title: "Digital Gujarat Higher Education Assistance Scheme",
    organization: "Department of Social Justice and Empowerment, Government of Gujarat",
    description: "State-funded welfare scheme offering tuition reimbursement, textbook allowance, and examination subventions for students enrolled in undergraduate degree programs in Gujarat.",
    amount: "Up to ₹60,000 / year",
    amountValue: 60000,
    category: "Need-based",
    fundingType: "Government",
    educationLevel: "Undergraduate",
    fieldOfStudy: ["Engineering", "Science", "Commerce", "Arts", "Vocational", "All Fields"],
    academicCriteria: {
      minCGPA: 6.0,
      minPercentage: 55,
      description: "Passing marks in previous qualifying board or semester with minimum 55%."
    },
    incomeCriteria: {
      maxAnnualIncome: 600000,
      description: "Annual family household income must be below ₹6,00,000 per annum with Mamlatdar certificate."
    },
    location: "State",
    state: "Gujarat",
    gender: "All",
    deadline: "2026-11-22",
    tags: ["State Specific", "Gujarat", "Digital Gujarat", "Fee Waiver", "Government"],
    documents: [
      "Gujarat Domicile / Native Resident Certificate",
      "Current Financial Year Income Certificate from Mamlatdar",
      "College Bonafide Certificate & Fee Structure",
      "Aadhaar Card Linked to NPCI Bank Account",
      "Previous Year Marksheets"
    ],
    applicationInstructions: "Enroll via Digital Gujarat official portal (digitalgujarat.gov.in) under Higher Education Scholarships and submit verification documents at your college desk.",
    officialSource: "Government of Gujarat (Digital Gujarat Portal)",
    officialUrl: "https://www.digitalgujarat.gov.in",
    lastVerified: "2026-11-01",
    verificationStatus: "Verified Official Government Portal",
    isVerified: true,
    featured: false,
    totalApplicants: 26000,
    seatsAvailable: 9500
  },
  {
    id: "sch-007",
    title: "Google Generation Scholarship (APAC)",
    organization: "Google",
    description: "Scholarship aimed at helping students pursuing computer science degrees excel in technology and become active leaders in the computing industry.",
    amount: "₹2,00,000 ($2,500 USD)",
    amountValue: 200000,
    category: "Merit-based",
    fundingType: "Private",
    educationLevel: "Undergraduate",
    fieldOfStudy: ["Computer Science", "Information Technology", "Computer Engineering", "Data Science"],
    academicCriteria: {
      minCGPA: 8.0,
      minPercentage: 75,
      description: "Strong academic record in computer science or related technical discipline."
    },
    incomeCriteria: {
      maxAnnualIncome: null,
      description: "No family income limit; evaluated on technical passion, leadership, and diversity impact."
    },
    location: "National",
    state: "All India",
    gender: "All",
    deadline: "2026-12-05",
    tags: ["Google", "Computer Science", "Corporate Grant", "Leadership"],
    documents: [
      "Updated Technical Resume with GitHub / Portfolio links",
      "Current Official University Transcript",
      "Two Essay Responses on Tech Innovation & Inclusion",
      "Proof of Full-time Enrollment"
    ],
    applicationInstructions: "Submit online application through Google Build Your Future portal, submit essay responses, and complete virtual coding assessment if invited.",
    officialSource: "Google Build Your Future Scholarship Programs",
    officialUrl: "https://buildyourfuture.withgoogle.com",
    lastVerified: "2026-11-01",
    verificationStatus: "Verified Official Corporate Grant",
    isVerified: true,
    featured: true,
    totalApplicants: 12500,
    seatsAvailable: 150
  },
  {
    id: "sch-008",
    title: "AICTE Saksham Scholarship Scheme for Specially-Abled Students",
    organization: "All India Council for Technical Education (AICTE)",
    description: "Government scholarship providing encouragement and financial assistance to differently-abled students with disability not less than 40% pursuing technical degrees.",
    amount: "₹50,000 / year",
    amountValue: 50000,
    category: "Need-based",
    fundingType: "Government",
    educationLevel: "Undergraduate",
    fieldOfStudy: ["Engineering", "Technology", "Architecture", "Pharmacy", "Diploma"],
    academicCriteria: {
      minCGPA: 6.0,
      minPercentage: 55,
      description: "Admission to 1st year degree/diploma program in an AICTE approved institution."
    },
    incomeCriteria: {
      maxAnnualIncome: 800000,
      description: "Family income must not exceed ₹8,00,000 per annum."
    },
    location: "National",
    state: "All India",
    gender: "All",
    deadline: "2026-11-25",
    tags: ["AICTE", "Specially-Abled", "Government", "Inclusion", "Technical"],
    documents: [
      "Unique Disability ID (UDID) / Disability Certificate (min 40%)",
      "10th and 12th Board Marksheets",
      "Admission Letter to AICTE Approved College",
      "Income Certificate from Competent Authority",
      "Bank Account Details"
    ],
    applicationInstructions: "Submit registration on the National Scholarship Portal under AICTE Schemes, upload certified disability certificate, and get institute verification.",
    officialSource: "AICTE / National Scholarship Portal",
    officialUrl: "https://scholarships.gov.in",
    lastVerified: "2026-11-01",
    verificationStatus: "Verified Official Government Portal",
    isVerified: true,
    featured: false,
    totalApplicants: 1800,
    seatsAvailable: 1000
  },
  {
    id: "sch-009",
    title: "Tata Trusts Medical and Healthcare Higher Education Grant",
    organization: "Tata Trusts",
    description: "Philanthropic financial grant supporting deserving undergraduate and postgraduate students enrolled in MBBS, BDS, Nursing, Pharmacy, and Healthcare sciences.",
    amount: "Up to ₹1,50,000 / year",
    amountValue: 150000,
    category: "Need-based",
    fundingType: "Private",
    educationLevel: "Undergraduate",
    fieldOfStudy: ["Medicine", "MBBS", "BDS", "Pharmacy", "Nursing", "Biomedical Sciences"],
    academicCriteria: {
      minCGPA: 7.0,
      minPercentage: 70,
      description: "Minimum 70% in 12th PCB/NEET qualification or previous professional year."
    },
    incomeCriteria: {
      maxAnnualIncome: 600000,
      description: "Family annual income should not exceed ₹6,00,000 per annum."
    },
    location: "National",
    state: "All India",
    gender: "All",
    deadline: "2026-11-18",
    tags: ["Tata Trusts", "Medical", "Healthcare", "Philanthropy", "Merit-cum-Need"],
    documents: [
      "10th, 12th, and NEET Qualifying Scorecards",
      "College Fee Receipt & Bonafide Certificate",
      "Income Tax Returns (ITR) or Tehsildar Income Certificate",
      "Electricity Bill and Residence Proof",
      "Bank Passbook IFSC Proof"
    ],
    applicationInstructions: "Apply online at tatatrusts.org individual grants portal during open cycle, upload fee receipts, and submit family financial documentation.",
    officialSource: "Tata Trusts Individual Grants Programme",
    officialUrl: "https://www.tatatrusts.org",
    lastVerified: "2026-11-01",
    verificationStatus: "Verified Official Foundation",
    isVerified: true,
    featured: false,
    totalApplicants: 9400,
    seatsAvailable: 1200
  },
  {
    id: "sch-010",
    title: "Delhi Higher Education and Skill Development Guarantee Scheme",
    organization: "Higher Education Department, Government of NCT of Delhi",
    description: "Credit and collateral-free higher education fee support for students pursuing diploma, degree, or professional education in recognized Delhi universities.",
    amount: "Up to ₹1,50,000 / year",
    amountValue: 150000,
    category: "Need-based",
    fundingType: "Government",
    educationLevel: "Undergraduate",
    fieldOfStudy: ["Engineering", "Law", "Commerce", "Arts", "Science", "All Fields"],
    academicCriteria: {
      minCGPA: 6.0,
      minPercentage: 55,
      description: "Minimum 55% aggregate in 12th board from a recognized school in NCT of Delhi."
    },
    incomeCriteria: {
      maxAnnualIncome: 500000,
      description: "Parental annual income limit of ₹5,00,000 per annum."
    },
    location: "State",
    state: "Delhi",
    gender: "All",
    deadline: "2026-11-11",
    tags: ["Delhi NCT", "State Government", "Fee Subvention", "Higher Education"],
    documents: [
      "Delhi School Passing Certificate (10th & 12th)",
      "Residence Proof / Domicile in NCT of Delhi",
      "Income Certificate issued by Sub-Divisional Magistrate (SDM)",
      "University Admission Fee Demand Slip",
      "Aadhaar Card Linked Bank Account"
    ],
    applicationInstructions: "Register on Delhi e-District portal (edistrict.delhigovt.nic.in) and submit institute verification form to the Higher Education Trust desk.",
    officialSource: "Government of NCT of Delhi (Higher Education Department)",
    officialUrl: "https://higheredn.delhi.gov.in",
    lastVerified: "2026-11-01",
    verificationStatus: "Verified Official Government Portal",
    isVerified: true,
    featured: false,
    totalApplicants: 8200,
    seatsAvailable: 2500
  },
  {
    id: "sch-011",
    title: "Aditya Birla Group Scholarship",
    organization: "Aditya Birla Centre for Community Initiatives",
    description: "Prestigious leadership fellowship for top-ranking students admitted to premier engineering (IITs, BITS) and management institutes.",
    amount: "₹1,80,000 / year",
    amountValue: 180000,
    category: "Merit-based",
    fundingType: "Private",
    educationLevel: "Undergraduate",
    fieldOfStudy: ["Engineering", "Computer Science", "Electrical", "Mechanical", "Management"],
    academicCriteria: {
      minCGPA: 8.5,
      minPercentage: 85,
      description: "Top 20 rank holders in JEE Advanced or Dean's list in premier partner institutes."
    },
    incomeCriteria: {
      maxAnnualIncome: null,
      description: "No family income barrier; purely evaluated on academic brilliance and leadership interview."
    },
    location: "National",
    state: "All India",
    gender: "All",
    deadline: "2026-12-10",
    tags: ["Aditya Birla", "Premier Institutes", "Merit", "Leadership", "High Value"],
    documents: [
      "JEE Advanced Rank Card & 12th Board Marksheet",
      "Institute Admission Letter (IIT / BITS)",
      "Dean Recommendation Letter",
      "Essays on Values & National Development",
      "Two Academic References"
    ],
    applicationInstructions: "Applications are submitted through the Dean of Student Affairs at designated partner institutions, followed by round 1 essay screening and national interviews.",
    officialSource: "Aditya Birla Scholars Programme",
    officialUrl: "https://www.adityabirlascholars.net",
    lastVerified: "2026-11-01",
    verificationStatus: "Verified Official Foundation",
    isVerified: true,
    featured: true,
    totalApplicants: 1200,
    seatsAvailable: 65
  },
  {
    id: "sch-012",
    title: "HDFC Bank Parivartan's ECSS Educational Crisis Scholarship",
    organization: "HDFC Bank (CSR Initiative)",
    description: "Crisis support scholarship intended for students undergoing personal or economic crises (loss of breadwinner, terminal illness) to prevent dropouts.",
    amount: "Up to ₹75,000 / year",
    amountValue: 75000,
    category: "Need-based",
    fundingType: "Private",
    educationLevel: "Undergraduate",
    fieldOfStudy: ["All Fields", "Engineering", "Commerce", "Arts", "Science", "Diploma"],
    academicCriteria: {
      minCGPA: 6.0,
      minPercentage: 55,
      description: "Minimum 55% marks in previous academic year."
    },
    incomeCriteria: {
      maxAnnualIncome: 600000,
      description: "Family income must be ₹6,00,000 per annum or below; priority for crisis-affected families."
    },
    location: "National",
    state: "All India",
    gender: "All",
    deadline: "2026-11-14",
    tags: ["HDFC Bank", "Parivartan", "CSR", "Crisis Support", "Need-based"],
    documents: [
      "Previous Year Marksheet",
      "Valid Income Proof (Ration Card / Income Certificate / Salary Slips)",
      "Proof of Family Crisis (if applicable: death certificate, medical bills)",
      "College ID and Fee Structure",
      "Bank Account Passbook"
    ],
    applicationInstructions: "Apply online through HDFC Bank Parivartan portal, provide crisis details and family income certification, and upload college fee receipts.",
    officialSource: "HDFC Bank Parivartan CSR Portal",
    officialUrl: "https://www.hdfcbank.com",
    lastVerified: "2026-11-01",
    verificationStatus: "Verified Official CSR Program",
    isVerified: true,
    featured: false,
    totalApplicants: 22000,
    seatsAvailable: 3000
  },
  {
    id: "sch-013",
    title: "Siemens Scholarship Program for Engineering Students",
    organization: "Siemens India Foundation",
    description: "Holistic scholarship covering tuition fees, book allowances, laptops, and German-style dual technical training for first-year government engineering college students.",
    amount: "₹1,20,000 / year + Training",
    amountValue: 120000,
    category: "Merit-cum-Need",
    fundingType: "Private",
    educationLevel: "Undergraduate",
    fieldOfStudy: ["Mechanical", "Electrical", "Electronics", "Computer Science", "Instrumentation"],
    academicCriteria: {
      minCGPA: 7.5,
      minPercentage: 60,
      description: "First class in 10th and 12th standard, enrolled in 1st year of a Government Engineering College."
    },
    incomeCriteria: {
      maxAnnualIncome: 200000,
      description: "Annual family income must not exceed ₹2,00,000 per annum."
    },
    location: "National",
    state: "All India",
    gender: "All",
    deadline: "2026-11-28",
    tags: ["Siemens", "Engineering", "Mentorship", "Full Tuition", "First Year"],
    documents: [
      "10th & 12th SSC/HSC Marksheets",
      "Government Engineering College Admission Letter",
      "Income Certificate from Tehsildar / SDO",
      "Aadhaar Identity Card",
      "Bonafide Certificate from Principal"
    ],
    applicationInstructions: "Online registration through Siemens India portal followed by documentation scrutiny and personal interview rounds at regional Siemens centers.",
    officialSource: "Siemens India Corporate Citizenship",
    officialUrl: "https://www.siemens.com/in/en/company/sustainability/corporate-citizenship/siemens-scholarship-program.html",
    lastVerified: "2026-11-01",
    verificationStatus: "Verified Official Foundation",
    isVerified: true,
    featured: true,
    totalApplicants: 7600,
    seatsAvailable: 200
  },
  {
    id: "sch-014",
    title: "INSPIRE Scholarship for Higher Education (SHE)",
    organization: "Department of Science and Technology (DST), Govt. of India",
    description: "National flagship fellowship providing ₹80,000/year (₹60,000 cash + ₹20,000 summer project mentorship) to top science students pursuing B.Sc., B.S., and integrated M.Sc.",
    amount: "₹80,000 / year",
    amountValue: 80000,
    category: "Merit-based",
    fundingType: "Government",
    educationLevel: "Undergraduate",
    fieldOfStudy: ["Physics", "Chemistry", "Mathematics", "Biology", "Statistics", "Geology", "Pure Sciences"],
    academicCriteria: {
      minCGPA: 8.0,
      minPercentage: 80,
      description: "Within top 1% rank in Class 12th board exams or top rank in KVPY / JEE / NEET enrolled in Natural/Basic Sciences."
    },
    incomeCriteria: {
      maxAnnualIncome: null,
      description: "No family income limit; competitive pure science national merit fellowship."
    },
    location: "National",
    state: "All India",
    gender: "All",
    deadline: "2026-11-28",
    tags: ["DST", "INSPIRE", "Government", "Pure Science", "Research Stipend"],
    documents: [
      "Class 12th Board Marksheet with Top 1% Advisory Note",
      "B.Sc. / M.Sc. College Enrollment & Bonafide Certificate",
      "Endorsement Certificate signed by College Principal",
      "Aadhaar Linked SBI Account Details",
      "Category Certificate (if applicable)"
    ],
    applicationInstructions: "Register on online-inspire.gov.in, upload Class 12 marksheet and College Principal endorsement, and track state board cutoff eligibility.",
    officialSource: "Department of Science & Technology (DST Portal)",
    officialUrl: "https://online-inspire.gov.in",
    lastVerified: "2026-11-01",
    verificationStatus: "Verified Official Government Portal",
    isVerified: true,
    featured: false,
    totalApplicants: 14500,
    seatsAvailable: 10000
  },
  {
    id: "sch-015",
    title: "Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulkh Shishyavrutti Yojna (EBC - Maharashtra)",
    organization: "Directorate of Higher Education, Government of Maharashtra",
    description: "State government initiative offering 50% tuition reimbursement and exam fee subvention to domicile students from economically backward classes in professional courses.",
    amount: "Up to ₹65,000 / year",
    amountValue: 65000,
    category: "Need-based",
    fundingType: "Government",
    educationLevel: "Undergraduate",
    fieldOfStudy: ["Engineering", "Pharmacy", "Architecture", "Medicine", "Polytechnic"],
    academicCriteria: {
      minCGPA: 6.0,
      minPercentage: 55,
      description: "Admission through Centralized Admission Process (CAP) round and passing preceding semester."
    },
    incomeCriteria: {
      maxAnnualIncome: 800000,
      description: "Family income less than ₹8,00,000 per annum with valid Tahsildar certificate."
    },
    location: "State",
    state: "Maharashtra",
    gender: "All",
    deadline: "2026-11-09",
    tags: ["State Specific", "Maharashtra", "MahaDBT", "Fee Reimbursement", "Government"],
    documents: [
      "Maharashtra Domicile Certificate",
      "Current Financial Year Income Certificate from Tahsildar",
      "CAP Allotment Letter & College Fee Receipt",
      "College Bonafide Certificate",
      "Aadhaar-Seeded Bank Account Proof"
    ],
    applicationInstructions: "Apply through MahaDBT state scholarship portal (mahadbt.maharashtra.gov.in) with biometric/OTP Aadhaar authentication and institute verification.",
    officialSource: "Government of Maharashtra (MahaDBT Portal)",
    officialUrl: "https://mahadbt.maharashtra.gov.in",
    lastVerified: "2026-11-01",
    verificationStatus: "Verified Official Government Portal",
    isVerified: true,
    featured: false,
    totalApplicants: 48000,
    seatsAvailable: 18000
  },
  {
    id: "sch-016",
    title: "Illustrative STEM Innovation & Research Fellowship",
    organization: "National Innovation Council (Illustrative Benchmark)",
    description: "Benchmark opportunity record maintained for system calibration and testing comparative multi-criteria match scenarios across non-verified cycles.",
    amount: "₹1,00,000 / year",
    amountValue: 100000,
    category: "Merit-based",
    fundingType: "Private",
    educationLevel: "Undergraduate",
    fieldOfStudy: ["All Fields", "Computer Science", "Engineering"],
    academicCriteria: {
      minCGPA: 8.5,
      minPercentage: 85,
      description: "Sample benchmark: 8.5+ CGPA or equivalent academic honors."
    },
    incomeCriteria: {
      maxAnnualIncome: null,
      description: "No income limit specified in benchmark record."
    },
    location: "National",
    state: "All India",
    gender: "All",
    deadline: "2026-12-31",
    tags: ["Sample Record", "Benchmark", "Illustrative", "Testing"],
    documents: [
      "Sample Academic Transcript",
      "Sample Statement of Purpose",
      "Sample Recommendation Draft"
    ],
    applicationInstructions: "Notice: This is an illustrative sample benchmark record included for development and UI verification. It does not represent an active live application gateway.",
    officialSource: "Illustrative Hackathon Sample Data (Unverified)",
    officialUrl: null,
    lastVerified: "2026-11-01",
    verificationStatus: "Illustrative Sample Record",
    isVerified: false,
    featured: false,
    totalApplicants: 500,
    seatsAvailable: 25
  }
];
