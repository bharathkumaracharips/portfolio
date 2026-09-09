"use client";

import React, { useState } from "react";
import { servicesData, ServiceItem } from "@/data/services";
import { ServicesAssemblyCanvas } from "@/components/canvas/ServicesAssemblyCanvas";
import { ArrowUpRight, CheckCircle2, Cpu, FileCode2, Layers } from "lucide-react";

export const ServicesInteractive: React.FC = () => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    servicesData[0].id
  );

  const activeService: ServiceItem =
    servicesData.find((s) => s.id === selectedServiceId) || servicesData[0];

  const scrollToWork = () => {
    const el = document.getElementById("work");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col gap-12 pt-8">
      {/* Section Header */}
      <div className="flex flex-col gap-2 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[#00F0FF]">ARCHITECTURE // 01</span>
          <span className="text-zinc-600">//</span>
          <span className="text-xs font-mono text-zinc-400">WHAT I PROVIDE</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Architectural Services & Core Deliverables
        </h2>
      </div>

      {/* Main Two-Column Split (Editorial Navigation + 3D Assembly Canvas) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Architectural Editorial List & Live Detail (7 Cols) */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          {/* Architectural Service Navigation List */}
          <div className="flex flex-col divide-y divide-white/10 rounded-xl bg-white/[0.02] border border-white/5 overflow-hidden">
            {servicesData.map((srv) => {
              const isSelected = srv.id === selectedServiceId;
              return (
                <button
                  key={srv.id}
                  onClick={() => setSelectedServiceId(srv.id)}
                  onMouseEnter={() => setSelectedServiceId(srv.id)}
                  className={`group relative flex items-center justify-between p-4 sm:p-5 text-left transition-all duration-200 ${
                    isSelected
                      ? "bg-white/[0.04] text-white"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.015]"
                  }`}
                >
                  {/* Left Accent Pill */}
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00F0FF] shadow-[0_0_10px_#00F0FF]" />
                  )}

                  <div className="flex items-baseline gap-4">
                    <span
                      className={`text-xs font-mono font-bold transition-colors ${
                        isSelected ? "text-[#00F0FF]" : "text-zinc-600"
                      }`}
                    >
                      {srv.number}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-sm sm:text-base font-semibold tracking-wide font-sans">
                        {srv.title}
                      </span>
                      <span className="text-xs text-zinc-500 font-light truncate max-w-[280px] sm:max-w-[340px]">
                        {srv.tagline}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded border transition-colors ${
                        isSelected
                          ? "bg-[#00F0FF]/10 text-[#00F0FF] border-[#00F0FF]/30"
                          : "bg-white/[0.02] text-zinc-600 border-white/5"
                      }`}
                    >
                      {isSelected ? "ACTIVE" : "INSPECT"}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Service Detailed Specifications Panel */}
          <div className="flex flex-col gap-6 p-6 sm:p-7 rounded-xl bg-[#08080c] border border-white/10 shadow-2xl">
            {/* Header & Tagline */}
            <div className="flex flex-col gap-2 border-b border-white/10 pb-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#00F0FF] tracking-wider">
                  SPECIFICATION // {activeService.number}
                </span>
                <span className="text-[10px] font-mono text-zinc-500">
                  SHA-256 VERIFIED
                </span>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                {activeService.title}
              </h3>
              <p className="text-sm text-zinc-400 font-light leading-relaxed">
                {activeService.description}
              </p>
            </div>

            {/* Genuine Capabilities */}
            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-[#00F0FF]" />
                <span>CAPABILITIES</span>
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeService.capabilities.map((cap, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 p-2 rounded bg-white/[0.02] border border-white/5 text-xs text-zinc-300"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00FF66] shrink-0 mt-0.5" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Relevant Technologies */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                <FileCode2 className="w-3.5 h-3.5 text-[#00F0FF]" />
                <span>SUPPORTED TECHNOLOGIES</span>
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {activeService.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded bg-white/[0.03] border border-white/10 text-xs font-mono text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Tangible Deliverables */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                CORE DELIVERABLES
              </span>
              <ul className="flex flex-col gap-1.5 text-xs text-zinc-300 list-disc list-inside font-light">
                {activeService.deliverables.map((deliv, i) => (
                  <li key={i} className="leading-relaxed">
                    <span className="text-zinc-300">{deliv}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Direct Connection to Work & Real Proof */}
            <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#00F0FF] uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  <span>VERIFIED PROOF IN WORK</span>
                </span>
                <button
                  onClick={scrollToWork}
                  className="text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>ALL WORK</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>

              <div className="flex flex-col gap-2">
                {activeService.relevantProjects.map((proj, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
                      <span className="text-xs font-semibold text-zinc-200">
                        {proj.name}
                      </span>
                      <span className="text-zinc-600 font-mono text-[10px]">//</span>
                      <span className="text-[11px] font-mono text-zinc-400">
                        {proj.role}
                      </span>
                    </div>

                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-mono text-[#00F0FF] hover:underline flex items-center gap-1"
                      >
                        <span>SOURCE</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Assembly Canvas (6 Cols) */}
        <div className="lg:col-span-6 flex flex-col gap-4 sticky top-24">
          <ServicesAssemblyCanvas
            selectedServiceId={selectedServiceId}
            onSelectService={(id) => setSelectedServiceId(id)}
          />

          {/* Module Assembly Map Indicator */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
              <span>ACTIVE ASSEMBLY MODULES:</span>
              <span className="text-[#00F0FF]">
                {activeService.assemblyModules.length} SUBSYSTEMS
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {activeService.assemblyModules.map((mod, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded bg-[#00F0FF]/5 border border-[#00F0FF]/30 text-[11px] font-mono text-[#00F0FF]"
                >
                  ⚡ {mod}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
