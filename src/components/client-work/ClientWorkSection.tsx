"use client";

import { motion } from "framer-motion";
import { clientProjectsData } from "@/data/client-work";
import { Briefcase, Lock, ShieldCheck, Quote } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export function ClientWorkSection() {
  return (
    <section id="client-work" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
      <div className="absolute right-0 top-20 w-64 h-64 bg-emerald-500/5 blur-3xl pointer-events-none rounded-full" />

      <Reveal direction="up" className="flex flex-col items-start mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-900 border border-emerald-500/30 text-emerald-400 font-mono text-xs mb-3">
          <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2, repeat: Infinity }}>
            <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
          </motion.div>
          09 // FREELANCE &amp; CLIENT ENGAGEMENTS
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          CLIENT ENGINEERING &{" "}
          <span className="text-gradient-emerald">CONSULTING</span>
        </h2>
        <p className="text-slate-400 text-base sm:text-lg max-w-3xl font-normal">
          High-stakes protocol engineering, node security architecture, and infrastructure optimization engagements.
        </p>
      </Reveal>

      <div className="space-y-8">
        {clientProjectsData.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ x: 4, borderColor: "rgba(0,255,157,0.3)" }}
            className="p-8 rounded-2xl bg-glass-card border border-slate-800 transition-colors group"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <motion.span
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  className={`p-2 rounded-lg ${item.isConfidential ? "bg-amber-500/10 border border-amber-500/30 text-amber-400" : "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"}`}
                >
                  {item.isConfidential ? <Lock className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                </motion.span>
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">{item.clientName}</h3>
                  <span className="text-xs font-mono text-emerald-400">{item.projectType}</span>
                </div>
              </div>
              {item.isConfidential && (
                <motion.span
                  animate={{ borderColor: ["rgba(245,158,11,0.2)", "rgba(245,158,11,0.5)", "rgba(245,158,11,0.2)"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="px-3 py-1 rounded bg-slate-900 text-amber-400/90 font-mono text-xs border border-amber-500/20"
                >
                  NDA // CONFIDENTIAL
                </motion.span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {[
                { label: "CHALLENGE", color: "text-rose-400", text: item.challenge },
                { label: "ENGINEERING", color: "text-cyan-400", text: item.engineering },
                { label: "RESULT", color: "text-emerald-400", text: item.result, highlight: true },
              ].map((col, ci) => (
                <motion.div
                  key={col.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + ci * 0.1 }}
                  className={`p-4 rounded-xl bg-slate-950 border ${ci === 2 ? "border-emerald-500/30" : "border-slate-800"}`}
                >
                  <span className={`text-[10px] font-mono font-bold block mb-1.5 ${col.color}`}>{col.label}</span>
                  <p className={`text-xs leading-relaxed ${col.highlight ? "text-white font-semibold" : "text-slate-300"}`}>{col.text}</p>
                </motion.div>
              ))}
            </div>

            {item.testimonial && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.4 }}
                className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3 italic text-xs text-slate-300 font-normal"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5 }}
                >
                  <Quote className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                </motion.div>
                <div>
                  &quot;{item.testimonial.quote}&quot;
                  <div className="mt-1 text-[11px] font-mono not-italic text-slate-400">
                    — {item.testimonial.role}, {item.testimonial.company}
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
