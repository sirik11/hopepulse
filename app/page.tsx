import Link from "next/link";
import {
  MessageCircleHeart,
  Search,
  Microscope,
  BookOpen,
  HandHeart,
  ArrowRight,
  Shield,
  Users,
  CheckCircle2,
  HeartPulse,
  Stethoscope,
  Brain,
  Lightbulb,
  Star,
} from "lucide-react";

const features = [
  {
    icon: MessageCircleHeart,
    color: "bg-hope-100 text-hope-700",
    title: "AI Cancer Specialist Chat",
    desc: "Ask anything about any cancer — diagnosis, stage, treatment, side effects, survival rates. Get clear, compassionate answers 24/7.",
    href: "/chat",
    badge: null,
  },
  {
    icon: Search,
    color: "bg-amber-100 text-amber-700",
    title: "Understand Your Diagnosis",
    desc: "Enter your cancer type, stage, and age. Get a balanced view of best-case, typical, and challenging outcomes based on real data.",
    href: "/analysis",
    badge: "30+ cancer types",
  },
  {
    icon: Users,
    color: "bg-teal-100 text-teal-700",
    title: "Similar Cases",
    desc: "See real cases from published medical literature matching your diagnosis — same cancer type, stage, and age — with full treatment stories.",
    href: "/cases",
    badge: "105+ real cases",
  },
  {
    icon: Microscope,
    color: "bg-blue-100 text-blue-700",
    title: "Treatment Journey Guide",
    desc: "Chemotherapy, radiation, immunotherapy, targeted therapy, surgery — what each involves, what to expect, and how to prepare.",
    href: "/treatments",
    badge: null,
  },
  {
    icon: BookOpen,
    color: "bg-violet-100 text-violet-700",
    title: "Live Clinical Trials",
    desc: "Real-time data from ClinicalTrials.gov — active trials for your cancer type. Cutting-edge treatments your doctor may not have mentioned.",
    href: "/trials",
    badge: "Live data",
  },
  {
    icon: HandHeart,
    color: "bg-emerald-100 text-emerald-700",
    title: "Support Resources",
    desc: "For patients, parents, caregivers, and families. Emotional support, breathing exercises, crisis lines, and practical guidance.",
    href: "/support",
    badge: null,
  },
];

const stats = [
  { value: "35+", label: "Cancer types", sub: "with detailed outcome data" },
  { value: "160+", label: "Real cases", sub: "from published literature" },
  { value: "1,000+", label: "Outcomes tracked", sub: "across all case data points" },
];

const cancerTypes = [
  "Hodgkin's Lymphoma", "Breast Cancer", "Lung Cancer", "Leukemia (ALL/AML)",
  "Prostate Cancer", "Colorectal Cancer", "Melanoma", "Brain Tumors",
  "Ovarian Cancer", "Cervical Cancer", "Thyroid Cancer", "Pancreatic Cancer",
  "Bladder Cancer", "Kidney Cancer", "Liver Cancer", "Childhood Cancers",
  "Myeloma", "Testicular Cancer", "Head & Neck", "Mesothelioma",
];

const journeySteps = [
  { step: "01", title: "Share your diagnosis", desc: "Cancer type, stage, and details from your doctor." },
  { step: "02", title: "Get clear context", desc: "Balanced outcomes — real statistics with real hope." },
  { step: "03", title: "See similar cases", desc: "Real people with the same diagnosis and what happened." },
  { step: "04", title: "Understand your options", desc: "Treatments, clinical trials, week-by-week expectations." },
  { step: "05", title: "Find your support", desc: "Resources for patients, caregivers, children, partners." },
];

export default function HomePage() {
  return (
    <div className="animate-fade-in">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-hope-700 via-hope-800 to-hope-950" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-hope-500/20 rounded-full -translate-y-1/3 translate-x-1/3 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pulse-400/15 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-3xl">
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-white/90 text-sm font-medium mb-8">
              <HeartPulse className="w-4 h-4 heartbeat text-pulse-300" />
              AI-powered cancer support for every family
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight">
              You are not alone{" "}
              <span className="text-pulse-300">on this journey.</span>
            </h1>

            <p className="text-lg md:text-xl text-hope-200 leading-relaxed mb-10 max-w-2xl">
              Whether it's you, your child, a parent, or someone you love — a cancer diagnosis is
              overwhelming. HopePulse gives you <strong className="text-white">clear, compassionate answers</strong>{" "}
              for <strong className="text-white">every type of cancer</strong> — what it really means,
              what to expect, and what to do next.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/chat"
                className="inline-flex items-center justify-center gap-2 bg-white text-hope-700 font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:bg-hope-50 transition-all duration-200 text-base active:scale-95"
              >
                <MessageCircleHeart className="w-5 h-5" />
                Talk to HopePulse AI
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/analysis"
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white font-semibold px-8 py-4 rounded-xl border border-white/25 hover:bg-white/20 transition-all duration-200 text-base backdrop-blur-sm"
              >
                <Search className="w-5 h-5" />
                Understand My Diagnosis
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-4 mt-10">
              {[
                { icon: Shield, text: "Evidence-based" },
                { icon: Brain, text: "Plain language" },
                { icon: Lightbulb, text: "Real case data" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-hope-300 text-sm">
                  <Icon className="w-4 h-4" />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 divide-x divide-slate-100">
            {stats.map((s) => (
              <div key={s.value} className="py-8 px-6 text-center">
                <div className="text-3xl md:text-4xl font-black text-hope-700 mb-0.5">{s.value}</div>
                <div className="font-semibold text-slate-800 text-sm md:text-base">{s.label}</div>
                <div className="text-slate-500 text-xs md:text-sm mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Emotional callout ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-br from-amber-50 via-hope-50 to-white rounded-3xl p-8 md:p-12 border border-amber-100/80 shadow-sm">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-amber-600 font-semibold text-sm mb-4">
              <Star className="w-4 h-4 fill-amber-400" />
              For every patient and every family
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4 leading-tight">
              Stop Googling at 2am and finding only fear.
            </h2>
            <p className="text-slate-600 leading-relaxed text-base">
              When cancer is diagnosed, families search desperately — and find terrifying stories
              mixed with vague statistics. HopePulse gives you{" "}
              <strong className="text-hope-700">accurate, balanced, human information</strong> so you can
              make decisions with clarity instead of fear. For <em>every</em> cancer type, every stage, every age.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/chat" className="btn-primary inline-flex items-center gap-2 justify-center">
                <MessageCircleHeart className="w-4 h-4" />
                Start a conversation
              </Link>
              <Link href="/cases" className="btn-secondary inline-flex items-center gap-2 justify-center">
                <Users className="w-4 h-4" />
                See similar cases
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features grid ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-3">Everything you need in one place</h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            From diagnosis to recovery — answers, guidance, and support for every cancer.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(({ icon: Icon, color, title, desc, href, badge }) => (
            <Link
              key={href}
              href={href}
              className="group bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md hover:border-hope-200 transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-11 h-11 ${color} rounded-xl flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
                {badge && (
                  <span className="text-xs bg-hope-50 text-hope-700 border border-hope-200 px-2 py-0.5 rounded-full font-medium">
                    {badge}
                  </span>
                )}
              </div>
              <h3 className="font-bold text-slate-800 mb-2 group-hover:text-hope-700 transition-colors">{title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              <div className="mt-4 flex items-center gap-1 text-hope-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Open <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Cancer types ── */}
      <section className="bg-slate-50 border-y border-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Covers every type of cancer</h2>
            <p className="text-slate-500 text-sm">From the most common to the rarest — detailed information for all of them.</p>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {cancerTypes.map((c) => (
              <Link
                key={c}
                href="/chat"
                className="text-sm bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-full hover:bg-hope-50 hover:border-hope-400 hover:text-hope-700 transition-all shadow-sm"
              >
                {c}
              </Link>
            ))}
            <span className="text-sm bg-hope-50 border border-hope-200 text-hope-700 px-3 py-1.5 rounded-full font-medium">
              + many more
            </span>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="bg-hope-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">How HopePulse works</h2>
            <p className="text-hope-300">Five steps from confusion to clarity</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {journeySteps.map((s, i) => (
              <div key={s.step} className="relative text-center">
                {i < journeySteps.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-[calc(50%+24px)] right-0 h-px bg-hope-700" />
                )}
                <div className="w-12 h-12 bg-hope-800 border border-hope-600 rounded-2xl flex items-center justify-center text-pulse-300 font-black text-sm mx-auto mb-3 relative z-10">
                  {s.step}
                </div>
                <h4 className="font-bold text-white text-sm mb-1">{s.title}</h4>
                <p className="text-hope-400 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/chat"
              className="inline-flex items-center gap-2 bg-pulse-500 hover:bg-pulse-400 text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg active:scale-95"
            >
              <Stethoscope className="w-5 h-5" />
              Start with AI Chat
            </Link>
          </div>
        </div>
      </section>

      {/* ── Who is this for ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-800 mb-3">Built for everyone touched by cancer</h2>
          <p className="text-slate-500">Whatever your role in someone's cancer journey — we're here for you too.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: "🧒", title: "Children", desc: "Leukemia, lymphoma, Wilms, neuroblastoma, and more pediatric cancers" },
            { icon: "👩", title: "Adults", desc: "Breast, lung, colon, prostate, ovarian, skin — all ages, all stages" },
            { icon: "👴", title: "Seniors", desc: "Cancer in older adults — treatment options and quality of life" },
            { icon: "❤️", title: "Caregivers", desc: "Parents, partners, children of patients — your wellbeing matters too" },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-white rounded-2xl border border-slate-100 p-6 text-center shadow-sm hover:shadow-md hover:border-hope-200 transition-all">
              <div className="text-4xl mb-3">{icon}</div>
              <h3 className="font-bold text-slate-800 mb-2">{title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Origin story ── */}
      <section className="bg-gradient-to-r from-hope-50 to-amber-50 border-t border-hope-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <CheckCircle2 className="w-10 h-10 text-hope-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Built from real experience</h2>
          <p className="text-slate-600 leading-relaxed text-base">
            HopePulse was born when a family faced a cancer diagnosis and desperately needed a calm,
            trustworthy source of information amid the fear. Every feature is designed to reduce anxiety,
            not add to it — for every family, every cancer, every journey.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/chat" className="btn-primary">Talk to HopePulse AI</Link>
            <Link href="/analysis" className="btn-secondary">Understand My Diagnosis</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
