"use client";

import React, { useEffect, useState } from "react";
import { LectureItem } from "@/data/teaching";
import { Play, Pause, X, Clock, Terminal, Layers, CheckCircle2, BookOpen, Sparkles } from "lucide-react";

interface TeachingLectureViewerProps {
  lecture: LectureItem | null;
  onClose: () => void;
}

export function TeachingLectureViewer({ lecture, onClose }: TeachingLectureViewerProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeTraceStep, setActiveTraceStep] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Terminal line trace animation loop
  useEffect(() => {
    if (!lecture || !isPlaying) return;
    const interval = setInterval(() => {
      setActiveTraceStep((prev) => (prev + 1) % lecture.terminalTrace.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [lecture, isPlaying]);

  if (!lecture) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#080e1b] border border-[#1e293b] rounded-2xl shadow-[0_30px_70px_rgba(0,240,255,0.25)] overflow-hidden max-h-[92vh] flex flex-col justify-between">
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-5 border-b border-[#1e293b] flex items-center justify-between bg-[#070b14]/95">
          <div className="flex items-center gap-2 sm:gap-3 text-xs font-mono">
            <span className="px-2.5 py-0.5 rounded bg-[#00F0FF]/15 border border-[#00F0FF]/40 text-[#00F0FF] font-bold">
              {lecture.number}
            </span>
            <span className="text-[#94A3B8] hidden sm:inline">// {lecture.source}</span>
            <span className="text-[#64748B]">({lecture.category})</span>
          </div>

          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#0f172a] border border-[#1e293b] text-xs font-mono text-[#94A3B8] hover:text-white hover:border-[#00F0FF] transition-all cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            <span>ESC</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Lecture Title & Metadata */}
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs font-mono text-[#38BDF8]">
              <Clock className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span>DURATION: {lecture.duration}</span>
              <span>•</span>
              <span>TECHNICAL DEEP-DIVE</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-bold text-white mb-2 leading-tight">
              {lecture.title}
            </h2>
            <p className="text-sm text-[#cbd5e1] leading-relaxed">
              {lecture.summary}
            </p>
          </div>

          {/* 1. CINEMATIC LECTURE SIMULATOR & TERMINAL PLAYBACK */}
          <div className="rounded-xl bg-[#04070e] border border-[#1e293b] overflow-hidden">
            {/* Player Toolbar */}
            <div className="p-3 bg-[#0a101d] border-b border-[#1e293b] flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1 rounded bg-[#0f172a] text-[#00F0FF] border border-[#1e293b] hover:border-[#00F0FF] cursor-pointer"
                  title={isPlaying ? "Pause trace" : "Play trace"}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
                <span className="text-white font-semibold">{lecture.videoSnippetTitle}</span>
              </div>
              <span className="text-[#34D399] text-[10px] hidden sm:inline">
                ● LIVE CODE EXECUTION TRACE
              </span>
            </div>

            {/* Terminal Trace Terminal Box */}
            <div className="p-4 sm:p-5 font-mono text-xs text-[#38BDF8] bg-[#050913] space-y-1.5 min-h-[160px]">
              {lecture.terminalTrace.map((line, idx) => (
                <div
                  key={idx}
                  className={`transition-all duration-300 ${
                    idx === activeTraceStep
                      ? "text-[#00F0FF] font-bold bg-[#00F0FF]/10 px-2 py-0.5 rounded border-l-2 border-[#00F0FF]"
                      : "text-[#94A3B8] opacity-80 pl-2"
                  }`}
                >
                  {line}
                </div>
              ))}
            </div>
          </div>

          {/* 2. ARCHITECTURE EXECUTION PROGRESSION */}
          <div>
            <h4 className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#00F0FF]" />
              <span>Step-by-Step Architecture Flow</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {lecture.architectureSteps.map((step) => (
                <div
                  key={step.step}
                  className="p-3.5 rounded-lg bg-[#0a1120] border border-[#1e293b] flex flex-col justify-between"
                >
                  <span className="text-xs font-mono font-bold text-[#00F0FF] mb-1">
                    {step.step}
                  </span>
                  <p className="text-xs text-[#cbd5e1] leading-relaxed">
                    {step.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 3. KEY PEDAGOGICAL TAKEAWAYS */}
          <div>
            <h4 className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
              <span>Key Concepts & Takeaways</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#cbd5e1]">
              {lecture.keyTakeaways.map((takeaway, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="text-[#00F0FF] font-mono mt-0.5">●</span>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-[#1e293b] flex items-center justify-between bg-[#070b14]/95">
          <div className="flex flex-wrap gap-1">
            {lecture.topics.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded bg-[#0f172a] border border-[#1e293b] text-[10px] font-mono text-[#38BDF8]"
              >
                {t}
              </span>
            ))}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#1e293b] text-xs font-mono text-white hover:bg-[#334155] transition-all cursor-pointer"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
}
