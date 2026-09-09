"use client";

import React, { useState, useEffect } from "react";
import { lectureArchiveData, LectureItem } from "@/data/teaching";
import { TeachingProtocolCanvas } from "@/components/canvas/TeachingProtocolCanvas";

export const TeachingSection: React.FC = () => {
  const [selectedLectureId, setSelectedLectureId] = useState<string>(
    lectureArchiveData[0].id
  );
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [isPlayingTrace, setIsPlayingTrace] = useState<boolean>(false);

  const currentLecture: LectureItem =
    lectureArchiveData.find((l) => l.id === selectedLectureId) ||
    lectureArchiveData[0];

  // Auto-play trace steps if playing
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlayingTrace) {
      interval = setInterval(() => {
        setActiveStepIndex((prev) => (prev + 1) % currentLecture.terminalTrace.length);
      }, 1400);
    }
    return () => clearInterval(interval);
  }, [isPlayingTrace, currentLecture.terminalTrace.length]);

  // Reset trace step on lecture switch
  const handleSelectLecture = (id: string) => {
    setSelectedLectureId(id);
    setActiveStepIndex(0);
    setIsPlayingTrace(false);
  };

  return (
    <section
      id="teaching"
      className="relative w-full min-h-screen bg-[#050505] text-[#F5F5F2] py-20 px-4 sm:px-6 lg:px-12 flex flex-col justify-center border-t border-white/5"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-950/20 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[300px] bg-emerald-950/15 blur-[120px] pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto w-full flex flex-col gap-8">
        {/* Top Header & Telemetry */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono tracking-widest text-[#00F0FF] uppercase">
                ARCHIVE // 03
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-pulse" />
              <span className="text-[11px] font-mono tracking-wider text-zinc-400 uppercase">
                TECHNICAL KNOWLEDGE CONSOLE
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-sans text-white">
              Teaching & Protocol Lectures
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 max-w-2xl font-light">
              Deconstructing EVM bytecodes, Substrate runtimes, P2P consensus invariants, and zero-knowledge rollups through verified engineering lectures and live execution traces.
            </p>
          </div>

          {/* Verified Credentials Badges */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="px-3 py-2 rounded-lg bg-white/[0.03] border border-white/10 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00F0FF]" />
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-zinc-400">CREDENTIAL</span>
                <span className="text-xs font-mono font-semibold text-zinc-200">
                  ONE DEV Tutor — Blockchain Diploma
                </span>
              </div>
            </div>
            <div className="px-3 py-2 rounded-lg bg-white/[0.03] border border-white/10 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00FF66]" />
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-zinc-400">PRACTICE</span>
                <span className="text-xs font-mono font-semibold text-zinc-200">
                  Freelance Protocol Mentor
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Lecture Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/10">
          {lectureArchiveData.map((lec) => {
            const isSelected = lec.id === selectedLectureId;
            return (
              <button
                key={lec.id}
                onClick={() => handleSelectLecture(lec.id)}
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
                <span className="font-semibold">{lec.number}</span>
                <span className="text-zinc-500">//</span>
                <span className="truncate max-w-[140px] sm:max-w-[200px] text-zinc-300">
                  {lec.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Single-Console Grid (3D Knowledge Core + Interactive Trace Debugger) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column: 3D Interactive Knowledge Stack (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <TeachingProtocolCanvas
              selectedLectureId={selectedLectureId}
              onSelectLecture={handleSelectLecture}
            />

            {/* Quick Topic Chips & Source Telemetry */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-mono text-zinc-500 uppercase">
                  STACK TAGS:
                </span>
                {currentLecture.topics.map((topic, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/10 text-[11px] font-mono text-zinc-300"
                  >
                    #{topic}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                <span>SOURCE:</span>
                <span className="text-[#00FF66] font-semibold">
                  {currentLecture.source}
                </span>
                <span className="text-zinc-600">|</span>
                <span>DURATION:</span>
                <span className="text-zinc-200">{currentLecture.duration}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Technical Debugger & Architecture Panel (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Terminal Bytecode & Opcode Execution Window */}
            <div className="flex-1 flex flex-col rounded-xl overflow-hidden bg-[#0a0a0e] border border-white/10 shadow-2xl">
              {/* Terminal Window Chrome */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#111116] border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  <span className="ml-2 text-xs font-mono text-zinc-400">
                    opcode-debugger // {currentLecture.number.toLowerCase()}
                  </span>
                </div>

                {/* Play / Step Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsPlayingTrace(!isPlayingTrace)}
                    className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-mono text-[#00F0FF] transition-colors"
                  >
                    {isPlayingTrace ? "⏸ PAUSE" : "▶ PLAY TRACE"}
                  </button>
                  <button
                    onClick={() =>
                      setActiveStepIndex(
                        (prev) => (prev + 1) % currentLecture.terminalTrace.length
                      )
                    }
                    className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-mono text-zinc-300 transition-colors"
                  >
                    STEP ⏭
                  </button>
                </div>
              </div>

              {/* Terminal Output Body */}
              <div className="p-4 font-mono text-xs flex flex-col gap-1.5 overflow-y-auto max-h-[220px] scrollbar-thin scrollbar-thumb-white/10">
                {currentLecture.terminalTrace.map((line, idx) => {
                  const isActive = idx === activeStepIndex;
                  return (
                    <div
                      key={idx}
                      className={`flex items-start gap-2 px-2 py-1 rounded transition-colors ${
                        isActive
                          ? "bg-[#00F0FF]/15 text-[#00F0FF] border-l-2 border-[#00F0FF]"
                          : idx < activeStepIndex
                          ? "text-zinc-400"
                          : "text-zinc-600"
                      }`}
                    >
                      <span className="text-[10px] text-zinc-600 select-none w-4">
                        {idx + 1}
                      </span>
                      <span className="break-all">{line}</span>
                    </div>
                  );
                })}
              </div>

              {/* Step Detail Footer */}
              <div className="p-3 bg-[#08080c] border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                <span>
                  STEP {activeStepIndex + 1} OF {currentLecture.terminalTrace.length}
                </span>
                <span className="text-[#00FF66]">STATE: VERIFIED RUNTIME</span>
              </div>
            </div>

            {/* Architecture Steps Sequence */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono tracking-wider text-zinc-400 uppercase">
                  ARCHITECTURE EXECUTION SEQUENCE
                </span>
                <span className="text-[10px] font-mono text-[#00F0FF]">
                  {currentLecture.category}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                {currentLecture.architectureSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-2 rounded-lg bg-white/[0.02] border border-white/5"
                  >
                    <span className="text-xs font-mono font-bold text-[#00F0FF] shrink-0">
                      {step.step.split(" ")[0]}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-zinc-200">
                        {step.step.split(" ").slice(1).join(" ")}
                      </span>
                      <span className="text-[11px] text-zinc-400 font-light">
                        {step.detail}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Invariants & Takeaways */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col gap-2">
              <span className="text-xs font-mono tracking-wider text-zinc-400 uppercase">
                KEY PROTOCOL INVARIANTS
              </span>
              <ul className="flex flex-col gap-1.5 text-xs text-zinc-300 font-light list-disc list-inside">
                {currentLecture.keyTakeaways.map((takeaway, i) => (
                  <li key={i} className="leading-relaxed">
                    <span className="text-zinc-400">{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
