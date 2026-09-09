"use client";

import React from "react";
import { heroData } from "@/data/hero";
import { ArrowRight, Github, Linkedin, Mail, Send } from "lucide-react";

export const ServicesCTA: React.FC = () => {
  return (
    <div
      id="services-contact"
      className="relative flex flex-col items-center text-center gap-8 py-16 px-6 sm:px-12 rounded-2xl bg-gradient-to-b from-white/[0.04] via-[#08080c] to-[#050505] border border-white/10 shadow-2xl overflow-hidden mt-12"
    >
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-[#00F0FF]/15 blur-[90px] pointer-events-none rounded-full" />

      {/* Eyebrow */}
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-pulse" />
        <span className="text-xs font-mono tracking-widest text-[#00F0FF] uppercase">
          COMMENCE ENGINEERING
        </span>
      </div>

      {/* Headline & Description */}
      <div className="flex flex-col gap-3 max-w-2xl">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white font-sans">
          HAVE A SYSTEM IN MIND?
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 font-light leading-relaxed">
          Tell me what you&apos;re building, what you&apos;re trying to improve, or what technical protocol problem you&apos;re trying to solve.
        </p>
      </div>

      {/* Main Action Triggers */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <a
          href={`mailto:${heroData.socials.email}?subject=Technical%20Engineering%20Inquiry`}
          className="group flex items-center gap-2 px-7 py-4 rounded-lg bg-[#00F0FF] text-black font-semibold text-xs tracking-wider uppercase hover:bg-cyan-300 transition-all shadow-[0_0_25px_rgba(0,240,255,0.3)] hover:shadow-[0_0_35px_rgba(0,240,255,0.5)]"
        >
          <Send className="w-4 h-4" />
          <span>START A CONVERSATION</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </a>

        <a
          href={heroData.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-4 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white font-mono text-xs tracking-wider uppercase border border-white/10 hover:border-white/20 transition-all"
        >
          <Github className="w-4 h-4 text-[#00F0FF]" />
          <span>GITHUB REPOS</span>
        </a>

        <a
          href={heroData.socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-4 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white font-mono text-xs tracking-wider uppercase border border-white/10 hover:border-white/20 transition-all"
        >
          <Linkedin className="w-4 h-4 text-[#00F0FF]" />
          <span>LINKEDIN</span>
        </a>
      </div>

      {/* Direct Email Subtext */}
      <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
        <Mail className="w-3.5 h-3.5" />
        <span>DIRECT INBOX:</span>
        <a
          href={`mailto:${heroData.socials.email}`}
          className="text-zinc-300 hover:text-[#00F0FF] underline transition-colors"
        >
          {heroData.socials.email}
        </a>
      </div>
    </div>
  );
};
