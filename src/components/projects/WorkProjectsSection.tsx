"use client";

import React, { useState } from "react";
import { WorkMerkleDiscoveryCanvas } from "@/components/canvas/WorkMerkleDiscoveryCanvas";
import {
  workCategoriesData,
  WorkCategoryItem,
  WorkProjectItem,
} from "@/data/work-categories";
import { Github, ExternalLink, ArrowLeft, Terminal, Cpu, Layers, Sparkles } from "lucide-react";

export function WorkProjectsSection() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [hoveredCategoryId, setHoveredCategoryId] = useState<string | null>(null);
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
  const [showArchitectureModal, setShowArchitectureModal] = useState(false);

  const activeCategory: WorkCategoryItem | undefined = workCategoriesData.find(
    (c) => c.id === (selectedCategoryId || hoveredCategoryId)
  );

  const activeProject: WorkProjectItem | undefined = activeCategory?.projects.find(
    (p) => p.id === (selectedProjectId || hoveredProjectId)
  ) || workCategoriesData.flatMap((c) => c.projects).find((p) => p.id === (selectedProjectId || hoveredProjectId));

  const handleSelectCategory = (catId: string) => {
    if (selectedCategoryId === catId && !selectedProjectId) {
      // Revert back to Root Overview
      setSelectedCategoryId(null);
      setSelectedProjectId(null);
      setShowArchitectureModal(false);
    } else {
      setSelectedCategoryId(catId);
      setSelectedProjectId(null);
      setShowArchitectureModal(false);
    }
  };

  const handleSelectProject = (projId: string) => {
    if (selectedProjectId === projId) {
      // Revert back to Category view
      setSelectedProjectId(null);
      setShowArchitectureModal(false);
    } else {
      setSelectedProjectId(projId);
      setShowArchitectureModal(true);
    }
  };

  const handleResetToRoot = () => {
    setSelectedCategoryId(null);
    setSelectedProjectId(null);
    setShowArchitectureModal(false);
  };

  return (
    <section
      id="work"
      className="relative w-full min-h-screen bg-[#04070e] text-[#F8FAFC] border-t border-[#1e293b]/60 flex flex-col justify-between overflow-hidden select-none"
      style={{ height: "100vh" }}
    >
      {/* 1. TOP HEADER & HIERARCHICAL BREADCRUMBS */}
      <header className="relative z-40 w-full bg-[#070b14]/90 backdrop-blur-xl border-b border-[#1e293b]/80">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 h-16 sm:h-20 flex items-center justify-between">
          {/* Left: Section Tag & Breadcrumbs */}
          <div className="flex items-center gap-2 sm:gap-3 text-xs font-mono">
            <button
              onClick={handleResetToRoot}
              className="text-[#00F0FF] hover:underline font-bold uppercase tracking-wider cursor-pointer"
            >
              WORK ROOT
            </button>
            {selectedCategoryId && (
              <>
                <span className="text-[#64748B]">/</span>
                <span className="text-[#38BDF8] font-semibold">{selectedCategoryId}</span>
              </>
            )}
            {selectedProjectId && (
              <>
                <span className="text-[#64748B]">/</span>
                <span className="text-[#F8FAFC] font-semibold hidden md:inline truncate max-w-[200px]">
                  {activeProject?.name}
                </span>
              </>
            )}
          </div>

          {/* Center: Category Selector HUD */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={handleResetToRoot}
              className={`px-3 py-1 border text-[11px] font-mono transition-all cursor-pointer rounded-sm ${
                !selectedCategoryId
                  ? "border-[#00F0FF] bg-[#00F0FF]/15 text-[#00F0FF] font-bold shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                  : "border-[#1e293b] text-[#94A3B8] hover:border-[#38BDF8]/60 hover:text-white bg-[#0b0f19]/60"
              }`}
            >
              ROOT
            </button>

            {workCategoriesData.map((cat) => {
              const isCatSelected = selectedCategoryId === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleSelectCategory(cat.id)}
                  className={`px-3 py-1 border text-[11px] font-mono transition-all cursor-pointer rounded-sm ${
                    isCatSelected
                      ? "border-[#00F0FF] bg-[#00F0FF]/20 text-[#00F0FF] font-bold shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                      : "border-[#1e293b] text-[#94A3B8] hover:border-[#38BDF8]/60 hover:text-white bg-[#0b0f19]/60"
                  }`}
                >
                  {cat.title}
                </button>
              );
            })}
          </div>

          {/* Right: State / Navigation hint */}
          <div className="hidden lg:flex items-center gap-3 text-xs font-mono">
            {selectedCategoryId ? (
              <button
                onClick={handleResetToRoot}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0f172a] border border-[#1e293b] text-[#94A3B8] hover:text-[#00F0FF] transition-all cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>ROOT OVERVIEW</span>
              </button>
            ) : (
              <span className="text-[#64748B]">
                // SELECT CATEGORY BRANCH
              </span>
            )}
          </div>
        </div>
      </header>

      {/* 2. MAIN 3D DISCOVERY VIEWPORT */}
      <div className="relative z-30 flex-1 w-full h-full overflow-hidden">
        {/* Floating Context HUD (Left Corner) */}
        <div className="absolute top-4 sm:top-6 left-4 sm:left-8 z-30 pointer-events-none max-w-xs sm:max-w-sm hidden sm:block">
          {activeProject ? (
            /* Active Project Focus Card */
            <div className="p-4 rounded-xl bg-[#080d1a]/95 border border-[#1e293b] backdrop-blur-2xl shadow-[0_20px_45px_rgba(0,0,0,0.8)]">
              <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-[#1e293b]">
                <span className="text-[10px] font-mono text-[#00F0FF] font-bold tracking-wider">
                  {activeProject.category} // {activeProject.year}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0f172a] text-[#34D399] border border-[#1e293b]">
                  {activeProject.status}
                </span>
              </div>
              <h3 className="text-sm font-bold text-white mb-0.5">{activeProject.name}</h3>
              <p className="text-xs font-mono text-[#38BDF8] mb-2">{activeProject.subtitle}</p>
              <p className="text-[11px] text-[#cbd5e1] leading-relaxed mb-3 line-clamp-3">
                {activeProject.description}
              </p>
              <div className="flex flex-wrap gap-1 mb-3">
                {activeProject.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded bg-[#0f172a] border border-[#1e293b] text-[9px] font-mono text-[#38BDF8]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="pt-2 border-t border-[#1e293b] flex items-center justify-between text-[10px] font-mono text-[#64748B]">
                <span>CLICK NODE TO ENTER ARCHITECTURE</span>
                <Sparkles className="w-3.5 h-3.5 text-[#00F0FF]" />
              </div>
            </div>
          ) : activeCategory ? (
            /* Active Category Focus Card */
            <div className="p-4 rounded-xl bg-[#080d1a]/95 border border-[#1e293b] backdrop-blur-2xl shadow-[0_20px_45px_rgba(0,0,0,0.8)]">
              <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-[#1e293b]">
                <span className="text-[10px] font-mono text-[#00F0FF] font-bold tracking-wider">
                  CATEGORY BRANCH
                </span>
                <span className="text-[10px] font-mono text-[#64748B]">
                  {activeCategory.projects.length} SYSTEMS
                </span>
              </div>
              <h3 className="text-sm font-bold text-white mb-1">{activeCategory.title}</h3>
              <p className="text-xs font-mono text-[#38BDF8] mb-2">{activeCategory.tagline}</p>
              <p className="text-[11px] text-[#cbd5e1] leading-relaxed">
                {activeCategory.description}
              </p>
            </div>
          ) : (
            /* Root State Card */
            <div className="p-4 rounded-xl bg-[#080d1a]/95 border border-[#1e293b] backdrop-blur-2xl shadow-[0_20px_45px_rgba(0,0,0,0.8)]">
              <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-[#1e293b]">
                <span className="text-[10px] font-mono text-[#00F0FF] font-bold tracking-wider">
                  PROJECT HIERARCHY
                </span>
                <span className="text-[10px] font-mono text-[#64748B]">4 DOMAINS</span>
              </div>
              <h3 className="text-sm font-bold text-white mb-1">Computational Work Root</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed mb-3">
                Select a domain branch or click on any 3D node to explore core engineering projects.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {workCategoriesData.map((c) => (
                  <span
                    key={c.id}
                    className="px-2 py-0.5 rounded bg-[#0f172a] border border-[#1e293b] text-[9px] font-mono text-[#cbd5e1]"
                  >
                    ● {c.title}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 3D WebGL Canvas */}
        <WorkMerkleDiscoveryCanvas
          selectedCategoryId={selectedCategoryId}
          selectedProjectId={selectedProjectId}
          hoveredCategoryId={hoveredCategoryId}
          hoveredProjectId={hoveredProjectId}
          onHoverCategory={setHoveredCategoryId}
          onSelectCategory={handleSelectCategory}
          onHoverProject={setHoveredProjectId}
          onSelectProject={handleSelectProject}
          onResetToRoot={handleResetToRoot}
        />
      </div>

      {/* 3. PROJECT ARCHITECTURE DEEP DIVE MODAL / DRAWER */}
      {showArchitectureModal && activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-[#080e1b] border border-[#1e293b] rounded-2xl shadow-[0_25px_60px_rgba(0,240,255,0.2)] p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setShowArchitectureModal(false)}
              className="absolute top-5 right-5 text-[#94A3B8] hover:text-white font-mono text-xs px-2.5 py-1 rounded bg-[#0f172a] border border-[#1e293b] cursor-pointer"
            >
              ✕ ESC
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-2 mb-2 text-xs font-mono text-[#00F0FF]">
              <span>{activeProject.category}</span>
              <span>//</span>
              <span>{activeProject.year}</span>
              <span>//</span>
              <span className="text-[#34D399]">{activeProject.status}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">{activeProject.name}</h2>
            <p className="text-sm font-mono text-[#38BDF8] mb-4">{activeProject.subtitle}</p>

            <p className="text-sm text-[#cbd5e1] leading-relaxed mb-6">
              {activeProject.description}
            </p>

            {/* Metrics Grid */}
            {activeProject.metrics && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                {activeProject.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="p-3 rounded-lg bg-[#0c1424] border border-[#1e293b]"
                  >
                    <span className="text-[10px] font-mono text-[#94A3B8] block mb-0.5">
                      {m.label}
                    </span>
                    <span className="text-base sm:text-lg font-bold text-[#00F0FF] font-mono">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Technical Architecture Strata Layers */}
            <div className="mb-6">
              <h4 className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#00F0FF]" />
                <span>Technical Architecture Stack</span>
              </h4>
              <div className="space-y-2">
                {activeProject.architectureLayers.map((layer, idx) => (
                  <div
                    key={layer.layerName}
                    className="p-3 rounded-lg bg-[#0b1220] border border-[#1e293b] flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-[#00F0FF] font-bold">0{idx + 1}</span>
                      <span className="font-semibold text-white">{layer.layerName}</span>
                      <span className="text-[#94A3B8] hidden sm:inline">— {layer.description}</span>
                    </div>
                    <span className="font-mono px-2 py-0.5 rounded bg-[#0f172a] text-[#38BDF8] border border-[#1e293b] shrink-0">
                      {layer.tech}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Links */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#1e293b]">
              <div className="flex items-center gap-2">
                {activeProject.githubUrl && (
                  <a
                    href={activeProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#0f172a] border border-[#1e293b] text-xs font-mono text-white hover:border-[#00F0FF] hover:text-[#00F0FF] transition-all"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>View Repository</span>
                  </a>
                )}
                {activeProject.demoUrl && (
                  <a
                    href={activeProject.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#00F0FF]/15 border border-[#00F0FF]/50 text-xs font-mono text-[#00F0FF] hover:bg-[#00F0FF]/25 transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live Simulator</span>
                  </a>
                )}
              </div>

              <button
                onClick={() => setShowArchitectureModal(false)}
                className="px-4 py-1.5 rounded-lg bg-[#1e293b] text-xs font-mono text-white hover:bg-[#334155] transition-all cursor-pointer"
              >
                Return to Tree
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. BOTTOM STATUS BAR */}
      <footer className="relative z-40 w-full bg-[#070b14]/90 backdrop-blur-xl border-t border-[#1e293b]/80 py-3 px-6 sm:px-10">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-[#94A3B8]">
          <div className="flex items-center gap-3">
            <span className="text-[#00F0FF] font-bold">● DISCOVERY ENGINE:</span>
            <span>
              {selectedCategoryId
                ? `INSPECTING ${selectedCategoryId} BRANCH`
                : "COMPUTATIONAL WORK ROOT ACTIVE"}
            </span>
          </div>
          <div className="text-[11px] text-[#64748B]">
            HOVER TO EXPLORE · CLICK NODE TO EXPAND HIERARCHY
          </div>
        </div>
      </footer>
    </section>
  );
}
