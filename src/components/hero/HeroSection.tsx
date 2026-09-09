"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Github, Linkedin, Terminal, Zap, Activity, Cpu } from "lucide-react";
import { heroData } from "@/data/hero";
import { NodeMeshCanvas } from "@/components/canvas/NodeMeshCanvas";
import { useTypewriter } from "@/hooks/useAnimation";

const TAGLINES = [
  "L1 Consensus & Execution Engine",
  "L2 Rollup & Sequencer Architecture",
  "High-Performance RPC Infrastructure",
  "Parallel EVM & State Optimization",
  "Distributed System Engineering",
];

const statusLines = [
  { label: "CONSENSUS", value: "BFT v2.4 // ACTIVE", color: "text-emerald-400" },
  { label: "MEMPOOL", value: "LOCK-FREE // 18.5K TPS", color: "text-cyan-400" },
  { label: "P2P PEERS", value: "1,247 ACTIVE NODES", color: "text-violet-400" },
  { label: "BLOCK TIME", value: "850ms FINALITY", color: "text-amber-400" },
];

export function HeroSection() {
  const [blockHeight, setBlockHeight] = useState(19482104);
  const [hash, setHash] = useState("0x7f8a3b92e401c9b8");
  const [taglineIdx, setTaglineIdx] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(false);

  const typedTagline = useTypewriter(TAGLINES[taglineIdx], 45, true);

  useEffect(() => {
    const t1 = setInterval(() => {
      setBlockHeight((p) => p + 1);
      setHash("0x" + Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join(""));
    }, 2200);

    const t2 = setInterval(() => {
      setTaglineIdx((p) => (p + 1) % TAGLINES.length);
    }, 4000);

    const t3 = setTimeout(() => setHeaderVisible(true), 100);

    return () => { clearInterval(t1); clearInterval(t2); clearTimeout(t3); };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Animated Canvas Background */}
      <NodeMeshCanvas />

      {/* Ambient Orbs */}
      <div className="ambient-orb absolute top-20 left-1/4 w-96 h-96 bg-cyan-500/10" />
      <div className="ambient-orb absolute bottom-20 right-1/4 w-80 h-80 bg-violet-500/10" style={{ animationDelay: "3s" }} />
      <div className="ambient-orb absolute top-1/2 left-10 w-64 h-64 bg-emerald-500/8" style={{ animationDelay: "6s" }} />

      {/* Scan beam */}
      <div className="scan-beam" />

      {/* ─── TOP STATUS BAR ─────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full flex flex-wrap items-center justify-between gap-4 py-2.5 px-4 rounded-xl bg-slate-900/70 border border-cyan-500/20 backdrop-blur-md font-mono text-xs"
      >
        <div className="flex items-center gap-3">
          <motion.span
            animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex h-2 w-2 relative"
          >
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
          </motion.span>
          <span className="text-white font-bold tracking-wider">{heroData.status.nodeId}</span>
          <span className="text-slate-600">|</span>
          <span className="text-cyan-400">{heroData.status.network}</span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <motion.div
            key={blockHeight}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-1.5 text-slate-300"
          >
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            BLOCK #{blockHeight.toLocaleString()}
          </motion.div>
          <div className="hidden sm:flex items-center gap-1.5 text-[10px]">
            <span className="text-slate-600">HASH:</span>
            <motion.span key={hash} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-cyan-400/80">
              {hash}
            </motion.span>
          </div>
        </div>
      </motion.div>

      {/* ─── MAIN HERO CONTENT ──────────────────────────────── */}
      <div className="relative z-10 my-auto py-8 flex flex-col items-start max-w-5xl">

        {/* Role Badge */}
        <motion.div
          initial={{ opacity: 0, x: -40, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 font-mono text-xs font-semibold mb-6 tracking-widest border-beam"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <Terminal className="w-3.5 h-3.5" />
          </motion.div>
          {heroData.role}
        </motion.div>

        {/* Name */}
        <div className="overflow-hidden mb-3">
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight text-white leading-none"
          >
            {heroData.name.split(" ").slice(0, 2).join(" ")}
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-6">
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight text-gradient-cyan leading-none"
          >
            {heroData.name.split(" ").slice(2).join(" ")}
          </motion.h1>
        </div>

        {/* Animated typewriter tagline */}
        <AnimatePresence mode="wait">
          <motion.div
            key={taglineIdx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-lg sm:text-2xl font-mono text-cyan-300/80 mb-4 h-8 cursor-blink"
          >
            {typedTagline}
          </motion.div>
        </AnimatePresence>

        {/* Statement */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed mb-10 max-w-3xl"
        >
          {heroData.statement}
        </motion.p>

        {/* Live Status Grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 1.0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10 w-full max-w-2xl"
        >
          {statusLines.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.1 + i * 0.1 }}
              whileHover={{ scale: 1.05, borderColor: "rgba(0,240,255,0.4)" }}
              className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 font-mono text-center card-hover-lift"
            >
              <div className="text-[9px] text-slate-500 mb-1 tracking-widest">{s.label}</div>
              <div className={`text-[10px] font-bold ${s.color}`}>{s.value}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2 }}
          className="flex flex-wrap items-center gap-4"
        >
          <motion.a
            href="#stack"
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(0,240,255,0.4)" }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-cyan-500 text-slate-950 font-mono font-bold text-sm transition-all glow-cyan-intense shadow-lg"
          >
            Explore My Work
            <motion.div animate={{ y: [0, 4, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>
              <ArrowDown className="w-4 h-4" />
            </motion.div>
          </motion.a>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, borderColor: "rgba(0,240,255,0.6)" }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 text-slate-200 font-mono font-medium text-sm border border-slate-700 hover:text-cyan-400 transition-all"
          >
            Let&apos;s Work Together
            <Zap className="w-4 h-4 text-emerald-400" />
          </motion.a>

          <div className="flex items-center gap-3">
            {[
              { href: heroData.socials.github, icon: <Github className="w-5 h-5" />, label: "GitHub" },
              { href: heroData.socials.linkedin, icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn" },
            ].map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-cyan-500/40 transition-colors"
                aria-label={s.label}
              >
                {s.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ─── BOTTOM INDICATOR ───────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        className="relative z-10 flex items-center justify-between border-t border-slate-800/80 pt-4 font-mono text-xs text-slate-500"
      >
        <div className="flex items-center gap-2">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
            <Cpu className="w-4 h-4 text-cyan-400" />
          </motion.div>
          SCROLL TO ENTER THE PROTOCOL ARCHITECTURE
        </div>

        {/* Waveform */}
        <div className="hidden sm:flex items-end gap-0.5 h-8">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-1 rounded-full bg-cyan-500/60"
              animate={{ height: [4, 16 + Math.random() * 24, 4] }}
              transition={{ duration: 0.8 + Math.random() * 0.4, repeat: Infinity, delay: i * 0.08 }}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
