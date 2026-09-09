"use client";

import React, { useState } from "react";
import { lectureArchiveData, LectureItem } from "@/data/teaching";
import { TeachingLectureCard } from "./TeachingLectureCard";
import { TeachingLectureViewer } from "./TeachingLectureViewer";
import { Video, Filter } from "lucide-react";

export function TeachingLectureArchive() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [activeLecture, setActiveLecture] = useState<LectureItem | null>(null);

  const categories = ["ALL", "EVM & SOLIDITY", "SUBSTRATE & RUST", "CONSENSUS & L2"];

  const filteredLectures =
    selectedCategory === "ALL"
      ? lectureArchiveData
      : lectureArchiveData.filter((l) => l.category === selectedCategory);

  return (
    <section id="lectures" className="relative w-full py-20 px-6 sm:px-10 border-b border-[#1e293b]/70 bg-[#040710]">
      <div className="max-w-[1440px] w-full mx-auto">
        {/* Section Header & Filters */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 pb-4 border-b border-[#1e293b]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Video className="w-4 h-4 text-[#00F0FF]" />
              <span className="text-xs font-mono tracking-widest text-[#00F0FF] uppercase font-bold">
                02 // CURATED LECTURES
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Selected Technical Lectures
            </h2>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-[#64748B] hidden sm:inline" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all border cursor-pointer ${
                  selectedCategory === cat
                    ? "border-[#00F0FF] bg-[#00F0FF]/15 text-[#00F0FF] font-bold shadow-[0_0_12px_rgba(0,240,255,0.3)]"
                    : "border-[#1e293b] text-[#94A3B8] hover:border-[#38BDF8]/60 hover:text-white bg-[#0f172a]/60"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Lectures Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredLectures.map((lecture) => (
            <TeachingLectureCard
              key={lecture.id}
              lecture={lecture}
              onSelectLecture={setActiveLecture}
            />
          ))}
        </div>

        {/* Deep Dive Modal Viewer */}
        <TeachingLectureViewer
          lecture={activeLecture}
          onClose={() => setActiveLecture(null)}
        />
      </div>
    </section>
  );
}
