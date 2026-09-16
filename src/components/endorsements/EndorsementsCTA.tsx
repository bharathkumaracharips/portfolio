"use client";

import React from "react";
import { ArrowRight, Terminal } from "lucide-react";

export const EndorsementsCTA: React.FC = () => {
  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToServices = () => {
    const el = document.getElementById("services");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="mt-8 p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-cyan-950/40 border border-[#00F0FF]/30 flex items-center justify-center text-[#00F0FF]">
          <Terminal className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white">
            Build Something Worth Talking About
          </h4>
          <p className="text-xs text-zinc-400">
            Have a system, protocol, or engineering problem in mind? Let&apos;s build reliable architecture together.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2.5 w-full sm:w-auto">
        <button
          onClick={scrollToContact}
          className="w-full sm:w-auto px-4 py-2 rounded-lg bg-[#00F0FF] text-black font-mono text-xs font-semibold hover:bg-[#61E7FF] transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
        >
          <span>START A PROJECT</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={scrollToServices}
          className="w-full sm:w-auto px-3.5 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-zinc-300 hover:text-[#00F0FF] hover:border-white/20 font-mono text-xs transition-colors cursor-pointer whitespace-nowrap"
        >
          <span>SERVICES</span>
        </button>
      </div>
    </div>
  );
};
