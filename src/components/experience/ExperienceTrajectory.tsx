"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const trajectoryStages = [
  { label: "APPLICATIONS", sub: "Frontend & Web3 Client" },
  { label: "BLOCKCHAIN", sub: "Smart Contracts & State" },
  { label: "PROTOCOLS", sub: "P2P Network & Wire Format" },
  { label: "RUNTIMES", sub: "Deterministic WASM & FRAME" },
  { label: "CONSENSUS", sub: "BFT, PoS & PoI Finality" },
  { label: "DISTRIBUTED SYSTEMS", sub: "Sovereign Layer-1 Networks" },
];

export const ExperienceTrajectory: React.FC = () => {
  const [pulseCycle, setPulseCycle] = useState(0);

  // Subtle packet pulse traversing down the trajectory every 6s
  useEffect(() => {
    const timer = setInterval(() => {
      setPulseCycle((prev) => prev + 1);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full pt-4 pb-8">
      {/* Container Box */}
      <div className="rounded-xl bg-[#09090D] border border-white/[0.08] p-5 sm:p-7 flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span className="text-zinc-400 uppercase tracking-wider text-[11px] font-semibold">
              TECHNICAL TRAJECTORY
            </span>
          </div>
          <span className="text-zinc-500 text-[11px]">
            APPLICATION LAYER &rarr; PROTOCOL LAYER
          </span>
        </div>

        {/* Desktop Horizontal Trajectory */}
        <div className="hidden md:block relative w-full select-none py-2">
          {/* Background Connecting Rail */}
          <div className="absolute top-4 left-4 right-4 h-px bg-white/[0.08]" />

          {/* Pulse traversing horizontally */}
          <motion.div
            key={`traj-pulse-${pulseCycle}`}
            className="absolute top-3.5 left-4 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,240,255,0.8)] z-10 pointer-events-none"
            animate={{
              left: ["1%", "98%"],
              opacity: [0, 1, 1, 0],
            }}
            transition={{ duration: 2.8, ease: "easeInOut" }}
          />

          <div className="grid grid-cols-6 gap-3 relative z-10">
            {trajectoryStages.map((stage, idx) => (
              <motion.div
                key={stage.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.15 + idx * 0.08 }}
                className="flex flex-col items-start gap-2"
              >
                {/* Node Point */}
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#0C0C12] border border-white/[0.12] text-[11px] font-mono text-cyan-400 font-semibold shadow-sm">
                  0{idx + 1}
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-mono font-medium text-zinc-200">
                    {stage.label}
                  </span>
                  <span className="text-[10px] text-zinc-500 font-sans">
                    {stage.sub}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Compact Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:hidden gap-3 pt-1">
          {trajectoryStages.map((stage, idx) => (
            <div
              key={stage.label}
              className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] flex flex-col gap-1"
            >
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-cyan-400">0{idx + 1}</span>
                <span className="text-zinc-600">&darr;</span>
              </div>
              <span className="text-xs font-mono font-medium text-zinc-200 truncate">
                {stage.label}
              </span>
              <span className="text-[10px] text-zinc-500 truncate">
                {stage.sub}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
