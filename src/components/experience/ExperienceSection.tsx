"use client";

import { motion } from "framer-motion";
import { experienceData } from "@/data/experience";
import { Briefcase, Calendar, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export function ExperienceSection() {
  return (
    <section id="experience" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
      <div className="absolute right-0 top-1/3 w-64 h-64 bg-emerald-500/5 blur-3xl pointer-events-none rounded-full" />

      <Reveal direction="up" className="flex flex-col items-start mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-900 border border-emerald-500/30 text-emerald-400 font-mono text-xs mb-3">
          <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
          12 // CAREER TIMELINE & MEASURABLE OUTCOMES
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          ENGINEERING <span className="text-gradient-emerald">EXPERIENCE</span>
        </h2>
        <p className="text-slate-400 text-base sm:text-lg max-w-3xl font-normal">
          Track record of engineering distributed consensus engines, high-availability RPC networks, and automated protocol deployments.
        </p>
      </Reveal>

      <div className="relative border-l-2 border-slate-800 ml-4 sm:ml-8 space-y-12 pl-6 sm:pl-10">
        {/* Animated vertical fill */}
        <motion.div
          initial={{ height: "0%" }}
          whileInView={{ height: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute left-[-1px] top-0 w-[2px] bg-gradient-to-b from-emerald-500 via-cyan-500 to-violet-500"
        />

        {experienceData.map((exp, idx) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative group"
          >
            {/* Timeline node */}
            <motion.div
              whileHover={{ scale: 1.4 }}
              animate={{ boxShadow: ["0 0 5px #00ff9d", "0 0 15px #00ff9d", "0 0 5px #00ff9d"] }}
              transition={{ duration: 2, repeat: Infinity, delay: idx * 0.7 }}
              className="absolute -left-[31px] sm:-left-[47px] top-6 w-4 h-4 rounded-full bg-slate-950 border-2 border-emerald-400 group-hover:bg-emerald-400 transition-colors"
            />

            <motion.div
              whileHover={{ x: 6, borderColor: "rgba(0,255,157,0.4)" }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="p-8 rounded-2xl bg-glass-card border border-slate-800 transition-colors"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                <div>
                  <motion.span
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 + 0.3 }}
                    className="text-xs font-mono text-emerald-400 font-bold tracking-widest block mb-1 overflow-hidden whitespace-nowrap"
                  >
                    {exp.organization}
                  </motion.span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{exp.position}</h3>
                </div>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400 shrink-0">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  {exp.period}
                </span>
              </div>

              <div className="mb-6 space-y-2">
                <span className="text-xs font-mono text-slate-500 uppercase tracking-widest block mb-2">
                  MAJOR ENGINEERING ACHIEVEMENTS
                </span>
                {exp.achievements.map((ach, ai) => (
                  <motion.div
                    key={ai}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 + ai * 0.08 + 0.4 }}
                    className="flex items-start gap-2.5 text-sm text-slate-200"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: ai * 0.5 }}
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    </motion.div>
                    <span>{ach}</span>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-800/80">
                {exp.technologies.map((tech, ti) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.7 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 + ti * 0.04 + 0.5 }}
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(0,255,157,0.1)" }}
                    className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300 transition-colors"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
