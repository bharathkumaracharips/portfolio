export interface ExperienceChapterItem {
  id: string;
  stage: string;
  year: string;
  period: string;
  role: string;
  roleSpecialization: string;
  organization: string;
  location: string;
  context: string;
  selectedContributions: string[];
  capabilities: string[];
  technologies: string[];
  accentColor: string;
  isCurrent?: boolean;
  artifactId:
    | "caerulean-l1"
    | "caerulean-consensus"
    | "onedev-teaching"
    | "drone-protocol"
    | "healthcare-watch";
}

export const experienceChaptersData: ExperienceChapterItem[] = [
  {
    id: "cbc-chain-l1",
    stage: "01",
    year: "2026",
    period: "SEP 2025 — PRESENT",
    role: "Blockchain Developer",
    roleSpecialization: "Protocol & Runtime Architecture",
    organization: "Caerulean Bytechains",
    location: "Hyderabad, India · On-site",
    context:
      "Architecting CBC Chain from first principles — an enterprise-grade sovereign Layer-1 blockchain built on the Polkadot SDK and Substrate. Led the complete runtime design: deterministic WebAssembly execution sandbox, custom state transition logic, pluggable consensus interfaces, and modular pallet ecosystems with zero-downtime forkless runtime upgradeability.",
    selectedContributions: [
      "Engineered deterministic WebAssembly runtime execution engine supporting zero-downtime forkless on-chain state upgrades.",
      "Designed custom gas metering schedule and transaction weighting calibrated to native hardware benchmarks.",
      "Implemented modular FRAME pallet architecture with custom cryptographic signature verification schemes.",
      "Constructed libp2p peer-to-peer network topology achieving sub-second block propagation across validator nodes.",
    ],
    capabilities: [
      "SOVEREIGN L1 ARCHITECTURE",
      "DETERMINISTIC WASM RUNTIMES",
      "FORKLESS UPGRADE PIPELINES",
      "GAS & WEIGHT CALIBRATION",
      "P2P TOPOLOGY DESIGN",
    ],
    technologies: ["Substrate", "Rust", "Polkadot SDK", "WASM", "libp2p", "DevOps"],
    accentColor: "#00F0FF",
    isCurrent: true,
    artifactId: "caerulean-l1",
  },
  {
    id: "cbc-consensus",
    stage: "02",
    year: "2025",
    period: "MAR 2025 — SEP 2025",
    role: "Blockchain Engineer",
    roleSpecialization: "Rust & Substrate Systems",
    organization: "Caerulean Bytechains",
    location: "Hyderabad, India · On-site",
    context:
      "Researched, architected, and benchmarked three distinct consensus protocols within a unified Substrate state machine: Proof of Stake (PoS), Proof of Integrity (PoI), and a custom Distributed Consensus Framework (DCF). Engineered zero-contention block proposal mechanics and high-speed validator finality gadgets.",
    selectedContributions: [
      "Engineered Tri-Consensus execution framework benchmarked simultaneously under adversarial testnet loads.",
      "Designed custom finality gadgets reducing block confirmation latency while preserving Byzantine fault tolerance.",
      "Implemented zero-contention validator scheduling and threshold signature aggregation.",
      "Optimized node database I/O performance across high-frequency block authoring cycles.",
    ],
    capabilities: [
      "BFT CONSENSUS MECHANISMS",
      "PROOF OF INTEGRITY (PoI)",
      "THRESHOLD SIGNATURES",
      "FINALITY GADGETS",
      "RUST SYSTEMS OPTIMIZATION",
    ],
    technologies: ["Rust", "Substrate", "PoS / PoI / DCF", "Polkadot SDK", "RocksDB"],
    accentColor: "#00FF66",
    artifactId: "caerulean-consensus",
  },
  {
    id: "onedev-education",
    stage: "03",
    year: "2025",
    period: "FEB 2026 — MAY 2026",
    role: "Tutor — Blockchain Engineering",
    roleSpecialization: "Technical Education & Mentorship",
    organization: "ONE DEV",
    location: "Nairobi, Kenya · Remote",
    context:
      "Created and delivered the comprehensive technical curriculum for ONE DEV's professional Blockchain Engineering Diploma. Led twice-weekly live deep-dive coding workshops deconstructing EVM bytecode internals, memory expansion quadratic gas curves, Substrate WASM runtime architecture, and distributed consensus invariants.",
    selectedContributions: [
      "Authored end-to-end professional curriculum spanning low-level EVM execution through sovereign L1 runtime engineering.",
      "Trained developer cohorts in writing inline Yul assembly, custom storage slot packing, and invariant fuzz testing in Foundry.",
      "Guided students through constructing sovereign Substrate blockchain runtimes and custom dispatchable pallets in Rust.",
      "Delivered live code review workshops and architectural debugging sessions for production smart contract systems.",
    ],
    capabilities: [
      "CURRICULUM ARCHITECTURE",
      "EVM BYTECODE & YUL",
      "TECHNICAL MENTORSHIP",
      "INVARIANT TESTING (FOUNDRY)",
      "PEDAGOGICAL SYSTEMS",
    ],
    technologies: ["Solidity", "EVM Bytecode", "Yul", "Rust", "WASM", "Foundry"],
    accentColor: "#818CF8",
    artifactId: "onedev-teaching",
  },
  {
    id: "drone-telemetry-l1",
    stage: "04",
    year: "2024",
    period: "AUG 2024 — SEP 2025",
    role: "Blockchain Developer",
    roleSpecialization: "Distributed Storage & Telemetry",
    organization: "Protocol Engineering (Freelance)",
    location: "Vizianagaram, India · Remote",
    context:
      "Engineered a private sovereign blockchain on Polkadot/Substrate in Rust, purpose-built for secure, tamper-proof real-time drone telemetry log storage and cryptographic verification. Developed custom flight data signing pallets and lightweight validator synchronization.",
    selectedContributions: [
      "Built sovereign Substrate chain achieving 98% accuracy in real-time drone telemetry logging across distributed nodes.",
      "Implemented zero-contention Proof of Stake (PoS) validation module tailored to high-frequency IoT packet streams.",
      "Designed cryptographic flight data signing schemes ensuring tamper-evident spatial coordinates and sensor logs.",
      "Optimized WASM runtime footprint for low-latency node synchronization across resource-constrained edge gateways.",
    ],
    capabilities: [
      "IOT TELEMETRY CHAINS",
      "EDGE NODE ARCHITECTURE",
      "TAMPER-EVIDENT LOGGING",
      "REAL-TIME DATA INGESTION",
      "CUSTOM POS PROTOCOLS",
    ],
    technologies: ["Polkadot", "Substrate", "Rust", "WebAssembly", "IoT Protocols"],
    accentColor: "#38BDF8",
    artifactId: "drone-protocol",
  },
  {
    id: "shamgar-healthcare",
    stage: "05",
    year: "2024",
    period: "JUL 2024 — AUG 2024",
    role: "Blockchain Developer",
    roleSpecialization: "Federated AI & Smart Contracts",
    organization: "Shamgar Software Solutions",
    location: "Visakhapatnam, India · Remote",
    context:
      "Engineered a privacy-preserving healthcare platform combining wearable IoT health devices (smartwatches), federated machine learning, and blockchain smart contracts. Raw patient biometric data remained strictly on local wearable devices, while cryptographically verified model weight updates were aggregated on-chain.",
    selectedContributions: [
      "Designed blockchain trust layer and smart contracts to validate and record federated AI training contributions on-chain.",
      "Architected local shard aggregation pipeline ensuring raw patient biometric telemetry never left the edge device.",
      "Created traceable cryptographic audit logs demonstrating end-to-end model training, verification, and reward distribution.",
      "Integrated wearable biometric telemetry simulators with decentralized identity and privacy-preserving audit trails.",
    ],
    capabilities: [
      "FEDERATED AI ON BLOCKCHAIN",
      "EDGE BIOMETRICS & IOT",
      "PRIVACY PROTOCOLS",
      "ON-CHAIN AUDIT LOGS",
      "SMART CONTRACT ARCHITECTURE",
    ],
    technologies: [
      "Federated AI",
      "Smart Contracts",
      "Blockchain Traceability",
      "IoT Wearables",
      "Privacy Protocols",
    ],
    accentColor: "#F472B6",
    artifactId: "healthcare-watch",
  },
];
