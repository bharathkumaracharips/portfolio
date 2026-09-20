"use client";

import React, { useState, useEffect } from "react";
import {
  coursesCatalogData,
  CourseCatalogItem,
} from "@/data/curriculum";
import {
  getCourseInspectionDetail,
  CourseInspectionDetail,
} from "@/data/curriculumDetails";
import { CourseArchitectureDiagram } from "./CourseArchitectureDiagram";
import {
  ArrowLeft,
  ArrowRight,
  Send,
  X,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  Sparkles,
  ShieldCheck,
  Terminal,
  Cpu,
  Layers,
  BookOpen,
  Calendar,
  Clock,
  Target,
  Wrench,
  Users,
  Compass,
} from "lucide-react";
import { heroData } from "@/data/hero";

interface CourseInspectionPageProps {
  courseId: string;
  onBackToCatalog: () => void;
  onSelectCourse: (courseId: string) => void;
  onClose: () => void;
}

export const CourseInspectionPage: React.FC<CourseInspectionPageProps> = ({
  courseId,
  onBackToCatalog,
  onSelectCourse,
  onClose,
}) => {
  const currentCourse: CourseCatalogItem =
    coursesCatalogData.find((c) => c.id === courseId) || coursesCatalogData[0];

  const detail: CourseInspectionDetail = getCourseInspectionDetail(currentCourse.id);

  // Accordion state: by default, Module 01 is expanded
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>(
    currentCourse.modules[0]?.id || null
  );

  // When course changes, reset expanded module to the first module
  useEffect(() => {
    if (currentCourse.modules && currentCourse.modules.length > 0) {
      setExpandedModuleId(currentCourse.modules[0].id);
    }
  }, [currentCourse.id]);

  const toggleModule = (modId: string) => {
    setExpandedModuleId((prev) => (prev === modId ? null : modId));
  };

  const handleDiscussProgram = () => {
    const subject = encodeURIComponent(`[Program Inquiry] ${currentCourse.title} (${currentCourse.number})`);
    const body = encodeURIComponent(
      `Hello Bharath,\n\nI am interested in discussing enrollment, syllabus details, and 1-on-1 mentorship for:\n\nProgram: ${currentCourse.title} (${currentCourse.number})\nTrack: ${currentCourse.trackGroupName}\nDuration: ${currentCourse.duration}\n\nPlease share availability and onboarding prerequisites.\n\nThank you!`
    );
    window.open(`mailto:${heroData.socials.email}?subject=${subject}&body=${body}`);
  };

  // Color tokens based on course track
  const isBlockchain = currentCourse.trackGroup === "BLOCKCHAIN";
  const isProgramming = currentCourse.trackGroup === "PROGRAMMING";
  const accentColor = isBlockchain ? "#00F0FF" : isProgramming ? "#00FF66" : "#F59E0B";

  return (
    <div className="w-full min-h-screen bg-[#060609] text-zinc-100 flex flex-col antialiased selection:bg-white/10 selection:text-white">
      {/* ==================================================================== */}
      {/* 1. PERSISTENT TOP NAVIGATION BAR                                     */}
      {/* ==================================================================== */}
      <header className="sticky top-0 z-40 w-full bg-[#08080c]/95 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-3 flex items-center justify-between gap-4 shadow-xl">
        {/* Left: Back to Catalog & Course Identifier */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToCatalog}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-white/30 text-xs font-mono text-zinc-300 hover:text-white transition-all"
            title="Return to All 7 Curricula (Esc)"
          >
            <ArrowLeft className="w-3.5 h-3.5" style={{ color: accentColor }} />
            <span className="hidden sm:inline">← All Curricula</span>
          </button>

          <div className="flex items-center gap-2">
            <span
              className="px-2 py-0.5 rounded text-[11px] font-mono font-bold border"
              style={{
                backgroundColor: `${accentColor}15`,
                borderColor: `${accentColor}40`,
                color: accentColor,
              }}
            >
              {currentCourse.number} / 07
            </span>
            <span className="text-xs font-mono font-semibold text-zinc-200 hidden md:inline truncate max-w-[240px]">
              {currentCourse.shortTitle}
            </span>
          </div>
        </div>

        {/* Center: Desktop Quick Switcher (Linear style pills) */}
        <nav className="hidden xl:flex items-center gap-1 p-1 bg-white/[0.02] border border-white/5 rounded-xl">
          {coursesCatalogData.map((c) => {
            const isCurrent = c.id === currentCourse.id;
            return (
              <button
                key={c.id}
                onClick={() => onSelectCourse(c.id)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono whitespace-nowrap transition-all border ${
                  isCurrent
                    ? "bg-white/[0.08] text-white border-white/20 font-bold"
                    : "bg-transparent text-zinc-400 border-transparent hover:text-zinc-200 hover:bg-white/[0.02]"
                }`}
                style={{
                  color: isCurrent ? accentColor : undefined,
                  borderColor: isCurrent ? `${accentColor}50` : undefined,
                }}
              >
                <span>{c.number}</span>
                <span className="text-zinc-600 ml-1">//</span>
                <span className="ml-1">{c.id.toUpperCase()}</span>
              </button>
            );
          })}
        </nav>

        {/* Mobile Dropdown Switcher (<select>) */}
        <div className="xl:hidden flex items-center">
          <label htmlFor="mobile-course-switcher" className="sr-only">
            Switch Course
          </label>
          <div className="relative">
            <select
              id="mobile-course-switcher"
              value={currentCourse.id}
              onChange={(e) => onSelectCourse(e.target.value)}
              className="appearance-none bg-white/[0.04] border border-white/10 rounded-lg px-3 py-1.5 pr-8 text-xs font-mono text-zinc-200 focus:outline-none focus:border-white/30"
            >
              {coursesCatalogData.map((c) => (
                <option key={c.id} value={c.id} className="bg-[#0c0c14] text-white">
                  {c.number} // {c.shortTitle}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Right: Primary Action + Close Button */}
        <div className="flex items-center gap-2.5 ml-auto sm:ml-0">
          <button
            onClick={handleDiscussProgram}
            className="flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-lg text-xs font-mono font-bold transition-all shadow-lg"
            style={{
              backgroundColor: `${accentColor}20`,
              borderColor: `${accentColor}50`,
              color: accentColor,
              borderWidth: 1,
            }}
          >
            <Send className="w-3 h-3" />
            <span className="hidden sm:inline">Discuss the Program →</span>
            <span className="sm:hidden">Discuss</span>
          </button>

          <button
            onClick={onClose}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/[0.04] hover:bg-red-500/20 border border-white/10 hover:border-red-500/30 text-xs font-mono text-zinc-400 hover:text-red-300 transition-all"
            title="Close (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* SINGLE PRIMARY SCROLLABLE BODY                                      */}
      {/* ==================================================================== */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12 flex flex-col gap-16 sm:gap-24">
        {/* ================================================================== */}
        {/* 2. HERO SECTION (~600px): IDENTITY + ARCHITECTURE DIAGRAM          */}
        {/* ================================================================== */}
        <section className="flex flex-col gap-8 pt-2">
          {/* Top Label & Track */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono">
            <span
              className="font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-md border"
              style={{
                backgroundColor: `${accentColor}10`,
                borderColor: `${accentColor}30`,
                color: accentColor,
              }}
            >
              {currentCourse.trackGroupName.toUpperCase()}
            </span>
            <span className="text-zinc-600">//</span>
            <span className="text-zinc-400 font-medium">PROGRAM {currentCourse.number} OF 07</span>
            <span className="text-zinc-600">//</span>
            <span className="text-zinc-500">1-ON-1 TECHNICAL MENTORSHIP</span>
          </div>

          {/* Hero Grid: Left Content / Right Interactive Diagram */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 5 Cols: Title, Value Prop, CTA & At a Glance */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                {currentCourse.title}
              </h1>

              <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
                {currentCourse.description}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={handleDiscussProgram}
                  className="px-6 py-3 rounded-xl font-mono text-xs font-bold text-black transition-all shadow-xl hover:opacity-95 flex items-center gap-2"
                  style={{
                    backgroundColor: accentColor,
                  }}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Discuss the Program →</span>
                </button>

                <a
                  href="#curriculum"
                  className="px-4 py-3 rounded-xl font-mono text-xs text-zinc-300 bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-white/20 transition-all flex items-center gap-1.5"
                >
                  <span>Explore Syllabus</span>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
                </a>
              </div>

              {/* Course At A Glance Metric Grid */}
              <div className="grid grid-cols-3 gap-2.5 pt-4 border-t border-white/10">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-1">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">DURATION</span>
                  <span className="text-xs font-semibold text-white">{currentCourse.duration}</span>
                  <span className="text-[10px] font-mono text-zinc-400">16 Weeks</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-1">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">STRUCTURE</span>
                  <span className="text-xs font-semibold text-white">4 Modules</span>
                  <span className="text-[10px] font-mono text-zinc-400">4 Projects</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-1">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">LEVEL</span>
                  <span className="text-xs font-semibold text-white">{currentCourse.level.split(" ")[0]}</span>
                  <span className="text-[10px] font-mono text-zinc-400">Production</span>
                </div>
              </div>

              {/* Delivery Format Strip */}
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white/[0.015] border border-white/5 text-[11px] font-mono text-zinc-400">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
                <span>FORMAT: 1-on-1 Sessions • Code Reviews • Architecture Critiques • Lab Projects</span>
              </div>
            </div>

            {/* Right 7 Cols: Interactive Architecture Diagram */}
            <div className="lg:col-span-7">
              <CourseArchitectureDiagram
                diagram={detail.architectureDiagram}
                accentColor={accentColor}
              />
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* 3. WHAT YOU'LL BECOME CAPABLE OF (CAPABILITIES SECTION)             */}
        {/* ================================================================== */}
        <section className="flex flex-col gap-6 pt-6 border-t border-white/10">
          <div className="flex flex-col gap-1">
            <span
              className="text-xs font-mono font-bold tracking-widest uppercase"
              style={{ color: accentColor }}
            >
              OUTCOMES & CAPABILITIES
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              What You'll Become Capable Of
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-light">
              This program turns passive conceptual knowledge into autonomous engineering competence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {detail.capabilities.map((cap) => (
              <div
                key={cap.number}
                className="group relative p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-white/20 transition-all flex flex-col justify-between gap-3"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span
                      className="text-xs font-mono font-bold"
                      style={{ color: accentColor }}
                    >
                      {cap.number} — {cap.role}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-zinc-600 group-hover:bg-white transition-colors" />
                  </div>
                  <h3 className="text-sm font-semibold text-white tracking-tight leading-snug">
                    {cap.title}
                  </h3>
                  <p className="text-xs text-zinc-400 font-light leading-relaxed">
                    {cap.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================================================================== */}
        {/* 4. THE 16-WEEK JOURNEY (PROGRESSION ROADMAP)                        */}
        {/* ================================================================== */}
        <section className="flex flex-col gap-6 pt-6 border-t border-white/10">
          <div className="flex flex-col gap-1">
            <span
              className="text-xs font-mono font-bold tracking-widest uppercase"
              style={{ color: accentColor }}
            >
              PROGRAM ROADMAP
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              The 16-Week Course Journey
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-light">
              Structured progressive development moving from underlying execution invariants to production protocol engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {detail.journey.map((stage, idx) => (
              <div
                key={stage.stageNumber}
                className="relative p-5 rounded-xl bg-[#09090f]/90 border border-white/10 flex flex-col justify-between gap-4"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                    <span
                      className="text-xs font-mono font-bold tracking-wider"
                      style={{ color: accentColor }}
                    >
                      0{idx + 1} // {stage.stageName}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-zinc-400 border border-white/10">
                      {stage.weeks}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-300 font-light leading-relaxed">
                    {stage.objective}
                  </p>

                  {/* Tech stack pills */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {stage.technologies.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded bg-white/[0.02] border border-white/5 text-[10px] font-mono text-zinc-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Milestone Project */}
                <div className="pt-3 border-t border-white/5 flex flex-col gap-1">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                    MILESTONE DELIVERABLE
                  </span>
                  <span className="text-xs font-semibold text-zinc-200">
                    ⚡ {stage.project}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================================================================== */}
        {/* 5. 16-WEEK CURRICULUM (INLINE EXPANDABLE ACCORDIONS)                 */}
        {/* ================================================================== */}
        <section id="curriculum" className="flex flex-col gap-6 pt-6 border-t border-white/10 scroll-mt-20">
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span
                className="text-xs font-mono font-bold tracking-widest uppercase"
                style={{ color: accentColor }}
              >
                COMPREHENSIVE SYLLABUS
              </span>
              <span className="text-[10px] font-mono text-zinc-500">
                CLICK TO EXPAND DETAILED TOPICS & LABS
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              16-Week Engineering Curriculum
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-light">
              Complete weekly syllabus detailing lecture theory, hands-on lab exercises, and tangible deliverables.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {currentCourse.modules.map((mod, modIdx) => {
              const isExpanded = expandedModuleId === mod.id;
              const project = detail.projects[modIdx];

              return (
                <div
                  key={mod.id}
                  className={`rounded-2xl transition-all duration-200 border ${
                    isExpanded
                      ? "bg-[#0a0a10] border-white/20 shadow-2xl"
                      : "bg-[#08080c]/80 hover:bg-[#08080c] border-white/10 hover:border-white/20"
                  }`}
                >
                  {/* Module Accordion Header Bar */}
                  <button
                    onClick={() => toggleModule(mod.id)}
                    className="w-full p-5 sm:p-6 flex items-center justify-between gap-4 text-left focus:outline-none"
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <span
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-mono font-bold border shrink-0"
                        style={{
                          backgroundColor: isExpanded ? `${accentColor}20` : "rgba(255,255,255,0.03)",
                          borderColor: isExpanded ? `${accentColor}60` : "rgba(255,255,255,0.1)",
                          color: isExpanded ? accentColor : "#A1A1AA",
                        }}
                      >
                        {mod.number}
                      </span>

                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono text-zinc-400">
                            {mod.weeks}
                          </span>
                          {isExpanded && (
                            <span
                              className="text-[9px] font-mono px-2 py-0.2 rounded font-semibold"
                              style={{
                                backgroundColor: `${accentColor}15`,
                                color: accentColor,
                              }}
                            >
                              ACTIVE EXPANSION
                            </span>
                          )}
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                          {mod.title}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      {project && (
                        <span className="hidden md:inline text-xs font-mono text-zinc-400 bg-white/[0.03] px-3 py-1 rounded-lg border border-white/5">
                          Build: {project.title.split(" ")[0]}...
                        </span>
                      )}
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/[0.04] text-zinc-400 hover:text-white border border-white/10"
                      >
                        {isExpanded ? (
                          <Minus className="w-4 h-4" />
                        ) : (
                          <Plus className="w-4 h-4" />
                        )}
                      </div>
                    </div>
                  </button>

                  {/* Expanded Accordion Body */}
                  {isExpanded && (
                    <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-white/10 flex flex-col gap-6 animate-in fade-in duration-200">
                      {/* Headline Note */}
                      {mod.headlineNote && (
                        <p className="text-xs text-zinc-300 font-mono italic pl-2 border-l-2" style={{ borderColor: accentColor }}>
                          "{mod.headlineNote}"
                        </p>
                      )}

                      {/* Learning Objectives Checklist */}
                      {mod.learningObjectives && mod.learningObjectives.length > 0 && (
                        <div className="flex flex-col gap-2.5 p-4 rounded-xl bg-white/[0.015] border border-white/5">
                          <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1.5 font-semibold">
                            <BookOpen className="w-3.5 h-3.5" style={{ color: accentColor }} />
                            <span>MODULE LEARNING OBJECTIVES</span>
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                            {mod.learningObjectives.map((obj, i) => (
                              <div key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#00FF66] shrink-0 mt-0.5" />
                                <span className="leading-relaxed">{obj}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Core Topics Breakdown */}
                      <div className="flex flex-col gap-3">
                        <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1.5 font-semibold">
                          <Layers className="w-3.5 h-3.5" style={{ color: accentColor }} />
                          <span>DETAILED LECTURE & SYSTEM TOPICS</span>
                        </span>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {mod.sections.map((sec) => (
                            <div
                              key={sec.number}
                              className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-2"
                            >
                              <div className="flex items-center gap-2">
                                <span
                                  className="w-5 h-5 rounded flex items-center justify-center text-[10px] font-mono font-bold"
                                  style={{
                                    backgroundColor: `${accentColor}15`,
                                    color: accentColor,
                                  }}
                                >
                                  {sec.number}
                                </span>
                                <span className="text-xs font-semibold text-zinc-200">
                                  {sec.title}
                                </span>
                              </div>

                              {sec.items && sec.items.length > 0 && (
                                <ul className="flex flex-col gap-1 pl-7 text-[11px] text-zinc-400 list-disc list-inside">
                                  {sec.items.slice(0, 5).map((it, idx) => (
                                    <li key={idx} className="leading-relaxed">
                                      <span className="text-zinc-300">{it}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Hands-on Lab & Build Box */}
                      {project && (
                        <div
                          className="p-4 sm:p-5 rounded-xl border flex flex-col gap-3"
                          style={{
                            backgroundColor: `${accentColor}06`,
                            borderColor: `${accentColor}30`,
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <span
                              className="text-xs font-mono font-bold flex items-center gap-1.5"
                              style={{ color: accentColor }}
                            >
                              <Terminal className="w-3.5 h-3.5" />
                              <span>HANDS-ON LAB // BUILD: {project.title}</span>
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-zinc-400 border border-white/10">
                              {project.type}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                            <div className="flex flex-col gap-1">
                              <span className="text-[10px] font-mono text-zinc-500 uppercase">LEARN</span>
                              <p className="text-xs text-zinc-300">{project.learn}</p>
                            </div>
                            <div className="flex flex-col gap-1">
                              <span className="text-[10px] font-mono text-[#00F0FF] uppercase">BUILD</span>
                              <p className="text-xs text-white font-medium">{project.build}</p>
                            </div>
                            <div className="flex flex-col gap-1">
                              <span className="text-[10px] font-mono text-[#00FF66] uppercase">PROVE</span>
                              <p className="text-xs text-zinc-300">{project.prove}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Skills Acquired & Collapse Action */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="text-[10px] font-mono text-zinc-500 uppercase mr-1">
                            SKILLS ACQUIRED:
                          </span>
                          {currentCourse.tools.slice(0, 5).map((tool, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/10 text-[10px] font-mono text-zinc-300"
                            >
                              [ {tool} ]
                            </span>
                          ))}
                        </div>

                        <button
                          onClick={() => toggleModule(mod.id)}
                          className="text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
                        >
                          <span>Collapse Module</span>
                          <ChevronUp className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ================================================================== */}
        {/* 6. PROJECTS AS FIRST-CLASS CITIZENS (WHAT YOU WILL BUILD)          */}
        {/* ================================================================== */}
        <section className="flex flex-col gap-6 pt-6 border-t border-white/10">
          <div className="flex flex-col gap-1">
            <span
              className="text-xs font-mono font-bold tracking-widest uppercase"
              style={{ color: accentColor }}
            >
              PRODUCTION PORTFOLIO
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              What You Will Build
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-light">
              We teach engineers by making them build real systems. Every module concludes with an audited, benchmarked deliverable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {detail.projects.map((proj) => (
              <div
                key={proj.number}
                className="p-5 rounded-xl bg-[#09090f]/90 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between gap-4"
              >
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span
                      className="text-xs font-mono font-bold"
                      style={{ color: accentColor }}
                    >
                      PROJECT {proj.number} // {proj.weeks}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-zinc-400 border border-white/10">
                      {proj.type}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white tracking-tight">
                    {proj.title}
                  </h3>

                  <div className="flex flex-col gap-2 pt-1 text-xs">
                    <div className="flex items-start gap-2">
                      <span className="text-[10px] font-mono text-[#00F0FF] uppercase shrink-0 mt-0.5">BUILD:</span>
                      <span className="text-zinc-200">{proj.build}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[10px] font-mono text-[#00FF66] uppercase shrink-0 mt-0.5">PROVE:</span>
                      <span className="text-zinc-400">{proj.prove}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 pt-2 border-t border-white/5">
                  {proj.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-white/[0.02] border border-white/5 text-[10px] font-mono text-zinc-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================================================================== */}
        {/* 7. WHO THIS IS FOR & PREREQUISITES MATRIX                          */}
        {/* ================================================================== */}
        <section className="flex flex-col gap-6 pt-6 border-t border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Column 1: Who this is for */}
            <div className="p-6 rounded-2xl bg-[#08080c]/90 border border-white/10 flex flex-col gap-5">
              <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                <Users className="w-4 h-4" style={{ color: accentColor }} />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                  WHO IS THIS FOR?
                </span>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <span className="text-[11px] font-mono text-[#00FF66] uppercase font-semibold">
                    ✓ IDEAL CANDIDATES
                  </span>
                  <div className="flex flex-col gap-2">
                    {detail.audience.idealFor.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] shrink-0 mt-1.5" />
                        <span className="leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-3 border-t border-white/5">
                  <span className="text-[11px] font-mono text-red-400 uppercase font-semibold">
                    ✕ NOT IDEAL FOR
                  </span>
                  <div className="flex flex-col gap-2">
                    {detail.audience.notIdealFor.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400/80 shrink-0 mt-1.5" />
                        <span className="leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2: Prerequisites */}
            <div className="p-6 rounded-2xl bg-[#08080c]/90 border border-white/10 flex flex-col gap-5">
              <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                <Compass className="w-4 h-4" style={{ color: accentColor }} />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                  PREREQUISITES & BACKGROUND
                </span>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <span className="text-[11px] font-mono text-[#00F0FF] uppercase font-semibold">
                    REQUIRED KNOWLEDGE
                  </span>
                  <div className="flex flex-col gap-1.5">
                    {detail.prerequisites.required.map((req, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00F0FF] shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
                  <span className="text-[11px] font-mono text-zinc-400 uppercase font-semibold">
                    HELPFUL (OPTIONAL)
                  </span>
                  <div className="flex flex-col gap-1.5">
                    {detail.prerequisites.helpful.map((help, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-zinc-400">
                        <span className="text-zinc-600 font-mono">•</span>
                        <span>{help}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
                  <span className="text-[11px] font-mono text-zinc-500 uppercase font-semibold">
                    NOT REQUIRED (DEMODALIZED)
                  </span>
                  <div className="flex flex-col gap-1.5">
                    {detail.prerequisites.notRequired.map((notReq, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-zinc-400">
                        <span className="text-emerald-500/70 font-mono">✕</span>
                        <span>{notReq}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* 8. HOW MENTORSHIP WORKS (1-ON-1 DELIVERY MODEL)                    */}
        {/* ================================================================== */}
        <section className="flex flex-col gap-6 pt-6 border-t border-white/10">
          <div className="flex flex-col gap-1">
            <span
              className="text-xs font-mono font-bold tracking-widest uppercase"
              style={{ color: accentColor }}
            >
              1-ON-1 DELIVERY MODEL
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              How Mentorship Works
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-light">
              Mentorship is not pre-recorded video lectures. It is an active engineering feedback loop conducted 1-on-1 with an experienced protocol engineer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {detail.mentorshipModel.map((m) => (
              <div
                key={m.step}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col justify-between gap-3 relative"
              >
                <div className="flex flex-col gap-2">
                  <span
                    className="text-xs font-mono font-bold"
                    style={{ color: accentColor }}
                  >
                    STEP {m.step}
                  </span>
                  <h3 className="text-xs font-bold text-white">
                    {m.title}
                  </h3>
                  <p className="text-[11px] text-zinc-400 font-light leading-relaxed">
                    {m.action}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/5 flex flex-col gap-1">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase">
                    OUTPUT
                  </span>
                  <span className="text-[11px] text-zinc-300 font-mono">
                    {m.deliverable}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================================================================== */}
        {/* 9. CAPSTONE: PRODUCTION-GRADE SYSTEM                               */}
        {/* ================================================================== */}
        <section className="flex flex-col gap-6 pt-6 border-t border-white/10">
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#0c0c14] to-[#07070b] border border-white/10 shadow-2xl flex flex-col gap-6">
            <div className="flex flex-col gap-2 border-b border-white/10 pb-4">
              <div className="flex items-center justify-between">
                <span
                  className="text-xs font-mono font-bold tracking-widest uppercase flex items-center gap-1.5"
                  style={{ color: accentColor }}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>CAPSTONE SYSTEM SPECIFICATION</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-zinc-300 border border-white/10">
                  FINAL GRADUATION MILESTONE
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {detail.capstone.title}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed max-w-4xl">
                {detail.capstone.description}
              </p>

              {/* Quality Gate Callout */}
              <div className="flex items-center gap-2 p-3 mt-2 rounded-xl bg-white/[0.02] border border-white/5 text-xs font-mono">
                <span className="text-[#00FF66] font-bold">QUALITY GATE:</span>
                <span className="text-zinc-300">{detail.capstone.qualityGate}</span>
              </div>
            </div>

            {/* Capstone System Components Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {detail.capstone.systemComponents.map((comp, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-1">
                  <span className="text-xs font-semibold text-white">{comp.name}</span>
                  <span className="text-[11px] text-zinc-400 font-light">{comp.role}</span>
                </div>
              ))}
            </div>

            {/* 6 Tangible Portfolio Deliverables */}
            <div className="flex flex-col gap-3 pt-2">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider font-semibold">
                6 TANGIBLE PORTFOLIO DELIVERABLES INCLUDED
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {detail.capstone.deliverables.map((deliv) => (
                  <div
                    key={deliv.number}
                    className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex flex-col gap-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className="text-[10px] font-mono font-bold"
                        style={{ color: accentColor }}
                      >
                        DELIVERABLE {deliv.number}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-white">
                      {deliv.title}
                    </span>
                    <p className="text-[11px] text-zinc-400 font-light leading-relaxed">
                      {deliv.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* 10. FINAL CONVERSION CTA: READY TO BUILD SYSTEMS?                  */}
        {/* ================================================================== */}
        <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#0c0c16] via-[#090910] to-[#0c0c16] border border-white/10 text-center flex flex-col items-center gap-6 shadow-2xl mb-12">
          <div className="flex flex-col items-center gap-2 max-w-2xl">
            <span
              className="text-xs font-mono font-bold uppercase tracking-widest"
              style={{ color: accentColor }}
            >
              ENROLLMENT & 1-ON-1 MENTORSHIP
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Ready to build systems, not just study them?
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
              Every cohort is strictly 1-on-1 with customized pacing for working software engineers, systems programmers, and protocol researchers.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={handleDiscussProgram}
              className="px-8 py-3.5 rounded-xl font-mono text-xs font-bold text-black transition-all shadow-xl hover:opacity-90 flex items-center gap-2"
              style={{
                backgroundColor: accentColor,
              }}
            >
              <Send className="w-4 h-4" />
              <span>Discuss the Program →</span>
            </button>

            <button
              onClick={onBackToCatalog}
              className="px-6 py-3.5 rounded-xl font-mono text-xs text-zinc-300 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-all flex items-center gap-2"
            >
              <span>← Browse All 7 Curricula</span>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};
