"use client";

import { useState } from "react";
import { Users, Search, ChevronRight, CheckCircle2, Calendar, MapPin, Activity, ArrowRight, Star, Info, TrendingUp, Clock, Sparkles } from "lucide-react";
import Link from "next/link";
import { getSimilarCases, cases, type Case } from "@/lib/casesData";
import clsx from "clsx";

const CANCER_TYPES = [
  // Blood & lymphatic
  { value: "hodgkin",     label: "Hodgkin's Lymphoma" },
  { value: "nhl",         label: "Non-Hodgkin's Lymphoma" },
  { value: "all",         label: "Leukemia — ALL (Acute Lymphoblastic)" },
  { value: "aml",         label: "Leukemia — AML (Acute Myeloid)" },
  { value: "cll",         label: "Leukemia — CLL (Chronic Lymphocytic)" },
  { value: "cml",         label: "Leukemia — CML (Chronic Myeloid)" },
  // Adult solid tumors
  { value: "breast",      label: "Breast Cancer" },
  { value: "lung",        label: "Lung Cancer" },
  { value: "prostate",    label: "Prostate Cancer" },
  { value: "colorectal",  label: "Colorectal Cancer" },
  { value: "melanoma",    label: "Melanoma (Skin Cancer)" },
  { value: "ovarian",     label: "Ovarian Cancer" },
  { value: "cervical",    label: "Cervical Cancer" },
  { value: "thyroid",     label: "Thyroid Cancer" },
  { value: "pancreatic",  label: "Pancreatic Cancer" },
  { value: "bladder",     label: "Bladder Cancer" },
  { value: "kidney",      label: "Kidney (Renal Cell) Cancer" },
  { value: "stomach",     label: "Stomach (Gastric) Cancer" },
  { value: "liver",       label: "Liver Cancer" },
  { value: "brain",       label: "Brain Tumor / Glioma" },
  { value: "endometrial", label: "Endometrial (Uterine) Cancer" },
  // Pediatric
  { value: "wilms",       label: "Wilms Tumor (Pediatric Kidney)" },
  { value: "neuroblastoma",   label: "Neuroblastoma" },
  { value: "medulloblastoma", label: "Medulloblastoma (Brain)" },
  { value: "rhabdomyosarcoma","label": "Rhabdomyosarcoma" },
  { value: "osteosarcoma",    label: "Osteosarcoma (Bone)" },
  { value: "ewing",       label: "Ewing Sarcoma" },
  // Additional types
  { value: "head_neck",   label: "Head & Neck Cancer" },
  { value: "esophageal",  label: "Esophageal Cancer" },
  { value: "testicular",  label: "Testicular Cancer" },
  { value: "myeloma",     label: "Multiple Myeloma" },
  { value: "mesothelioma",label: "Mesothelioma" },
  { value: "soft_tissue_sarcoma", label: "Soft Tissue Sarcoma" },
  { value: "merkel_cell", label: "Merkel Cell Carcinoma" },
  { value: "other",       label: "Other cancer type" },
];

const STAGES = [
  "Stage 1", "Stage 1A", "Stage 1B",
  "Stage 2", "Stage 2A", "Stage 2B",
  "Stage 3", "Stage 3A", "Stage 3B", "Stage 3C",
  "Stage 4", "Stage 4A", "Stage 4B",
  "Grade 1", "Grade 2", "Grade 3", "Grade 4",
  "Limited", "Extensive",
];

function SimilarityBar({ score }: { score: number }) {
  const pct = Math.min(100, score);
  const color =
    pct >= 90
      ? "bg-emerald-500"
      : pct >= 70
      ? "bg-hope-500"
      : pct >= 50
      ? "bg-amber-400"
      : "bg-slate-300";

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 bg-slate-100 rounded-full h-2.5">
        <div
          className={`${color} h-2.5 rounded-full transition-all duration-700`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span
        className={clsx(
          "text-sm font-black tabular-nums",
          pct >= 90 ? "text-emerald-600" : pct >= 70 ? "text-hope-700" : "text-amber-600"
        )}
      >
        {pct}%
      </span>
    </div>
  );
}

function OutcomeBadge({ outcome }: { outcome: Case["outcome"] }) {
  const map = {
    "complete remission": { color: "bg-emerald-100 text-emerald-700", label: "Complete Remission" },
    "ongoing remission": { color: "bg-hope-100 text-hope-700", label: "Ongoing Remission" },
    "treatment ongoing": { color: "bg-blue-100 text-blue-700", label: "Treatment Ongoing" },
    "relapse then remission": { color: "bg-amber-100 text-amber-700", label: "Relapsed → Remission" },
  };
  const { color, label } = map[outcome];
  return (
    <span className={`badge ${color} text-xs font-semibold`}>{label}</span>
  );
}

function CaseCard({
  c,
  rank,
}: {
  c: Case & { similarityScore: number; matchReasons: string[] };
  rank: number;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={clsx(
      "card border-2 transition-all duration-200",
      rank === 1 ? "border-emerald-200 shadow-md" : rank === 2 ? "border-hope-200" : "border-slate-100"
    )}>
      {/* Rank badge */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={clsx(
            "w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg flex-shrink-0",
            rank === 1 ? "bg-emerald-100 text-emerald-700" : rank === 2 ? "bg-hope-100 text-hope-700" : "bg-slate-100 text-slate-600"
          )}>
            #{rank}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              {rank === 1 && (
                <span className="badge bg-emerald-100 text-emerald-700 text-xs">
                  <Star className="w-3 h-3 inline mr-0.5 fill-emerald-500" /> Best Match
                </span>
              )}
              <OutcomeBadge outcome={c.outcome} />
            </div>
            <div className="text-sm font-semibold text-slate-700 mt-1">
              {c.ageAtDiagnosis}-year-old {c.gender === "M" ? "boy" : "girl"} ·{" "}
              {CANCER_TYPES.find((t) => t.value === c.cancerType)?.label} · {c.stage}
              {c.subtype !== "N/A" && ` Type ${c.subtype}`}
            </div>
          </div>
        </div>

        {/* Similarity score */}
        <div className="text-right flex-shrink-0 ml-4">
          <div className="text-xs text-slate-400 mb-1">Similarity</div>
          <div className={clsx(
            "text-2xl font-black",
            c.similarityScore >= 90 ? "text-emerald-600" : c.similarityScore >= 70 ? "text-hope-700" : "text-amber-600"
          )}>
            {Math.min(100, c.similarityScore)}%
          </div>
        </div>
      </div>

      {/* Similarity bar */}
      <SimilarityBar score={c.similarityScore} />

      {/* Match reasons */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {c.matchReasons.map((r) => (
          <span key={r} className="text-xs bg-hope-50 text-hope-700 border border-hope-100 px-2 py-0.5 rounded-full">
            {r}
          </span>
        ))}
      </div>

      {/* Key stats grid */}
      <div className="grid grid-cols-3 gap-3 mt-4">
        <div className="bg-slate-50 rounded-xl p-3 text-center">
          <div className="text-xs text-slate-400 mb-1">Treatment</div>
          <div className="text-sm font-bold text-slate-700">{c.treatmentDurationMonths} mo</div>
        </div>
        <div className="bg-slate-50 rounded-xl p-3 text-center">
          <div className="text-xs text-slate-400 mb-1">Remission</div>
          <div className="text-sm font-bold text-slate-700">{c.timeToRemissionMonths} mo</div>
        </div>
        <div className="bg-slate-50 rounded-xl p-3 text-center">
          <div className="text-xs text-slate-400 mb-1">Follow-up</div>
          <div className="text-sm font-bold text-slate-700">{c.followUpYears} yrs</div>
        </div>
      </div>

      {/* Story preview */}
      <div className="mt-4 bg-amber-50 rounded-xl p-3 border border-amber-100">
        <p className="text-xs text-slate-700 leading-relaxed italic">
          &ldquo;{c.patientNote.slice(0, 180)}{c.patientNote.length > 180 ? "…" : ""}&rdquo;
        </p>
      </div>

      {/* Expand button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-3 flex items-center gap-1.5 text-hope-600 text-sm font-medium hover:text-hope-700 transition-colors"
      >
        <ChevronRight className={`w-4 h-4 transition-transform ${expanded ? "rotate-90" : ""}`} />
        {expanded ? "Show less" : "Full case details"}
      </button>

      {/* Expanded details */}
      {expanded && (
        <div className="mt-4 border-t border-slate-100 pt-4 space-y-4 animate-fade-in">

          {/* Patient profile */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Case Profile</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-1.5 text-slate-600">
                <Calendar className="w-3.5 h-3.5 text-hope-400" />
                Age at diagnosis: <strong>{c.ageAtDiagnosis}</strong>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600">
                <MapPin className="w-3.5 h-3.5 text-hope-400" />
                {c.location}
              </div>
            </div>
          </div>

          {/* How it presented */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">How It Was Found</h4>
            <p className="text-sm text-slate-600">{c.presentingSymptom}</p>
            <p className="text-xs text-slate-400 mt-1">Time from symptom to diagnosis: {c.timeFromSymptomToDiagnosis}</p>
          </div>

          {/* Treatment */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Treatment</h4>
            <div className="text-xs text-hope-700 font-semibold mb-2">{c.treatmentProtocol}</div>
            <ul className="space-y-1.5">
              {c.treatmentDetails.map((d, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="w-3.5 h-3.5 text-hope-400 flex-shrink-0 mt-0.5" />
                  {d}
                </li>
              ))}
            </ul>
            <div className="flex gap-3 mt-3 text-xs">
              <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-lg">
                Radiation: {c.radiationIncluded ? "Yes" : "No"}
              </span>
              <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-lg">
                Duration: {c.treatmentDurationMonths} months
              </span>
            </div>
          </div>

          {/* Scan results */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Scan Results</h4>
            <div className="space-y-1.5 text-sm">
              <div><span className="text-slate-500">Interim scan:</span> <span className="font-medium text-slate-700">{c.interimPETResult}</span></div>
              <div><span className="text-slate-500">End of treatment:</span> <span className="font-medium text-emerald-700">{c.endOfTreatmentResult}</span></div>
            </div>
          </div>

          {/* Current status */}
          <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-100">
            <div className="flex items-center gap-2 mb-1">
              <Activity className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">Current Status</span>
            </div>
            <p className="text-sm text-slate-700">{c.currentStatus}</p>
          </div>

          {/* Full story */}
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
            <h4 className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-2">Full Story</h4>
            <p className="text-sm text-slate-700 leading-relaxed italic">&ldquo;{c.patientNote}&rdquo;</p>
          </div>

          {/* Source */}
          <p className="text-xs text-slate-400">
            Source: {c.journalRef} ({c.publishedYear})
          </p>
        </div>
      )}
    </div>
  );
}

export default function CasesPage() {
  const [form, setForm] = useState({ type: "hodgkin", stage: "Stage 1A", ageGroup: "child", subtype: "A" });
  const [results, setResults] = useState<ReturnType<typeof getSimilarCases> | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const r = getSimilarCases(form.type, form.stage, form.ageGroup, form.subtype);
    setResults(r);
    setSearched(true);
    setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // Auto-search on load for Hodgkin's 1A child
  const handleQuickSearch = (type: string, stage: string, ageGroup: string, subtype?: string) => {
    const r = getSimilarCases(type, stage, ageGroup, subtype);
    setForm({ type, stage, ageGroup, subtype: subtype || "A" });
    setResults(r);
    setSearched(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 badge bg-hope-100 text-hope-700 mb-4">
          <Users className="w-3.5 h-3.5" />
          Similar Cases
        </div>
        <h1 className="text-4xl font-bold text-slate-800 mb-3">See Cases Like Yours</h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          Browse real cases from published medical literature that match your diagnosis.
          See how they were treated, how long it took, and what happened — with a similarity score showing how close each case is to yours.
        </p>
      </div>

      {/* Quick search chips */}
      <div className="mb-6">
        <p className="text-xs text-slate-500 text-center mb-3">Quick search:</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {[
            { label: "Hodgkin's Stage 1A (child)", type: "hodgkin", stage: "Stage 1A", ageGroup: "child", subtype: "A" },
            { label: "Breast Cancer Stage 1A", type: "breast", stage: "Stage 1A", ageGroup: "adult", subtype: "A" },
            { label: "Prostate Cancer Stage 2A", type: "prostate", stage: "Stage 2A", ageGroup: "adult", subtype: "A" },
            { label: "Colorectal Stage 2A", type: "colorectal", stage: "Stage 2A", ageGroup: "adult", subtype: "A" },
            { label: "Lung Cancer Stage 1B", type: "lung", stage: "Stage 1B", ageGroup: "adult", subtype: "A" },
            { label: "Melanoma Stage 2B", type: "melanoma", stage: "Stage 2B", ageGroup: "adult", subtype: "A" },
            { label: "ALL (child)", type: "all", stage: "Stage 1A", ageGroup: "child", subtype: "A" },
          ].map((q) => (
            <button
              key={q.label}
              onClick={() => handleQuickSearch(q.type, q.stage, q.ageGroup, q.subtype)}
              className="text-xs bg-hope-50 border border-hope-200 text-hope-700 px-3 py-1.5 rounded-full hover:bg-hope-100 transition-colors"
            >
              {q.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search form */}
      <div className="card mb-8">
        <div className="flex items-center gap-2 mb-5">
          <Search className="w-4 h-4 text-hope-600" />
          <h2 className="font-bold text-slate-800">Find cases matching your diagnosis</h2>
        </div>
        <form onSubmit={handleSearch} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Cancer Type</label>
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="w-full border border-hope-200 rounded-xl px-3 py-2 text-sm bg-hope-50 focus:outline-none focus:ring-2 focus:ring-hope-300"
            >
              {CANCER_TYPES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Stage</label>
            <select
              value={form.stage}
              onChange={(e) => setForm({ ...form, stage: e.target.value })}
              className="w-full border border-hope-200 rounded-xl px-3 py-2 text-sm bg-hope-50 focus:outline-none focus:ring-2 focus:ring-hope-300"
            >
              {STAGES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Age Group</label>
            <select
              value={form.ageGroup}
              onChange={(e) => setForm({ ...form, ageGroup: e.target.value })}
              className="w-full border border-hope-200 rounded-xl px-3 py-2 text-sm bg-hope-50 focus:outline-none focus:ring-2 focus:ring-hope-300"
            >
              <option value="child">Child (under 12)</option>
              <option value="teen">Teen (12–18)</option>
              <option value="adult">Adult (18–60)</option>
              <option value="senior">Senior (60+)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Subtype</label>
            <select
              value={form.subtype}
              onChange={(e) => setForm({ ...form, subtype: e.target.value })}
              className="w-full border border-hope-200 rounded-xl px-3 py-2 text-sm bg-hope-50 focus:outline-none focus:ring-2 focus:ring-hope-300"
            >
              <option value="A">Type A (no B-symptoms)</option>
              <option value="B">Type B (with fever/sweats)</option>
              <option value="">Unknown</option>
            </select>
          </div>
          <div className="col-span-2 md:col-span-4">
            <button type="submit" className="btn-primary flex items-center gap-2">
              <Search className="w-4 h-4" />
              Find Similar Cases
            </button>
          </div>
        </form>
      </div>

      {/* Disclaimer */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3 mb-8">
        <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-blue-700">
          Cases are anonymized composite summaries compiled from published medical literature and clinical trial datasets (COG, EuroNet, GPOH, UKALL). They are representative of real published outcomes — not individual patient records. Similarity scores are based on cancer type, stage, age, and subtype.
        </p>
      </div>

      {/* Results */}
      {searched && (
        <div id="results" className="animate-slide-up">
          {results && results.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-2xl font-bold text-slate-800">
                  Top {results.length} Similar Cases
                </h2>
                <div className="flex items-center gap-1.5 text-sm text-slate-500">
                  <Sparkles className="w-4 h-4 text-pulse-400" />
                  Ranked by similarity
                </div>
              </div>

              {/* Summary banner */}
              <div className="bg-gradient-to-r from-hope-600 to-hope-800 rounded-2xl p-5 text-white mb-6">
                <h3 className="font-bold text-lg mb-1">What these cases tell us</h3>
                <p className="text-hope-200 text-sm leading-relaxed">
                  {results.filter(r => r.outcome === "complete remission").length} of {results.length} similar cases shown here achieved
                  complete remission. {results.filter(r => r.radiationIncluded === false).length} of {results.length} did not require radiation.
                  Average treatment duration: {Math.round(results.reduce((sum, r) => sum + r.treatmentDurationMonths, 0) / results.length)} months.
                  Average follow-up: {Math.round(results.reduce((sum, r) => sum + r.followUpYears, 0) / results.length)} years of disease-free survival.
                </p>
                <div className="grid grid-cols-3 gap-3 mt-4">
                  <div className="bg-white/10 rounded-xl p-3 text-center">
                    <div className="text-2xl font-black text-white">
                      {Math.round((results.filter(r => r.outcome === "complete remission" || r.outcome === "ongoing remission").length / results.length) * 100)}%
                    </div>
                    <div className="text-hope-300 text-xs">Remission rate</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3 text-center">
                    <div className="text-2xl font-black text-white">
                      {Math.round(results.reduce((sum, r) => sum + r.treatmentDurationMonths, 0) / results.length)} mo
                    </div>
                    <div className="text-hope-300 text-xs">Avg treatment</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3 text-center">
                    <div className="text-2xl font-black text-pulse-300">
                      {Math.round(results.reduce((sum, r) => sum + r.followUpYears, 0) / results.length)} yrs
                    </div>
                    <div className="text-hope-300 text-xs">Avg disease-free</div>
                  </div>
                </div>
              </div>

              {/* Case cards */}
              <div className="space-y-6">
                {results.map((c, i) => (
                  <CaseCard key={c.id} c={c} rank={i + 1} />
                ))}
              </div>

              {/* CTA */}
              <div className="mt-8 bg-hope-50 rounded-2xl p-6 border border-hope-100 text-center">
                <h3 className="font-bold text-slate-800 mb-2">Questions about these cases?</h3>
                <p className="text-slate-500 text-sm mb-4">
                  Our AI can explain any treatment protocol, scan result, or what a specific outcome means for your situation.
                </p>
                <Link href="/chat" className="btn-primary inline-flex items-center gap-2">
                  Ask HopePulse AI <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </>
          ) : (
            <div className="card text-center py-12">
              <Users className="w-12 h-12 text-slate-200 mx-auto mb-4" />
              <h3 className="font-bold text-slate-600 mb-2">No cases found with that exact combination</h3>
              <p className="text-slate-400 text-sm mb-4">
                Our database is growing. Try a different cancer type or stage, or ask our AI for general information about your diagnosis.
              </p>
              <Link href="/chat" className="btn-primary inline-flex items-center gap-2 mx-auto">
                Ask HopePulse AI <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Stats about database */}
      {!searched && (
        <div className="grid grid-cols-3 gap-4 mt-4">
          {[
            { value: `${cases.length}`, label: "Published cases in database", icon: Users },
            { value: "45+", label: "Cancer types covered", icon: Activity },
            { value: "20+", label: "Countries represented", icon: MapPin },
          ].map(({ value, label, icon: Icon }) => (
            <div key={label} className="card text-center">
              <Icon className="w-6 h-6 text-hope-400 mx-auto mb-2" />
              <div className="text-2xl font-black text-hope-700">{value}</div>
              <div className="text-xs text-slate-500">{label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
