# GRANTLY — Unified Scholarship Discovery & Management Platform

> **"Your Potential Deserves Every Opportunity."**  
> *Tagline: "Discover. Qualify. Apply. Achieve."*

GRANTLY is a centralized educational financial assistance platform and student opportunity management system. Designed for high school, undergraduate, postgraduate, and vocational students, it replaces fragmented portals, scattered bookmarks, and complex spreadsheets with a multi-dimensional eligibility evaluation engine and application journey tracker.

---

## 🌟 Key Platform Features

### 1. 🎯 Multi-Dimensional Clinical Eligibility Engine
Unlike platforms that use arbitrary match percentages as guarantees of eligibility, GRANTLY uses an objective, multi-criteria evaluation engine that distinguishes between three distinct verdict states:
- **`Eligible`**: All mandatory hard criteria (education level, discipline, minimum CGPA/percentage, state domicile, family income ceiling, gender quota if applicable) are verified and satisfied.
- **`Potentially Eligible`**: Baseline credentials align, but voluntary or unverifiable criteria (e.g. income certificate validity, category documentation) warrant physical verification.
- **`Not Eligible`**: Explicitly highlights which mandatory conditions failed (e.g., state residency restriction or income ceiling exceeded).
- **Indicative Compatibility Score:** Clearly labeled as an estimated compatibility percentage with transparent disclaimers that official awards are determined solely by issuing authorities.
- **Gap Advisory:** Explains precisely what is missing and recommends alternative grants.

### 2. 🏛️ Verified Scholarship Dataset
Every scholarship record in the platform catalog includes verifiable metadata:
- **`officialSource`**: Verified authority or scheme entity.
- **`officialUrl`**: Direct link to the official application gateway (e.g., National Scholarship Portal, Digital Gujarat, MYSY Gujarat, DST INSPIRE, MahaDBT, Reliance Foundation, Tata Trusts, Google Build Your Future).
- **`lastVerified`**: Explicit verification audit date.
- **`verificationStatus`**:
  - `Verified Official Government Portal`
  - `Verified Official Foundation`
  - `Verified Official Corporate Grant`
  - `Illustrative Sample Record` (clearly labeled benchmark record for testing non-verified flows)

### 3. 📊 Clean Student Dashboard & Analytics
- **Clean First-Time Experience:** No fake pre-filled submitted applications, fictional acknowledgement numbers, or misleading approval history.
- **Personalized Opportunity Stream:** Recommends opportunities calibrated to student credentials.
- **Live Readiness Center:** Calculates a composite Scholarship Readiness Score (0-100) based on profile completeness, document locker readiness, and application progress.
- **Application Status Distribution:** Interactive Recharts visualization tracking statuses (`Interested`, `Preparing Documents`, `Applied`, `Under Review`, `Approved`, `Rejected`).
- **Upcoming Deadlines Radar:** Prioritizes time-sensitive opportunities closing in $\le 7$ days.

### 4. 🔎 Advanced Scholarship Discovery Engine (`/explore`)
- Full-text search across title, organization, description, engineering branches, and tags.
- Multi-dimensional filters:
  - Clinical Verdict: All, Eligible Only (100% Fit), Eligible & Potentially Eligible
  - Source Verification: All, Verified Official Sources, Official Government Portals
  - Category: Merit-based, Need-based, Merit-cum-Need
  - Funding Type: Government Schemes vs. Private Foundations
  - Education Level: Undergraduate, Postgraduate, Doctoral, Diploma
  - Domicile Scope: Gujarat Domicile Schemes, National / All India, Maharashtra, Delhi
  - Compatibility Threshold: $\ge 50\%$, $\ge 75\%$, $\ge 90\%$
- Dual layout toggles: Rich Card Grid View and Compact Dense List View.

### 5. 📸 Profile Picture Upload & Management (`/profile`)
- Upload custom profile pictures from local device (JPG, JPEG, PNG, WEBP).
- Strict validation: rejects unsupported formats and files $> 2\text{ MB}$ with friendly notifications.
- **Client-Side Canvas Compression:** Uses HTML5 `<canvas>` center-crop to rescale images to a lightweight, high-DPI 280x280 JPEG (~25KB), ensuring persistence without exceeding browser storage limits.
- Edit, change, and remove picture controls.
- Reusable `Avatar` component with bold initials fallback (e.g. "DS" for Dhruv Sonagara).

### 6. 🌓 Dual Theme System (Light Mode & Dark Mode)
- Full-page dark mode and light mode across all 20 views, cards, modals, headers, sidebars, and Recharts components.
- Smooth transition tokens configured via Tailwind CSS (`darkMode: 'class'`).
- Theme toggle with instant state persistence in LocalStorage (`grantly_theme`).

### 7. ⚖️ Scholarship Comparison Studio (`/compare`)
- Compare up to 3 scholarships side-by-side.
- Contrasts award amounts, minimum CGPA, family income caps, location criteria, required documents count, and closing deadlines.

### 8. 📑 Document Readiness Locker (`/documents`)
- Scholarship-specific prerequisites checklist.
- Track status of marksheets, income certificates, bonafide letters, SOP drafts, and letters of recommendation.
- Student preparation guidelines for government and foundation grants.

### 9. 🕒 Deadline Intelligence & Monthly Calendar (`/deadlines` & `/calendar`)
- Dynamic countdown categorization: **URGENT** ($\le 3$ days), **UPCOMING** ($\le 7$ days), **LATER** ($> 7$ days), **ARCHIVED** (past cycles).
- Interactive monthly calendar with daily deadline indicators.

### 10. 🤖 Grantly Assistant (`/assistant`)
- Dedicated contextual advisor providing instant answers regarding eligibility criteria, required documents, and deadline prioritizations based on the student's profile.

### 11. 📝 60-Second Scholarship Discovery Quiz (`/quiz`)
- 6-question interactive quiz that recommends matching opportunities based on field of study, year, academic tier, state domicile, and funding goals.

### 12. 🗂️ Application Preparation Planner (`/planner`)
- Actionable task manager for student milestones (e.g., requesting bonafide letters, drafting SOPs) with priority tags, categories, and due dates.

---

## 🛠️ Technology Stack

- **Framework:** React.js 18 with Vite
- **Language:** JavaScript (JSX)
- **Styling:** Tailwind CSS with custom tokens and dark mode classes
- **Routing:** React Router DOM v6
- **Data Visualizations:** Recharts (Donut and Bar Charts with dynamic dark theme tooltip styling)
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Persistence:** LocalStorage with automatic schema rehydration and data migration utilities

---

## 📁 Project Structure

```
GRANTLY/
├── public/                 # Static assets
├── src/
│   ├── components/
│   │   ├── common/         # Avatar, DemoBanner (neutralized)
│   │   ├── layout/         # DashboardLayout, DashboardHeader, Sidebar, Navbar, Footer
│   │   └── scholarship/    # ScholarshipCard, EligibilityBreakdownModal
│   ├── context/
│   │   └── AppContext.jsx  # Centralized application state, auth, and theme provider
│   ├── data/
│   │   ├── demoUser.js     # Default user profile (Dhruv Sonagara, Gujarat)
│   │   └── scholarships.js # 16 curated & verified scholarship records
│   ├── pages/              # 20 application views (Landing, Dashboard, Explore, Details,
│   │                       # Applications, Compare, Documents, Deadlines, Calendar,
│   │                       # Assistant, Planner, Quiz, Insights, Notifications,
│   │                       # Profile, Settings, Login, Signup, Onboarding, Saved)
│   ├── utils/
│   │   ├── eligibility.js  # Deterministic matching & readiness scoring engine
│   │   ├── deadline.js     # Dynamic date offset & urgency grouping calculations
│   │   └── storage.js      # LocalStorage persistence, safe fallback, and schema migrations
│   ├── App.jsx             # Route definitions and layout shell
│   ├── main.jsx            # React root mount
│   └── index.css           # Tailwind directives, theme variables, and custom scrollbars
├── tailwind.config.js      # Theme tokens, custom colors, dark mode configuration
├── vite.config.js          # Vite config with optimized manual Rollup chunks
├── package.json            # Project dependencies and build scripts
└── vercel.json             # SPA deep-linking rewrites for Vercel deployment
```

---

## 🚀 Installation & Local Development

### Prerequisites
- Node.js (v18.0 or higher recommended)
- npm or yarn

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/grantly.git
   cd grantly
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000` or `http://localhost:5173`.

4. **Build for production:**
   ```bash
   npm run build
   ```
   Outputs optimized chunks in `dist/` ready for zero-configuration static deployment.

### Environment Variables
No external API keys or secret environment variables are required. GRANTLY is engineered to execute completely offline-resiliently in the browser sandbox.

---

## 🧑‍🎓 Default User Profile

GRANTLY initializes with a realistic student profile from Gujarat, India:
- **Full Name:** Dhruv Sonagara
- **City & State:** Dwarka, Gujarat, India
- **Institution:** Government Engineering College (GTU)
- **Degree:** B.Tech in Computer Engineering (3rd Year)
- **Academic Score:** 8.6 CGPA (86% aggregate)
- **Family Income:** ₹3,80,000 per annum (General-EWS)
- **Profile Picture:** Device file upload with circular cropping, responsive preview, and initials avatar fallback ("DS").

---

## 🔒 Architectural Disclosures & Current Limitations

1. **Client-Side Storage:** User profiles, application tracker stages, document statuses, and preferences are stored in the user's browser via `localStorage`. Clearing browser data will reset state to defaults.
2. **Simulated Authentication:** For hackathon review purposes, authentication and session tokens are managed in client state. No external backend identity server is claimed or required.
3. **Indicative Compatibility:** Eligibility scores are calculated against self-reported criteria and verified sponsor requirements. Official eligibility verification and monetary disbursement remain under the purview of the respective government or corporate scholarship authorities.

---

## 🌐 Deployment to Vercel

GRANTLY includes pre-configured `vercel.json` rewrites for single-page application routing on Vercel:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
]
```

To deploy:
1. Push codebase to GitHub.
2. Import repository into [Vercel](https://vercel.com).
3. Framework preset: **Vite**.
4. Click **Deploy**.
