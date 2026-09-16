"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface Milestone {
  id: string;
  stage: string;
  period: string;
  role: string;
  organization: string;
  location: string;
  archetype: string;
  narrative: string;
  achievements: string[];
  technologies: string[];
  accentColor: string;
  secondaryColor: string;
  isCurrent?: boolean;
}

const milestones: Milestone[] = [
  {
    id: "cbc-chain",
    stage: "05",
    period: "SEP 2025 — PRESENT",
    role: "Blockchain Developer — Protocol & Runtime Architecture",
    organization: "Caerulean Bytechains",
    location: "Hyderabad, India",
    archetype: "CBC Chain — Sovereign Layer-1 Genesis",
    narrative:
      "Designed and built CBC Chain from first principles — a fully sovereign Substrate-based Layer-1 blockchain. Responsible for every architectural decision: deterministic WASM execution, custom gas metering, pluggable consensus, and modular pallet architecture. The chain runs on libp2p, supports zero-downtime runtime upgrades, and carries custom cryptographic identity schemes.",
    achievements: [
      "Enterprise-grade L1 with deterministic WASM runtime and hot-upgrade architecture",
      "Modular pallet system, custom cryptographic signatures, libp2p P2P topology",
    ],
    technologies: ["Substrate", "Rust", "Polkadot SDK", "WASM", "libp2p"],
    accentColor: "#00F0FF",
    secondaryColor: "#00FF66",
    isCurrent: true,
  },
  {
    id: "consensus-engine",
    stage: "04",
    period: "MAR 2025 — SEP 2025",
    role: "Blockchain Engineer — Rust & Substrate",
    organization: "Caerulean Bytechains",
    location: "Hyderabad, India",
    archetype: "Tri-Consensus Verification Engine",
    narrative:
      "Architected and benchmarked three distinct consensus mechanisms — Proof of Stake (PoS), Proof of Integrity (PoI), and Distributed Consensus Framework (DCF) — within a single unified Substrate runtime. Each mechanism was designed to solve a different finality problem across experimental and production testnets.",
    achievements: [
      "Three independent consensus protocols benchmarked within one Substrate runtime",
      "Significant improvements to block finality speed and cross-node synchronization",
    ],
    technologies: ["Rust", "Substrate", "PoS / PoI / DCF", "Polkadot SDK"],
    accentColor: "#00FF66",
    secondaryColor: "#38BDF8",
  },
  {
    id: "teaching",
    stage: "03",
    period: "FEB 2026 — MAY 2026",
    role: "Tutor — Blockchain Engineering",
    organization: "ONE DEV",
    location: "Nairobi, Kenya · Remote",
    archetype: "EVM Opcode Stack & WASM Curriculum",
    narrative:
      "Built and delivered the full curriculum for ONE DEV's Blockchain Engineering Diploma program — from zero to production-grade protocol engineering. Conducted twice-weekly live sessions covering EVM bytecode execution, WASM runtime internals, smart contract architecture, and distributed consensus theory.",
    achievements: [
      "End-to-end curriculum for a professional blockchain engineering diploma",
      "Hands-on live workshops covering EVM, WASM, and decentralized protocol engineering",
    ],
    technologies: ["Solidity", "EVM", "WASM", "Smart Contracts", "Curriculum Design"],
    accentColor: "#818CF8",
    secondaryColor: "#F472B6",
  },
  {
    id: "drone-telemetry",
    stage: "02",
    period: "AUG 2024 — SEP 2025",
    role: "Blockchain Developer — Freelance",
    organization: "Protocol Engineering",
    location: "Vizianagaram, India · Remote",
    archetype: "Sovereign Drone Telemetry Substrate Chain",
    narrative:
      "Built a private sovereign blockchain on Polkadot/Substrate in Rust, purpose-engineered for secure real-time drone telemetry log storage and verification. Designed a custom Proof of Stake consensus with cryptographic flight-data signing, achieving 98% accuracy in live telemetry analysis across distributed nodes.",
    achievements: [
      "98% accuracy in real-time telemetry data across distributed sovereign chain nodes",
      "Zero-contention PoS validation with WASM runtime pallet modules",
    ],
    technologies: ["Polkadot", "Rust", "WebAssembly", "PoS", "Distributed Storage"],
    accentColor: "#38BDF8",
    secondaryColor: "#00F0FF",
  },
  {
    id: "healthcare-privacy",
    stage: "01",
    period: "JUL 2024 — AUG 2024",
    role: "Blockchain Developer — Internship",
    organization: "Shamgar Software Solutions",
    location: "Visakhapatnam, India",
    archetype: "Zero-Knowledge Medical Shard Architecture",
    narrative:
      "The starting point. Enhanced a blockchain-based healthcare application to enable privacy-preserving medical diagnostics. Worked on smart contract verification interfaces and optimized model training pipelines. Improved training efficiency by 90%, enabling substantially faster diagnostic analysis without compromising patient data privacy.",
    achievements: [
      "90% improvement in model training efficiency for healthcare diagnostic analysis",
      "Privacy-preserving smart contract verification for medical data integrity",
    ],
    technologies: ["Smart Contracts", "Blockchain", "Privacy Protocols", "Healthcare Systems"],
    accentColor: "#F472B6",
    secondaryColor: "#818CF8",
  },
];

/* ─────────────────────────────────────────────
   Abstract Visual: unique per-stage atmospheric
   CSS composition rendered as SVG overlay + gradients
──────────────────────────────────────────────── */
function StageVisual({ milestone, isInView }: { milestone: Milestone; isInView: boolean }) {
  const { accentColor, secondaryColor, stage } = milestone;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Base deep background */}
      <div className="absolute inset-0 bg-[#030508]" />

      {/* Large atmospheric radial — center-right */}
      <motion.div
        className="absolute"
        style={{
          right: "-10%",
          top: "5%",
          width: "65%",
          height: "90%",
          background: `radial-gradient(ellipse at center, ${accentColor}12 0%, ${accentColor}05 45%, transparent 70%)`,
        }}
        animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.85 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Secondary atmospheric — bottom left */}
      <motion.div
        className="absolute"
        style={{
          left: "-5%",
          bottom: "0%",
          width: "50%",
          height: "60%",
          background: `radial-gradient(ellipse at center, ${secondaryColor}0a 0%, transparent 60%)`,
        }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ duration: 2.0, delay: 0.3 }}
      />

      {/* Geometric accent ring — right side */}
      <motion.div
        className="absolute border rounded-full"
        style={{
          right: "8%",
          top: "50%",
          transform: "translateY(-50%)",
          width: "38vw",
          height: "38vw",
          maxWidth: 580,
          maxHeight: 580,
          borderColor: `${accentColor}18`,
        }}
        animate={{ opacity: isInView ? 1 : 0, rotate: isInView ? 15 : 0 }}
        transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Inner ring */}
      <motion.div
        className="absolute border rounded-full"
        style={{
          right: "8%",
          top: "50%",
          transform: "translateY(-50%)",
          width: "26vw",
          height: "26vw",
          maxWidth: 380,
          maxHeight: 380,
          borderColor: `${accentColor}25`,
        }}
        animate={{ opacity: isInView ? 1 : 0, rotate: isInView ? -10 : 0 }}
        transition={{ duration: 2.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Stage number — massive, ultra-transparent, right-anchored */}
      <motion.div
        className="absolute right-4 sm:right-10 lg:right-16 bottom-8 select-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 0.055 : 0 }}
        transition={{ duration: 1.8, delay: 0.1 }}
        style={{ color: accentColor }}
      >
        <span
          className="font-black leading-none tracking-tighter"
          style={{ fontSize: "clamp(120px, 22vw, 280px)" }}
        >
          {stage}
        </span>
      </motion.div>

      {/* Horizontal scan line — subtle */}
      <motion.div
        className="absolute left-0 right-0 h-px"
        style={{
          top: "45%",
          background: `linear-gradient(to right, transparent 0%, ${accentColor}15 30%, ${accentColor}30 50%, ${accentColor}15 70%, transparent 100%)`,
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: isInView ? 1 : 0, opacity: isInView ? 1 : 0 }}
        transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Small floating geometric particles — right quadrant */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            right: `${15 + (i % 3) * 12}%`,
            top: `${20 + i * 11}%`,
            width: i % 2 === 0 ? 4 : 2,
            height: i % 2 === 0 ? 4 : 2,
            backgroundColor: i % 3 === 0 ? accentColor : secondaryColor,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: isInView ? [0, 0.7, 0.4, 0.7] : 0,
            scale: isInView ? 1 : 0,
          }}
          transition={{
            duration: 2,
            delay: 0.6 + i * 0.12,
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 1 + i * 0.3,
          }}
        />
      ))}

      {/* Left edge gradient — ensures text always readable */}
      <div
        className="absolute inset-y-0 left-0"
        style={{
          width: "60%",
          background:
            "linear-gradient(to right, rgba(3,5,8,1) 0%, rgba(3,5,8,0.96) 40%, rgba(3,5,8,0.7) 70%, transparent 100%)",
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Individual Milestone Chapter
──────────────────────────────────────────────── */
function MilestoneChapter({
  milestone,
  index,
}: {
  milestone: Milestone;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-15% 0px -15% 0px" });

  const staggerDelay = (i: number) => 0.05 + i * 0.08;

  return (
    <div
      ref={ref}
      data-milestone-index={index}
      className="relative w-full flex items-center overflow-hidden"
      style={{ minHeight: "100svh" }}
    >
      {/* Abstract atmospheric visual */}
      <StageVisual milestone={milestone} isInView={isInView} />

      {/* Content — left-anchored editorial */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-14 py-12 sm:py-16 lg:py-20">
        <div className="max-w-[540px] lg:max-w-[620px]">

          {/* Stage + Active badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -20 }}
            transition={{ duration: 0.6, delay: staggerDelay(0) }}
            className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5"
          >
            <span
              className="text-[10px] font-mono font-bold tracking-[0.28em] uppercase"
              style={{ color: milestone.accentColor }}
            >
              STAGE {milestone.stage}
            </span>
            <div
              className="h-px w-8 sm:w-10"
              style={{ backgroundColor: `${milestone.accentColor}35` }}
            />
            {milestone.isCurrent && (
              <span className="flex items-center gap-1.5 text-[10px] font-mono text-[#00FF66] tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-pulse inline-block" />
                ACTIVE NOW
              </span>
            )}
          </motion.div>

          {/* Archetype label */}
          <motion.p
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -15 }}
            transition={{ duration: 0.55, delay: staggerDelay(1) }}
            className="text-[10px] sm:text-[11px] font-mono tracking-[0.16em] uppercase mb-2 sm:mb-2.5"
            style={{ color: `${milestone.accentColor}80` }}
          >
            {milestone.archetype}
          </motion.p>

          {/* Organization — hero title */}
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 28 }}
            transition={{ duration: 0.85, delay: staggerDelay(2), ease: [0.16, 1, 0.3, 1] }}
            className="font-black tracking-tight text-white leading-[0.95] mb-2 sm:mb-3"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.8rem)" }}
          >
            {milestone.organization}
          </motion.h2>

          {/* Role */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 12 }}
            transition={{ duration: 0.6, delay: staggerDelay(3) }}
            className="text-xs sm:text-sm md:text-base font-medium text-zinc-300 mb-1"
          >
            {milestone.role}
          </motion.p>

          {/* Period & location */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ duration: 0.5, delay: staggerDelay(4) }}
            className="text-[11px] sm:text-xs font-mono text-zinc-600 mb-4 sm:mb-5 tracking-wide"
          >
            {milestone.period} &nbsp;·&nbsp; {milestone.location}
          </motion.p>

          {/* Narrative prose */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 16 }}
            transition={{ duration: 0.75, delay: staggerDelay(5) }}
            className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light mb-4 sm:mb-5"
          >
            {milestone.narrative}
          </motion.p>

          {/* Achievements — minimal bullet list */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 12 }}
            transition={{ duration: 0.65, delay: staggerDelay(6) }}
            className="space-y-2 mb-5 sm:mb-6"
          >
            {milestone.achievements.map((ach, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <span
                  className="mt-[6px] w-1 h-1 rounded-full shrink-0"
                  style={{ backgroundColor: milestone.accentColor }}
                />
                <span className="text-xs sm:text-[13px] text-zinc-400 leading-relaxed">{ach}</span>
              </div>
            ))}
          </motion.div>

          {/* Tech stack — pill row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ duration: 0.55, delay: staggerDelay(7) }}
            className="flex flex-wrap gap-1.5 sm:gap-2"
          >
            {milestone.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 sm:px-3 py-1 text-[10px] sm:text-[11px] font-mono text-zinc-500 border border-white/[0.08] rounded-full bg-white/[0.02] tracking-wide"
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Section
──────────────────────────────────────────────── */
export const ExperienceBlockchainSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [railVisible, setRailVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Show/hide progress rail only when experience section is in view
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const obs = new IntersectionObserver(
      ([entry]) => setRailVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );
    obs.observe(section);
    return () => obs.disconnect();
  }, []);

  // Track which chapter is centered in viewport
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    milestones.forEach((_, idx) => {
      const el = document.querySelector(`[data-milestone-index="${idx}"]`);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(idx);
        },
        { threshold: 0.35 }
      );

      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative w-full bg-[#030508] text-[#F5F5F2] overflow-hidden scroll-mt-14"
      aria-label="Career Experience Timeline"
    >
      {/* ── Section intro header ── */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-14 pt-16 sm:pt-20 pb-10 sm:pb-12">
        <div className="flex items-end justify-between flex-wrap gap-6">
          <div>
            <p className="text-[10px] font-mono tracking-[0.3em] text-[#00F0FF] uppercase mb-3 sm:mb-4 opacity-70">
              EXPERIENCE // 01
            </p>
            <h2
              className="font-black tracking-tight text-white leading-[0.88]"
              style={{ fontSize: "clamp(2.5rem, 6.5vw, 5.5rem)" }}
            >
              CAREER
              <br />
              <span className="text-zinc-700">ODYSSEY</span>
            </h2>
          </div>

          <div className="text-right opacity-40">
            <p className="text-[10px] font-mono text-zinc-600 mb-1 tracking-widest">TOTAL STAGES</p>
            <p className="text-4xl sm:text-5xl font-black text-zinc-700 tabular-nums">
              {String(milestones.length).padStart(2, "0")}
            </p>
          </div>
        </div>

        {/* Separator */}
        <div className="mt-8 sm:mt-10 h-px bg-gradient-to-r from-[#00F0FF]/15 via-white/[0.04] to-transparent" />
      </div>

      {/* ── Progress Rail (fixed, left) — only visible when section is in view ── */}
      <motion.div
        className="fixed left-4 sm:left-6 top-1/2 -translate-y-1/2 z-50 pointer-events-none"
        animate={{ opacity: railVisible ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex flex-col items-center gap-0 relative">
          {/* Background line */}
          <div className="absolute inset-x-[calc(50%-0.5px)] inset-y-0 w-px bg-white/[0.06]" />

          {milestones.map((m, idx) => (
            <div key={m.id} className="flex items-center justify-center w-7 h-7 relative z-10">
              <motion.div
                animate={{
                  width: activeIndex === idx ? 8 : 4,
                  height: activeIndex === idx ? 8 : 4,
                  opacity: activeIndex === idx ? 1 : 0.25,
                }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="rounded-full"
                style={{
                  backgroundColor: activeIndex === idx ? m.accentColor : "#ffffff",
                  boxShadow: activeIndex === idx ? `0 0 12px ${m.accentColor}80` : "none",
                }}
              />
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Chapter scroll panels ── */}
      {milestones.map((m, idx) => (
        <MilestoneChapter key={m.id} milestone={m} index={idx} />
      ))}

      {/* Bottom section separator */}
      <div className="h-1 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
    </section>
  );
};
