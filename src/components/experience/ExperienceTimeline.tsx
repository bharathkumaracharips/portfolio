"use client";

import React from "react";
import { motion } from "framer-motion";

export interface TimelineItem {
  id: string;
  year: string;
  stage: string;
  role?: string;
  organization?: string;
}

interface ExperienceTimelineProps {
  items: TimelineItem[];
  activeId: string;
  onSelect: (id: string) => void;
}

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({
  items,
  activeId,
  onSelect,
}) => {
  return (
    <nav
      aria-label="Experience career chronology"
      className="sticky top-28 lg:top-32 flex flex-col gap-4 select-none py-2"
    >
      <div className="flex items-center justify-between pb-2 border-b border-white/[0.08] pr-2">
        <span className="text-[11px] font-mono tracking-[0.2em] text-zinc-400 uppercase font-semibold">
          CHRONOLOGY
        </span>
      </div>

      <div className="flex flex-col gap-4 relative pt-1">
        {/* Subtle connecting rail line */}
        <div className="absolute left-[7px] top-3 bottom-3 w-px bg-white/[0.1]" />

        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              className={`group flex items-center gap-3.5 text-left py-1.5 transition-all duration-200 cursor-pointer ${
                isActive ? "text-white" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {/* Dot indicator */}
              <div className="relative z-10 flex items-center justify-center w-3.5 h-3.5 shrink-0">
                {isActive && (
                  <motion.div
                    layoutId="chronologyActiveGlow"
                    className="absolute -inset-1 rounded-full bg-cyan-400/25 blur-[3px]"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                <div
                  className={`rounded-full transition-all duration-300 ${
                    isActive
                      ? "w-2.5 h-2.5 bg-[#00F0FF] shadow-[0_0_10px_#00F0FF] ring-2 ring-[#050508]"
                      : "w-1.5 h-1.5 bg-zinc-600 group-hover:bg-zinc-400"
                  }`}
                />
              </div>

              {/* Year & Stage */}
              <div className="flex flex-col">
                <span
                  className={`text-sm font-mono tracking-tight transition-colors duration-200 ${
                    isActive
                      ? "font-bold text-white"
                      : "font-normal text-zinc-400 group-hover:text-zinc-300"
                  }`}
                >
                  {item.year}
                </span>
                <span
                  className={`text-[10px] font-mono tracking-wider transition-colors duration-200 ${
                    isActive
                      ? "text-cyan-400 font-medium"
                      : "text-zinc-600 group-hover:text-zinc-500"
                  }`}
                >
                  CH. {item.stage}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
