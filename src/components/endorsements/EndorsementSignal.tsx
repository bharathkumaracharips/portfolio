"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Endorsement } from "@/types";
import { EndorsementNetworkCanvas } from "@/components/canvas/EndorsementNetworkCanvas";
import { Maximize2, ShieldCheck, ChevronRight, ChevronLeft, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface EndorsementSignalProps {
  endorsements: Endorsement[];
  activeId: string;
  onSelectEndorsement: (id: string) => void;
  onOpenDetail: (endorsement: Endorsement) => void;
}

export const EndorsementSignal: React.FC<EndorsementSignalProps> = ({
  endorsements,
  activeId,
  onSelectEndorsement,
  onOpenDetail,
}) => {
  const activeEndorsement =
    endorsements.find((e) => e.id === activeId) || endorsements[0];
  const currentIndex = endorsements.findIndex((e) => e.id === activeId);

  const handlePrev = () => {
    const nextIdx = (currentIndex - 1 + endorsements.length) % endorsements.length;
    onSelectEndorsement(endorsements[nextIdx].id);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % endorsements.length;
    onSelectEndorsement(endorsements[nextIdx].id);
  };

  if (!activeEndorsement) return null;

  return (
    <div className="space-y-6">
      {/* Sub-bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-300">
            FEATURED SIGNALS // LIVE SPOTLIGHT
          </span>
        </div>

        {/* Signal Navigation Selector Tabs */}
        <div className="flex items-center gap-2">
          {endorsements.map((item) => {
            const isSelected = item.id === activeId;
            return (
              <button
                key={item.id}
                onClick={() => onSelectEndorsement(item.id)}
                className={cn(
                  "px-3 py-1.5 text-xs font-mono tracking-wider rounded-lg border transition-all cursor-pointer",
                  isSelected
                    ? "bg-[#00F0FF]/15 text-[#00F0FF] font-semibold border-[#00F0FF] shadow-[0_0_12px_rgba(0,240,255,0.25)]"
                    : "bg-white/[0.02] text-zinc-400 border-white/10 hover:border-white/20 hover:text-zinc-200"
                )}
                aria-label={`Select Signal ${item.signalNumber} - ${item.author}`}
              >
                SIGNAL {item.signalNumber}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Two-Column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: 3D Network Canvas (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-3">
          <EndorsementNetworkCanvas
            endorsements={endorsements}
            activeId={activeId}
            onSelectEndorsement={onSelectEndorsement}
          />

          {/* Traverse Controls */}
          <div className="flex items-center justify-between px-3 py-2 bg-white/[0.02] border border-white/10 rounded-lg">
            <span className="text-[11px] font-mono text-zinc-400">
              SIGNAL {currentIndex + 1} OF {endorsements.length}
            </span>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                className="p-1.5 text-zinc-400 hover:text-[#00F0FF] bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 rounded transition-colors cursor-pointer"
                aria-label="Previous Signal"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-1.5 text-zinc-400 hover:text-[#00F0FF] bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 rounded transition-colors cursor-pointer"
                aria-label="Next Signal"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Record Card (7 cols) */}
        <div className="lg:col-span-7 flex">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeEndorsement.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex flex-col justify-between p-6 sm:p-7 bg-[#0c0d12] border border-white/10 rounded-xl relative overflow-hidden group shadow-[0_10px_35px_rgba(0,0,0,0.6)]"
            >
              {/* Card Header Tag */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold tracking-widest text-[#00F0FF]">
                    SIGNAL / {activeEndorsement.signalNumber}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-500 uppercase">
                    // {activeEndorsement.category}
                  </span>
                </div>

                <button
                  onClick={() => onOpenDetail(activeEndorsement)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono text-zinc-400 hover:text-[#00F0FF] bg-white/[0.03] border border-white/10 hover:border-[#00F0FF]/40 rounded transition-all cursor-pointer"
                  aria-label="Expand Signal Detail"
                >
                  <Maximize2 className="w-3 h-3" />
                  <span>EXPAND</span>
                </button>
              </div>

              {/* Central Quote */}
              <div className="my-auto py-3">
                <blockquote className="text-base sm:text-lg font-light text-zinc-200 leading-relaxed font-sans">
                  &ldquo;{activeEndorsement.quote}&rdquo;
                </blockquote>
              </div>

              {/* Bottom Metadata */}
              <div className="pt-4 mt-4 border-t border-white/10 space-y-3">
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-white">
                      {activeEndorsement.author}
                    </div>
                    {activeEndorsement.role && (
                      <div className="text-xs font-mono text-[#00F0FF]">
                        {activeEndorsement.role}
                      </div>
                    )}
                    {activeEndorsement.organization && (
                      <div className="text-xs text-zinc-400">
                        {activeEndorsement.organization}
                      </div>
                    )}
                  </div>

                  {activeEndorsement.relationship && (
                    <div className="text-right">
                      <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                        RELATIONSHIP
                      </div>
                      <div className="text-xs font-mono text-zinc-300">
                        {activeEndorsement.relationship}
                      </div>
                    </div>
                  )}
                </div>

                {/* Source */}
                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 pt-1">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#00F0FF]" />
                    <span>SOURCE: {activeEndorsement.source || "CONFIDENTIAL CLIENT TESTIMONIAL"}</span>
                  </div>

                  {activeEndorsement.sourceUrl && (
                    <a
                      href={activeEndorsement.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#00F0FF] hover:underline cursor-pointer"
                    >
                      <span>SOURCE ↗</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
