"use client";

import React, { useState, useEffect } from "react";
import { X, Send, Sparkles, CheckCircle2 } from "lucide-react";
import { servicesData } from "@/data/services";
import { heroData } from "@/data/hero";

interface ProjectIntakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
  initialEngagementType?: "ARCHITECTURE" | "BUILD" | "OPTIMIZE";
}

export const ProjectIntakeModal: React.FC<ProjectIntakeModalProps> = ({
  isOpen,
  onClose,
  initialServiceId = "srv-protocol-engineering",
  initialEngagementType = "BUILD",
}) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(initialServiceId);
  const [engagementType, setEngagementType] = useState<"ARCHITECTURE" | "BUILD" | "OPTIMIZE">(initialEngagementType);
  const [stage, setStage] = useState<"Idea" | "Prototype" | "Existing System" | "Production">("Prototype");
  const [timeline, setTimeline] = useState<"< 1 month" | "1–3 months" | "3–6 months" | "6+ months">("1–3 months");
  const [budget, setBudget] = useState<"<$2K" | "$2K–$5K" | "$5K–$10K" | "$10K+">("$5K–$10K");
  const [projectName, setProjectName] = useState<string>("");
  const [projectDescription, setProjectDescription] = useState<string>("");
  const [clientEmail, setClientEmail] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (initialServiceId) setSelectedServiceId(initialServiceId);
    if (initialEngagementType) setEngagementType(initialEngagementType);
  }, [initialServiceId, initialEngagementType]);

  if (!isOpen) return null;

  const currentService = servicesData.find((s) => s.id === selectedServiceId) || servicesData[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoSubject = encodeURIComponent(
      `[Technical Inquiry] ${currentService.shortTitle} - ${engagementType} (${projectName || "New Project"})`
    );
    const mailtoBody = encodeURIComponent(
      `Service: ${currentService.title}\nEngagement Model: ${engagementType}\nProject Stage: ${stage}\nTimeline: ${timeline}\nBudget Range: ${budget}\nClient Email: ${clientEmail}\n\nProject Scope & Needs:\n${projectDescription}`
    );

    // Open user's default email client with prepopulated structured brief
    window.open(`mailto:${heroData.socials.email}?subject=${mailtoSubject}&body=${mailtoBody}`);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-2xl bg-[#0a0a10] border border-white/15 rounded-3xl shadow-2xl p-6 sm:p-8 flex flex-col gap-6 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/[0.04] border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="flex flex-col items-center justify-center text-center py-10 gap-4">
            <div className="w-14 h-14 rounded-full bg-[#00FF66]/10 border border-[#00FF66]/30 text-[#00FF66] flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              Inquiry Brief Prepared
            </h3>
            <p className="text-sm text-zinc-300 font-light max-w-md leading-relaxed">
              Your technical discussion details have been formatted and opened in your email client. You can also reach PS Bharath Kumar Achari directly at{" "}
              <span className="text-[#00F0FF] font-mono">{heroData.socials.email}</span>.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-4 px-6 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-xs font-mono text-white hover:bg-white/10 transition-all"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex flex-col gap-1 border-b border-white/10 pb-4 pr-8">
              <div className="flex items-center gap-2 text-xs font-mono text-[#00F0FF]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>START A TECHNICAL PROJECT</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Tell me what you&apos;re building.
              </h3>
              <p className="text-xs text-zinc-400 font-light">
                Direct consultation with Lead Systems & Protocol Engineer PS Bharath Kumar Achari.
              </p>
            </div>

            {/* Field 1: Service Selection */}
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                1. SELECT SERVICE DOMAIN:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {servicesData.map((s) => (
                  <button
                    type="button"
                    key={s.id}
                    onClick={() => setSelectedServiceId(s.id)}
                    className={`p-2 rounded-xl text-left text-xs font-mono transition-all border ${
                      selectedServiceId === s.id
                        ? "bg-[#00F0FF]/15 text-[#00F0FF] border-[#00F0FF] font-bold"
                        : "bg-white/[0.02] text-zinc-400 border-white/10 hover:border-white/20 hover:text-zinc-200"
                    }`}
                  >
                    <span className="text-[10px] text-zinc-500 block">{s.number}</span>
                    <span className="truncate block">{s.shortTitle}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Field 2: Engagement Model */}
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                2. ENGAGEMENT MODEL:
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { type: "ARCHITECTURE", label: "Architecture", desc: "Design & Spec" },
                  { type: "BUILD", label: "Build", desc: "Implementation" },
                  { type: "OPTIMIZE", label: "Optimize", desc: "Review & Tuning" },
                ].map((m) => (
                  <button
                    type="button"
                    key={m.type}
                    onClick={() => setEngagementType(m.type as any)}
                    className={`p-2.5 rounded-xl text-left text-xs font-mono transition-all border ${
                      engagementType === m.type
                        ? "bg-[#00FF66]/15 text-[#00FF66] border-[#00FF66] font-bold"
                        : "bg-white/[0.02] text-zinc-400 border-white/10 hover:border-white/20 hover:text-zinc-200"
                    }`}
                  >
                    <span className="block font-semibold">{m.label}</span>
                    <span className="text-[10px] text-zinc-500 block">{m.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Field 3: Project Stage */}
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                3. WHAT STAGE ARE YOU AT?
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(["Idea", "Prototype", "Existing System", "Production"] as const).map((stg) => (
                  <button
                    type="button"
                    key={stg}
                    onClick={() => setStage(stg)}
                    className={`py-2 px-3 rounded-lg text-xs font-mono text-center transition-all border ${
                      stage === stg
                        ? "bg-white/10 text-white border-white/40 font-bold"
                        : "bg-white/[0.02] text-zinc-400 border-white/5 hover:border-white/15 hover:text-zinc-300"
                    }`}
                  >
                    {stg}
                  </button>
                ))}
              </div>
            </div>

            {/* Field 4: Description & Details */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                4. TELL ME ABOUT THE SYSTEM / REQUIREMENTS:
              </label>
              <textarea
                required
                rows={3}
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                placeholder={
                  engagementType === "OPTIMIZE"
                    ? "Describe current performance bottlenecks, stack details, and target areas for review..."
                    : "Describe the protocol, dApp, or infrastructure you need built, key constraints, and objectives..."
                }
                className="w-full p-3 rounded-xl bg-black/50 border border-white/10 focus:border-[#00F0FF] text-white text-xs font-mono focus:outline-none transition-colors placeholder:text-zinc-600"
              />
            </div>

            {/* Field 5: Timeline & Budget Dual Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                  5. EXPECTED TIMELINE:
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  {(["< 1 month", "1–3 months", "3–6 months", "6+ months"] as const).map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setTimeline(t)}
                      className={`py-1.5 px-2 rounded-lg text-[11px] font-mono text-center transition-all border ${
                        timeline === t
                          ? "bg-[#00F0FF]/15 text-[#00F0FF] border-[#00F0FF] font-bold"
                          : "bg-white/[0.02] text-zinc-400 border-white/5 hover:border-white/15"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                  6. BUDGET RANGE:
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  {(["<$2K", "$2K–$5K", "$5K–$10K", "$10K+"] as const).map((b) => (
                    <button
                      type="button"
                      key={b}
                      onClick={() => setBudget(b)}
                      className={`py-1.5 px-2 rounded-lg text-[11px] font-mono text-center transition-all border ${
                        budget === b
                          ? "bg-[#00FF66]/15 text-[#00FF66] border-[#00FF66] font-bold"
                          : "bg-white/[0.02] text-zinc-400 border-white/5 hover:border-white/15"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Email Field & Submit */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 border-t border-white/10">
              <input
                type="email"
                required
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                placeholder="your.email@organization.com"
                className="w-full sm:flex-1 p-3 rounded-xl bg-black/50 border border-white/10 focus:border-[#00F0FF] text-white text-xs font-mono focus:outline-none placeholder:text-zinc-600"
              />

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#00F0FF] to-[#00FF66] text-black font-mono font-bold text-xs flex items-center justify-center gap-2 hover:opacity-90 transition-opacity whitespace-nowrap shadow-[0_0_20px_rgba(0,240,255,0.3)]"
              >
                <Send className="w-3.5 h-3.5" />
                <span>START TECHNICAL DISCUSSION →</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
