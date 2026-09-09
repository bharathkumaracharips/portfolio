"use client";

import React, { useState } from "react";
import {
  servicesData,
  processStagesData,
  engagementModelsData,
  ServiceItem,
} from "@/data/services";
import { heroData } from "@/data/hero";
import { ServicesAssemblyCanvas } from "@/components/canvas/ServicesAssemblyCanvas";
import {
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  FileCode2,
  Layers,
  Send,
  Github,
  Linkedin,
  Mail,
  ShieldCheck,
  Workflow,
  Sparkles,
} from "lucide-react";

export const ServicesSection: React.FC = () => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    servicesData[0].id
  );
  const [activeTab, setActiveTab] = useState<"SPECS" | "PROCESS" | "ENGAGE">("SPECS");
  const [activeProcessIndex, setActiveProcessIndex] = useState<number>(0);

  const activeService: ServiceItem =
    servicesData.find((s) => s.id === selectedServiceId) || servicesData[0];

  const scrollToWork = () => {
    const el = document.getElementById("work");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="services"
      className="relative w-full min-h-screen bg-[#050505] text-[#F5F5F2] py-20 px-4 sm:px-6 lg:px-12 flex flex-col justify-center border-t border-white/5"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[400px] bg-cyan-950/20 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-12 right-12 w-[550px] h-[320px] bg-emerald-950/15 blur-[130px] pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto w-full flex flex-col gap-8">
        {/* Top Header & Telemetry */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono tracking-widest text-[#00F0FF] uppercase">
                SERVICES // 04
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-pulse" />
              <span className="text-[11px] font-mono tracking-wider text-zinc-400 uppercase">
                ARCHITECTURAL CAPABILITIES & SYSTEM ASSEMBLY
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-sans text-white">
              Engineering for Systems That Matter.
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 max-w-2xl font-light leading-relaxed">
              Architecting sovereign L1/L2 runtimes, zero-copy smart contract protocols, high-concurrency RPC infrastructure, and technical curriculum design.
            </p>
          </div>

          {/* Telemetry Scope Badge */}
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF]" />
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">PHILOSOPHY</span>
              <span className="text-xs font-mono font-semibold text-zinc-200">
                Deterministic Systems // Zero Overhead
              </span>
            </div>
          </div>
        </div>

        {/* Top Service Category Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/10">
          {servicesData.map((srv) => {
            const isSelected = srv.id === selectedServiceId;
            return (
              <button
                key={srv.id}
                onClick={() => setSelectedServiceId(srv.id)}
                className={`group flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all duration-200 border ${
                  isSelected
                    ? "bg-[#00F0FF]/10 text-[#00F0FF] border-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                    : "bg-white/[0.02] text-zinc-400 border-white/10 hover:border-white/20 hover:text-zinc-200"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isSelected ? "bg-[#00F0FF] animate-pulse" : "bg-zinc-600"
                  }`}
                />
                <span className="font-semibold">{srv.number}</span>
                <span className="text-zinc-500">//</span>
                <span className="truncate max-w-[140px] sm:max-w-[180px] text-zinc-300">
                  {srv.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Single-Console Grid (3D Assembly + Interactive Inspector) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column: 3D Architectural Assembly Canvas (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <ServicesAssemblyCanvas
              selectedServiceId={selectedServiceId}
              onSelectService={(id) => setSelectedServiceId(id)}
            />

            {/* Active Subsystem Conduits Telemetry */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-mono text-zinc-500 uppercase">
                  ASSEMBLED SUBSYSTEMS:
                </span>
                {activeService.assemblyModules.map((mod, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded bg-[#00F0FF]/5 border border-[#00F0FF]/25 text-[11px] font-mono text-[#00F0FF]"
                  >
                    ⚡ {mod}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                <span className="text-zinc-500">STATE:</span>
                <span className="text-[#00FF66] font-semibold">INTERLOCKED</span>
              </div>
            </div>
          </div>

          {/* Right Column: Unified Multi-Tab Technical Inspector (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col rounded-xl overflow-hidden bg-[#08080c] border border-white/10 shadow-2xl">
            {/* Inspector Navigation Tabs */}
            <div className="flex items-center border-b border-white/10 bg-[#0e0e14]">
              <button
                onClick={() => setActiveTab("SPECS")}
                className={`flex-1 py-3 text-xs font-mono font-semibold transition-all border-b-2 ${
                  activeTab === "SPECS"
                    ? "text-[#00F0FF] border-[#00F0FF] bg-white/[0.03]"
                    : "text-zinc-400 border-transparent hover:text-zinc-200"
                }`}
              >
                01 // SPECS & PROOF
              </button>
              <button
                onClick={() => setActiveTab("PROCESS")}
                className={`flex-1 py-3 text-xs font-mono font-semibold transition-all border-b-2 ${
                  activeTab === "PROCESS"
                    ? "text-[#00F0FF] border-[#00F0FF] bg-white/[0.03]"
                    : "text-zinc-400 border-transparent hover:text-zinc-200"
                }`}
              >
                02 // PROCESS
              </button>
              <button
                onClick={() => setActiveTab("ENGAGE")}
                className={`flex-1 py-3 text-xs font-mono font-semibold transition-all border-b-2 ${
                  activeTab === "ENGAGE"
                    ? "text-[#00F0FF] border-[#00F0FF] bg-white/[0.03]"
                    : "text-zinc-400 border-transparent hover:text-zinc-200"
                }`}
              >
                03 // ENGAGEMENT
              </button>
            </div>

            {/* Tab Body Content */}
            <div className="p-6 flex-1 flex flex-col justify-between gap-6 overflow-y-auto max-h-[520px] scrollbar-thin scrollbar-thumb-white/10">
              {/* TAB 1: SPECIFICATIONS & VERIFIED PROOF */}
              {activeTab === "SPECS" && (
                <div className="flex flex-col gap-6">
                  {/* Service Title & Tagline */}
                  <div className="flex flex-col gap-1.5 border-b border-white/10 pb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-[#00F0FF]">
                        MODULE // {activeService.number}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-500">
                        SHA-256 VERIFIED
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {activeService.title}
                    </h3>
                    <p className="text-xs text-zinc-400 font-light leading-relaxed">
                      {activeService.description}
                    </p>
                  </div>

                  {/* Capabilities */}
                  <div className="flex flex-col gap-2">
                    <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-[#00F0FF]" />
                      <span>CAPABILITIES</span>
                    </span>
                    <div className="grid grid-cols-1 gap-1.5">
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

                  {/* Technologies */}
                  <div className="flex flex-col gap-2">
                    <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                      <FileCode2 className="w-3.5 h-3.5 text-[#00F0FF]" />
                      <span>TECHNOLOGY STACK</span>
                    </span>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {activeService.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/10 text-[11px] font-mono text-zinc-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Deliverables */}
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                      DELIVERABLES
                    </span>
                    <ul className="flex flex-col gap-1 text-xs text-zinc-300 list-disc list-inside font-light">
                      {activeService.deliverables.map((deliv, i) => (
                        <li key={i} className="leading-relaxed">
                          <span className="text-zinc-400">{deliv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Verified Proof in Work */}
                  <div className="flex flex-col gap-2.5 pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-[#00F0FF] uppercase tracking-wider flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5" />
                        <span>VERIFIED PROOF IN WORK</span>
                      </span>
                      <button
                        onClick={scrollToWork}
                        className="text-[11px] font-mono text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
                      >
                        <span>MERKLE WORK</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      {activeService.relevantProjects.map((proj, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all"
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
                            <span className="text-xs font-semibold text-zinc-200">
                              {proj.name}
                            </span>
                            <span className="text-zinc-600 font-mono text-[10px]">//</span>
                            <span className="text-[10px] font-mono text-zinc-400">
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
                              <span>CODE</span>
                              <ArrowUpRight className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: 5-STAGE ENGINEERING PROCESS */}
              {activeTab === "PROCESS" && (
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-1 border-b border-white/10 pb-3">
                    <span className="text-xs font-mono text-[#00F0FF]">
                      PIPELINE // 5 STAGES
                    </span>
                    <h3 className="text-lg font-bold text-white">How I Work</h3>
                    <p className="text-xs text-zinc-400 font-light">
                      Deterministic engineering lifecycle for mission-critical blockchain infrastructure.
                    </p>
                  </div>

                  {/* Stage Stepper Tabs */}
                  <div className="flex items-center gap-1.5 bg-white/[0.02] p-1.5 rounded-lg border border-white/5">
                    {processStagesData.map((stage, idx) => {
                      const isActive = idx === activeProcessIndex;
                      return (
                        <button
                          key={stage.number}
                          onClick={() => setActiveProcessIndex(idx)}
                          className={`flex-1 py-1.5 rounded text-[11px] font-mono transition-all ${
                            isActive
                              ? "bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/40 font-bold"
                              : "text-zinc-400 hover:text-zinc-200"
                          }`}
                        >
                          {stage.number}
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Stage Detail */}
                  {(() => {
                    const stage = processStagesData[activeProcessIndex];
                    return (
                      <div className="flex flex-col gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/10">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-[#00F0FF]">
                            STAGE {stage.number} // {stage.title}
                          </span>
                          <span className="text-[10px] font-mono text-zinc-500">
                            VERIFIED GATE
                          </span>
                        </div>

                        <span className="text-xs font-mono text-zinc-300 font-semibold">
                          {stage.tagline}
                        </span>

                        <p className="text-xs text-zinc-400 font-light leading-relaxed">
                          {stage.description}
                        </p>

                        <div className="pt-3 border-t border-white/5 flex flex-col gap-1">
                          <span className="text-[10px] font-mono text-zinc-500 uppercase">
                            STAGE DELIVERABLE:
                          </span>
                          <span className="text-xs font-mono text-[#00FF66]">
                            ✓ {stage.deliverable}
                          </span>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Process List Quick Summary */}
                  <div className="flex flex-col gap-1.5">
                    {processStagesData.map((s, i) => (
                      <button
                        key={s.number}
                        onClick={() => setActiveProcessIndex(i)}
                        className={`flex items-center justify-between p-2 rounded text-left transition-colors ${
                          i === activeProcessIndex
                            ? "bg-white/[0.04] text-white"
                            : "text-zinc-500 hover:text-zinc-300"
                        }`}
                      >
                        <span className="text-xs font-mono">
                          {s.number}. {s.title}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-500">
                          {s.tagline}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: ENGAGEMENT MODELS & DIRECT CTA */}
              {activeTab === "ENGAGE" && (
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-1 border-b border-white/10 pb-3">
                    <span className="text-xs font-mono text-[#00F0FF]">
                      COLLABORATION // 03
                    </span>
                    <h3 className="text-lg font-bold text-white">Engagement Models</h3>
                    <p className="text-xs text-zinc-400 font-light">
                      Clear engagement structures tailored to defined builds, advisory, or sustained support.
                    </p>
                  </div>

                  {/* Engagement Models Stack */}
                  <div className="flex flex-col gap-2.5">
                    {engagementModelsData.map((model) => (
                      <div
                        key={model.id}
                        className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all flex flex-col gap-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-white">
                            MODEL {model.number} // {model.title}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-white/[0.04] text-[10px] font-mono text-[#00F0FF]">
                            {model.scopeType}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-zinc-400">
                          {model.subtitle}
                        </span>
                        <p className="text-xs text-zinc-300 font-light leading-relaxed">
                          {model.idealFor}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Value-First Custom Scope Banner */}
                  <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-[#00F0FF] shrink-0 mt-0.5" />
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[11px] font-mono text-zinc-200 font-semibold">
                        CUSTOM SCOPE PHILOSOPHY
                      </span>
                      <p className="text-[11px] text-zinc-400 font-light">
                        Technical systems are scoped according to state machine complexity, throughput requirements, and verification gates.
                      </p>
                    </div>
                  </div>

                  {/* Direct Contact Triggers */}
                  <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
                    <a
                      href={`mailto:${heroData.socials.email}?subject=Technical%20Engineering%20Inquiry`}
                      className="group flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#00F0FF] text-black font-semibold text-xs tracking-wider uppercase hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)]"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>START A CONVERSATION</span>
                    </a>

                    <div className="flex items-center justify-center gap-3 pt-2 text-xs font-mono text-zinc-400">
                      <a
                        href={heroData.socials.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#00F0FF] flex items-center gap-1"
                      >
                        <Github className="w-3 h-3" />
                        <span>GitHub</span>
                      </a>
                      <span className="text-zinc-600">|</span>
                      <a
                        href={heroData.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#00F0FF] flex items-center gap-1"
                      >
                        <Linkedin className="w-3 h-3" />
                        <span>LinkedIn</span>
                      </a>
                      <span className="text-zinc-600">|</span>
                      <span className="text-zinc-500">{heroData.socials.email}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
