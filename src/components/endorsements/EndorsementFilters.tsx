"use client";

import React from "react";
import { Endorsement } from "@/types";

interface EndorsementFiltersProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  endorsements: Endorsement[];
}

export const EndorsementFilters: React.FC<EndorsementFiltersProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
  endorsements,
}) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/10">
      {categories.map((cat) => {
        const count =
          cat === "ALL"
            ? endorsements.length
            : endorsements.filter((e) => e.category === cat).length;
        const isSelected = activeCategory === cat;

        return (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`group flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono whitespace-nowrap transition-all duration-200 border cursor-pointer ${
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
            <span className="font-semibold">{cat}</span>
            <span className="text-zinc-600">(0{count})</span>
          </button>
        );
      })}
    </div>
  );
};
