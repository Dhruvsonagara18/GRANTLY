# GRANTLY — Unified Scholarship Discovery & Management Platform

> **"Your Potential Deserves Every Opportunity."**  
> *Alternative Brand Message: "Discover. Qualify. Apply. Achieve."*

GRANTLY is an educational financial assistance platform and student opportunity operating system. Designed for high school, undergraduate, postgraduate, and vocational students, it replaces fragmented portals, scattered bookmarks, and complex spreadsheets with an intelligent, deterministic matching engine and application journey tracker.

---

## 🌟 Key Features

### 1. 🎯 Deterministic 4-Pillar Eligibility Matching Engine
Unlike generic platforms that give misleading guarantees, GRANTLY uses a transparent **4-pillar deterministic algorithm** (25% weight per pillar):
- **Education Tier (25%):** Undergraduate, Postgraduate, Doctoral, Diploma.
- **Academic Cutoff (25%):** CGPA (10-point scale) and 12th board percentage verification.
- **Financial Profile (25%):** Gross annual household income ceiling (e.g. ₹4.5 LPA, ₹6 LPA, EWS).
- **Location & Domicile (25%):** All India national quotas versus state-specific resident allocations (e.g., Maharashtra, Karnataka, Delhi).
- **Gap Analysis:** Explains precisely which conditions match, which fail, and suggests actionable alternatives without suggesting profile manipulation.

### 2. 📊 Student Opportunity Dashboard & Analytics
- **Live Readiness Center:** Calculates a composite Scholarship Readiness Score (0-100) based on profile completeness, document locker readiness, and application activity.
- **Potential Funding Tracker:** Distinguishes potential matched award sums from actual disbursed grant funds.
- **Application Pipeline Donut Chart:** Interactive Recharts visualization tracking statuses (`Interested`, `Preparing Documents`, `Applied`, `Under Review`, `Approved`, `Rejected`).
- **Critical Deadlines Radar:** Prioritizes time-sensitive opportunities closing in $\le 3$ days.

### 3. 🔎 Advanced Scholarship Discovery Engine (`/explore`)
- Full-text search across title, organization, description, and keywords.
- Multi-dimensional filters: Merit, Need-based, Government, Private, Education level, State/National, and minimum match score threshold.
- Sort by Highest Award, Lowest Award, Closing Soon, Most Popular, and Highest Compatibility.
- Dual layout toggles: Rich Card Grid View and Compact Dense List View.

### 4. ⚖️ Scholarship Comparison Studio (`/compare`)
- Compare up to 3 scholarships side-by-side.
- Contrasts award amounts, minimum CGPA, family income caps, location criteria, required documents count, and closing deadlines.

### 5. 📑 Document Readiness Center (`/documents`)
- Scholarship-specific prerequisites checklist.
- Track status of marksheets, income certificates, bonafide letters, SOP drafts, and letters of recommendation.
- Student preparation guidelines and local document status locker.

### 6. 🕒 Deadline Intelligence & Monthly Calendar (`/deadlines` & `/calendar`)
- Dynamic countdown categorization: **URGENT** ($\le 3$ days), **UPCOMING** ($\le 7$ days), **LATER** ($> 7$ days), **CLOSED** (past cycles).
- Interactive monthly calendar with daily deadline indicators.

### 7. 🤖 Grantly Assistant (`/assistant`)
- Dedicated in-app assistant interface providing instant, rule-based contextual answers regarding requirements, required documents, and deadline prioritizations.

### 8. 📝 60-Second Scholarship Discovery Quiz (`/quiz`)
- 6-question interactive quiz that recommends matching opportunities based on field of study, year, academic tier, state domicile, and funding goals.

### 9. 🗂️ Application Planner (`/planner`)
- Actionable task manager for student preparation (e.g., drafting SOPs, collecting faculty recommendation letters) with priority tags and due dates.

---

## 🛠️ Technology Stack

- **Framework:** React.js 18 with Vite
- **Language:** JavaScript (JSX)
- **Styling & Design System:** Tailwind CSS
- **Routing:** React Router DOM v6 (with full SPA deep-linking and Vercel rewrites)
- **Data Visualizations:** Recharts (Donut, Bar, and Distribution charts)
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Persistence:** LocalStorage with automatic state rehydration and demo reset utilities

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18.0 or higher recommended; developed on Node v24)
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
   Open your browser at `http://localhost:3000`.

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 🧑‍🎓 Demo Account Experience (For Judges & Evaluators)

GRANTLY includes a **1-click instant demo experience** that pre-populates all features so judges do not need to fill out long registration forms:

- **Pre-filled Student:** Aarav Sharma (PICT Pune • B.Tech Computer Science • 3rd Year • 8.4 CGPA • EWS Eligible)
- **Active Applications:** 4 sample applications spanning `Interested`, `Preparing Documents`, `Applied`, and `Under Review`
- **Document Locker:** 5 prepared documents and 2 pending items
- **Planner Tasks:** 5 prioritized milestones
- **Notifications:** In-app deadline alerts and matching notices
- **Reset Button:** Available anytime via the top demo banner or profile menu to restore fresh evaluation baselines.

---

## 📜 Ethical Data & Mock Disclosure

In accordance with strict hackathon integrity standards:
- All compatibility scores are deterministic algorithmic evaluations based on self-reported profile data, **not official sponsor decisions**.
- Opportunities include both verified partner programs and clearly labeled illustrative demo models.
- Authentication and session states are safely persisted within browser LocalStorage for prototype review.

---

## 🌐 Deployment to Vercel

GRANTLY includes pre-configured `vercel.json` rewrites to support React Router single-page application routing on Vercel:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

To deploy:
1. Push this codebase to GitHub.
2. Import the repository into [Vercel](https://vercel.com).
3. Set the framework preset to **Vite**.
4. Deploy!
