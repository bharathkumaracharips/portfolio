"use client";

import React, { useState } from "react";
import { lectureArchiveData, LectureItem } from "@/data/teaching";
import { TeachingLectureViewer } from "./TeachingLectureViewer";
import { Database, Play, Clock, ArrowUpRight, BookOpen } from "lucide-react";

export function TeachingArchive() {
  const [activeLecture, setActiveLecture] = useState<LectureItem | null>(null);

  return (
    <section id="archive" className="relative w-full py-20 px-6 sm:px-10 border-b border-[#1e293b]/70 bg-[#040710]">
      <div className="max-w-[1440px] w-full mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 pb-4 border-b border-[#1e293b]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Database className="w-4 h-4 text-[#00F0FF]" />
              <span className="text-xs font-mono tracking-widest text-[#00F0FF] uppercase font-bold">
                04 // FULL ARCHIVE
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Curriculum Knowledge Index
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-[#94A3B8] max-w-md">
            Complete structured repository of live lecture recordings, terminal workshops, and code reviews.
          </p>
        </div>

        {/* Structured Archive Table */}
        <div className="rounded-2xl bg-[#080d1a] border border-[#1e293b] overflow-hidden">
          <div className="p-4 bg-[#0a101d] border-b border-[#1e293b] grid grid-cols-12 gap-4 text-[10px] font-mono text-[#64748B] uppercase tracking-wider">
            <span className="col-span-2 sm:col-span-1">ID</span>
            <span className="col-span-6 sm:col-span-5">Lecture Topic & Breakdown</span>
            <span className="col-span-2 hidden sm:block">Domain</span>
            <span className="col-span-2 hidden sm:block">Source</span>
            <span className="col-span-2 sm:col-span-2 text-right">Action</span>
          </div>

          <div className="divide-y divide-[#1e293b]/60">
            {lectureArchiveData.map((lec) => (
              <div
                key={lec.id}
                onClick={() => setActiveLecture(lec)}
                className="p-4 sm:p-5 grid grid-cols-12 gap-4 items-center hover:bg-[#0c1424] transition-colors cursor-pointer group"
              >
                {/* ID */}
                <div className="col-span-2 sm:col-span-1 text-xs font-mono text-[#00F0FF] font-bold">
                  {lec.number.split(" ")[1]}
                </div>

                {/* Title & Summary */}
                <div className="col-span-6 sm:col-span-5">
                  <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-[#00F0FF] transition-colors mb-0.5">
                    {lec.title}
                  </h4>
                  <p className="text-xs text-[#94A3B8] line-clamp-1">{lec.summary}</p>
                </div>

                {/* Domain */}
                <div className="col-span-2 hidden sm:block">
                  <span className="px-2 py-0.5 rounded bg-[#0f172a] border border-[#1e293b] text-[10px] font-mono text-[#38BDF8]">
                    {lec.category}
                  </span>
                </div>

                {/* Source & Duration */}
                <div className="col-span-2 hidden sm:flex items-center gap-2 text-xs font-mono text-[#cbd5e1]">
                  <span>{lec.source}</span>
                  <span className="text-[#64748B]">({lec.duration})</span>
                </div>

                {/* Action Trigger */}
                <div className="col-span-4 sm:col-span-2 flex items-center justify-end">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0f172a] group-hover:bg-[#00F0FF]/15 border border-[#1e293b] group-hover:border-[#00F0FF]/60 text-xs font-mono text-[#00F0FF] transition-all">
                    <Play className="w-3 h-3 fill-current" />
                    <span>Watch</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Viewer */}
        <TeachingLectureViewer
          lecture={activeLecture}
          onClose={() => setActiveLecture(null)}
        />
      </div>
    </section>
  );
}
