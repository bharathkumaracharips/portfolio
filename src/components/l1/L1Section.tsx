"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { l1Pillars, l1FlowSteps } from "@/data/l1-l2-data";
import { Cpu, ArrowRight, Play, Pause } from "lucide-react";
import { Reveal, StaggerReveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function L1Section() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isSimulating, setIsSimulating] = useState(true);

  return (
    <section id="l1" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">

      {/* BG accent */}
      <div className="absolute right-0 top-1/3 w-72 h-72 bg-cyan-500/5 blur-3xl pointer-events-none rounded-full" />

      {/* Header */}
      <Reveal direction="up" className="flex flex-col items-start mb-16">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "auto" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-900 border border-cyan-500/30 text-cyan-400 font-mono text-xs mb-3">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            03 // LAYER 1 PROTOCOL ENGINE
          </div>
        </motion.div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          L1 PROTOCOL &{" "}
          <motion.span
            animate={{ opacity: [1, 0.6, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="text-gradient-cyan"
          >
            STATE CORE
          </motion.span>
        </h2>
        <p className="text-slate-400 text-base sm:text-lg max-w-3xl font-normal">
          Engineering the fundamental primitives of distributed consensus, P2P network topologies, parallel EVM execution, and persistent Merkle state trees.
        </p>
      </Reveal>

      {/* Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
        {l1Pillars.map((pillar, idx) => (
          <Reveal key={pillar.title} delay={idx * 0.08} direction="up">
            <motion.div
              whileHover={{ y: -8, borderColor: "rgba(0,240,255,0.5)", boxShadow: "0 20px 40px rgba(0,240,255,0.1)" }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="p-6 rounded-xl bg-glass-card border border-slate-800 transition-colors h-full flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30"
                  >
                    {pillar.tag}
                  </motion.span>
                  <span className="text-xs font-mono text-slate-500">0{idx + 1}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">{pillar.description}</p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 space-y-1.5 font-mono text-[11px]">
                {pillar.details.map((detail, di) => (
                  <motion.div
                    key={detail}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08 + di * 0.05 }}
                    className="flex items-center gap-2 text-slate-300"
                  >
                    <motion.span
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: di * 0.3 }}
                      className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0"
                    />
                    {detail}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>

      {/* ─── INTERACTIVE TRANSACTION FLOW ──────────────────── */}
      <Reveal direction="up">
        <div className="p-6 sm:p-10 rounded-2xl bg-slate-950 border border-slate-800 relative overflow-hidden">
          {/* Animated data stream overlay */}
          <div className="absolute inset-0 data-stream pointer-events-none opacity-30" />

          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 relative z-10">
            <div>
              <span className="text-xs font-mono text-cyan-400 font-bold tracking-widest block mb-1">ANIMATED LIFECYCLE FLOW</span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">L1 Transaction Execution Pipeline</h3>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSimulating(!isSimulating)}
              className={cn(
                "px-3 py-1 rounded text-xs font-mono font-bold flex items-center gap-1.5 transition-all",
                isSimulating
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                  : "bg-slate-800 text-slate-400 border border-slate-700"
              )}
            >
              {isSimulating ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              {isSimulating ? "SIMULATING ACTIVE" : "PAUSED"}
            </motion.button>
          </div>

          {/* Flow Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 relative z-10">
            {l1FlowSteps.map((item, idx) => {
              const isActive = activeStepIndex === idx;
              return (
                <motion.div
                  key={item.label}
                  onClick={() => setActiveStepIndex(idx)}
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  animate={isActive ? {
                    borderColor: ["rgba(0,240,255,0.4)", "rgba(0,240,255,0.8)", "rgba(0,240,255,0.4)"],
                    boxShadow: ["0 0 10px rgba(0,240,255,0.1)", "0 0 30px rgba(0,240,255,0.3)", "0 0 10px rgba(0,240,255,0.1)"],
                  } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className={cn(
                    "p-4 rounded-xl border cursor-pointer flex flex-col justify-between relative",
                    isActive
                      ? "bg-cyan-950/40 border-cyan-400"
                      : "bg-slate-900/60 border-slate-800/80 hover:border-slate-700"
                  )}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={cn("text-xs font-mono font-bold", isActive ? "text-cyan-400" : "text-slate-500")}>
                      {item.step}
                    </span>
                    <AnimatePresence>
                      {isActive && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="w-2 h-2 rounded-full bg-cyan-400"
                        >
                          <span className="absolute w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="text-sm font-bold text-white mb-1 font-mono tracking-wider">{item.label}</div>
                  <p className="text-[11px] text-slate-400 leading-snug">{item.desc}</p>

                  {idx < l1FlowSteps.length - 1 && (
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1, repeat: Infinity, delay: idx * 0.15 }}
                    >
                      <ArrowRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-4 h-4 text-cyan-500/60" />
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
