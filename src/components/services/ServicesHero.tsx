"use client";

import React from "react";
import { ArrowRight, Layers } from "lucide-react";

export const ServicesHero: React.FC = () => {
  const scrollToContact = () => {
    const el = document.getElementById("services-contact") || document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToWork = () => {
    const el = document.getElementById("work");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      {/* Eyebrow */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-mono tracking-widest text-[#00F0FF] uppercase">
          SERVICES // 04
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-pulse" />
        <span className="text-[11px] font-mono tracking-wider text-zinc-400 uppercase">
          ENGINEERING CAPABILITIES & CAPACITIES
        </span>
      </div>

      {/* Main Heading */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-sans text-white leading-[1.08]">
        ENGINEERING FOR <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500">
          SYSTEMS THAT MATTER.
        </span>
      </h1>

      {/* Supporting Copy */}
      <p className="text-base sm:text-lg text-zinc-400 font-light max-w-2xl leading-relaxed">
        I engineer sovereign Layer-1/Layer-2 runtimes, zero-copy smart contract protocols, high-concurrency RPC infrastructure, and technical education curricula. Grounded in deterministic systems and zero-overhead execution.
      </p>

      {/* Action CTAs */}
      <div className="flex flex-wrap items-center gap-4 pt-2">
        <button
          onClick={scrollToContact}
          className="group flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#00F0FF] text-black font-semibold text-xs tracking-wider uppercase hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)]"
        >
          <span>START A PROJECT</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>

        <button
          onClick={scrollToWork}
          className="flex items-center gap-2 px-6 py-3.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white font-mono text-xs tracking-wider uppercase border border-white/10 hover:border-white/20 transition-all"
        >
          <Layers className="w-3.5 h-3.5 text-[#00F0FF]" />
          <span>VIEW WORK & PROOF</span>
        </button>
      </div>
    </div>
  );
};
