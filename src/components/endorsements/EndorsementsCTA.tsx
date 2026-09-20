"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

export const EndorsementsCTA: React.FC = () => {
  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/#contact";
    }
  };

  return (
    <div className="mt-8 pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
      <div className="flex flex-col gap-1 max-w-xl">
        <h3 className="text-base font-medium text-white font-sans">
          Thinking about a project?
        </h3>
        <p className="text-sm text-zinc-400 font-light leading-relaxed">
          If you&apos;re building something ambitious, let&apos;s talk about the engineering behind it.
        </p>
      </div>

      <button
        onClick={scrollToContact}
        className="px-5 py-2.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.12] hover:border-white/[0.24] text-white text-xs font-mono tracking-wider transition-all duration-200 flex items-center gap-2 cursor-pointer group shrink-0"
      >
        <span>DISCUSS A PROJECT</span>
        <ArrowRight className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
      </button>
    </div>
  );
};
