"use client";

import { motion } from "framer-motion";
import { testimonialsData } from "@/data/testimonials";
import { Quote, Star, MessageSquare } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/3 to-transparent pointer-events-none" />

      <Reveal direction="up" className="flex flex-col items-start mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-900 border border-emerald-500/30 text-emerald-400 font-mono text-xs mb-3">
          <motion.div animate={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}>
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
          </motion.div>
          14 // EXECUTIVE TESTIMONIALS
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          CLIENT & CTO <span className="text-gradient-emerald">REVIEWS</span>
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonialsData.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 50, rotateX: 15 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -10, boxShadow: "0 30px 60px rgba(0,255,157,0.12)" }}
            className="p-8 rounded-2xl bg-glass-card border border-slate-800 hover:border-emerald-500/40 transition-colors flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 1 }}
                >
                  <Quote className="w-8 h-8 text-emerald-400 opacity-70" />
                </motion.div>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <motion.div
                      key={si}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 + si * 0.08 + 0.3, type: "spring" }}
                    >
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    </motion.div>
                  ))}
                </div>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed italic mb-8">&quot;{t.quote}&quot;</p>
            </div>

            <div className="pt-4 border-t border-slate-800/80 font-mono">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 + 0.5 }}
                className="text-xs font-bold text-white block"
              >
                {t.role}
              </motion.span>
              <span className="text-xs text-emerald-400 block">{t.company}</span>
              <span className="text-[10px] text-slate-500 block mt-1">PROJECT: {t.project}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
