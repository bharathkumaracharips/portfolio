"use client";

import React from "react";
import { teachingExperiencesData } from "@/data/teaching";
import { Award, CheckCircle2, BookOpen, Terminal, Sparkles } from "lucide-react";

export function TeachingExperience() {
  return (
    <section className="relative w-full py-20 px-6 sm:px-10 border-b border-[#1e293b]/70 bg-[#050811]">
      <div className="max-w-[1440px] w-full mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 pb-4 border-b border-[#1e293b]">
          <div>
            <span className="text-xs font-mono tracking-widest text-[#00F0FF] uppercase font-bold block mb-1">
              01 // TRACK RECORD
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Teaching Experience
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-[#94A3B8] max-w-md">
            Verified instructional roles leading structured curriculum design and live technical labs.
          </p>
        </div>

        {/* Editorial Chapter Blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {teachingExperiencesData.map((exp) => (
            <div
              key={exp.id}
              className="p-6 sm:p-8 rounded-2xl bg-[#080d1a]/90 border border-[#1e293b] backdrop-blur-xl hover:border-[#38BDF8]/60 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Chapter & Period Header */}
                <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[#1e293b]">
                  <span className="text-[11px] font-mono text-[#00F0FF] font-bold tracking-wider">
                    {exp.chapter}
                  </span>
                  <span className="text-xs font-mono text-[#94A3B8] px-2.5 py-0.5 rounded bg-[#0f172a] border border-[#1e293b]">
                    {exp.period}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                  {exp.organization}
                </h3>
                <p className="text-sm font-mono text-[#38BDF8] mb-3">
                  {exp.role}
                </p>

                <p className="text-xs font-mono text-[#64748B] mb-4">
                  📍 {exp.location}
                </p>

                <p className="text-sm text-[#cbd5e1] leading-relaxed mb-6">
                  {exp.description}
                </p>
              </div>

              <div>
                {/* Topics Tag List */}
                <div className="mb-4">
                  <span className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider block mb-2">
                    Core Curriculum Domains:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.topics.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded bg-[#0f172a] border border-[#1e293b] text-[11px] font-mono text-[#38BDF8]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Evidence Badge */}
                <div className="pt-3 border-t border-[#1e293b] flex items-center justify-between text-[10px] font-mono text-[#34D399]">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                    <span className="font-semibold">{exp.evidenceBadge}</span>
                  </div>
                  <span className="text-[#64748B]">VERIFIED</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
