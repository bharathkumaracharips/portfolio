"use client";

import React, { useState, useMemo } from "react";
import { endorsementsData } from "@/data/endorsements";
import { EndorsementsHero } from "./EndorsementsHero";
import { EndorsementFilters, FilterCategory } from "./EndorsementFilters";
import { EndorsementCard } from "./EndorsementCard";
import { EndorsementsCTA } from "./EndorsementsCTA";

interface EndorsementsSectionProps {
  isStandalonePage?: boolean;
}

export const EndorsementsSection: React.FC<EndorsementsSectionProps> = ({
  isStandalonePage = false,
}) => {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("ALL");

  const filteredEndorsements = useMemo(() => {
    if (activeCategory === "ALL") return endorsementsData;
    return endorsementsData.filter((e) => e.category === activeCategory);
  }, [activeCategory]);

  return (
    <section
      id="endorsements"
      className="relative w-full bg-[#08080c] text-white py-16 sm:py-20 lg:py-28 px-6 sm:px-10 lg:px-16 border-t border-white/[0.06] scroll-mt-14"
      aria-label="Client Reviews and Testimonials"
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col gap-10 sm:gap-12">
        {/* 1. Hero */}
        <EndorsementsHero />

        {/* 2. Filter Segmented Control */}
        <div className="flex items-center">
          <EndorsementFilters
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />
        </div>

        {/* 3. Review Cards (2-column desktop grid, 1-column mobile) */}
        {filteredEndorsements.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {filteredEndorsements.map((endorsement, index) => (
              <EndorsementCard
                key={endorsement.id}
                endorsement={endorsement}
                index={index}
              />
            ))}
          </div>
        ) : (
          /* Quiet empty state (e.g. for MENTORSHIP when active cohorts are in flight) */
          <div className="rounded-xl border border-white/[0.06] bg-[#0c0c10] p-10 text-center flex flex-col items-center justify-center gap-3">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
              ACTIVE COHORTS IN PROGRESS
            </span>
            <p className="text-sm text-zinc-400 max-w-md leading-relaxed font-light">
              Mentorship and curriculum reviews will be published following the graduation of the current systems engineering cohort.
            </p>
          </div>
        )}

        {/* 4. Natural Conversion Bridge to Project Discussions */}
        <EndorsementsCTA />
      </div>
    </section>
  );
};
