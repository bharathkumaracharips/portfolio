"use client";

import React, { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

interface ServicePipelineProps {
  pipeline: string[];
  serviceTitle: string;
}

export const ServicePipeline: React.FC<ServicePipelineProps> = ({
  pipeline,
  serviceTitle,
}) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <div className="flex flex-col gap-3 p-4 sm:p-5 rounded-2xl bg-[#08080c] border border-white/10 shadow-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono tracking-widest text-[#00F0FF] uppercase flex items-center gap-1.5 font-bold">
            <Sparkles className="w-3 h-3 text-[#00F0FF]" />
            <span>EXECUTION PIPELINE // END-TO-END FLOW</span>
          </span>
          <span className="text-zinc-600 font-mono text-xs">//</span>
          <span className="text-[10px] font-mono text-zinc-400">
            {pipeline.length} PHASES
          </span>
        </div>

        <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>DETERMINISTIC LIFECYCLE</span>
        </span>
      </div>

      {/* Horizontal Stepper */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/10 pt-1">
        {pipeline.map((node, index) => {
          const isSelected = index === activeStep;
          return (
            <React.Fragment key={node}>
              <button
                onClick={() => setActiveStep(index)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-all duration-200 border ${
                  isSelected
                    ? "bg-[#00F0FF]/15 text-[#00F0FF] border-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.25)] font-bold"
                    : "bg-white/[0.02] text-zinc-400 border-white/10 hover:border-white/20 hover:text-zinc-200"
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono ${
                    isSelected
                      ? "bg-[#00F0FF] text-black font-bold"
                      : "bg-white/5 text-zinc-400"
                  }`}
                >
                  {index + 1}
                </span>
                <span>{node}</span>
              </button>

              {index < pipeline.length - 1 && (
                <div className="flex items-center text-zinc-600 shrink-0">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
