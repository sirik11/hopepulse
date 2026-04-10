"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogOut, User, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export default function AuthButton() {
  const router = useRouter();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    setSigningOut(true);
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
    setSigningOut(false);
  };

  if (loading) {
    return (
      <div className="w-20 h-8 bg-hope-50 rounded-lg animate-pulse" />
    );
  }

  if (user) {
    const shortEmail = user.email
      ? user.email.length > 20
        ? user.email.slice(0, 18) + "…"
        : user.email
      : "Account";

    return (
      <div className="flex items-center gap-2">
        <Link
          href="/dashboard"
          className="hidden sm:flex items-center gap-1.5 text-xs text-slate-600 hover:text-hope-700 bg-hope-50 hover:bg-hope-100 border border-hope-200 px-3 py-1.5 rounded-lg transition-all font-medium"
          title={user.email}
        >
          <User className="w-3.5 h-3.5" />
          {shortEmail}
        </Link>
        <button
          onClick={handleSignOut}
          disabled={signingOut}
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-red-600 hover:bg-red-50 border border-slate-200 hover:border-red-200 px-3 py-1.5 rounded-lg transition-all font-medium disabled:opacity-60"
          title="Sign out"
        >
          {signingOut ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <LogOut className="w-3.5 h-3.5" />
          )}
          <span className="hidden sm:inline">Sign Out</span>
        </button>
      </div>
    );
  }

  return (
    <Link
      href="/auth"
      className="flex items-center gap-1.5 text-xs font-semibold bg-hope-600 hover:bg-hope-700 text-white px-4 py-1.5 rounded-lg transition-all shadow-sm hover:shadow-md"
    >
      <User className="w-3.5 h-3.5" />
      Sign In
    </Link>
  );
}
