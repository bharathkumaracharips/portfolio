"use client";

import React, { useState, useMemo } from "react";
import { endorsementsData } from "@/data/endorsements";
import { Endorsement } from "@/types";
import { EndorsementsHero } from "./EndorsementsHero";
import { EndorsementFilters } from "./EndorsementFilters";
import { EndorsementSignal } from "./EndorsementSignal";
import { EndorsementDetail } from "./EndorsementDetail";

interface EndorsementsSectionProps {
  isStandalonePage?: boolean;
}

export const EndorsementsSection: React.FC<EndorsementsSectionProps> = ({
  isStandalonePage = false,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [activeSignalId, setActiveSignalId] = useState<string>(
    endorsementsData[0]?.id || "signal-001"
  );
  const [detailEndorsement, setDetailEndorsement] = useState<Endorsement | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);

  // Derive available categories dynamically from genuine data
  const availableCategories = useMemo(() => {
    const cats = Array.from(new Set(endorsementsData.map((e) => e.category)));
    return ["ALL", ...cats];
  }, []);

  // Filter endorsements
  const filteredEndorsements = useMemo(() => {
    if (activeCategory === "ALL") return endorsementsData;
    return endorsementsData.filter((e) => e.category === activeCategory);
  }, [activeCategory]);

  const handleOpenDetail = (endorsement: Endorsement) => {
    setDetailEndorsement(endorsement);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
  };

  return (
    <section
      id="endorsements"
      className="relative w-full min-h-screen bg-[#050505] text-[#F5F5F2] py-12 sm:py-16 lg:py-20 px-6 sm:px-10 lg:px-14 flex flex-col justify-center border-t border-white/[0.05] scroll-mt-14"
      aria-label="Endorsements & Testimonials - Signals from the Network"
    >
      {/* Ambient Background Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[850px] h-[400px] bg-cyan-950/15 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-16 right-10 w-[550px] h-[300px] bg-emerald-950/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="relative max-w-[1600px] mx-auto w-full flex flex-col gap-6 sm:gap-8">
        {/* 1. Hero */}
        <EndorsementsHero />

        {/* 2. Category Filters */}
        <EndorsementFilters
          categories={availableCategories}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          endorsements={endorsementsData}
        />

        {/* 3. Interactive Signal Spotlight & 3D Network Canvas */}
        <EndorsementSignal
          endorsements={filteredEndorsements}
          activeId={activeSignalId}
          onSelectEndorsement={setActiveSignalId}
          onOpenDetail={handleOpenDetail}
        />



        {/* 6. Detail Modal */}
        <EndorsementDetail
          endorsement={detailEndorsement}
          isOpen={isDetailOpen}
          onClose={handleCloseDetail}
        />
      </div>
    </section>
  );
};
