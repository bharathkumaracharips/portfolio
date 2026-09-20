"use client";

import React, { useState, useEffect } from "react";
import {
  coursesCatalogData,
  CourseCatalogItem,
  courseCategoryList,
  CourseTrackCategory,
} from "@/data/curriculum";
import {
  GraduationCap,
  ArrowRight,
  ArrowLeft,
  X,
  Send,
} from "lucide-react";
import { heroData } from "@/data/hero";
import { CourseInspectionPage } from "./CourseInspectionPage";

interface CurriculumDirectoryProps {
  isOpen?: boolean;
  onClose?: () => void;
  onBackToServices?: () => void;
  selectedCourseId?: string | null;
  onSelectCourse?: (courseId: string | null) => void;
}

export const CurriculumDirectory: React.FC<CurriculumDirectoryProps> = ({
  isOpen = true,
  onClose,
  onBackToServices,
  selectedCourseId: externalCourseId,
  onSelectCourse,
}) => {
  const [internalCourseId, setInternalCourseId] = useState<string | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<CourseTrackCategory | "ALL">("ALL");

  const activeCourseId = externalCourseId !== undefined ? externalCourseId : internalCourseId;
  const setActiveCourseId = (id: string | null) => {
    if (onSelectCourse) {
      onSelectCourse(id);
    }
    setInternalCourseId(id);
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else if (onBackToServices) {
      onBackToServices();
    }
  };

  // Lock body scroll and listen for Escape key when modal is open
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (activeCourseId !== null) {
          // If in deep course view, go back to catalog view first
          setActiveCourseId(null);
        } else {
          // If on catalog view, close the modal completely
          handleClose();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, activeCourseId]);

  if (!isOpen) return null;

  // ---------------------------------------------------------------------------
  // If a course is selected, render the dedicated CourseInspectionPage
  // ---------------------------------------------------------------------------
  if (activeCourseId !== null) {
    return (
      <div
        role="dialog"
        aria-modal="true"
        className="fixed inset-0 z-50 flex flex-col bg-[#060609] overflow-y-auto animate-in fade-in duration-200"
      >
        <CourseInspectionPage
          courseId={activeCourseId}
          onBackToCatalog={() => setActiveCourseId(null)}
          onSelectCourse={(id) => setActiveCourseId(id)}
          onClose={handleClose}
        />
      </div>
    );
  }

  // Filter courses by category for catalog view
  const filteredCourses =
    activeCategoryFilter === "ALL"
      ? coursesCatalogData
      : coursesCatalogData.filter((c) => c.trackGroup === activeCategoryFilter);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex flex-col bg-[#050508]/95 backdrop-blur-2xl overflow-y-auto animate-in fade-in duration-200"
    >
      {/* ================================================================ */}
      {/* 1. STICKY TOP NAVIGATION BAR (CATALOG MODE)                      */}
      {/* ================================================================ */}
      <div className="sticky top-0 z-20 w-full bg-[#08080c]/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3 shadow-2xl">
        {/* Left: Back to Services & Academy Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/30 text-xs font-mono text-zinc-300 hover:text-white transition-all"
            title="Return to Engineering Services (Esc)"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#00FF66]" />
            <span className="hidden sm:inline">← Services</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-[#00FF66]/15 border border-[#00FF66]/40 text-xs font-mono font-bold text-[#00FF66]">
              ACADEMY
            </span>
            <span className="text-xs font-mono font-bold text-white tracking-wide truncate max-w-[200px] sm:max-w-none">
              Systems Curricula & Mentorship
            </span>
          </div>
        </div>

        {/* Center: Track Category Filter Pills */}
        <div className="hidden md:flex items-center gap-1.5 p-1 bg-white/[0.02] border border-white/5 rounded-xl">
          <button
            onClick={() => setActiveCategoryFilter("ALL")}
            className={`px-3 py-1 rounded-lg text-xs font-mono transition-all border ${
              activeCategoryFilter === "ALL"
                ? "bg-[#00FF66]/20 text-[#00FF66] border-[#00FF66]/50 font-bold"
                : "bg-transparent text-zinc-400 border-transparent hover:text-zinc-200"
            }`}
          >
            ALL (7)
          </button>
          {courseCategoryList.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategoryFilter(cat.id)}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-all border ${
                activeCategoryFilter === cat.id
                  ? "bg-[#00F0FF]/20 text-[#00F0FF] border-[#00F0FF]/50 font-bold"
                  : "bg-transparent text-zinc-400 border-transparent hover:text-zinc-200"
              }`}
            >
              {cat.shortLabel} ({cat.count})
            </button>
          ))}
        </div>

        {/* Right: Actions + Close */}
        <div className="flex items-center gap-2.5 ml-auto sm:ml-0">
          <a
            href={`mailto:${heroData.socials.email}?subject=${encodeURIComponent(
              "[Mentorship Inquiry] 1-on-1 Engineering Programs"
            )}`}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#00FF66]/10 hover:bg-[#00FF66]/20 border border-[#00FF66]/40 text-xs font-mono text-[#00FF66] transition-all"
          >
            <Send className="w-3 h-3" />
            <span>Direct Inquiry</span>
          </a>

          <button
            onClick={handleClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-red-500/20 border border-white/15 hover:border-red-500/40 text-xs font-mono text-zinc-300 hover:text-red-300 transition-all"
            title="Close (Esc)"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Close</span>
          </button>
        </div>
      </div>

      {/* ================================================================ */}
      {/* 2. BODY CONTENT: 7-COURSE CATALOG DIRECTORY                      */}
      {/* ================================================================ */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-10 flex flex-col gap-8">
        <div className="flex flex-col gap-8">
          {/* Header Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#08080c] via-[#0d0d14] to-[#08080c] border border-white/10 shadow-2xl">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono tracking-widest text-[#00FF66] uppercase flex items-center gap-1.5 font-bold">
                  <GraduationCap className="w-4 h-4" />
                  <span>SYSTEMS CURRICULA & MENTORSHIP</span>
                </span>
                <span className="text-zinc-600 font-mono text-xs">//</span>
                <span className="text-[10px] font-mono text-[#00F0FF]">
                  7 SPECIALIZED PROGRAMS
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                High-Assurance Engineering Academics
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 font-light max-w-3xl leading-relaxed">
                Deterministic, zero-fluff 1-on-1 technical curricula spanning low-level runtime architecture, smart contracts, protocol engineering, and distributed systems.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={handleClose}
                className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/30 text-xs font-mono text-zinc-300 transition-all"
              >
                ← Back to Services
              </button>
            </div>
          </div>

          {/* Mobile / Small Screen Filter Pills */}
          <div className="flex md:hidden items-center gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-white/10">
            <button
              onClick={() => setActiveCategoryFilter("ALL")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all border ${
                activeCategoryFilter === "ALL"
                  ? "bg-[#00FF66]/20 text-[#00FF66] border-[#00FF66]/50 font-bold"
                  : "bg-white/[0.02] text-zinc-400 border-white/10"
              }`}
            >
              ALL (7)
            </button>
            {courseCategoryList.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategoryFilter(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all border ${
                  activeCategoryFilter === cat.id
                    ? "bg-[#00F0FF]/20 text-[#00F0FF] border-[#00F0FF]/50 font-bold"
                    : "bg-white/[0.02] text-zinc-400 border-white/10"
                }`}
              >
                {cat.shortLabel} ({cat.count})
              </button>
            ))}
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => {
              const isBlockchain = course.trackGroup === "BLOCKCHAIN";
              const isProgramming = course.trackGroup === "PROGRAMMING";
              const accentColor = isBlockchain
                ? "#00F0FF"
                : isProgramming
                ? "#00FF66"
                : "#F59E0B";

              return (
                <div
                  key={course.id}
                  onClick={() => setActiveCourseId(course.id)}
                  className="group relative flex flex-col justify-between p-6 rounded-2xl bg-[#08080c]/90 border border-white/10 hover:border-[#00F0FF]/60 hover:bg-white/[0.03] transition-all duration-300 shadow-xl cursor-pointer"
                >
                  <div className="flex flex-col gap-3.5">
                    {/* Course Card Top Badges */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold border"
                          style={{
                            backgroundColor: `${accentColor}15`,
                            borderColor: `${accentColor}40`,
                            color: accentColor,
                          }}
                        >
                          {course.number}
                        </span>
                        <span className="text-[11px] font-mono text-zinc-400">
                          {course.category}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/[0.04] text-[#00FF66] border border-[#00FF66]/20">
                        {course.duration}
                      </span>
                    </div>

                    {/* Title & Tagline */}
                    <div className="flex flex-col gap-1.5">
                      <h4 className="text-lg font-bold text-white tracking-tight group-hover:text-[#00F0FF] transition-colors">
                        {course.title}
                      </h4>
                      <p className="text-xs text-zinc-400 font-light line-clamp-2 leading-relaxed">
                        {course.tagline}
                      </p>
                    </div>

                    {/* Key Highlight Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {course.highlights.slice(0, 3).map((hl, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded bg-white/[0.02] border border-white/5 text-[10px] font-mono text-zinc-300"
                        >
                          ⚡ {hl}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/5 text-xs font-mono">
                    <span className="text-zinc-500 text-[11px]">
                      {course.modules.length} Intensive Modules
                    </span>
                    <span className="text-[#00F0FF] flex items-center gap-1 font-semibold group-hover:translate-x-1 transition-transform">
                      <span>INSPECT PROGRAM</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
