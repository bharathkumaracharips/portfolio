"use client";

import React from "react";
import { certificationsData } from "@/data/certifications";

export const CertificationsHero: React.FC = () => {
  const totalRecords = certificationsData.length;

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      {/* Eyebrow */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-mono tracking-widest text-[#00F0FF] uppercase">
          CREDENTIALS // 04
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-pulse" />
        <span className="text-[11px] font-mono tracking-wider text-zinc-400 uppercase">
          FORMAL ATTESTATIONS &amp; REGISTRY
        </span>
      </div>

      {/* Main Title & Tagline */}
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-sans text-white">
          ATTESTATIONS
        </h1>
        <p className="text-lg sm:text-xl font-mono text-[#00F0FF]">
          &ldquo;Formal records of continuous technical learning.&rdquo;
        </p>
      </div>

      {/* Supporting Narrative */}
      <p className="text-sm sm:text-base text-zinc-400 font-light max-w-2xl leading-relaxed">
        An archive of verified certifications, distributed systems accreditations, and engineering qualifications completed across protocol architecture, cloud systems, and Kubernetes.
      </p>

      {/* Compact System Metadata Row */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2 text-xs font-mono">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/10">
          <span className="text-zinc-500">RECORD TYPE:</span>
          <span className="text-zinc-200 font-semibold">CERTIFICATION</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/10">
          <span className="text-zinc-500">ARCHIVE:</span>
          <span className="text-[#00FF66]">OPEN</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/10">
          <span className="text-zinc-500">TOTAL RECORDS:</span>
          <span className="text-[#00F0FF] font-bold">0{totalRecords} ATTESTATIONS</span>
        </div>
      </div>
    </div>
  );
};
