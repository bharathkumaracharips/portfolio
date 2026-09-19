"use client";

import React, { useEffect } from "react";
import { X, ArrowLeft, Users, AlertCircle, Sparkles, Send } from "lucide-react";
import { ServiceItem, servicesData } from "@/data/services";
import { ServicePipeline } from "./ServicePipeline";
import { CapabilityTable } from "./CapabilityTable";
import { DeliverablesGrid } from "./DeliverablesGrid";
import { ProofOfWork } from "./ProofOfWork";
import { EngagementModels } from "./EngagementModels";

interface ServiceInspectorProps {
  service: ServiceItem;
  isOpen: boolean;
  onClose: () => void;
  onSelectService: (serviceId: string) => void;
  onSelectEngagementModel: (type: "ARCHITECTURE" | "BUILD" | "OPTIMIZE") => void;
  onStartProject: () => void;
}

export const ServiceInspector: React.FC<ServiceInspectorProps> = ({
  service,
  isOpen,
  onClose,
  onSelectService,
  onSelectEngagementModel,
  onStartProject,
}) => {
  // Lock body scroll and listen for Escape key
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex flex-col bg-[#050508]/95 backdrop-blur-2xl overflow-y-auto animate-in fade-in duration-200"
    >
      {/* Sticky Top Navigation Header Bar */}
      <div className="sticky top-0 z-20 w-full bg-[#08080c]/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3 shadow-2xl">
        {/* Left: Active Service Badge */}
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/30 text-xs font-mono text-zinc-300 hover:text-white transition-all"
            title="Return to Services Catalog (Esc)"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span className="hidden sm:inline">← Catalog</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-[#00F0FF]/15 border border-[#00F0FF]/40 text-xs font-mono font-bold text-[#00F0FF]">
              {service.number}
            </span>
            <span className="text-xs font-mono font-bold text-white tracking-wide truncate max-w-[180px] sm:max-w-none">
              {service.shortTitle}
            </span>
          </div>
        </div>

        {/* Center: Quick Switcher Between All 6 Services */}
        <div className="hidden lg:flex items-center gap-1.5 p-1 bg-white/[0.02] border border-white/5 rounded-xl">
          {servicesData.map((s) => {
            const isCurrent = s.id === service.id;
            return (
              <button
                key={s.id}
                onClick={() => onSelectService(s.id)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono whitespace-nowrap transition-all border ${
                  isCurrent
                    ? "bg-[#00F0FF]/20 text-[#00F0FF] border-[#00F0FF]/50 font-bold shadow-[0_0_10px_rgba(0,240,255,0.2)]"
                    : "bg-transparent text-zinc-400 border-transparent hover:text-zinc-200 hover:bg-white/[0.02]"
                }`}
              >
                <span>{s.number}</span>
                <span className="text-zinc-600 ml-1">//</span>
                <span className="ml-1">{s.shortTitle.split(" ")[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Actions (Start Project + Close) */}
        <div className="flex items-center gap-2.5 ml-auto sm:ml-0">
          <button
            onClick={onStartProject}
            className="px-4 py-1.5 rounded-xl bg-[#00F0FF]/15 hover:bg-[#00F0FF]/25 border border-[#00F0FF]/50 text-xs font-mono font-bold text-[#00F0FF] transition-all shadow-[0_0_12px_rgba(0,240,255,0.2)] flex items-center gap-1.5"
          >
            <Send className="w-3 h-3" />
            <span>Start Project</span>
          </button>

          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-red-500/20 border border-white/15 hover:border-red-500/40 text-xs font-mono text-zinc-300 hover:text-red-300 transition-all"
            title="Close (Esc)"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Close</span>
          </button>
        </div>
      </div>

      {/* Main Full-Screen Overlay Content */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-12 flex flex-col gap-12">
        {/* Service Scope Header Box */}
        <div className="flex flex-col gap-5 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#08080c] via-[#0c0c16] to-[#08080c] border border-white/10 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-mono font-bold text-[#00F0FF] px-2.5 py-0.5 rounded bg-[#00F0FF]/10 border border-[#00F0FF]/30">
                SERVICE // {service.number}
              </span>
              <span className="text-zinc-600 font-mono text-xs">//</span>
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>PRODUCTION GRADE</span>
              </span>
            </div>

            <span className="text-xs font-mono text-zinc-500">
              PRESS <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-zinc-300 text-[10px]">ESC</kbd> TO EXIT
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {service.headline}
            </h2>

            <p className="text-sm sm:text-base text-zinc-300 font-light max-w-3xl leading-relaxed">
              {service.tagline}. Designed, implemented, and verified to deterministic standards.
            </p>

            {/* Scope Categories for Service 05 */}
            {service.scopeCategories && (
              <div className="flex flex-wrap items-center gap-1.5 pt-2">
                <span className="text-[10px] font-mono text-zinc-500 mr-1">
                  FULL STACK REVIEW SCOPE:
                </span>
                {service.scopeCategories.map((cat) => (
                  <span
                    key={cat}
                    className="px-2.5 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-[10px] font-mono text-zinc-300"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            )}

            {/* Who This Is For Badge */}
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5 mt-1 text-xs">
              <Users className="w-4 h-4 text-[#00F0FF] shrink-0 mt-0.5" />
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">
                  WHO THIS IS FOR:
                </span>
                <p className="text-zinc-300 font-light leading-relaxed">
                  {service.whoThisIsFor}
                </p>
              </div>
            </div>

            {/* Disclaimer if present */}
            {service.disclaimer && (
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs text-amber-300 font-light">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{service.disclaimer}</span>
              </div>
            )}
          </div>
        </div>

        {/* 1. Visual Execution Pipeline */}
        <ServicePipeline
          pipeline={service.pipeline}
          serviceTitle={service.title}
        />

        {/* 2. What I Can Build Table */}
        <CapabilityTable capabilities={service.whatCanYouBuild} />

        {/* 3. What You Receive (Deliverables 01–08) */}
        <DeliverablesGrid deliverables={service.deliverablesList} />

        {/* 4. Selected Engineering Work (Proof) */}
        <ProofOfWork proofList={service.proof} />

        {/* 5. Choose Your Engagement (Architecture / Build / Optimize) */}
        <EngagementModels
          models={service.engagementModels}
          serviceTitle={service.title}
          onSelectModel={onSelectEngagementModel}
        />

        {/* Bottom Floating Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-[#08080c] border border-white/10 shadow-2xl mt-4">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/30 text-xs font-mono text-zinc-300 hover:text-white transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span>Close & Return to Services Catalog</span>
          </button>

          <button
            onClick={onStartProject}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00F0FF] to-[#00FF66] text-black font-mono font-bold text-xs flex items-center gap-2 hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(0,240,255,0.3)]"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Start Technical Discussion →</span>
          </button>
        </div>
      </div>
    </div>
  );
};
