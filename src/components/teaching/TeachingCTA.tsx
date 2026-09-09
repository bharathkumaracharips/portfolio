"use client";

import React from "react";
import { ArrowRight, Terminal, Cpu, Mail } from "lucide-react";

export function TeachingCTA() {
  return (
    <section className="relative w-full py-20 px-6 sm:px-10 bg-[#050811] text-[#F8FAFC]">
      <div className="max-w-[1440px] w-full mx-auto">
        <div className="p-8 sm:p-12 rounded-2xl bg-[#080d1a] border border-[#1e293b] flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          {/* Subtle Ambient Accent */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#00F0FF]/5 rounded-full blur-3xl pointer-events-none" />

          {/* Left Content */}
          <div className="max-w-xl z-10">
            <span className="text-xs font-mono tracking-widest text-[#00F0FF] uppercase font-bold block mb-2">
              05 // COLLABORATION & ADVISORY
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
              Need help architecting, auditing, or teaching blockchain protocols?
            </h3>
            <p className="text-sm text-[#cbd5e1] leading-relaxed">
              Available for specialized protocol engineering advisory, Substrate runtime development, and private team technical workshops.
            </p>
          </div>

          {/* Right Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 z-10 shrink-0 w-full md:w-auto">
            <a
              href="#contact"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#00F0FF] text-black font-mono text-xs font-bold hover:bg-[#38BDF8] transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)]"
            >
              <Mail className="w-4 h-4" />
              <span>Get in Touch</span>
            </a>
            <a
              href="#work"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#0f172a] border border-[#1e293b] text-white font-mono text-xs hover:border-[#00F0FF] hover:text-[#00F0FF] transition-all"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
