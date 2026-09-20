"use client";

import React from "react";
import { motion } from "framer-motion";

export const ExperienceHero: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      {/* 1. Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
        className="flex items-center gap-3"
      >
        <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
          EXPERIENCE
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
        <span className="text-xs font-mono text-zinc-500 tracking-wider uppercase">
          TECHNICAL PROGRESSION &bull; 2024 — PRESENT
        </span>
      </motion.div>

      {/* 2. Headline with masked upward reveal */}
      <div className="overflow-hidden">
        <motion.h2
          initial={{ y: "100%", opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-[-0.04em] text-white font-sans leading-[1.08]"
        >
          Engineering systems from{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400 font-normal">
            application layer
          </span>{" "}
          to{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 font-normal">
            protocol layer.
          </span>
        </motion.h2>
      </div>

      {/* 3. Supporting Narrative */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        className="text-base sm:text-lg text-zinc-400 font-light max-w-3xl leading-relaxed"
      >
        A progressive evolution through blockchain development, protocol engineering,
        runtime architecture, distributed systems, and technical education.
      </motion.p>
    </div>
  );
};
