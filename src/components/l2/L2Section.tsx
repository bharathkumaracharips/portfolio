"use client";

import { motion } from "framer-motion";
import { l2Pillars, l2FlowSteps } from "@/data/l1-l2-data";
import { Zap, ArrowDown, Sparkles } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export function L2Section() {
  return (
    <section id="l2" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">

      {/* Ambient glow */}
      <div className="absolute right-10 top-20 w-80 h-80 bg-emerald-500/6 blur-3xl pointer-events-none rounded-full" />

      {/* Header */}
      <Reveal direction="up" className="flex flex-col items-start mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-900 border border-emerald-500/30 text-emerald-400 font-mono text-xs mb-3">
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
          </motion.div>
          04 // LAYER 2 SCALING ENGINE
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          L2 ROLLUPS &{" "}
          <motion.span
            animate={{ opacity: [1, 0.6, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-gradient-emerald"
          >
            DATA AVAILABILITY
          </motion.span>
        </h2>
        <p className="text-slate-400 text-base sm:text-lg max-w-3xl font-normal">
          Scaling execution throughput by 100x through decentralized sequencers, calldata compression, BLS signature aggregation, and modular Data Availability layers.
        </p>
      </Reveal>

      {/* Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
        {l2Pillars.map((pillar, i) => (
          <Reveal key={pillar.title} delay={i * 0.1} direction={i % 2 === 0 ? "left" : "right"}>
            <motion.div
              whileHover={{ y: -8, borderColor: "rgba(0,255,157,0.5)", boxShadow: "0 20px 40px rgba(0,255,157,0.1)" }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="p-8 rounded-xl bg-glass-card border border-slate-800 group h-full"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  {pillar.tag}
                </span>
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-4 h-4 text-emerald-400 opacity-60" />
                </motion.div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                {pillar.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">{pillar.description}</p>
              <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800/80">
                {pillar.details.map((detail, di) => (
                  <motion.span
                    key={detail}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: di * 0.06 + i * 0.1 }}
                    whileHover={{ scale: 1.08, backgroundColor: "rgba(0,255,157,0.1)" }}
                    className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 transition-colors"
                  >
                    {detail}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>

      {/* ─── L2 → L1 Settlement Pipeline ─────────────────── */}
      <Reveal direction="up">
        <div className="p-8 sm:p-12 rounded-2xl bg-slate-950 border border-slate-800 relative overflow-hidden">
          <div className="absolute inset-0 data-stream pointer-events-none opacity-20" />
          <div className="mb-8 relative z-10">
            <span className="text-xs font-mono text-emerald-400 font-bold tracking-widest block mb-1">SCALING ARCHITECTURE</span>
            <h3 className="text-2xl font-bold text-white">L2 → L1 Batch Compression & Settlement Pipeline</h3>
          </div>

          <div className="flex flex-col gap-4 relative z-10">
            {l2FlowSteps.map((step, idx) => (
              <div key={step.label}>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ x: 6, borderColor: "rgba(0,255,157,0.4)" }}
                  className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      className="w-8 h-8 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-mono font-bold text-xs shrink-0"
                    >
                      {step.step}
                    </motion.div>
                    <div>
                      <h4 className="text-base font-bold text-white font-mono tracking-wide">{step.label}</h4>
                      <p className="text-xs text-slate-400">{step.desc}</p>
                    </div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.12 + 0.3 }}
                    className="text-[11px] font-mono px-3 py-1 rounded bg-slate-950 text-slate-400 border border-slate-800 shrink-0"
                  >
                    {idx === 0 && "Sub-second dApp Ingestion"}
                    {idx === 1 && "<50ms Soft Finality Receipt"}
                    {idx === 2 && "94.2% Calldata Compression"}
                    {idx === 3 && "EIP-4844 Blob / Celestia Post"}
                    {idx === 4 && "L1 Cryptographic State Finality"}
                  </motion.div>
                </motion.div>

                {idx < l2FlowSteps.length - 1 && (
                  <div className="flex justify-center my-1">
                    <motion.div
                      animate={{ y: [0, 4, 0], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: idx * 0.15 }}
                    >
                      <ArrowDown className="w-4 h-4 text-emerald-500/70" />
                    </motion.div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
