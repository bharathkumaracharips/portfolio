"use client";

import React, { useState } from "react";
import {
  bkaSolidityCourseData,
  CourseModuleData,
} from "@/data/curriculum";
import {
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Cpu,
  FileCode2,
  GraduationCap,
  Layers,
  ShieldCheck,
  Sparkles,
  Terminal,
  Wrench,
} from "lucide-react";

interface SolidityCurriculumViewerProps {
  onSelectProject?: () => void;
}

export const SolidityCurriculumViewer: React.FC<SolidityCurriculumViewerProps> = () => {
  const [activeModuleFilter, setActiveModuleFilter] = useState<string>("ALL");
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    "mod-01": true,
    "mod-02": true,
    "mod-03": true,
    "mod-04": true,
  });

  const toggleModuleExpand = (modId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [modId]: !prev[modId],
    }));
  };

  const displayedModules =
    activeModuleFilter === "ALL"
      ? bkaSolidityCourseData.modules
      : bkaSolidityCourseData.modules.filter((m) => m.id === activeModuleFilter);

  return (
    <div className="flex flex-col gap-6">
      {/* Course Header Banner */}
      <div className="flex flex-col gap-2 p-4 rounded-xl bg-gradient-to-br from-[#00F0FF]/10 via-white/[0.02] to-transparent border border-[#00F0FF]/30 shadow-[0_0_25px_rgba(0,240,255,0.08)]">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-[10px] font-mono tracking-widest text-[#00F0FF] uppercase flex items-center gap-1.5 font-bold">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>COURSE BY BKA // 16-WEEK ENGINEERING PROGRAM</span>
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#00FF66]/10 text-[#00FF66] border border-[#00FF66]/30">
            SOLIDITY 0.8.37 READY
          </span>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
          {bkaSolidityCourseData.title}
        </h3>

        <p className="text-xs text-zinc-300 font-light leading-relaxed">
          {bkaSolidityCourseData.subtitle}
        </p>

        {/* Course Telemetry Tags */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-white/10 text-[10px] font-mono">
          <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 text-zinc-300">
            ⏱ {bkaSolidityCourseData.duration}
          </span>
          <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 text-zinc-300">
            ⚡ Foundry & Hardhat
          </span>
          <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 text-zinc-300">
            🛡 Slither & Echidna Auditing
          </span>
          <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 text-zinc-300">
            🚀 6 Capstone Options
          </span>
        </div>
      </div>

      {/* Module Selector Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-white/10">
        <button
          onClick={() => setActiveModuleFilter("ALL")}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all border ${
            activeModuleFilter === "ALL"
              ? "bg-[#00F0FF]/15 text-[#00F0FF] border-[#00F0FF]/50 font-bold"
              : "bg-white/[0.02] text-zinc-400 border-white/5 hover:text-white"
          }`}
        >
          ALL MODULES
        </button>
        {bkaSolidityCourseData.modules.map((mod) => {
          const isSelected = activeModuleFilter === mod.id;
          return (
            <button
              key={mod.id}
              onClick={() => setActiveModuleFilter(mod.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all border ${
                isSelected
                  ? "bg-[#00F0FF]/15 text-[#00F0FF] border-[#00F0FF]/50 font-bold"
                  : "bg-white/[0.02] text-zinc-400 border-white/5 hover:text-white"
              }`}
            >
              MOD {mod.number} // {mod.weeks}
            </button>
          );
        })}
      </div>

      {/* Modules List */}
      <div className="flex flex-col gap-5">
        {displayedModules.map((mod) => {
          const isExpanded = expandedSections[mod.id] ?? true;

          return (
            <div
              key={mod.id}
              className="flex flex-col rounded-xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all overflow-hidden"
            >
              {/* Module Header Card */}
              <button
                onClick={() => toggleModuleExpand(mod.id)}
                className="flex items-center justify-between p-4 text-left bg-white/[0.015] hover:bg-white/[0.03] transition-colors"
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[#00F0FF] font-bold">
                      MODULE {mod.number}
                    </span>
                    <span className="text-zinc-600 font-mono text-xs">//</span>
                    <span className="text-xs font-mono text-[#00FF66]">
                      {mod.weeks}
                    </span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
                    {mod.title}
                  </h4>
                  {mod.headlineNote && (
                    <p className="text-[11px] text-zinc-400 font-light italic">
                      "{mod.headlineNote}"
                    </p>
                  )}
                </div>

                <div className="p-1.5 rounded-md bg-white/[0.03] border border-white/10 text-zinc-400 hover:text-white shrink-0 ml-2">
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              </button>

              {/* Module Expanded Details */}
              {isExpanded && (
                <div className="p-4 sm:p-5 flex flex-col gap-5 border-t border-white/5 bg-black/20">
                  {/* Learning Objectives (if present) */}
                  {mod.learningObjectives && mod.learningObjectives.length > 0 && (
                    <div className="flex flex-col gap-2 p-3.5 rounded-lg bg-[#00F0FF]/[0.03] border border-[#00F0FF]/15">
                      <span className="text-[11px] font-mono text-[#00F0FF] uppercase tracking-wider flex items-center gap-1.5 font-semibold">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>LEARNING OBJECTIVES</span>
                      </span>
                      <div className="grid grid-cols-1 gap-1.5">
                        {mod.learningObjectives.map((obj, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-2 text-xs text-zinc-300"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#00FF66] shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{obj}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Numbered Curriculum Sections */}
                  <div className="flex flex-col gap-3">
                    <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#00F0FF]" />
                      <span>SYLLABUS SECTIONS & CORE TOPICS</span>
                    </span>

                    <div className="flex flex-col gap-2.5">
                      {mod.sections.map((sec) => (
                        <div
                          key={sec.number}
                          className="p-3.5 rounded-lg bg-white/[0.015] border border-white/5 flex flex-col gap-2"
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded flex items-center justify-center bg-[#00F0FF]/10 text-[#00F0FF] text-[11px] font-mono font-bold">
                              {sec.number}
                            </span>
                            <span className="text-xs font-semibold text-zinc-200">
                              {sec.title}
                            </span>
                          </div>

                          {sec.note && (
                            <p className="text-[11px] text-amber-300/80 font-mono italic pl-7">
                              Note: {sec.note}
                            </p>
                          )}

                          {/* Regular Items List */}
                          {sec.items && sec.items.length > 0 && (
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 pl-7 text-[11px] text-zinc-400 list-disc list-inside">
                              {sec.items.map((item, idx) => (
                                <li key={idx} className="leading-relaxed">
                                  <span className="text-zinc-300">{item}</span>
                                </li>
                              ))}
                            </ul>
                          )}

                          {/* Subgroups (e.g., Hardhat vs Foundry vs Testing Concepts) */}
                          {sec.subgroups && (
                            <div className="flex flex-col gap-2 pl-7 pt-1">
                              {sec.subgroups.map((sub, sIdx) => (
                                <div
                                  key={sIdx}
                                  className="p-2.5 rounded bg-white/[0.02] border border-white/5 flex flex-col gap-1"
                                >
                                  <span className="text-[11px] font-mono text-[#00F0FF] font-semibold">
                                    {sub.subtitle}
                                  </span>
                                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-zinc-400 list-disc list-inside">
                                    {sub.items.map((item, idx) => (
                                      <li key={idx} className="leading-relaxed">
                                        <span className="text-zinc-300">{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Modern Solidity Addition Callout */}
                  {mod.modernSolidityNote && (
                    <div className="p-3.5 rounded-lg bg-gradient-to-r from-cyan-950/30 to-transparent border border-[#00F0FF]/30 flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono text-[#00F0FF] font-semibold flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>{mod.modernSolidityNote.title}</span>
                        </span>
                        {mod.modernSolidityNote.highlightPill && (
                          <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/30">
                            {mod.modernSolidityNote.highlightPill}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-zinc-300 font-light leading-relaxed">
                        {mod.modernSolidityNote.description}
                      </p>
                    </div>
                  )}

                  {/* Tools Stack */}
                  {mod.tools && mod.tools.length > 0 && (
                    <div className="flex flex-col gap-2">
                      <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Wrench className="w-3.5 h-3.5 text-[#00F0FF]" />
                        <span>ENVIRONMENT & TOOLS</span>
                      </span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {mod.tools.map((t, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/10 text-[11px] font-mono text-zinc-300"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Deliverables */}
                  {mod.deliverables && mod.deliverables.length > 0 && (
                    <div className="flex flex-col gap-2">
                      <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5 text-[#00FF66]" />
                        <span>MODULE DELIVERABLES</span>
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {mod.deliverables.map((deliv, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 p-2 rounded bg-white/[0.02] border border-white/5 text-xs text-zinc-300"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] shrink-0" />
                            <span className="truncate">{deliv}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Capstone Projects (Module 4) */}
                  {mod.capstoneProjects && mod.capstoneProjects.length > 0 && (
                    <div className="flex flex-col gap-3 pt-2 border-t border-white/10">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono text-[#00F0FF] uppercase tracking-wider flex items-center gap-1.5 font-bold">
                          <Cpu className="w-3.5 h-3.5" />
                          <span>CAPSTONE PROJECT // CHOOSE ONE TRACK</span>
                        </span>
                        <span className="text-[10px] font-mono text-zinc-500">
                          6 TRACKS
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {mod.capstoneProjects.map((cap) => (
                          <div
                            key={cap.code}
                            className="p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-[#00F0FF]/30 transition-all flex flex-col gap-1.5"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-mono text-[#00F0FF] font-bold">
                                {cap.code}
                              </span>
                              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/[0.03] text-zinc-400 border border-white/10">
                                {cap.tag}
                              </span>
                            </div>
                            <span className="text-xs font-semibold text-zinc-100">
                              {cap.title}
                            </span>
                            <p className="text-[11px] text-zinc-400 font-light leading-relaxed">
                              {cap.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Capstone Final Deliverables (Module 4) */}
                  {mod.capstoneDeliverables && mod.capstoneDeliverables.length > 0 && (
                    <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
                      <span className="text-[11px] font-mono text-[#00FF66] uppercase tracking-wider flex items-center gap-1.5 font-semibold">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>FINAL CAPSTONE PORTFOLIO DELIVERABLES</span>
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {mod.capstoneDeliverables.map((cd, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 p-2 rounded bg-white/[0.02] border border-white/5 text-xs text-zinc-300"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#00FF66] shrink-0" />
                            <span className="truncate">{cd}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
