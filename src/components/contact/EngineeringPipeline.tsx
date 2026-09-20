"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export type PipelineCategory = "PROTOCOL" | "SYSTEM" | "DATA" | "ALL";

interface EngineeringPipelineProps {
  activeCategory: PipelineCategory;
  isSubmitting?: boolean;
  hasInputContent?: boolean;
}

export const EngineeringPipeline: React.FC<EngineeringPipelineProps> = ({
  activeCategory,
  isSubmitting = false,
  hasInputContent = false,
}) => {
  const [pulseCount, setPulseCount] = useState(0);

  // Subtle periodic data pulse across the blueprint
  useEffect(() => {
    const timer = setInterval(() => {
      setPulseCount((prev) => prev + 1);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const isProtocolActive = activeCategory === "PROTOCOL" || activeCategory === "ALL";
  const isSystemActive = activeCategory === "SYSTEM" || activeCategory === "ALL";
  const isDataActive = activeCategory === "DATA" || activeCategory === "ALL";

  return (
    <div className="relative w-full rounded-xl bg-[#0c0c10] border border-white/[0.08] p-5 sm:p-7 flex flex-col justify-between overflow-hidden min-h-[380px] sm:min-h-[460px]">
      {/* Header Info */}
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span className="text-zinc-400 uppercase tracking-wider text-[11px] font-semibold">
            ENGINEERING PIPELINE
          </span>
        </div>
        <span className="text-zinc-500 text-[11px]">
          {isSubmitting ? "SYNTHESIZING & SENDING" : hasInputContent ? "INPUT CONNECTED" : "SYSTEM READY"}
        </span>
      </div>

      {/* SVG System Architecture Diagram */}
      <div className="relative w-full flex-1 flex items-center justify-center py-4">
        <svg
          viewBox="0 0 420 340"
          className="w-full max-w-[380px] h-auto overflow-visible select-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* DEFINITIONS & GRADIENTS */}
          <defs>
            <linearGradient id="lineGradCyan" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#00F0FF" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="lineGradMuted" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.06)" />
            </linearGradient>
          </defs>

          {/* 1. TOP CONNECTIONS: Client Requirement -> Architecture */}
          <line
            x1="210"
            y1="40"
            x2="210"
            y2="80"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />

          {/* Dynamic pulse from Input to Architecture */}
          <motion.circle
            key={`pulse-top-${pulseCount}-${hasInputContent ? "active" : "idle"}`}
            cx="210"
            cy="40"
            r="2"
            fill="#00F0FF"
            animate={{ cy: [40, 80], opacity: [0, 1, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 2.5 }}
          />

          {/* 2. FORKING CONNECTIONS: Architecture -> 3 Subsystem Branches */}
          {/* Left Branch -> PROTOCOL */}
          <path
            d="M 210 120 L 210 135 L 75 135 L 75 160"
            stroke={isProtocolActive ? "rgba(0, 240, 255, 0.45)" : "rgba(255,255,255,0.08)"}
            strokeWidth="1.5"
            className="transition-colors duration-300"
          />
          {/* Center Branch -> SYSTEM */}
          <path
            d="M 210 120 L 210 160"
            stroke={isSystemActive ? "rgba(0, 240, 255, 0.45)" : "rgba(255,255,255,0.08)"}
            strokeWidth="1.5"
            className="transition-colors duration-300"
          />
          {/* Right Branch -> DATA */}
          <path
            d="M 210 120 L 210 135 L 345 135 L 345 160"
            stroke={isDataActive ? "rgba(0, 240, 255, 0.45)" : "rgba(255,255,255,0.08)"}
            strokeWidth="1.5"
            className="transition-colors duration-300"
          />

          {/* 3. CONVERGENCE CONNECTIONS: 3 Subsystem Branches -> Build & Test */}
          {/* Left Branch -> Converge */}
          <path
            d="M 75 200 L 75 225 L 210 225 L 210 240"
            stroke={isProtocolActive ? "rgba(0, 240, 255, 0.35)" : "rgba(255,255,255,0.08)"}
            strokeWidth="1.5"
            className="transition-colors duration-300"
          />
          {/* Center Branch -> Converge */}
          <path
            d="M 210 200 L 210 240"
            stroke={isSystemActive ? "rgba(0, 240, 255, 0.35)" : "rgba(255,255,255,0.08)"}
            strokeWidth="1.5"
            className="transition-colors duration-300"
          />
          {/* Right Branch -> Converge */}
          <path
            d="M 345 200 L 345 225 L 210 225 L 210 240"
            stroke={isDataActive ? "rgba(0, 240, 255, 0.35)" : "rgba(255,255,255,0.08)"}
            strokeWidth="1.5"
            className="transition-colors duration-300"
          />

          {/* 4. FINAL CONNECTION: Build & Test -> Production Ship */}
          <line
            x1="210"
            y1="272"
            x2="210"
            y2="300"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1.5"
          />

          {/* Submission Wave: surges through on submit */}
          {isSubmitting && (
            <motion.circle
              cx="210"
              cy="80"
              r="3"
              fill="#00F0FF"
              animate={{ cy: [80, 160, 240, 316], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
          )}

          {/* --- NODES --- */}

          {/* Node 1: CLIENT REQUIREMENT */}
          <g transform="translate(130, 12)">
            <rect
              width="160"
              height="28"
              rx="6"
              fill="#121218"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="1"
            />
            <circle cx="16" cy="14" r="3" fill="#00F0FF" />
            <text
              x="28"
              y="18"
              fill="#E4E4E7"
              fontSize="9.5"
              fontFamily="monospace"
              fontWeight="500"
              letterSpacing="0.05em"
            >
              CLIENT REQUIREMENT
            </text>
          </g>

          {/* Node 2: ARCHITECTURE */}
          <g transform="translate(140, 80)">
            <rect
              width="140"
              height="36"
              rx="6"
              fill="#14141c"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="1"
            />
            <text
              x="70"
              y="19"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="10"
              fontFamily="monospace"
              fontWeight="600"
              letterSpacing="0.06em"
            >
              ARCHITECTURE
            </text>
            <text
              x="70"
              y="29"
              textAnchor="middle"
              fill="#71717A"
              fontSize="7.5"
              fontFamily="sans-serif"
            >
              System Specification
            </text>
          </g>

          {/* Branch Node A: PROTOCOL */}
          <g
            transform="translate(15, 160)"
            className="transition-all duration-300"
          >
            <rect
              width="120"
              height="40"
              rx="6"
              fill={isProtocolActive ? "#111b22" : "#121218"}
              stroke={isProtocolActive ? "rgba(0, 240, 255, 0.4)" : "rgba(255,255,255,0.08)"}
              strokeWidth="1"
            />
            <text
              x="60"
              y="18"
              textAnchor="middle"
              fill={isProtocolActive ? "#00F0FF" : "#A1A1AA"}
              fontSize="9.5"
              fontFamily="monospace"
              fontWeight="600"
            >
              PROTOCOL
            </text>
            <text
              x="60"
              y="30"
              textAnchor="middle"
              fill="#71717A"
              fontSize="7.5"
              fontFamily="sans-serif"
            >
              Consensus &bull; EVM/WASM
            </text>
          </g>

          {/* Branch Node B: SYSTEM */}
          <g
            transform="translate(150, 160)"
            className="transition-all duration-300"
          >
            <rect
              width="120"
              height="40"
              rx="6"
              fill={isSystemActive ? "#111b22" : "#121218"}
              stroke={isSystemActive ? "rgba(0, 240, 255, 0.4)" : "rgba(255,255,255,0.08)"}
              strokeWidth="1"
            />
            <text
              x="60"
              y="18"
              textAnchor="middle"
              fill={isSystemActive ? "#00F0FF" : "#A1A1AA"}
              fontSize="9.5"
              fontFamily="monospace"
              fontWeight="600"
            >
              SYSTEMS
            </text>
            <text
              x="60"
              y="30"
              textAnchor="middle"
              fill="#71717A"
              fontSize="7.5"
              fontFamily="sans-serif"
            >
              Rust &bull; P2P &bull; RPC Infra
            </text>
          </g>

          {/* Branch Node C: DATA & SECURITY */}
          <g
            transform="translate(285, 160)"
            className="transition-all duration-300"
          >
            <rect
              width="120"
              height="40"
              rx="6"
              fill={isDataActive ? "#111b22" : "#121218"}
              stroke={isDataActive ? "rgba(0, 240, 255, 0.4)" : "rgba(255,255,255,0.08)"}
              strokeWidth="1"
            />
            <text
              x="60"
              y="18"
              textAnchor="middle"
              fill={isDataActive ? "#00F0FF" : "#A1A1AA"}
              fontSize="9.5"
              fontFamily="monospace"
              fontWeight="600"
            >
              DATA &amp; SEC
            </text>
            <text
              x="60"
              y="30"
              textAnchor="middle"
              fill="#71717A"
              fontSize="7.5"
              fontFamily="sans-serif"
            >
              Indexing &bull; Audit &bull; Test
            </text>
          </g>

          {/* Node 3: BUILD & TEST */}
          <g transform="translate(145, 240)">
            <rect
              width="130"
              height="32"
              rx="6"
              fill="#14141c"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="1"
            />
            <text
              x="65"
              y="18"
              textAnchor="middle"
              fill="#E4E4E7"
              fontSize="9.5"
              fontFamily="monospace"
              fontWeight="500"
            >
              BUILD &amp; TEST
            </text>
            <circle cx="15" cy="16" r="2.5" fill="rgba(255,255,255,0.3)" />
          </g>

          {/* Node 4: PRODUCTION SHIP */}
          <g transform="translate(135, 300)">
            <rect
              width="150"
              height="34"
              rx="6"
              fill="#0d1f18"
              stroke="rgba(0, 255, 102, 0.3)"
              strokeWidth="1"
            />
            <circle cx="20" cy="17" r="3" fill="#00FF66" />
            <text
              x="85"
              y="21"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="10"
              fontFamily="monospace"
              fontWeight="600"
              letterSpacing="0.05em"
            >
              PRODUCTION SHIP
            </text>
          </g>
        </svg>
      </div>

      {/* Bottom Pipeline Narrative */}
      <div className="border-t border-white/[0.06] pt-3 flex items-center justify-between text-[11px] font-mono text-zinc-500">
        <span>IDEA &rarr; ARCHITECTURE &rarr; SHIP</span>
        <span className="text-zinc-600">PRODUCTION GRADE</span>
      </div>
    </div>
  );
};
