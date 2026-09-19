"use client";

import React from "react";
import { FolderGit2, ArrowUpRight, Github } from "lucide-react";
import { EngineeringProof } from "@/data/services";

interface ProofOfWorkProps {
  proofList: EngineeringProof[];
}

export const ProofOfWork: React.FC<ProofOfWorkProps> = ({ proofList }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <FolderGit2 className="w-4 h-4 text-[#00F0FF]" />
          <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-white">
            SELECTED ENGINEERING WORK
          </h4>
        </div>
        <span className="text-[10px] font-mono text-zinc-500">
          PROVEN CODE & CASE STUDIES
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {proofList.map((item) => (
          <div
            key={item.id}
            className="group flex flex-col justify-between p-5 rounded-2xl bg-[#08080c] border border-white/10 hover:border-[#00F0FF]/50 transition-all duration-300 shadow-xl"
          >
            <div className="flex flex-col gap-4">
              {/* Header: Name & Link */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col gap-1.5">
                  <h5 className="text-base font-bold text-white group-hover:text-[#00F0FF] transition-colors">
                    {item.name}
                  </h5>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 text-[9px] font-mono text-zinc-300 font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {item.githubUrl && (
                  <a
                    href={item.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/[0.03] border border-white/10 hover:border-[#00F0FF]/50 text-zinc-400 hover:text-[#00F0FF] transition-colors shrink-0"
                    title="View Source Code"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
              </div>

              {/* Problem & Built Breakdown */}
              <div className="flex flex-col gap-2.5 text-xs">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-1">
                  <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider">
                    PROBLEM CONSTRAINTS:
                  </span>
                  <p className="text-zinc-300 font-light leading-relaxed">
                    {item.problem}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-1">
                  <span className="text-[10px] font-mono font-bold text-[#00F0FF] uppercase tracking-wider">
                    BUILT & DELIVERED:
                  </span>
                  <p className="text-zinc-200 font-light leading-relaxed">
                    {item.built}
                  </p>
                </div>
              </div>

              {/* Engineering Pipeline */}
              <div className="flex items-center gap-1.5 overflow-x-auto py-1 text-[10px] font-mono text-zinc-400 scrollbar-none">
                <span className="text-zinc-600 font-semibold">FLOW:</span>
                {item.engineering.map((step, idx) => (
                  <React.Fragment key={step}>
                    <span className="px-2 py-0.5 rounded bg-white/[0.02] border border-white/5 text-zinc-300 whitespace-nowrap">
                      {step}
                    </span>
                    {idx < item.engineering.length - 1 && (
                      <span className="text-zinc-600">→</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Bottom Link */}
            {item.githubUrl && (
              <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-500 text-[11px]">VERIFIED REPOSITORY</span>
                <a
                  href={item.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[#00F0FF] hover:underline font-semibold"
                >
                  <span>VIEW CODE</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
