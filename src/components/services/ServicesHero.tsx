"use client";

import React from "react";
import { Cpu, ShieldCheck, Terminal, Layers, Server, Sparkles } from "lucide-react";

export const ServicesHero: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 pb-6 border-b border-white/10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex flex-col gap-3 max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono tracking-widest text-[#00F0FF] uppercase">
              SERVICES // 06
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-pulse" />
            <span className="text-[11px] font-mono tracking-wider text-zinc-400 uppercase">
              ENGINEERING CATALOG & CAPABILITIES
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-sans text-white leading-tight">
            Engineering for Systems That Matter.
          </h2>

          <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
            I design and build blockchain protocols, smart-contract systems and distributed infrastructure — from architecture to production.
          </p>
        </div>

        {/* Philosophy Badge */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/10 shrink-0">
          <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
              CORE PHILOSOPHY
            </span>
            <span className="text-xs font-mono font-semibold text-zinc-200">
              Deterministic Systems // Zero Overhead
            </span>
          </div>
        </div>
      </div>

      {/* Domain Focus Tags */}
      <div className="flex flex-wrap items-center gap-2 pt-2 text-[11px] font-mono">
        <span className="text-zinc-500 text-xs">FOCUS AREAS:</span>
        {[
          { label: "PROTOCOLS", icon: Layers, color: "text-[#00F0FF] border-[#00F0FF]/30 bg-[#00F0FF]/5" },
          { label: "SMART CONTRACTS", icon: Cpu, color: "text-[#00FF66] border-[#00FF66]/30 bg-[#00FF66]/5" },
          { label: "WEB3 PRODUCTS", icon: Terminal, color: "text-[#38BDF8] border-[#38BDF8]/30 bg-[#38BDF8]/5" },
          { label: "INFRASTRUCTURE & DEVOPS", icon: Server, color: "text-[#A78BFA] border-[#A78BFA]/30 bg-[#A78BFA]/5" },
          { label: "PROTOCOL REVIEW", icon: ShieldCheck, color: "text-[#F59E0B] border-[#F59E0B]/30 bg-[#F59E0B]/5" },
          { label: "ARCHITECTURE & ADVISORY", icon: Sparkles, color: "text-[#EC4899] border-[#EC4899]/30 bg-[#EC4899]/5" },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <span
              key={item.label}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] tracking-wide transition-all ${item.color}`}
            >
              <Icon className="w-3 h-3" />
              <span>{item.label}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
};
