"use client";

import React from "react";
import { Endorsement } from "@/types";
import { ArrowUpRight } from "lucide-react";

interface EndorsementArchiveProps {
  endorsements: Endorsement[];
  onSelectEndorsement: (id: string) => void;
  onOpenDetail: (endorsement: Endorsement) => void;
}

export const EndorsementArchive: React.FC<EndorsementArchiveProps> = ({
  endorsements,
  onSelectEndorsement,
  onOpenDetail,
}) => {
  return (
    <div className="flex flex-col gap-4 pt-10 border-t border-white/10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[#00F0FF] uppercase">
            REGISTRY TABLE //
          </span>
          <span className="text-xs font-mono text-zinc-300 font-semibold">
            COMPLETE ENDORSEMENT ARCHIVE
          </span>
        </div>
        <span className="text-[11px] font-mono text-zinc-500">
          TOTAL: 0{endorsements.length} RECORDS
        </span>
      </div>

      {/* Structured Archival Table */}
      <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#08080c] shadow-lg">
        <table className="w-full text-left border-collapse text-xs font-mono min-w-[680px]">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02] text-zinc-400">
              <th className="py-3 px-4 font-semibold">SIGNAL</th>
              <th className="py-3 px-4 font-semibold">AUTHOR &amp; ROLE</th>
              <th className="py-3 px-4 font-semibold">ORGANIZATION</th>
              <th className="py-3 px-4 font-semibold">EXCERPT</th>
              <th className="py-3 px-4 font-semibold text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {endorsements.map((item) => (
              <tr
                key={item.id}
                onClick={() => onOpenDetail(item)}
                className="group transition-colors cursor-pointer hover:bg-white/[0.02] text-zinc-300"
              >
                {/* Signal */}
                <td className="py-3.5 px-4 font-semibold text-[#00F0FF] whitespace-nowrap">
                  SIGNAL {item.signalNumber}
                </td>

                {/* Author & Role */}
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <div className="font-sans font-medium text-white group-hover:text-[#00F0FF] transition-colors">
                    {item.author}
                  </div>
                  {item.role && <div className="text-[11px] text-zinc-400">{item.role}</div>}
                </td>

                {/* Organization */}
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <div className="text-zinc-200">{item.organization || "—"}</div>
                  <div className="text-[10px] text-zinc-500 uppercase">{item.category}</div>
                </td>

                {/* Excerpt */}
                <td className="py-3.5 px-4 text-zinc-400 font-sans text-xs max-w-xs truncate">
                  &ldquo;{item.quote}&rdquo;
                </td>

                {/* Action */}
                <td className="py-3.5 px-4 text-right whitespace-nowrap">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenDetail(item);
                    }}
                    className="inline-flex items-center gap-1 text-[#00F0FF] hover:underline font-mono text-xs cursor-pointer"
                  >
                    <span>VIEW</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
