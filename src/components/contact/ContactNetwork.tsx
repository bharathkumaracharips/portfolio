"use client";

import React from "react";
import { heroData } from "@/data/hero";
import {
  Mail,
  Github,
  Linkedin,
  ArrowUpRight,
  GraduationCap,
  Briefcase,
  Zap,
} from "lucide-react";

export const ContactNetwork: React.FC = () => {
  const channels = [
    {
      title: "Direct Email",
      handle: heroData.socials.email,
      href: `mailto:${heroData.socials.email}`,
      tag: "PRIMARY ENDPOINT",
      icon: <Mail className="w-4 h-4 text-[#00F0FF]" />,
    },
    {
      title: "GitHub Profile",
      handle: "@psbharathkumarachari",
      href: heroData.socials.github,
      tag: "CODE PROTOCOL",
      icon: <Github className="w-4 h-4 text-[#00F0FF]" />,
    },
    {
      title: "LinkedIn Network",
      handle: "psbharathkumarachari",
      href: heroData.socials.linkedin,
      tag: "PROFESSIONAL LINK",
      icon: <Linkedin className="w-4 h-4 text-[#00F0FF]" />,
    },
    {
      title: "Upwork",
      handle: "Verified Protocol Freelancer",
      href: heroData.socials.upwork,
      tag: "FREELANCE CONTRACT",
      icon: <Briefcase className="w-4 h-4 text-[#00FF66]" />,
    },
    {
      title: "TeacherOn",
      handle: "Blockchain Engineering Tutor",
      href: heroData.socials.teacheron,
      tag: "TEACHING & MENTORSHIP",
      icon: <GraduationCap className="w-4 h-4 text-[#00F0FF]" />,
    },
    {
      title: "Fiverr",
      handle: "Blockchain & Web3 Gigs",
      href: heroData.socials.fiverr,
      tag: "DEV SERVICES",
      icon: <Zap className="w-4 h-4 text-[#00FF66]" />,
    },
  ];

  return (
    <div className="flex flex-col gap-4 pt-6 border-t border-white/10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[#00F0FF] uppercase">
            NETWORK TOPOLOGY //
          </span>
          <span className="text-xs font-mono text-zinc-300 font-semibold">
            COMMUNICATION &amp; PLATFORM ENDPOINTS
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-pulse" />
          <span className="text-zinc-400">SYSTEM STATUS:</span>
          <span className="text-[#00FF66] font-semibold">ONLINE</span>
        </div>
      </div>

      {/* 6-Grid Direct Channel Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {channels.map((ch, idx) => (
          <a
            key={idx}
            href={ch.href}
            target={ch.href.startsWith("mailto") ? undefined : "_blank"}
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#00F0FF]/40 hover:bg-white/[0.04] transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5 group-hover:border-[#00F0FF]/30 transition-colors">
                {ch.icon}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-white group-hover:text-[#00F0FF] transition-colors">
                    {ch.title}
                  </span>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-white/[0.03] text-zinc-400 border border-white/5">
                    {ch.tag}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-zinc-400 truncate max-w-[170px] sm:max-w-[190px]">
                  {ch.handle}
                </span>
              </div>
            </div>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-[#00F0FF] transition-colors shrink-0" />
          </a>
        ))}
      </div>
    </div>
  );
};
