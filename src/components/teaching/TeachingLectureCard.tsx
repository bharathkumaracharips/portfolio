"use client";

import React, { useState, useRef } from "react";
import { LectureItem } from "@/data/teaching";
import { Play, Clock, Terminal, ChevronRight, Sparkles, Layers } from "lucide-react";

interface TeachingLectureCardProps {
  lecture: LectureItem;
  onSelectLecture: (lecture: LectureItem) => void;
}

export function TeachingLectureCard({ lecture, onSelectLecture }: TeachingLectureCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelectLecture(lecture)}
      className="group relative rounded-2xl bg-[#080d1a]/95 border border-[#1e293b] hover:border-[#00F0FF]/60 backdrop-blur-xl shadow-[0_16px_36px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      {/* 1. CINEMATIC VIDEO / PREVIEW CANVAS FRAME */}
      <div className="relative w-full aspect-video bg-[#05070f] border-b border-[#1e293b] flex flex-col justify-between p-4 overflow-hidden">
        {/* Top Overlay Badge */}
        <div className="flex items-center justify-between z-10">
          <span className="px-2.5 py-0.5 rounded bg-[#070b14]/90 border border-[#1e293b] text-[10px] font-mono text-[#00F0FF] font-bold">
            {lecture.number}
          </span>
          <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#070b14]/90 border border-[#1e293b] text-[10px] font-mono text-[#94A3B8]">
            <Clock className="w-3 h-3 text-[#38BDF8]" />
            {lecture.duration}
          </span>
        </div>

        {/* Center Code / Simulation Snippet Preview */}
        <div className="my-auto z-10">
          <div className="font-mono text-[10px] text-[#38BDF8] line-clamp-3 bg-[#0c1424]/80 p-2.5 rounded-lg border border-[#1e293b]/70 backdrop-blur-sm">
            {lecture.terminalTrace.slice(0, 3).map((line, i) => (
              <p key={i} className="truncate">{line}</p>
            ))}
          </div>
        </div>

        {/* Play Button Overlay */}
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-all">
          <div className="w-12 h-12 rounded-full bg-[#00F0FF]/20 border border-[#00F0FF]/60 flex items-center justify-center text-[#00F0FF] group-hover:scale-110 group-hover:bg-[#00F0FF] group-hover:text-black transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)]">
            <Play className="w-5 h-5 ml-0.5 fill-current" />
          </div>
        </div>

        {/* Bottom Source Tag */}
        <div className="flex items-center justify-between z-10 text-[10px] font-mono">
          <span className="text-[#38BDF8]">{lecture.source}</span>
          <span className="text-[#64748B]">{lecture.category}</span>
        </div>
      </div>

      {/* 2. CARD CONTENT & METADATA */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-bold text-white group-hover:text-[#00F0FF] transition-colors mb-1.5 leading-snug">
            {lecture.title}
          </h3>
          <p className="text-xs text-[#cbd5e1] leading-relaxed mb-4 line-clamp-3">
            {lecture.summary}
          </p>
        </div>

        <div>
          {/* Key Topics */}
          <div className="flex flex-wrap gap-1 mb-4">
            {lecture.topics.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded bg-[#0f172a] border border-[#1e293b] text-[9px] font-mono text-[#94A3B8]"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Action Trigger */}
          <div className="pt-3 border-t border-[#1e293b] flex items-center justify-between text-xs font-mono text-[#00F0FF]">
            <span className="font-semibold group-hover:underline">WATCH LECTURE RECORDING</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
}
