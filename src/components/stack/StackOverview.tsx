"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { stackLayers } from "@/data/stack";
import { ArrowDown, Layers, CheckCircle2 } from "lucide-react";
import { Reveal, StaggerReveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function StackOverview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);

  return (
    <section id="stack" ref={containerRef} className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

      {/* Ambient side glow */}
      <div className="absolute left-0 top-1/2 w-40 h-96 bg-cyan-500/5 blur-3xl pointer-events-none rounded-full" />

      {/* Header */}
      <Reveal direction="up" className="flex flex-col items-start mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-900 border border-slate-800 text-cyan-400 font-mono text-xs mb-3">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
          </motion.div>
          02 // SYSTEM BACKBONE
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          THE <span className="text-shimmer">STACK</span>
        </h2>
        <p className="text-slate-400 text-base sm:text-lg max-w-2xl font-normal">
          From low-level Layer 1 consensus down to zero-downtime production operations.
        </p>
      </Reveal>

      {/* Stack with scroll-driven connector line */}
      <div className="relative flex flex-col gap-6">
        {/* Animated vertical connector */}
        <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-slate-800/80 z-10 overflow-hidden">
          <motion.div
            style={{ height: lineHeight }}
            className="w-full bg-gradient-to-b from-cyan-500 via-emerald-500 to-violet-500"
          />
        </div>

        {stackLayers.map((layer, index) => {
          const isCyan = layer.color === "cyan";
          const isEmerald = layer.color === "emerald";
          const isViolet = layer.color === "violet";

          return (
            <Reveal key={layer.id} delay={index * 0.1} direction="left">
              <motion.div
                whileHover={{ x: 6, scale: 1.005, borderColor: "rgba(0,240,255,0.5)" }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className={cn(
                  "relative p-6 sm:p-8 rounded-xl bg-glass-card border transition-colors duration-200",
                  "hover:bg-slate-900/90 cursor-default"
                )}
              >
                {/* Connector arrow */}
                {index < stackLayers.length - 1 && (
                  <div className="absolute left-[-24px] bottom-[-30px] z-20 flex flex-col items-center">
                    <motion.div
                      animate={{ y: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
                    >
                      <ArrowDown className="w-4 h-4 text-cyan-400" />
                    </motion.div>
                  </div>
                )}

                {/* Active dot on connector */}
                <div className="absolute left-[-27px] top-6 z-20">
                  <motion.div
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    className={cn(
                      "w-3 h-3 rounded-full border-2",
                      isCyan ? "bg-cyan-500 border-cyan-400 shadow-[0_0_10px_#00f0ff]" :
                      isEmerald ? "bg-emerald-500 border-emerald-400 shadow-[0_0_10px_#00ff9d]" :
                      isViolet ? "bg-violet-500 border-violet-400 shadow-[0_0_10px_#8a2be2]" :
                      "bg-amber-500 border-amber-400 shadow-[0_0_10px_#ffb800]"
                    )}
                  />
                </div>

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <motion.div
                      whileHover={{ rotate: 15, scale: 1.1 }}
                      className={cn(
                        "w-12 h-12 rounded-lg flex items-center justify-center font-mono font-bold text-sm shrink-0 border",
                        isCyan && "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
                        isEmerald && "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
                        isViolet && "bg-violet-500/10 text-violet-400 border-violet-500/30",
                        !isCyan && !isEmerald && !isViolet && "bg-amber-500/10 text-amber-400 border-amber-500/30"
                      )}
                    >
                      0{index + 1}
                    </motion.div>
                    <div>
                      <div className="text-xs font-mono text-slate-500 mb-1">{layer.code}</div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-1">{layer.name}</h3>
                      <div className="text-xs font-mono text-cyan-400 mb-3">{layer.subtitle}</div>
                      <p className="text-sm text-slate-300 leading-relaxed max-w-xl">{layer.description}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-start lg:items-end gap-3 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-800/80">
                    <div className="flex flex-wrap gap-1.5 max-w-xs justify-start lg:justify-end">
                      {layer.technologies.map((tech, ti) => (
                        <motion.span
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: ti * 0.05 }}
                          whileHover={{ scale: 1.1 }}
                          className="px-2.5 py-1 rounded bg-slate-900/90 border border-slate-800 text-[11px] font-mono text-slate-300 cursor-default"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-400"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.4 }}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </motion.div>
                      {layer.metrics}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
