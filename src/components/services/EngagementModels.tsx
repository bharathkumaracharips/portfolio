"use client";

import React from "react";
import { Layers, ArrowRight, CheckCircle2 } from "lucide-react";
import { ServiceEngagementModel } from "@/data/services";

interface EngagementModelsProps {
  models: ServiceEngagementModel[];
  serviceTitle: string;
  onSelectModel: (type: "ARCHITECTURE" | "BUILD" | "OPTIMIZE") => void;
}

export const EngagementModels: React.FC<EngagementModelsProps> = ({
  models,
  serviceTitle,
  onSelectModel,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#00F0FF]" />
          <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-white">
            CHOOSE YOUR ENGAGEMENT
          </h4>
        </div>
        <span className="text-[10px] font-mono text-zinc-500">
          TAILORED SCOPE & EXECUTION
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {models.map((model) => {
          const isBuild = model.type === "BUILD";
          const isArchitecture = model.type === "ARCHITECTURE";

          const accentColor = isBuild
            ? "border-[#00FF66]/40 hover:border-[#00FF66]"
            : isArchitecture
            ? "border-[#00F0FF]/40 hover:border-[#00F0FF]"
            : "border-[#F59E0B]/40 hover:border-[#F59E0B]";

          const badgeColor = isBuild
            ? "bg-[#00FF66]/10 text-[#00FF66] border-[#00FF66]/30"
            : isArchitecture
            ? "bg-[#00F0FF]/10 text-[#00F0FF] border-[#00F0FF]/30"
            : "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/30";

          const buttonColor = isBuild
            ? "bg-[#00FF66]/15 hover:bg-[#00FF66]/25 text-[#00FF66] border-[#00FF66]/50"
            : isArchitecture
            ? "bg-[#00F0FF]/15 hover:bg-[#00F0FF]/25 text-[#00F0FF] border-[#00F0FF]/50"
            : "bg-[#F59E0B]/15 hover:bg-[#F59E0B]/25 text-[#F59E0B] border-[#F59E0B]/50";

          return (
            <div
              key={model.type}
              className={`flex flex-col justify-between p-6 rounded-2xl bg-[#08080c] border ${accentColor} transition-all duration-300 shadow-xl`}
            >
              <div className="flex flex-col gap-4">
                {/* Header Badge & Title */}
                <div className="flex items-center justify-between">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border ${badgeColor}`}
                  >
                    {model.title}
                  </span>
                  {isBuild && (
                    <span className="text-[10px] font-mono text-[#00FF66]">
                      RECOMMENDED
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <h5 className="text-base font-bold text-white tracking-tight">
                    {model.subtitle}
                  </h5>
                  <p className="text-xs text-zinc-400 font-light leading-relaxed pt-1">
                    <span className="font-semibold text-zinc-300">Target: </span>
                    {model.forWho}
                  </p>
                </div>

                {/* Scope Checklist */}
                <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                    SCOPE INCLUDES:
                  </span>
                  <ul className="flex flex-col gap-2 text-xs text-zinc-300">
                    {model.includes.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 font-light">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00FF66] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectModel(model.type)}
                className={`w-full mt-6 py-3 px-4 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2 border transition-all duration-200 ${buttonColor}`}
              >
                <span>{model.ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
