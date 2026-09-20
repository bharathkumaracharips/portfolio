"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExperienceChapterItem } from "@/data/experience";
import { ExperienceArtifact } from "./ExperienceArtifact";
import { CheckCircle2, ShieldCheck, MapPin } from "lucide-react";

interface ExperienceChapterProps {
  chapter: ExperienceChapterItem;
  index: number;
}

export const ExperienceChapter: React.FC<ExperienceChapterProps> = ({
  chapter,
  index,
}) => {
  const chapterRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(chapterRef, { once: false, margin: "-10% 0px -10% 0px" });

  return (
    <article
      ref={chapterRef}
      id={`experience-${chapter.id}`}
      data-chapter-index={index}
      data-chapter-year={chapter.year}
      className="relative rounded-2xl bg-[#08080c] border border-white/[0.08] hover:border-white/[0.14] transition-colors duration-300 p-6 sm:p-8 lg:p-10 flex flex-col gap-8 scroll-mt-24"
      aria-label={`${chapter.role} at ${chapter.organization}`}
    >
      {/* Top Header: Year, Stage, Active Status */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-4 text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="text-white font-semibold text-sm tracking-wider">
            {chapter.year}
          </span>
          <span className="text-zinc-600">//</span>
          <span
            className="font-medium tracking-wider uppercase text-[11px]"
            style={{ color: chapter.accentColor }}
          >
            CHAPTER {chapter.stage}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {chapter.isCurrent && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] tracking-widest font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              CURRENT ROLE
            </span>
          )}
          <span className="text-zinc-500 text-[11px]">{chapter.period}</span>
        </div>
      </div>

      {/* Main Grid: Editorial Role & Context on Left + Technical Living Architecture on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left Editorial Narrative (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Organization & Role */}
          <div className="flex flex-col gap-1.5">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white tracking-tight leading-tight font-sans">
              {chapter.organization}
            </h3>
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-zinc-300 font-medium">
              <span style={{ color: chapter.accentColor }}>{chapter.role}</span>
              <span className="text-zinc-600">&bull;</span>
              <span className="text-zinc-400 font-mono text-xs">{chapter.roleSpecialization}</span>
            </div>
            <div className="flex items-center gap-1.5 text-zinc-500 text-[11px] font-mono mt-0.5">
              <MapPin className="w-3 h-3 text-zinc-600" />
              <span>{chapter.location}</span>
            </div>
          </div>

          {/* Context Narrative */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
              ENGINEERING CONTEXT
            </span>
            <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
              {chapter.context}
            </p>
          </div>

          {/* Selected Contributions */}
          <div className="flex flex-col gap-2.5 pt-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
              SELECTED CONTRIBUTIONS
            </span>
            <div className="space-y-2">
              {chapter.selectedContributions.map((contrib, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-zinc-300 font-light">
                  <span
                    className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                    style={{ backgroundColor: chapter.accentColor }}
                  />
                  <span className="leading-relaxed">{contrib}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Explicit Capabilities Forged */}
          <div className="flex flex-col gap-2.5 pt-2 border-t border-white/[0.06]">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
              CAPABILITIES FORGED
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              {chapter.capabilities.map((cap) => (
                <span
                  key={cap}
                  className="px-2.5 py-1 rounded bg-white/[0.03] border border-white/[0.06] text-[10px] font-mono text-zinc-300 font-medium"
                >
                  {cap}
                </span>
              ))}
            </div>
          </div>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {chapter.technologies.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded text-[10px] font-mono text-zinc-500 border border-white/[0.04] bg-white/[0.01]"
              >
                #{t}
              </span>
            ))}
          </div>
        </div>

        {/* Right Architectural Living Artifact (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-center h-full">
          <ExperienceArtifact artifactId={chapter.artifactId} />
        </div>
      </div>
    </article>
  );
};
