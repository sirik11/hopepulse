"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { HeartPulse, Menu, X, MessageCircleHeart, Search, BookOpen, Microscope, HandHeart, Users } from "lucide-react";
import clsx from "clsx";
import AuthButton from "@/components/AuthButton";

const links = [
  { href: "/chat",       label: "AI Chat",         icon: MessageCircleHeart },
  { href: "/analysis",   label: "My Diagnosis",    icon: Search },
  { href: "/cases",      label: "Similar Cases",   icon: Users },
  { href: "/treatments", label: "Treatments",      icon: Microscope },
  { href: "/trials",     label: "Clinical Trials", icon: BookOpen },
  { href: "/support",    label: "Support",         icon: HandHeart },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-gradient-to-br from-hope-500 to-hope-700 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-hope-300 transition-shadow">
              <HeartPulse className="w-5 h-5 text-white heartbeat" />
            </div>
            <span className="text-xl font-bold">
              <span className="text-hope-700">Hope</span>
              <span className="text-pulse-500">Pulse</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={clsx(
                  "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150",
                  pathname === href
                    ? "bg-hope-100 text-hope-700"
                    : "text-slate-600 hover:bg-hope-50 hover:text-hope-700"
                )}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
          </div>

          {/* CTA + Auth */}
          <div className="hidden md:flex items-center gap-2">
            <AuthButton />
            <Link href="/chat" className="btn-primary text-sm py-2 px-4">
              Talk to HopePulse AI
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-hope-50"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-hope-100 bg-white animate-fade-in">
          <div className="px-4 py-3 space-y-1">
            {links.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={clsx(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                  pathname === href
                    ? "bg-hope-100 text-hope-700"
                    : "text-slate-600 hover:bg-hope-50"
                )}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
            <Link href="/chat" onClick={() => setOpen(false)} className="btn-primary w-full text-center text-sm mt-2 block">
              Talk to HopePulse AI
            </Link>
            <div className="pt-2 border-t border-hope-100 mt-2">
              <AuthButton />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
