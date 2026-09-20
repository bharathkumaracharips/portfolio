"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectSequenceDiagramData, SequenceStep } from "@/data/projectDocs";
import { Play, Pause, SkipForward, RotateCcw, Info } from "lucide-react";

interface ProjectSequenceDiagramProps {
  data: ProjectSequenceDiagramData;
  accentColor?: string;
}

export const ProjectSequenceDiagram: React.FC<ProjectSequenceDiagramProps> = ({
  data,
  accentColor = "#00F0FF",
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedStep, setSelectedStep] = useState<SequenceStep | null>(
    data.steps[0] || null
  );

  const totalSteps = data.steps.length;

  // Auto-play interval
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStepIndex((prev) => {
        const next = (prev + 1) % totalSteps;
        setSelectedStep(data.steps[next]);
        return next;
      });
    }, 2800);
    return () => clearInterval(interval);
  }, [isPlaying, totalSteps, data.steps]);

  const handleStepClick = (index: number) => {
    setIsPlaying(false);
    setActiveStepIndex(index);
    setSelectedStep(data.steps[index]);
  };

  const handleNext = () => {
    setIsPlaying(false);
    const next = (activeStepIndex + 1) % totalSteps;
    setActiveStepIndex(next);
    setSelectedStep(data.steps[next]);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setActiveStepIndex(0);
    setSelectedStep(data.steps[0]);
  };

  // Compute actor column positions
  const numActors = data.actors.length;
  const actorPositions: Record<string, number> = {};
  data.actors.forEach((actor, index) => {
    actorPositions[actor.id] = (index + 0.5) * (100 / numActors);
  });

  return (
    <div className="w-full flex flex-col gap-5 rounded-2xl border border-white/[0.08] bg-[#07070c]/90 p-5 sm:p-7 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
      {/* Header bar: Title & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: accentColor }}
            />
            <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
              INTERACTIVE PROTOCOL SEQUENCE
            </span>
          </div>
          <h4 className="text-base sm:text-lg font-medium text-white font-sans">
            {data.title}
          </h4>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] text-xs font-mono text-zinc-300 transition-colors cursor-pointer"
            aria-label={isPlaying ? "Pause Sequence" : "Play Sequence"}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3 h-3 text-cyan-400" />
                <span>PAUSE</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-cyan-400" />
                <span>AUTO-PLAY</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="p-1.5 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] text-zinc-300 transition-colors cursor-pointer"
            title="Next Step"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="p-1.5 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] text-zinc-300 transition-colors cursor-pointer"
            title="Reset"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Diagram Area */}
      <div className="relative w-full overflow-x-auto select-none pt-2 pb-6">
        <div className="min-w-[640px] flex flex-col relative">
          {/* Actors Row (Headers) */}
          <div className="grid w-full mb-6" style={{ gridTemplateColumns: `repeat(${numActors}, minmax(0, 1fr))` }}>
            {data.actors.map((actor) => (
              <div key={actor.id} className="flex flex-col items-center text-center px-2">
                <div className="w-full max-w-[130px] px-2.5 py-2 rounded-xl bg-[#0d0e15] border border-white/10 shadow-sm flex flex-col items-center">
                  <span className="text-xs font-medium text-white font-sans truncate w-full text-center">
                    {actor.name}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider truncate w-full text-center">
                    {actor.role}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Lifelines Area */}
          <div className="relative flex flex-col gap-6 py-2">
            {/* Vertical Lifelines */}
            <div className="absolute inset-0 pointer-events-none grid" style={{ gridTemplateColumns: `repeat(${numActors}, minmax(0, 1fr))` }}>
              {data.actors.map((actor) => (
                <div key={`line-${actor.id}`} className="flex justify-center h-full">
                  <div className="w-px h-full border-l border-dashed border-white/[0.12]" />
                </div>
              ))}
            </div>

            {/* Sequence Steps (Horizontal Vectors) */}
            {data.steps.map((step, idx) => {
              const isActive = activeStepIndex === idx;
              const isPast = activeStepIndex > idx;
              const fromPercent = actorPositions[step.from] ?? 10;
              const toPercent = actorPositions[step.to] ?? 90;
              const isLeftToRight = toPercent > fromPercent;
              const isSelf = step.from === step.to;

              const leftPos = isSelf
                ? `${fromPercent}%`
                : `${Math.min(fromPercent, toPercent)}%`;
              const widthPos = isSelf
                ? "60px"
                : `${Math.abs(toPercent - fromPercent)}%`;

              return (
                <div
                  key={step.id}
                  onClick={() => handleStepClick(idx)}
                  className={`relative z-10 flex items-center h-14 cursor-pointer transition-all duration-300 rounded-lg px-2 group ${
                    isActive
                      ? "bg-white/[0.04]"
                      : isPast
                      ? "opacity-60 hover:opacity-100"
                      : "opacity-40 hover:opacity-80"
                  }`}
                >
                  {/* Step message container */}
                  <div
                    className="absolute flex flex-col"
                    style={{
                      left: leftPos,
                      width: widthPos,
                      transform: isSelf ? "translateX(-50%)" : "none",
                    }}
                  >
                    {/* Step label above vector */}
                    <div className="flex items-center gap-2 mb-1 px-1">
                      <span
                        className={`px-1.5 py-0.2 rounded text-[9px] font-mono font-bold transition-colors ${
                          isActive
                            ? "bg-cyan-400 text-black shadow-[0_0_8px_rgba(0,240,255,0.6)]"
                            : "bg-white/10 text-zinc-400"
                        }`}
                      >
                        0{step.id}
                      </span>
                      <span
                        className={`text-xs font-mono truncate transition-colors ${
                          isActive
                            ? "text-white font-semibold"
                            : "text-zinc-400 group-hover:text-zinc-200"
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>

                    {/* Vector Arrow Line */}
                    <div className="relative w-full flex items-center">
                      {isSelf ? (
                        /* Self Loop */
                        <div className="w-8 h-5 border-t-2 border-r-2 border-b-2 rounded-r-lg border-cyan-400/80 -mt-1 ml-4" />
                      ) : (
                        /* Standard Horizontal Vector */
                        <div
                          className={`w-full h-0.5 relative transition-colors duration-200 ${
                            isActive
                              ? "bg-cyan-400 shadow-[0_0_8px_rgba(0,240,255,0.7)]"
                              : "bg-white/20 group-hover:bg-white/40"
                          }`}
                        >
                          {/* Animated traveling photon on active vector */}
                          {isActive && (
                            <motion.div
                              className="absolute -top-1 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_#00F0FF]"
                              initial={{ left: isLeftToRight ? "0%" : "100%" }}
                              animate={{ left: isLeftToRight ? "100%" : "0%" }}
                              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                            />
                          )}

                          {/* Arrow Head */}
                          <div
                            className={`absolute -top-[5px] w-0 h-0 border-solid ${
                              isLeftToRight
                                ? "right-0 border-y-[6px] border-y-transparent border-l-[8px]"
                                : "left-0 border-y-[6px] border-y-transparent border-r-[8px]"
                            } ${
                              isActive
                                ? isLeftToRight
                                  ? "border-l-cyan-400"
                                  : "border-r-cyan-400"
                                : isLeftToRight
                                ? "border-l-zinc-500"
                                : "border-r-zinc-500"
                            }`}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Step Inspector Card */}
      <AnimatePresence mode="wait">
        {selectedStep && (
          <motion.div
            key={selectedStep.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="rounded-xl border border-white/[0.08] bg-[#0a0b12] p-4 flex flex-col gap-2.5 text-xs font-mono"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] pb-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 text-[10px] font-bold">
                  STEP 0{selectedStep.id}
                </span>
                <span className="text-white font-medium">
                  {selectedStep.from} &rarr; {selectedStep.to}
                </span>
              </div>
              <span className="text-[10px] uppercase text-zinc-500">
                TRANSIT MODE: {selectedStep.type}
              </span>
            </div>

            <p className="text-zinc-300 font-sans text-xs sm:text-sm font-light">
              {selectedStep.label}
            </p>

            {selectedStep.payload && (
              <div className="p-2.5 rounded-lg bg-black/60 border border-white/[0.06] flex items-center gap-2 text-[11px] text-cyan-300">
                <span className="text-zinc-600 select-none">PAYLOAD:</span>
                <code className="text-zinc-300 font-mono overflow-x-auto">
                  {selectedStep.payload}
                </code>
              </div>
            )}

            {selectedStep.note && (
              <div className="flex items-start gap-2 text-[11px] text-zinc-400 italic">
                <Info className="w-3.5 h-3.5 text-zinc-500 shrink-0 mt-0.5" />
                <span>{selectedStep.note}</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
