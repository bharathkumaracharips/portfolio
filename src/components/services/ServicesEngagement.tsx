"use client";

import React from "react";
import { engagementModelsData } from "@/data/services";
import { CheckCircle2, ShieldCheck } from "lucide-react";

export const ServicesEngagement: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 pt-12 border-t border-white/10">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[#00F0FF]">COLLABORATION // 03</span>
          <span className="text-zinc-600">//</span>
          <span className="text-xs font-mono text-zinc-400">ENGAGEMENT MODELS</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Engagement Models & Scope Philosophy
        </h2>
        <p className="text-sm text-zinc-400 font-light max-w-2xl">
          Complex distributed systems engineering is scoped according to technical requirements, state machine complexity, and delivery milestones.
        </p>
      </div>

      {/* Engagement Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {engagementModelsData.map((model) => (
          <div
            key={model.id}
            className="flex flex-col justify-between p-6 rounded-xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all gap-6 shadow-lg"
          >
            {/* Model Header */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#00F0FF]">
                  MODEL {model.number}
                </span>
                <span className="px-2 py-0.5 rounded bg-white/[0.04] text-[10px] font-mono text-zinc-400">
                  {model.scopeType}
                </span>
              </div>

              <div className="flex flex-col">
                <h3 className="text-lg font-bold text-white">{model.title}</h3>
                <span className="text-xs font-mono text-zinc-400">
                  {model.subtitle}
                </span>
              </div>

              <p className="text-xs text-zinc-300 font-light leading-relaxed">
                {model.idealFor}
              </p>
            </div>

            {/* Included Deliverables */}
            <div className="flex flex-col gap-3 pt-4 border-t border-white/5">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                SCOPE INCLUDES:
              </span>
              <ul className="flex flex-col gap-2">
                {model.deliverables.map((deliv, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00FF66] shrink-0 mt-0.5" />
                    <span>{deliv}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Scope & Pricing Philosophy Banner */}
      <div className="p-6 rounded-xl bg-gradient-to-r from-white/[0.03] to-white/[0.01] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-[#00F0FF] shrink-0 mt-0.5" />
          <div className="flex flex-col gap-1">
            <span className="text-xs font-mono text-white font-semibold">
              ENGINEERING VALUE-FIRST SCOPING
            </span>
            <p className="text-xs text-zinc-400 font-light max-w-2xl">
              No arbitrary tiers or synthetic hourly rates. We assess system architecture, state transition invariants, and performance targets to define clear, deterministic milestones.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
          <span className="text-zinc-600">FLOW:</span>
          <span>DISCUSS REQS → DEFINE SCOPE → MILESTONES</span>
        </div>
      </div>
    </div>
  );
};
