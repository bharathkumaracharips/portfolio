"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Play, Pause, RotateCcw } from "lucide-react";

// Dynamically import 3D Smartwatch experience with ssr: false
const Scene01SmartwatchExperience = dynamic(
  () =>
    import("@/components/canvas/Scene01SmartwatchExperience").then(
      (mod) => mod.Scene01SmartwatchExperience
    ),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[360px] flex items-center justify-center bg-black/40 text-zinc-500 font-mono text-xs">
        INITIALIZING WEARABLE ARCHITECTURE...
      </div>
    ),
  }
);

export const HealthcareWatchArtifact: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Self-playing 12-second cinematic loop that never hijacks page scrolling
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 1) return 0;
        return prev + 0.015;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="w-full rounded-xl bg-black/40 border border-white/[0.08] p-5 flex flex-col justify-between select-none overflow-hidden">
      {/* Header Info */}
      <div className="flex items-center justify-between text-[11px] font-mono border-b border-white/[0.06] pb-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
          <span className="text-zinc-300 font-medium">FEDERATED HEALTHCARE IoT</span>
        </div>
        <div className="flex items-center gap-2 text-zinc-400">
          <span className="text-[10px]">
            {progress >= 0.8
              ? "DEPLOYED ON-CHAIN"
              : progress >= 0.6
              ? "SMART CONTRACT VERIFICATION"
              : progress >= 0.4
              ? "ZK-SNARK AGGREGATION"
              : progress >= 0.2
              ? "LOCAL MODEL UPDATE"
              : "PATIENT BIOMETRICS"}
          </span>
          <span className="tabular-nums font-mono text-[#f472b6]">
            {Math.round(progress * 100)}%
          </span>
        </div>
      </div>

      {/* 3D Canvas Container */}
      <div className="relative w-full h-[320px] sm:h-[360px] flex items-center justify-center">
        <Scene01SmartwatchExperience scrollProgress={progress} />
      </div>

      {/* Timeline Controls */}
      <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 pt-2 border-t border-white/[0.04]">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1 rounded bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-zinc-300 hover:text-white transition-colors cursor-pointer"
            title={isPlaying ? "Pause cinematic preview" : "Play cinematic preview"}
          >
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 text-pink-400" />}
          </button>
          <button
            onClick={() => setProgress(0)}
            className="p-1 rounded bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-zinc-300 hover:text-white transition-colors cursor-pointer"
            title="Restart sequence"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
          <span className="hidden sm:inline text-zinc-500">
            WATCH &rarr; LOCAL MODEL &rarr; ZK &rarr; ON-CHAIN VERIFICATION
          </span>
        </div>
        <span className="text-zinc-600">CINEMATIC PREVIEW</span>
      </div>
    </div>
  );
};
