"use client";

import React, { useState } from "react";
import { ArrowRight, CheckCircle2, RotateCcw, Mail } from "lucide-react";
import { heroData } from "@/data/hero";
import { PipelineCategory } from "./EngineeringPipeline";

interface ProjectInquiryFormProps {
  onCategoryChange: (cat: PipelineCategory) => void;
  onInputChange: (hasContent: boolean) => void;
  onSubmittingChange: (isSubmitting: boolean) => void;
}

const projectTypeOptions: { label: string; category: PipelineCategory }[] = [
  { label: "Protocol Engineering", category: "PROTOCOL" },
  { label: "Smart Contracts & dApps", category: "PROTOCOL" },
  { label: "Distributed Systems & Infrastructure", category: "SYSTEM" },
  { label: "Security, Auditing & Performance", category: "DATA" },
  { label: "Technical Mentorship & Education", category: "ALL" },
  { label: "Other Systems Consultation", category: "ALL" },
];

const timelineOptions = [
  "Exploring / Not urgent",
  "1 – 3 months",
  "3 – 6 months",
  "Immediate / Ongoing",
];

export const ProjectInquiryForm: React.FC<ProjectInquiryFormProps> = ({
  onCategoryChange,
  onInputChange,
  onSubmittingChange,
}) => {
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState(projectTypeOptions[0].label);
  const [subject, setSubject] = useState("");
  const [details, setDetails] = useState("");
  const [timeline, setTimeline] = useState(timelineOptions[0]);

  const [formState, setFormState] = useState<"editing" | "submitting" | "prepared">("editing");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Sync active category with parent pipeline
  const handleProjectTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLabel = e.target.value;
    setProjectType(selectedLabel);
    const match = projectTypeOptions.find((o) => o.label === selectedLabel);
    onCategoryChange(match ? match.category : "ALL");
  };

  const handleDetailsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setDetails(val);
    onInputChange(val.trim().length > 0 || email.trim().length > 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !email.includes("@") || !email.includes(".")) {
      setErrorMsg("Please provide a valid return email address.");
      return;
    }

    if (!subject.trim()) {
      setErrorMsg("Please provide a brief subject or project title.");
      return;
    }

    if (!details.trim() || details.trim().length < 10) {
      setErrorMsg("Please describe your project or challenge (min 10 characters).");
      return;
    }

    setErrorMsg(null);
    setFormState("submitting");
    onSubmittingChange(true);

    // Simulate clean, brief transition to inquiry preparation
    setTimeout(() => {
      setFormState("prepared");
      onSubmittingChange(false);

      // Trigger pre-filled email draft in visitor's client
      const mailtoUri = `mailto:${heroData.socials.email}?subject=${encodeURIComponent(
        `[Project Inquiry] ${projectType}: ${subject.trim()}`
      )}&body=${encodeURIComponent(
        `From: ${email.trim()}\nProject Type: ${projectType}\nTimeline: ${timeline}\n\nProject Details:\n${details.trim()}`
      )}`;

      const link = document.createElement("a");
      link.href = mailtoUri;
      link.target = "_blank";
      link.click();
    }, 700);
  };

  const handleReset = () => {
    setEmail("");
    setSubject("");
    setDetails("");
    setErrorMsg(null);
    setFormState("editing");
    onInputChange(false);
  };

  const handleOpenEmailManually = () => {
    const mailtoUri = `mailto:${heroData.socials.email}?subject=${encodeURIComponent(
      `[Project Inquiry] ${projectType}: ${subject.trim()}`
    )}&body=${encodeURIComponent(
      `From: ${email.trim()}\nProject Type: ${projectType}\nTimeline: ${timeline}\n\nProject Details:\n${details.trim()}`
    )}`;
    window.open(mailtoUri, "_blank");
  };

  // SUCCESS / PREPARED STATE
  if (formState === "prepared") {
    return (
      <div className="rounded-xl bg-[#0c0c10] border border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between min-h-[420px] sm:min-h-[480px]">
        <div className="flex flex-col gap-5">
          <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
              EMAIL DRAFT PREPARED
            </span>
            <h3 className="text-xl sm:text-2xl font-medium text-white font-sans">
              Your inquiry is ready.
            </h3>
            <p className="text-sm text-zinc-400 font-light leading-relaxed max-w-md">
              Your mail client will open with your project details pre-filled to{" "}
              <span className="text-white font-mono text-xs">{heroData.socials.email}</span>.
              If your client didn&apos;t launch automatically, use the button below.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.05] flex flex-col gap-2 text-xs font-mono text-zinc-400">
            <div className="flex justify-between">
              <span className="text-zinc-500">RECIPIENT</span>
              <span className="text-zinc-200">{heroData.socials.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">TYPE</span>
              <span className="text-zinc-200">{projectType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">SUBJECT</span>
              <span className="text-zinc-200 truncate max-w-[220px]">{subject}</span>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-white/[0.06] flex flex-wrap items-center gap-3">
          <button
            onClick={handleOpenEmailManually}
            className="px-4 py-2 rounded-lg bg-cyan-500 text-black text-xs font-mono font-medium hover:bg-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>OPEN EMAIL CLIENT</span>
          </button>

          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.16] text-zinc-300 hover:text-white text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>START ANOTHER INQUIRY</span>
          </button>
        </div>
      </div>
    );
  }

  // EDITING FORM
  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl bg-[#0c0c10] border border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between min-h-[420px] sm:min-h-[480px] gap-5"
    >
      <div className="flex flex-col gap-4">
        {/* Error notification */}
        {errorMsg && (
          <div className="p-3 rounded-lg bg-red-950/30 border border-red-500/30 text-red-300 text-xs font-mono">
            {errorMsg}
          </div>
        )}

        {/* Row 1: Your Email */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="inquiry-email" className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
            Your email <span className="text-cyan-400">*</span>
          </label>
          <input
            id="inquiry-email"
            type="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              onInputChange(e.target.value.trim().length > 0 || details.trim().length > 0);
            }}
            placeholder="name@company.com"
            className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.02] border border-white/[0.08] focus:border-cyan-400/50 focus:bg-white/[0.04] text-white text-sm outline-none transition-all placeholder:text-zinc-600 font-sans"
          />
        </div>

        {/* Row 2: Project Type & Timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="inquiry-type" className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
              Project type
            </label>
            <select
              id="inquiry-type"
              value={projectType}
              onChange={handleProjectTypeChange}
              className="w-full px-3 py-2.5 rounded-lg bg-[#121218] border border-white/[0.08] focus:border-cyan-400/50 text-white text-xs outline-none transition-all cursor-pointer font-sans"
            >
              {projectTypeOptions.map((opt) => (
                <option key={opt.label} value={opt.label}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="inquiry-timeline" className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
              Timeline <span className="text-zinc-600 font-normal">(optional)</span>
            </label>
            <select
              id="inquiry-timeline"
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg bg-[#121218] border border-white/[0.08] focus:border-cyan-400/50 text-white text-xs outline-none transition-all cursor-pointer font-sans"
            >
              {timelineOptions.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 3: Subject */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="inquiry-subject" className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
            Subject <span className="text-cyan-400">*</span>
          </label>
          <input
            id="inquiry-subject"
            type="text"
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g. Building a Substrate-based L1 runtime"
            className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.02] border border-white/[0.08] focus:border-cyan-400/50 focus:bg-white/[0.04] text-white text-sm outline-none transition-all placeholder:text-zinc-600 font-sans"
          />
        </div>

        {/* Row 4: Project Details */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="inquiry-details" className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
            Project details <span className="text-cyan-400">*</span>
          </label>
          <textarea
            id="inquiry-details"
            required
            rows={4}
            value={details}
            onChange={handleDetailsChange}
            placeholder="Tell me about the problem, system, technical challenge, timeline, or architecture goal..."
            className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.02] border border-white/[0.08] focus:border-cyan-400/50 focus:bg-white/[0.04] text-white text-sm outline-none transition-all placeholder:text-zinc-600 font-sans resize-none leading-relaxed"
          />
        </div>
      </div>

      {/* Submit Action */}
      <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
        <span className="text-[11px] font-mono text-zinc-500">
          Direct email inquiry &bull; Prompt response
        </span>

        <button
          type="submit"
          disabled={formState === "submitting"}
          className="px-5 py-2.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.14] hover:border-cyan-400/40 text-white text-xs font-mono tracking-wider transition-all duration-200 flex items-center gap-2 cursor-pointer group shrink-0 disabled:opacity-50"
        >
          <span>{formState === "submitting" ? "PREPARING..." : "SEND INQUIRY"}</span>
          <ArrowRight className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </form>
  );
};
