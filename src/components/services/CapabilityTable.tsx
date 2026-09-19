"use client";

import React from "react";
import { CheckCircle2, Cpu } from "lucide-react";
import { CapabilityItem } from "@/data/services";

interface CapabilityTableProps {
  capabilities: CapabilityItem[];
}

export const CapabilityTable: React.FC<CapabilityTableProps> = ({ capabilities }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-[#00F0FF]" />
          <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-white">
            WHAT I CAN BUILD
          </h4>
        </div>
        <span className="text-[10px] font-mono text-zinc-500">
          CAPABILITIES & CLIENT VALUE
        </span>
      </div>

      <div className="overflow-hidden rounded-xl border border-white/10 bg-[#08080c] shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-[11px] font-mono text-zinc-400 uppercase">
                <th className="py-3 px-4 sm:px-6 font-semibold w-1/3">
                  CAPABILITY
                </th>
                <th className="py-3 px-4 sm:px-6 font-semibold w-2/3">
                  WHAT IT MEANS FOR YOU
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs">
              {capabilities.map((item, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-white/[0.02] transition-colors group"
                >
                  <td className="py-3.5 px-4 sm:px-6 font-medium text-zinc-100 flex items-center gap-2.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00FF66] shrink-0" />
                    <span className="group-hover:text-[#00F0FF] transition-colors">
                      {item.capability}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 text-zinc-300 font-light leading-relaxed">
                    {item.whatItMeans}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
