import { ExperienceItem } from "@/types";

export interface BlockchainExperienceBlock {
  blockNumber: string;
  blockHex: string;
  organization: string;
  position: string;
  employmentType: string;
  timestamp: string;
  period: string;
  location: string;
  description: string;
  skills: string[];
  isCurrent?: boolean;
}

export const experienceData: ExperienceItem[] = [
  {
    id: "block-01",
    organization: "Shamgar Software Solutions",
    position: "Blockchain Developer (Internship)",
    period: "JUL 2024 — AUG 2024",
    location: "Visakhapatnam, Andhra Pradesh, India · Remote",
    responsibilities: [
      "Worked on enhancing a blockchain-based healthcare application to enable privacy-preserving medical diagnostics.",
      "Optimized model training pipelines and smart contract execution parameters.",
    ],
    achievements: [
      "Improved model training efficiency by 90%, enabling faster diagnostic analysis.",
      "Engineered secure privacy-preserving smart contract verification interfaces.",
    ],
    technologies: ["Smart Contracts", "Blockchain Architecture", "Privacy Protocols", "Healthcare Systems"],
  },
  {
    id: "block-02",
    organization: "Freelance Protocol Engineering",
    position: "Blockchain Developer",
    period: "AUG 2024 — SEP 2025",
    location: "Vizianagaram, Andhra Pradesh, India · Remote",
    responsibilities: [
      "Built a private sovereign blockchain on Polkadot/Rust tailored for secure real-time drone telemetry log storage.",
      "Designed custom Proof of Stake (PoS) consensus logic and cryptographic verification schemes for flight data.",
    ],
    achievements: [
      "Achieved 98% accuracy in real-time telemetry data analysis and storage.",
      "Implemented zero-contention Proof of Stake (PoS) validation with Substrate WASM runtime modules.",
    ],
    technologies: ["Polkadot", "Rust", "WebAssembly", "Proof of Stake (PoS)", "Distributed Storage"],
  },
  {
    id: "block-03",
    organization: "ONE DEV",
    position: "Tutor – Blockchain Engineering",
    period: "FEB 2026 — MAY 2026",
    location: "Nairobi County, Kenya · Remote",
    responsibilities: [
      "Created and delivered high-quality curriculum content for the comprehensive Blockchain Engineering Diploma program.",
      "Delivered structured technical lessons through live hands-on coding sessions twice weekly.",
    ],
    achievements: [
      "Trained and mentored aspiring protocol developers in smart contract architecture and distributed systems fundamentals.",
      "Led end-to-end hands-on workshops covering EVM, WASM, and decentralized protocol engineering.",
    ],
    technologies: ["Solidity", "Blockchain Engineering", "Curriculum Architecture", "Technical Mentorship"],
  },
  {
    id: "block-04",
    organization: "Caerulean Bytechains Pvt Ltd",
    position: "Blockchain Engineer (Rust & Substrate)",
    period: "MAR 2025 — SEP 2025",
    location: "Hyderabad, Telangana, India · On-site",
    responsibilities: [
      "Architected and implemented custom consensus protocols across experimental and production testnets.",
      "Engineered Substrate state transition pallets and low-level cryptographic verification mechanisms.",
    ],
    achievements: [
      "Implemented and benchmarked custom Proof of Stake (PoS), Proof of Integrity (PoI), and DCF consensus mechanisms.",
      "Significantly increased blockchain execution scalability, finality speed, and node sync efficiency.",
    ],
    technologies: ["Rust", "Substrate", "PoS / PoI / DCF Consensus", "Polkadot SDK", "DevOps"],
  },
  {
    id: "block-05",
    organization: "Caerulean Bytechains Pvt Ltd",
    position: "Blockchain Developer – Protocol & Runtime Architecture (CBC Chain)",
    period: "SEP 2025 — PRESENT",
    location: "Hyderabad, Telangana, India · On-site",
    responsibilities: [
      "Designed and developed CBC Chain, a custom Substrate-based Layer-1 blockchain protocol built from first principles.",
      "Responsible for core protocol architecture, deterministic WASM runtime implementation, custom gas metering, and consensus design.",
    ],
    achievements: [
      "Built enterprise-grade Layer-1 sovereign chain with deterministic WASM execution and zero-downtime runtime upgradeability.",
      "Designed modular pallet architecture, custom cryptographic signatures, and peer-to-peer libp2p network topologies.",
    ],
    technologies: ["Substrate", "Rust", "Polkadot SDK", "L1 Protocol Architecture", "WASM Runtime", "Consensus Design", "DevOps"],
  },
];

export interface BlockchainExperienceBlock {
  blockNumber: string;
  blockHex: string;
  organization: string;
  position: string;
  employmentType: string;
  timestamp: string;
  period: string;
  location: string;
  description: string;
  skills: string[];
  isCurrent?: boolean;
  isActivePinnacle?: boolean;
}

export const blockchainExperienceBlocks: BlockchainExperienceBlock[] = [
  {
    blockNumber: "01",
    blockHex: "0x3A8F...7C21",
    organization: "Shamgar Software Solutions",
    position: "Blockchain Developer",
    employmentType: "Internship",
    timestamp: "JUL 2024",
    period: "Jul 2024 – Aug 2024 · 2 mos",
    location: "Visakhapatnam, Andhra Pradesh, India · Remote",
    description:
      "Enhanced a blockchain-based healthcare application, improving model training efficiency by 90% and enabling faster diagnostics with privacy-preserving smart contracts.",
    skills: ["Smart Contracts", "Blockchain Architecture", "Privacy Protocols", "Model Optimization"],
  },
  {
    blockNumber: "02",
    blockHex: "0x7B12...9E44",
    organization: "Freelance Protocol Engineering",
    position: "Blockchain Developer",
    employmentType: "Freelance",
    timestamp: "AUG 2024",
    period: "Aug 2024 – Sep 2025 · 1 yr 2 mos",
    location: "Vizianagaram, Andhra Pradesh, India · Remote",
    description:
      "Built a private sovereign blockchain on Polkadot/Rust for secure real-time drone telemetry log storage, achieving 98% accuracy with custom Proof of Stake (PoS) consensus.",
    skills: ["Polkadot", "Rust", "WebAssembly", "Proof of Stake (PoS)", "Distributed Storage"],
  },
  {
    blockNumber: "03",
    blockHex: "0x5E91...D3F8",
    organization: "Caerulean Bytechains Pvt Ltd",
    position: "Blockchain Engineer (Rust & Substrate)",
    employmentType: "Internship",
    timestamp: "MAR 2025",
    period: "Mar 2025 – Sep 2025 · 7 mos",
    location: "Hyderabad, Telangana, India · On-site",
    description:
      "Architected and benchmarked custom consensus protocols (PoS, PoI, DCF), driving significant increases in blockchain execution scalability and node synchronization efficiency.",
    skills: ["Rust", "Substrate", "PoS / PoI / DCF Consensus", "Polkadot SDK", "DevOps"],
  },
  {
    blockNumber: "04",
    blockHex: "0x2C48...B1A0",
    organization: "ONE DEV",
    position: "Tutor – Blockchain Engineering",
    employmentType: "Freelance",
    timestamp: "FEB 2026",
    period: "Feb 2026 – May 2026 · 4 mos",
    location: "Nairobi County, Kenya · Remote",
    description:
      "Created and delivered high-quality curriculum content for the Blockchain Engineering Diploma program, leading structured live hands-on coding sessions twice weekly on EVM and WASM protocols.",
    skills: ["Solidity", "Blockchain Engineering", "Curriculum Architecture", "Technical Mentorship"],
  },
  {
    blockNumber: "05",
    blockHex: "0x9F00...CURRENT",
    organization: "Caerulean Bytechains Pvt Ltd",
    position: "Blockchain Developer – Protocol & Runtime Architecture (CBC Chain)",
    employmentType: "Full-time",
    timestamp: "SEP 2025",
    period: "Sep 2025 – Present · 1 yr 1 mo",
    location: "Hyderabad, Telangana, India · On-site",
    description:
      "Designed and developed CBC Chain, an enterprise-grade Substrate Layer-1 blockchain protocol built from scratch. Architected core WASM runtime, custom gas metering, and modular consensus.",
    skills: ["Substrate", "Rust", "Polkadot SDK", "L1 Protocol Architecture", "WASM Runtime", "Consensus Design"],
    isCurrent: true,
    isActivePinnacle: true,
  },
];
