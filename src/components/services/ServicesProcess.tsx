"use client";

import React from "react";
import { processStagesData } from "@/data/services";

export const ServicesProcess: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 pt-12 border-t border-white/10">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[#00F0FF]">METHODOLOGY // 02</span>
          <span className="text-zinc-600">//</span>
          <span className="text-xs font-mono text-zinc-400">ENGINEERING PROCESS</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          How I Work
        </h2>
        <p className="text-sm text-zinc-400 font-light max-w-2xl">
          A disciplined 5-stage engineering lifecycle designed for deterministic execution, state invariant security, and zero-defect deployments.
        </p>
      </div>

      {/* 5-Stage Engineering Pipeline Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {processStagesData.map((stage) => (
          <div
            key={stage.number}
            className="group relative flex flex-col justify-between p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#00F0FF]/40 hover:bg-white/[0.04] transition-all duration-300"
          >
            {/* Stage Number & Title */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#00F0FF]">
                  STAGE {stage.number}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[#00FF66] transition-colors" />
              </div>

              <div className="flex flex-col">
                <h3 className="text-base font-bold text-white tracking-tight">
                  {stage.title}
                </h3>
                <span className="text-xs font-mono text-zinc-500">
                  {stage.tagline}
                </span>
              </div>

              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                {stage.description}
              </p>
            </div>

            {/* Stage Deliverable Tag */}
            <div className="mt-4 pt-3 border-t border-white/5 flex flex-col gap-1">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">
                STAGE DELIVERABLE
              </span>
              <span className="text-xs font-mono text-zinc-300 leading-snug">
                {stage.deliverable}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
