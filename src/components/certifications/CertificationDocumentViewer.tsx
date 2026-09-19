"use client";

import React, { useEffect } from "react";
import { Certification } from "@/data/certifications";
import { X, ExternalLink, Award, ShieldCheck, CheckCircle2 } from "lucide-react";
import { IssuerLogo, SkillBadge } from "./CertificateLogos";

interface CertificationDocumentViewerProps {
  cert: Certification | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CertificationDocumentViewer: React.FC<CertificationDocumentViewerProps> = ({
  cert,
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !cert) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#090a0f] border border-white/20 p-6 sm:p-8 shadow-[0_0_60px_rgba(0,0,0,0.9)] flex flex-col gap-6 text-left">
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-pulse" />
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              {cert.code} // {cert.documentType}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <IssuerLogo issuer={cert.issuer} className="w-7 h-7" />
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Framing Chamber */}
        <div className="relative flex flex-col items-center justify-center p-8 sm:p-12 rounded-xl bg-[#050608] border border-white/10 shadow-inner text-center overflow-hidden">
          {/* Subtle Watermark Seal */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-[#00F0FF]/5 rounded-full pointer-events-none flex items-center justify-center">
            <Award className="w-32 h-32 text-white/[0.02]" />
          </div>

          <div className="relative z-10 flex flex-col items-center gap-4 max-w-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/40 flex items-center justify-center text-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.2)]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <IssuerLogo issuer={cert.issuer} className="w-12 h-12" />
            </div>

            <span className="text-[10px] font-mono tracking-widest text-[#00F0FF] uppercase font-bold">
              OFFICIAL ATTESTATION DOCUMENT
            </span>

            <h3 className="text-xl sm:text-2xl font-extrabold text-white font-sans tracking-tight">
              {cert.name}
            </h3>

            <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-zinc-400">
              <span>RECIPIENT:</span>
              <span className="text-[#00FF66] font-semibold">P S BHARATH KUMAR ACHARI</span>
              <span className="text-zinc-600">•</span>
              <span>ISSUED BY:</span>
              <span className="text-zinc-200 font-semibold">{cert.issuer}</span>
              <span className="text-zinc-600">•</span>
              <span>DATE:</span>
              <span className="text-zinc-200">{cert.issueDateFull || cert.date}</span>
            </div>

            <p className="text-xs text-zinc-300 font-light leading-relaxed mt-2 border-t border-b border-white/5 py-3">
              {cert.description}
            </p>

            {/* Verified Skills Grid with skill logos */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2">
              {cert.skills.map((skill, i) => (
                <SkillBadge key={i} skill={skill} />
              ))}
            </div>

            {/* Credential ID & Notes */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
              <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-white/[0.03] border border-white/10 text-xs font-mono text-zinc-400">
                <span className="text-zinc-500">ID:</span>
                <span className="text-zinc-200">{cert.credentialId}</span>
              </div>
              {cert.verificationNote && (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-cyan-950/30 border border-cyan-500/20 text-xs font-mono text-cyan-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00F0FF]" />
                  <span>{cert.verificationNote}</span>
                </div>
              )}
              {cert.documentFile && (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-950/30 border border-emerald-500/20 text-xs font-mono text-emerald-300">
                  <Award className="w-3.5 h-3.5 text-[#00FF66]" />
                  <span>{cert.documentFile}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <span className="text-xs font-mono text-zinc-500">
            STATUS: MATHEMATICALLY &amp; INSTITUTIONALLY VERIFIED
          </span>

          <div className="flex items-center gap-3">
            {cert.verificationUrl && (
              <a
                href={cert.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#00F0FF] text-black font-semibold text-xs font-mono uppercase hover:bg-cyan-300 transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)]"
              >
                <span>VERIFY CREDENTIAL</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg text-xs font-mono text-zinc-400 hover:text-white hover:bg-white/5 border border-white/10 transition-colors"
            >
              CLOSE VIEWER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
