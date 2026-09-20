"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { DetailedProjectDoc } from "@/data/projectDocs";
import { ProjectSequenceDiagram } from "./ProjectSequenceDiagram";
import {
  ArrowLeft,
  Github,
  Linkedin,
  ExternalLink,
  Layers,
  Code2,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Share2,
} from "lucide-react";

interface ProjectDocumentationViewProps {
  project: DetailedProjectDoc;
  allProjects?: { id: string; name: string }[];
}

export const ProjectDocumentationView: React.FC<ProjectDocumentationViewProps> = ({
  project,
  allProjects = [],
}) => {
  const [activeSectionId, setActiveSectionId] = useState<string>("overview");

  // Derive all section IDs including the sequence diagram
  const indexSections = [
    { id: "overview", label: "01 // SYSTEM OVERVIEW & PROBLEM SPACE" },
    { id: "sequence", label: "02 // PROTOCOL SEQUENCE DIAGRAM" },
    ...project.sections
      .filter((s) => s.id !== "overview")
      .map((s, idx) => ({
        id: s.id,
        label: `0${idx + 3} // ${s.title.replace(/^0\d\s*\/\/\s*/, "").toUpperCase()}`,
      })),
  ];

  // Scroll spy for sticky index sidebar
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 180;
      let currentActive = indexSections[0].id;

      for (const section of indexSections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (scrollPos >= top) {
            currentActive = section.id;
          }
        }
      }

      setActiveSectionId(currentActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [indexSections]);

  const scrollToSection = (id: string) => {
    setActiveSectionId(id);
    const target = document.getElementById(id);
    if (target) {
      const yOffset = -90;
      const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Find prev/next project for bottom navigation
  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const prevProject =
    currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  return (
    <div className="relative w-full min-h-screen bg-[#040407] text-[#F5F5F2] flex flex-col selection:bg-cyan-400 selection:text-black">
      {/* ── TOP STICKY HEADER ────────────────────────────────────── */}
      <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#040407]/90 backdrop-blur-md px-4 sm:px-8 lg:px-14 py-3.5">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-4">
          {/* Back link */}
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors group shrink-0"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400 group-hover:-translate-x-0.5 transition-transform" />
            <span className="hidden sm:inline">RETURN TO SELECTED WORKS</span>
            <span className="sm:hidden">WORKS</span>
          </Link>

          {/* Center: Title badge */}
          <div className="flex items-center gap-2 truncate">
            <span
              className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded border"
              style={{
                color: project.accentColor,
                borderColor: `${project.accentColor}30`,
                backgroundColor: `${project.accentColor}08`,
              }}
            >
              {project.category}
            </span>
            <span className="text-xs font-mono text-zinc-300 font-semibold truncate hidden md:inline">
              {project.name}
            </span>
          </div>

          {/* Right Action Links: Git repo, LinkedIn post, Live demo */}
          <div className="flex items-center gap-2 shrink-0">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] text-xs font-mono text-zinc-300 hover:text-white transition-all"
                title="View GitHub Repository"
              >
                <Github className="w-3.5 h-3.5" />
                <span className="hidden md:inline">GitHub</span>
              </a>
            )}

            {project.linkedinUrl && (
              <a
                href={project.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-[#0077b5]/20 hover:border-[#0077b5]/40 text-xs font-mono text-zinc-300 hover:text-[#00F0FF] transition-all"
                title="View LinkedIn Technical Case Study"
              >
                <Linkedin className="w-3.5 h-3.5 text-sky-400" />
                <span className="hidden md:inline">LinkedIn Post</span>
              </a>
            )}

            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-cyan-400/40 bg-cyan-400/10 hover:bg-cyan-400/20 text-xs font-mono text-cyan-300 transition-all"
                title="Open Live Demonstration"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Live Demo</span>
              </a>
            )}
          </div>
        </div>
      </header>

      {/* ── MAIN DOCUMENTATION CONTAINER ─────────────────────────── */}
      <main className="max-w-[1600px] mx-auto w-full px-4 sm:px-8 lg:px-14 py-8 sm:py-12 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative items-start">
          {/* ── LEFT COLUMN: STICKY INDEX / TABLE OF CONTENTS ──────── */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-24 self-start flex flex-col gap-6 select-none pr-4">
            {/* Index Header */}
            <div className="flex flex-col gap-3 pb-4 border-b border-white/[0.08]">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono tracking-[0.2em] text-zinc-400 uppercase font-semibold">
                  INDEX // CONTENTS
                </span>
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: project.accentColor }}
                />
              </div>
              <p className="text-xs text-zinc-500 font-sans leading-relaxed">
                Technical specification &amp; protocol architecture dossier.
              </p>
            </div>

            {/* Navigation List */}
            <nav className="flex flex-col gap-1.5" aria-label="Project sections index">
              {indexSections.map((item) => {
                const isActive = activeSectionId === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center gap-2.5 text-left py-2 px-2.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                      isActive
                        ? "bg-white/[0.06] text-white font-medium border-l-2 border-cyan-400"
                        : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.02]"
                    }`}
                  >
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Quick Specs Card */}
            <div className="rounded-xl border border-white/[0.08] bg-[#09090f] p-4 flex flex-col gap-3 text-xs font-mono">
              <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold border-b border-white/[0.06] pb-2">
                SYSTEM SPECIFICATIONS
              </span>
              <div className="flex justify-between items-center text-zinc-400">
                <span>YEAR:</span>
                <span className="text-white">{project.year}</span>
              </div>
              <div className="flex justify-between items-center text-zinc-400">
                <span>STATUS:</span>
                <span className="text-emerald-400 font-medium">{project.status}</span>
              </div>
              <div className="flex justify-between items-center text-zinc-400">
                <span>CATEGORY:</span>
                <span className="text-cyan-400">{project.category}</span>
              </div>
              <div className="pt-2 border-t border-white/[0.06] flex flex-wrap gap-1">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-[10px] text-zinc-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </aside>

          {/* ── RIGHT COLUMN: DETAILED DOCUMENTATION CONTENT ───────── */}
          <div className="lg:col-span-9 flex flex-col gap-14 sm:gap-18">
            {/* 1. Project Hero Header */}
            <section className="flex flex-col gap-5 border-b border-white/[0.08] pb-10">
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
                <span
                  className="px-2.5 py-0.5 rounded-full border font-semibold tracking-wider uppercase text-[10px]"
                  style={{
                    color: project.accentColor,
                    borderColor: `${project.accentColor}40`,
                    backgroundColor: `${project.accentColor}10`,
                  }}
                >
                  {project.category}
                </span>
                <span className="text-zinc-600">//</span>
                <span className="text-zinc-400">{project.year}</span>
                <span className="text-zinc-600">//</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {project.status}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white font-sans leading-[1.08]">
                {project.name}
              </h1>

              <p className="text-base sm:text-xl text-zinc-300 font-light leading-relaxed max-w-4xl">
                {project.subtitle}
              </p>

              {/* Metrics Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                {project.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="p-4 rounded-xl border border-white/[0.08] bg-[#0a0a10] flex flex-col gap-1"
                  >
                    <span
                      className="text-2xl sm:text-3xl font-black font-mono tracking-tight"
                      style={{ color: project.accentColor }}
                    >
                      {m.value}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* 2. Section: Overview */}
            <section id="overview" className="flex flex-col gap-6 scroll-mt-24">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest">
                  SECTION 01
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                <h2 className="text-xl sm:text-2xl font-medium text-white font-sans">
                  Executive Overview &amp; Problem Space
                </h2>
              </div>

              {project.sections[0]?.summary && (
                <p className="text-sm sm:text-base text-zinc-200 font-light leading-relaxed bg-white/[0.02] border-l-2 border-cyan-400 p-4 rounded-r-xl">
                  {project.sections[0].summary}
                </p>
              )}

              <div className="space-y-4 text-sm text-zinc-300 font-light leading-relaxed">
                {project.sections[0]?.paragraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {project.sections[0]?.keyPoints && (
                <div className="mt-2 flex flex-col gap-2.5">
                  <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 font-semibold">
                    KEY SYSTEM INVARIANTS
                  </span>
                  <div className="space-y-2">
                    {project.sections[0].keyPoints.map((point, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-3 rounded-lg border border-white/[0.06] bg-[#07080d] text-xs sm:text-sm text-zinc-300"
                      >
                        <CheckCircle2
                          className="w-4 h-4 shrink-0 mt-0.5"
                          style={{ color: project.accentColor }}
                        />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* 3. Section: Sequence Diagram */}
            <section id="sequence" className="flex flex-col gap-6 scroll-mt-24">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest">
                  SECTION 02
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                <h2 className="text-xl sm:text-2xl font-medium text-white font-sans">
                  Protocol Sequence Diagram &amp; Message Transit
                </h2>
              </div>

              <p className="text-sm text-zinc-400 font-light leading-relaxed">
                {project.sequenceDiagram.description}
              </p>

              {/* Interactive SVG Sequence Diagram Component */}
              <ProjectSequenceDiagram
                data={project.sequenceDiagram}
                accentColor={project.accentColor}
              />
            </section>

            {/* 4. Subsequent Technical Sections (Invariants, Code, Benchmarks, Decisions) */}
            {project.sections
              .filter((s) => s.id !== "overview")
              .map((section, idx) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="flex flex-col gap-6 scroll-mt-24 border-t border-white/[0.06] pt-10"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest">
                      SECTION 0{idx + 3}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                    <h2 className="text-xl sm:text-2xl font-medium text-white font-sans">
                      {section.title.replace(/^0\d\s*\/\/\s*/, "")}
                    </h2>
                  </div>

                  {section.summary && (
                    <p className="text-sm text-zinc-300 font-light leading-relaxed">
                      {section.summary}
                    </p>
                  )}

                  <div className="space-y-4 text-sm text-zinc-300 font-light leading-relaxed">
                    {section.paragraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>

                  {/* Code Snippet Box */}
                  {section.codeSnippet && (
                    <div className="flex flex-col rounded-xl border border-white/[0.08] bg-[#07070b] overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-2 border-b border-white/[0.06] bg-[#0a0a10] text-[11px] font-mono text-zinc-400">
                        <div className="flex items-center gap-2">
                          <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{section.codeSnippet.title}</span>
                        </div>
                        <span className="uppercase text-zinc-500">{section.codeSnippet.language}</span>
                      </div>
                      <pre className="p-4 overflow-x-auto text-xs font-mono text-zinc-300 leading-relaxed">
                        <code>{section.codeSnippet.code}</code>
                      </pre>
                    </div>
                  )}

                  {/* Benchmark Data Table */}
                  {section.tableData && (
                    <div className="overflow-x-auto rounded-xl border border-white/[0.08] bg-[#08080d]">
                      <table className="w-full text-left text-xs font-mono">
                        <thead className="bg-[#0e0e16] border-b border-white/[0.08] text-zinc-400 uppercase">
                          <tr>
                            {section.tableData.headers.map((h) => (
                              <th key={h} className="p-3.5 font-medium">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.04]">
                          {section.tableData.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-white/[0.02] transition-colors">
                              {row.map((cell, cIdx) => (
                                <td
                                  key={cIdx}
                                  className={`p-3.5 ${
                                    cIdx === row.length - 1
                                      ? "text-cyan-400 font-bold"
                                      : cIdx === 0
                                      ? "text-white font-medium"
                                      : "text-zinc-300"
                                  }`}
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </section>
              ))}

            {/* ── BOTTOM PAGINATION ────────────────────────────────── */}
            <div className="pt-12 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
              {prevProject ? (
                <Link
                  href={`/projects/${prevProject.id}`}
                  className="flex items-center gap-3 p-4 rounded-xl border border-white/[0.08] bg-[#08080d] hover:border-white/[0.2] transition-all group flex-1 w-full text-left"
                >
                  <ChevronLeft className="w-5 h-5 text-cyan-400 group-hover:-translate-x-1 transition-transform" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">PREVIOUS PROJECT</span>
                    <span className="text-sm font-medium text-white group-hover:text-cyan-400 transition-colors">
                      {prevProject.name}
                    </span>
                  </div>
                </Link>
              ) : (
                <div className="flex-1" />
              )}

              {nextProject ? (
                <Link
                  href={`/projects/${nextProject.id}`}
                  className="flex items-center justify-end gap-3 p-4 rounded-xl border border-white/[0.08] bg-[#08080d] hover:border-white/[0.2] transition-all group flex-1 w-full text-right"
                >
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">NEXT PROJECT</span>
                    <span className="text-sm font-medium text-white group-hover:text-cyan-400 transition-colors">
                      {nextProject.name}
                    </span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <div className="flex-1" />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
