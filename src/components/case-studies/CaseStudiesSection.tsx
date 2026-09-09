"use client";

import { motion } from "framer-motion";
import { caseStudiesData } from "@/data/case-studies";
import { BookOpen, ArrowUpRight, Activity } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function CaseStudiesSection() {
  return (
    <section id="case-studies" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
      <div className="absolute right-0 top-20 w-72 h-72 bg-amber-500/5 blur-3xl pointer-events-none rounded-full" />

      <Reveal direction="up" className="flex flex-col items-start mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-900 border border-amber-500/30 text-amber-400 font-mono text-xs mb-3">
          <motion.div animate={{ rotate: [-5, 5, -5] }} transition={{ duration: 2, repeat: Infinity }}>
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
          </motion.div>
          07 // ENGINEERING CASE STUDIES
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          DEEP DIVE <span className="text-gradient-fire">CASE STUDIES</span>
        </h2>
        <p className="text-slate-400 text-base sm:text-lg max-w-3xl font-normal">
          Protocol debugging case studies, complete with root-cause analysis, system-level solutions, and benchmark-verified outcomes.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {caseStudiesData.map((cs, i) => (
          <motion.div
            key={cs.id}
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8, borderColor: "rgba(255,184,0,0.4)" }}
            className="p-8 rounded-2xl bg-glass-card border border-slate-800 hover:shadow-[0_20px_40px_rgba(255,184,0,0.1)] transition-all flex flex-col group"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="px-2.5 py-1 rounded text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                {cs.category}
              </span>
              <span className="text-xs font-mono text-slate-500">{cs.clientType}</span>
            </div>

            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">{cs.title}</h3>
            <p className="text-xs font-mono text-slate-500 mb-4">Problem: {cs.problem}</p>
            <p className="text-sm text-slate-300 leading-relaxed mb-6 flex-1">{cs.result}</p>

            {/* Outcome metrics bar */}
            <div className="grid grid-cols-2 gap-3 p-4 rounded-lg bg-slate-950 border border-slate-800 font-mono mb-4">
              {cs.metrics.slice(0, 2).map((out, oi) => (
                <motion.div
                  key={oi}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 + oi * 0.1 + 0.3 }}
                  className="flex flex-col"
                >
                  <span className="text-[9px] text-slate-500 uppercase tracking-wider mb-0.5">{out.label}</span>
                  <motion.span
                    initial={{ scale: 0.8 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", delay: i * 0.15 + oi * 0.1 + 0.4 }}
                    className="text-sm font-bold text-amber-400"
                  >
                    {out.value}
                  </motion.span>
                </motion.div>
              ))}
            </div>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-800/80">
              {cs.technologies.slice(0, 5).map((t, ti) => (
                <motion.span
                  key={t}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 + ti * 0.04 + 0.5 }}
                  className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300"
                >
                  {t}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
