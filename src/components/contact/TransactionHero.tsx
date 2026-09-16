"use client";

import React from "react";

export const TransactionHero: React.FC = () => {
  return (
    <div className="flex flex-col gap-3 max-w-4xl">
      {/* Eyebrow */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-mono tracking-widest text-[#00F0FF] uppercase">
          TRANSACTION // 05
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-pulse" />
        <span className="text-[11px] font-mono tracking-wider text-zinc-400 uppercase">
          FINAL SYSTEM INTERACTION
        </span>
      </div>

      {/* Main Title & Tagline in concise layout */}
      <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-sans text-white">
          TRANSACTION
        </h1>
        <span className="text-sm sm:text-base font-mono text-[#00F0FF]">
          &ldquo;The network is open.&rdquo;
        </span>
      </div>

      {/* Supporting Narrative */}
      <p className="text-xs sm:text-sm text-zinc-400 font-light max-w-2xl leading-relaxed">
        Have a protocol to build, a system to architect, or an idea worth engineering?
        Create a message payload and broadcast it directly into the communication queue.
      </p>

      {/* Compact System Metadata Row */}
      <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] font-mono">
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/10">
          <span className="text-zinc-500">STATUS:</span>
          <span className="text-[#00FF66] font-semibold">NETWORK READY</span>
        </div>
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/10">
          <span className="text-zinc-500">ENDPOINT:</span>
          <span className="text-zinc-200">BHARATH / CONTACT</span>
        </div>
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/10">
          <span className="text-zinc-500">PROTOCOL:</span>
          <span className="text-[#00F0FF]">DIRECT COMMUNICATION</span>
        </div>
      </div>
    </div>
  );
};
