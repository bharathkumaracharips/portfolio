export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  capabilities: string[];
  technologies: string[];
  deliverables: string[];
  relevantProjects: {
    name: string;
    id: string;
    role: string;
    githubUrl?: string;
  }[];
  assemblyModules: string[];
}

export interface ProcessStage {
  number: string;
  title: string;
  tagline: string;
  description: string;
  deliverable: string;
}

export interface EngagementModel {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  idealFor: string;
  scopeType: string;
  commitment: string;
  deliverables: string[];
}

export const servicesData: ServiceItem[] = [
  {
    id: "srv-protocol-engineering",
    number: "01",
    title: "PROTOCOL ENGINEERING",
    tagline: "Core Runtimes, State Transitions & Consensus Invariants",
    description:
      "Architect and implement deterministic blockchain infrastructure from low-level execution runtimes to custom consensus modules and forkless upgrade pipelines.",
    capabilities: [
      "Custom Substrate FRAME Pallet Architecture",
      "Deterministic WASM State Transition Logic",
      "Parallel EVM Execution & STM Concurrency",
      "Consensus, Finality & Validator Engine Rules",
      "Low-Level State Storage (RocksDB / Merkle-Patricia Tries)",
    ],
    technologies: ["Rust", "Substrate / Polkadot SDK", "WebAssembly (WASM)", "EVM Internals", "libp2p", "RocksDB"],
    deliverables: [
      "Production-ready Rust runtime binaries (.wasm & native host)",
      "Deterministic state transition unit & fuzz test suites",
      "Benchmark gas & weight accounting documentation",
      "Full protocol architecture specification document",
    ],
    relevantProjects: [
      {
        name: "Parallel EVM Execution Engine",
        id: "proj-parallel-evm",
        role: "Lead Protocol Architect",
        githubUrl: "https://github.com/psbharathkumarachari/parallel-evm-engine",
      },
      {
        name: "libp2p Block Propagation Simulator",
        id: "proj-p2p-gossip-sim",
        role: "Network & Consensus Engineer",
        githubUrl: "https://github.com/psbharathkumarachari/p2p-gossip-sim",
      },
      {
        name: "Merkle-Patricia Trie Inspector",
        id: "proj-merkle-trie",
        role: "State Engine Engineer",
        githubUrl: "https://github.com/psbharathkumarachari/mpt-trie-visualizer",
      },
    ],
    assemblyModules: ["RUNTIME", "CONSENSUS", "NETWORK", "STATE ENGINE"],
  },
  {
    id: "srv-smart-contracts-dapps",
    number: "02",
    title: "SMART CONTRACT & DAPP ENGINEERING",
    tagline: "High-Throughput Smart Contracts & Type-Safe Decentralized Systems",
    description:
      "Design, write, and optimize battle-tested smart contract protocols and reactive client interfaces with zero-copy calldata and minimal gas footprint.",
    capabilities: [
      "Arbitrum Stylus High-Speed Rust Smart Contracts",
      "EVM / Solidity State Machine & DeFi Protocols",
      "Zero-Copy Calldata Slicing & Inline Yul Optimization",
      "Multi-Sig Governance & Timelock Vault Architectures",
      "Type-Safe Web3 Client Integration (viem, wagmi, Next.js)",
    ],
    technologies: [
      "Solidity",
      "Arbitrum Stylus (Rust)",
      "Foundry / Hardhat",
      "TypeScript",
      "Next.js",
      "viem / wagmi",
    ],
    deliverables: [
      "Gas-optimized, thoroughly tested smart contract repository",
      "Automated invariant & fuzzing suites with 100% branch coverage",
      "Etherscan / block explorer verified contracts & deploy scripts",
      "End-to-end type-safe decentralized web application",
    ],
    relevantProjects: [
      {
        name: "Stylus Rust Multi-Token Vault",
        id: "proj-stylus-vault",
        role: "Smart Contract Engineer",
        githubUrl: "https://github.com/psbharathkumarachari/stylus-vault-rust",
      },
      {
        name: "Fraud Proof Verification Engine",
        id: "proj-fraud-verifier",
        role: "Protocol Engineer",
        githubUrl: "https://github.com/psbharathkumarachari/fraud-proof-verifier",
      },
      {
        name: "ZK-Rollup State Batcher",
        id: "proj-zk-batcher",
        role: "L2 Protocol Engineer",
        githubUrl: "https://github.com/psbharathkumarachari/zk-rollup-batcher",
      },
    ],
    assemblyModules: ["APPLICATION", "SMART CONTRACT", "EVM", "BLOCKCHAIN"],
  },
  {
    id: "srv-infrastructure-backend",
    number: "03",
    title: "BLOCKCHAIN INFRASTRUCTURE & BACKEND",
    tagline: "High-Throughput RPC Gateways, Indexers & Node Orchestration",
    description:
      "Build resilient off-chain infrastructure, low-latency RPC caching proxies, and custom event indexing pipelines for high-throughput networks.",
    capabilities: [
      "High-Concurrency Rust RPC Gateways (Tokio / Actix)",
      "Subsquid & Custom Ledger Event Indexers",
      "Node Cluster Load Balancing & Dynamic Fallback Routing",
      "Dockerized Node Deployment & CI/CD Pipelines",
      "Prometheus & Grafana Real-Time Telemetry Dashboards",
    ],
    technologies: ["Rust", "Tokio", "Docker", "PostgreSQL", "Redis", "Subsquid", "Prometheus", "Grafana"],
    deliverables: [
      "Low-latency (<5ms) RPC caching proxy service",
      "Relational event indexing database schema and GraphQL API",
      "Infrastructure as Code & container orchestration manifests",
      "Real-time node health monitoring & alerting configuration",
    ],
    relevantProjects: [
      {
        name: "High-Speed Rust RPC Gateway",
        id: "proj-rust-rpc",
        role: "Backend & Systems Engineer",
        githubUrl: "https://github.com/psbharathkumarachari/rust-rpc-gateway",
      },
      {
        name: "EVM Memory & Storage Profiler",
        id: "proj-evm-profiler",
        role: "Systems Engineer",
        githubUrl: "https://github.com/psbharathkumarachari/evm-memory-profiler",
      },
    ],
    assemblyModules: ["NODE CLUSTER", "RPC GATEWAY", "INDEXER", "DATABASE"],
  },
  {
    id: "srv-auditing-gas-optimization",
    number: "04",
    title: "PROTOCOL AUDITING & GAS OPTIMIZATION",
    tagline: "Security Invariant Analysis, Reentrancy Threat Modeling & Bytecode Profiling",
    description:
      "Inspect mission-critical protocol codebases for reentrancy vectors, state transition exploits, and bytecode-level memory allocation inefficiencies.",
    capabilities: [
      "State Invariant & Cross-Function Reentrancy Auditing",
      "Quadratic Memory Expansion & Storage Slot Packing",
      "Decompiled Bytecode & Yul Assembly Verification",
      "Foundry Property-Based & Fuzzing Invariant Test Harnesses",
      "Exploit Proof-of-Concept (PoC) Demonstration",
    ],
    technologies: ["EVM Bytecode", "Yul", "Foundry Invariants", "Slither", "Rust", "Static Analysis"],
    deliverables: [
      "Formal security audit report with vulnerability severity matrix",
      "Executable exploit PoCs replicating discovered edge cases",
      "Direct remediation patches and optimized gas diffs",
      "Long-term security invariant test fixtures",
    ],
    relevantProjects: [
      {
        name: "EVM Memory & Storage Profiler",
        id: "proj-evm-profiler",
        role: "Security & Optimization Lead",
        githubUrl: "https://github.com/psbharathkumarachari/evm-memory-profiler",
      },
      {
        name: "Fraud Proof Verification Engine",
        id: "proj-fraud-verifier",
        role: "Protocol Invariant Auditor",
        githubUrl: "https://github.com/psbharathkumarachari/fraud-proof-verifier",
      },
    ],
    assemblyModules: ["SECURITY INVARIANT", "BYTECODE AUDITOR", "GAS PROFILER", "VERIFIER"],
  },
  {
    id: "srv-technical-education",
    number: "05",
    title: "TECHNICAL EDUCATION & MENTORSHIP",
    tagline: "Blockchain from Basic to Advance in Solidity Course by BKA // 16-Week Engineering Curriculum",
    description:
      "Comprehensive 16-week blockchain & smart contract engineering curriculum from EVM opcodes and Foundry invariant testing to DeFi protocol architecture and security auditing.",
    capabilities: [
      "Module 1: Blockchain Foundations & Solidity Essentials (Weeks 1–4)",
      "Module 2: Professional Smart Contract Development & Transient Storage (Weeks 5–8)",
      "Module 3: Advanced Solidity, Protocols & DeFi Engineering (Weeks 9–12)",
      "Module 4: Smart Contract Security, Auditing & 6-Track Capstone (Weeks 13–16)",
      "Modern Solidity Toolchain Targeting Solidity 0.8.37 & Foundry Invariants",
    ],
    technologies: ["Solidity 0.8.37", "Foundry", "Hardhat", "EVM Internals", "Yul / --via-ir", "Slither", "Echidna"],
    deliverables: [
      "16-Week Structured Syllabus (Foundations, Pro Dev, DeFi Protocols, Security)",
      "Production Tokenized Vaults (ERC-4626), AMM Pairs & Upgradeable Proxies",
      "Automated Foundry & Hardhat Fuzz / Invariant Test Harnesses",
      "Formal Security Audit Threat Model, Exploit PoCs & Capstone Project",
    ],
    relevantProjects: [
      {
        name: "ONE DEV Blockchain Engineering Diploma",
        id: "exp-onedev",
        role: "Blockchain Engineering Tutor",
      },
      {
        name: "Freelance Protocol Labs",
        id: "exp-freelance",
        role: "Protocol Mentor & Educator",
      },
    ],
    assemblyModules: ["SOLIDITY 0.8.37", "FOUNDRY LAB", "SECURITY AUDIT", "CAPSTONE"],
  },
];

export const processStagesData: ProcessStage[] = [
  {
    number: "01",
    title: "DISCOVER",
    tagline: "Understand Constraints & Requirements",
    description:
      "Analyze the fundamental problem, throughput requirements, trust model, security invariants, and state transition boundaries before writing a single line of code.",
    deliverable: "Technical Requirements Specification & Threat Model Document",
  },
  {
    number: "02",
    title: "ARCHITECT",
    tagline: "Define State Transitions & System Topology",
    description:
      "Map out data structures, storage layout, execution flow, cryptographic proofs, and off-chain service interactions into a coherent architecture.",
    deliverable: "System Architecture Blueprint & State Transition Flow Diagram",
  },
  {
    number: "03",
    title: "BUILD",
    tagline: "Precision Systems & Contract Engineering",
    description:
      "Implement idiomatic, high-performance Rust, Solidity, or TypeScript codebases with strict type safety, modular interfaces, and exhaustive documentation.",
    deliverable: "Clean, Modular, Version-Controlled Codebase & Implementation Docs",
  },
  {
    number: "04",
    title: "VALIDATE",
    tagline: "Fuzzing, Invariant Verification & Benchmarks",
    description:
      "Stress test the system under extreme conditions using fuzzing, property-based invariants, memory profiling, and low-level gas benchmarking.",
    deliverable: "Exhaustive Test Report, Invariant Test Suite & Benchmark Metrics",
  },
  {
    number: "05",
    title: "DELIVER",
    tagline: "Deployment, Verification & Knowledge Transfer",
    description:
      "Deploy smart contracts to target networks, configure infrastructure pipelines, verify source code, and conduct comprehensive walkthroughs for your team.",
    deliverable: "Live Verified Deployment, Monitoring Dashboards & Technical Handoff",
  },
];

export const engagementModelsData: EngagementModel[] = [
  {
    id: "eng-project",
    number: "01",
    title: "PROJECT",
    subtitle: "Defined Technical Builds & Runtimes",
    idealFor:
      "Teams needing a specific, well-defined system built from scratch—such as a custom Substrate pallet, an Arbitrum Stylus vault, or an indexing RPC gateway.",
    scopeType: "Fixed or Milestone-Based Scope",
    commitment: "Dedicated build timeline with staged verification milestones",
    deliverables: [
      "End-to-end architecture & implementation",
      "Full unit, integration, and fuzz test suites",
      "Deployment orchestration scripts",
      "Comprehensive technical documentation & handoff",
    ],
  },
  {
    id: "eng-consulting",
    number: "02",
    title: "CONSULTING",
    subtitle: "Architecture, Reviews & Gas Optimization",
    idealFor:
      "Projects seeking senior technical guidance, security invariant reviews, protocol gas profiling, or architecture direction before committing to production.",
    scopeType: "Advisory & Codebase Audit Scope",
    commitment: "Sprint-based or targeted audit cycles",
    deliverables: [
      "Detailed technical review & security findings report",
      "Reproducible exploit PoCs & remediation patches",
      "Gas optimization diffs with byte-level benchmarks",
      "Direct technical advisory calls & async support",
    ],
  },
  {
    id: "eng-ongoing",
    number: "03",
    title: "ONGOING",
    subtitle: "Continued Engineering & Protocol Mentorship",
    idealFor:
      "Protocol teams or educational institutions requiring ongoing engineering bandwidth, node infrastructure maintenance, or developer training sessions.",
    scopeType: "Retainer / Dedicated Allocation",
    commitment: "Recurring monthly engineering collaboration",
    deliverables: [
      "Continuous protocol development & maintenance",
      "Infrastructure monitoring & incident support",
      "Regular live technical workshops & mentoring",
      "Priority response for architectural decisions",
    ],
  },
];
