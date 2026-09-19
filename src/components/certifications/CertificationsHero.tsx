"use client";

import React from "react";
import { certificationsData } from "@/data/certifications";

export const CertificationsHero: React.FC = () => {
  const totalRecords = certificationsData.length;

  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-white/[0.08] pb-3">
      {/* Left: Eyebrow + Title + Tagline */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono tracking-widest text-[#00F0FF] uppercase font-bold">
            CREDENTIALS // 04
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-pulse" />
          <span className="text-[10px] font-mono tracking-wider text-zinc-400 uppercase">
            FORMAL ATTESTATIONS &amp; REGISTRY
          </span>
        </div>

        <div className="flex flex-wrap items-baseline gap-2.5 sm:gap-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-sans text-white leading-none">
            ATTESTATIONS
          </h2>
          <span className="text-xs sm:text-sm font-mono text-[#00F0FF]/80">
            &ldquo;Formal records of continuous technical learning.&rdquo;
          </span>
        </div>
      </div>

      {/* Right: Badges */}
      <div className="flex items-center gap-2 text-[11px] font-mono shrink-0">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/10">
          <span className="text-zinc-500">ARCHIVE:</span>
          <span className="text-[#00FF66] font-semibold">OPEN</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/10">
          <span className="text-zinc-500">TOTAL:</span>
          <span className="text-[#00F0FF] font-bold">
            {totalRecords.toString().padStart(2, "0")} ATTESTATIONS
          </span>
        </div>
      </div>
    </div>
  );
};
