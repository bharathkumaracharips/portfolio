"use client";

import React from "react";
import { Certification } from "@/data/certifications";
import { ArrowUpRight, ExternalLink, ShieldCheck } from "lucide-react";
import { IssuerLogo } from "./CertificateLogos";

interface CertificationArchiveListProps {
  items: Certification[];
  selectedId: string | null;
  onSelect: (cert: Certification) => void;
  onOpenDocumentViewer: (cert: Certification) => void;
}

export const CertificationArchiveList: React.FC<CertificationArchiveListProps> = ({
  items,
  selectedId,
  onSelect,
  onOpenDocumentViewer,
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
            COMPLETE ATTESTATIONS ARCHIVE
          </span>
        </div>
        <span className="text-[11px] font-mono text-zinc-500">
          TOTAL: {items.length} RECORDS
        </span>
      </div>

      {/* Structured Archival Table */}
      <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#08080c] shadow-lg">
        <table className="w-full text-left border-collapse text-xs font-mono">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02] text-zinc-400">
              <th className="py-3 px-4 font-semibold">CODE</th>
              <th className="py-3 px-4 font-semibold">CREDENTIAL TITLE</th>
              <th className="py-3 px-4 font-semibold">ISSUER</th>
              <th className="py-3 px-4 font-semibold">DATE</th>
              <th className="py-3 px-4 font-semibold">CATEGORY</th>
              <th className="py-3 px-4 font-semibold text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {items.map((cert) => {
              const isSelected = cert.id === selectedId;
              return (
                <tr
                  key={cert.id}
                  onClick={() => onSelect(cert)}
                  className={`group transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-[#00F0FF]/10 text-white"
                      : "hover:bg-white/[0.02] text-zinc-300"
                  }`}
                >
                  <td className="py-3.5 px-4 font-bold text-[#00F0FF] whitespace-nowrap">
                    {cert.code}
                  </td>
                  <td className="py-3.5 px-4 font-sans font-semibold text-zinc-100 whitespace-nowrap">
                    {cert.name}
                  </td>
                  <td className="py-3.5 px-4 text-zinc-400 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <IssuerLogo issuer={cert.issuer} className="w-5 h-5 shrink-0" />
                      <span>{cert.issuer}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-zinc-300 whitespace-nowrap">
                    {cert.issueDateFull || cert.date}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/5 text-[10px] text-zinc-400">
                      {cert.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenDocumentViewer(cert);
                        }}
                        className="text-xs text-zinc-400 hover:text-[#00FF66] flex items-center gap-1 transition-colors"
                        title="View Certificate Document"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-[#00FF66]" />
                        <span>VIEW</span>
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelect(cert);
                        }}
                        className="text-xs text-[#00F0FF] hover:underline flex items-center gap-1 font-semibold"
                        title="Inspect Full Credential Details"
                      >
                        <span>INSPECT</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>

                      {cert.verificationUrl && (
                        <a
                          href={cert.verificationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-xs text-zinc-400 hover:text-white flex items-center gap-1"
                        >
                          <span>VERIFY</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
