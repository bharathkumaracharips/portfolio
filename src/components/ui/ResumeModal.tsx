"use client";

import React from "react";
import { Download, X, FileText, CheckCircle2, ExternalLink, Printer } from "lucide-react";
import { heroData } from "@/data/hero";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = () => {
    // Attempt download of static /resume.pdf
    const link = document.createElement("a");
    link.href = heroData.socials.resumeUrl;
    link.download = "Bharath_Kumar_Achari_Protocol_Engineer_Resume.pdf";
    link.target = "_blank";
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0a0a0f] border border-white/15 p-6 sm:p-8 shadow-[0_0_60px_rgba(0,0,0,0.9)] flex flex-col gap-6 text-left scrollbar-thin scrollbar-thumb-white/10">
        {/* Modal Top Chrome */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#00F0FF]" />
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              PROTOCOL ENGINEER // CURRICULUM VITAE
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPdf}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00F0FF] text-black font-semibold text-xs font-mono uppercase hover:bg-cyan-300 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>DOWNLOAD PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Candidate Header */}
        <div className="flex flex-col gap-2 border-b border-white/10 pb-4">
          <h2 className="text-2xl font-bold font-sans text-white tracking-tight">
            BHARATH KUMAR ACHARI P S
          </h2>
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-400">
            <span className="text-[#00F0FF]">BLOCKCHAIN &amp; PROTOCOL ENGINEER</span>
            <span>•</span>
            <span>contact@bharathachari.dev</span>
            <span>•</span>
            <span>github.com/psbharathkumarachari</span>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
            EXECUTIVE SUMMARY
          </span>
          <p className="text-xs text-zinc-300 font-light leading-relaxed">
            Systems &amp; Protocol Engineer specializing in deterministic Substrate runtimes, parallel EVM concurrency (Software Transactional Memory), Arbitrum Stylus Rust contracts, and high-throughput blockchain infrastructure. Proven track record in protocol architecture, L1/L2 scaling, gas profiling, and technical education.
          </p>
        </div>

        {/* Experience Snapshot */}
        <div className="flex flex-col gap-3 border-t border-white/10 pt-4">
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
            EXPERIENCE SNAPSHOT
          </span>

          <div className="flex flex-col gap-3 font-mono text-xs">
            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">Caerulean</span>
                <span className="text-zinc-500">2026 – Present</span>
              </div>
              <span className="text-[#00F0FF]">L1 Protocol &amp; Runtime Architect</span>
              <p className="text-zinc-400 text-[11px] font-sans font-light mt-1">
                Leading Layer-1 runtime architecture, WASM state transition models, and custom consensus invariants.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">ONE DEV</span>
                <span className="text-zinc-500">Feb 2026 – May 2026</span>
              </div>
              <span className="text-[#00FF66]">Tutor – Blockchain Engineering</span>
              <p className="text-zinc-400 text-[11px] font-sans font-light mt-1">
                Created curriculum and delivered live engineering sessions on EVM internals, Solidity, and WASM runtimes.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">Freelance Protocol Labs</span>
                <span className="text-zinc-500">2024 – Present</span>
              </div>
              <span className="text-[#00F0FF]">Protocol Engineer &amp; Mentor</span>
              <p className="text-zinc-400 text-[11px] font-sans font-light mt-1">
                Substrate FRAME pallets, Arbitrum Stylus Rust contracts, gas profiling, and protocol security reviews.
              </p>
            </div>
          </div>
        </div>

        {/* Technical Core Competencies */}
        <div className="flex flex-col gap-2 border-t border-white/10 pt-4">
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
            TECHNICAL COMPETENCIES
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
            <div className="p-2.5 rounded bg-white/[0.02] border border-white/5 flex flex-col gap-1">
              <span className="text-zinc-400">LANGUAGES &amp; RUNTIMES</span>
              <span className="text-zinc-200">Rust, Solidity, WASM, Yul, TypeScript, Go, C++</span>
            </div>
            <div className="p-2.5 rounded bg-white/[0.02] border border-white/5 flex flex-col gap-1">
              <span className="text-zinc-400">PROTOCOLS &amp; SDKs</span>
              <span className="text-zinc-200">Substrate / Polkadot SDK, EVM Internals, Stylus, libp2p</span>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <span className="text-[11px] font-mono text-zinc-500">
            SHA-256 VERIFIED CANDIDATE PROFILE
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadPdf}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#00F0FF] text-black font-semibold text-xs font-mono uppercase hover:bg-cyan-300 transition-colors shadow-[0_0_15px_rgba(0,240,255,0.3)]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>DOWNLOAD RESUME (PDF)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
