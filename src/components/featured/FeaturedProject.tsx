"use client";

import { motion } from "framer-motion";
import { featuredProjectData } from "@/data/featured";
import { Sparkles, ExternalLink, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export function FeaturedProject() {
  return (
    <section id="cbc-chain" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">

      <Reveal direction="up">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-900 border border-cyan-500/30 text-cyan-400 font-mono text-xs mb-6">
          <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }}>
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          </motion.div>
          08 // FLAGSHIP PROTOCOL SHOWCASE
        </div>
      </Reveal>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="p-8 sm:p-14 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-cyan-500/30 relative overflow-hidden shadow-2xl"
      >
        {/* Multi-layer glowing backdrop */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.05, 0.12, 0.05] }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
          className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-3xl pointer-events-none"
        />

        {/* Scan beam inside card */}
        <div className="scan-beam opacity-30" />

        {/* Title Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12 relative z-10">
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-xs font-mono text-cyan-400 font-bold tracking-widest block mb-2"
            >
              {featuredProjectData.category}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-3 text-glitch"
            >
              {featuredProjectData.name}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-300 font-normal max-w-2xl"
            >
              {featuredProjectData.tagline}
            </motion.p>
          </div>

          <motion.a
            href={featuredProjectData.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.07, boxShadow: "0 0 40px rgba(0,240,255,0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-500 text-slate-950 font-mono font-bold text-xs transition-all glow-cyan shrink-0"
          >
            PROJECT CODE
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        </div>

        {/* Metrics Grid — animated counters */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 rounded-xl bg-slate-950/80 border border-slate-800 mb-12 font-mono relative z-10">
          {featuredProjectData.metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", delay: i * 0.1 }}
              whileHover={{ scale: 1.08 }}
              className="flex flex-col items-center justify-center p-3 text-center group"
            >
              <span className="text-[10px] text-slate-500 mb-1 tracking-wider uppercase">{m.label}</span>
              <motion.span
                animate={{ textShadow: ["0 0 0px #00f0ff", "0 0 20px #00f0ff", "0 0 0px #00f0ff"] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                className="text-2xl sm:text-3xl font-extrabold text-gradient-cyan"
              >
                {m.value}
              </motion.span>
            </motion.div>
          ))}
        </div>

        {/* Architectural columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 relative z-10">
          {[
            { label: "PROTOCOL CONSENSUS", color: "text-cyan-400", text: featuredProjectData.architecture.protocol },
            { label: "PARALLEL EXECUTION", color: "text-emerald-400", text: featuredProjectData.architecture.execution },
            { label: "INFRASTRUCTURE ORCHESTRATION", color: "text-violet-400", text: featuredProjectData.architecture.infrastructure },
            { label: "PERSISTENT STATE STORAGE", color: "text-amber-400", text: featuredProjectData.architecture.storage },
          ].map((col, i) => (
            <motion.div
              key={col.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -4, borderColor: "rgba(0,240,255,0.3)" }}
              className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 transition-colors"
            >
              <span className={`text-xs font-mono font-bold block mb-2 ${col.color}`}>{col.label}</span>
              <p className="text-sm text-slate-300 leading-relaxed">{col.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Contributions */}
        <div className="relative z-10 border-t border-slate-800 pt-8">
          <h4 className="text-base font-bold text-white font-mono mb-4">MY CORE ENGINEERING CONTRIBUTIONS</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-300">
            {featuredProjectData.myContribution.map((contrib, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-2.5"
              >
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                >
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                </motion.div>
                <span>{contrib}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
