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
  const categories = [
    { label: "ALL", value: "ALL", count: certificationsData.length },
    {
      label: "BLOCKCHAIN & PROTOCOL",
      value: "BLOCKCHAIN & PROTOCOL",
      count: certificationsData.filter((c) => c.category === "BLOCKCHAIN & PROTOCOL").length,
    },
    {
      label: "CLOUD & ARCHITECTURE",
      value: "CLOUD & ARCHITECTURE",
      count: certificationsData.filter((c) => c.category === "CLOUD & ARCHITECTURE").length,
    },
    {
      label: "INFRASTRUCTURE & DEVOPS",
      value: "INFRASTRUCTURE & DEVOPS",
      count: certificationsData.filter((c) => c.category === "INFRASTRUCTURE & DEVOPS").length,
    },
  ];

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/10">
      {categories.map((cat) => {
        const isSelected = selectedCategory === cat.value;
        return (
          <button
            key={cat.value}
            onClick={() => onSelectCategory(cat.value)}
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
            <span className="font-semibold">{cat.label}</span>
            <span className="text-zinc-600">({cat.count})</span>
          </button>
        );
      })}
    </div>
  );
};
