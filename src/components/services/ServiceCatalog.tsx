"use client";

import React from "react";
import { servicesData } from "@/data/services";
import { ServiceCard } from "./ServiceCard";
import { CheckCircle2, ArrowRight } from "lucide-react";

interface ServiceCatalogProps {
  onExploreService: (serviceId: string) => void;
  onStartProject: (serviceId: string) => void;
  onSwitchToCurriculum: () => void;
}

export const ServiceCatalog: React.FC<ServiceCatalogProps> = ({
  onExploreService,
  onStartProject,
  onSwitchToCurriculum,
}) => {
  return (
    <div className="flex flex-col gap-10">
      {/* 6 Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {servicesData.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onExplore={onExploreService}
            onStartProject={onStartProject}
          />
        ))}
      </div>

      {/* Cross-Link Banner to Curricula */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-[#08080c] via-[#0e0e17] to-[#08080c] border border-white/10 shadow-xl">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#00FF66]/10 border border-[#00FF66]/30 text-[#00FF66] shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-mono font-bold text-white tracking-wide">
              LOOKING FOR 1-ON-1 SYSTEMS & PROTOCOL ENGINEERING CURRICULA?
            </span>
            <span className="text-xs text-zinc-400 font-light">
              Explore 7 comprehensive engineering programs covering Solidity, Rust, Substrate, Go, Operating Systems, and libp2p.
            </span>
          </div>
        </div>

        <button
          onClick={onSwitchToCurriculum}
          className="self-start sm:self-center flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-[#00FF66]/15 border border-white/10 hover:border-[#00FF66]/40 text-xs font-mono text-zinc-300 hover:text-[#00FF66] transition-all whitespace-nowrap"
        >
          <span>VIEW CURRICULA DIRECTORY</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
