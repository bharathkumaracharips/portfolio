"use client";

import React from "react";

export const StartProjectHero: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 max-w-3xl">
      {/* Eyebrow */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
          GET IN TOUCH
        </span>
        <span className="w-1 h-1 rounded-full bg-zinc-600" />
        <span className="text-xs font-mono text-zinc-500 tracking-wider uppercase">
          DIRECT INQUIRY
        </span>
      </div>

      {/* Main Title & Editorial Subtitle */}
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white font-sans">
          START A PROJECT
        </h2>
        <p className="text-base sm:text-lg text-zinc-400 font-light leading-relaxed">
          Tell me what you&apos;re building, where you&apos;re stuck, or what you&apos;d like to engineer.
        </p>
      </div>

      {/* Subtle scope metadata */}
      <div className="flex items-center gap-2 pt-1 text-xs font-mono text-zinc-500">
        <span>PROTOCOLS</span>
        <span className="text-zinc-700">&bull;</span>
        <span>SYSTEMS</span>
        <span className="text-zinc-700">&bull;</span>
        <span>INFRASTRUCTURE</span>
        <span className="text-zinc-700">&bull;</span>
        <span>WEB3</span>
      </div>
    </div>
  );
};
