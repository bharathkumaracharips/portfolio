"use client";

import React, { useState } from "react";
import {
  CourseArchitectureDiagramData,
  ArchitectureNode,
} from "@/data/curriculum";
import { ArrowDown, Cpu, Sparkles, CheckCircle2 } from "lucide-react";

interface CourseArchitectureDiagramProps {
  diagram: CourseArchitectureDiagramData;
  accentColor?: string;
}

export const CourseArchitectureDiagram: React.FC<CourseArchitectureDiagramProps> = ({
  diagram,
  accentColor = "#00F0FF",
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>(
    diagram.nodes[2]?.id || diagram.nodes[0]?.id
  );

  const selectedNode: ArchitectureNode =
    diagram.nodes.find((n) => n.id === selectedNodeId) || diagram.nodes[0];

  return (
    <div className="w-full flex flex-col rounded-2xl bg-[#09090f]/90 border border-white/10 p-5 sm:p-6 backdrop-blur-xl shadow-2xl relative overflow-hidden">
      {/* Top Header with Live Architecture Status */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: accentColor }}
          />
          <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-300 font-semibold">
            {diagram.title}
          </span>
        </div>
        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider hidden sm:inline">
          INTERACTIVE INSPECTOR // {diagram.nodes.length} NODES
        </span>
      </div>

      {/* Main Flow: Responsive Grid / Flow of Pipeline Nodes */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 relative">
        {diagram.nodes.map((node, index) => {
          const isSelected = node.id === selectedNodeId;
          const isLast = index === diagram.nodes.length - 1;

          return (
            <button
              key={node.id}
              onClick={() => setSelectedNodeId(node.id)}
              onMouseEnter={() => setSelectedNodeId(node.id)}
              className={`group relative flex flex-col p-3 rounded-xl text-left transition-all duration-200 border ${
                isSelected
                  ? "bg-white/[0.06] border-white/40 shadow-lg"
                  : "bg-white/[0.02] border-white/5 hover:border-white/20 hover:bg-white/[0.03]"
              }`}
              style={{
                borderColor: isSelected ? accentColor : undefined,
              }}
            >
              {/* Step counter & pulse indicator */}
              <div className="flex items-center justify-between w-full mb-1.5">
                <span
                  className="text-[10px] font-mono font-bold"
                  style={{ color: isSelected ? accentColor : "#71717A" }}
                >
                  0{index + 1}
                </span>
                <span
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    isSelected ? "scale-125" : "opacity-40"
                  }`}
                  style={{ backgroundColor: isSelected ? accentColor : "#52525B" }}
                />
              </div>

              {/* Node Title & Subtitle */}
              <span className="text-xs font-semibold text-zinc-100 leading-snug line-clamp-2 mb-1">
                {node.label}
              </span>
              <span className="text-[10px] font-mono text-zinc-400 line-clamp-1">
                {node.sublabel}
              </span>

              {/* Right/Bottom Connector Indicator */}
              {!isLast && (
                <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 pointer-events-none text-zinc-600 text-xs font-mono">
                  →
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Node Inspector Drawer (Linear style detail panel) */}
      <div className="mt-4 p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col gap-2.5 transition-all">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-2">
          <div className="flex items-center gap-2">
            <span
              className="text-[11px] font-mono font-bold uppercase tracking-wider"
              style={{ color: accentColor }}
            >
              {selectedNode.detail.title}
            </span>
            <span className="text-zinc-600 text-xs font-mono">//</span>
            <span className="text-[11px] font-mono text-zinc-400">
              {selectedNode.label}
            </span>
          </div>
          <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-zinc-400 border border-white/10 uppercase">
            {selectedNode.category}
          </span>
        </div>

        <p className="text-xs text-zinc-300 font-light leading-relaxed">
          {selectedNode.detail.role}
        </p>

        {/* Concept Bullets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
          {selectedNode.detail.concepts.map((concept, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2 text-[11px] text-zinc-400"
            >
              <CheckCircle2
                className="w-3.5 h-3.5 shrink-0 mt-0.5"
                style={{ color: accentColor }}
              />
              <span className="text-zinc-300">{concept}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
