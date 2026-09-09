"use client";

import { motion } from "framer-motion";
import { Compass } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const stats = [
  { label: "TARGET EXECUTION", value: "PARALLEL EVM", color: "text-cyan-400" },
  { label: "PRIMARY DA", value: "EIP-4844", color: "text-emerald-400" },
  { label: "ORCHESTRATION", value: "KUBERNETES", color: "text-violet-400" },
  { label: "DB STORAGE", value: "ROCKSDB", color: "text-amber-400" },
];

const principles = [
  "Determinism and security supersede premature hacks.",
  "Latency is an empirical metric — measure every opcode.",
  "Infrastructure must tolerate network partitions without state corruption.",
];

export function AboutSection() {
  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
      <div className="absolute left-0 top-1/2 w-64 h-64 bg-cyan-500/5 blur-3xl pointer-events-none rounded-full" />

      <Reveal direction="up" className="flex flex-col items-start mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-900 border border-slate-800 text-cyan-400 font-mono text-xs mb-3">
          <motion.div animate={{ rotate: [0, 180, 360] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
          </motion.div>
          15 // ENGINEERING PHILOSOPHY
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          SYSTEMS OVER ABSTRACT{" "}
          <span className="text-shimmer">TEMPLATES</span>
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6 text-slate-300 text-base sm:text-lg leading-relaxed font-normal"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            I operate at the intersection of low-level protocol engineering and production distributed infrastructure. I view blockchain networks not as speculative assets, but as strict deterministic state transition systems governed by P2P topologies, memory execution constraints, and Byzantine consensus guarantees.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            My engineering practice focuses on root-cause optimization: eliminating locks in mempool queues, zero-copy JSON-RPC deserialization in Rust, parallelizing non-conflicting EVM state transactions, and automating stateful validator failovers across multi-region cloud topology.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="p-6 rounded-xl bg-slate-950 border border-cyan-500/30 font-mono text-xs space-y-3"
          >
            <div className="text-cyan-400 font-bold tracking-widest flex items-center gap-2">
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ▶
              </motion.span>
              CORE PRINCIPLES
            </div>
            {principles.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-start gap-2 text-slate-300"
              >
                <motion.span
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.6 }}
                  className="text-cyan-500 shrink-0"
                >
                  {i + 1}.
                </motion.span>
                {p}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Stats dashboard */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="p-8 rounded-2xl bg-glass-card border border-slate-800 space-y-6 font-mono"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <span className="text-xs text-slate-400">ENGINEERING CORE</span>
            <motion.span
              animate={{ color: ["#00f0ff", "#00ff9d", "#8a2be2", "#00f0ff"] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="text-xs font-bold"
            >
              RUST // GO // SOLIDITY
            </motion.span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-center">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", delay: i * 0.1 }}
                whileHover={{ scale: 1.05, borderColor: "rgba(0,240,255,0.4)" }}
                className="p-4 rounded-xl bg-slate-950 border border-slate-800 transition-colors"
              >
                <span className="text-[10px] text-slate-500 block mb-1">{stat.label}</span>
                <motion.span
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5 }}
                  className={`text-lg sm:text-xl font-extrabold ${stat.color}`}
                >
                  {stat.value}
                </motion.span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
