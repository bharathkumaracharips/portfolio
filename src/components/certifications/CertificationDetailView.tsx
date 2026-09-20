"use client";

import React from "react";
import { Certification } from "@/data/certifications";
import {
  ArrowLeft,
  ExternalLink,
  ShieldCheck,
  Award,
  Maximize2,
  CheckCircle2,
  Calendar,
  Building,
  Tag,
  FileText,
} from "lucide-react";
import { IssuerLogo, SkillBadge } from "./CertificateLogos";

interface CertificationDetailViewProps {
  cert: Certification;
  onReturnToArchive: () => void;
  onOpenDocumentViewer: (cert: Certification) => void;
}

export const CertificationDetailView: React.FC<CertificationDetailViewProps> = ({
  cert,
  onReturnToArchive,
  onOpenDocumentViewer,
}) => {
  return (
    <div className="flex flex-col gap-8 p-6 sm:p-10 rounded-2xl bg-[#08080c] border border-white/15 shadow-[0_0_50px_rgba(0,0,0,0.8)] animate-in fade-in zoom-in-95 duration-300">
      {/* Top Breadcrumb & Return Action */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-zinc-500">CERTIFICATIONS</span>
          <span className="text-zinc-700">/</span>
          <span className="text-[#00F0FF] font-bold">{cert.code}</span>
          <span className="text-zinc-700">/</span>
          <span className="text-zinc-400">ATTESTATION RECORD</span>
        </div>

        <button
          type="button"
          onClick={onReturnToArchive}
          className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-[#00F0FF]/15 text-xs font-mono font-medium text-white border border-white/15 hover:border-[#00F0FF]/50 transition-all cursor-pointer shadow-sm"
        >
          <ArrowLeft className="w-4 h-4 text-[#00F0FF] transition-transform group-hover:-translate-x-1" />
          <span>BACK TO ALL CERTIFICATES</span>
        </button>
      </div>

      {/* Main 2-Column Split: Document Viewer (Left) + Credential Metadata (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left: Large Framed Document Viewer (6 Cols) */}
        <div className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-8 rounded-xl bg-[#050608] border border-white/10 relative overflow-hidden shadow-inner min-h-[380px]">
          {/* Subtle Background Watermark */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-[#00F0FF]/5 rounded-full pointer-events-none flex items-center justify-center">
            <Award className="w-28 h-28 text-white/[0.02]" />
          </div>

          {/* Top Document Status Header */}
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-pulse" />
              <span className="text-[10px] font-mono text-[#00FF66] tracking-wider font-bold">
                {cert.documentType}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono text-zinc-500">
                SHA-256 RECORD
              </span>
              <IssuerLogo issuer={cert.issuer} className="w-7 h-7" />
            </div>
          </div>

          {/* Core Document Certificate Graphic */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center my-6 gap-3">
            <div className="w-14 h-14 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/40 flex items-center justify-center text-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.2)]">
              <ShieldCheck className="w-7 h-7" />
            </div>

            <span className="text-[10px] font-mono tracking-widest text-[#00F0FF] uppercase">
              {cert.category}
            </span>

            <h3 className="text-xl sm:text-2xl font-bold font-sans text-white tracking-tight leading-snug max-w-md">
              {cert.name}
            </h3>

            <span className="text-xs font-mono text-zinc-400">
              ISSUED TO P S BHARATH KUMAR ACHARI • {cert.issuer}
            </span>

            {/* Skill Icons Strip inside Document graphic */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 mt-2 pt-2 border-t border-white/5 max-w-sm">
              {cert.skills.map((skill, i) => (
                <SkillBadge key={i} skill={skill} />
              ))}
            </div>
          </div>

          {/* Document Viewer Action Button */}
          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <span className="text-[11px] font-mono text-zinc-500 truncate max-w-[180px]">
              ID: {cert.credentialId}
            </span>
            <button
              onClick={() => onOpenDocumentViewer(cert)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-xs font-mono text-[#00F0FF] border border-white/10 hover:border-[#00F0FF]/40 transition-colors cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>VIEW FULL CERTIFICATE</span>
            </button>
          </div>
        </div>

        {/* Right: Credential Metadata & Verification Details (6 Cols) */}
        <div className="lg:col-span-6 flex flex-col justify-between gap-6">
          <div className="flex flex-col gap-6">
            {/* Title & Description */}
            <div className="flex flex-col gap-2 border-b border-white/10 pb-4">
              <span className="text-xs font-mono text-[#00F0FF] tracking-wider uppercase">
                CREDENTIAL DETAILS // {cert.code}
              </span>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                {cert.name}
              </h2>
              <p className="text-xs text-zinc-300 font-light leading-relaxed">
                {cert.description}
              </p>
            </div>

            {/* Metadata Rows */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 flex flex-col gap-1">
                <span className="text-[10px] text-zinc-500 uppercase flex items-center gap-1.5">
                  <Building className="w-3 h-3 text-[#00F0FF]" />
                  <span>ISSUER</span>
                </span>
                <span className="text-zinc-200 font-semibold">{cert.issuer}</span>
              </div>

              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 flex flex-col gap-1">
                <span className="text-[10px] text-zinc-500 uppercase flex items-center gap-1.5">
                  <Calendar className="w-3 h-3 text-[#00F0FF]" />
                  <span>ISSUED DATE</span>
                </span>
                <span className="text-zinc-200 font-semibold">
                  {cert.issueDateFull || cert.date}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 flex flex-col gap-1">
                <span className="text-[10px] text-zinc-500 uppercase flex items-center gap-1.5">
                  <Tag className="w-3 h-3 text-[#00F0FF]" />
                  <span>CATEGORY</span>
                </span>
                <span className="text-zinc-200 font-semibold">{cert.category}</span>
              </div>

              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 flex flex-col gap-1">
                <span className="text-[10px] text-zinc-500 uppercase flex items-center gap-1.5">
                  <FileText className="w-3 h-3 text-[#00F0FF]" />
                  <span>CREDENTIAL ID</span>
                </span>
                <span className="text-zinc-200 font-semibold">{cert.credentialId}</span>
              </div>
            </div>

            {/* Verification Note or Document File Indicator */}
            {(cert.verificationNote || cert.documentFile) && (
              <div className="flex flex-col gap-2">
                {cert.verificationNote && (
                  <div className="p-3 rounded-lg bg-[#00F0FF]/[0.04] border border-[#00F0FF]/20 flex items-center gap-2 text-xs font-mono text-cyan-200">
                    <CheckCircle2 className="w-4 h-4 text-[#00F0FF] shrink-0" />
                    <span>{cert.verificationNote}</span>
                  </div>
                )}
                {cert.documentFile && (
                  <div className="p-3 rounded-lg bg-white/[0.02] border border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400">
                    <span className="flex items-center gap-2 truncate">
                      <FileText className="w-4 h-4 text-[#00FF66] shrink-0" />
                      <span className="truncate max-w-[260px] sm:max-w-xs">{cert.documentFile}</span>
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-[#00FF66] border border-emerald-500/20 font-semibold">
                      ARCHIVE PDF
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Verified Skills */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                VERIFIED SKILLS &amp; INVARIANTS
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {cert.skills.map((skill, i) => (
                  <SkillBadge key={i} skill={skill} />
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
            {cert.verificationUrl && (
              <a
                href={cert.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-6 py-3 rounded-lg bg-[#00F0FF] text-black font-semibold text-xs font-mono uppercase hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)]"
              >
                <span>VERIFY CREDENTIAL</span>
                <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </a>
            )}

            <button
              type="button"
              onClick={onReturnToArchive}
              className="flex items-center gap-2 px-5 py-3 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-xs font-mono font-medium text-white border border-white/15 hover:border-white/30 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span>BACK TO ALL CERTIFICATES</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
