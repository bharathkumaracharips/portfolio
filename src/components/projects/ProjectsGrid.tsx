"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { projectItemsData } from "@/data/projects";
import { Github, ExternalLink, Terminal, Zap, ArrowUpRight } from "lucide-react";
import type { ProjectItem } from "@/types";

/* ─────────────────────────────────────────
   Per-project colour palettes & meta
   ───────────────────────────────────────── */
const PROJECT_META: Record<
  string,
  { color: string; glow: string; accent: string; terminalLines: string[] }
> = {
  "proj-01-evm-mem-profiler": {
    color: "#dea584",
    glow: "rgba(222,165,132,0.18)",
    accent: "#dea584",
    terminalLines: [
      "$ evm-profiler run --tx 0xd4f2…",
      "> parsing 847 opcodes…",
      "> PUSH1 gas=3  mem=0x00→0x20",
      "> MSTORE gas=3  slots=1",
      "> CALL  gas=2300 depth=2",
      "> peak_mem: 14.2 KiB  total_gas: 128,432",
      "✓ flamegraph written → out/trace.svg",
    ],
  },
  "proj-02-p2p-gossip-simulator": {
    color: "#00f0ff",
    glow: "rgba(0,240,255,0.15)",
    accent: "#00f0ff",
    terminalLines: [
      "$ gossip-sim start --nodes 10000",
      "> bootstrapping DHT topology…",
      "> peer 0x3a1f connected  latency=4ms",
      "> block #18420001 propagating…",
      "> coverage: 50% in 180ms",
      "> coverage: 95% in 620ms",
      "✓ median propagation: 580ms",
    ],
  },
  "proj-03-rust-rpc-proxy": {
    color: "#00ADD8",
    glow: "rgba(0,173,216,0.18)",
    accent: "#00ADD8",
    terminalLines: [
      "$ rpc-gateway --port 8545",
      "> worker pool: 32 Tokio tasks",
      "> redis cache connected  hit=0%",
      "> [req] eth_getBalance → upstream",
      "> [req] eth_blockNumber → CACHE HIT",
      "> p50=18ms  p99=62ms  rps=14,200",
      "✓ health checks passing",
    ],
  },
  "proj-04-stylus-arbitrum-vault": {
    color: "#AA67DA",
    glow: "rgba(170,103,218,0.18)",
    accent: "#AA67DA",
    terminalLines: [
      "$ forge test --fuzz-runs 10000",
      "> compiling Rust → WASM…",
      "> deploying to Arbitrum Stylus…",
      "> deposit(1 ETH)  gas=18,400",
      "> solidity equiv  gas=91,200",
      "> savings: 79.8% ⚡",
      "✓ 10,000 fuzz tests passed",
    ],
  },
  "proj-05-zk-fraud-proof-engine": {
    color: "#00ff9d",
    glow: "rgba(0,255,157,0.15)",
    accent: "#00ff9d",
    terminalLines: [
      "$ fraud-verifier challenge --block 42",
      "> bisecting state transitions…",
      "> step 1/16: [ok]",
      "> step 8/16: MISMATCH detected",
      "> narrowing to single instruction…",
      "> on-chain dispute submitted",
      "✓ invalid transition proven",
    ],
  },
  "proj-06-merkle-trie-visualizer": {
    color: "#f7931e",
    glow: "rgba(247,147,30,0.15)",
    accent: "#f7931e",
    terminalLines: [
      "$ mpt-inspector load --state latest",
      "> loading 50M state entries…",
      "> encoding key 0xdead… → nibbles",
      "> branch node depth=4 children=12",
      "> leaf value: balance=32.4 ETH",
      "> proof verified in 2.1ms",
      "✓ WASM engine ready",
    ],
  },
};

const STATUS_COLORS: Record<string, string> = {
  Production: "#00ff9d",
  "Open Source": "#00f0ff",
  "Audit Complete": "#AA67DA",
  "Active R&D": "#ffb800",
};

const N = projectItemsData.length;

/* ─────────────────────────────────────────
   Terminal Panel
   ───────────────────────────────────────── */
function TerminalPanel({
  lines,
  accent,
  active,
}: {
  lines: string[];
  accent: string;
  active: boolean;
}) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!active) { setVisibleCount(0); return; }
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setVisibleCount(i);
      if (i >= lines.length) clearInterval(timer);
    }, 280);
    return () => clearInterval(timer);
  }, [active, lines]);

  return (
    <div
      className="relative rounded-xl overflow-hidden border"
      style={{
        background: "rgba(8,9,13,0.85)",
        borderColor: `${accent}30`,
        boxShadow: `0 0 40px ${accent}15, inset 0 0 40px rgba(0,0,0,0.4)`,
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-2 px-4 py-2.5 border-b"
        style={{ borderColor: `${accent}20`, background: `${accent}08` }}
      >
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <Terminal className="w-3.5 h-3.5 ml-2" style={{ color: accent }} />
        <span className="text-[11px] font-mono" style={{ color: `${accent}90` }}>
          protocol — zsh
        </span>
      </div>
      {/* Lines */}
      <div className="p-4 font-mono text-[11px] leading-relaxed min-h-[160px]">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={i < visibleCount ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
            transition={{ duration: 0.25 }}
            style={{
              color:
                line.startsWith("✓")
                  ? accent
                  : line.startsWith(">")
                  ? "#94a3b8"
                  : "#e2e8f0",
            }}
          >
            {line}
            {i === visibleCount - 1 && active && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity }}
                style={{ color: accent }}
              >
                ▊
              </motion.span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Progress Rail (left side)
   ───────────────────────────────────────── */
function ProgressRail({
  current,
  total,
  projects,
  onDotClick,
}: {
  current: number;
  total: number;
  projects: ProjectItem[];
  onDotClick: (i: number) => void;
}) {
  return (
    <div className="absolute left-6 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col gap-4">
      {projects.map((proj, i) => {
        const meta = PROJECT_META[proj.id] ?? { color: "#00f0ff", accent: "#00f0ff" };
        const isActive = i === current;
        return (
          <button
            key={proj.id}
            onClick={() => onDotClick(i)}
            className="flex items-center gap-3 group text-left"
            aria-label={`Go to project ${i + 1}`}
          >
            {/* Dot */}
            <motion.div
              animate={
                isActive
                  ? { scale: 1.4, opacity: 1 }
                  : { scale: 1, opacity: 0.35 }
              }
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex-shrink-0"
            >
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{
                  background: isActive ? meta.color : "#334155",
                  boxShadow: isActive ? `0 0 10px ${meta.color}` : "none",
                }}
              />
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  style={{ background: meta.color }}
                />
              )}
            </motion.div>
            {/* Label */}
            <motion.div
              animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
              transition={{ duration: 0.35 }}
              className="overflow-hidden"
            >
              <div className="text-[9px] font-mono" style={{ color: meta.color }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="text-[10px] text-slate-300 font-medium leading-tight max-w-[100px] truncate">
                {proj.name.split(" ").slice(0, 3).join(" ")}
              </div>
            </motion.div>
          </button>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────
   Scene Progress Bar (bottom)
   ───────────────────────────────────────── */
function SceneProgressBar({ progress, color }: { progress: number; color: string }) {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-800/50 z-20">
      <motion.div
        className="h-full rounded-full"
        style={{
          width: `${progress * 100}%`,
          background: `linear-gradient(90deg, ${color}, ${color}80)`,
          boxShadow: `0 0 8px ${color}`,
        }}
        transition={{ duration: 0.1 }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────
   Project Scene (the cinematic slide)
   ───────────────────────────────────────── */
function ProjectScene({
  project,
  index,
  sceneProgress,
  isActive,
}: {
  project: ProjectItem;
  index: number;
  sceneProgress: number;
  isActive: boolean;
}) {
  const meta = PROJECT_META[project.id] ?? {
    color: "#00f0ff",
    glow: "rgba(0,240,255,0.15)",
    accent: "#00f0ff",
    terminalLines: [],
  };

  // Enter: 0→0.15 ramp up | Middle: 0.15→0.85 full | Exit: 0.85→1 ramp down
  const enterProgress = Math.min(sceneProgress / 0.15, 1);
  const exitProgress = Math.max((sceneProgress - 0.85) / 0.15, 0);
  const midProgress = Math.min(Math.max((sceneProgress - 0.15) / 0.7, 0), 1);

  const opacity = sceneProgress <= 0.15
    ? enterProgress
    : sceneProgress >= 0.85
    ? 1 - exitProgress
    : 1;

  const yShift = sceneProgress <= 0.15
    ? (1 - enterProgress) * 60
    : sceneProgress >= 0.85
    ? -exitProgress * 60
    : 0;

  const scale = sceneProgress <= 0.15
    ? 0.92 + 0.08 * enterProgress
    : sceneProgress >= 0.85
    ? 1 - 0.08 * exitProgress
    : 1;

  const statusColor = STATUS_COLORS[project.status] ?? "#94a3b8";

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center px-6 sm:px-12 lg:px-24"
      style={{ opacity, y: yShift }}
    >
      {/* Ambient background orb */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 60% 50%, ${meta.glow} 0%, transparent 65%),
                       radial-gradient(ellipse at 20% 80%, ${meta.glow.replace("0.18","0.08").replace("0.15","0.06")} 0%, transparent 50%)`,
          opacity: midProgress * 0.9,
        }}
      />

      {/* Giant project number (background watermark) */}
      <div
        className="absolute right-8 top-1/2 -translate-y-1/2 text-[clamp(120px,18vw,240px)] font-black font-mono leading-none select-none pointer-events-none hidden md:block"
        style={{ color: `${meta.color}06` }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Main content grid */}
      <motion.div
        className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
        style={{ scale }}
      >
        {/* ── Left: Project info ── */}
        <div className="flex flex-col gap-6">
          {/* Top meta row */}
          <div className="flex items-center gap-3 flex-wrap">
            <span
              className="px-2.5 py-1 rounded text-[10px] font-mono font-bold border"
              style={{
                color: meta.accent,
                borderColor: `${meta.accent}40`,
                background: `${meta.accent}10`,
              }}
            >
              {project.category}
            </span>
            <span
              className="flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-mono border"
              style={{
                color: statusColor,
                borderColor: `${statusColor}40`,
                background: `${statusColor}10`,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: statusColor }}
              />
              {project.status}
            </span>
            <span
              className="font-mono text-[10px]"
              style={{ color: `${meta.accent}60` }}
            >
              {String(index + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
            </span>
          </div>

          {/* Title — word-by-word reveal */}
          <div>
            <h3 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {project.name.split(" ").map((word, wi) => (
                <motion.span
                  key={wi}
                  className="inline-block mr-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isActive
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 20 }
                  }
                  transition={{
                    duration: 0.5,
                    delay: wi * 0.07,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{
                    textShadow: wi === 0 ? `0 0 40px ${meta.color}40` : "none",
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </h3>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl"
          >
            {project.description}
          </motion.p>

          {/* Tech stack pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isActive ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-2"
          >
            {project.techStack.map((tech, ti) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.35, delay: 0.4 + ti * 0.06 }}
                className="px-3 py-1 rounded-full text-[11px] font-mono border"
                style={{
                  borderColor: `${meta.accent}30`,
                  background: `${meta.accent}08`,
                  color: `${meta.accent}cc`,
                }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 flex-wrap"
          >
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold border transition-all duration-300 hover:scale-105 group"
                style={{
                  borderColor: `${meta.accent}50`,
                  color: meta.accent,
                  background: `${meta.accent}10`,
                  boxShadow: `0 0 20px ${meta.accent}00`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 0 20px ${meta.accent}40`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 0 20px ${meta.accent}00`;
                }}
              >
                <Github className="w-4 h-4" />
                View Source
                <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" />
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 hover:scale-105 group"
                style={{
                  background: `linear-gradient(135deg, ${meta.color}20, ${meta.color}10)`,
                  color: meta.color,
                  border: `1px solid ${meta.color}60`,
                }}
              >
                <Zap className="w-4 h-4" />
                Live Demo
                <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" />
              </a>
            )}
          </motion.div>
        </div>

        {/* ── Right: Terminal panel ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <TerminalPanel
            lines={meta.terminalLines}
            accent={meta.accent}
            active={isActive}
          />

          {/* Decorative corner lines */}
          <div className="relative mt-4 h-px" style={{ background: `${meta.accent}15` }}>
            <motion.div
              animate={isActive ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.2, delay: 0.5 }}
              className="absolute top-0 left-0 h-full origin-left"
              style={{ background: meta.accent, width: "40%" }}
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   Main Component
   ───────────────────────────────────────── */
export function ProjectsGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [sceneProgresses, setSceneProgresses] = useState<number[]>(
    Array(N).fill(0)
  );

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const raw = latest * N;
    const idx = Math.min(Math.floor(raw), N - 1);
    setActiveIndex(idx);

    const progresses = projectItemsData.map((_, i) => {
      const start = i / N;
      const end = (i + 1) / N;
      const p = (latest - start) / (end - start);
      return Math.min(Math.max(p, 0), 1);
    });
    setSceneProgresses(progresses);
  });

  const handleDotClick = (i: number) => {
    if (!sectionRef.current) return;
    const sectionTop = sectionRef.current.offsetTop;
    const sectionHeight = sectionRef.current.offsetHeight;
    const targetScroll = sectionTop + (i / N) * sectionHeight + 10;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  const activeMeta = PROJECT_META[projectItemsData[activeIndex]?.id] ?? {
    color: "#00f0ff",
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative border-t border-slate-800/80"
      style={{ height: `${N * 100}vh` }}
    >
      {/* ── Sticky stage ── */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Section header — fades out as you scroll past first project */}
        <motion.div
          className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 sm:px-12 lg:px-24 pt-8"
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.08], [1, 0]),
          }}
        >
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded border font-mono text-xs mb-2"
              style={{
                borderColor: "#8a2be260",
                color: "#a855f7",
                background: "#8a2be210",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              10 // OPEN-SOURCE PROTOCOL PROJECTS
            </div>
            <h2 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
              PROJECT{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #ffffff 0%, #a855f7 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                REPOSITORY
              </span>
            </h2>
          </div>
          <div className="hidden sm:block text-slate-500 font-mono text-xs text-right">
            <div>scroll to explore</div>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-xl mt-1"
            >
              ↓
            </motion.div>
          </div>
        </motion.div>

        {/* Project scenes */}
        <div className="relative w-full h-full">
          {projectItemsData.map((project, i) => (
            <ProjectScene
              key={project.id}
              project={project}
              index={i}
              sceneProgress={sceneProgresses[i]}
              isActive={activeIndex === i}
            />
          ))}
        </div>

        {/* Progress rail */}
        <ProgressRail
          current={activeIndex}
          total={N}
          projects={projectItemsData}
          onDotClick={handleDotClick}
        />

        {/* Right edge scroll indicator */}
        <div className="absolute right-4 top-1/4 bottom-1/4 w-0.5 bg-slate-800/50 z-20 hidden lg:block rounded-full">
          <motion.div
            className="w-full rounded-full"
            style={{
              height: `${((activeIndex + sceneProgresses[activeIndex]) / N) * 100}%`,
              background: activeMeta.color,
              boxShadow: `0 0 8px ${activeMeta.color}`,
              transition: "height 0.15s ease, background 0.4s ease, box-shadow 0.4s ease",
            }}
          />
        </div>

        {/* Scene progress bar (bottom) */}
        <SceneProgressBar
          progress={sceneProgresses[activeIndex]}
          color={activeMeta.color}
        />

        {/* Active project color accent — very subtle corner glow */}
        <div
          className="absolute top-0 right-0 w-64 h-64 pointer-events-none z-0"
          style={{
            background: `radial-gradient(circle at top right, ${activeMeta.color}12 0%, transparent 70%)`,
            transition: "background 0.6s ease",
          }}
        />
      </div>
    </section>
  );
}
