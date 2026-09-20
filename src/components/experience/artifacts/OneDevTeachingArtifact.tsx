"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const OneDevTeachingArtifact: React.FC = () => {
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setPulse((p) => p + 1), 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full rounded-xl bg-black/40 border border-white/[0.08] p-5 flex flex-col justify-between select-none">
      <div className="flex items-center justify-between text-[11px] font-mono border-b border-white/[0.06] pb-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
          <span className="text-zinc-300 font-medium">CURRICULUM ARCHITECTURE</span>
        </div>
        <span className="text-zinc-500">ONE DEV DIPLOMA</span>
      </div>

      <div className="w-full flex items-center justify-center py-2">
        <svg
          viewBox="0 0 340 200"
          className="w-full max-w-[320px] h-auto select-none overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* VERTICAL CASCADE */}
          <line x1="170" y1="35" x2="170" y2="65" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
          <line x1="170" y1="95" x2="170" y2="120" stroke="rgba(129,140,248,0.3)" strokeWidth="1.5" />
          <line x1="170" y1="150" x2="170" y2="175" stroke="rgba(129,140,248,0.3)" strokeWidth="1.5" />

          {/* PULSE SIGNAL */}
          <motion.circle
            key={`onedev-sig-${pulse}`}
            cx="170"
            cy="20"
            r="2.5"
            fill="#818CF8"
            animate={{
              cy: [20, 80, 135, 185],
              opacity: [0, 1, 1, 0],
            }}
            transition={{ duration: 2.2, ease: "easeInOut" }}
          />

          {/* STAGE 1: FIRST-PRINCIPLES CONCEPT */}
          <g transform="translate(85, 8)">
            <rect width="170" height="28" rx="5" fill="#121218" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            <text x="85" y="18" textAnchor="middle" fill="#FFFFFF" fontSize="8.5" fontFamily="monospace" fontWeight="500">
              FIRST PRINCIPLES &amp; INVARIANTS
            </text>
          </g>

          {/* STAGE 2: EVM BYTECODE & YUL */}
          <g transform="translate(75, 65)">
            <rect width="190" height="30" rx="5" fill="#141422" stroke="rgba(129,140,248,0.35)" strokeWidth="1" />
            <text x="95" y="16" textAnchor="middle" fill="#818CF8" fontSize="9" fontFamily="monospace" fontWeight="600">
              EVM BYTECODE &amp; YUL MEMORY
            </text>
            <text x="95" y="24" textAnchor="middle" fill="#71717A" fontSize="7" fontFamily="sans-serif">
              Stack Execution &bull; Gas Metering
            </text>
          </g>

          {/* STAGE 3: SUBSTRATE WASM RUNTIME */}
          <g transform="translate(75, 120)">
            <rect width="190" height="30" rx="5" fill="#141422" stroke="rgba(129,140,248,0.35)" strokeWidth="1" />
            <text x="95" y="16" textAnchor="middle" fill="#818CF8" fontSize="9" fontFamily="monospace" fontWeight="600">
              SUBSTRATE &amp; WASM RUNTIME
            </text>
            <text x="95" y="24" textAnchor="middle" fill="#71717A" fontSize="7" fontFamily="sans-serif">
              State Pallets &bull; Weight Benchmarking
            </text>
          </g>

          {/* STAGE 4: PRODUCTION PROTOCOL ENGINEER */}
          <g transform="translate(70, 175)">
            <rect width="200" height="26" rx="5" fill="#0d1b14" stroke="rgba(0,255,102,0.35)" strokeWidth="1" />
            <circle cx="16" cy="13" r="2" fill="#00FF66" />
            <text x="105" y="17" textAnchor="middle" fill="#FFFFFF" fontSize="8.5" fontFamily="monospace" fontWeight="600">
              PRODUCTION PROTOCOL ENGINEER
            </text>
          </g>
        </svg>
      </div>

      <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 pt-2 border-t border-white/[0.04]">
        <span>CONCEPT &rarr; BYTECODE &rarr; WASM &rarr; PRODUCTION</span>
        <span className="text-zinc-600">TECHNICAL MENTORSHIP</span>
      </div>
    </div>
  );
};
