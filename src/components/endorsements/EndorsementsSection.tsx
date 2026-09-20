"use client";

import React, { useState, useMemo } from "react";
import { scrollReelTestimonialsData } from "@/data/endorsements";
import { EndorsementsHero } from "./EndorsementsHero";
import { EndorsementFilters, FilterCategory } from "./EndorsementFilters";
import { ScrollReelTestimonials } from "@/components/ui/scroll-reel-testimonials";
import { EndorsementsCTA } from "./EndorsementsCTA";

interface EndorsementsSectionProps {
  isStandalonePage?: boolean;
}

export const EndorsementsSection: React.FC<EndorsementsSectionProps> = ({
  isStandalonePage = false,
}) => {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("ALL");

  const filteredTestimonials = useMemo(() => {
    if (activeCategory === "ALL") return scrollReelTestimonialsData;
    return scrollReelTestimonialsData.filter((e) => e.category === activeCategory);
  }, [activeCategory]);

  return (
    <section
      id="endorsements"
      className="relative w-full bg-[#08080c] text-white py-16 sm:py-20 lg:py-28 px-6 sm:px-10 lg:px-14 border-t border-white/[0.06] scroll-mt-14"
      aria-label="Client Reviews and Testimonials"
    >
      <div className="max-w-[1600px] mx-auto w-full flex flex-col gap-10 sm:gap-12">
        {/* 1. Hero */}
        <EndorsementsHero />

        {/* 2. Filter Segmented Control */}
        <div className="flex items-center">
          <EndorsementFilters
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />
        </div>

        {/* 3. Counter-rotating Scroll Reel Testimonial Showcase */}
        {filteredTestimonials.length > 0 ? (
          <div className="w-full flex justify-center py-2">
            <ScrollReelTestimonials
              key={activeCategory}
              testimonials={filteredTestimonials}
              charStaggerMs={5}
              className="w-full"
            />
          </div>
        ) : (
          /* Empty state for categories with cohorts in flight */
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
