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
  Star,
  CheckCircle2,
  HeartPulse,
  Stethoscope,
  Brain,
  Lightbulb,
  Clock,
  TrendingUp,
} from "lucide-react";

const features = [
  {
    icon: MessageCircleHeart,
    color: "bg-hope-100 text-hope-700",
    title: "AI Cancer Specialist Chat",
    desc: "Ask anything about any cancer — diagnosis, stage, treatment, side effects, survival rates. Get clear, compassionate answers 24/7, not scary search results.",
    href: "/chat",
  },
  {
    icon: Search,
    color: "bg-amber-100 text-amber-700",
    title: "Understand Your Diagnosis",
    desc: "Enter your cancer type, stage, and age. Get a balanced view of best-case, typical, and challenging outcomes — based on real data. Covers 20+ cancer types.",
    href: "/analysis",
  },
  {
    icon: Users,
    color: "bg-teal-100 text-teal-700",
    title: "Similar Cases",
    desc: "See real cases from published medical literature matching your diagnosis — same cancer type, stage, and age — with similarity scores and full treatment stories.",
    href: "/cases",
  },
  {
    icon: Microscope,
    color: "bg-blue-100 text-blue-700",
    title: "Treatment Journey Guide",
    desc: "Chemotherapy, radiation, immunotherapy, targeted therapy, surgery — what each involves, what to expect day by day, and how to prepare your family.",
    href: "/treatments",
  },
  {
    icon: BookOpen,
    color: "bg-violet-100 text-violet-700",
    title: "Live Clinical Trials",
    desc: "Real-time data from ClinicalTrials.gov — active trials for your specific cancer type. Cutting-edge treatments your doctor may not have mentioned yet.",
    href: "/trials",
  },
  {
    icon: HandHeart,
    color: "bg-emerald-100 text-emerald-700",
    title: "Support Resources",
    desc: "For patients, parents, caregivers, children, and families. Emotional support, breathing exercises, faith resources, crisis lines, and practical guidance.",
    href: "/support",
  },
];

const cancerTypes = [
  "Breast Cancer", "Lung Cancer", "Prostate Cancer", "Colorectal Cancer",
  "Lymphoma", "Leukemia", "Melanoma", "Brain Tumors", "Ovarian Cancer",
  "Cervical Cancer", "Thyroid Cancer", "Pancreatic Cancer", "Bladder Cancer",
  "Kidney Cancer", "Stomach Cancer", "Liver Cancer", "Childhood Cancers", "And more…",
];

const stats = [
  { value: "20+",  label: "Cancer types covered with detailed outcome data" },
  { value: "30+",  label: "Real published cases in our similarity database" },
  { value: "24/7", label: "AI cancer specialist — available any time, any question" },
];

const journeySteps = [
  { step: "01", title: "Share your diagnosis", desc: "Cancer type, stage, any details from your doctor's report." },
  { step: "02", title: "Get clear context", desc: "Balanced outcomes — not worst-case horror stories. Real statistics with real hope." },
  { step: "03", title: "See similar cases", desc: "Real people with the same diagnosis — how they were treated and what happened." },
  { step: "04", title: "Understand your options", desc: "Treatments, clinical trials, what to expect week by week." },
  { step: "05", title: "Find your support", desc: "Resources for the whole family — patients, caregivers, children, partners." },
];

export default function HomePage() {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-hope-600 via-hope-700 to-hope-900 opacity-95" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-hope-400/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-pulse-400/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-white/90 text-sm font-medium mb-6">
              <HeartPulse className="w-4 h-4 heartbeat" />
              Compassionate AI-powered cancer support — for everyone
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
              You are not alone on{" "}
              <span className="text-pulse-300">this journey.</span>
            </h1>

            <p className="text-lg md:text-xl text-hope-100 leading-relaxed mb-8 max-w-2xl">
              Whether it&apos;s you, your child, a parent, or someone you love — a cancer diagnosis is
              overwhelming. HopePulse gives patients and families clear, compassionate information
              for <strong className="text-white">every type of cancer</strong> — what it really means, what to expect, and what to do next.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/chat" className="inline-flex items-center justify-center gap-2 bg-white text-hope-700 font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:bg-hope-50 transition-all duration-200 text-base active:scale-95">
                <MessageCircleHeart className="w-5 h-5" />
                Talk to HopePulse AI
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/analysis" className="inline-flex items-center justify-center gap-2 bg-hope-500/30 text-white font-semibold px-8 py-4 rounded-xl border border-white/30 hover:bg-hope-500/40 transition-all duration-200 text-base backdrop-blur-sm">
                <Search className="w-5 h-5" />
                Understand My Diagnosis
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Cancer types marquee */}
      <section className="bg-hope-900 border-y border-hope-700 py-3 overflow-hidden">
        <div className="flex gap-6 text-hope-300 text-sm font-medium whitespace-nowrap animate-none">
          <div className="flex gap-6 items-center">
            {[...cancerTypes, ...cancerTypes].map((c, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className="w-1 h-1 bg-pulse-400 rounded-full" />
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats banner */}
      <section className="bg-white border-b border-hope-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((s) => (
              <div key={s.value} className="flex items-start gap-4 p-4">
                <CheckCircle2 className="w-6 h-6 text-hope-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-2xl font-bold text-hope-700">{s.value}</div>
                  <div className="text-sm text-slate-600">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Message for families */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-amber-50 to-hope-50 rounded-3xl p-8 md:p-12 border border-amber-100">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-amber-600 font-semibold text-sm mb-3">
              <Star className="w-4 h-4 fill-amber-400" /> For every patient and every family
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
              Stop Googling at 2am and finding only fear.
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              When cancer is diagnosed, families search desperately — and find a mixture of terrifying
              stories and vague statistics. HopePulse exists to give you{" "}
              <strong className="text-hope-700">accurate, balanced, human information</strong> so you can
              make decisions with clarity instead of fear. For <em>every</em> cancer type, every stage, every age.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: Shield, text: "Evidence-based information" },
                { icon: Brain,  text: "Clear, jargon-free language" },
                { icon: Lightbulb, text: "Practical next steps" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <div className="w-7 h-7 bg-hope-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-hope-600" />
                  </div>
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cancer types grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Covers Every Type of Cancer</h2>
          <p className="text-slate-500">From the most common to the rarest — HopePulse has information for all of them.</p>
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          {cancerTypes.filter(c => c !== "And more…").map((c) => (
            <Link
              key={c}
              href={`/chat`}
              className="text-sm bg-white border border-hope-200 text-slate-600 px-3 py-1.5 rounded-full hover:bg-hope-50 hover:border-hope-400 hover:text-hope-700 transition-all"
            >
              {c}
            </Link>
          ))}
        </div>
      </section>

      {/* Features grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-3">Everything you need in one place</h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            From diagnosis to recovery — answers, guidance, and support for patients and families of all cancers.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, color, title, desc, href }) => (
            <Link
              key={href + title}
              href={href}
              className="card group hover:shadow-md hover:border-hope-200 transition-all duration-200 cursor-pointer"
            >
              <div className={`w-11 h-11 ${color} rounded-xl flex items-center justify-center mb-4`}>
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-800 mb-2 group-hover:text-hope-700 transition-colors">{title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              <div className="mt-4 flex items-center gap-1 text-hope-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Journey steps */}
      <section className="bg-hope-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">How HopePulse works</h2>
            <p className="text-hope-300">Five steps from confusion to clarity — for any cancer diagnosis</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {journeySteps.map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-12 h-12 bg-hope-500/30 border border-hope-400/40 rounded-2xl flex items-center justify-center text-pulse-300 font-black text-lg mx-auto mb-3">
                  {s.step}
                </div>
                <h4 className="font-bold text-white text-sm mb-1">{s.title}</h4>
                <p className="text-hope-300 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/chat" className="inline-flex items-center gap-2 bg-pulse-400 hover:bg-pulse-500 text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg">
              <Stethoscope className="w-5 h-5" />
              Start with AI Chat
            </Link>
          </div>
        </div>
      </section>

      {/* Who is this for */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-800 mb-3">Built for everyone touched by cancer</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: "🧒", title: "Children", desc: "Pediatric cancers — leukemia, lymphoma, Wilms, neuroblastoma, and more" },
            { icon: "👩", title: "Adults", desc: "Breast, lung, colon, prostate, ovarian, skin — all ages, all stages" },
            { icon: "👴", title: "Seniors", desc: "Cancer in older adults — treatment considerations, quality of life, support" },
            { icon: "❤️", title: "Caregivers", desc: "Parents, partners, children of patients — your support matters too" },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="card text-center">
              <div className="text-3xl mb-2">{icon}</div>
              <h3 className="font-bold text-slate-800 mb-1 text-sm">{title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Community note */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="text-center">
          <Users className="w-10 h-10 text-hope-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-slate-800 mb-3">Built from real experience</h2>
          <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">
            HopePulse was born when a family faced a cancer diagnosis and desperately needed a calm, trustworthy
            source of information amid the fear. Every feature is designed to reduce anxiety, not add to it —
            for every family, every cancer, every journey.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/chat" className="btn-primary">Talk to HopePulse AI</Link>
            <Link href="/cases" className="btn-secondary">See Similar Cases</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
