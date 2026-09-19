"use client";

import React from "react";
import { ArrowUpRight, ArrowRight, Layers, Cpu, Terminal, Server, ShieldCheck, Sparkles } from "lucide-react";
import { ServiceItem } from "@/data/services";

interface ServiceCardProps {
  service: ServiceItem;
  onExplore: (serviceId: string) => void;
  onStartProject: (serviceId: string) => void;
}

const getServiceIcon = (id: string) => {
  switch (id) {
    case "srv-protocol-engineering":
      return Layers;
    case "srv-smart-contracts":
      return Cpu;
    case "srv-web3-applications":
      return Terminal;
    case "srv-blockchain-infrastructure":
      return Server;
    case "srv-protocol-review":
      return ShieldCheck;
    case "srv-technical-architecture":
    default:
      return Sparkles;
  }
};

const getServiceAccent = (id: string) => {
  switch (id) {
    case "srv-protocol-engineering":
      return { border: "hover:border-[#00F0FF]/50", text: "text-[#00F0FF]", bg: "bg-[#00F0FF]/10", borderBase: "border-[#00F0FF]/30", pulse: "#00F0FF" };
    case "srv-smart-contracts":
      return { border: "hover:border-[#00FF66]/50", text: "text-[#00FF66]", bg: "bg-[#00FF66]/10", borderBase: "border-[#00FF66]/30", pulse: "#00FF66" };
    case "srv-web3-applications":
      return { border: "hover:border-[#38BDF8]/50", text: "text-[#38BDF8]", bg: "bg-[#38BDF8]/10", borderBase: "border-[#38BDF8]/30", pulse: "#38BDF8" };
    case "srv-blockchain-infrastructure":
      return { border: "hover:border-[#A78BFA]/50", text: "text-[#A78BFA]", bg: "bg-[#A78BFA]/10", borderBase: "border-[#A78BFA]/30", pulse: "#A78BFA" };
    case "srv-protocol-review":
      return { border: "hover:border-[#F59E0B]/50", text: "text-[#F59E0B]", bg: "bg-[#F59E0B]/10", borderBase: "border-[#F59E0B]/30", pulse: "#F59E0B" };
    case "srv-technical-architecture":
    default:
      return { border: "hover:border-[#EC4899]/50", text: "text-[#EC4899]", bg: "bg-[#EC4899]/10", borderBase: "border-[#EC4899]/30", pulse: "#EC4899" };
  }
};

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onExplore,
  onStartProject,
}) => {
  const Icon = getServiceIcon(service.id);
  const accent = getServiceAccent(service.id);

  return (
    <div
      onClick={() => onExplore(service.id)}
      className={`group relative flex flex-col justify-between p-6 rounded-2xl bg-[#08080c]/90 border border-white/10 ${accent.border} hover:bg-white/[0.02] transition-all duration-300 shadow-xl cursor-pointer`}
    >
      <div className="flex flex-col gap-5">
        {/* Card Header: Number, Icon, Arrow */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span
              className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs border ${accent.bg} ${accent.borderBase} ${accent.text}`}
            >
              {service.number}
            </span>
            <div className={`p-1.5 rounded-lg border border-white/5 bg-white/[0.02] ${accent.text}`}>
              <Icon className="w-4 h-4" />
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onExplore(service.id);
            }}
            className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/[0.03] border border-white/10 group-hover:border-white/30 text-zinc-400 group-hover:text-white transition-colors"
            title="Inspect Service"
          >
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Title & Short Value Proposition */}
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-[#00F0FF] transition-colors">
            {service.shortTitle}
          </h3>
          <p className="text-xs text-zinc-300 font-light leading-relaxed">
            {service.shortDescription}
          </p>
        </div>

        {/* Animated Technical Visualization Pipeline */}
        <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex flex-col gap-1.5">
          <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider flex items-center justify-between">
            <span>ENGINEERING LIFECYCLE</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </span>

          <div className="flex items-center justify-between gap-1 overflow-x-auto scrollbar-none py-1">
            {service.cardPipeline.map((step, idx) => (
              <React.Fragment key={step}>
                <span className="px-2 py-1 rounded bg-white/[0.04] border border-white/5 text-[10px] font-mono text-zinc-200 whitespace-nowrap group-hover:border-white/20 transition-colors">
                  {step}
                </span>
                {idx < service.cardPipeline.length - 1 && (
                  <span className="text-zinc-600 font-mono text-[10px] shrink-0">→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Technologies Pill String */}
        <div className="flex flex-wrap items-center gap-1.5">
          {service.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded bg-white/[0.02] border border-white/5 text-[10px] font-mono text-zinc-400"
            >
              {tech}
            </span>
          ))}
          {service.technologies.length > 4 && (
            <span className="text-[10px] font-mono text-zinc-600">
              +{service.technologies.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Card Footer: Typical Client & Direct CTA */}
      <div className="flex flex-col gap-3 pt-5 mt-5 border-t border-white/5">
        <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400">
          <span className="text-zinc-600">CLIENT:</span>
          <span className="truncate text-zinc-300">{service.typicalClient}</span>
        </div>

        <div className="flex items-center justify-between pt-1 text-xs font-mono">
          <span className="text-[#00F0FF] flex items-center gap-1.5 font-semibold group-hover:translate-x-1 transition-transform">
            <span>EXPLORE SERVICE</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onStartProject(service.id);
            }}
            className="px-3 py-1 rounded-md bg-white/[0.04] hover:bg-[#00F0FF]/15 border border-white/10 hover:border-[#00F0FF]/50 text-[11px] text-zinc-300 hover:text-[#00F0FF] transition-all"
          >
            Start Project
          </button>
        </div>
      </div>
    </div>
  );
};
