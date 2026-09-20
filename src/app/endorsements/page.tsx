import { EndorsementsSection } from "@/components/endorsements/EndorsementsSection";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Client Reviews & Endorsements | Bharath Kumar Achari",
  description:
    "What clients and collaborators say about working with Bharath Kumar Achari across protocol architecture, distributed systems, and infrastructure engineering.",
};

export default function EndorsementsPage() {
  return (
    <main className="relative w-full min-h-screen bg-[#08080c] text-white">
      {/* Return navigation bar */}
      <div className="sticky top-0 z-30 border-b border-white/[0.08] bg-[#08080c]/90 backdrop-blur-md px-6 sm:px-10 lg:px-16 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-cyan-400" />
            <span>RETURN TO PORTFOLIO</span>
          </Link>
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
            CLIENT REVIEWS
          </span>
        </div>
      </div>

      <EndorsementsSection isStandalonePage={true} />
    </main>
  );
}
