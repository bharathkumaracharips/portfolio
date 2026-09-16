"use client";

import React from "react";
import { endorsementMetrics } from "@/data/endorsements";

export const EndorsementsHero: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      {/* Eyebrow */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-mono tracking-widest text-[#00F0FF] uppercase">
          ENDORSEMENTS // 05
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-pulse" />
        <span className="text-[11px] font-mono tracking-wider text-zinc-400 uppercase">
          SIGNALS FROM THE NETWORK &bull; HUMAN VALIDATION
        </span>
      </div>

      {/* Main Title & Tagline */}
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-sans text-white">
          ENDORSEMENTS
        </h1>
        <p className="text-lg sm:text-xl font-mono text-[#00F0FF]">
          &ldquo;What people experienced working and learning with me.&rdquo;
        </p>
      </div>

      {/* Supporting Narrative */}
      <p className="text-sm sm:text-base text-zinc-400 font-light max-w-2xl leading-relaxed">
        A genuine record of perspectives from protocol architects, infrastructure leads, and engineering collaborators who have built, debugged, and scaled mission-critical systems together.
      </p>

      {/* Compact System Metadata Row */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2 text-xs font-mono">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/10">
          <span className="text-zinc-500">VALIDATION:</span>
          <span className="text-zinc-200 font-semibold">PEER &amp; CLIENT</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/10">
          <span className="text-zinc-500">TOTAL SIGNALS:</span>
          <span className="text-[#00F0FF] font-bold">0{endorsementMetrics.total} RECORDS</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/10">
          <span className="text-zinc-500">ENGINEERING:</span>
          <span className="text-zinc-200 font-semibold">0{endorsementMetrics.engineering} SIGNALS</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/10">
          <span className="text-zinc-500">STATUS:</span>
          <span className="text-[#00FF66] font-semibold">PUBLISHED</span>
        </div>
      </div>
    </div>
  );
};
