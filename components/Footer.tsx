import Link from "next/link";
import { HeartPulse, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-hope-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-hope-500 to-hope-700 rounded-xl flex items-center justify-center">
                <HeartPulse className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold">
                <span className="text-hope-700">Hope</span>
                <span className="text-pulse-500">Pulse</span>
              </span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              Compassionate cancer information and support — so you can focus on what matters most.
            </p>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-slate-800 mb-3">Resources</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><Link href="/chat" className="hover:text-hope-600 transition-colors">AI Chat</Link></li>
              <li><Link href="/analysis" className="hover:text-hope-600 transition-colors">Diagnosis Analysis</Link></li>
              <li><Link href="/treatments" className="hover:text-hope-600 transition-colors">Treatment Guide</Link></li>
              <li><Link href="/trials" className="hover:text-hope-600 transition-colors">Clinical Trials</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-slate-800 mb-3">Support</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><Link href="/support" className="hover:text-hope-600 transition-colors">Emotional Support</Link></li>
              <li><Link href="/support#parents" className="hover:text-hope-600 transition-colors">For Parents</Link></li>
              <li><Link href="/support#children" className="hover:text-hope-600 transition-colors">For Children</Link></li>
              <li><Link href="/support#faith" className="hover:text-hope-600 transition-colors">Faith & Strength</Link></li>
            </ul>
          </div>

          {/* Disclaimer */}
          <div>
            <h4 className="text-sm font-semibold text-slate-800 mb-3">Important Note</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              HopePulse provides general educational information only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult your oncologist and care team for medical decisions.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-hope-50 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} HopePulse. Built with care for families facing cancer.
          </p>
          <p className="text-xs text-slate-400 flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-rose-400 fill-rose-400" /> for every family on this journey
          </p>
        </div>
      </div>
    </footer>
  );
}
