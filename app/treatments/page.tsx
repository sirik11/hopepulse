import {
  Microscope,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Heart,
  ChevronRight,
  Zap,
  Shield,
  Activity,
  FlaskConical,
} from "lucide-react";

const chemoPhases = [
  {
    phase: "Before Chemo",
    days: "Week 0",
    color: "bg-slate-100 text-slate-600",
    tasks: [
      "Port placement surgery (minor — allows easy blood draws and infusions)",
      "Dental checkup (infection prevention)",
      "Fertility preservation consultation if applicable",
      "Baseline heart scan (MUGA or echo — some chemo drugs affect the heart)",
      "Vaccinations if any are needed before immunosuppression",
      "Meet your care team: oncologist, nurse, social worker, dietitian",
    ],
  },
  {
    phase: "Cycle 1",
    days: "Weeks 1–4",
    color: "bg-hope-100 text-hope-700",
    tasks: [
      "Day 1 & 15: Chemo infusion (ABVD takes about 4–6 hours at the clinic)",
      "Days 2–7: Watch for fever (temp > 38°C / 100.4°F = go to ER immediately)",
      "Blood counts drop around Day 10–14 — nadir period, highest infection risk",
      "Anti-nausea medications given before and after infusion",
      "Fatigue is common — rest when needed, don't push through exhaustion",
      "Hair loss begins 2–3 weeks after first infusion",
    ],
  },
  {
    phase: "Between Cycles",
    days: "Rest period",
    color: "bg-amber-100 text-amber-700",
    tasks: [
      "Blood counts recover — energy returns somewhat",
      "Weekly or bi-weekly blood tests to monitor counts",
      "Continue eating well — high protein, high calorie if appetite is low",
      "School/activities: many children attend school on good days",
      "Avoid crowded places during nadir (low white blood cell count)",
      "Celebrate small wins — each cycle completed is progress",
    ],
  },
  {
    phase: "Interim PET Scan",
    days: "After Cycle 2",
    color: "bg-violet-100 text-violet-700",
    tasks: [
      "PET-CT scan to assess response to treatment",
      "A negative PET (no cancer activity) is excellent — may mean fewer cycles needed",
      "Results guide whether to continue same plan or adjust",
      "This is a major milestone — most Stage 1A patients have negative interim PET",
      "Discuss results thoroughly with your oncologist",
    ],
  },
  {
    phase: "End of Treatment",
    days: "After last cycle",
    color: "bg-emerald-100 text-emerald-700",
    tasks: [
      "End-of-treatment PET-CT scan — confirming remission",
      "Port removal (usually done a few months after treatment ends)",
      "Long-term follow-up schedule: scans every 3–6 months for 2 years, then annually",
      "Celebration — treatment is done!",
      "Discuss late effects monitoring with your oncologist",
      "Transition to survivorship care",
    ],
  },
];

const sideEffects = [
  {
    name: "Nausea & Vomiting",
    severity: "Common",
    color: "text-amber-600",
    tips: [
      "Modern anti-nausea drugs (ondansetron, aprepitant) are very effective",
      "Small, frequent meals work better than large ones",
      "Ginger (tea, candies) can help mild nausea",
      "Stay hydrated — sip fluids throughout the day",
    ],
  },
  {
    name: "Hair Loss (Alopecia)",
    severity: "Very Common",
    color: "text-amber-600",
    tips: [
      "Begins 2–3 weeks after first treatment",
      "Temporary — hair grows back within 3–6 months after treatment ends",
      "Prepare children gently: 'Your hair will fall out because of medicine, but it always comes back'",
      "Soft hats, bandanas, or wigs — let the child choose",
      "Some children prefer to shave before hair falls out — their choice",
    ],
  },
  {
    name: "Fatigue",
    severity: "Common",
    color: "text-amber-600",
    tips: [
      "The most common side effect — real and often profound",
      "Rest is important but total bed rest is not recommended",
      "Light activity (short walks) actually helps fatigue",
      "Plan activities for the 'good days' in the cycle",
      "School attendance: many children attend partial days on good days",
    ],
  },
  {
    name: "Fever / Infection Risk",
    severity: "Watch Carefully",
    color: "text-red-600",
    tips: [
      "Fever above 38°C (100.4°F) = go to ER immediately — do not wait",
      "This is the most important thing to monitor",
      "Avoid sick contacts during low white blood cell count periods",
      "Wash hands frequently",
      "Your oncologist will give you specific neutropenic fever guidelines",
    ],
  },
  {
    name: "Appetite Changes",
    severity: "Common",
    color: "text-amber-600",
    tips: [
      "Children's appetite often decreases during treatment",
      "High-calorie, high-protein foods when they do eat",
      "Don't force eating — it creates negative associations",
      "Favorite foods are fine — this is not the time for strict healthy eating",
      "Smoothies and fortified shakes can help when solid food is hard",
    ],
  },
  {
    name: "Mouth Sores (Mucositis)",
    severity: "Moderate",
    color: "text-amber-600",
    tips: [
      "Keep mouth clean — gentle rinses with salt water or prescribed mouthwash",
      "Soft foods during flares",
      "Avoid spicy, acidic, or very hot/cold foods",
      "Tell your nurse immediately — there are treatments to help",
    ],
  },
];

const treatments = [
  {
    name: "ABVD Chemotherapy",
    icon: FlaskConical,
    color: "bg-hope-100 text-hope-700",
    tag: "Most Common for Hodgkin's",
    desc: "The standard first-line treatment for Hodgkin's Lymphoma. Four drugs given intravenously every 2 weeks.",
    drugs: ["Adriamycin (Doxorubicin)", "Bleomycin", "Vinblastine", "Dacarbazine"],
    duration: "2–6 cycles (4–12 months depending on stage)",
    how: "Given as an IV infusion at a cancer clinic or hospital. Each session takes 4–6 hours.",
  },
  {
    name: "Radiation Therapy",
    icon: Zap,
    color: "bg-violet-100 text-violet-700",
    tag: "Sometimes Used",
    desc: "Targeted radiation to the affected lymph node region. Modern protocols minimize radiation to reduce long-term effects.",
    drugs: [],
    duration: "2–4 weeks of daily sessions (weekdays only)",
    how: "Painless during treatment. The machine circles around the body. Session itself takes minutes.",
  },
  {
    name: "Immunotherapy",
    icon: Shield,
    color: "bg-blue-100 text-blue-700",
    tag: "For Some Cases",
    desc: "Drugs that help the immune system fight cancer. Brentuximab vedotin (Adcetris) is used in some Hodgkin's protocols.",
    drugs: ["Brentuximab vedotin (BV)", "Nivolumab", "Pembrolizumab"],
    duration: "Varies by protocol",
    how: "Given as IV infusion. May be combined with chemotherapy or used as maintenance.",
  },
  {
    name: "Stem Cell Transplant",
    icon: Activity,
    color: "bg-rose-100 text-rose-700",
    tag: "For Relapse/Refractory",
    desc: "High-dose chemotherapy followed by transplant of stem cells to restore bone marrow. Used if cancer returns or doesn't respond.",
    drugs: [],
    duration: "4–6 weeks in-hospital plus months of recovery",
    how: "Requires a hospital stay. Intensive but potentially curative for relapsed disease.",
  },
];

export default function TreatmentsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 badge bg-blue-100 text-blue-700 mb-4">
          <Microscope className="w-3.5 h-3.5" />
          Treatment Guide
        </div>
        <h1 className="text-4xl font-bold text-slate-800 mb-3">Understanding Treatment</h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          A step-by-step guide to cancer treatment — what happens, when, what to expect, and how to prepare.
          Knowledge makes the journey less frightening.
        </p>
      </div>

      {/* Treatment types */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Treatment Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {treatments.map(({ name, icon: Icon, color, tag, desc, drugs, duration, how }) => (
            <div key={name} className="card hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3 mb-3">
                <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-hope-600 bg-hope-50 px-2 py-0.5 rounded-full">{tag}</span>
                  <h3 className="font-bold text-slate-800 mt-1">{name}</h3>
                </div>
              </div>
              <p className="text-sm text-slate-600 mb-3">{desc}</p>
              {drugs.length > 0 && (
                <div className="mb-2">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Drugs used:</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {drugs.map((d) => (
                      <span key={d} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{d}</span>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex items-center gap-2 text-xs text-slate-500 mt-2">
                <Clock className="w-3.5 h-3.5" />
                {duration}
              </div>
              <p className="text-xs text-slate-500 mt-1 italic">{how}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Treatment timeline */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">The Treatment Journey — Week by Week</h2>
        <p className="text-slate-500 text-sm mb-6">Based on standard ABVD chemotherapy for Hodgkin's Lymphoma</p>
        <div className="space-y-4">
          {chemoPhases.map(({ phase, days, color, tasks }) => (
            <div key={phase} className="card">
              <div className="flex items-center gap-3 mb-4">
                <span className={`badge ${color} text-xs`}>{days}</span>
                <h3 className="font-bold text-slate-800">{phase}</h3>
              </div>
              <ul className="space-y-2">
                {tasks.map((task, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-hope-400 flex-shrink-0 mt-0.5" />
                    {task}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Side effects */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Managing Side Effects</h2>
        <p className="text-slate-500 text-sm mb-6">Honest information about what to expect — and what actually helps.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sideEffects.map(({ name, severity, color, tips }) => (
            <div key={name} className="card">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-slate-800">{name}</h3>
                <span className={`text-xs font-semibold ${color}`}>{severity}</span>
              </div>
              <ul className="space-y-1.5">
                {tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                    <ChevronRight className="w-3.5 h-3.5 text-hope-400 flex-shrink-0 mt-0.5" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Emergency signs */}
      <section className="mb-12">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <h2 className="font-bold text-red-800">When to Call / Go to the ER Immediately</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "Fever above 38°C / 100.4°F (even a single reading)",
              "Chills, shaking, or feeling suddenly very unwell",
              "Difficulty breathing",
              "Severe or unusual bleeding",
              "Severe chest pain",
              "Signs of severe allergic reaction during infusion",
              "Inability to keep fluids down for 24+ hours",
              "Sudden severe headache or vision changes",
            ].map((sign, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-red-800">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0" />
                {sign}
              </div>
            ))}
          </div>
          <p className="text-xs text-red-600 mt-4 font-semibold">
            Always keep your oncology team&apos;s emergency number saved. Most teams have 24/7 on-call coverage.
          </p>
        </div>
      </section>

      {/* Hope section */}
      <section>
        <div className="bg-gradient-to-r from-hope-50 to-amber-50 border border-hope-100 rounded-2xl p-8 text-center">
          <Heart className="w-10 h-10 text-rose-400 fill-rose-200 mx-auto mb-3" />
          <h2 className="text-2xl font-bold text-slate-800 mb-3">Remember This</h2>
          <p className="text-slate-600 leading-relaxed max-w-xl mx-auto">
            Treatment is hard. There will be difficult days. But for early-stage Hodgkin&apos;s Lymphoma in children,
            the treatment is temporary and the prognosis is excellent. Most children complete treatment, achieve
            remission, and go on to live completely normal, healthy lives. <strong className="text-hope-700">You will get through this.</strong>
          </p>
        </div>
      </section>
    </div>
  );
}
