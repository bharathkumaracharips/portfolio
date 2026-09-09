"use client";

import React, { useState } from "react";
import { TeachingKnowledgeStackCanvas } from "@/components/canvas/TeachingKnowledgeStackCanvas";
import { knowledgeStackLayers } from "@/data/teaching";
import { Terminal, Layers, BookOpen, Sparkles } from "lucide-react";

export function TeachingHero() {
  const [activeLayerIndex, setActiveLayerIndex] = useState<number | null>(null);

  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center py-20 px-6 sm:px-10 overflow-hidden border-b border-[#1e293b]/70">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00F0FF]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Editorial Identity */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-2.5 py-0.5 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[10px] font-mono text-[#00F0FF] uppercase tracking-widest font-bold">
              KNOWLEDGE / 03
            </span>
            <span className="text-xs font-mono text-[#64748B]">
              // TECHNICAL KNOWLEDGE ARCHIVE
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
            I build systems. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-[#38BDF8] to-[#93C5FD]">
              I teach how they work.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-[#cbd5e1] leading-relaxed mb-8 max-w-xl">
            As a blockchain engineer and former instructor for ONE DEV&apos;s Blockchain Engineering Diploma program, I deconstruct complex cryptographic protocols, EVM runtime execution, and Substrate state machines into intuitive, first-principles mental models.
          </p>

          {/* Interactive Knowledge Decomposition Stack Chips */}
          <div className="p-4 rounded-xl bg-[#080d1a]/85 border border-[#1e293b] backdrop-blur-xl max-w-xl">
            <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-[#1e293b] text-xs font-mono text-[#94A3B8]">
              <div className="flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-[#00F0FF]" />
                <span className="text-[#F8FAFC] font-semibold">BLOCKCHAIN KNOWLEDGE STACK</span>
              </div>
              <span className="text-[10px] text-[#64748B]">HOVER LAYER TO DECOMPOSE</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {knowledgeStackLayers.map((layer, idx) => {
                const isActive = activeLayerIndex === idx;
                return (
                  <button
                    key={layer.id}
                    onMouseEnter={() => setActiveLayerIndex(idx)}
                    onMouseLeave={() => setActiveLayerIndex(null)}
                    className={`px-2.5 py-1.5 rounded-md text-left transition-all border font-mono text-[10px] cursor-pointer ${
                      isActive
                        ? "border-[#00F0FF] bg-[#00F0FF]/15 text-white shadow-[0_0_12px_rgba(0,240,255,0.3)]"
                        : "border-[#1e293b] text-[#94A3B8] hover:border-[#38BDF8]/60 hover:text-white bg-[#0f172a]/60"
                    }`}
                  >
                    <span className="block font-bold truncate" style={{ color: isActive ? "#00F0FF" : layer.color }}>
                      {layer.label.split("/")[0]}
                    </span>
                    <span className="text-[9px] text-[#64748B] block truncate">{layer.tech}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: 3D Knowledge Stack Canvas */}
        <div className="lg:col-span-6 flex items-center justify-center relative">
          <div className="w-full max-w-[520px] aspect-square relative flex items-center justify-center">
            <TeachingKnowledgeStackCanvas
              activeLayerIndex={activeLayerIndex}
              onHoverLayer={setActiveLayerIndex}
            />

            {/* Subtle Floating Label Indicator */}
            <div className="absolute -bottom-4 right-4 pointer-events-none text-right">
              <span className="text-[10px] font-mono text-[#64748B] tracking-wider block">
                3D DECOMPOSED PROTOCOL STRATA
              </span>
              <span className="text-[10px] font-mono text-[#00F0FF] font-semibold">
                6 INTERACTIVE PHYSICAL LAYERS
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
