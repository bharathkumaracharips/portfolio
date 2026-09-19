"use client";

import React from "react";
import { Package, Check } from "lucide-react";
import { DeliverableItem } from "@/data/services";

interface DeliverablesGridProps {
  deliverables: DeliverableItem[];
}

export const DeliverablesGrid: React.FC<DeliverablesGridProps> = ({ deliverables }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Package className="w-4 h-4 text-[#00FF66]" />
          <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-white">
            WHAT YOU RECEIVE
          </h4>
        </div>
        <span className="text-[10px] font-mono text-zinc-500">
          CONCRETE PROJECT DELIVERABLES
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {deliverables.map((item) => (
          <div
            key={item.number}
            className="group relative flex flex-col justify-between p-4 rounded-xl bg-[#08080c] border border-white/10 hover:border-[#00FF66]/40 hover:bg-white/[0.02] transition-all duration-200 shadow-md"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#00FF66] px-2 py-0.5 rounded bg-[#00FF66]/10 border border-[#00FF66]/30">
                  {item.number}
                </span>
                <Check className="w-3.5 h-3.5 text-zinc-600 group-hover:text-[#00FF66] transition-colors" />
              </div>

              <h5 className="text-xs font-bold text-white tracking-tight group-hover:text-[#00FF66] transition-colors pt-1">
                {item.title}
              </h5>

              <p className="text-[11px] text-zinc-400 font-light leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
