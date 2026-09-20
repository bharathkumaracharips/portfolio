"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { WorkPreviewCanvas, ProjectCategory } from "@/components/canvas/WorkMerkleDiscoveryCanvas";
import { workCategoriesData, WorkProjectItem } from "@/data/work-categories";
import { Github, ExternalLink, ChevronLeft, ChevronRight, X, Layers, FileText, ArrowUpRight } from "lucide-react";

const allProjects: (WorkProjectItem & { accentColor: string; catIndex: number })[] =
  workCategoriesData.flatMap((cat, ci) =>
    cat.projects.map((p) => ({ ...p, accentColor: cat.accentColor, catIndex: ci }))
  );

const STATUS_COLORS: Record<string, string> = {
  "Production": "#00FF66",
  "Active R&D": "#00F0FF",
  "Open Source": "#818CF8",
  "Audit Complete": "#F59E0B",
  "Educational": "#F472B6",
};

const CATEGORY_LABELS: Record<string, string> = {
  PROTOCOL: "Protocol Engineering",
  DAPPS: "Decentralised Applications",
  "FULL-STACK": "Infrastructure & Systems",
  LEARNING: "Research & Education",
};

export function WorkProjectsSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [showDetail, setShowDetail] = useState(false);
  const [dir, setDir] = useState<1 | -1>(1);

  const activeIdxRef = useRef(0);
  const project = allProjects[activeIdx];
  const total = allProjects.length;

  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { amount: 0.1 });
  const [showHint, setShowHint] = useState(false);
  const hasTriggeredRef = useRef(false);

  // Trigger hint when section actually scrolls into view
  useEffect(() => {
    if (isInView && !hasTriggeredRef.current) {
      hasTriggeredRef.current = true;
      setShowHint(true);
    }
  }, [isInView]);

  const dismissHint = useCallback(() => {
    setShowHint(false);
  }, []);

  // Direct project selection
  const setProject = useCallback(
    (index: number) => {
      dismissHint();
      setShowDetail(false);
      const targetIdx = Math.max(0, Math.min(total - 1, index));
      setDir(targetIdx > activeIdxRef.current ? 1 : -1);
      setActiveIdx(targetIdx);
      activeIdxRef.current = targetIdx;
    },
    [total, dismissHint]
  );

  const go = useCallback(
    (d: 1 | -1) => {
      dismissHint();
      setShowDetail(false);
      const nextIdx = Math.max(0, Math.min(total - 1, activeIdx + d));
      setDir(d);
      setActiveIdx(nextIdx);
      activeIdxRef.current = nextIdx;
    },
    [activeIdx, total, dismissHint]
  );

  // Auto-dismiss hint after 5s
  useEffect(() => {
    if (!showHint) return;
    const t = setTimeout(dismissHint, 5000);
    return () => clearTimeout(t);
  }, [showHint, dismissHint]);

  // Keyboard navigation (← → for prev/next, Esc to close modal)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        if (activeIdxRef.current < total - 1) {
          go(1);
        }
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        if (activeIdxRef.current > 0) {
          go(-1);
        }
      }
      if (e.key === "Escape") {
        setShowDetail(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [go, total]);

  // True Scroll Locking: intercept wheel/trackpad when within the section
  const lastWheelTime = useRef<number>(0);
  const accumulatedDelta = useRef<number>(0);
  const reachedEndRef = useRef<boolean>(false);
  const reachedStartRef = useRef<boolean>(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Intercept when the section occupies the viewport
      const sectionInFocus =
        (rect.top <= 120 && rect.bottom >= viewportHeight * 0.35) ||
        (rect.top >= -100 && rect.top <= 100);

      if (!sectionInFocus) return;

      const isDown = e.deltaY > 0;
      const isUp = e.deltaY < 0;
      const now = Date.now();
      const currentIdx = activeIdxRef.current;

      // Case 1: Reached the last project (12 of 12) and user scrolls down
      if (isDown && currentIdx >= total - 1) {
        if (reachedEndRef.current && now - lastWheelTime.current > 350) {
          reachedEndRef.current = false;
          const nextSec = document.getElementById("certifications");
          if (nextSec) nextSec.scrollIntoView({ behavior: "smooth" });
          return;
        }
        e.preventDefault();
        return;
      }

      // Case 2: At the first project (01 of 12) and user scrolls up
      if (isUp && currentIdx <= 0) {
        if (reachedStartRef.current && now - lastWheelTime.current > 350) {
          reachedStartRef.current = false;
          const prevSec = document.getElementById("experience");
          if (prevSec) prevSec.scrollIntoView({ behavior: "smooth" });
          return;
        }
        e.preventDefault();
        return;
      }

      // Lock the page scroll while cycling through projects — 100% LOCKED TILL COMPLETION!
      e.preventDefault();

      // Keep section aligned cleanly at top
      if (Math.abs(rect.top) > 8 && Math.abs(rect.top) < 150) {
        window.scrollTo({ top: container.offsetTop, behavior: "instant" });
      }

      accumulatedDelta.current += e.deltaY;

      // Filter micro-jitter from trackpad inertia; trigger crisp stepped transitions
      if (now - lastWheelTime.current > 220 && Math.abs(accumulatedDelta.current) > 18) {
        lastWheelTime.current = now;
        accumulatedDelta.current = 0;

        if (isDown) {
          setActiveIdx((prev) => {
            const next = Math.min(total - 1, prev + 1);
            setDir(1);
            activeIdxRef.current = next;
            reachedStartRef.current = false;
            if (next === total - 1) {
              reachedEndRef.current = true;
            }
            return next;
          });
        } else if (isUp) {
          setActiveIdx((prev) => {
            const next = Math.max(0, prev - 1);
            setDir(-1);
            activeIdxRef.current = next;
            reachedEndRef.current = false;
            if (next === 0) {
              reachedStartRef.current = true;
            }
            return next;
          });
        }
      }
    };

    // Touch swipe support for mobile
    let touchStartY = 0;
    let lastTouchTime = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const sectionInFocus =
        (rect.top <= 120 && rect.bottom >= viewportHeight * 0.35) ||
        (rect.top >= -100 && rect.top <= 100);
      if (!sectionInFocus) return;

      const currentY = e.touches[0].clientY;
      const diffY = touchStartY - currentY; // positive = swipe up = scroll down
      const isDown = diffY > 0;
      const isUp = diffY < 0;

      if (Math.abs(diffY) < 15) return;

      if (isDown && activeIdxRef.current >= total - 1) {
        if (reachedEndRef.current) {
          document.getElementById("certifications")?.scrollIntoView({ behavior: "smooth" });
        }
        return;
      }
      if (isUp && activeIdxRef.current <= 0) {
        if (reachedStartRef.current) {
          document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
        }
        return;
      }

      e.preventDefault();

      const now = Date.now();
      if (now - lastTouchTime > 280 && Math.abs(diffY) > 30) {
        lastTouchTime = now;
        touchStartY = currentY;

        if (isDown) {
          setActiveIdx((prev) => {
            const next = Math.min(total - 1, prev + 1);
            setDir(1);
            activeIdxRef.current = next;
            reachedStartRef.current = false;
            if (next === total - 1) {
              reachedEndRef.current = true;
            }
            return next;
          });
        } else if (isUp) {
          setActiveIdx((prev) => {
            const next = Math.max(0, prev - 1);
            setDir(-1);
            activeIdxRef.current = next;
            reachedEndRef.current = false;
            if (next === 0) {
              reachedStartRef.current = true;
            }
            return next;
          });
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
    };
  }, [total]);

  const textVariants = {
    enter: (d: number) => ({ opacity: 0, y: d > 0 ? 40 : -40 }),
    center: { opacity: 1, y: 0 },
    exit: (d: number) => ({ opacity: 0, y: d > 0 ? -40 : 40 }),
  };

  return (
    <section
      id="work"
      ref={containerRef}
      className="relative w-full h-screen min-h-[660px] max-h-[1080px] bg-[#020406] text-white border-t border-white/[0.04] flex flex-col justify-between overflow-hidden select-none"
    >
      {/* ── COMPACT TOP BAR ──────────────────────────────────── */}
      <div className="relative z-10 flex items-center justify-between px-6 sm:px-10 lg:px-14 shrink-0 border-b border-white/[0.05]" style={{ height: 52 }}>
        <div className="flex items-center gap-3 sm:gap-4">
          <p className="text-[9px] font-mono tracking-[0.25em] text-[#00F0FF]/60 uppercase">WORK // 02</p>
          <span className="text-white/10">|</span>
          <h2 className="text-sm sm:text-base font-black tracking-tight text-white">
            SELECTED <span className="text-zinc-600">WORKS</span>
          </h2>
          {/* Status Lock Pill */}
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-mono text-cyan-300">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
            <span>SCROLL LOCKED // {String(activeIdx + 1).padStart(2, "0")} OF {String(total).padStart(2, "0")}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <a
            href="#certifications"
            className="text-[10px] font-mono text-zinc-500 hover:text-cyan-400 transition-colors flex items-center gap-1 py-1 px-2.5 rounded-md hover:bg-white/[0.04] border border-transparent hover:border-white/10"
            title="Skip directly to Certifications"
          >
            <span>Skip to Certs</span>
            <span>↓</span>
          </a>
          <span className="text-white/10">|</span>
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono text-zinc-600 tracking-widest uppercase">Project</span>
            <span className="text-sm font-black text-cyan-400 tabular-nums">{String(activeIdx + 1).padStart(2, "0")}</span>
            <span className="text-xs font-mono text-zinc-600">/</span>
            <span className="text-xs font-mono text-zinc-600 tabular-nums">{String(total).padStart(2, "0")}</span>
          </div>
        </div>
      </div>

      {/* ── MAIN VIEWER: flex-1 fills remaining space ─────────── */}
      <div className="relative flex flex-1 min-h-0 w-full max-w-[1600px] mx-auto">
        {/* ── LEFT PANEL ────────────────────────────────────── */}
        <div className="relative z-10 flex flex-col justify-center w-full lg:w-[44%] px-6 sm:px-10 lg:px-14 py-4 shrink-0">

          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={project.id}
              custom={dir}
              variants={textVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-0"
            >
              {/* Category + Status row */}
              <div className="flex items-center gap-2 sm:gap-3 mb-3">
                <span
                  className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase"
                  style={{ color: project.accentColor }}
                >
                  {CATEGORY_LABELS[project.category] ?? project.category}
                </span>
                <span className="text-zinc-800">·</span>
                <span
                  className="text-[10px] font-mono"
                  style={{ color: STATUS_COLORS[project.status] }}
                >
                  ● {project.status}
                </span>
                <span className="text-zinc-800">·</span>
                <span className="text-[10px] font-mono text-zinc-700">{project.year}</span>
              </div>

              {/* Project name — the headline */}
              <Link
                href={`/projects/${project.id}`}
                className="font-black tracking-tight leading-[0.92] text-white mb-3 hover:text-cyan-400 transition-colors group flex items-center gap-3"
                style={{ fontSize: "clamp(1.4rem, 2.8vw, 2.6rem)" }}
              >
                <span>{project.name}</span>
                <ArrowUpRight className="w-5 h-5 text-zinc-600 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
              </Link>

              {/* Subtitle */}
              <p className="text-[12px] font-light text-zinc-500 leading-relaxed mb-4 max-w-[460px]">
                {project.subtitle}
              </p>

              {/* Key metrics */}
              {project.metrics && (
                <div className="flex gap-5 sm:gap-8 mb-4">
                  {project.metrics.map((m) => (
                    <div key={m.label}>
                      <p
                        className="font-black font-mono leading-none mb-0.5"
                        style={{ fontSize: "clamp(1.2rem, 2vw, 1.9rem)", color: project.accentColor }}
                      >
                        {m.value}
                      </p>
                      <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">{m.label}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Tech stack */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.techStack.slice(0, 5).map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-0.5 rounded-full text-[9px] font-mono border text-zinc-500"
                    style={{ borderColor: `${project.accentColor}20`, backgroundColor: `${project.accentColor}07` }}
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 5 && (
                  <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono border border-white/[0.07] text-zinc-600">+{project.techStack.length - 5}</span>
                )}
              </div>

              {/* Action row */}
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href={`/projects/${project.id}`}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[11px] font-mono font-medium transition-all border cursor-pointer hover:scale-[1.03]"
                  style={{
                    borderColor: `${project.accentColor}50`,
                    backgroundColor: `${project.accentColor}15`,
                    color: project.accentColor,
                  }}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Architecture &amp; Docs ↗</span>
                </Link>

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-white/[0.1] bg-white/[0.04] text-[11px] font-mono text-zinc-300 hover:border-white/[0.2] hover:text-white transition-all"
                  >
                    <Github className="w-3 h-3" /> Repository
                  </a>
                )}

                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[11px] font-mono transition-all border"
                    style={{ borderColor: `${project.accentColor}40`, backgroundColor: `${project.accentColor}10`, color: project.accentColor }}
                  >
                    <ExternalLink className="w-3 h-3" /> Live Demo
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => setShowDetail(true)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[11px] font-mono transition-all border border-white/[0.08] hover:border-white/20 text-zinc-400 hover:text-zinc-200 cursor-pointer"
                >
                  Quick Spec
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── RIGHT PANEL: Full-height 3D Canvas ─────────────── */}
        <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[58%]">
          {/* Gradient bleed from left into canvas */}
          <div className="absolute inset-y-0 left-0 w-40 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, #020406 0%, transparent 100%)" }} />
          {/* Bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to top, #020406 0%, transparent 100%)" }} />

          <WorkPreviewCanvas category={project.category as ProjectCategory} />

          {/* Floating project index on canvas */}
          <AnimatePresence mode="wait">
            <motion.div
              key={project.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute top-6 right-6 z-20"
            >
              <Link
                href={`/projects/${project.id}`}
                className="text-[9px] font-mono tracking-widest uppercase px-3.5 py-1.5 rounded-full backdrop-blur-md border hover:border-cyan-400 transition-all flex items-center gap-1.5 group cursor-pointer"
                style={{ color: project.accentColor, borderColor: `${project.accentColor}30`, backgroundColor: "rgba(2,4,6,0.75)" }}
              >
                <span>{project.category} — INSPECT DOSSIER &amp; SEQUENCE FLOW</span>
                <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── BOTTOM NAV — compact ─────────────────────────────── */}
      <div className="relative z-20 shrink-0 border-t border-white/[0.05] max-w-[1600px] mx-auto w-full">
        <div className="flex items-stretch" style={{ height: 60 }}>

          {/* ── PREV ─────────────────────────────────────────── */}
          <button
            type="button"
            onClick={() => go(-1)}
            className="group flex items-center gap-3 px-6 sm:px-10 lg:px-14 flex-1 text-left transition-all hover:bg-white/[0.02] cursor-pointer border-r border-white/[0.05]"
          >
            <div
              className="w-10 h-10 rounded-full border flex items-center justify-center shrink-0 transition-all duration-200 group-hover:scale-110"
              style={{
                borderColor: `${allProjects[(activeIdx - 1 + total) % total].accentColor}30`,
                backgroundColor: `${allProjects[(activeIdx - 1 + total) % total].accentColor}08`,
              }}
            >
              <ChevronLeft
                className="w-4 h-4 transition-colors duration-200"
                style={{ color: allProjects[(activeIdx - 1 + total) % total].accentColor }}
              />
            </div>
            <div className="min-w-0 hidden sm:block">
              <p className="text-[8px] font-mono text-zinc-700 tracking-widest mb-0.5 uppercase">Previous</p>
              <p className="text-[11px] font-semibold text-zinc-500 group-hover:text-zinc-200 transition-colors duration-200 truncate">
                {allProjects[(activeIdx - 1 + total) % total].name}
              </p>
            </div>
          </button>

          {/* ── CENTER: Progress pills ───────────────────────── */}
          <div className="hidden lg:flex items-center justify-center px-6 shrink-0 gap-1.5">
            {allProjects.map((p, i) => {
              const isActive = i === activeIdx;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setProject(i)}
                  title={p.name}
                  className="transition-all duration-300 cursor-pointer rounded-full"
                  style={{
                    width: isActive ? 24 : 6,
                    height: 6,
                    backgroundColor: isActive ? p.accentColor : "#1c2030",
                  }}
                />
              );
            })}
          </div>

          {/* ── NEXT ─────────────────────────────────────────── */}
          <button
            onClick={() => go(1)}
            className="group flex items-center gap-3 px-6 sm:px-10 lg:px-14 flex-1 justify-end text-right transition-all hover:bg-white/[0.02] cursor-pointer border-l border-white/[0.05] lg:border-l-0"
          >
            <div className="min-w-0 hidden sm:block">
              <p className="text-[8px] font-mono text-zinc-700 tracking-widest mb-0.5 uppercase">Next</p>
              <p className="text-[11px] font-semibold text-zinc-500 group-hover:text-zinc-200 transition-colors duration-200 truncate">
                {allProjects[(activeIdx + 1) % total].name}
              </p>
            </div>
            <div
              className="w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-200 group-hover:scale-110"
              style={{
                borderColor: `${project.accentColor}40`,
                backgroundColor: `${project.accentColor}10`,
              }}
            >
              <ChevronRight
                className="w-4 h-4 transition-colors duration-200"
                style={{ color: project.accentColor }}
              />
            </div>
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          KEYBOARD HINT OVERLAY — first visit only
      ══════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96, transition: { duration: 0.25 } }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-20 sm:bottom-24 inset-x-0 z-40 flex justify-center px-4 pointer-events-auto"
          >
            <div
              onClick={dismissHint}
              className="group relative flex items-center gap-3 sm:gap-4 px-5 py-3 rounded-2xl backdrop-blur-2xl border border-white/[0.14] bg-[#020406]/92 shadow-[0_12px_50px_rgba(0,0,0,0.85)] cursor-pointer hover:border-white/30 transition-all overflow-hidden select-none"
              style={{
                boxShadow: `0 8px 32px -8px ${project.accentColor}35, 0 4px 16px rgba(0,0,0,0.8)`,
              }}
            >
              {/* Subtle top ambient specular highlight */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

              {/* Left arrow key cap with micro bounce */}
              <motion.div
                className="flex items-center"
                animate={{ x: [-2.5, 0.5, -2.5] }}
                transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-8 h-8 rounded-lg border border-white/20 bg-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_5px_rgba(0,0,0,0.5)] flex items-center justify-center group-hover:border-white/40 transition-colors">
                  <span className="text-white text-sm font-black font-mono leading-none">←</span>
                </div>
              </motion.div>

              {/* Center text description */}
              <div className="text-center px-1">
                <div className="flex items-center justify-center gap-1.5 mb-0.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-ping"
                    style={{ backgroundColor: project.accentColor }}
                  />
                  <p className="text-[9px] font-mono font-semibold tracking-[0.2em] text-zinc-400 uppercase">
                    Interactive Navigation
                  </p>
                </div>
                <p className="text-[11px] sm:text-xs font-medium text-white tracking-tight">
                  Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono text-[10px] font-bold border border-white/20">←</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono text-[10px] font-bold border border-white/20">→</kbd> to browse projects
                </p>
              </div>

              {/* Right arrow key cap with micro bounce */}
              <motion.div
                className="flex items-center"
                animate={{ x: [2.5, -0.5, 2.5] }}
                transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-8 h-8 rounded-lg border border-white/20 bg-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_5px_rgba(0,0,0,0.5)] flex items-center justify-center group-hover:border-white/40 transition-colors">
                  <span className="text-white text-sm font-black font-mono leading-none">→</span>
                </div>
              </motion.div>

              {/* Close / dismiss button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  dismissHint();
                }}
                className="ml-0.5 p-1 rounded-full text-zinc-500 hover:text-white hover:bg-white/10 transition-colors"
                title="Dismiss hint"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              {/* Synchronized 4.5s countdown timer bar */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-[2px] origin-left pointer-events-none"
                style={{ backgroundColor: project.accentColor }}
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0 }}
                transition={{ duration: 4.5, ease: "linear" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════
          ARCHITECTURE DEEP-DIVE MODAL
      ══════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {showDetail && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md"
            onClick={(e) => { if (e.target === e.currentTarget) setShowDetail(false); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: 28 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl bg-[#060b16] border border-white/[0.1] rounded-2xl p-6 sm:p-8 max-h-[88vh] overflow-y-auto"
              style={{ boxShadow: `0 40px 100px ${project.accentColor}15` }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-[1.5px] rounded-t-2xl"
                style={{ background: `linear-gradient(90deg, transparent, ${project.accentColor}, transparent)` }}
              />
              <button
                onClick={() => setShowDetail(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] flex items-center justify-center text-zinc-500 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-mono font-bold tracking-widest uppercase" style={{ color: project.accentColor }}>
                  {project.category}
                </span>
                <span className="text-zinc-700 text-xs">// {project.year}</span>
                <span className="ml-auto text-[10px] font-mono" style={{ color: STATUS_COLORS[project.status] }}>
                  ● {project.status}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-1">{project.name}</h2>
              <p className="text-xs font-mono mb-5" style={{ color: `${project.accentColor}99` }}>{project.subtitle}</p>
              <p className="text-sm text-zinc-400 leading-[1.85] mb-6">{project.description}</p>

              {project.metrics && (
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.07]">
                      <p className="text-[9px] font-mono text-zinc-600 mb-1 uppercase tracking-wider">{m.label}</p>
                      <p className="text-lg font-black font-mono" style={{ color: project.accentColor }}>{m.value}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="mb-6">
                <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-600 uppercase tracking-wider mb-3">
                  <Layers className="w-3.5 h-3.5" style={{ color: project.accentColor }} />
                  ARCHITECTURE STACK
                </div>
                <div className="space-y-2">
                  {project.architectureLayers.map((layer, idx) => (
                    <div key={layer.layerName} className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/[0.025] border border-white/[0.06] text-xs">
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold tabular-nums" style={{ color: project.accentColor }}>
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span className="font-semibold text-zinc-200">{layer.layerName}</span>
                        <span className="text-zinc-600 hidden sm:inline">— {layer.description}</span>
                      </div>
                      <span className="font-mono text-zinc-500 text-[10px] ml-4 shrink-0">{layer.tech}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.techStack.map((tech) => (
                  <span key={tech} className="px-3 py-1 rounded-full text-[10px] font-mono text-zinc-500 border border-white/[0.08] bg-white/[0.02]">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.1] text-xs font-mono text-zinc-300 hover:border-white/[0.2] hover:text-white transition-all">
                    <Github className="w-3.5 h-3.5" /> Repository
                  </a>
                )}
                {project.demoUrl && (
                  <a href={project.demoUrl} target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-mono transition-all"
                    style={{ borderColor: `${project.accentColor}40`, backgroundColor: `${project.accentColor}12`, color: project.accentColor }}>
                    <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                  </a>
                )}
                <Link
                  href={`/projects/${project.id}`}
                  className="px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all border flex items-center gap-1.5"
                  style={{
                    borderColor: `${project.accentColor}50`,
                    backgroundColor: `${project.accentColor}18`,
                    color: project.accentColor,
                  }}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Full Dossier &amp; Sequence Diagram ↗</span>
                </Link>
                <button
                  type="button"
                  onClick={() => setShowDetail(false)}
                  className="ml-auto px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-zinc-500 hover:text-zinc-300 transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
