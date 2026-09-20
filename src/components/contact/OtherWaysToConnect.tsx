"use client";

import React from "react";
import { heroData } from "@/data/hero";
import { Mail, Github, Linkedin, Briefcase, Zap, GraduationCap, ArrowUpRight } from "lucide-react";

export const OtherWaysToConnect: React.FC = () => {
  const links = [
    {
      label: "Email",
      handle: heroData.socials.email,
      href: `mailto:${heroData.socials.email}`,
      icon: <Mail className="w-3.5 h-3.5" />,
    },
    {
      label: "LinkedIn",
      handle: "psbharathkumarachari",
      href: heroData.socials.linkedin,
      icon: <Linkedin className="w-3.5 h-3.5" />,
    },
    {
      label: "GitHub",
      handle: "@psbharathkumarachari",
      href: heroData.socials.github,
      icon: <Github className="w-3.5 h-3.5" />,
    },
    {
      label: "Upwork",
      handle: "Verified Freelancer",
      href: heroData.socials.upwork,
      icon: <Briefcase className="w-3.5 h-3.5" />,
    },
    {
      label: "Fiverr",
      handle: "Dev Services",
      href: heroData.socials.fiverr,
      icon: <Zap className="w-3.5 h-3.5" />,
    },
    {
      label: "TeacherOn",
      handle: "Systems Tutor",
      href: heroData.socials.teacheron,
      icon: <GraduationCap className="w-3.5 h-3.5" />,
    },
  ];

  return (
    <div className="pt-8 border-t border-white/[0.06] flex flex-col gap-3 text-xs font-mono">
      <div className="flex items-center justify-between">
        <span className="text-zinc-500 uppercase tracking-wider text-[11px]">
          OTHER WAYS TO CONNECT
        </span>
        <span className="text-zinc-600 text-[11px]">
          DIRECT PLATFORM ACCESS
        </span>
      </div>

      {/* Sleek horizontal strip on desktop, clean wrapped grid on mobile */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        {links.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target={item.href.startsWith("mailto") ? undefined : "_blank"}
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/[0.14] text-zinc-400 hover:text-white transition-all duration-150"
          >
            <span className="text-zinc-400 group-hover:text-cyan-400 transition-colors">
              {item.icon}
            </span>
            <span className="font-medium text-zinc-300 group-hover:text-white transition-colors">
              {item.label}
            </span>
            <ArrowUpRight className="w-3 h-3 text-zinc-600 group-hover:text-cyan-400 transition-colors" />
          </a>
        ))}
      </div>
    </div>
  );
};
