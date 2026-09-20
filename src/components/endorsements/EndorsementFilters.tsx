"use client";

import React from "react";

export type FilterCategory = "ALL" | "CLIENT" | "ENGINEERING" | "MENTORSHIP";

interface EndorsementFiltersProps {
  activeCategory: FilterCategory;
  onSelectCategory: (category: FilterCategory) => void;
}

const filterTabs: { id: FilterCategory; label: string }[] = [
  { id: "ALL", label: "ALL" },
  { id: "CLIENT", label: "CLIENT WORK" },
  { id: "ENGINEERING", label: "ENGINEERING" },
  { id: "MENTORSHIP", label: "MENTORSHIP" },
];

export const EndorsementFilters: React.FC<EndorsementFiltersProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <div
      role="tablist"
      aria-label="Filter reviews by engagement category"
      className="inline-flex flex-wrap items-center gap-1.5 p-1 rounded-lg bg-[#0c0c10] border border-white/[0.08]"
    >
      {filterTabs.map((tab) => {
        const isActive = activeCategory === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelectCategory(tab.id)}
            className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all duration-150 cursor-pointer ${
              isActive
                ? "bg-white/[0.08] text-white font-medium border border-white/[0.12]"
                : "text-zinc-400 hover:text-zinc-200 border border-transparent"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};
