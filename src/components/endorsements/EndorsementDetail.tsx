"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, ShieldCheck, UserCheck, Layers, ArrowUpRight } from "lucide-react";
import { Endorsement } from "@/types";

interface EndorsementDetailProps {
  endorsement: Endorsement | null;
  isOpen: boolean;
  onClose: () => void;
}

export const EndorsementDetail: React.FC<EndorsementDetailProps> = ({
  endorsement,
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
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !endorsement) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
        {/* Backdrop click */}
        <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-[#090b10] border border-[#262b3a] rounded-xl shadow-[0_20px_70px_rgba(0,0,0,0.9)] overflow-hidden z-10 text-[#F5F5F2]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-endorsement-title"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#1b1e2a] bg-[#0c0e15]">
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] text-[11px] font-mono rounded">
                SIGNAL // {endorsement.signalNumber}
              </span>
              <span className="text-xs font-mono text-[#888899] uppercase tracking-wider">
                {endorsement.category} ENDORSEMENT
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-[#888899] hover:text-white hover:bg-white/5 rounded transition-colors cursor-pointer"
              aria-label="Close modal (Escape)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
            {/* Primary Quote */}
            <div className="relative">
              <span className="absolute -top-3 -left-3 text-5xl font-serif text-[#00F0FF]/20 select-none">
                &ldquo;
              </span>
              <p
                id="modal-endorsement-title"
                className="text-lg sm:text-xl font-light text-[#E2E8F0] leading-relaxed relative z-10 pl-2"
              >
                {endorsement.quote}
              </p>
            </div>

            {/* Highlights if present */}
            {endorsement.highlights && endorsement.highlights.length > 0 && (
              <div className="pt-2">
                <div className="text-[10px] font-mono tracking-widest text-[#777788] uppercase mb-2">
                  KEY OBSERVED CAPABILITIES:
                </div>
                <div className="flex flex-wrap gap-2">
                  {endorsement.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 text-xs font-mono bg-[#12151e] border border-[#222736] text-[#A5B4FC] rounded"
                    >
                      • {h}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Author & Relationship Card */}
            <div className="p-4 bg-[#0d1017] border border-[#1d212d] rounded-lg grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="text-[10px] font-mono text-[#666677] uppercase tracking-wider">
                  AUTHOR & ROLE
                </div>
                <div className="text-sm font-semibold text-[#F5F5F2] mt-0.5">
                  {endorsement.author}
                </div>
                {endorsement.role && (
                  <div className="text-xs text-[#00F0FF] font-mono mt-0.5">
                    {endorsement.role}
                  </div>
                )}
                {endorsement.organization && (
                  <div className="text-xs text-[#888899] mt-0.5">
                    {endorsement.organization}
                  </div>
                )}
              </div>

              <div>
                <div className="text-[10px] font-mono text-[#666677] uppercase tracking-wider">
                  COLLABORATION CONTEXT
                </div>
                <div className="text-xs text-[#CBD5E1] mt-1 font-mono">
                  {endorsement.relationship || "Direct Technical Collaboration"}
                </div>
                {endorsement.projectContext && (
                  <div className="text-[11px] text-[#71717A] mt-1">
                    Context: {endorsement.projectContext}
                  </div>
                )}
              </div>
            </div>

            {/* Source Information */}
            <div className="flex items-center justify-between pt-4 border-t border-[#181a24] text-xs font-mono">
              <div className="flex items-center gap-2 text-[#888899]">
                <ShieldCheck className="w-4 h-4 text-[#00F0FF]" />
                <span>SOURCE: {endorsement.source || "CONFIDENTIAL CLIENT TESTIMONIAL"}</span>
              </div>

              {endorsement.sourceUrl && (
                <a
                  href={endorsement.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#00F0FF] hover:underline"
                >
                  <span>PROFILE / SOURCE</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
