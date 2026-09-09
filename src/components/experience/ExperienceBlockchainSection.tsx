"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  BlockchainExperienceCanvas,
  BlockchainCanvasInspectionState,
} from "@/components/canvas/BlockchainExperienceCanvas";
import { blockchainExperienceBlocks } from "@/data/experience";

export function ExperienceBlockchainSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollFraction, setScrollFraction] = useState(0);
  const [inspectionState, setInspectionState] = useState<BlockchainCanvasInspectionState>({
    blockIndex: 0,
    stageIndex: 1,
    isFinalized: false,
    isOverview: false,
    stageProgress: 0,
  });

  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const rect = scrollContainerRef.current.getBoundingClientRect();
    const totalScrollableHeight = scrollContainerRef.current.offsetHeight - window.innerHeight;
    if (totalScrollableHeight <= 0) return;

    const currentTop = -rect.top;
    const rawProgress = currentTop / totalScrollableHeight;
    const clampedProgress = Math.max(0, Math.min(1, rawProgress));
    setScrollFraction(clampedProgress);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Jump to specific block along the scroll budget
  const jumpToBlock = (index: number) => {
    if (!scrollContainerRef.current) return;
    const totalScrollableHeight = scrollContainerRef.current.offsetHeight - window.innerHeight;
    const blockScrollPoints = [0.05, 0.22, 0.38, 0.54, 0.74];
    const targetProgress = blockScrollPoints[index] ?? 0;
    const targetScrollY = scrollContainerRef.current.offsetTop + targetProgress * totalScrollableHeight;
    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth",
    });
  };

  const currentBlock = blockchainExperienceBlocks[inspectionState.blockIndex] || blockchainExperienceBlocks[0];

  return (
    <section
      ref={scrollContainerRef}
      id="experience"
      className="relative w-full bg-[#05070c] text-[#F8FAFC] border-t border-[#1e293b]/60"
      style={{ height: "420vh" }}
    >
      {/* Sticky Fullscreen 3D Blockchain Viewport */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between select-none z-10">
        {/* Top Header & Navigation Stepper */}
        <header className="relative z-40 w-full bg-[#07090e]/90 backdrop-blur-xl border-b border-[#1e293b]/80">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-10 h-16 sm:h-20 flex items-center justify-between">
            {/* Left: Section Header */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono tracking-widest text-[#00F0FF] uppercase font-bold">
                CAREER BLOCKCHAIN
              </span>
              <span className="hidden sm:inline text-xs font-mono text-[#64748B]">
                // IMMUTABLE PROTOCOL LEDGER
              </span>
            </div>

            {/* Center: Block Stepper HUD */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-[10px] font-mono text-[#64748B] mr-1 hidden md:inline">
                BLOCK:
              </span>
              {blockchainExperienceBlocks.map((b, idx) => {
                const isActive = inspectionState.blockIndex === idx && !inspectionState.isOverview;
                return (
                  <button
                    key={b.blockNumber}
                    onClick={() => jumpToBlock(idx)}
                    className={`px-3 py-1 border text-[11px] font-mono transition-all cursor-pointer rounded-sm ${
                      isActive
                        ? b.isActivePinnacle
                          ? "border-[#00F0FF] bg-[#00F0FF]/20 text-[#00F0FF] font-bold shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                          : "border-[#38BDF8] bg-[#38BDF8]/15 text-[#38BDF8] font-bold shadow-[0_0_12px_rgba(56,189,248,0.3)]"
                        : "border-[#1e293b] text-[#94A3B8] hover:border-[#38BDF8]/60 hover:text-white bg-[#0b0f19]/60"
                    }`}
                    title={b.organization}
                  >
                    BLOCK 0{b.blockNumber}
                    {b.isActivePinnacle ? " ★" : ""}
                  </button>
                );
              })}
            </div>

            {/* Right: Telemetry & State */}
            <div className="hidden lg:flex items-center gap-4 text-xs font-mono">
              <span className="text-[#94A3B8]">
                TIMESTAMP: <span className="text-[#00F0FF] font-semibold">{currentBlock.timestamp}</span>
              </span>
              <span
                className={`px-2.5 py-0.5 border text-[10px] font-medium rounded-sm ${
                  currentBlock.isActivePinnacle
                    ? "border-[#00F0FF]/60 bg-[#00F0FF]/15 text-[#00F0FF]"
                    : "border-[#10B981]/50 bg-[#10B981]/10 text-[#34D399]"
                }`}
              >
                {currentBlock.isActivePinnacle ? "★ ACTIVE L1 PROTOCOL" : "✓ FINALIZED LINK"}
              </span>
            </div>
          </div>
        </header>

        {/* Main Viewport: 3D Canvas + 5-Stage Adaptive HTML Inspection HUD */}
        <div className="relative z-30 flex-1 w-full h-full">
          {/* 5-Stage Adaptive Computational Inspection Card (Left Side) */}
          {!inspectionState.isOverview ? (
            <div className="absolute top-4 sm:top-6 left-4 sm:left-6 lg:left-10 z-30 pointer-events-none max-w-xs sm:max-w-md lg:max-w-lg transition-all duration-300">
              <div className="p-4 sm:p-5 rounded-2xl bg-[#080d1a]/95 border border-[#1e293b] backdrop-blur-2xl shadow-[0_20px_45px_rgba(0,0,0,0.8)]">
                {/* Stage 1: Block ID & Deterministic Hash */}
                <div className="flex items-center justify-between gap-3 mb-3 pb-2.5 border-b border-[#1e293b]">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[#00F0FF] font-bold tracking-wider">
                      BLOCK #0{currentBlock.blockNumber}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0f172a] text-[#94A3B8] border border-[#1e293b]">
                      {currentBlock.timestamp}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#64748B]">
                    DATA HASH: {currentBlock.blockHex}
                  </span>
                </div>

                {/* Stage 2: Organization & Role (Unlocked at Stage >= 2) */}
                <div
                  className={`transition-all duration-500 ${
                    inspectionState.stageIndex >= 2 ? "opacity-100 translate-y-0" : "opacity-25 translate-y-1"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                      {currentBlock.organization}
                    </h3>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        currentBlock.isActivePinnacle
                          ? "bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/40 font-semibold"
                          : "bg-[#0f172a] text-[#38BDF8] border border-[#1e293b]"
                      }`}
                    >
                      {currentBlock.employmentType}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-mono text-[#38BDF8] font-medium mb-2.5">
                    {currentBlock.position}
                  </p>
                </div>

                {/* Stage 3: Period & Location (Unlocked at Stage >= 3) */}
                <div
                  className={`transition-all duration-500 mb-3 text-[11px] font-mono text-[#94A3B8] flex flex-wrap items-center gap-3 ${
                    inspectionState.stageIndex >= 3 ? "opacity-100 translate-y-0" : "opacity-20 translate-y-1"
                  }`}
                >
                  <span className="flex items-center gap-1.5 text-[#cbd5e1]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
                    {currentBlock.period}
                  </span>
                  <span>•</span>
                  <span>{currentBlock.location}</span>
                </div>

                {/* Stage 4: What Was Built / Accomplished (Unlocked at Stage >= 4) */}
                <div
                  className={`transition-all duration-500 mb-3.5 ${
                    inspectionState.stageIndex >= 4 ? "opacity-100 translate-y-0" : "opacity-15 translate-y-1"
                  }`}
                >
                  <p className="text-xs sm:text-[13px] text-[#e2e8f0] leading-relaxed">
                    {currentBlock.description}
                  </p>
                </div>

                {/* Stage 5: Validated Capabilities & Protocol Stack (Unlocked at Stage >= 5) */}
                <div
                  className={`transition-all duration-500 mb-3.5 ${
                    inspectionState.stageIndex >= 5 ? "opacity-100 translate-y-0" : "opacity-10 translate-y-1"
                  }`}
                >
                  <div className="flex flex-wrap gap-1.5">
                    {currentBlock.skills.map((sk) => (
                      <span
                        key={sk}
                        className="px-2 py-0.5 rounded-md bg-[#0f172a] border border-[#1e293b] text-[10px] font-mono text-[#38BDF8]"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Verification Status Stamp */}
                <div className="pt-2 border-t border-[#1e293b] flex items-center justify-between text-[10px] font-mono">
                  <span className="text-[#64748B]">STATE INTEGRITY:</span>
                  <span
                    className={`font-semibold ${
                      inspectionState.isFinalized
                        ? currentBlock.isActivePinnacle
                          ? "text-[#00F0FF]"
                          : "text-[#34D399]"
                        : "text-[#F59E0B]"
                    }`}
                  >
                    {inspectionState.isFinalized
                      ? currentBlock.isActivePinnacle
                        ? "★ ACTIVE SOVEREIGN RUNTIME // RECORDED"
                        : "✓ BLOCK FINALIZED // EXPERIENCE RECORDED"
                      : "INSPECTING & VERIFYING DATA LAYERS..."}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* Climax Full Career Blockchain Overview HUD Banner */
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none text-center max-w-xl px-4">
              <div className="p-4 rounded-2xl bg-[#080d1a]/90 border border-[#00F0FF]/40 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,240,255,0.25)]">
                <span className="text-[10px] font-mono tracking-widest text-[#00F0FF] uppercase font-bold block mb-1">
                  IMMUTABLE CAREER BLOCKCHAIN // UNBROKEN CONTINUITY
                </span>
                <p className="text-xs text-[#cbd5e1] mb-2 font-mono">
                  All 5 verified engineering milestones linked and active.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2 pointer-events-auto">
                  {blockchainExperienceBlocks.map((b, idx) => (
                    <button
                      key={b.blockNumber}
                      onClick={() => jumpToBlock(idx)}
                      className={`px-2.5 py-1 rounded text-[10px] font-mono border transition-all cursor-pointer ${
                        b.isActivePinnacle
                          ? "border-[#00F0FF] bg-[#00F0FF]/20 text-[#00F0FF] font-bold"
                          : "border-[#1e293b] text-[#94A3B8] hover:border-[#38BDF8] hover:text-white bg-[#0f172a]"
                      }`}
                    >
                      0{b.blockNumber}: {b.organization.split(" ")[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 3D WebGL Canvas */}
          <BlockchainExperienceCanvas
            scrollProgress={scrollFraction}
            onInspectionChange={(state) => {
              setInspectionState(state);
            }}
          />
        </div>

        {/* Bottom Status & Scroll Hint Bar */}
        <footer className="relative z-40 w-full bg-[#07090e]/90 backdrop-blur-xl border-t border-[#1e293b]/80 py-3 sm:py-3.5 px-6 sm:px-10">
          <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
            {/* Left: Active Block Metadata */}
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`px-2.5 py-0.5 border text-[11px] font-bold rounded-sm ${
                  currentBlock.isActivePinnacle
                    ? "bg-[#00F0FF]/15 border-[#00F0FF]/50 text-[#00F0FF]"
                    : "bg-[#0f172a] border-[#1e293b] text-[#38BDF8]"
                }`}
              >
                BLOCK 0{currentBlock.blockNumber}
              </span>
              <span className="text-[#F8FAFC] font-semibold">{currentBlock.organization}</span>
              <span className="text-[#94A3B8] hidden md:inline">({currentBlock.position})</span>
            </div>

            {/* Right: Scroll Inspection Progression */}
            <div className="flex items-center gap-4 text-[#94A3B8] text-[11px]">
              <span>
                {inspectionState.isOverview
                  ? "COMPLETE CAREER LEDGER ACTIVE"
                  : "SCROLL TO INSPECT & CONSTRUCT BLOCKS"}
              </span>
              <span className="text-[#00F0FF] font-bold">{Math.round(scrollFraction * 100)}%</span>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
