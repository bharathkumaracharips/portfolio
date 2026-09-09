"use client";

import React, { useState } from "react";
import { teachingMethodStages, TeachingMethodStage } from "@/data/teaching";
import { GitBranch, Terminal, Layers, Network, ArrowRight } from "lucide-react";

export function TeachingMethod() {
  const [activeStageIdx, setActiveStageIdx] = useState<number>(0);
  const activeStage = teachingMethodStages[activeStageIdx];

  return (
    <section id="method" className="relative w-full py-20 px-6 sm:px-10 border-b border-[#1e293b]/70 bg-[#050811]">
      <div className="max-w-[1440px] w-full mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 pb-4 border-b border-[#1e293b]">
          <div>
            <span className="text-xs font-mono tracking-widest text-[#00F0FF] uppercase font-bold block mb-1">
              03 // PEDAGOGY
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              How I Teach
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-[#94A3B8] max-w-md">
            A 4-stage engineering methodology decomposing complex protocols into verifiable first principles.
          </p>
        </div>

        {/* 4-Stage Stepper Progression */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {teachingMethodStages.map((stage, idx) => {
            const isActive = activeStageIdx === idx;
            return (
              <button
                key={stage.number}
                onClick={() => setActiveStageIdx(idx)}
                className={`p-4 rounded-xl text-left transition-all border font-mono flex flex-col justify-between cursor-pointer ${
                  isActive
                    ? "border-[#00F0FF] bg-[#00F0FF]/15 text-white shadow-[0_0_15px_rgba(0,240,255,0.25)]"
                    : "border-[#1e293b] text-[#94A3B8] hover:border-[#38BDF8]/50 hover:text-white bg-[#080d1a]/80"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`text-xs font-bold ${isActive ? "text-[#00F0FF]" : "text-[#64748B]"}`}>
                    STAGE {stage.number}
                  </span>
                  <span className="text-[10px] text-[#64748B] hidden sm:inline">●</span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                  {stage.title}
                </h3>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Breakdown & Code Inspection */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#080d1a] border border-[#1e293b] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Narrative Description */}
          <div className="lg:col-span-6">
            <div className="flex items-center gap-2 mb-2 text-xs font-mono text-[#00F0FF]">
              <span>STAGE {activeStage.number}</span>
              <span>//</span>
              <span className="text-[#38BDF8]">{activeStage.stackLayer}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              {activeStage.title}: {activeStage.tagline}
            </h3>
            <p className="text-sm text-[#cbd5e1] leading-relaxed mb-6">
              {activeStage.description}
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-[#94A3B8]">
              <span>PROGRESSION:</span>
              <span className="text-white font-semibold">{activeStageIdx + 1} of 4</span>
              {activeStageIdx < 3 && (
                <button
                  onClick={() => setActiveStageIdx((prev) => Math.min(3, prev + 1))}
                  className="ml-auto flex items-center gap-1 text-[#00F0FF] hover:underline cursor-pointer"
                >
                  <span>Next Stage</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Right: Code & Inspection Sandbox */}
          <div className="lg:col-span-6 rounded-xl bg-[#04070e] border border-[#1e293b] p-4 sm:p-5 font-mono text-xs overflow-x-auto">
            <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-[#1e293b] text-[#64748B] text-[10px]">
              <span className="text-[#38BDF8]">PEDAGOGICAL CODE SNAPSHOT</span>
              <span>STAGE_{activeStage.number}.rs</span>
            </div>
            <pre className="text-[#38BDF8] leading-relaxed overflow-x-auto">
              <code>{activeStage.codeSnippet}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
