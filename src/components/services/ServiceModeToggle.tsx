"use client";

import React from "react";
import { Briefcase, GraduationCap } from "lucide-react";

interface ServiceModeToggleProps {
  activeMode: "SERVICES" | "CURRICULUM";
  onModeChange: (mode: "SERVICES" | "CURRICULUM") => void;
}

export const ServiceModeToggle: React.FC<ServiceModeToggleProps> = ({
  activeMode,
  onModeChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-2 bg-[#08080c] rounded-2xl border border-white/10 shadow-2xl">
      <div className="flex items-center gap-1.5 p-1 bg-white/[0.03] rounded-xl border border-white/5 w-full sm:w-auto">
        <button
          onClick={() => onModeChange("SERVICES")}
          className={`flex-1 sm:flex-initial flex items-center justify-center gap-2.5 px-5 py-2.5 rounded-lg text-xs font-mono transition-all duration-200 border ${
            activeMode === "SERVICES"
              ? "bg-[#00F0FF]/15 text-[#00F0FF] border-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.25)] font-bold"
              : "bg-transparent text-zinc-400 border-transparent hover:text-zinc-200 hover:bg-white/[0.02]"
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>ENGINEERING SERVICES</span>
          <span
            className={`px-1.5 py-0.2 rounded text-[10px] ${
              activeMode === "SERVICES"
                ? "bg-[#00F0FF]/25 text-[#00F0FF]"
                : "bg-white/5 text-zinc-500"
            }`}
          >
            6
          </span>
        </button>

        <button
          onClick={() => onModeChange("CURRICULUM")}
          className={`flex-1 sm:flex-initial flex items-center justify-center gap-2.5 px-5 py-2.5 rounded-lg text-xs font-mono transition-all duration-200 border ${
            activeMode === "CURRICULUM"
              ? "bg-[#00FF66]/15 text-[#00FF66] border-[#00FF66] shadow-[0_0_15px_rgba(0,255,102,0.25)] font-bold"
              : "bg-transparent text-zinc-400 border-transparent hover:text-zinc-200 hover:bg-white/[0.02]"
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>SYSTEMS CURRICULA & MENTORSHIP</span>
          <span
            className={`px-1.5 py-0.2 rounded text-[10px] ${
              activeMode === "CURRICULUM"
                ? "bg-[#00FF66]/25 text-[#00FF66]"
                : "bg-white/5 text-zinc-500"
            }`}
          >
            7
          </span>
        </button>
      </div>

      <div className="hidden lg:flex items-center gap-2 pr-3 text-xs font-mono text-zinc-400">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
        <span>
          {activeMode === "SERVICES"
            ? "CLIENT MARKETPLACE // ARCHITECTURE TO PRODUCTION"
            : "TECHNICAL ACADEMY // 7 SPECIALIZED CURRICULA"}
        </span>
      </div>
    </div>
  );
};
