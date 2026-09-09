"use client";

import { motion } from "framer-motion";
import { infraPillars } from "@/data/infrastructure";
import { Server } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function InfraSection() {
  return (
    <section id="infrastructure" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
      <div className="absolute left-10 top-40 w-64 h-64 bg-violet-500/6 blur-3xl pointer-events-none rounded-full" />

      <Reveal direction="up" className="flex flex-col items-start mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-900 border border-violet-500/30 text-violet-400 font-mono text-xs mb-3">
          <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <Server className="w-3.5 h-3.5 text-violet-400" />
          </motion.div>
          05 // INFRASTRUCTURE LAYER
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          BARE-METAL <span className="text-gradient-violet">INFRASTRUCTURE</span>
        </h2>
        <p className="text-slate-400 text-base sm:text-lg max-w-3xl font-normal">
          Zero-downtime validator operations, cloud-native DevOps pipelines, and sub-second global observability.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {infraPillars.map((pillar, i) => (
          <Reveal key={pillar.title} delay={i * 0.1} direction={i % 2 === 0 ? "left" : "right"}>
            <motion.div
              whileHover={{ y: -8, borderColor: "rgba(168,85,247,0.5)", boxShadow: "0 20px 40px rgba(168,85,247,0.1)" }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="p-8 rounded-xl bg-glass-card border border-slate-800 group h-full flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-violet-500/10 text-violet-400 border border-violet-500/30">
                  {pillar.tag}
                </span>
                <motion.div
                  animate={{ scale: [1, 0.8, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                  className="w-2 h-2 rounded-full bg-violet-500"
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-violet-400 transition-colors">{pillar.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6 flex-1">{pillar.description}</p>
              <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800/80">
                {pillar.details.map((d, di) => (
                  <motion.span
                    key={d}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + di * 0.05 }}
                    whileHover={{ scale: 1.08 }}
                    className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300"
                  >
                    {d}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
