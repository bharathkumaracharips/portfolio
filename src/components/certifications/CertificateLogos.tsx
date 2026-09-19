"use client";

import React from "react";
import {
  ShieldCheck,
  Lock,
  Server,
  Cloud,
  Layers,
  Code2,
  Cpu,
  Binary,
  Globe,
  Boxes,
  Workflow,
  CheckCircle2,
} from "lucide-react";

interface IssuerLogoProps {
  issuer: string;
  className?: string;
}

/**
 * High-fidelity vector logos for certification issuers
 */
export const IssuerLogo: React.FC<IssuerLogoProps> = ({
  issuer,
  className = "w-7 h-7",
}) => {
  const norm = issuer.toLowerCase();

  // 1. Alchemy University
  if (norm.includes("alchemy")) {
    return (
      <div
        className={`relative flex items-center justify-center rounded-lg bg-[#0052FF]/10 border border-[#0052FF]/40 p-1 shadow-[0_0_12px_rgba(0,82,255,0.3)] ${className}`}
        title="Alchemy University"
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Alchemy Beaker & Hexagonal Geometry */}
          <path
            d="M16 3L27.25 9.5V22.5L16 29L4.75 22.5V9.5L16 3Z"
            stroke="#0052FF"
            strokeWidth="2"
            fill="#0052FF"
            fillOpacity="0.2"
          />
          <path
            d="M16 7.5L23 11.5V19.5L16 23.5L9 19.5V11.5L16 7.5Z"
            fill="url(#alchemy-grad)"
          />
          {/* Flask neck and body interior */}
          <path
            d="M14 11H18V14L20.5 19H11.5L14 14V11Z"
            fill="#FFFFFF"
            fillOpacity="0.9"
          />
          <circle cx="16" cy="17" r="1.5" fill="#0052FF" />
          <defs>
            <linearGradient
              id="alchemy-grad"
              x1="9"
              y1="7.5"
              x2="23"
              y2="23.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#0052FF" />
              <stop offset="1" stopColor="#00D4FF" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  // 2. Rise In
  if (norm.includes("rise in") || norm.includes("risein")) {
    return (
      <div
        className={`relative flex items-center justify-center rounded-lg bg-[#FF6B00]/10 border border-[#FF6B00]/40 p-1 shadow-[0_0_12px_rgba(255,107,0,0.3)] ${className}`}
        title="Rise In"
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Rise In Dynamic Geometric Polygon / Chevron */}
          <path
            d="M16 4L28 11V21L16 28L4 21V11L16 4Z"
            stroke="#FF6B00"
            strokeWidth="1.8"
            fill="#FF6B00"
            fillOpacity="0.15"
          />
          <path
            d="M16 8L24 13V19L16 24L8 19V13L16 8Z"
            fill="url(#risein-grad)"
          />
          {/* Upward Ascending Chevron Arrow */}
          <path
            d="M16 11L21 16H18V21H14V16H11L16 11Z"
            fill="#FFFFFF"
          />
          <defs>
            <linearGradient
              id="risein-grad"
              x1="8"
              y1="8"
              x2="24"
              y2="24"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FFA800" />
              <stop offset="1" stopColor="#FF3D00" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  // 3. Microsoft
  if (norm.includes("microsoft")) {
    return (
      <div
        className={`relative flex items-center justify-center rounded-lg bg-white/[0.05] border border-white/15 p-1 shadow-[0_0_12px_rgba(255,255,255,0.1)] ${className}`}
        title="Microsoft"
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Official Microsoft 4-Color Grid */}
          <rect x="5" y="5" width="10" height="10" rx="1.5" fill="#F25022" />
          <rect x="17" y="5" width="10" height="10" rx="1.5" fill="#7FBA00" />
          <rect x="5" y="17" width="10" height="10" rx="1.5" fill="#00A4EF" />
          <rect x="17" y="17" width="10" height="10" rx="1.5" fill="#FFB900" />
        </svg>
      </div>
    );
  }

  // 4. Infosys Springboard (Official Infosys Vector Logo from IconScout / Simple Icons)
  if (norm.includes("infosys")) {
    return (
      <div
        className={`relative flex items-center justify-center rounded-lg bg-[#007CC3]/10 border border-[#007CC3]/40 p-1.5 shadow-[0_0_14px_rgba(0,124,195,0.35)] ${className}`}
        title="Infosys Springboard"
      >
        <svg
          role="img"
          viewBox="0 0 24 24"
          fill="#007CC3"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <path d="M23.2734 7.5703c-.3984 0-.7246.3282-.7246.7266 0 .4013.3262.7246.7246.7246.3982 0 .7266-.3233.7266-.7246 0-.3984-.3284-.7266-.7266-.7266zm0 .1074c.3395 0 .6192.2795.6192.6192 0 .3396-.2797.6172-.6192.6172-.3397 0-.6171-.2776-.6171-.6172 0-.3397.2774-.6192.6171-.6192zm-15.1367.0547c-.9001 0-1.549.5917-1.6387 1.6406h-.6953v.5215h.6856c.0028 1.6664-.002 3.334-.002 4.998h.7774c-.0022-1.6659-.002-3.3319-.002-4.998h1.748c-.646.5242-1.0663 1.3739-1.0663 2.334 0 1.593 1.1564 2.8848 2.582 2.8848 1.4258 0 2.582-1.2918 2.582-2.8848 0-.1896-.0174-.3753-.0488-.5547.2565.4131.7488.6133 1.4082.8985.7784.329 1.2129.6165 1.2129 1.1074 0 .5885-.556.8955-1.1817.8906-.611 0-1.0883-.249-1.6191-.7305v.9239c.3239.2088.8256.3281 1.3691.3281.6844-.0023 2.0918-.249 2.0918-1.6758-.0044-.8557-.715-1.2239-1.4863-1.5586-.9383-.4653-1.2965-.5629-1.2871-1.0957 0-.7088.6178-.9219 1.0996-.9219.2099 0 .3891.0293.5586.086.3163.1194.4209.3553.5332.6113.5283 1.2356 1.0344 2.4811 1.5488 3.7227-.2464.5637-.526 1.1519-.7168 1.5273l-.0039.0098-.1601.2969-.1797.336h.7617c.3322-.7342 1.7436-4.1688 2.0469-4.9083.1995.533.6857.7467 1.4297 1.0684.7783.329 1.2148.6166 1.2148 1.1074 0 .5886-.5562.8936-1.1816.8887-.6348 0-1.1257-.2685-1.6817-.7871l-.0507-.041v.9413c.3115.259.8713.4102 1.4824.4102.6844-.0022 2.0918-.249 2.0918-1.6758-.0042-.8557-.7151-1.2258-1.4863-1.5605-.9384-.4654-1.2593-.563-1.25-1.0957 0-.709.5787-.9219 1.0605-.9219.5483 0 .8958.2037 1.379.5547V9.584c-.3923-.1381-.7212-.1915-1.1642-.1895-.8912-.0018-1.6966.3234-1.9004 1.0762l-1.1054 2.7344-.1153.3437-.1015-.3437c-.5022-1.2089-.9934-2.4236-1.4863-3.6309-.3154-.0828-.8307-.201-1.1934-.1953-.0377-.0007-.0758-.0002-.1152 0-1.0302-.002-2.0235.4332-2.0235 1.457 0 .0596.0022.1155.006.17-.412-.9813-1.3036-1.6602-2.338-1.6602-.1245 0-.2472.0085-.3672.0273H7.254c-.1194-.733.2228-1.1503.7383-1.1503.6472-.0006.9242.192 1.205.4511 0 0 .0195-.0007.0274 0 .0038-.2457.002-.5318.002-.7949-.185-.0857-.5061-.1465-1.0899-.1465zM0 7.756v7.1367h.8594V7.7559zm23 .1386v.7657h.1387v-.3086h.164l.1192.3086h.1543l-.1407-.3301c.0494-.0248.1329-.0518.1329-.1875 0-.2224-.1673-.248-.3125-.248zm.1387.1328h.1543c.0834 0 .1289.0337.1289.1016 0 .068-.0524.0996-.1172.0996h-.166zM4.1719 9.3555c-.945 0-1.3429.3359-1.6582.6738a.2474.2474 0 00-.0352.0644h-.0078v-.043l-.0098-.623H1.707v5.4649h.7754v-3.9961c.0226-.4905.7134-.9746 1.252-.9746.6477 0 1.1777.4364 1.1777 1.039v3.9317h.7754c-.0019-1.429-.002-2.858-.002-4.2871-.0234-.4835-.6094-1.25-1.5136-1.25zm6.2832.5566c.9741-.0175 1.7825 1.0214 1.8047 2.3184.022 1.297-.7504 2.3614-1.7246 2.3789-.9742.0171-1.7825-1.0195-1.8047-2.3164-.0221-1.2971.7503-2.3634 1.7246-2.3809Z" />
        </svg>
      </div>
    );
  }

  // 5. CodeTantra
  if (norm.includes("codetantra")) {
    return (
      <div
        className={`relative flex items-center justify-center rounded-lg bg-[#00D084]/10 border border-[#00D084]/40 p-1 shadow-[0_0_12px_rgba(0,208,132,0.3)] ${className}`}
        title="CodeTantra.com"
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* CodeTantra Code Brackets & Monogram */}
          <rect
            x="3"
            y="3"
            width="26"
            height="26"
            rx="6"
            fill="#00D084"
            fillOpacity="0.15"
            stroke="#00D084"
            strokeWidth="1.6"
          />
          <path
            d="M10 11L6 16L10 21"
            stroke="#00F0FF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M22 11L26 16L22 21"
            stroke="#00F0FF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text
            x="16"
            y="19.5"
            fontFamily="ui-monospace, monospace"
            fontSize="9"
            fontWeight="bold"
            fill="#FFFFFF"
            textAnchor="middle"
          >
            CT
          </text>
        </svg>
      </div>
    );
  }

  // Generic Issuer Fallback
  return (
    <div
      className={`relative flex items-center justify-center rounded-lg bg-[#00F0FF]/10 border border-[#00F0FF]/30 p-1 text-[#00F0FF] ${className}`}
    >
      <ShieldCheck className="w-5 h-5" />
    </div>
  );
};

interface SkillBadgeProps {
  skill: string;
  showName?: boolean;
  className?: string;
}

/**
 * High-fidelity skill icon badges matching blockchain, cloud, and programming topics
 */
export const SkillBadge: React.FC<SkillBadgeProps> = ({
  skill,
  showName = true,
  className = "",
}) => {
  const norm = skill.toLowerCase();

  // 1. Ethereum
  if (norm.includes("ethereum") && !norm.includes("node")) {
    return (
      <div
        className={`group relative flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#627EEA]/10 border border-[#627EEA]/30 text-zinc-200 text-[10px] font-mono hover:border-[#627EEA]/60 transition-all ${className}`}
        title="Ethereum Protocol"
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 shrink-0">
          <path d="M12 2L5 12.5L12 16L19 12.5L12 2Z" fill="#627EEA" />
          <path d="M12 2L5 12.5L12 8.5L19 12.5L12 2Z" fill="#8A92B2" />
          <path d="M12 17.5L5 13.5L12 22L19 13.5L12 17.5Z" fill="#627EEA" />
        </svg>
        {showName && <span>Ethereum</span>}
      </div>
    );
  }

  // 2. Solidity
  if (norm.includes("solidity")) {
    return (
      <div
        className={`group relative flex items-center gap-1.5 px-2 py-1 rounded-md bg-zinc-700/20 border border-zinc-500/30 text-zinc-200 text-[10px] font-mono hover:border-zinc-400 transition-all ${className}`}
        title="Solidity Language"
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 shrink-0">
          <path d="M12 2L6 11.5L12 15L18 11.5L12 2Z" fill="#A8A8B3" />
          <path d="M12 15L6 11.5L12 22L18 11.5L12 15Z" fill="#60606B" />
          <path d="M12 2L18 11.5L12 15V2Z" fill="#D1D1D6" />
        </svg>
        {showName && <span>Solidity</span>}
      </div>
    );
  }

  // 3. EVM
  if (norm.includes("evm") || norm.includes("virtual machine")) {
    return (
      <div
        className={`group relative flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-cyan-200 text-[10px] font-mono hover:border-[#00F0FF]/60 transition-all ${className}`}
        title="Ethereum Virtual Machine"
      >
        <Cpu className="w-3.5 h-3.5 text-[#00F0FF] shrink-0" />
        {showName && <span>EVM</span>}
      </div>
    );
  }

  // 4. Smart Contracts
  if (norm.includes("smart contract")) {
    return (
      <div
        className={`group relative flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 text-[10px] font-mono hover:border-emerald-500/60 transition-all ${className}`}
        title="Smart Contract Development"
      >
        <Code2 className="w-3.5 h-3.5 text-[#00FF66] shrink-0" />
        {showName && <span>Contracts</span>}
      </div>
    );
  }

  // 5. Blockchain Cryptography
  if (norm.includes("cryptograph") || norm.includes("crypto")) {
    return (
      <div
        className={`group relative flex items-center gap-1.5 px-2 py-1 rounded-md bg-purple-500/10 border border-purple-500/30 text-purple-200 text-[10px] font-mono hover:border-purple-500/60 transition-all ${className}`}
        title="Blockchain Cryptography"
      >
        <Binary className="w-3.5 h-3.5 text-purple-400 shrink-0" />
        {showName && <span>Cryptography</span>}
      </div>
    );
  }

  // 6. Node API / RPC
  if (norm.includes("node") || norm.includes("api") || norm.includes("rpc")) {
    return (
      <div
        className={`group relative flex items-center gap-1.5 px-2 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-200 text-[10px] font-mono hover:border-cyan-500/60 transition-all ${className}`}
        title="Ethereum Node API"
      >
        <Server className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
        {showName && <span>Node APIs</span>}
      </div>
    );
  }

  // 7. Web3
  if (norm.includes("web3") || norm.includes("dapp")) {
    return (
      <div
        className={`group relative flex items-center gap-1.5 px-2 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-200 text-[10px] font-mono hover:border-amber-500/60 transition-all ${className}`}
        title="Web3 Decentralized Systems"
      >
        <Globe className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        {showName && <span>Web3</span>}
      </div>
    );
  }

  // 8. Microsoft Azure
  if (norm.includes("azure")) {
    return (
      <div
        className={`group relative flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#008AD7]/10 border border-[#008AD7]/30 text-sky-200 text-[10px] font-mono hover:border-[#008AD7]/60 transition-all ${className}`}
        title="Microsoft Azure"
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 shrink-0">
          <path
            d="M13.05 4.24L7.53 14.5H12.43L10.5 19.76L16.47 9.5H11.57L13.05 4.24Z"
            fill="#50E6FF"
          />
          <path d="M5.4 17.5L10 9L7.5 4L2 14.5L5.4 17.5Z" fill="#0078D4" />
          <path d="M13 19.5H22L17 9.5H12L13 19.5Z" fill="#008AD7" />
        </svg>
        {showName && <span>Azure</span>}
      </div>
    );
  }

  // 9. Cloud Computing / Fundamentals
  if (norm.includes("cloud")) {
    return (
      <div
        className={`group relative flex items-center gap-1.5 px-2 py-1 rounded-md bg-blue-500/10 border border-blue-500/30 text-blue-200 text-[10px] font-mono hover:border-blue-500/60 transition-all ${className}`}
        title="Cloud Computing"
      >
        <Cloud className="w-3.5 h-3.5 text-blue-400 shrink-0" />
        {showName && <span>Cloud</span>}
      </div>
    );
  }

  // 10. Cybersecurity / Security
  if (norm.includes("security") || norm.includes("cyber")) {
    return (
      <div
        className={`group relative flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 text-[10px] font-mono hover:border-emerald-500/60 transition-all ${className}`}
        title="Cybersecurity Fundamentals"
      >
        <ShieldCheck className="w-3.5 h-3.5 text-[#00FF66] shrink-0" />
        {showName && <span>Security</span>}
      </div>
    );
  }

  // 11. Java
  if (norm.includes("java") && !norm.includes("script")) {
    return (
      <div
        className={`group relative flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#F89820]/10 border border-[#F89820]/30 text-orange-200 text-[10px] font-mono hover:border-[#F89820]/60 transition-all ${className}`}
        title="Java Programming"
      >
        {/* Java Steaming Cup SVG */}
        <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 shrink-0">
          <path
            d="M4 18C4 18 6 19.5 12 19.5C18 19.5 20 18 20 18"
            stroke="#F89820"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M5 14C5 14 7 15.5 12 15.5C17 15.5 19 14 19 14"
            stroke="#5382A1"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M9 11C9 11 9.5 9 8 8C6.5 7 7.5 5 9.5 4"
            stroke="#E76F00"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M14 10C14 10 14.5 8 13 7C11.5 6 12.5 4 14.5 3"
            stroke="#E76F00"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
        {showName && <span>Java</span>}
      </div>
    );
  }

  // 12. Object-Oriented Programming (OOP)
  if (norm.includes("object") || norm.includes("oop")) {
    return (
      <div
        className={`group relative flex items-center gap-1.5 px-2 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/30 text-indigo-200 text-[10px] font-mono hover:border-indigo-500/60 transition-all ${className}`}
        title="Object-Oriented Programming"
      >
        <Boxes className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
        {showName && <span>OOP</span>}
      </div>
    );
  }

  // 13. Data Structures & Algorithms
  if (norm.includes("algorithm") || norm.includes("data structure") || norm.includes("jvm")) {
    return (
      <div
        className={`group relative flex items-center gap-1.5 px-2 py-1 rounded-md bg-violet-500/10 border border-violet-500/30 text-violet-200 text-[10px] font-mono hover:border-violet-500/60 transition-all ${className}`}
        title={skill}
      >
        <Workflow className="w-3.5 h-3.5 text-violet-400 shrink-0" />
        {showName && <span>{skill.length > 12 ? "Algorithms" : skill}</span>}
      </div>
    );
  }

  // General Skill Fallback
  return (
    <div
      className={`group relative flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/[0.03] border border-white/10 text-zinc-300 text-[10px] font-mono hover:border-white/20 transition-all ${className}`}
      title={skill}
    >
      <CheckCircle2 className="w-3 h-3 text-[#00F0FF] shrink-0" />
      {showName && <span>{skill}</span>}
    </div>
  );
};
