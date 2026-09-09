"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { ExternalLink, Sparkles } from "lucide-react";

// ─── DETERMINISTIC PARTICLES (SSR-safe, no Math.random) ──────────────────────
const PARTICLES = Array.from({ length: 35 }, (_, i) => ({
  id: i,
  x: ((i * 37 + 13) % 93) + 3,
  y: ((i * 53 + 17) % 88) + 6,
  size: (i % 3) * 0.8 + 1.4,
  delay: (i * 0.23) % 7,
  duration: ((i * 1.4) % 5) + 4,
  color: ["#00f0ff", "#8a2be2", "#00ff9d"][i % 3],
}));

const STAGE_LABELS = [
  "INTRO",
  "TX SIGN",
  "MEMPOOL",
  "PoS SELECT",
  "PoI ANALYSIS",
  "DCF IMPORT",
  "DVF FINALITY",
  "BLOCK BUILD",
  "THE CHAIN",
];

// ─── CUSTOM HOOK: scroll-driven scene opacity ─────────────────────────────────
function useSceneOpacity(
  prog: MotionValue<number>,
  fadeIn: number,
  holdStart: number,
  holdEnd: number,
  fadeOut: number,
  keepVisible = false
): MotionValue<number> {
  return useTransform(
    prog,
    [fadeIn, holdStart, holdEnd, fadeOut],
    [0, 1, 1, keepVisible ? 1 : 0]
  );
}

// ─── PARTICLE FIELD ───────────────────────────────────────────────────────────
function ParticleField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 5}px ${p.color}88`,
          }}
          animate={{
            y: [-12, -44, -12],
            x: [-8, 8, -8],
            opacity: [0.04, 0.18, 0.04],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ─── LEFT PROGRESS TIMELINE ───────────────────────────────────────────────────
function ProgressTimeline({ activeStage }: { activeStage: number }) {
  return (
    <div className="absolute left-4 sm:left-7 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3.5">
      {STAGE_LABELS.map((label, i) => (
        <div key={label} className="flex items-center gap-2.5">
          <motion.div
            className="rounded-full shrink-0"
            style={{ width: 7, height: 7 }}
            animate={{
              background:
                i === activeStage
                  ? "#00f0ff"
                  : i < activeStage
                  ? "#00ff9d"
                  : "#1e2436",
              boxShadow:
                i === activeStage
                  ? "0 0 10px #00f0ff"
                  : i < activeStage
                  ? "0 0 5px #00ff9d"
                  : "none",
              scale: i === activeStage ? 1.5 : 1,
            }}
            transition={{ duration: 0.3 }}
          />
          <AnimatePresence>
            {i === activeStage && (
              <motion.span
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.2 }}
                className="hidden sm:block text-[9px] font-mono text-cyan-400 whitespace-nowrap"
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

// ─── SCENE 0: INTRO ───────────────────────────────────────────────────────────
function IntroScene({ prog }: { prog: MotionValue<number> }) {
  // Direct useTransform — avoids the duplicate [0, 0, ...] input bug in useSceneOpacity
  // Starts at opacity 1 immediately, holds until 0.07, fades out by 0.12, clamped to 0 beyond.
  const opacity = useTransform(prog, [0, 0.07, 0.12], [1, 1, 0]);

  // Pre-computed orbit angles for SSR safety
  const ORBIT_ANGLES = [0, (Math.PI * 2) / 3, (Math.PI * 4) / 3];
  const R = 85;

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center px-6"
      style={{ opacity, background: "rgba(4,5,10,0.97)" }}
    >
      {/* Logo with orbital rings */}
      <div className="relative mb-10" style={{ width: 128, height: 128 }}>
        {/* Outer ring */}
        <motion.div
          className="absolute rounded-full border border-cyan-500/20"
          style={{ inset: -30 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        />
        {/* Inner ring */}
        <motion.div
          className="absolute rounded-full border border-violet-500/20"
          style={{ inset: -14 }}
          animate={{ rotate: -360 }}
          transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
        />

        {/* Core logo */}
        <motion.div
          className="w-32 h-32 rounded-2xl flex flex-col items-center justify-center relative z-10"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,240,255,0.15) 0%, rgba(138,43,226,0.12) 100%)",
            border: "2px solid rgba(0,240,255,0.6)",
          }}
          animate={{
            boxShadow: [
              "0 0 30px rgba(0,240,255,0.2), 0 0 80px rgba(0,240,255,0.05)",
              "0 0 60px rgba(0,240,255,0.5), 0 0 120px rgba(0,240,255,0.15)",
              "0 0 30px rgba(0,240,255,0.2), 0 0 80px rgba(0,240,255,0.05)",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <span className="text-4xl font-black font-mono text-gradient-cyan">CBC</span>
          <span className="text-[10px] font-mono text-slate-400 mt-0.5 tracking-widest">
            CHAIN
          </span>
        </motion.div>

        {/* Orbiting dots */}
        {ORBIT_ANGLES.map((baseAngle, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 10,
              height: 10,
              top: "50%",
              left: "50%",
              marginTop: -5,
              marginLeft: -5,
              background: "#00f0ff",
              boxShadow: "0 0 12px #00f0ff, 0 0 24px rgba(0,240,255,0.4)",
            }}
            animate={{
              x: [
                Math.cos(baseAngle) * R,
                Math.cos(baseAngle + Math.PI * 0.5) * R,
                Math.cos(baseAngle + Math.PI) * R,
                Math.cos(baseAngle + Math.PI * 1.5) * R,
                Math.cos(baseAngle + Math.PI * 2) * R,
              ],
              y: [
                Math.sin(baseAngle) * R,
                Math.sin(baseAngle + Math.PI * 0.5) * R,
                Math.sin(baseAngle + Math.PI) * R,
                Math.sin(baseAngle + Math.PI * 1.5) * R,
                Math.sin(baseAngle + Math.PI * 2) * R,
              ],
            }}
            transition={{
              duration: 5,
              delay: i * (5 / 3),
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <motion.h1
        className="text-5xl sm:text-7xl font-black text-white text-center mb-4 tracking-tight leading-tight"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        HOW{" "}
        <span className="text-gradient-cyan">CBC CHAIN</span>
        <br />
        WORKS
      </motion.h1>

      <p className="text-slate-400 text-base sm:text-lg text-center max-w-lg leading-relaxed">
        A 9-stage cinematic journey — from a user&apos;s cryptographic signature to an
        immutable block on the chain
      </p>

      <motion.div
        className="mt-10 flex items-center gap-3 text-cyan-400 font-mono text-sm"
        animate={{ y: [0, 8, 0], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span>↓</span>
        <span>SCROLL TO EXPLORE THE LIFECYCLE</span>
        <span>↓</span>
      </motion.div>
    </motion.div>
  );
}

// ─── SCENE 1: USER SIGNS TX ───────────────────────────────────────────────────
const WAVE_HEIGHTS = [10, 28, 8, 44, 14, 36, 6, 52, 20, 30, 10, 46, 16, 38, 12, 42];
const TX_SIGN_PROPS = [
  { k: "SIGNATURE ALGO", v: "ECDSA secp256k1", c: "#00f0ff" },
  { k: "TX FORMAT", v: "EIP-1559 Type 2", c: "#00ff9d" },
  { k: "BROADCAST PROTOCOL", v: "Gossipsub v1.1", c: "#8a2be2" },
  { k: "P2P PROPAGATION", v: "< 100ms network", c: "#ffb800" },
];

function TxSignScene({ prog }: { prog: MotionValue<number> }) {
  const opacity = useSceneOpacity(prog, 0.08, 0.11, 0.19, 0.22);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center px-8"
      style={{ opacity, background: "rgba(4,5,10,0.97)" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl w-full items-center">
        {/* Left: description */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs mb-5">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-cyan-400"
              animate={{ scale: [1, 1.6, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
            STAGE 01 — USER TRANSACTION
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
            USER SIGNS &amp;
            <br />
            <span className="text-gradient-cyan">BROADCASTS TX</span>
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            The user constructs a transaction payload specifying recipient, value, and gas
            parameters. It is then cryptographically signed using their private key (ECDSA
            secp256k1) and broadcast to the CBC P2P network via Gossipsub v1.1 — reaching
            thousands of nodes in under 100ms.
          </p>
          <div className="space-y-2">
            {TX_SIGN_PROPS.map((item, i) => (
              <motion.div
                key={item.k}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center justify-between p-2.5 rounded-lg border border-slate-800 bg-slate-900/60 font-mono text-xs"
              >
                <span className="text-slate-500">{item.k}</span>
                <span style={{ color: item.c }} className="font-bold">
                  {item.v}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: Wallet card */}
        <div>
          <motion.div
            className="p-6 rounded-2xl border relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(15,18,28,0.97) 0%, rgba(8,9,13,0.99) 100%)",
              borderColor: "rgba(0,240,255,0.4)",
              boxShadow:
                "0 0 70px rgba(0,240,255,0.10), 0 30px 80px rgba(0,0,0,0.7)",
            }}
          >
            <div className="scan-beam opacity-20" />

            {/* Wallet header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center">
                  <span className="text-[10px] font-black text-white">C</span>
                </div>
                <span className="text-xs font-mono text-slate-300 font-bold">
                  CBC WALLET
                </span>
              </div>
              <motion.div
                className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400"
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                CONNECTED
              </motion.div>
            </div>

            {/* From address */}
            <div className="mb-4 p-3 rounded-xl bg-slate-900 border border-slate-700/60">
              <div className="text-[9px] font-mono text-slate-500 mb-1">
                FROM ADDRESS
              </div>
              <div className="text-xs font-mono text-cyan-300 truncate">
                0x742d35Cc6634C0532...8b4F
              </div>
            </div>

            {/* TX details */}
            <div className="space-y-1.5 mb-5 px-1">
              {[
                { l: "TO", v: "0x3fD2...9aE1" },
                { l: "VALUE", v: "1.337 CBC" },
                { l: "GAS LIMIT", v: "21,000 units" },
                { l: "MAX BASE FEE", v: "25 Gwei" },
                { l: "PRIORITY FEE", v: "2 Gwei" },
                { l: "NONCE", v: "#142" },
              ].map((item) => (
                <div
                  key={item.l}
                  className="flex justify-between text-[11px] font-mono"
                >
                  <span className="text-slate-500">{item.l}</span>
                  <span className="text-slate-200">{item.v}</span>
                </div>
              ))}
            </div>

            {/* ECDSA Signature waveform */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 mb-4">
              <div className="text-[9px] font-mono text-slate-500 mb-2">
                ECDSA secp256k1 SIGNATURE
              </div>
              <div className="flex items-end gap-0.5 h-10">
                {WAVE_HEIGHTS.map((h, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-sm"
                    style={{
                      background: "linear-gradient(to top, #0891b2, #00f0ff)",
                    }}
                    animate={{
                      height: [`${h}px`, `${Math.min(h * 1.7, 40)}px`, `${h}px`],
                    }}
                    transition={{
                      duration: 0.65 + i * 0.04,
                      repeat: Infinity,
                      delay: i * 0.04,
                      ease: "easeInOut",
                    }}
                    initial={{ height: `${h}px` }}
                  />
                ))}
              </div>
            </div>

            {/* Sign & Broadcast button */}
            <motion.div
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-950 font-mono font-black text-xs text-center cursor-default"
              animate={{
                boxShadow: [
                  "0 0 15px rgba(0,240,255,0.3)",
                  "0 0 55px rgba(0,240,255,0.7)",
                  "0 0 15px rgba(0,240,255,0.3)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✓ SIGNED &amp; BROADCASTING TO P2P NETWORK
            </motion.div>

            <div className="mt-3 text-[9px] font-mono text-slate-600 truncate">
              TXHASH: 0x7f4e8a3b9c2d1f0e6a5b4c3d2e1f0a9b8c...
            </div>
          </motion.div>

          {/* Propagating TX pills */}
          <div className="relative mt-3 h-7 overflow-hidden">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute top-1.5 h-4 px-3 rounded-full border border-cyan-500/40 bg-cyan-500/10 text-[9px] font-mono text-cyan-400 flex items-center whitespace-nowrap"
                animate={{ x: [-80, 520], opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: 2.4,
                  delay: i * 0.6,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                TX#{142 + i} → P2P
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── SCENE 2: MEMPOOL ─────────────────────────────────────────────────────────
const MEMPOOL_TXS = [
  {
    hash: "0x7f4e8a3b...",
    gas: "52 Gwei",
    size: "112B",
    priority: "HIGH",
    color: "#00f0ff",
  },
  {
    hash: "0x3a2b1c9d...",
    gas: "48 Gwei",
    size: "89B",
    priority: "HIGH",
    color: "#00f0ff",
  },
  {
    hash: "0x9c1d5e8f...",
    gas: "35 Gwei",
    size: "200B",
    priority: "MED",
    color: "#00ff9d",
  },
  {
    hash: "0x5e8f2a4b...",
    gas: "28 Gwei",
    size: "95B",
    priority: "MED",
    color: "#00ff9d",
  },
  {
    hash: "0x1b4a7c3d...",
    gas: "14 Gwei",
    size: "156B",
    priority: "LOW",
    color: "#8a2be2",
  },
  {
    hash: "0x8d2f6e1a...",
    gas: "11 Gwei",
    size: "78B",
    priority: "LOW",
    color: "#8a2be2",
  },
];

function MempoolScene({ prog }: { prog: MotionValue<number> }) {
  const opacity = useSceneOpacity(prog, 0.20, 0.23, 0.31, 0.34);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center px-8"
      style={{ opacity, background: "rgba(4,5,10,0.97)" }}
    >
      <div className="max-w-4xl w-full">
        <div className="text-center mb-7">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs mb-4">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-emerald-400"
              animate={{ scale: [1, 1.6, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
            STAGE 02 — MEMPOOL
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-3">
            <span className="text-gradient-emerald">MEMPOOL</span>
          </h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto leading-relaxed">
            Lock-free priority queue — incoming transactions are validated for nonce
            correctness &amp; signature authenticity, then sorted by gas fee and held
            until a validator collects the batch
          </p>
        </div>

        {/* Stat pills */}
        <div className="grid grid-cols-4 gap-2 mb-5 font-mono text-center">
          {[
            { l: "PENDING", v: "1,847" },
            { l: "AVG GAS", v: "34 Gwei" },
            { l: "POOL SIZE", v: "28.4 MB" },
            { l: "QUEUED", v: "312" },
          ].map((m, i) => (
            <motion.div
              key={m.l}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: i * 0.08 }}
              className="p-3 rounded-xl border border-slate-800 bg-slate-900/60"
            >
              <div className="text-emerald-400 text-lg font-black">{m.v}</div>
              <div className="text-slate-500 text-[9px] mt-0.5">{m.l}</div>
            </motion.div>
          ))}
        </div>

        {/* Pool container */}
        <div
          className="relative rounded-2xl p-5 overflow-hidden"
          style={{
            background: "rgba(8,9,13,0.92)",
            border: "1px solid rgba(0,255,157,0.22)",
            boxShadow: "0 0 40px rgba(0,255,157,0.04) inset",
          }}
        >
          {/* Incoming packet stream on right */}
          <div className="absolute right-0 top-0 bottom-0 w-14 overflow-hidden pointer-events-none z-10">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute right-2 text-[9px] font-mono px-2 py-0.5 rounded-full border border-cyan-500/40 bg-cyan-500/10 text-cyan-400"
                animate={{ y: [-24, 210], opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: 2.6,
                  delay: i * 0.65,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{ top: `${i * 24 + 4}%` }}
              >
                TX
              </motion.div>
            ))}
          </div>

          {/* TX rows */}
          <div className="space-y-2 pr-14">
            {MEMPOOL_TXS.map((tx, i) => (
              <motion.div
                key={tx.hash}
                initial={{ x: 120, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: false }}
                transition={{ delay: i * 0.1, type: "spring", damping: 20 }}
                className="flex items-center gap-3 p-3 rounded-xl border"
                style={{
                  background: "rgba(15,18,28,0.85)",
                  borderColor: "rgba(30,36,54,0.9)",
                }}
              >
                <motion.div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{
                    background: tx.color,
                    boxShadow: `0 0 8px ${tx.color}`,
                  }}
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.25,
                  }}
                />
                <span className="font-mono text-xs text-slate-300 flex-1">
                  {tx.hash}
                </span>
                <span className="font-mono text-[11px] text-slate-500">
                  {tx.size}
                </span>
                <span
                  className="font-mono text-xs font-bold"
                  style={{ color: tx.color }}
                >
                  {tx.gas}
                </span>
                <span
                  className="font-mono text-[9px] px-2 py-0.5 rounded border shrink-0 font-bold"
                  style={{
                    color: tx.color,
                    borderColor: `${tx.color}50`,
                    background: `${tx.color}12`,
                  }}
                >
                  {tx.priority}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Gas priority legend */}
          <div className="absolute left-2 top-1/2 -translate-y-1/2 text-[8px] font-mono text-slate-700 flex flex-col items-center gap-0.5">
            <span>↑</span>
            <span style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
              GAS PRIORITY
            </span>
            <span>↓</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── SCENE 3: PoS VALIDATOR SELECTION ─────────────────────────────────────────
const VALIDATORS = [
  { stake: "310K", id: "V-05", angleDeg: 270, selected: true },
  { stake: "220K", id: "V-03", angleDeg: 330, selected: false },
  { stake: "180K", id: "V-01", angleDeg: 30, selected: false },
  { stake: "140K", id: "V-06", angleDeg: 90, selected: false },
  { stake: "95K", id: "V-02", angleDeg: 150, selected: false },
  { stake: "88K", id: "V-07", angleDeg: 210, selected: false },
];

function ValidatorScene({ prog }: { prog: MotionValue<number> }) {
  const opacity = useSceneOpacity(prog, 0.32, 0.35, 0.43, 0.46);
  const RING_R = 100;

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center px-8"
      style={{ opacity, background: "rgba(4,5,10,0.97)" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl w-full items-center">
        {/* Validator ring visualizer */}
        <div className="flex justify-center">
          <div className="relative" style={{ width: 290, height: 290 }}>
            {/* Animated rings */}
            <motion.div
              className="absolute inset-0 rounded-full border border-cyan-500/12"
              animate={{ rotate: 360 }}
              transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute rounded-full border border-violet-500/10"
              style={{ inset: 18 }}
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />

            {/* Dashed orbit path */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 290 290"
            >
              <circle
                cx="145"
                cy="145"
                r={RING_R}
                fill="none"
                stroke="rgba(0,240,255,0.08)"
                strokeWidth="1"
                strokeDasharray="6 6"
              />
              {/* Beams from non-selected to center */}
              {VALIDATORS.filter((v) => !v.selected).map((v, i) => {
                const rad = ((v.angleDeg - 90) * Math.PI) / 180;
                const nx = 145 + RING_R * Math.cos(rad);
                const ny = 145 + RING_R * Math.sin(rad);
                return (
                  <motion.line
                    key={v.id}
                    x1={nx}
                    y1={ny}
                    x2={145}
                    y2={145}
                    stroke="#00f0ff"
                    strokeWidth="0.7"
                    strokeLinecap="round"
                    animate={{ opacity: [0.08, 0.45, 0.08] }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: i * 0.35,
                    }}
                  />
                );
              })}
            </svg>

            {/* Center: elected leader */}
            <div
              className="absolute"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <motion.div
                className="w-20 h-20 rounded-2xl flex flex-col items-center justify-center font-mono border-2 border-cyan-400"
                style={{ background: "rgba(0,240,255,0.13)" }}
                animate={{
                  boxShadow: [
                    "0 0 18px rgba(0,240,255,0.3)",
                    "0 0 60px rgba(0,240,255,0.65)",
                    "0 0 18px rgba(0,240,255,0.3)",
                  ],
                  scale: [1, 1.03, 1],
                }}
                transition={{ duration: 2.2, repeat: Infinity }}
              >
                <span className="text-[9px] text-cyan-400/80 font-bold">
                  LEADER
                </span>
                <span className="text-white font-black text-sm">V-05</span>
                <span className="text-[9px] text-slate-400">310K</span>
              </motion.div>
            </div>

            {/* Validator nodes on the ring */}
            {VALIDATORS.map((v) => {
              const rad = ((v.angleDeg - 90) * Math.PI) / 180;
              const nx = 145 + RING_R * Math.cos(rad);
              const ny = 145 + RING_R * Math.sin(rad);

              return (
                <motion.div
                  key={v.id}
                  className="absolute font-mono flex flex-col items-center justify-center rounded-xl border"
                  style={{
                    width: 50,
                    height: 50,
                    left: nx - 25,
                    top: ny - 25,
                    background: v.selected
                      ? "rgba(0,240,255,0.16)"
                      : "rgba(15,18,28,0.97)",
                    borderColor: v.selected
                      ? "#00f0ff"
                      : "rgba(0,240,255,0.18)",
                    boxShadow: v.selected
                      ? "0 0 22px rgba(0,240,255,0.4)"
                      : "none",
                  }}
                  animate={v.selected ? { scale: [1, 1.08, 1] } : {}}
                  transition={{ duration: 2.2, repeat: Infinity }}
                >
                  <span
                    className={`text-[9px] font-bold ${
                      v.selected ? "text-cyan-400" : "text-slate-500"
                    }`}
                  >
                    {v.id}
                  </span>
                  <span
                    className={`text-[8px] ${
                      v.selected ? "text-white" : "text-slate-600"
                    }`}
                  >
                    {v.stake}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Info panel */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs mb-5">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-cyan-400"
              animate={{ scale: [1, 1.6, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
            STAGE 03 — PoS SELECTION
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
            PROOF-OF-STAKE
            <br />
            <span className="text-gradient-cyan">VALIDATOR</span>
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            The CBC consensus engine uses Proof-of-Stake scoring combined with a VRF
            (Verifiable Random Function) to elect a block leader. Validators with higher
            stake have proportionally higher selection probability, while VRF provides
            cryptographic fairness and prevents stake grinding attacks.
          </p>
          <div className="space-y-2 font-mono">
            {[
              { l: "ELECTED LEADER", v: "V-05 (310K staked)", c: "#00f0ff" },
              { l: "SELECTION METHOD", v: "VRF + Stake Weight", c: "#00ff9d" },
              { l: "BFT COMMITTEE SIZE", v: "7 validators", c: "#8a2be2" },
              { l: "EPOCH DURATION", v: "64 blocks", c: "#ffb800" },
              { l: "SLASHING CONDITIONS", v: "Double-sign / equivocation", c: "#ff6b6b" },
            ].map((item, i) => (
              <motion.div
                key={item.l}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center justify-between p-2.5 rounded-lg border border-slate-800 bg-slate-900/60 text-xs"
              >
                <span className="text-slate-500">{item.l}</span>
                <span style={{ color: item.c }} className="font-bold text-right">
                  {item.v}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── SCENE 4: PoI ANALYSIS ────────────────────────────────────────────────────
const POI_NODES = [
  { x: 50, y: 50, main: true, label: "SENDER" },
  { x: 20, y: 18, main: false, label: "0x4f2a" },
  { x: 78, y: 14, main: false, label: "0x8b3c" },
  { x: 12, y: 65, main: false, label: "0x1e9d" },
  { x: 87, y: 60, main: false, label: "0x7a5f" },
  { x: 36, y: 84, main: false, label: "0x3d2e" },
  { x: 72, y: 82, main: false, label: "0x6c1b" },
  { x: 28, y: 40, main: false, label: "0x9f4a" },
];
const POI_METRICS = [
  { label: "ON-CHAIN TX HISTORY", value: 94, color: "#00f0ff" },
  { label: "CONTRACT INTERACTIONS", value: 87, color: "#00ff9d" },
  { label: "STAKE CORRELATION", value: 91, color: "#8a2be2" },
  { label: "SYBIL RESISTANCE SCORE", value: 96, color: "#ffb800" },
];

function PoIScene({ prog }: { prog: MotionValue<number> }) {
  const opacity = useSceneOpacity(prog, 0.44, 0.47, 0.53, 0.56);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center px-8"
      style={{ opacity, background: "rgba(4,5,10,0.97)" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl w-full items-center">
        {/* Network graph */}
        <div className="flex justify-center">
          <div className="relative" style={{ width: 270, height: 270 }}>
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
              {/* Main connections */}
              {POI_NODES.slice(1).map((node, i) => (
                <motion.line
                  key={i}
                  x1={POI_NODES[0].x}
                  y1={POI_NODES[0].y}
                  x2={node.x}
                  y2={node.y}
                  stroke="#00f0ff"
                  strokeWidth="0.4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{
                    pathLength: 1,
                    opacity: [0, 0.6, 0.3],
                  }}
                  viewport={{ once: false }}
                  transition={{
                    delay: i * 0.13,
                    duration: 0.6,
                    repeat: Infinity,
                    repeatDelay: 3.5,
                  }}
                />
              ))}
              {/* Secondary cross-connections */}
              <motion.line
                x1="20"
                y1="18"
                x2="78"
                y2="14"
                stroke="#8a2be2"
                strokeWidth="0.3"
                animate={{ strokeOpacity: [0.1, 0.4, 0.1] }}
                transition={{ duration: 3.5, repeat: Infinity }}
              />
              <motion.line
                x1="36"
                y1="84"
                x2="72"
                y2="82"
                stroke="#8a2be2"
                strokeWidth="0.3"
                animate={{ strokeOpacity: [0.1, 0.4, 0.1] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 1.2 }}
              />
            </svg>

            {/* Network nodes */}
            {POI_NODES.map((node, i) => (
              <motion.div
                key={i}
                className="absolute flex items-center justify-center font-mono rounded-full"
                style={{
                  width: node.main ? 58 : 38,
                  height: node.main ? 58 : 38,
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  transform: "translate(-50%, -50%)",
                  background: node.main
                    ? "rgba(0,240,255,0.18)"
                    : "rgba(138,43,226,0.12)",
                  border: `${node.main ? 2 : 1}px solid ${
                    node.main ? "#00f0ff" : "rgba(138,43,226,0.4)"
                  }`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: false }}
                transition={{ delay: i * 0.08, type: "spring" }}
                animate={
                  node.main
                    ? {
                        boxShadow: [
                          "0 0 14px rgba(0,240,255,0.3)",
                          "0 0 35px rgba(0,240,255,0.6)",
                          "0 0 14px rgba(0,240,255,0.3)",
                        ],
                      }
                    : {}
                }
              >
                <span
                  className={`text-[8px] font-bold ${
                    node.main ? "text-cyan-400" : "text-slate-400"
                  }`}
                >
                  {node.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Metrics panel */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-400 font-mono text-xs mb-5">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-violet-400"
              animate={{ scale: [1, 1.6, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
            STAGE 04 — PoI ANALYSIS
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
            PROOF-OF
            <br />
            <span className="text-gradient-violet">INTERACTION</span>
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            PoI validates the sender&apos;s on-chain interaction history, scoring them based on
            legitimate network participation. It prevents sybil attacks and spam flooding by
            requiring a minimum interaction depth score before the transaction proceeds.
          </p>
          <div className="space-y-3.5 mb-5">
            {POI_METRICS.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: i * 0.12 }}
              >
                <div className="flex justify-between text-xs font-mono mb-1.5">
                  <span className="text-slate-400">{m.label}</span>
                  <span style={{ color: m.color }} className="font-bold">
                    {m.value}%
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-slate-800">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(to right, ${m.color}70, ${m.color})`,
                    }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${m.value}%` }}
                    viewport={{ once: false }}
                    transition={{
                      delay: i * 0.12 + 0.3,
                      duration: 1.2,
                      ease: "easeOut",
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div
            className="p-3 rounded-xl border font-mono text-xs flex items-center gap-2"
            style={{
              background: "rgba(0,255,157,0.07)",
              borderColor: "rgba(0,255,157,0.3)",
              color: "#00ff9d",
            }}
            animate={{
              borderColor: [
                "rgba(0,255,157,0.3)",
                "rgba(0,255,157,0.65)",
                "rgba(0,255,157,0.3)",
              ],
            }}
            transition={{ duration: 2.2, repeat: Infinity }}
          >
            <span className="text-base">✓</span>
            <span>POI SCORE: 92.0 — APPROVED FOR EXECUTION</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── SCENE 5: DCF ─────────────────────────────────────────────────────────────
const DCF_TX_HASHES = [
  "0x7f4e8a3b...",
  "0x3a2b1c9d...",
  "0x9c1d5e8f...",
  "0x5e8f2a4b...",
  "0x1b4a7c3d...",
  "0x8d2f6e1a...",
  "0x4c9e3b7f...",
  "0x2b7a5d3e...",
];
// Pre-compute angles to avoid Math calls in render that might differ
const DCF_ANGLES = DCF_TX_HASHES.map(
  (_, i) => (i / DCF_TX_HASHES.length) * Math.PI * 2
);

function DCFScene({ prog }: { prog: MotionValue<number> }) {
  const opacity = useSceneOpacity(prog, 0.54, 0.57, 0.62, 0.65);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center px-8"
      style={{ opacity, background: "rgba(4,5,10,0.97)" }}
    >
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs mb-4">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-amber-400"
              animate={{ scale: [1, 1.6, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
            STAGE 05 — DATA COMMITMENT
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-3">
            DATA COMMITMENT
            <br />
            <span className="text-gradient-fire">FUNCTION (DCF)</span>
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
            Validated transactions are imported into the DCF engine, which constructs a
            Patricia-Merkle tree and computes a single cryptographic root commitment — the
            irreducible fingerprint of the entire transaction set
          </p>
        </div>

        {/* Vortex convergence */}
        <div
          className="relative flex items-center justify-center"
          style={{ height: 210 }}
        >
          {/* Merkle root core */}
          <motion.div
            className="relative z-10 flex flex-col items-center justify-center font-mono rounded-full"
            style={{
              width: 120,
              height: 120,
              background: "rgba(255,184,0,0.07)",
              border: "2px solid #ffb800",
            }}
            animate={{
              boxShadow: [
                "0 0 20px rgba(255,184,0,0.3), 0 0 60px rgba(255,184,0,0.08)",
                "0 0 45px rgba(255,184,0,0.65), 0 0 100px rgba(255,184,0,0.18)",
                "0 0 20px rgba(255,184,0,0.3), 0 0 60px rgba(255,184,0,0.08)",
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <motion.div
              className="absolute rounded-full border border-amber-500/30"
              style={{ inset: 10 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute rounded-full border border-amber-500/20"
              style={{ inset: 22 }}
              animate={{ rotate: -360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />
            <span className="text-[10px] text-amber-400 z-10 font-bold">
              MERKLE
            </span>
            <span className="text-[10px] text-amber-300 z-10 font-bold">ROOT</span>
          </motion.div>

          {/* TX hashes flying inward */}
          {DCF_TX_HASHES.map((hash, i) => (
            <motion.div
              key={hash}
              className="absolute font-mono text-[9px] px-2 py-0.5 rounded border border-amber-500/25 whitespace-nowrap"
              style={{ background: "rgba(15,18,28,0.93)" , color: "rgba(255,184,0,0.8)" }}
              animate={{
                x: [
                  Math.cos(DCF_ANGLES[i]) * 165,
                  Math.cos(DCF_ANGLES[i]) * 12,
                ],
                y: [
                  Math.sin(DCF_ANGLES[i]) * 85,
                  Math.sin(DCF_ANGLES[i]) * 6,
                ],
                opacity: [0.9, 0.3, 0],
                scale: [0.9, 0.45, 0.1],
              }}
              transition={{
                duration: 2.6,
                delay: i * 0.32,
                repeat: Infinity,
                repeatDelay: 0.4,
                ease: "easeIn",
              }}
            >
              {hash}
            </motion.div>
          ))}
        </div>

        {/* Commitment outputs */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            {
              label: "TX MERKLE ROOT",
              value: "0x8f3a2d9e1c7b4f0a...b0d3",
              active: true,
            },
            {
              label: "STATE ROOT",
              value: "0x2c1e9f4a3b8d7c6e...1f5a",
              active: false,
            },
          ].map((item) => (
            <motion.div
              key={item.label}
              className="p-4 rounded-xl border text-center font-mono"
              style={{
                background: "rgba(15,18,28,0.97)",
                borderColor: item.active
                  ? "rgba(255,184,0,0.35)"
                  : "rgba(255,184,0,0.18)",
              }}
              animate={
                item.active
                  ? {
                      borderColor: [
                        "rgba(255,184,0,0.35)",
                        "rgba(255,184,0,0.7)",
                        "rgba(255,184,0,0.35)",
                      ],
                    }
                  : {}
              }
              transition={{ duration: 2.2, repeat: Infinity }}
            >
              <div className="text-[9px] text-slate-500 mb-1">{item.label}</div>
              <div
                className="text-[10px] break-all"
                style={{ color: item.active ? "#ffb800" : "rgba(255,184,0,0.5)" }}
              >
                {item.value}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── SCENE 6: DVF FINALIZATION ────────────────────────────────────────────────
const DVF_VALIDATORS = [
  { x: 50, y: 8, id: "V-01" },
  { x: 88, y: 30, id: "V-02" },
  { x: 88, y: 70, id: "V-03" },
  { x: 50, y: 91, id: "V-04" },
  { x: 12, y: 70, id: "V-05" },
  { x: 12, y: 30, id: "V-06" },
];

function DVFScene({ prog }: { prog: MotionValue<number> }) {
  const opacity = useSceneOpacity(prog, 0.63, 0.66, 0.71, 0.74);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center px-8"
      style={{ opacity, background: "rgba(4,5,10,0.97)" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl w-full items-center">
        {/* BLS Aggregate visualization */}
        <div className="flex justify-center">
          <div className="relative" style={{ width: 280, height: 280 }}>
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
              {/* BLS beams from validators to center */}
              {DVF_VALIDATORS.map((v, i) => (
                <motion.line
                  key={v.id}
                  x1={v.x}
                  y1={v.y}
                  x2={50}
                  y2={50}
                  stroke="#00ff9d"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{
                    pathLength: [0, 1, 1],
                    opacity: [0, 1, 0.2],
                  }}
                  viewport={{ once: false }}
                  transition={{
                    delay: i * 0.18,
                    duration: 1.1,
                    repeat: Infinity,
                    repeatDelay: 1.8,
                  }}
                />
              ))}

              {/* Consensus convergence circle */}
              <motion.circle
                cx="50"
                cy="50"
                r="9"
                fill="rgba(0,255,157,0.14)"
                stroke="#00ff9d"
                strokeWidth="1.2"
                animate={{ r: [8, 13, 8] }}
                transition={{ duration: 2.2, repeat: Infinity }}
              />
            </svg>

            {/* Validator chips */}
            {DVF_VALIDATORS.map((v, i) => (
              <motion.div
                key={v.id}
                className="absolute font-mono text-[9px] px-2 py-1.5 rounded-lg border border-emerald-500/40 text-emerald-400 flex items-center justify-center"
                style={{
                  left: `${v.x}%`,
                  top: `${v.y}%`,
                  transform: "translate(-50%, -50%)",
                  background: "rgba(0,255,157,0.06)",
                  minWidth: 40,
                }}
                animate={{ opacity: [0.55, 1, 0.55], scale: [1, 1.06, 1] }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              >
                {v.id}
              </motion.div>
            ))}

            {/* Center: BLS AGG consensus */}
            <div
              className="absolute"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <motion.div
                className="rounded-full border-2 border-emerald-400 flex flex-col items-center justify-center font-mono"
                style={{
                  width: 66,
                  height: 66,
                  background: "rgba(0,255,157,0.12)",
                }}
                animate={{
                  boxShadow: [
                    "0 0 18px rgba(0,255,157,0.3)",
                    "0 0 65px rgba(0,255,157,0.7)",
                    "0 0 18px rgba(0,255,157,0.3)",
                  ],
                }}
                transition={{ duration: 2.2, repeat: Infinity }}
              >
                <span className="text-[9px] text-emerald-400 font-bold">BLS</span>
                <span className="text-[9px] text-emerald-400 font-bold">AGG</span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Info panel */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs mb-5">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-emerald-400"
              animate={{ scale: [1, 1.6, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
            STAGE 06 — DVF FINALIZATION
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
            DISTRIBUTED
            <br />
            <span className="text-gradient-emerald">VALIDATION FINALITY</span>
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            The validator committee casts BLS aggregate signatures on the proposed block.
            Once the ⅔+ BFT threshold is achieved, the block achieves Distributed Validation
            Finality — permanently confirmed and mathematically irreversible on CBC Chain.
          </p>
          <div className="space-y-2 font-mono">
            {[
              { l: "VOTES CAST", v: "6 / 7", c: "#00ff9d" },
              { l: "THRESHOLD REQUIRED", v: "⅔+ BFT (5 of 7)", c: "#00f0ff" },
              { l: "SIGNATURE SCHEME", v: "BLS12-381", c: "#8a2be2" },
              { l: "AGGREGATION TIME", v: "< 200ms", c: "#ffb800" },
              { l: "FINALITY STATUS", v: "✓ IRREVERSIBLE", c: "#00ff9d" },
            ].map((item, i) => (
              <motion.div
                key={item.l}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ delay: i * 0.09 }}
                className="flex items-center justify-between p-2.5 rounded-lg border border-slate-800 bg-slate-900/60 text-xs"
              >
                <span className="text-slate-500">{item.l}</span>
                <span style={{ color: item.c }} className="font-bold">
                  {item.v}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── SCENE 7: BLOCK ASSEMBLY ──────────────────────────────────────────────────
const BLOCK_TXS = [
  "0x7f4e8a3b...",
  "0x3a2b1c9d...",
  "0x9c1d5e8f...",
  "0x5e8f2a4b...",
  "0x1b4a7c3d...",
  "0x8d2f6e1a...",
  "0x4c9e3b7f...",
  "0x2b7a5d3e...",
];

function BlockScene({ prog }: { prog: MotionValue<number> }) {
  const opacity = useSceneOpacity(prog, 0.72, 0.75, 0.82, 0.85);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center px-8"
      style={{ opacity, background: "rgba(4,5,10,0.97)" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 max-w-5xl w-full items-center">
        {/* 3D CSS Block cube */}
        <div className="flex flex-col items-center gap-6">
          <div style={{ perspective: "900px", perspectiveOrigin: "center" }}>
            <motion.div
              style={{
                width: 170,
                height: 170,
                transformStyle: "preserve-3d",
                position: "relative",
              }}
              animate={{
                rotateY: [22, -12, 22],
                rotateX: [-14, -20, -14],
              }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* FRONT face */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  transform: "translateZ(85px)",
                  background:
                    "linear-gradient(135deg, rgba(0,240,255,0.14) 0%, rgba(8,9,13,0.97) 100%)",
                  border: "2px solid #00f0ff",
                  borderRadius: 14,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 45px rgba(0,240,255,0.4)",
                  overflow: "hidden",
                }}
              >
                <div className="scan-beam opacity-25" />
                <span
                  className="font-mono text-[11px] text-cyan-400 font-bold z-10"
                >
                  BLOCK
                </span>
                <span className="font-mono text-[26px] text-white font-black z-10 leading-tight">
                  #1337
                </span>
                <span className="font-mono text-[9px] text-slate-400 z-10">
                  8 TRANSACTIONS
                </span>
              </div>
              {/* RIGHT face */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  transform: "rotateY(90deg) translateZ(85px)",
                  background:
                    "linear-gradient(to right, rgba(0,240,255,0.05), rgba(0,240,255,0.01))",
                  border: "1px solid rgba(0,240,255,0.18)",
                  borderRadius: 14,
                }}
              />
              {/* TOP face */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  transform: "rotateX(90deg) translateZ(85px)",
                  background:
                    "linear-gradient(to bottom, rgba(0,240,255,0.20), rgba(0,240,255,0.04))",
                  border: "1px solid rgba(0,240,255,0.28)",
                  borderRadius: 14,
                }}
              />
              {/* BOTTOM face */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  transform: "rotateX(-90deg) translateZ(85px)",
                  background: "rgba(5,6,10,0.7)",
                  border: "1px solid rgba(0,240,255,0.08)",
                  borderRadius: 14,
                }}
              />
              {/* LEFT face */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  transform: "rotateY(-90deg) translateZ(85px)",
                  background: "rgba(0,240,255,0.02)",
                  border: "1px solid rgba(0,240,255,0.14)",
                  borderRadius: 14,
                }}
              />
            </motion.div>
          </div>

          {/* Block header detail */}
          <div className="font-mono text-center space-y-1 p-3 rounded-xl border border-cyan-500/18 bg-slate-900/60 w-52">
            {[
              ["HEIGHT", "1,337"],
              ["TXS", "8"],
              ["TIMESTAMP", "11:39:52 UTC"],
              ["STATE ROOT", "0x8f3a...d7c0"],
              ["PREV HASH", "0x2b7a...e5f4"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between text-[9px]">
                <span className="text-slate-500">{k}:</span>
                <span className="text-slate-300">{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* TX list raining in */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs mb-5">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-cyan-400"
              animate={{ scale: [1, 1.6, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
            STAGE 07 — BLOCK ASSEMBLY
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
            BLOCK
            <br />
            <span className="text-gradient-cyan">CONSTRUCTION</span>
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-5">
            The validator leader assembles all DVF-finalized transactions into a block. The
            block header commits to: Merkle TX root, post-execution state root, previous
            block hash, timestamp, and the leader&apos;s BLS signature — cryptographically
            sealing the block.
          </p>

          <div className="space-y-2">
            {BLOCK_TXS.map((tx, i) => (
              <motion.div
                key={tx + i}
                className="flex items-center gap-2.5 p-2.5 rounded-lg border border-slate-800 font-mono text-[11px]"
                style={{ background: "rgba(15,18,28,0.85)" }}
                initial={{ x: 90, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: false }}
                transition={{ delay: i * 0.09, type: "spring", damping: 18 }}
              >
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0"
                  style={{ boxShadow: "0 0 6px #00f0ff" }}
                  animate={{ scale: [1, 1.45, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                />
                <span className="text-slate-400 flex-1">{tx}</span>
                <span className="text-[9px] text-slate-600">
                  {20 + i * 8}B
                </span>
                <motion.span
                  className="text-emerald-400 text-[10px] font-bold"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.15,
                  }}
                >
                  ✓
                </motion.span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── SCENE 8: THE CHAIN ───────────────────────────────────────────────────────
const MAIN_CHAIN = [
  {
    id: "#1,334",
    isNew: false,
    bg: "rgba(138,43,226,0.10)",
    border: "rgba(138,43,226,0.32)",
  },
  {
    id: "#1,335",
    isNew: false,
    bg: "rgba(0,240,255,0.07)",
    border: "rgba(0,240,255,0.22)",
  },
  {
    id: "#1,336",
    isNew: false,
    bg: "rgba(0,255,157,0.07)",
    border: "rgba(0,255,157,0.22)",
  },
  {
    id: "#1,337",
    isNew: true,
    bg: "rgba(0,240,255,0.16)",
    border: "#00f0ff",
  },
];

function ChainScene({ prog }: { prog: MotionValue<number> }) {
  const opacity = useSceneOpacity(prog, 0.83, 0.86, 0.97, 1.0, true);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center px-6"
      style={{ opacity, background: "rgba(4,5,10,0.97)" }}
    >
      <div className="max-w-5xl w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs mb-4">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-cyan-400"
              animate={{ scale: [1, 1.6, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
            STAGE 08 — CHAIN PROPAGATION
          </div>
          <h2 className="text-5xl sm:text-7xl font-black text-white mb-4 tracking-tight">
            THE{" "}
            <span className="text-gradient-cyan">CHAIN</span>
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
            The new block cryptographically links to the previous block via its hash —
            forming an immutable, append-only chain. Multiple chains propagate
            simultaneously across all nodes in the network.
          </p>
        </div>

        {/* Main chain row */}
        <div className="flex items-center justify-center overflow-x-auto pb-3">
          <div className="flex items-center">
            {MAIN_CHAIN.map((block, i) => (
              <div key={block.id} className="flex items-center">
                <motion.div
                  className="rounded-xl border-2 flex flex-col items-center justify-center font-mono text-center relative overflow-hidden shrink-0"
                  style={{
                    width: block.isNew ? 148 : 112,
                    height: block.isNew ? 104 : 82,
                    background: block.bg,
                    borderColor: block.border,
                  }}
                  initial={
                    block.isNew
                      ? { x: 200, opacity: 0, scale: 0.7 }
                      : { opacity: 0, y: 18 }
                  }
                  whileInView={
                    block.isNew
                      ? { x: 0, opacity: 1, scale: 1 }
                      : { opacity: 1, y: 0 }
                  }
                  viewport={{ once: false }}
                  transition={{
                    delay: block.isNew ? 0.55 : i * 0.14,
                    type: block.isNew ? "spring" : "tween",
                    damping: 18,
                    duration: 0.65,
                  }}
                  animate={
                    block.isNew
                      ? {
                          boxShadow: [
                            "0 0 20px rgba(0,240,255,0.25)",
                            "0 0 70px rgba(0,240,255,0.7)",
                            "0 0 20px rgba(0,240,255,0.25)",
                          ],
                        }
                      : {}
                  }
                >
                  {block.isNew && <div className="scan-beam opacity-25" />}
                  <div
                    className="text-xs font-bold"
                    style={{
                      color: block.isNew ? "#00f0ff" : "#64748b",
                    }}
                  >
                    {block.id}
                  </div>
                  <div className="text-[9px] text-slate-600 mt-0.5">
                    8 TXS
                  </div>
                  {block.isNew && (
                    <motion.div
                      className="text-[9px] font-bold mt-1 text-cyan-300"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      ✨ NEW
                    </motion.div>
                  )}
                </motion.div>

                {/* Hash link connector */}
                {i < MAIN_CHAIN.length - 1 && (
                  <div
                    className="relative flex items-center shrink-0"
                    style={{ width: 44 }}
                  >
                    <div
                      className="w-full h-0.5"
                      style={{
                        background:
                          "linear-gradient(to right, rgba(0,240,255,0.4), rgba(0,240,255,0.15))",
                      }}
                    />
                    <motion.div
                      className="absolute w-2.5 h-2.5 rounded-full"
                      style={{
                        background: "#00f0ff",
                        boxShadow: "0 0 10px #00f0ff",
                      }}
                      animate={{ x: [-18, 18] }}
                      transition={{
                        duration: 1.3,
                        repeat: Infinity,
                        ease: "linear",
                        delay: i * 0.45,
                      }}
                    />
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[7px] font-mono text-slate-600 whitespace-nowrap">
                      prev_hash
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Extending indicator */}
            <div className="flex items-center gap-1.5 ml-3">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="rounded-full bg-cyan-500/35"
                  style={{ width: 8, height: 8 }}
                  animate={{
                    opacity: [0.2, 1, 0.2],
                    scale: [0.8, 1.3, 0.8],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.35,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Ghost parallel chains */}
        {[
          {
            shift: 1,
            c: { border: "rgba(138,43,226,0.28)", bg: "rgba(138,43,226,0.04)", link: "rgba(138,43,226,0.14)" },
            start: 1328,
          },
          {
            shift: 2,
            c: { border: "rgba(0,255,157,0.18)", bg: "rgba(0,255,157,0.03)", link: "rgba(0,255,157,0.09)" },
            start: 1318,
          },
        ].map((chain) => (
          <motion.div
            key={chain.shift}
            className="flex items-center justify-center mt-3"
            initial={{ opacity: 0 }}
            whileInView={{
              opacity: chain.shift === 1 ? 0.32 : 0.16,
            }}
            viewport={{ once: false }}
            transition={{ delay: chain.shift * 0.2 }}
          >
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center">
                <div
                  className="rounded-lg border flex items-center justify-center font-mono text-[8px] text-slate-600 shrink-0"
                  style={{
                    width: 84,
                    height: 52,
                    borderColor: chain.c.border,
                    background: chain.c.bg,
                  }}
                >
                  #{chain.start + i}
                </div>
                {i < 4 && (
                  <div
                    className="shrink-0"
                    style={{
                      width: 24,
                      height: 2,
                      background: chain.c.link,
                    }}
                  />
                )}
              </div>
            ))}
            <div className="flex items-center gap-1 ml-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="rounded-full"
                  style={{
                    width: 5,
                    height: 5,
                    background: chain.c.border,
                  }}
                />
              ))}
            </div>
          </motion.div>
        ))}

        {/* Final status badges */}
        <motion.div
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.9 }}
        >
          {[
            { label: "IMMUTABLE", color: "#00f0ff" },
            { label: "DECENTRALIZED", color: "#8a2be2" },
            { label: "BFT FINALIZED", color: "#00ff9d" },
            { label: "850ms FINALITY", color: "#ffb800" },
          ].map((badge, i) => (
            <motion.div
              key={badge.label}
              className="flex items-center gap-2 px-4 py-2 rounded-full border font-mono text-xs font-bold"
              style={{
                color: badge.color,
                borderColor: `${badge.color}50`,
                background: `${badge.color}0e`,
              }}
              animate={{
                boxShadow: [
                  `0 0 0px ${badge.color}00`,
                  `0 0 22px ${badge.color}45`,
                  `0 0 0px ${badge.color}00`,
                ],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            >
              <motion.div
                className="rounded-full"
                style={{ width: 6, height: 6, background: badge.color }}
                animate={{ scale: [1, 1.6, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
              />
              {badge.label}
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <div className="text-center mt-7">
          <motion.a
            href="https://github.com/psbharathkumarachari/cbc-chain"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-950 font-mono font-black text-xs"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 50px rgba(0,240,255,0.55)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            VIEW CBC CHAIN SOURCE CODE
            <ExternalLink className="w-3.5 h-3.5" />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

// ─── MAIN EXPORT ──────────────────────────────────────────────────────────────
export function CBCChainVisualizer() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const [activeStage, setActiveStage] = useState(0);

  const progressBarWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.10) setActiveStage(0);
    else if (latest < 0.22) setActiveStage(1);
    else if (latest < 0.34) setActiveStage(2);
    else if (latest < 0.46) setActiveStage(3);
    else if (latest < 0.56) setActiveStage(4);
    else if (latest < 0.65) setActiveStage(5);
    else if (latest < 0.74) setActiveStage(6);
    else if (latest < 0.85) setActiveStage(7);
    else setActiveStage(8);
  });

  return (
    <section
      id="cbc-chain-visualizer"
      ref={sectionRef}
      className="relative border-t border-slate-800/80"
      style={{ height: "500vh" }}
    >
      {/* ─── STICKY VIEWPORT ─── */}
      <div className="sticky top-0 h-screen overflow-hidden bg-[#04050a]">
        {/* Tech grid background */}
        <div className="absolute inset-0 bg-tech-grid opacity-[0.04] pointer-events-none" />

        {/* Ambient glows */}
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 640,
            height: 640,
            top: "-15%",
            left: "-12%",
            background:
              "radial-gradient(circle, rgba(0,240,255,0.04) 0%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.18, 1], opacity: [0.15, 0.28, 0.15] }}
          transition={{ duration: 9, repeat: Infinity }}
        />
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 560,
            height: 560,
            bottom: "-12%",
            right: "-10%",
            background:
              "radial-gradient(circle, rgba(138,43,226,0.04) 0%, transparent 70%)",
          }}
          animate={{ scale: [1.18, 1, 1.18], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 11, repeat: Infinity, delay: 3 }}
        />

        {/* Floating particles */}
        <ParticleField />

        {/* ── TOP PROGRESS BAR ── */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-slate-800/50 z-30">
          <motion.div
            className="h-full"
            style={{
              width: progressBarWidth,
              background:
                "linear-gradient(to right, #00f0ff, #8a2be2, #00ff9d)",
            }}
          />
        </div>

        {/* ── TOP LABEL ── */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 z-20">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/50 backdrop-blur-sm">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-cyan-400"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-[10px] font-mono text-slate-400 tracking-wider">
              CBC CHAIN — TRANSACTION LIFECYCLE VISUALIZER
            </span>
          </div>
        </div>

        {/* ── STAGE LABEL (top right) ── */}
        <div className="absolute top-5 right-5 z-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
              className="font-mono text-[10px] text-right text-slate-500"
            >
              {STAGE_LABELS[activeStage]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── LEFT PROGRESS TIMELINE ── */}
        <ProgressTimeline activeStage={activeStage} />

        {/* ─── ALL 9 SCENES ─── */}
        <IntroScene prog={scrollYProgress} />
        <TxSignScene prog={scrollYProgress} />
        <MempoolScene prog={scrollYProgress} />
        <ValidatorScene prog={scrollYProgress} />
        <PoIScene prog={scrollYProgress} />
        <DCFScene prog={scrollYProgress} />
        <DVFScene prog={scrollYProgress} />
        <BlockScene prog={scrollYProgress} />
        <ChainScene prog={scrollYProgress} />
      </div>
    </section>
  );
}
