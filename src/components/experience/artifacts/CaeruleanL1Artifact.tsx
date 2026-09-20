"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const CaeruleanL1Artifact: React.FC = () => {
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setPulse((p) => p + 1), 5500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full rounded-xl bg-black/40 border border-white/[0.08] p-5 flex flex-col justify-between select-none">
      <div className="flex items-center justify-between text-[11px] font-mono border-b border-white/[0.06] pb-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span className="text-zinc-300 font-medium">SOVEREIGN L1 ARCHITECTURE</span>
        </div>
        <span className="text-zinc-500">WASM RUNTIME // HOT-UPGRADE</span>
      </div>

      <div className="w-full flex items-center justify-center py-2">
        <svg
          viewBox="0 0 340 200"
          className="w-full max-w-[320px] h-auto select-none overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* CONNECTIONS */}
          {/* Node to Runtime */}
          <line x1="170" y1="35" x2="170" y2="75" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
          {/* Runtime Branching */}
          <path d="M 170 105 L 170 120 L 75 120 L 75 140" stroke="rgba(0,240,255,0.3)" strokeWidth="1.5" />
          <path d="M 170 105 L 170 140" stroke="rgba(0,240,255,0.3)" strokeWidth="1.5" />
          <path d="M 170 105 L 170 120 L 265 120 L 265 140" stroke="rgba(0,240,255,0.3)" strokeWidth="1.5" />

          {/* PULSE SIGNAL */}
          <motion.circle
            key={`l1-sig-${pulse}`}
            cx="170"
            cy="20"
            r="2.5"
            fill="#00F0FF"
            animate={{
              cy: [20, 85, 155],
              opacity: [0, 1, 0],
            }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
          />

          {/* NODE 1: SUBSTRATE HOST NODE */}
          <g transform="translate(90, 10)">
            <rect width="160" height="28" rx="6" fill="#121218" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
            <circle cx="16" cy="14" r="2.5" fill="#00F0FF" />
            <text x="30" y="18" fill="#FFFFFF" fontSize="9" fontFamily="monospace" fontWeight="600">
              SUBSTRATE HOST NODE
            </text>
          </g>

          {/* NODE 2: DETERMINISTIC RUNTIME */}
          <g transform="translate(80, 75)">
            <rect width="180" height="32" rx="6" fill="#14141c" stroke="rgba(0,240,255,0.4)" strokeWidth="1" />
            <text x="90" y="17" textAnchor="middle" fill="#00F0FF" fontSize="9.5" fontFamily="monospace" fontWeight="600">
              WASM EXECUTION SANDBOX
            </text>
            <text x="90" y="27" textAnchor="middle" fill="#71717A" fontSize="7.5" fontFamily="sans-serif">
              Zero-Downtime Hot Upgrades
            </text>
          </g>

          {/* SUB-NODE A: FRAME PALLETS */}
          <g transform="translate(20, 140)">
            <rect width="110" height="32" rx="6" fill="#111822" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            <text x="55" y="16" textAnchor="middle" fill="#FFFFFF" fontSize="8.5" fontFamily="monospace" fontWeight="500">
              FRAME PALLETS
            </text>
            <text x="55" y="26" textAnchor="middle" fill="#71717A" fontSize="7" fontFamily="sans-serif">
              Modular Logic
            </text>
          </g>

          {/* SUB-NODE B: PLUGGABLE CONSENSUS */}
          <g transform="translate(140, 140)">
            <rect width="90" height="32" rx="6" fill="#111822" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            <text x="45" y="16" textAnchor="middle" fill="#FFFFFF" fontSize="8.5" fontFamily="monospace" fontWeight="500">
              CONSENSUS
            </text>
            <text x="45" y="26" textAnchor="middle" fill="#71717A" fontSize="7" fontFamily="sans-serif">
              Aura / BABE
            </text>
          </g>

          {/* SUB-NODE C: STATE COMMIT */}
          <g transform="translate(240, 140)">
            <rect width="90" height="32" rx="6" fill="#0d1b14" stroke="rgba(0,255,102,0.3)" strokeWidth="1" />
            <circle cx="12" cy="16" r="2" fill="#00FF66" />
            <text x="50" y="16" textAnchor="middle" fill="#FFFFFF" fontSize="8.5" fontFamily="monospace" fontWeight="500">
              STATE TRIE
            </text>
            <text x="50" y="26" textAnchor="middle" fill="#00FF66" fontSize="7" fontFamily="sans-serif">
              Merkle RocksDB
            </text>
          </g>
        </svg>
      </div>

      <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 pt-2 border-t border-white/[0.04]">
        <span>NODE &rarr; WASM &rarr; CONSENSUS &rarr; STATE</span>
        <span className="text-zinc-600">PRODUCTION L1</span>
      </div>
    </div>
  );
};
