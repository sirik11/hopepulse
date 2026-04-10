"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  HeartPulse,
  Search,
  MessageCircleHeart,
  BookMarked,
  User,
  LogOut,
  ArrowRight,
  Loader2,
  Users,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { User as SupabaseUser } from "@supabase/supabase-js";

interface DashboardCounts {
  savedDiagnoses: number;
  chatHistory: number;
  bookmarkedCases: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [counts, setCounts] = useState<DashboardCounts>({
    savedDiagnoses: 0,
    chatHistory: 0,
    bookmarkedCases: 0,
  });
  const [loading, setLoading] = useState(true);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/auth");
        return;
      }
      setUser(session.user);
      await fetchCounts(session.user.id);
      setLoading(false);
    };
    init();
  }, [router]);

  const fetchCounts = async (userId: string) => {
    const [diagRes, chatRes, bookRes] = await Promise.all([
      supabase
        .from("saved_diagnoses")
        .select("id", { count: "exact", head: true })
        .eq("user_id", userId),
      supabase
        .from("chat_history")
        .select("id", { count: "exact", head: true })
        .eq("user_id", userId),
      supabase
        .from("bookmarked_cases")
        .select("id", { count: "exact", head: true })
        .eq("user_id", userId),
    ]);

    setCounts({
      savedDiagnoses: diagRes.count ?? 0,
      chatHistory: chatRes.count ?? 0,
      bookmarkedCases: bookRes.count ?? 0,
    });
  };

  const handleSignOut = async () => {
    setSigningOut(true);
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-hope-500 animate-spin mx-auto mb-3" />
          <p className="text-slate-500 text-sm">Loading your dashboard…</p>
        </div>
      </div>
    );
  }

  const displayName = user?.user_metadata?.full_name as string | undefined
    || user?.email?.split("@")[0]
    || "there";

  const cards = [
    {
      icon: Search,
      color: "bg-amber-100 text-amber-700",
      title: "Saved Diagnoses",
      count: counts.savedDiagnoses,
      desc: "Diagnoses you've analyzed and saved for reference.",
      href: "/analysis",
      linkLabel: "Go to My Diagnosis",
    },
    {
      icon: MessageCircleHeart,
      color: "bg-hope-100 text-hope-700",
      title: "Chat History",
      count: counts.chatHistory,
      desc: "Messages from your conversations with HopePulse AI.",
      href: "/chat",
      linkLabel: "Open AI Chat",
    },
    {
      icon: BookMarked,
      color: "bg-violet-100 text-violet-700",
      title: "Bookmarked Cases",
      count: counts.bookmarkedCases,
      desc: "Similar cases you've saved to revisit.",
      href: "/cases",
      linkLabel: "Browse Cases",
    },
    {
      icon: User,
      color: "bg-teal-100 text-teal-700",
      title: "My Profile",
      count: null,
      desc: user?.email ?? "",
      href: null,
      linkLabel: null,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-9 h-9 bg-gradient-to-br from-hope-500 to-hope-700 rounded-xl flex items-center justify-center shadow-md">
              <HeartPulse className="w-5 h-5 text-white heartbeat" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800">
              Welcome back, <span className="text-hope-700">{displayName}</span>
            </h1>
          </div>
          <p className="text-slate-500 text-sm pl-11">
            Your personal HopePulse dashboard
          </p>
        </div>

        <button
          onClick={handleSignOut}
          disabled={signingOut}
          className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:border-red-300 hover:text-red-600 text-slate-600 font-medium px-4 py-2.5 rounded-xl text-sm transition-all duration-200 disabled:opacity-60"
        >
          {signingOut ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <LogOut className="w-4 h-4" />
          )}
          Sign Out
        </button>
      </div>

      {/* Quick stats row */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Saved Diagnoses", value: counts.savedDiagnoses, color: "text-amber-600" },
          { label: "Chat Messages", value: counts.chatHistory, color: "text-hope-600" },
          { label: "Bookmarked Cases", value: counts.bookmarkedCases, color: "text-violet-600" },
        ].map(({ label, value, color }) => (
          <div key={label} className="card text-center py-5">
            <div className={`text-3xl font-extrabold ${color} mb-1`}>{value}</div>
            <div className="text-xs text-slate-500 font-medium">{label}</div>
          </div>
        ))}
      </div>

      {/* Dashboard cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
        {cards.map(({ icon: Icon, color, title, count, desc, href, linkLabel }) => (
          <div key={title} className="card hover:shadow-md hover:border-hope-200 transition-all duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center`}>
                <Icon className="w-5 h-5" />
              </div>
              {count !== null && (
                <span className="badge bg-slate-100 text-slate-600 text-xs">
                  {count} {count === 1 ? "item" : "items"}
                </span>
              )}
            </div>
            <h3 className="font-bold text-slate-800 mb-1">{title}</h3>
            <p className="text-sm text-slate-500 mb-4 leading-relaxed">{desc}</p>
            {href && linkLabel && (
              <Link
                href={href}
                className="inline-flex items-center gap-1.5 text-hope-600 hover:text-hope-700 text-sm font-semibold transition-colors"
              >
                {linkLabel}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* Quick links */}
      <div className="card bg-gradient-to-r from-hope-50 to-pulse-50 border-hope-100">
        <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Users className="w-4 h-4 text-hope-600" />
          Quick Access
        </h2>
        <div className="flex flex-wrap gap-2">
          {[
            { href: "/chat",       label: "AI Chat" },
            { href: "/analysis",   label: "My Diagnosis" },
            { href: "/cases",      label: "Similar Cases" },
            { href: "/treatments", label: "Treatments" },
            { href: "/trials",     label: "Clinical Trials" },
            { href: "/support",    label: "Support" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm bg-white border border-hope-200 text-slate-600 px-3 py-1.5 rounded-full hover:bg-hope-50 hover:border-hope-400 hover:text-hope-700 transition-all"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
