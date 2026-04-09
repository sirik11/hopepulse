"use client";

import { useState, useEffect } from "react";
import {
  BookOpen,
  ExternalLink,
  FlaskConical,
  Users,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Star,
  ArrowRight,
  RefreshCw,
  MapPin,
  Search,
  Wifi,
  WifiOff,
} from "lucide-react";
import Link from "next/link";

interface Trial {
  nctId: string;
  title: string;
  status: string;
  phase: string;
  sponsor: string;
  summary: string;
  startDate: string;
  minAge: string;
  maxAge: string;
  locations: { facility: string; city: string; country: string }[];
}

const CONDITION_OPTIONS = [
  { value: "hodgkin lymphoma", label: "Hodgkin's Lymphoma" },
  { value: "non-hodgkin lymphoma", label: "Non-Hodgkin's Lymphoma" },
  { value: "acute lymphoblastic leukemia", label: "ALL (Leukemia)" },
  { value: "acute myeloid leukemia", label: "AML (Leukemia)" },
  { value: "wilms tumor", label: "Wilms Tumor" },
  { value: "neuroblastoma", label: "Neuroblastoma" },
  { value: "medulloblastoma", label: "Medulloblastoma" },
];

const PHASE_INFO = [
  { type: "Phase 1", desc: "Safety — small groups, first-in-human doses" },
  { type: "Phase 2", desc: "Efficacy — does it work?" },
  { type: "Phase 3", desc: "Comparison vs standard — highest evidence" },
];

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    RECRUITING: "bg-emerald-100 text-emerald-700",
    ACTIVE_NOT_RECRUITING: "bg-blue-100 text-blue-700",
    COMPLETED: "bg-slate-100 text-slate-500",
    NOT_YET_RECRUITING: "bg-amber-100 text-amber-700",
  };
  const label: Record<string, string> = {
    RECRUITING: "Recruiting",
    ACTIVE_NOT_RECRUITING: "Active",
    COMPLETED: "Completed",
    NOT_YET_RECRUITING: "Opening Soon",
  };
  return (
    <span className={`badge text-xs ${map[status] || "bg-slate-100 text-slate-600"}`}>
      {label[status] || status}
    </span>
  );
}

function TrialCard({ trial }: { trial: Trial }) {
  const [expanded, setExpanded] = useState(false);
  const summary = trial.summary?.replace(/\n/g, " ").trim() || "";

  return (
    <div className="card border-l-4 border-l-violet-400 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3 mb-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <StatusBadge status={trial.status} />
            {trial.phase && trial.phase !== "N/A" && (
              <span className="badge bg-violet-100 text-violet-700 text-xs">{trial.phase}</span>
            )}
          </div>
          <h3 className="font-bold text-slate-800 text-sm leading-snug mt-1">{trial.title}</h3>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 text-xs text-slate-500 my-2">
        {trial.minAge && (
          <span className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            Ages {trial.minAge}{trial.maxAge ? `–${trial.maxAge}` : "+"}
          </span>
        )}
        {trial.sponsor && (
          <span className="text-hope-600 font-medium">{trial.sponsor}</span>
        )}
        {trial.startDate && (
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            Since {trial.startDate}
          </span>
        )}
      </div>

      {summary && (
        <p className="text-sm text-slate-600 leading-relaxed mb-3">
          {expanded ? summary : summary.slice(0, 200) + (summary.length > 200 ? "…" : "")}
        </p>
      )}

      {trial.locations.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {trial.locations.map((l, i) => (
            <span key={i} className="flex items-center gap-1 text-xs bg-slate-50 border border-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
              <MapPin className="w-2.5 h-2.5" />
              {l.city || l.facility}, {l.country}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between mt-2">
        {summary.length > 200 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-hope-600 text-xs font-medium hover:text-hope-700"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
        <a
          href={`https://clinicaltrials.gov/study/${trial.nctId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto flex items-center gap-1.5 text-hope-600 text-xs font-semibold hover:text-hope-700"
        >
          View on ClinicalTrials.gov <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}

export default function TrialsPage() {
  const [condition, setCondition] = useState("hodgkin lymphoma");
  const [ageGroup, setAgeGroup] = useState("child");
  const [trials, setTrials] = useState<Trial[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState("");
  const [isLive, setIsLive] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const fetchTrials = async () => {
    setLoading(true);
    setError("");
    setHasSearched(true);
    try {
      const res = await fetch(
        `/api/trials?condition=${encodeURIComponent(condition)}&ageGroup=${ageGroup}&status=RECRUITING`
      );
      const data = await res.json();
      if (data.error) {
        setError(data.error);
        setIsLive(false);
      } else {
        setTrials(data.studies || []);
        setTotal(data.total || 0);
        setIsLive(true);
      }
    } catch {
      setError("Could not connect to ClinicalTrials.gov. Check your internet connection.");
      setIsLive(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrials();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const questions = [
    "What clinical trials is my child eligible for?",
    "Is this trial being offered at your institution or a nearby center?",
    "What are the potential benefits and risks?",
    "Will my child receive standard treatment or possibly something better?",
    "Is there a control arm — could they receive the standard treatment even in the trial?",
    "What monitoring and extra visits are required?",
    "Are there any costs associated with trial participation?",
    "Can we withdraw from the trial if we want to?",
    "How does participation affect the standard treatment timeline?",
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 badge bg-violet-100 text-violet-700 mb-4">
          <BookOpen className="w-3.5 h-3.5" />
          Clinical Trials
        </div>
        <h1 className="text-4xl font-bold text-slate-800 mb-3">Live Clinical Trials</h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          Real-time trial data from <strong className="text-violet-700">ClinicalTrials.gov</strong> — the official US registry of all clinical trials.
          Updated live whenever you search.
        </p>
      </div>

      {/* Live data badge */}
      <div className={`flex items-center justify-center gap-2 mb-6 text-sm font-medium ${isLive ? "text-emerald-600" : "text-slate-400"}`}>
        {isLive ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
        {isLive ? "Live data from ClinicalTrials.gov" : "Using cached data"}
      </div>

      {/* What is a trial */}
      <div className="card mb-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <FlaskConical className="w-5 h-5 text-violet-700" />
          </div>
          <div>
            <h2 className="font-bold text-slate-800 text-lg mb-2">Why clinical trials matter</h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-3">
              Most children with cancer in the US are treated <em>within</em> clinical trials — this is a major reason pediatric cancer outcomes have improved so dramatically.
              Participating often means access to the newest treatments <em>before</em> they are widely available.
            </p>
            <div className="grid grid-cols-3 gap-3">
              {PHASE_INFO.map(({ type, desc }) => (
                <div key={type} className="bg-violet-50 rounded-lg p-2.5 text-center">
                  <div className="badge bg-violet-100 text-violet-700 text-xs mx-auto mb-1">{type}</div>
                  <p className="text-xs text-slate-500">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="card mb-6">
        <h2 className="font-bold text-slate-800 mb-4">Search Live Trials</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="flex-1 border border-hope-200 rounded-xl px-3 py-2.5 text-sm bg-hope-50 focus:outline-none focus:ring-2 focus:ring-hope-300"
          >
            {CONDITION_OPTIONS.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
          <select
            value={ageGroup}
            onChange={(e) => setAgeGroup(e.target.value)}
            className="border border-hope-200 rounded-xl px-3 py-2.5 text-sm bg-hope-50 focus:outline-none focus:ring-2 focus:ring-hope-300"
          >
            <option value="child">Children (under 18)</option>
            <option value="teen">Teens (12–18)</option>
            <option value="adult">Adults</option>
            <option value="">All ages</option>
          </select>
          <button
            onClick={fetchTrials}
            disabled={loading}
            className="btn-primary flex items-center gap-2 whitespace-nowrap"
          >
            {loading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
            {loading ? "Searching…" : "Search"}
          </button>
        </div>
      </div>

      {/* Results */}
      {error && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 mb-6">
          <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-amber-700">{error}</p>
            <a
              href={`https://clinicaltrials.gov/search?cond=${encodeURIComponent(condition)}&recrs=a&age=0`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-hope-600 font-medium mt-1 inline-flex items-center gap-1 hover:underline"
            >
              Search ClinicalTrials.gov directly <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}

      {loading && (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <RefreshCw className="w-8 h-8 text-hope-400 animate-spin" />
          <p className="text-slate-500 text-sm">Fetching live trial data from ClinicalTrials.gov…</p>
        </div>
      )}

      {!loading && hasSearched && trials.length > 0 && (
        <>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-800">
              {trials.length} Recruiting Trials
            </h2>
            <span className="text-sm text-slate-400">
              {total > trials.length && `Showing ${trials.length} of ${total.toLocaleString()} total`}
            </span>
          </div>
          <div className="space-y-4 mb-8">
            {trials.map((trial) => (
              <TrialCard key={trial.nctId} trial={trial} />
            ))}
          </div>
          <div className="text-center">
            <a
              href={`https://clinicaltrials.gov/search?cond=${encodeURIComponent(condition)}&recrs=a&age=0`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 btn-secondary text-sm"
            >
              View all {total.toLocaleString()} trials on ClinicalTrials.gov
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </>
      )}

      {!loading && hasSearched && trials.length === 0 && !error && (
        <div className="card text-center py-10">
          <FlaskConical className="w-10 h-10 text-slate-200 mx-auto mb-3" />
          <p className="text-slate-500 text-sm">No currently recruiting trials found for this search.</p>
          <p className="text-xs text-slate-400 mt-1">Try a different condition or age group.</p>
        </div>
      )}

      {/* COG note */}
      <div className="mt-8 bg-violet-50 border border-violet-100 rounded-xl p-5">
        <div className="flex items-start gap-3">
          <Star className="w-5 h-5 text-violet-500 flex-shrink-0 mt-0.5 fill-violet-200" />
          <div>
            <h3 className="font-bold text-slate-800 mb-1">Children&apos;s Oncology Group (COG)</h3>
            <p className="text-sm text-slate-600">
              COG runs the world&apos;s largest pediatric cancer clinical trials. If your child is treated at a COG-affiliated
              center (most major children&apos;s hospitals in the US and internationally), ask specifically about open COG studies.
            </p>
            <a
              href="https://www.childrensoncologygroup.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-violet-600 text-sm font-medium mt-2 hover:text-violet-700"
            >
              Visit COG website <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Questions to ask */}
      <div className="mt-6 card bg-gradient-to-r from-hope-50 to-violet-50 border-hope-200">
        <h2 className="font-bold text-slate-800 text-lg mb-4">Questions to Ask Your Oncologist</h2>
        <ul className="space-y-2">
          {questions.map((q, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-hope-500 flex-shrink-0 mt-0.5" />
              {q}
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="mt-8 bg-hope-900 rounded-2xl p-6 text-center text-white">
        <h3 className="font-bold text-lg mb-2">Questions about clinical trials?</h3>
        <p className="text-hope-300 text-sm mb-4">
          Our AI can explain any trial, what participation involves, and help you prepare for your oncologist conversation.
        </p>
        <Link href="/chat" className="inline-flex items-center gap-2 bg-white text-hope-700 font-bold px-6 py-3 rounded-xl hover:bg-hope-50 transition-colors">
          Ask HopePulse AI <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
