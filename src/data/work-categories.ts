export interface WorkProjectItem {
  id: string;
  name: string;
  category: "PROTOCOL" | "DAPPS" | "FULL-STACK" | "LEARNING";
  subtitle: string;
  year: string;
  status: "Production" | "Active R&D" | "Open Source" | "Audit Complete" | "Educational";
  description: string;
  techStack: string[];
  metrics?: { label: string; value: string }[];
  githubUrl?: string;
  demoUrl?: string;
  architectureLayers: {
    layerName: string;
    description: string;
    tech: string;
  }[];
}

export interface WorkCategoryItem {
  id: "PROTOCOL" | "DAPPS" | "FULL-STACK" | "LEARNING";
  title: string;
  tagline: string;
  description: string;
  accentColor: string;
  nodePos: [number, number, number]; // [x, y, z] in 3D scene
  projects: WorkProjectItem[];
}

export const workCategoriesData: WorkCategoryItem[] = [
  {
    id: "PROTOCOL",
    title: "PROTOCOL",
    tagline: "Core Runtimes, Consensus & Low-Level Systems",
    description:
      "Deep protocol engineering focusing on deterministic WASM state transitions, parallel EVM execution models, and p2p gossip networks.",
    accentColor: "#00F0FF",
    nodePos: [-5.2, -1.0, 0],
    projects: [
      {
        id: "proj-parallel-evm",
        name: "Parallel EVM Execution Engine",
        category: "PROTOCOL",
        subtitle: "Scaling L1 State Transition Throughput via STM Concurrency",
        year: "2025",
        status: "Active R&D",
        description:
          "Engineered an optimistic execution runtime using Software Transactional Memory (STM). Transactions execute concurrently across worker threads with dynamic collision detection and lock-free atomic pointers.",
        techStack: ["Rust", "EVM Engine", "STM Concurrency", "RocksDB", "Rayon"],
        metrics: [
          { label: "Throughput Boost", value: "16x" },
          { label: "Peak TPS", value: "24,500" },
          { label: "EVM Compatibility", value: "100%" },
        ],
        githubUrl: "https://github.com/psbharathkumarachari/parallel-evm-engine",
        architectureLayers: [
          { layerName: "Worker Pool", description: "Multi-threaded transaction scheduler", tech: "Rayon" },
          { layerName: "STM Engine", description: "Lock-free read/write set conflict detector", tech: "Rust Atomics" },
          { layerName: "State Commit", description: "Atomic batch commit to local state trie", tech: "RocksDB" },
        ],
      },
      {
        id: "proj-p2p-gossip-sim",
        name: "libp2p Block Propagation Simulator",
        category: "PROTOCOL",
        subtitle: "Gossipsub Network Latency & Topology Analyzer",
        year: "2025",
        status: "Active R&D",
        description:
          "Interactive visual simulator benchmarking transaction propagation latency, mesh peer degradation, and block gossip dynamics across 10,000 simulated nodes.",
        techStack: ["Rust", "libp2p", "TypeScript", "WebAssembly", "Canvas 2D"],
        metrics: [
          { label: "Simulated Nodes", value: "10,000" },
          { label: "Median Propagation", value: "580ms" },
          { label: "Mesh Health", value: "99.4%" },
        ],
        githubUrl: "https://github.com/psbharathkumarachari/p2p-gossip-sim",
        demoUrl: "https://p2p-sim.bharathachari.dev",
        architectureLayers: [
          { layerName: "Topology Mesh", description: "Kademlia DHT & peer discovery layer", tech: "libp2p" },
          { layerName: "Gossipsub Engine", description: "Epidemic broadcast protocol with scoring", tech: "Rust WASM" },
          { layerName: "Telemetry Visualizer", description: "Real-time state canvas renderer", tech: "HTML5 Canvas" },
        ],
      },
      {
        id: "proj-merkle-trie",
        name: "Merkle-Patricia Trie Inspector",
        category: "PROTOCOL",
        subtitle: "Ethereum State Trie Visualization & Proof Engine",
        year: "2024",
        status: "Open Source",
        description:
          "WebAssembly-powered state trie inspector for visualizing Ethereum MPT key paths, nibble encoding, branch resolution, and leaf node proof verification.",
        techStack: ["Rust", "WebAssembly", "TypeScript", "React"],
        metrics: [
          { label: "Trie Nodes Inspected", value: "50M+" },
          { label: "Proof Verify Time", value: "<1ms" },
        ],
        githubUrl: "https://github.com/psbharathkumarachari/mpt-trie-visualizer",
        architectureLayers: [
          { layerName: "Hex-Prefix Parser", description: "Compact key nibble encoder/decoder", tech: "Rust" },
          { layerName: "Trie Walker", description: "Branch, Extension, and Leaf node traversal", tech: "WASM" },
          { layerName: "Merkle Proof Validator", description: "Cryptographic root hash verification", tech: "Keccak-256" },
        ],
      },
      {
        id: "proj-cbc-runtime",
        name: "CBC Chain Sovereign Substrate Runtime",
        category: "PROTOCOL",
        subtitle: "Enterprise Layer-1 Sovereign Runtime from First Principles",
        year: "2025",
        status: "Production",
        description:
          "Architected core Substrate state transition pallets, deterministic WASM runtime compilation, custom gas metering, and modular consensus mechanisms.",
        techStack: ["Substrate", "Rust", "Polkadot SDK", "WASM", "DevOps"],
        metrics: [
          { label: "Finality Latency", value: "<1.8s" },
          { label: "Zero-Downtime Upgrades", value: "100%" },
        ],
        architectureLayers: [
          { layerName: "Pallet Architecture", description: "Custom state logic & governance pallets", tech: "FRAME" },
          { layerName: "WASM Runtime", description: "Deterministic on-chain execution sandbox", tech: "Substrate WASM" },
          { layerName: "Consensus Engine", description: "Hybrid PoS / DCF finality gadget", tech: "GRANDPA / BABE" },
        ],
      },
    ],
  },
  {
    id: "DAPPS",
    title: "DApps",
    tagline: "High-Performance On-Chain Applications & ZK Rollups",
    description:
      "Smart contract protocols engineered for maximum execution efficiency, Arbitrum Stylus WASM acceleration, and optimistic fraud dispute games.",
    accentColor: "#38BDF8",
    nodePos: [-1.7, -1.0, 0],
    projects: [
      {
        id: "proj-stylus-vault",
        name: "Arbitrum Stylus High-Speed Vault",
        category: "DAPPS",
        subtitle: "WASM Accelerated DeFi Vault on Arbitrum Stylus",
        year: "2025",
        status: "Audit Complete",
        description:
          "Rust smart contract deployed on Arbitrum Stylus WASM execution environment, achieving 80% lower execution gas costs compared to standard Solidity equivalents.",
        techStack: ["Rust", "Arbitrum Stylus", "WASM", "Solidity", "Foundry"],
        metrics: [
          { label: "Gas Savings", value: "79.8%" },
          { label: "Fuzz Tests Passed", value: "10,000" },
        ],
        githubUrl: "https://github.com/psbharathkumarachari/stylus-vault-rust",
        architectureLayers: [
          { layerName: "Stylus Contract", description: "Compiled Rust binary running on Nitro WASM", tech: "Stylus SDK" },
          { layerName: "EVM Interop", description: "Cross-VM ABI bridge and ERC-4626 vault standard", tech: "Solidity ABI" },
        ],
      },
      {
        id: "proj-fraud-proof-engine",
        name: "Lightweight Fraud Proof Verifier",
        category: "DAPPS",
        subtitle: "Interactive Binary-Search Dispute Engine for Rollups",
        year: "2024",
        status: "Open Source",
        description:
          "Interactive dispute game engine for optimistic rollups that executes on-chain binary search state bisecting to isolate and prove invalid single-instruction execution transitions.",
        techStack: ["Solidity", "Go", "Foundry", "EVM Assembly"],
        metrics: [
          { label: "Max Dispute Steps", value: "16 Rounds" },
          { label: "Verification Gas", value: "<120k" },
        ],
        githubUrl: "https://github.com/psbharathkumarachari/fraud-proof-verifier",
        architectureLayers: [
          { layerName: "Dispute Game Manager", description: "Bisection turn-based state manager", tech: "Solidity" },
          { layerName: "One-Step Prover", description: "Single-opcode EVM execution verifier", tech: "Yul / EVM Asm" },
        ],
      },
      {
        id: "proj-zk-batcher",
        name: "High-Speed ZK-Rollup Batcher",
        category: "DAPPS",
        subtitle: "Calldata Compression & EIP-4844 Blobspace Submitter",
        year: "2025",
        status: "Production",
        description:
          "Dual-stage batching system utilizing BLS signature aggregation and zstd dictionary compression to shrink transaction call data, saving 94% on L1 rollup posting fees.",
        techStack: ["Go", "Rust", "BLS Signatures", "EIP-4844 Blobspace", "Celestia DA"],
        metrics: [
          { label: "Calldata Savings", value: "94.2%" },
          { label: "Batch Size", value: "5,000 Tx" },
        ],
        githubUrl: "https://github.com/psbharathkumarachari/zk-rollup-batcher",
        architectureLayers: [
          { layerName: "Signature Aggregator", description: "Combines 5,000 BLS signatures to single proof", tech: "BLS12-381" },
          { layerName: "Compressor", description: "Zstandard dictionary calldata packing", tech: "zstd / Rust" },
          { layerName: "Blob Submitter", description: "EIP-4844 Blob transaction builder", tech: "Go / Alloy" },
        ],
      },
    ],
  },
  {
    id: "FULL-STACK",
    title: "FULL-STACK",
    tagline: "High-Throughput Gateways, Telemetry & Real-Time Indexers",
    description:
      "Production infrastructure pipelines combining async Rust microservices, geo-distributed RPC caching proxies, and Substreams indexing engines.",
    accentColor: "#00E599",
    nodePos: [1.7, -1.0, 0],
    projects: [
      {
        id: "proj-rust-rpc-proxy",
        name: "Rust Async RPC Gateway",
        category: "FULL-STACK",
        subtitle: "High-Throughput JSON-RPC Proxy with Dynamic Rate Limiting",
        year: "2025",
        status: "Production",
        description:
          "High-throughput JSON-RPC proxy featuring SIMD JSON parsing, automated health checks, dynamic token bucket rate limiting, and Redis edge caching.",
        techStack: ["Rust", "Tokio", "Hyper", "Redis", "Docker"],
        metrics: [
          { label: "Peak RPS", value: "14,200" },
          { label: "Median Latency", value: "18ms" },
        ],
        githubUrl: "https://github.com/psbharathkumarachari/rust-rpc-gateway",
        architectureLayers: [
          { layerName: "Async Ingestion", description: "Zero-copy Tokio HTTP/WebSocket router", tech: "Hyper / Tokio" },
          { layerName: "Cache Engine", description: "Dynamic TTL state query caching", tech: "Redis Cluster" },
          { layerName: "Upstream Pool", description: "Automated health check load balancer", tech: "Rust" },
        ],
      },
      {
        id: "proj-geo-rpc",
        name: "Geo-Distributed RPC Proxy Engine",
        category: "FULL-STACK",
        subtitle: "Sub-100ms Latency Multi-Region Web3 Infrastructure",
        year: "2025",
        status: "Production",
        description:
          "Anycast geo-routed RPC proxy layer with intelligent query routing, Redis response caching, and automated WebSocket health checks across 6 continents.",
        techStack: ["Rust", "Tokio", "Redis", "Kubernetes", "Cloudflare Anycast", "Prometheus"],
        metrics: [
          { label: "Median Latency", value: "110ms" },
          { label: "Uptime SLA", value: "99.999%" },
        ],
        architectureLayers: [
          { layerName: "Anycast Edge", description: "Global BGP routing to nearest cloud region", tech: "Cloudflare" },
          { layerName: "Proxy Microservice", description: "SIMD JSON query parser & dispatcher", tech: "Rust" },
        ],
      },
      {
        id: "proj-evm-mem-profiler",
        name: "EVM Memory & Execution Profiler",
        category: "FULL-STACK",
        subtitle: "Low-Level CLI Tool for EVM Opcode Gas & Memory Inspection",
        year: "2024",
        status: "Open Source",
        description:
          "Low-level CLI tool written in Rust to inspect memory allocation, gas usage per opcode, and storage slot access patterns in EVM bytecode execution with SVG flamegraph generation.",
        techStack: ["Rust", "EVM Bytecode", "Clap CLI", "Alloy"],
        metrics: [
          { label: "Opcode Precision", value: "100%" },
          { label: "Trace Speed", value: "128k gas/ms" },
        ],
        githubUrl: "https://github.com/psbharathkumarachari/evm-memory-profiler",
        architectureLayers: [
          { layerName: "Disassembler", description: "Converts raw bytecode to annotated opcode stream", tech: "Alloy" },
          { layerName: "Profiler Engine", description: "Tracks stack, memory expansion, and gas consumption", tech: "Rust" },
        ],
      },
    ],
  },
  {
    id: "LEARNING",
    title: "LEARNING",
    tagline: "Technical Curriculum, Research & Open Protocols",
    description:
      "Structured technical curriculum content, research papers, and interactive educational labs developed to train engineers in protocol fundamentals.",
    accentColor: "#F59E0B",
    nodePos: [5.2, -1.0, 0],
    projects: [
      {
        id: "proj-onedev-curriculum",
        name: "ONE DEV Blockchain Engineering Diploma",
        category: "LEARNING",
        subtitle: "Comprehensive Protocol Curriculum & Live Coding Modules",
        year: "2026",
        status: "Educational",
        description:
          "Created and delivered high-quality curriculum content for the Blockchain Engineering Diploma program, leading structured live hands-on coding sessions twice weekly on EVM, WASM, and distributed systems.",
        techStack: ["Solidity", "Rust", "EVM Internals", "WASM", "Curriculum Architecture"],
        metrics: [
          { label: "Mentored Engineers", value: "120+" },
          { label: "Curriculum Modules", value: "14 Modules" },
        ],
        architectureLayers: [
          { layerName: "EVM Fundamentals", description: "Opcode anatomy, memory layout, and gas optimization", tech: "Solidity / Yul" },
          { layerName: "Substrate & WASM", description: "State transition pallets and runtime engineering", tech: "Rust / WASM" },
          { layerName: "System Architecture", description: "P2P networking, consensus, and security audits", tech: "Distributed Systems" },
        ],
      },
      {
        id: "proj-validator-security-research",
        name: "Validator Consensus & Slashing Security",
        category: "LEARNING",
        subtitle: "Research & Implementation on Slashing Prevention in PoS",
        year: "2025",
        status: "Open Source",
        description:
          "Technical research and reference implementation on Remote Signer architecture with HSM key isolation, multi-party consensus check for block signing, and real-time network latency telemetry.",
        techStack: ["Go", "YubiHSM", "Docker", "Prometheus", "libp2p"],
        metrics: [
          { label: "Slashing Occurrences", value: "0" },
          { label: "Protected Staked Assets", value: "$450M+" },
        ],
        architectureLayers: [
          { layerName: "Remote Signer", description: "HSM-isolated cryptographic block signing daemon", tech: "YubiHSM / Go" },
          { layerName: "Slashing Guard", description: "Double-signing detection state cache", tech: "Go / BoltDB" },
        ],
      },
    ],
  },
];
