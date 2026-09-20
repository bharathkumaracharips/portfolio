"use client";

import React, { useState, useEffect } from "react";
import { experienceChaptersData } from "@/data/experience";
import { ExperienceHero } from "./ExperienceHero";
import { ExperienceTrajectory } from "./ExperienceTrajectory";
import { ExperienceTimeline, TimelineItem } from "./ExperienceTimeline";
import { ExperienceChapter } from "./ExperienceChapter";

export const ExperienceBlockchainSection: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(
    experienceChaptersData[0].id
  );

  // Timeline items with individual chapter stage identifiers
  const timelineItems: TimelineItem[] = experienceChaptersData.map((c) => ({
    id: c.id,
    year: c.year,
    stage: c.stage,
    role: c.role,
    organization: c.organization,
  }));

  // Accurate scroll tracking to sync sticky chronology rail with currently viewed chapter
  useEffect(() => {
    const handleScroll = () => {
      // Trigger threshold at 35% from the top of the viewport
      const triggerY = window.innerHeight * 0.35;
      let currentActiveId = experienceChaptersData[0].id;

      for (const chapter of experienceChaptersData) {
        const el = document.getElementById(`experience-${chapter.id}`);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= triggerY) {
          currentActiveId = chapter.id;
        }
      }

      setActiveId(currentActiveId);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll(); // Initial evaluation

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const handleSelectChapter = (id: string) => {
    setActiveId(id);
    const target = document.getElementById(`experience-${id}`);
    if (target) {
      const yOffset = -100;
      const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section
      id="experience"
      className="relative w-full bg-[#050508] text-white py-16 sm:py-20 lg:py-28 px-6 sm:px-10 lg:px-14 border-t border-white/[0.06] scroll-mt-14"
      aria-label="Engineering Experience & Technical Progression"
    >
      <div className="max-w-[1600px] mx-auto w-full flex flex-col gap-12 sm:gap-14">
        {/* 1. Hero Positioning */}
        <ExperienceHero />

        {/* 2. Cinematic Technical Trajectory Intro */}
        <ExperienceTrajectory />

        {/* 3. Main Split Grid: Sticky Timeline Rail + Technical Chapters */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative">
          {/* Left Column: Sticky Timeline Nav Rail (Stretches full height of chapters so sticky sticks) */}
          <div className="hidden lg:block lg:col-span-3 xl:col-span-2 relative self-stretch h-full">
            <ExperienceTimeline
              items={timelineItems}
              activeId={activeId}
              onSelect={handleSelectChapter}
            />
          </div>

          {/* Right Column: Experience Chapters */}
          <div className="lg:col-span-9 xl:col-span-10 flex flex-col gap-8 sm:gap-10">
            {experienceChaptersData.map((chapter, index) => (
              <ExperienceChapter
                key={chapter.id}
                chapter={chapter}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
