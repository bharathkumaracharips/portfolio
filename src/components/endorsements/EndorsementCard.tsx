"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Endorsement } from "@/types";
import { ArrowUpRight } from "lucide-react";

interface EndorsementCardProps {
  endorsement: Endorsement;
  index: number;
}

export const EndorsementCard: React.FC<EndorsementCardProps> = ({
  endorsement,
  index,
}) => {
  const { person, category, year, workedTogetherOn, role, quote, confidential } =
    endorsement;

  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Subtle interactive cursor-following spotlight coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for tilt/parallax
  const rotateX = useSpring(useTransform(mouseY, [-150, 150], [2.5, -2.5]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-150, 150], [-2.5, 2.5]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const categoryLabel =
    category === "CLIENT"
      ? "CLIENT WORK"
      : category === "ENGINEERING"
      ? "ENGINEERING"
      : "MENTORSHIP";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.12,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      style={{
        perspective: 1000,
      }}
    >
      <motion.article
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="group relative flex flex-col justify-between rounded-xl bg-[#0c0c10] border border-white/[0.08] hover:border-cyan-500/30 transition-colors duration-300 p-5 sm:p-6 overflow-hidden"
        aria-label={`Review from ${person.role} at ${person.organization || "confidential partner"}`}
      >
        {/* Subtle dynamic interactive spotlight highlight */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(420px circle at ${
              mouseX.get() + 250
            }px ${mouseY.get() + 150}px, rgba(0, 240, 255, 0.06), transparent 80%)`,
          }}
        />

        <div className="relative z-10 flex flex-col gap-4">
          {/* Top Row: Category Pill & Year */}
          <div className="flex items-center justify-between text-xs font-mono tracking-wider border-b border-white/[0.06] pb-3">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 group-hover:shadow-[0_0_8px_rgba(0,240,255,0.8)] transition-shadow" />
              <span className="text-zinc-300 text-[11px] uppercase font-medium">
                {categoryLabel}
              </span>
            </div>
            <span className="text-zinc-500 font-mono text-[11px]">{year}</span>
          </div>

          {/* Identity Block */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] group-hover:border-cyan-500/20 flex items-center justify-center text-[11px] font-mono text-zinc-300 shrink-0 transition-colors">
                {person.avatarInitials || person.role.slice(0, 2).toUpperCase()}
              </div>
              <div className="flex flex-col">
                {person.name && (
                  <span className="text-xs font-semibold text-white tracking-tight">
                    {person.name}
                  </span>
                )}
                <span className="text-xs font-medium text-zinc-200">
                  {person.role}
                </span>
                {person.organization && (
                  <span className="text-[11px] text-zinc-400">
                    {person.organization}
                  </span>
                )}
              </div>
            </div>

            {person.linkedinUrl && (
              <a
                href={person.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-mono text-zinc-400 hover:text-cyan-400 transition-colors shrink-0"
                aria-label="View LinkedIn reference"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            )}
          </div>

          {/* Scope & Role: Sleek inline tag row */}
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/[0.02] border border-white/[0.05] text-zinc-300">
              <span className="text-zinc-500 uppercase text-[9px] tracking-wider">PROJECT</span>
              <span className="font-sans text-zinc-200 truncate max-w-[200px] sm:max-w-[260px]">{workedTogetherOn}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/[0.02] border border-white/[0.05] text-zinc-300">
              <span className="text-zinc-500 uppercase text-[9px] tracking-wider">ROLE</span>
              <span className="font-sans text-zinc-200 truncate max-w-[180px]">{role}</span>
            </div>
          </div>

          {/* Quote: Crisp, legible, perfectly proportioned */}
          <blockquote className="pt-1">
            <p className="text-[14px] sm:text-[15px] text-zinc-200 font-light leading-relaxed font-sans">
              &ldquo;{quote}&rdquo;
            </p>
          </blockquote>
        </div>

        {/* Footer */}
        <div className="relative z-10 mt-5 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-zinc-500">
          <span>
            {confidential ? "Confidential engagement" : `${year} · Technical Collaboration`}
          </span>
          <span className="text-zinc-600">
            0{index + 1}
          </span>
        </div>
      </motion.article>
    </motion.div>
  );
};
