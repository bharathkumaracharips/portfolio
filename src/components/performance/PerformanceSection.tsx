"use client";

import { motion } from "framer-motion";
import { performanceMetrics } from "@/data/performance-metrics";
import { useState } from "react";
import { Gauge, TrendingDown, TrendingUp } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const categories = [
  { id: "all", label: "ALL METRICS" },
  { id: "rpc", label: "RPC OPTIMIZATION" },
  { id: "node", label: "NODE OPTIMIZATION" },
  { id: "network", label: "NETWORKING" },
  { id: "db", label: "DATABASE TUNING" },
  { id: "cost", label: "COST REDUCTION" },
  { id: "infra", label: "DEPLOYMENT" },
];

export function PerformanceSection() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredMetrics = selectedCategory === "all"
    ? performanceMetrics
    : performanceMetrics.filter((m) => m.category === selectedCategory);

  return (
    <section id="performance" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">

      <div className="absolute left-1/2 top-0 w-96 h-40 bg-emerald-500/5 blur-3xl pointer-events-none rounded-full -translate-x-1/2" />

      {/* Header */}
      <Reveal direction="up" className="flex flex-col items-start mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-900 border border-emerald-500/30 text-emerald-400 font-mono text-xs mb-3">
          <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
            <Gauge className="w-3.5 h-3.5 text-emerald-400" />
          </motion.div>
          06 // PERFORMANCE DASHBOARD
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          PERFORMANCE{" "}
          <span className="text-shimmer">ENGINEERING</span>
        </h2>
        <p className="text-slate-400 text-base sm:text-lg max-w-3xl font-normal">
          Engineering problems quantified as empirical transformations. Measurable benchmark gains in throughput, latency, and operational expenditure.
        </p>
      </Reveal>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-slate-800/80 pb-4">
        {categories.map((cat) => (
          <motion.button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all",
              selectedCategory === cat.id
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold"
                : "bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
            )}
          >
            {cat.label}
          </motion.button>
        ))}
      </div>

      {/* Metrics Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredMetrics.map((metric, idx) => {
          const isPositiveTPS = metric.improvement.startsWith("+");
          return (
            <motion.div
              key={metric.id}
              layout
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: -30 }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,255,157,0.1)" }}
              className="p-6 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 transition-colors flex flex-col justify-between group cursor-default"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                    {metric.category}
                  </span>
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: idx * 0.06 + 0.2 }}
                    className={cn(
                      "text-xs font-mono font-bold px-2 py-0.5 rounded flex items-center gap-1",
                      isPositiveTPS
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                        : "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30"
                    )}
                  >
                    {isPositiveTPS ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {metric.improvement}
                  </motion.span>
                </div>

                <h3 className="text-base font-bold text-white mb-6 group-hover:text-emerald-400 transition-colors">
                  {metric.title}
                </h3>

                {/* BEFORE vs AFTER */}
                <div className="grid grid-cols-2 gap-3 p-4 rounded-lg bg-slate-900/80 border border-slate-800/80 mb-4 font-mono relative overflow-hidden">
                  {/* Animated separator sweep */}
                  <motion.div
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
                    className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent pointer-events-none"
                  />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">BEFORE</span>
                    <motion.span
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      className="text-sm font-bold text-rose-400/90 line-through"
                    >
                      {metric.before}
                    </motion.span>
                  </div>
                  <div className="flex flex-col border-l border-slate-800 pl-3">
                    <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold mb-1">AFTER</span>
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", delay: idx * 0.05 + 0.3 }}
                      className="text-sm font-bold text-emerald-400"
                    >
                      {metric.after}
                    </motion.span>
                  </div>
                </div>

                {/* Animated progress bar */}
                <div className="h-1 bg-slate-900 rounded-full mb-4 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: isPositiveTPS ? "90%" : "75%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: idx * 0.06, ease: "easeOut" }}
                    className={isPositiveTPS ? "h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full" : "h-full bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-full"}
                  />
                </div>

                <p className="text-xs text-slate-400 leading-relaxed font-normal">{metric.rationale}</p>
              </div>

              <div className="pt-4 mt-6 border-t border-slate-900 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <motion.span
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                  />
                  BENCHMARK VERIFIED
                </span>
                <span>METRIC_ID: #{metric.id}</span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
