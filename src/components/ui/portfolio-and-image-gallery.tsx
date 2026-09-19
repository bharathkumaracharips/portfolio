"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { Certification } from "@/data/certifications";
import { ArrowUpRight, Award, CheckCircle2, ChevronLeft, ChevronRight, ShieldCheck, ExternalLink } from "lucide-react";
import { IssuerLogo, SkillBadge } from "@/components/certifications/CertificateLogos";

export interface RadialGalleryProps {
  items: Certification[];
  selectedId: string | null;
  onSelect: (cert: Certification) => void;
  className?: string;
}

export const RadialScrollGallery: React.FC<RadialGalleryProps> = ({
  items,
  selectedId,
  onSelect,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [touchStartX, setTouchStartX] = useState<number>(0);

  const totalItems = items.length;

  const rotateToIndex = useCallback(
    (idx: number) => {
      const normalizedIdx = (idx + totalItems) % totalItems;
      setCurrentIndex(normalizedIdx);
    },
    [totalItems]
  );

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  }, [totalItems]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
  }, [totalItems]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isHovered) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onSelect(items[currentIndex]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, isHovered, items, onSelect, handleNext, handlePrev]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
      onTouchEnd={(e) => {
        const deltaX = e.changedTouches[0].clientX - touchStartX;
        if (deltaX > 40) handlePrev();
        else if (deltaX < -40) handleNext();
      }}
      tabIndex={0}
      role="region"
      aria-label="Certifications Carousel"
      className={`relative w-full h-[450px] sm:h-[490px] flex items-center justify-center overflow-hidden select-none outline-none focus:ring-1 focus:ring-[#00F0FF]/30 rounded-2xl bg-gradient-to-b from-[#050505] via-[#08080c] to-[#050505] border border-white/5 ${className}`}
      style={{ perspective: "1200px" }}
    >
      {/* Subtle Background Markings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] sm:w-[800px] h-[300px] rounded-full border border-white/[0.03] -rotate-6" />
        <div className="w-[450px] sm:w-[650px] h-[220px] rounded-full border border-[#00F0FF]/5 rotate-6" />
      </div>

      {/* Top Subtle Stage Indicator */}
      <div className="absolute top-3 left-4 z-20 flex items-center gap-2 pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
        <span className="text-[10px] font-mono tracking-widest text-[#00F0FF]/80 uppercase">
          ORBITAL ARCHIVE // {currentIndex + 1} OF {totalItems}
        </span>
      </div>

      {/* Cards Stage (3D Orbital Arc with dedicated bottom gap for navigation) */}
      <div className="relative w-full h-full flex items-center justify-center pb-12 sm:pb-14">
        {items.map((cert, idx) => {
          // Calculate offset relative to current active index
          let offset = idx - currentIndex;
          if (offset > totalItems / 2) offset -= totalItems;
          if (offset < -totalItems / 2) offset += totalItems;

          const isActive = offset === 0;
          const isImmediateNeighbor = Math.abs(offset) === 1;

          // 3D Orbital Transform parameters
          const translateX = offset * (typeof window !== "undefined" && window.innerWidth < 640 ? 180 : 275);
          const translateZ = -Math.abs(offset) * 120;
          const rotateY = offset * -18;
          const scale = isActive ? 1.04 : 0.88;
          const opacity = isActive ? 1 : isImmediateNeighbor ? 0.6 : 0.2;
          const zIndex = 20 - Math.abs(offset);

          return (
            <div
              key={cert.id}
              onClick={() => {
                if (isActive) {
                  onSelect(cert);
                } else {
                  rotateToIndex(idx);
                }
              }}
              style={{
                transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                zIndex,
                opacity,
                transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              className={`absolute w-[245px] sm:w-[280px] h-[335px] sm:h-[365px] p-4 sm:p-5 rounded-2xl border text-left flex flex-col justify-between cursor-pointer ${
                isActive
                  ? "bg-[#0c0d14] border-[#00F0FF] shadow-[0_0_40px_rgba(0,240,255,0.25)] ring-1 ring-[#00F0FF]/40"
                  : "bg-[#08080c] border-white/10 hover:border-white/30 hover:opacity-80"
              }`}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isActive ? "bg-[#00FF66] shadow-[0_0_8px_#00FF66]" : "bg-zinc-600"
                    }`}
                  />
                  <span className="text-xs font-mono font-bold tracking-wider text-zinc-200">
                    {cert.code}
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-[#00FF66] border border-white/5 font-semibold">
                  {cert.date}
                </span>
              </div>

              {/* Certificate Document Thumbnail Chamber */}
              <div className="relative flex-1 flex flex-col justify-between my-2 p-3.5 rounded-xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 overflow-hidden">
                {/* Top-Right Company Logo */}
                <div className="absolute top-2.5 right-2.5 z-10">
                  <IssuerLogo issuer={cert.issuer} className="w-7 h-7" />
                </div>

                <div className="pr-8">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mb-0.5 font-bold block">
                    {cert.category}
                  </span>
                  <h4
                    className={`text-sm sm:text-base font-bold leading-snug tracking-tight transition-colors line-clamp-2 ${
                      isActive ? "text-white" : "text-zinc-300"
                    }`}
                  >
                    {cert.name}
                  </h4>
                  <span className="text-xs font-mono text-zinc-400 mt-1 font-light block truncate">
                    {cert.issuer}
                  </span>
                </div>

                {/* Skill Logos below issuer */}
                <div className="pt-2 mt-1.5 border-t border-white/5 flex flex-wrap items-center gap-1">
                  {cert.skills.slice(0, 3).map((skill, sIdx) => (
                    <SkillBadge key={sIdx} skill={skill} />
                  ))}
                  {cert.skills.length > 3 && (
                    <span className="text-[9px] font-mono text-zinc-500 px-1.5 py-0.5 rounded bg-white/[0.02] border border-white/5">
                      +{cert.skills.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Metadata & Action */}
              <div className="flex items-center justify-between pt-2.5 border-t border-white/5 text-[11px] font-mono">
                <span className="text-zinc-500 truncate max-w-[140px]">
                  ID: {cert.credentialId}
                </span>
                <span
                  className={`flex items-center gap-1 font-semibold transition-all ${
                    isActive
                      ? "text-[#00F0FF] translate-x-0"
                      : "text-zinc-500"
                  }`}
                >
                  <span>{isActive ? "INSPECT" : "SELECT"}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Arrow Controls */}
      <div className="absolute bottom-4 left-4 right-4 z-30 flex items-center justify-between pointer-events-none">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          className="pointer-events-auto flex items-center gap-1.5 px-3 py-2 rounded-lg bg-black/70 border border-white/10 text-zinc-300 hover:text-white hover:border-[#00F0FF]/40 backdrop-blur-md transition-all cursor-pointer shadow-lg"
          aria-label="Previous Certification"
        >
          <ChevronLeft className="w-4 h-4 text-[#00F0FF]" />
          <span className="text-[11px] font-mono hidden sm:inline">PREV</span>
        </button>

        {/* Carousel Pagination Dots */}
        <div className="pointer-events-auto flex items-center gap-2 bg-black/70 px-3.5 py-2 rounded-full border border-white/10 backdrop-blur-md">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                i === currentIndex
                  ? "w-6 bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]"
                  : "w-1.5 bg-zinc-600 hover:bg-zinc-400"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="pointer-events-auto flex items-center gap-1.5 px-3 py-2 rounded-lg bg-black/70 border border-white/10 text-zinc-300 hover:text-white hover:border-[#00F0FF]/40 backdrop-blur-md transition-all cursor-pointer shadow-lg"
          aria-label="Next Certification"
        >
          <span className="text-[11px] font-mono hidden sm:inline">NEXT</span>
          <ChevronRight className="w-4 h-4 text-[#00F0FF]" />
        </button>
      </div>
    </div>
  );
};
