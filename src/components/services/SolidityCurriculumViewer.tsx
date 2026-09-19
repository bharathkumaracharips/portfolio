"use client";

import React, { useState, useEffect } from "react";
import {
  coursesCatalogData,
  CourseCatalogItem,
  CourseModuleData,
} from "@/data/curriculum";
import {
  BookOpen,
  CheckCircle2,
  Cpu,
  Layers,
  ShieldCheck,
  Sparkles,
  Terminal,
  Wrench,
} from "lucide-react";

interface SolidityCurriculumViewerProps {
  course?: CourseCatalogItem;
}

export const SolidityCurriculumViewer: React.FC<SolidityCurriculumViewerProps> = ({
  course = coursesCatalogData[0],
}) => {
  const [selectedModuleId, setSelectedModuleId] = useState<string>(
    course.modules[0]?.id || "mod-01"
  );

  // When course changes, update default selected module
  useEffect(() => {
    if (course.modules && course.modules.length > 0) {
      setSelectedModuleId(course.modules[0].id);
    }
  }, [course.id]);

  const selectedModule: CourseModuleData =
    course.modules.find((m) => m.id === selectedModuleId) ||
    course.modules[0] || {
      id: "fallback",
      number: "01",
      title: "Module 01",
      weeks: "Weeks 1-4",
      sections: [],
    };

  return (
    <div className="flex flex-col rounded-xl overflow-hidden bg-[#08080c] border border-white/10 shadow-2xl">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between border-b border-white/10 bg-[#0e0e14] px-5 sm:px-6 py-3.5">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
          <span className="text-xs font-mono font-bold text-[#00F0FF] tracking-wider uppercase">
            EXPLORE COURSE CURRICULUM
          </span>
        </div>
        <span className="text-[10px] font-mono text-zinc-400 bg-white/[0.04] px-2.5 py-1 rounded border border-white/10">
          {course.badge} // {course.duration}
        </span>
      </div>

      {/* Main Container Content */}
      <div className="p-5 sm:p-7 flex flex-col gap-5">
        {/* Subheader Instruction */}
        <div className="flex flex-col gap-1 border-b border-white/5 pb-3">
          <span className="text-xs text-zinc-300 font-medium">
            Select a module button below to explore the detailed weekly syllabus for {course.title}:
          </span>
          <span className="text-[11px] text-zinc-500 font-mono">
            Interactive breakdown of lecture topics, hands-on lab exercises, compiler toolchains & deliverables.
          </span>
        </div>

        {/* Interactive Module Selector Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {course.modules.map((mod) => {
            const isSelected = selectedModuleId === mod.id;
            return (
              <button
                key={mod.id}
                onClick={() => setSelectedModuleId(mod.id)}
                className={`group relative flex flex-col items-start p-3 rounded-xl text-left transition-all duration-200 border ${
                  isSelected
                    ? "bg-[#00F0FF]/15 border-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.25)] text-white"
                    : "bg-white/[0.02] border-white/10 text-zinc-400 hover:text-zinc-200 hover:border-white/20 hover:bg-white/[0.04]"
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span
                    className={`text-[10px] font-mono font-bold ${
                      isSelected ? "text-[#00F0FF]" : "text-zinc-500 group-hover:text-zinc-400"
                    }`}
                  >
                    MODULE {mod.number}
                  </span>
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isSelected ? "bg-[#00F0FF] animate-pulse" : "bg-zinc-700"
                    }`}
                  />
                </div>
                <span
                  className={`text-xs font-semibold leading-tight line-clamp-1 ${
                    isSelected ? "text-white" : "text-zinc-300"
                  }`}
                >
                  {mod.title.split(":")[0] || mod.title}
                </span>
                <span className="text-[10px] font-mono text-zinc-500 mt-1">
                  {mod.weeks}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Module Syllabus Display Panel */}
        <div className="flex flex-col gap-5 p-5 rounded-xl bg-white/[0.015] border border-white/10 max-h-[660px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
          {/* Module Banner Header */}
          <div className="flex flex-col gap-2 border-b border-white/10 pb-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#00F0FF] font-bold">
                MODULE {selectedModule.number} // {selectedModule.weeks}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-[#00FF66] border border-[#00FF66]/20">
                ACTIVE SYLLABUS
              </span>
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              {selectedModule.title}
            </h4>
            {selectedModule.headlineNote && (
              <p className="text-xs text-[#00F0FF]/80 font-mono italic">
                "{selectedModule.headlineNote}"
              </p>
            )}
          </div>

          {/* Learning Objectives Box */}
          {selectedModule.learningObjectives && selectedModule.learningObjectives.length > 0 && (
            <div className="flex flex-col gap-2 p-3.5 rounded-lg bg-[#00F0FF]/[0.03] border border-[#00F0FF]/15">
              <span className="text-[11px] font-mono text-[#00F0FF] uppercase tracking-wider flex items-center gap-1.5 font-semibold">
                <BookOpen className="w-3.5 h-3.5" />
                <span>MODULE LEARNING OBJECTIVES</span>
              </span>
              <div className="grid grid-cols-1 gap-1.5">
                {selectedModule.learningObjectives.map((obj, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00FF66] shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{obj}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Syllabus Sections & Core Topics */}
          <div className="flex flex-col gap-3">
            <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span>SYLLABUS SECTIONS & TOPICS BREAKDOWN</span>
            </span>

            <div className="flex flex-col gap-3">
              {selectedModule.sections.map((sec) => (
                <div
                  key={sec.number}
                  className="p-3.5 rounded-lg bg-white/[0.015] border border-white/5 flex flex-col gap-2.5"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded flex items-center justify-center bg-[#00F0FF]/10 text-[#00F0FF] text-[11px] font-mono font-bold">
                      {sec.number}
                    </span>
                    <span className="text-xs font-semibold text-zinc-100">
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

                  {/* Subgroups */}
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

          {/* Modern Solidity / Special Feature Note */}
          {selectedModule.modernSolidityNote && (
            <div className="p-3.5 rounded-lg bg-gradient-to-r from-cyan-950/30 to-transparent border border-[#00F0FF]/30 flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#00F0FF] font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{selectedModule.modernSolidityNote.title}</span>
                </span>
                {selectedModule.modernSolidityNote.highlightPill && (
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/30">
                    {selectedModule.modernSolidityNote.highlightPill}
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-300 font-light leading-relaxed">
                {selectedModule.modernSolidityNote.description}
              </p>
            </div>
          )}

          {/* Tools & Environment */}
          {selectedModule.tools && selectedModule.tools.length > 0 && (
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5 text-[#00F0FF]" />
                <span>DEVELOPMENT ENVIRONMENT & TOOLS</span>
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {selectedModule.tools.map((t, i) => (
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

          {/* Module Deliverables */}
          {selectedModule.deliverables && selectedModule.deliverables.length > 0 && (
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-[#00FF66]" />
                <span>PRACTICAL MODULE DELIVERABLES</span>
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {selectedModule.deliverables.map((deliv, i) => (
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
          {selectedModule.capstoneProjects && selectedModule.capstoneProjects.length > 0 && (
            <div className="flex flex-col gap-3 pt-3 border-t border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#00F0FF] uppercase tracking-wider flex items-center gap-1.5 font-bold">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>CAPSTONE PROJECT TRACKS</span>
                </span>
                <span className="text-[10px] font-mono text-zinc-500">
                  {selectedModule.capstoneProjects.length} TRACKS
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedModule.capstoneProjects.map((cap) => (
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
          {selectedModule.capstoneDeliverables && selectedModule.capstoneDeliverables.length > 0 && (
            <div className="flex flex-col gap-2 pt-3 border-t border-white/10">
              <span className="text-[11px] font-mono text-[#00FF66] uppercase tracking-wider flex items-center gap-1.5 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>FINAL CAPSTONE PORTFOLIO DELIVERABLES</span>
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {selectedModule.capstoneDeliverables.map((cd, i) => (
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
      </div>
    </div>
  );
};
