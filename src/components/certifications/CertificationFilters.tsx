"use client";

import React from "react";
import { certificationsData } from "@/data/certifications";

interface CertificationFiltersProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CertificationFilters: React.FC<CertificationFiltersProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const uniqueCategories = Array.from(
    new Set(certificationsData.map((c) => c.category))
  );

  const categories = [
    { label: "ALL", value: "ALL", count: certificationsData.length },
    ...uniqueCategories.map((cat) => ({
      label: cat,
      value: cat,
      count: certificationsData.filter((c) => c.category === cat).length,
    })),
  ];

  return (
    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
      {categories.map((cat) => {
        const isSelected = selectedCategory === cat.value;
        return (
          <button
            key={cat.value}
            onClick={() => onSelectCategory(cat.value)}
            className={`group flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg text-[11px] font-mono whitespace-nowrap transition-all duration-200 border cursor-pointer ${
              isSelected
                ? "bg-[#00F0FF]/10 text-[#00F0FF] border-[#00F0FF] shadow-[0_0_12px_rgba(0,240,255,0.2)]"
                : "bg-white/[0.02] text-zinc-400 border-white/10 hover:border-white/20 hover:text-zinc-200"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isSelected ? "bg-[#00F0FF] animate-pulse" : "bg-zinc-600"
              }`}
            />
            <span className="font-semibold">{cat.label}</span>
            <span className="text-zinc-600">({cat.count})</span>
          </button>
        );
      })}
    </div>
  );
};
