# HopePulse

> **AI-powered cancer support platform — compassionate, clear information for every type of cancer, every patient, every family.**

HopePulse was born from a personal experience — a family facing a cancer diagnosis and desperately needing a calm, trustworthy source of information. Every feature is designed to reduce anxiety, not add to it.

---

## Live App

**[hopepulse.vercel.app](https://hopepulse.vercel.app)** *(deploy to get your live URL)*

---

## Features

| Feature | Description |
|---|---|
| **AI Cancer Specialist Chat (RAG)** | Ask anything about any cancer — powered by Google Gemini AI with Retrieval Augmented Generation. Relevant real cases from the database are automatically included as context for grounded, accurate answers. |
| **Diagnosis Analyzer** | Enter cancer type, stage, and age — get best-case, typical, and worst-case outcomes based on real published statistics. Covers 30+ cancer types. |
| **Similar Cases Finder** | 105+ real cases from published medical literature with similarity scoring — same cancer type, stage, and age group. |
| **Live Clinical Trials** | Real-time data from ClinicalTrials.gov — active recruiting trials for your specific cancer. |
| **Treatment Journey Guide** | Week-by-week chemotherapy guide, treatment types explained, side effect management. |
| **Emotional Support** | Breathing exercises, talking to children about cancer, crisis resources, support organizations. |

---

## Cancer Types Covered

**Blood & Lymphatic**
- Hodgkin's Lymphoma
- Non-Hodgkin's Lymphoma (DLBCL, Follicular)
- Leukemia — ALL, AML, CLL, CML
- Multiple Myeloma

**Adult Solid Tumors**
- Breast, Lung, Prostate, Colorectal
- Melanoma, Ovarian, Cervical, Thyroid
- Pancreatic, Bladder, Kidney, Stomach
- Liver (HCC), Brain/Glioma, Endometrial
- Head & Neck, Esophageal, Testicular, Mesothelioma

**Pediatric Cancers**
- Hodgkin's Lymphoma, ALL
- Wilms Tumor, Neuroblastoma
- Medulloblastoma, Rhabdomyosarcoma
- Osteosarcoma, Ewing Sarcoma

**30+ cancer types** with detailed outcome data and **105+ published cases** in the similarity database.

---

## Technology Stack

### Framework & Language
| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 13.5.6 | Full-stack React framework — pages, routing, API endpoints |
| **TypeScript** | 5.x | Type-safe JavaScript — catches bugs before they happen |
| **React** | 18.x | UI component library |
| **Node.js** | 18.16+ | JavaScript runtime |

### Styling & UI
| Technology | Version | Purpose |
|---|---|---|
| **Tailwind CSS** | 3.4.x | Utility-first CSS framework |
| **clsx** | 2.1.x | Conditional CSS class names |
| **lucide-react** | 0.400.x | Icon library (Heart, Search, Send, etc.) |
| **next/font** | built-in | Google Fonts (Inter) — optimized, no layout shift |

### AI & APIs
| Technology | Purpose |
|---|---|
| **Google Gemini 2.5 Flash** | Powers the AI chat — free tier, fast responses |
| **`@google/generative-ai`** | Official Google Generative AI SDK |
| **ClinicalTrials.gov API v2** | Live clinical trial data — free public API |

### Architecture
| Concept | Details |
|---|---|
| **Next.js App Router** | File-based routing in `/app` directory |
| **Server-side API routes** | `/app/api/chat` and `/app/api/trials` — keeps API keys secure on server |
| **Static case database** | `lib/casesData.ts` — 105+ typed cases, no external database needed |
| **Similarity algorithm** | Weighted scoring: cancer type (40pts) + stage (30pts) + age group (20pts) + subtype (10pts) |
| **RAG (Retrieval Augmented Generation)** | Chat API searches the case database on every message to inject relevant real cases as context into Gemini's system prompt |

---

## How RAG Works

Every time a user sends a message in the AI chat, HopePulse performs a lightweight similarity search:

1. **Keyword extraction**: The user's message is scanned for cancer type names (breast, lung, hodgkin, leukemia, etc.), stage mentions (Stage 1, Stage 3B, etc.), and treatment keywords.
2. **Case scoring**: Every case in the 105+ case database is scored against the extracted keywords. Cancer type match = 40 points, stage match = 20 points.
3. **Top 3 retrieval**: The top 3 highest-scoring cases (score > 0) are selected.
4. **Context injection**: The selected cases (including title, cancer type, stage, age, treatment protocol, outcome, follow-up, and journal reference) are appended to Gemini's system prompt as a "Relevant Cases From Our Database" section.
5. **Grounded response**: Gemini generates its response with real published case data as context, and may cite specific case IDs in its answer.

This gives the AI access to real published outcomes without requiring a vector database or embeddings — simple, fast, and effective at the scale of 100+ cases.

---

## Project Structure

```
hopepulse/
├── app/
│   ├── page.tsx                  # Home page
│   ├── layout.tsx                # Root layout — Navbar + Footer
│   ├── globals.css               # Global styles + Tailwind directives
│   ├── chat/
│   │   └── page.tsx              # AI Chat interface
│   ├── analysis/
│   │   └── page.tsx              # Diagnosis Analyzer (30+ cancer types)
│   ├── cases/
│   │   └── page.tsx              # Similar Cases finder
│   ├── treatments/
│   │   └── page.tsx              # Treatment Journey Guide
│   ├── trials/
│   │   └── page.tsx              # Live Clinical Trials
│   ├── support/
│   │   └── page.tsx              # Emotional Support resources
│   └── api/
│       ├── chat/
│       │   └── route.ts          # Google Gemini AI endpoint (with RAG)
│       └── trials/
│           └── route.ts          # ClinicalTrials.gov proxy
├── components/
│   ├── Navbar.tsx                # Navigation bar (responsive)
│   └── Footer.tsx                # Footer
├── lib/
│   └── casesData.ts              # 105+ published cases + similarity scoring + CancerType union
├── public/                       # Static assets
├── tailwind.config.js            # Tailwind config + custom colors
├── next.config.js                # Next.js config
├── postcss.config.js             # PostCSS config
└── .env.local.example            # Environment variable template
```

---

## Getting Started

### Prerequisites
- Node.js 18.16 or higher
- A free Google Gemini API key from [aistudio.google.com](https://aistudio.google.com)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/sirik11/hopepulse.git
cd hopepulse

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.local.example .env.local
# Edit .env.local and add your Google API key

# 4. Run the development server
npm run dev

# 5. Open in browser
# http://localhost:3000
```

### Environment Variables

```env
# Get your FREE key from https://aistudio.google.com
GOOGLE_API_KEY=your_google_api_key_here
```

---

## Deployment (Vercel — Free)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → Import your repository
3. Add environment variable: `GOOGLE_API_KEY`
4. Click Deploy

Every push to `main` auto-deploys. No configuration needed.

---

## Data Sources

The Similar Cases database (`lib/casesData.ts`) contains **105+ composite cases** built from published medical literature:

- **COG** (Children's Oncology Group) clinical trials — AHOD0431, ANBL1232, ARST0431, AREN protocols
- **EuroNet-PHL / GPOH** protocols for pediatric Hodgkin's
- **NEJM** published trials — KEYNOTE-522, CROSS, CheckMate 743, DESTINY-Breast03, DETERMINATION
- **Lancet Oncology** — PACIFIC trial, SOLO-1, EF-14, NPC-0501, JAVELIN Merkel 200
- **JCO** — ALLIANCE A021501, IGCCCG BEP data, SWENOTECA, EURO-EWING
- **ASCO / ESMO** published case series and guidelines
- **MAIA, VIALE-A, IMbrave150, OlympiA, CheckMate 577** — latest pivotal trials

Cases cover: Hodgkin's lymphoma, ALL, AML, CML, CLL, breast, lung, prostate, colorectal, melanoma, ovarian, cervical, thyroid, pancreatic, bladder, kidney, stomach, liver (HCC), brain/GBM, endometrial, multiple myeloma, Wilms tumor, neuroblastoma, osteosarcoma, rhabdomyosarcoma, Ewing sarcoma, head & neck, esophageal, testicular, soft tissue sarcoma, Merkel cell carcinoma, mesothelioma.

> Cases are anonymized composite summaries — representative of real published outcomes, not individual patient records.

---

## Design System

Custom color palette built on Tailwind:

| Color | Hex | Usage |
|---|---|---|
| `hope-500` | `#14b8a6` | Primary teal — buttons, accents, brand |
| `hope-600` | `#0d9488` | Hover states, darker accents |
| `hope-50` | `#f0fdf9` | Background tints |
| `pulse-400` | `#fbbf24` | Amber — highlights, CTAs, warnings |
| `pulse-300` | `#fcd34d` | Light amber — hero text accent |

---

## Medical Disclaimer

HopePulse provides **educational information only** — not medical advice. All statistics are based on published population data and may not reflect individual outcomes. Always consult your oncologist and medical team for diagnosis, treatment decisions, and prognosis specific to your situation.

---

## Why HopePulse Exists

This platform was built for families like ours — people who receive a cancer diagnosis and find themselves drowning in terrifying Google results at 2am. HopePulse exists to give every patient and family **accurate, balanced, human information** so they can face this journey with clarity instead of fear.

For every cancer. Every stage. Every age. Every family.

---

## License

Copyright © 2026 Sirik. All rights reserved.

This project and its source code are proprietary. No part of this codebase may be copied, modified, distributed, or used in any form without explicit written permission from the owner.
