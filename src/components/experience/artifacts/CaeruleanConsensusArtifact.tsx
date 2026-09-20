"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const CaeruleanConsensusArtifact: React.FC = () => {
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setPulse((p) => p + 1), 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full rounded-xl bg-black/40 border border-white/[0.08] p-5 flex flex-col justify-between select-none">
      <div className="flex items-center justify-between text-[11px] font-mono border-b border-white/[0.06] pb-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-zinc-300 font-medium">TRI-CONSENSUS FRAMEWORK</span>
        </div>
        <span className="text-zinc-500">PoS &bull; PoI &bull; DCF</span>
      </div>

      <div className="w-full flex items-center justify-center py-2">
        <svg
          viewBox="0 0 340 200"
          className="w-full max-w-[320px] h-auto select-none overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* CONNECTIONS: Ingestion -> 3 Mechanisms -> Finality */}
          <path d="M 170 35 L 170 50 L 60 50 L 60 75" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
          <path d="M 170 35 L 170 75" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
          <path d="M 170 35 L 170 50 L 280 50 L 280 75" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />

          <path d="M 60 115 L 60 135 L 170 135 L 170 150" stroke="rgba(0,255,102,0.3)" strokeWidth="1.5" />
          <path d="M 170 115 L 170 150" stroke="rgba(0,255,102,0.3)" strokeWidth="1.5" />
          <path d="M 280 115 L 280 135 L 170 135 L 170 150" stroke="rgba(0,255,102,0.3)" strokeWidth="1.5" />

          {/* PULSE SIGNAL */}
          <motion.circle
            key={`cons-sig-${pulse}`}
            cx="170"
            cy="20"
            r="2.5"
            fill="#00FF66"
            animate={{
              cy: [20, 75, 160],
              opacity: [0, 1, 0],
            }}
            transition={{ duration: 2.0, ease: "easeInOut" }}
          />

          {/* TOP NODE: PROPOSAL INGESTION */}
          <g transform="translate(90, 10)">
            <rect width="160" height="26" rx="5" fill="#121218" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            <text x="80" y="17" textAnchor="middle" fill="#FFFFFF" fontSize="8.5" fontFamily="monospace" fontWeight="500">
              BLOCK PROPOSAL ENGINE
            </text>
          </g>

          {/* TRI-CONSENSUS NODES */}
          {/* PoS Node */}
          <g transform="translate(15, 75)">
            <rect width="90" height="38" rx="5" fill="#111c16" stroke="rgba(0,255,102,0.35)" strokeWidth="1" />
            <text x="45" y="16" textAnchor="middle" fill="#00FF66" fontSize="9" fontFamily="monospace" fontWeight="600">
              PoS
            </text>
            <text x="45" y="27" textAnchor="middle" fill="#71717A" fontSize="7" fontFamily="sans-serif">
              Stake Weight
            </text>
          </g>

          {/* PoI Node */}
          <g transform="translate(125, 75)">
            <rect width="90" height="38" rx="5" fill="#111c16" stroke="rgba(0,255,102,0.35)" strokeWidth="1" />
            <text x="45" y="16" textAnchor="middle" fill="#00FF66" fontSize="9" fontFamily="monospace" fontWeight="600">
              PoI
            </text>
            <text x="45" y="27" textAnchor="middle" fill="#71717A" fontSize="7" fontFamily="sans-serif">
              Integrity Score
            </text>
          </g>

          {/* DCF Node */}
          <g transform="translate(235, 75)">
            <rect width="90" height="38" rx="5" fill="#111c16" stroke="rgba(0,255,102,0.35)" strokeWidth="1" />
            <text x="45" y="16" textAnchor="middle" fill="#00FF66" fontSize="9" fontFamily="monospace" fontWeight="600">
              DCF
            </text>
            <text x="45" y="27" textAnchor="middle" fill="#71717A" fontSize="7" fontFamily="sans-serif">
              Adaptive Quorum
            </text>
          </g>

          {/* BOTTOM NODE: BFT FINALITY */}
          <g transform="translate(85, 150)">
            <rect width="170" height="32" rx="6" fill="#0d1b14" stroke="rgba(0,255,102,0.4)" strokeWidth="1" />
            <circle cx="16" cy="16" r="2.5" fill="#00FF66" />
            <text x="90" y="17" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontFamily="monospace" fontWeight="600">
              CANONICAL BFT FINALITY
            </text>
            <text x="90" y="26" textAnchor="middle" fill="#00FF66" fontSize="7" fontFamily="sans-serif">
              Sub-second Confirmation
            </text>
          </g>
        </svg>
      </div>

      <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 pt-2 border-t border-white/[0.04]">
        <span>PROPOSAL &rarr; TRI-CONSENSUS &rarr; FINALITY GADGET</span>
        <span className="text-zinc-600">BENCHMARKED TESTNETS</span>
      </div>
    </div>
  );
};
