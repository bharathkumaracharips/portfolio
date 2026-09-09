"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { ProtocolEngineCanvas } from "@/components/canvas/ProtocolEngineCanvas";

interface StageDef {
  id: number;
  tag: string;
  title: string;
  phase: string;
}

const stages: StageDef[] = [
  { id: 0, tag: "01 ARRIVAL", title: "ARRIVAL", phase: "INITIALIZE" },
  { id: 1, tag: "02 WHO I AM", title: "IDENTITY", phase: "ABSTRACTION → SYSTEM" },
  { id: 2, tag: "03 HOW I THINK", title: "THINKING", phase: "ARCHITECTURAL INTENT" },
  { id: 3, tag: "04 CURRENT ARCHITECTURE", title: "BUILDING", phase: "ACTIVE SPEC: AETHEL" },
  { id: 4, tag: "05 MY ENGINEERING", title: "TRIAD", phase: "DISCIPLINES" },
  { id: 5, tag: "06 SELECTED WORK", title: "WORK", phase: "PRODUCTION CHAPTERS" },
  { id: 6, tag: "07 THE TEACHER", title: "TEACH", phase: "PEDAGOGICAL STACK" },
  { id: 7, tag: "08 PROTOCOL TIERS", title: "STACK", phase: "DECONSTRUCTED TIERS" },
  { id: 8, tag: "09 WHY I BUILD", title: "PURPOSE", phase: "DISTILLED MONOLITH" },
  { id: 9, tag: "10 INVITATION", title: "CONTACT", phase: "DISPATCH CHANNELS" },
];

const workChapters = [
  {
    num: "01",
    label: "01 Sovereign L1",
    tag: "PROTOCOL ARCHITECTURE // SUBSTRATE & TENDERMINT-BFT",
    title: "Custom Layer-1 Sovereign Blockchain",
    desc: "Engineered enterprise sovereign chain with deterministic WASM runtime execution, custom gas schedules, and libp2p network topology achieving 1,200 verified transactions per second.",
    stack: ["Rust", "Substrate", "Tendermint-BFT", "libp2p"],
  },
  {
    num: "02",
    label: "02 Sealevel Engine",
    tag: "SEALEVEL ARCHITECTURE // PARALLEL ACCOUNT LOCKS",
    title: "High-Throughput Liquidity & Routing Engine",
    desc: "Constructed low-latency routing protocol on Solana Sealevel with zero-contention account batching to process institutional liquidity orders in sub-400ms slots.",
    stack: ["Rust", "Solana Sealevel", "Anchor", "Bincode"],
  },
  {
    num: "03",
    label: "03 ZK Inference",
    tag: "CRYPTO / ZK // VALIDITY PROOFS & EVM VERIFIER",
    title: "Verifiable On-Chain Inference Protocol",
    desc: "Implemented zk-SNARK validity proof verification pipelines for off-chain computational models, allowing smart contracts to verify complex neural tensor evaluations without trusting an oracle.",
    stack: ["zk-SNARKs", "Circom", "Solidity / EVM", "Rust Prover"],
  },
];

const protocolLayers = [
  {
    num: "01",
    name: "Network Topology",
    tag: "TRANSPORT",
    spec: "TCP / QUIC + Noise Protocol",
    desc: "Encrypted bi-directional streams. Flood-sub gossip propagates across thousands of peer daemons with deterministic delivery guarantees.",
  },
  {
    num: "02",
    name: "Peer Discovery & Routing",
    tag: "ROUTING",
    spec: "Kademlia XOR Metric DHT",
    desc: "Nodes compute cryptographic XOR distances. Byzantine or partitioned peers are quarantined automatically, preserving path integrity.",
  },
  {
    num: "03",
    name: "Consensus Engine",
    tag: "CONSENSUS",
    spec: "HotStuff-BFT / BABE-GRANDPA",
    desc: "Sequential validator voting rounds assemble >2/3+ BLS threshold signatures for irreversible asynchronous finality.",
  },
  {
    num: "04",
    name: "Merkle Block Assembly",
    tag: "PROOF",
    spec: "BLAKE2b-256 Binary Trees",
    desc: "Deterministic block batching commits transactions into 32-byte headers for O(log N) verification proofs.",
  },
  {
    num: "05",
    name: "Runtime Sandbox",
    tag: "EXECUTION",
    spec: "Deterministic WASM / Wasmtime",
    desc: "Multi-core pallet verification with strict cryptographic signatures, account nonces, and bounded gas metering.",
  },
  {
    num: "06",
    name: "Persistent State Root",
    tag: "STORAGE",
    spec: "Patricia Trie + RocksDB",
    desc: "Verified balances and contract storage committed to disk as the mathematically provable single source of truth.",
  },
];

export function ProtocolNarrative() {
  const sectionContainerRef = useRef<HTMLDivElement>(null);
  const [scrollFraction, setScrollFraction] = useState(0);
  const currentFractionRef = useRef(0);
  const targetFractionRef = useRef(0);

  const NARRATIVE_ACTIVE_ZONE = 0.92;

  // Jump to specific stage
  const jumpToStage = useCallback((stageIdx: number, subOffset = 0) => {
    const stageFrac = (stageIdx + subOffset) / (stages.length - 1);
    const targetFrac = stageFrac * NARRATIVE_ACTIVE_ZONE;
    const clamped = Math.min(Math.max(targetFrac, 0), 1);
    targetFractionRef.current = clamped;
    currentFractionRef.current = clamped;
    setScrollFraction(clamped);

    if (sectionContainerRef.current) {
      const total = sectionContainerRef.current.offsetHeight - window.innerHeight;
      const targetScrollY = sectionContainerRef.current.offsetTop + clamped * total;
      window.scrollTo({ top: targetScrollY, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      if (!sectionContainerRef.current) return;
      const rect = sectionContainerRef.current.getBoundingClientRect();
      const total = sectionContainerRef.current.offsetHeight - window.innerHeight;
      if (total > 0) {
        const frac = Math.min(Math.max(-rect.top / total, 0), 1);
        targetFractionRef.current = frac;
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const step = NARRATIVE_ACTIVE_ZONE / (stages.length - 1);
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        const next = Math.min(targetFractionRef.current + step * 0.5, 1);
        targetFractionRef.current = next;
        if (sectionContainerRef.current) {
          const total = sectionContainerRef.current.offsetHeight - window.innerHeight;
          window.scrollTo({ top: sectionContainerRef.current.offsetTop + next * total });
        }
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        const prev = Math.max(targetFractionRef.current - step * 0.5, 0);
        targetFractionRef.current = prev;
        if (sectionContainerRef.current) {
          const total = sectionContainerRef.current.offsetHeight - window.innerHeight;
          window.scrollTo({ top: sectionContainerRef.current.offsetTop + prev * total });
        }
      }
    };

    // Responsive, snappy damping loop
    const updateLoop = () => {
      animationFrameId = requestAnimationFrame(updateLoop);
      const diff = targetFractionRef.current - currentFractionRef.current;
      if (Math.abs(diff) > 0.0001) {
        currentFractionRef.current += diff * 0.18;
        setScrollFraction(currentFractionRef.current);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleKeyDown);
    updateLoop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Normalize scrollFraction so stages complete across 0.0 -> 0.92, locking through scrubber 010
  const narrativeFraction = Math.min(scrollFraction / NARRATIVE_ACTIVE_ZONE, 1.0);
  const progressFloat = narrativeFraction * (stages.length - 1);
  const activeStageIndex = Math.min(
    Math.max(Math.round(progressFloat), 0),
    stages.length - 1
  );

  // Scroll-driven chapter in Stage 06 (index 5)
  // Window: stage 5 progress from 4.7 to 5.3
  const stage06Progress = Math.min(Math.max((progressFloat - 4.65) / 0.7, 0), 0.999);
  const activeWorkChapter = Math.min(Math.floor(stage06Progress * 3), 2);

  // Scroll-driven tier in Stage 08 (index 7)
  // Window: stage 7 progress from 6.65 to 7.35
  const stage08Progress = Math.min(Math.max((progressFloat - 6.65) / 0.7, 0), 0.999);
  const activeProtocolLayer = Math.min(Math.floor(stage08Progress * 6), 5);

  useEffect(() => {
    if (activeStageIndex === 7 && typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("protocol-step-change", {
          detail: { step: activeProtocolLayer },
        })
      );
    }
  }, [activeStageIndex, activeProtocolLayer]);

  // Apple-style cinematic scrollytelling transition with generous reading plateaus
  const getStageStyle = (index: number): React.CSSProperties => {
    const diff = progressFloat - index;
    const absDiff = Math.abs(diff);

    let opacity = 0;
    let translateY = 0;
    let scale = 1;
    let blurPx = 0;

    if (absDiff <= 0.35) {
      // Solid reading plateau
      opacity = 1;
      translateY = 0;
      scale = 1;
      blurPx = 0;
    } else if (absDiff < 0.85) {
      const t = (absDiff - 0.35) / 0.5; // normalized transition progress [0, 1]
      opacity = Math.max(0, 1 - Math.pow(t, 1.3));
      translateY = (diff > 0 ? -1 : 1) * Math.pow(t, 1.2) * 28;
      scale = 1 - t * 0.05;
      blurPx = t * 6;
    }

    const isInteractable = absDiff < 0.45;

    return {
      opacity,
      transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
      filter: blurPx > 0.1 ? `blur(${blurPx.toFixed(1)}px)` : "none",
      pointerEvents: isInteractable ? "auto" : "none",
      visibility: opacity > 0.005 ? "visible" : "hidden",
      transition: "filter 0.08s ease-out",
      zIndex: Math.round((1 - Math.min(absDiff, 1)) * 20),
    };
  };

  return (
    <div ref={sectionContainerRef} className="relative w-full" style={{ height: "1000vh" }}>
      {/* STICKY FULLSCREEN VIEWPORT */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between select-none z-10 bg-[#050505]">
        {/* ===================================================================== */}
        {/* TOP HUD BAR                                                           */}
        {/* ===================================================================== */}
        <header className="relative z-40 w-full bg-[#050505]/85 backdrop-blur-md border-b border-[#1e1e20]/70">
          {/* Top Micro Scroll Progress Bar */}
          <div className="w-full h-[2px] bg-white/5 absolute top-0 left-0">
            <div
              className="h-full bg-[#61E7FF] transition-all duration-75 ease-out shadow-[0_0_12px_#61E7FF]"
              style={{ width: `${scrollFraction * 100}%` }}
            />
          </div>

          <div className="max-w-[1440px] mx-auto px-6 sm:px-10 h-16 sm:h-20 flex items-center justify-between">
            {/* Left: Monogram */}
            <button
              onClick={() => jumpToStage(0)}
              className="group flex items-baseline gap-3 text-left focus:outline-none cursor-pointer"
            >
              <span className="text-xl font-bold tracking-tighter text-[#F5F5F2] group-hover:text-[#61E7FF] transition-colors">
                BKA.
              </span>
              <span className="hidden md:inline-block text-[11px] font-mono tracking-widest text-[#888888] uppercase">
                Bharath Kumar Achari
              </span>
            </button>

            {/* Center: Live Story Beat HUD Indicator */}
            <div className="flex items-center gap-3 px-3.5 py-1.5 border border-[#1e1e20] bg-[#050505]/90 text-[11px] font-mono">
              <span className="text-[#888888] hidden sm:inline">
                STORY BEAT 0{activeStageIndex + 1}/10 //
              </span>
              <span className="text-[#61E7FF] font-semibold tracking-wider">
                {stages[activeStageIndex].tag}
              </span>
            </div>

            {/* Right: Quick Chapter Links & Status */}
            <div className="flex items-center gap-6 sm:gap-8">
              <nav className="hidden lg:flex items-center gap-6 text-xs font-mono uppercase tracking-widest text-[#888888]">
                <a
                  href="#experience"
                  className="hover:text-[#61E7FF] transition-colors cursor-pointer"
                >
                  Experience
                </a>
                <button
                  onClick={() => jumpToStage(5)}
                  className="hover:text-[#F5F5F2] transition-colors cursor-pointer"
                >
                  Work
                </button>
                <button
                  onClick={() => jumpToStage(6)}
                  className="hover:text-[#F5F5F2] transition-colors cursor-pointer"
                >
                  Teach
                </button>
                <button
                  onClick={() => jumpToStage(4)}
                  className="hover:text-[#F5F5F2] transition-colors cursor-pointer"
                >
                  About
                </button>
                <button
                  onClick={() => jumpToStage(9)}
                  className="hover:text-[#61E7FF] transition-colors cursor-pointer"
                >
                  Contact
                </button>
              </nav>
              <button
                onClick={() => jumpToStage(3)}
                className="inline-flex items-center gap-2 text-[11px] font-mono tracking-wider text-[#F5F5F2]/90 hover:text-[#61E7FF] transition-colors px-2.5 py-1 bg-white/[0.03] border border-[#1e1e20] cursor-pointer"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#61E7FF] animate-ping" />
                <span className="hidden sm:inline">BUILDING:</span>
                <span className="text-[#61E7FF] font-medium">AETHEL</span>
              </button>
            </div>
          </div>
        </header>

        {/* ===================================================================== */}
        {/* MAIN NARRATIVE + 3D VIEWPORT                                          */}
        {/* ===================================================================== */}
        <div className="relative z-30 flex-1 w-full max-w-[1440px] mx-auto px-6 sm:px-10 flex items-center justify-between overflow-hidden">
          {/* Vertical Progress Rail (Left Edge) */}
          <div className="hidden xl:flex flex-col items-center justify-center gap-2 mr-6 text-[9px] font-mono text-[#888888]">
            <div className="h-28 w-[1px] bg-gradient-to-b from-transparent via-[#61E7FF]/40 to-transparent relative">
              <div
                className="w-1.5 h-1.5 rounded-full bg-[#61E7FF] absolute -left-[2.5px] shadow-[0_0_8px_#61E7FF] transition-all duration-150"
                style={{ top: `${scrollFraction * 100}%` }}
              />
            </div>
            <span className="text-[#61E7FF] font-semibold">
              {Math.round(scrollFraction * 100)}%
            </span>
          </div>

          {/* LEFT: Cross-Fading Story Narrative */}
          <div className="w-full lg:w-[48%] xl:w-[46%] h-full relative flex items-center">
            {/* ---------------- STAGE 01: ARRIVAL ---------------- */}
            <div
              style={getStageStyle(0)}
              className="absolute inset-0 flex flex-col justify-center space-y-6 pr-4 will-change-transform"
            >
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#888888]">
                <span className="text-[#61E7FF] font-medium">
                  BHARATH KUMAR ACHARI
                </span>
                <span>//</span>
                <span>BLOCKCHAIN / PROTOCOL ENGINEER</span>
                <span>//</span>
                <span className="text-[#F5F5F2]/80">TUTOR & RESEARCHER</span>
              </div>

              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tighter leading-[0.94] text-[#F5F5F2]">
                BUILDING
                <br />
                DECENTRALIZED
                <br />
                <span className="text-[#61E7FF]">SYSTEMS.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#888888] max-w-xl font-normal leading-relaxed">
                I design and build blockchain infrastructure, distributed
                systems, and protocol-level applications, and teach blockchain
                from fundamentals to verifiable implementation.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => jumpToStage(5)}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#F5F5F2] text-[#050505] text-xs font-mono uppercase tracking-wider font-semibold hover:bg-[#61E7FF] transition-all duration-200 cursor-pointer"
                >
                  EXPLORE MY WORK ↗
                </button>
                <button
                  onClick={() => jumpToStage(6)}
                  className="inline-flex items-center gap-2 px-6 py-3.5 border border-[#1e1e20] bg-[#050505]/60 backdrop-blur text-[#F5F5F2] text-xs font-mono uppercase tracking-wider hover:border-[#F5F5F2] hover:text-[#61E7FF] transition-all duration-200 cursor-pointer"
                >
                  LEARN WITH ME ↗
                </button>
              </div>

              <div className="pt-4 border-t border-[#1e1e20] flex items-center gap-2 text-xs font-mono text-[#888888]">
                <span className="text-[#61E7FF]">FOCUS //</span>
                <span>PROTOCOL ENGINEERING · DISTRIBUTED SYSTEMS · CONSENSUS</span>
              </div>
            </div>

            {/* ---------------- STAGE 02: WHO I AM ---------------- */}
            <div
              style={getStageStyle(1)}
              className="absolute inset-0 flex flex-col justify-center space-y-6 pr-4 will-change-transform"
            >
              <div className="text-xs font-mono tracking-widest text-[#61E7FF] uppercase flex items-center gap-3">
                <span>STAGE 02 // IDENTITY TRANSITION</span>
                <span className="h-px w-10 bg-[#61E7FF]/40" />
                <span className="text-[#888888]">SYSTEM LEVEL FOCUS</span>
              </div>

              <h2 className="text-4xl sm:text-6xl xl:text-7xl font-black tracking-tighter leading-[0.98] text-[#F5F5F2]">
                I WORK AT THE
                <br />
                <span className="text-[#61E7FF]">SYSTEM LEVEL.</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="p-4 border border-[#1e1e20] bg-[#050505]/90 backdrop-blur">
                  <span className="text-[10px] font-mono text-[#61E7FF] uppercase block mb-1">
                    PRIMITIVE 01
                  </span>
                  <h3 className="text-base font-bold text-[#F5F5F2] mb-1">
                    BLOCKCHAIN
                  </h3>
                  <p className="text-xs font-mono text-[#888888] leading-relaxed">
                    Deterministic state transition models & Byzantine fault-tolerant finality.
                  </p>
                </div>
                <div className="p-4 border border-[#1e1e20] bg-[#050505]/90 backdrop-blur">
                  <span className="text-[10px] font-mono text-[#61E7FF] uppercase block mb-1">
                    PRIMITIVE 02
                  </span>
                  <h3 className="text-base font-bold text-[#F5F5F2] mb-1">
                    PROTOCOLS
                  </h3>
                  <p className="text-xs font-mono text-[#888888] leading-relaxed">
                    Consensus state machines & frame runtime pallets.
                  </p>
                </div>
                <div className="p-4 border border-[#1e1e20] bg-[#050505]/90 backdrop-blur">
                  <span className="text-[10px] font-mono text-[#61E7FF] uppercase block mb-1">
                    PRIMITIVE 03
                  </span>
                  <h3 className="text-base font-bold text-[#F5F5F2] mb-1">
                    DISTRIBUTED
                  </h3>
                  <p className="text-xs font-mono text-[#888888] leading-relaxed">
                    P2P gossip propagation, Kademlia DHT routing & leaderless finality.
                  </p>
                </div>
              </div>
            </div>

            {/* ---------------- STAGE 03: HOW I THINK ---------------- */}
            <div
              style={getStageStyle(2)}
              className="absolute inset-0 flex flex-col justify-center space-y-6 pr-4 will-change-transform"
            >
              <div className="text-xs font-mono tracking-widest text-[#61E7FF] uppercase flex items-center gap-3">
                <span>STAGE 03 // ARCHITECTURAL INTENT</span>
                <span className="h-px w-10 bg-[#61E7FF]/40" />
                <span className="text-[#888888]">CORE PREREQUISITES</span>
              </div>

              <h2 className="text-3xl sm:text-5xl xl:text-6xl font-bold tracking-tighter text-[#F5F5F2] leading-[1.05]">
                I DON&apos;T JUST BUILD APPS.
                <br />
                <span className="text-[#61E7FF]">I BUILD THE SYSTEMS</span>
                <br />
                UNDERNEATH THEM.
              </h2>

              <p className="text-sm sm:text-base text-[#888888] leading-relaxed max-w-xl">
                When a transaction executes on-chain, the application layer is
                merely the final millimeter. The true complexity resides in peer
                handshakes, mempools, consensus voting, and deterministic VM
                sandboxes.
              </p>

              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="p-3 border border-[#1e1e20] bg-[#050505]/70">
                  <div className="text-[10px] font-mono text-[#61E7FF]">
                    LAYER α
                  </div>
                  <div className="text-sm font-bold text-[#F5F5F2]">PROTOCOL</div>
                  <div className="text-[11px] font-mono text-[#888888] mt-1">
                    P2P topology & sovereign rules
                  </div>
                </div>
                <div className="p-3 border border-[#1e1e20] bg-[#050505]/70">
                  <div className="text-[10px] font-mono text-[#61E7FF]">
                    LAYER β
                  </div>
                  <div className="text-sm font-bold text-[#F5F5F2]">CONSENSUS</div>
                  <div className="text-[11px] font-mono text-[#888888] mt-1">
                    Deterministic state sync
                  </div>
                </div>
                <div className="p-3 border border-[#1e1e20] bg-[#050505]/70">
                  <div className="text-[10px] font-mono text-[#61E7FF]">
                    LAYER γ
                  </div>
                  <div className="text-sm font-bold text-[#F5F5F2]">EXECUTION</div>
                  <div className="text-[11px] font-mono text-[#888888] mt-1">
                    WASM sandbox & gas metering
                  </div>
                </div>
              </div>
            </div>

            {/* ---------------- STAGE 04: CURRENT ARCHITECTURE ---------------- */}
            <div
              style={getStageStyle(3)}
              className="absolute inset-0 flex flex-col justify-center space-y-5 pr-4 will-change-transform"
            >
              <div className="flex items-center justify-between border-b border-[#1e1e20] pb-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[#61E7FF]">
                  STAGE 04 // ACTIVE IMPLEMENTATION
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 bg-[#61E7FF]/10 text-[#61E7FF] border border-[#61E7FF]/30">
                  DEVNET ACTIVE
                </span>
              </div>

              <div>
                <div className="text-[11px] font-mono text-[#888888] uppercase tracking-wider">
                  PRIMARY PROJECT //
                </div>
                <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#F5F5F2]">
                  Aethel Protocol
                </h2>
                <p className="text-sm font-medium text-[#61E7FF] mt-1">
                  Modular Consensus & Zero-Overhead Runtime
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#888888] leading-relaxed max-w-xl">
                An asynchronous settlement layer engineered from first principles
                in Rust with Polkadot SDK and Substrate pallets for parallel
                deterministic state transitions.
              </p>

              <div className="flex flex-wrap gap-2 text-xs font-mono">
                <span className="px-2.5 py-1 bg-[#1e1e20]/60 border border-[#1e1e20] text-[#F5F5F2]">
                  RUST
                </span>
                <span className="px-2.5 py-1 bg-[#1e1e20]/60 border border-[#1e1e20] text-[#F5F5F2]">
                  SUBSTRATE
                </span>
                <span className="px-2.5 py-1 bg-[#1e1e20]/60 border border-[#1e1e20] text-[#F5F5F2]">
                  POLKADOT SDK
                </span>
                <span className="px-2.5 py-1 bg-[#1e1e20]/60 border border-[#1e1e20] text-[#F5F5F2]">
                  XCM v3
                </span>
                <span className="px-2.5 py-1 bg-[#1e1e20]/60 border border-[#1e1e20] text-[#F5F5F2]">
                  WASM
                </span>
              </div>

              <div className="p-3.5 border border-[#1e1e20] bg-[#050505]/80 text-xs font-mono flex items-center justify-between">
                <span className="text-[#888888]">
                  HotStuff-BFT Engine ⇄ WASM Sandbox ⇄ XCM Teleport
                </span>
                <button
                  onClick={() => jumpToStage(9)}
                  className="text-[#61E7FF] hover:underline cursor-pointer"
                >
                  Inspect Spec ↗
                </button>
              </div>
            </div>

            {/* ---------------- STAGE 05: MY ENGINEERING ---------------- */}
            <div
              style={getStageStyle(4)}
              className="absolute inset-0 flex flex-col justify-center space-y-6 pr-4 will-change-transform"
            >
              <div className="text-xs font-mono tracking-widest text-[#61E7FF] uppercase flex items-center gap-3">
                <span>STAGE 05 // CORE DISCIPLINES</span>
                <span className="h-px w-10 bg-[#61E7FF]/40" />
                <span className="text-[#888888]">THE TRIAD</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-bold tracking-tighter text-[#F5F5F2]">
                THE ENGINEERING
                <br />
                <span className="text-[#61E7FF]">TRIAD.</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 border border-[#1e1e20] bg-[#050505]/80">
                  <span className="text-[10px] font-mono text-[#61E7FF] uppercase block mb-1">
                    01 // PRODUCTION
                  </span>
                  <h3 className="text-lg font-bold text-[#F5F5F2] mb-2">BUILD</h3>
                  <ul className="text-xs font-mono text-[#888888] space-y-1">
                    <li>• Sovereign L1 Chains</li>
                    <li>• BFT / PoS Consensus</li>
                    <li>• WASM Runtimes</li>
                    <li>• P2P Gossip Topologies</li>
                  </ul>
                </div>
                <div className="p-4 border border-[#1e1e20] bg-[#050505]/80">
                  <span className="text-[10px] font-mono text-[#61E7FF] uppercase block mb-1">
                    02 // INQUIRY
                  </span>
                  <h3 className="text-lg font-bold text-[#F5F5F2] mb-2">RESEARCH</h3>
                  <ul className="text-xs font-mono text-[#888888] space-y-1">
                    <li>• Distributed Theory</li>
                    <li>• Cryptographic Proofs</li>
                    <li>• State Trie Pruning</li>
                    <li>• ZK Verification</li>
                  </ul>
                </div>
                <div className="p-4 border border-[#1e1e20] bg-[#050505]/80">
                  <span className="text-[10px] font-mono text-[#61E7FF] uppercase block mb-1">
                    03 // PEDAGOGY
                  </span>
                  <h3 className="text-lg font-bold text-[#F5F5F2] mb-2">TEACH</h3>
                  <ul className="text-xs font-mono text-[#888888] space-y-1">
                    <li>• Fundamentals & Math</li>
                    <li>• Architecture Breakdown</li>
                    <li>• Rust for Protocols</li>
                    <li>• Light Client Proofs</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* ---------------- STAGE 06: SELECTED WORK (SCROLL-DRIVEN CHAPTERS) ---------------- */}
            <div
              style={getStageStyle(5)}
              className="absolute inset-0 flex flex-col justify-center space-y-4 pr-4 will-change-transform"
            >
              <div className="flex items-center justify-between border-b border-[#1e1e20] pb-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[#61E7FF]">
                  STAGE 06 // SELECTED WORK (SCROLL TO EXPLORE CHAPTERS)
                </span>
                <span className="text-[10px] font-mono text-[#888888]">
                  CHAPTER 0{activeWorkChapter + 1} / 03
                </span>
              </div>

              {/* Scroll-synced chapter indicators */}
              <div className="flex gap-2 text-xs font-mono">
                {workChapters.map((ch, idx) => (
                  <button
                    key={idx}
                    onClick={() => jumpToStage(5, (idx - 1) * 0.28)}
                    className={`px-3 py-1.5 border transition-all duration-200 cursor-pointer ${
                      activeWorkChapter === idx
                        ? "border-[#61E7FF] bg-[#61E7FF]/15 text-[#61E7FF] font-semibold shadow-[0_0_10px_rgba(97,231,255,0.15)]"
                        : "border-[#1e1e20] text-[#888888] hover:text-[#F5F5F2]"
                    }`}
                  >
                    {ch.label}
                  </button>
                ))}
              </div>

              {/* Active Chapter Card */}
              <div className="p-6 border border-[#1e1e20] bg-[#050505]/95 shadow-xl space-y-3.5 transition-all duration-300">
                <div className="text-[11px] font-mono text-[#61E7FF] tracking-wider">
                  {workChapters[activeWorkChapter].tag}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#F5F5F2]">
                  {workChapters[activeWorkChapter].title}
                </h3>
                <p className="text-xs sm:text-sm font-mono text-[#888888] leading-relaxed">
                  {workChapters[activeWorkChapter].desc}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {workChapters[activeWorkChapter].stack.map((item, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-[#1e1e20]/80 border border-[#1e1e20] text-xs font-mono text-[#F5F5F2]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* ---------------- STAGE 07: THE TEACHER ---------------- */}
            <div
              style={getStageStyle(6)}
              className="absolute inset-0 flex flex-col justify-center space-y-5 pr-4 will-change-transform"
            >
              <div className="text-xs font-mono tracking-widest text-[#61E7FF] uppercase flex items-center gap-3">
                <span>STAGE 07 // PEDAGOGY</span>
                <span className="h-px w-10 bg-[#61E7FF]/40" />
                <span className="text-[#888888]">FIRST PRINCIPLES</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tighter text-[#F5F5F2] leading-tight">
                I DON&apos;T JUST USE BLOCKCHAINS.
                <br />
                <span className="text-[#61E7FF]">I TEACH HOW THEY WORK.</span>
              </h2>

              <p className="text-xs sm:text-sm text-[#888888] leading-relaxed max-w-xl">
                Blockchains are deterministic state machines replicated across
                adversarial environments. My curriculum breaks down every layer
                into crystal-clear mechanical primitives.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1 text-xs font-mono">
                <div className="p-2.5 border border-[#1e1e20] bg-[#050505]">
                  <span className="text-[#61E7FF] block text-[10px]">01</span>
                  Fundamentals & Math
                </div>
                <div className="p-2.5 border border-[#1e1e20] bg-[#050505]">
                  <span className="text-[#61E7FF] block text-[10px]">02</span>
                  Distributed Systems
                </div>
                <div className="p-2.5 border border-[#1e1e20] bg-[#050505]">
                  <span className="text-[#61E7FF] block text-[10px]">03</span>
                  Cryptography & Hashes
                </div>
                <div className="p-2.5 border border-[#1e1e20] bg-[#050505]">
                  <span className="text-[#61E7FF] block text-[10px]">04</span>
                  Mempool & Gas Market
                </div>
                <div className="p-2.5 border border-[#1e1e20] bg-[#050505]">
                  <span className="text-[#61E7FF] block text-[10px]">05</span>
                  BFT / PoS Consensus
                </div>
                <div className="p-2.5 border border-[#1e1e20] bg-[#050505]">
                  <span className="text-[#61E7FF] block text-[10px]">06</span>
                  Protocol Engineering
                </div>
              </div>
            </div>

            {/* ---------------- STAGE 08: SCROLL-DRIVEN PROTOCOL TIERS ---------------- */}
            <div
              style={getStageStyle(7)}
              className="absolute inset-0 flex flex-col justify-center space-y-4 pr-4 will-change-transform"
            >
              <div className="flex items-center justify-between border-b border-[#1e1e20] pb-2">
                <span className="text-xs font-mono text-[#61E7FF] uppercase tracking-widest">
                  STAGE 08 // SCROLL PROTOCOL TIERS (AUTO-ADVANCES)
                </span>
                <span className="text-[11px] font-mono text-[#888888]">
                  TIER 0{activeProtocolLayer + 1} / 06
                </span>
              </div>

              {/* Scroll-synced tier navigation tabs */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                {protocolLayers.map((l, i) => (
                  <button
                    key={i}
                    onClick={() => jumpToStage(7, (i - 2.5) * 0.12)}
                    className={`p-2 border text-center transition-all duration-200 cursor-pointer ${
                      activeProtocolLayer === i
                        ? "border-[#61E7FF] bg-[#61E7FF]/15 text-[#61E7FF] font-semibold shadow-[0_0_10px_rgba(97,231,255,0.1)]"
                        : "border-[#1e1e20] text-[#888888] hover:text-[#F5F5F2]"
                    }`}
                  >
                    <div className="text-[9px] font-mono">L0{i + 1}</div>
                    <div className="text-[10px] font-mono font-medium truncate">
                      {l.tag}
                    </div>
                  </button>
                ))}
              </div>

              {/* Active Tier Card */}
              <div className="p-5 border border-[#61E7FF]/60 bg-[#050505]/95 shadow-[0_0_30px_rgba(97,231,255,0.06)] space-y-2.5 transition-all duration-300">
                <div className="flex items-center justify-between text-xs font-mono text-[#61E7FF]">
                  <span>
                    0{activeProtocolLayer + 1} // {protocolLayers[activeProtocolLayer].name}
                  </span>
                  <span className="text-[10px] text-[#888888]">
                    {protocolLayers[activeProtocolLayer].spec}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#F5F5F2]">
                  {protocolLayers[activeProtocolLayer].name}
                </h3>
                <p className="text-xs sm:text-sm font-mono text-[#888888] leading-relaxed">
                  {protocolLayers[activeProtocolLayer].desc}
                </p>
              </div>
            </div>

            {/* ---------------- STAGE 09: WHY I BUILD ---------------- */}
            <div
              style={getStageStyle(8)}
              className="absolute inset-0 flex flex-col justify-center space-y-6 pr-4 will-change-transform"
            >
              <div className="text-xs font-mono tracking-widest text-[#61E7FF] uppercase flex items-center gap-3">
                <span>STAGE 09 // DISTILLED PURPOSE</span>
                <span className="h-px w-10 bg-[#61E7FF]/40" />
                <span className="text-[#888888]">CONVERGENCE</span>
              </div>

              <h2 className="text-4xl sm:text-6xl xl:text-7xl font-black tracking-tighter text-[#F5F5F2] leading-[0.94]">
                BUILD.
                <br />
                LEARN.
                <br />
                <span className="text-[#61E7FF]">EXPLORE.</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs font-mono text-[#888888]">
                <div className="p-3 border border-[#1e1e20] bg-[#050505]">
                  <span className="text-[#61E7FF] block mb-1">01 // BUILD</span>
                  Transforming cryptographic algorithms into hardened runtime binaries.
                </div>
                <div className="p-3 border border-[#1e1e20] bg-[#050505]">
                  <span className="text-[#61E7FF] block mb-1">
                    02 // UNDERSTAND
                  </span>
                  Digging into state replays, byte arrays, and validity proofs.
                </div>
                <div className="p-3 border border-[#1e1e20] bg-[#050505]">
                  <span className="text-[#61E7FF] block mb-1">03 // TEACH</span>
                  Empowering the next generation of protocol builders with clarity.
                </div>
              </div>
            </div>

            {/* ---------------- STAGE 10: INVITATION / CONTACT ---------------- */}
            <div
              style={getStageStyle(9)}
              className="absolute inset-0 flex flex-col justify-center space-y-6 pr-4 will-change-transform"
            >
              <div className="text-xs font-mono uppercase tracking-widest text-[#61E7FF] flex items-center gap-3">
                <span>STAGE 10 // DIRECT INVITATION</span>
                <span className="h-px w-10 bg-[#61E7FF]/40" />
                <span className="text-[#888888]">CONNECT</span>
              </div>

              <h2 className="text-3xl sm:text-5xl xl:text-6xl font-black tracking-tighter text-[#F5F5F2] leading-[0.98]">
                LET&apos;S BUILD SOMETHING
                <br />
                <span className="text-[#61E7FF]">WORTH UNDERSTANDING.</span>
              </h2>

              <p className="text-xs sm:text-sm text-[#888888] font-normal leading-relaxed max-w-lg">
                Available for protocol consulting, low-level Rust blockchain
                architecture, runtime engineering, and intensive workshops.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <a
                  className="p-3 border border-[#1e1e20] bg-[#050505] text-xs font-mono text-[#F5F5F2] hover:border-[#61E7FF] hover:text-[#61E7FF] transition-all"
                  href="mailto:bharath@bharathkumar.io"
                >
                  <span className="text-[10px] text-[#888888] block mb-0.5">
                    COLLABORATE
                  </span>
                  WORK WITH ME ↗
                </a>
                <a
                  className="p-3 border border-[#1e1e20] bg-[#050505] text-xs font-mono text-[#F5F5F2] hover:border-[#61E7FF] hover:text-[#61E7FF] transition-all"
                  href="mailto:bharath@bharathkumar.io?subject=Tutoring%20Inquiry"
                >
                  <span className="text-[10px] text-[#888888] block mb-0.5">
                    EDUCATION
                  </span>
                  LEARN WITH ME ↗
                </a>
                <a
                  className="p-3 border border-[#1e1e20] bg-[#050505] text-xs font-mono text-[#F5F5F2] hover:border-[#61E7FF] hover:text-[#61E7FF] transition-all"
                  href="https://github.com"
                  rel="noreferrer"
                  target="_blank"
                >
                  <span className="text-[10px] text-[#888888] block mb-0.5">
                    SOURCE CODE
                  </span>
                  GITHUB ↗
                </a>
                <a
                  className="p-3 border border-[#1e1e20] bg-[#050505] text-xs font-mono text-[#F5F5F2] hover:border-[#61E7FF] hover:text-[#61E7FF] transition-all"
                  href="https://linkedin.com"
                  rel="noreferrer"
                  target="_blank"
                >
                  <span className="text-[10px] text-[#888888] block mb-0.5">
                    PROFESSIONAL
                  </span>
                  LINKEDIN ↗
                </a>
                <a
                  className="p-3 border border-[#1e1e20] bg-[#050505] text-xs font-mono text-[#F5F5F2] hover:border-[#61E7FF] hover:text-[#61E7FF] transition-all sm:col-span-2"
                  href="mailto:bharath@bharathkumar.io"
                >
                  <span className="text-[10px] text-[#888888] block mb-0.5">
                    DIRECT EMAIL
                  </span>
                  bharath@bharathkumar.io ↗
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: 3D Protocol Engine Canvas */}
          <div className="hidden lg:flex w-[50%] xl:w-[52%] h-full max-h-[640px] items-center justify-center relative pointer-events-auto">
            <ProtocolEngineCanvas scrollProgress={narrativeFraction} />
          </div>
        </div>


        {/* ===================================================================== */}
        {/* BOTTOM SCRUBBER HUD & TELEMETRY FOOTER                                */}
        {/* ===================================================================== */}
        <footer className="relative z-40 w-full bg-[#050505]/85 backdrop-blur-md border-t border-[#1e1e20]/70 py-3 sm:py-4 px-6 sm:px-10">
          <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
            {/* Left: Interactive Stage Stepper */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-[10px] text-[#888888] mr-1 hidden md:inline">
                SCRUBBER:
              </span>
              {stages.map((st, i) => (
                <button
                  key={st.id}
                  onClick={() => jumpToStage(i)}
                  className={`px-2 py-1 border text-[10px] font-mono transition-all cursor-pointer ${
                    activeStageIndex === i
                      ? "border-[#61E7FF] bg-[#61E7FF] text-[#050505] font-bold shadow-[0_0_8px_#61E7FF]"
                      : "border-[#1e1e20] text-[#888888] hover:border-[#F5F5F2]/40 hover:text-[#F5F5F2]"
                  }`}
                  title={st.tag}
                >
                  0{i + 1}
                </button>
              ))}
            </div>

            {/* Right: Telemetry & Flow Hint */}
            <div className="flex items-center gap-4 text-[#888888] text-[11px]">
              <span className="hidden sm:inline">
                SCROLL CONTINUOUSLY TO NARRATE
              </span>
              <span className="text-[#61E7FF] flex items-center gap-1.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#61E7FF] animate-ping" />
                SYSTEM ONLINE
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
