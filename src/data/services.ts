export interface CapabilityItem {
  capability: string;
  whatItMeans: string;
}

export interface DeliverableItem {
  number: string;
  title: string;
  description: string;
}

export interface EngineeringProof {
  name: string;
  id: string;
  tags: string[];
  problem: string;
  built: string;
  engineering: string[];
  githubUrl?: string;
  demoUrl?: string;
}

export interface ServiceEngagementModel {
  type: "ARCHITECTURE" | "BUILD" | "OPTIMIZE";
  title: string;
  subtitle: string;
  forWho: string;
  includes: string[];
  ctaText: string;
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

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  headline: string;
  shortDescription: string;
  tagline: string;
  whoThisIsFor: string;
  typicalClient: string;
  cardPipeline: string[];
  pipeline: string[];
  technologies: string[];
  scopeCategories?: string[];
  disclaimer?: string;
  whatCanYouBuild: CapabilityItem[];
  deliverablesList: DeliverableItem[];
  proof: EngineeringProof[];
  engagementModels: ServiceEngagementModel[];
  description: string;
  capabilities: string[];
  deliverables: string[];
  relevantProjects: {
    name: string;
    id: string;
    role: string;
    githubUrl?: string;
  }[];
  assemblyModules: string[];
}

type RawServiceItem = Omit<
  ServiceItem,
  "description" | "capabilities" | "deliverables" | "relevantProjects" | "assemblyModules"
>;

const rawServicesData: RawServiceItem[] = [
  {
    id: "srv-protocol-engineering",
    number: "01",
    title: "BLOCKCHAIN PROTOCOL ENGINEERING",
    shortTitle: "PROTOCOL ENGINEERING",
    headline: "Build the protocol layer behind your blockchain system.",
    shortDescription: "Build custom blockchain infrastructure from the protocol layer up.",
    tagline: "Custom L1 / L2 / L3 Infrastructure Built from the Protocol Layer Up",
    whoThisIsFor:
      "Founders building an L1/L2/L3, teams extending an existing chain, or organizations requiring custom execution infrastructure.",
    typicalClient: "Startup building an L1/L2/L3 or enterprise requiring a customized blockchain",
    cardPipeline: ["Runtime", "State", "Execution", "Consensus"],
    pipeline: ["Runtime", "State", "Execution", "Consensus", "Network", "RPC"],
    technologies: ["Rust", "Substrate / Polkadot SDK", "WASM", "EVM", "libp2p", "RocksDB"],
    whatCanYouBuild: [
      {
        capability: "Custom Runtime",
        whatItMeans: "Application-specific blockchain logic without smart-contract overhead",
      },
      {
        capability: "Consensus Engine",
        whatItMeans: "Deterministic validator rules, finality gadgets & forkless upgrade mechanics",
      },
      {
        capability: "EVM Integration",
        whatItMeans: "Ethereum-compatible execution environments & parallel state transition engines",
      },
      {
        capability: "State & Storage",
        whatItMeans: "Optimized RocksDB & Merkle-Patricia Trie storage layers with deterministic state roots",
      },
      {
        capability: "Validators & P2P",
        whatItMeans: "Resilient peer-to-peer gossip mesh topologies & validator network infrastructure",
      },
      {
        capability: "RPC & Node Infrastructure",
        whatItMeans: "High-throughput node interfaces, JSON-RPC endpoints & block propagation pipelines",
      },
    ],
    deliverablesList: [
      {
        number: "01",
        title: "Technical Architecture",
        description: "System blueprint defining state boundaries, trust assumptions, and throughput limits",
      },
      {
        number: "02",
        title: "Protocol Specification",
        description: "Formal RFC-grade specification of execution invariants, data schemas, and API contracts",
      },
      {
        number: "03",
        title: "Production Implementation",
        description: "Modular, memory-safe Rust codebase with clean FRAME pallet separation",
      },
      {
        number: "04",
        title: "Deterministic Test Suite",
        description: "Exhaustive state machine tests, invariant harnesses, and forkless upgrade simulations",
      },
      {
        number: "05",
        title: "Benchmarking & Profiling",
        description: "Execution weight profiling, storage read/write benchmarks, and gas cost modeling",
      },
      {
        number: "06",
        title: "Deployment Configuration",
        description: "Production validator configs, telemetry instrumentation, and Dockerized genesis setups",
      },
      {
        number: "07",
        title: "Architecture Documentation",
        description: "Comprehensive developer docs, validator operation runbooks, and interface references",
      },
      {
        number: "08",
        title: "Knowledge Transfer",
        description: "Guided architectural walkthroughs, core team handover sessions, and code deep-dives",
      },
    ],
    proof: [
      {
        name: "Parallel EVM Execution Engine",
        id: "proj-parallel-evm",
        tags: ["RUST", "EVM", "CONCURRENCY", "EXECUTION"],
        problem:
          "High-throughput transaction processing required a concurrency-aware execution engine without state corruption.",
        built:
          "Parallel multi-threaded transaction scheduler with Software Transactional Memory (STM) conflict detection.",
        engineering: ["Rust", "EVM Bytecode", "STM Concurrency", "Deterministic State"],
        githubUrl: "https://github.com/psbharathkumarachari/parallel-evm-engine",
      },
      {
        name: "Deterministic Consensus Framework",
        id: "proj-consensus-framework",
        tags: ["RUST", "SUBSTRATE", "CONSENSUS", "VALIDATORS"],
        problem:
          "Custom validator consensus required deterministic finality guarantees across heterogeneous network conditions.",
        built:
          "Custom validator voting engine with verifiable state proofs, slashing criteria, and forkless upgrade mechanics.",
        engineering: ["Substrate SDK", "GRANDPA Finality", "Validator Slashing", "libp2p"],
        githubUrl: "https://github.com/psbharathkumarachari/p2p-gossip-sim",
      },
    ],
    engagementModels: [
      {
        type: "ARCHITECTURE",
        title: "ARCHITECTURE",
        subtitle: "Define the system before implementation",
        forWho: "Founders and teams with an idea or partially defined architecture.",
        includes: [
          "Technical discovery & constraints analysis",
          "Protocol architecture & state model design",
          "Consensus & execution trade-off analysis",
          "Comprehensive protocol specification document",
          "Implementation roadmap & resource estimation",
        ],
        ctaText: "DISCUSS ARCHITECTURE →",
      },
      {
        type: "BUILD",
        title: "BUILD",
        subtitle: "Take the system from specification to implementation",
        forWho: "Teams ready to build production blockchain systems.",
        includes: [
          "Production-grade Rust runtime implementation",
          "Deterministic unit & invariant test harnesses",
          "Custom node RPC interfaces & storage layer",
          "Genesis generation & local testnet orchestration",
          "Technical documentation & handover sessions",
        ],
        ctaText: "START BUILD DISCUSSION →",
      },
      {
        type: "OPTIMIZE",
        title: "OPTIMIZE",
        subtitle: "Improve an existing system",
        forWho: "Teams with an existing protocol seeking performance & security tuning.",
        includes: [
          "Runtime weight & execution profiling",
          "State trie storage layout optimization",
          "RPC bottleneck identification & caching proxies",
          "Remediation patches & performance diffs",
          "Stress testing & peer-to-peer benchmarking",
        ],
        ctaText: "REQUEST REVIEW →",
      },
    ],
  },
  {
    id: "srv-smart-contracts",
    number: "02",
    title: "SMART CONTRACT ENGINEERING",
    shortTitle: "SMART CONTRACTS",
    headline: "Production-oriented on-chain systems with comprehensive testing.",
    shortDescription: "Design, develop and test production-ready smart contract systems.",
    tagline: "Production-Ready EVM Contracts, DeFi Protocols & Token Infrastructure",
    whoThisIsFor:
      "DeFi teams, Web3 startups, DAOs and applications requiring production-ready EVM contracts.",
    typicalClient: "DeFi protocols, decentralized platforms, and token ecosystems",
    cardPipeline: ["Architecture", "Contract", "Test", "Deploy"],
    pipeline: ["Architecture", "Smart Contracts", "Unit/Fuzz Tests", "Security Review", "Deployment", "Documentation"],
    technologies: ["Solidity", "Foundry", "Hardhat", "Yul", "Arbitrum Stylus (Rust)", "Slither"],
    whatCanYouBuild: [
      {
        capability: "DeFi Protocols & AMMs",
        whatItMeans: "Capital-efficient automated market makers, liquidity pools, and lending mechanisms",
      },
      {
        capability: "Tokenized Vaults (ERC-4626)",
        whatItMeans: "Standardized yield-bearing vaults with transparent accounting and rebalancing",
      },
      {
        capability: "Arbitrum Stylus (Rust)",
        whatItMeans: "High-performance smart contracts compiled to WebAssembly with native execution speed",
      },
      {
        capability: "Upgradeable Architectures",
        whatItMeans: "Battle-tested proxy patterns (UUPS/Transparent) with immutable storage layout preservation",
      },
      {
        capability: "Governance & Access Control",
        whatItMeans: "Timelock controllers, multi-signature vaults, and granular role-based permissions",
      },
      {
        capability: "Gas Optimization & Yul",
        whatItMeans: "Storage slot packing, assembly routines, and transient storage (EIP-1153) savings",
      },
    ],
    deliverablesList: [
      {
        number: "01",
        title: "Contract Architecture Specification",
        description: "State transition diagrams, interface definitions, and threat boundaries",
      },
      {
        number: "02",
        title: "Production Smart Contracts",
        description: "Clean, documented Solidity & Stylus contracts written to industry standards",
      },
      {
        number: "03",
        title: "Comprehensive Foundry Test Suite",
        description: "Unit, integration, and fork test suites validating every execution path",
      },
      {
        number: "04",
        title: "Property-Based Invariant Tests",
        description: "Automated state-fuzzing fixtures stressing edge cases with millions of iterations",
      },
      {
        number: "05",
        title: "Gas Profiling & Optimization Report",
        description: "Bytecode analysis, storage slot consolidation, and gas consumption comparisons",
      },
      {
        number: "06",
        title: "Deployment Scripts & Verification",
        description: "Deterministic deployment scripts (Foundry/Hardhat) with block explorer verification",
      },
      {
        number: "07",
        title: "Contract Technical Documentation",
        description: "NatSpec documentation, integration guides, and developer references",
      },
      {
        number: "08",
        title: "Integration Handover & ABIs",
        description: "Type-safe ABI exports, client contract hooks, and core team handover walkthrough",
      },
    ],
    proof: [
      {
        name: "Stylus Rust Multi-Token Vault",
        id: "proj-stylus-vault",
        tags: ["RUST", "ARBITRUM STYLUS", "WASM", "ERC-4626"],
        problem:
          "Standard EVM smart contracts suffered from high gas consumption during heavy multi-asset rebalancing computations.",
        built:
          "High-performance tokenized vault implemented in Rust using Arbitrum Stylus SDK, running on WebAssembly.",
        engineering: ["Rust", "Arbitrum Stylus", "WASM Memory", "Multi-Asset Rebalancing"],
        githubUrl: "https://github.com/psbharathkumarachari/stylus-vault-rust",
      },
      {
        name: "Fraud Proof Verification Engine",
        id: "proj-fraud-verifier",
        tags: ["SOLIDITY", "EVM", "ARBITRATION", "SECURITY"],
        problem:
          "Optimistic rollup required verifiable on-chain arbitration for invalid state transition challenges.",
        built:
          "On-chain single-step execution verifier reconstructing memory and storage ops directly inside EVM.",
        engineering: ["Solidity", "Yul Assembly", "Merkle State Verification", "Foundry Invariants"],
        githubUrl: "https://github.com/psbharathkumarachari/fraud-proof-verifier",
      },
    ],
    engagementModels: [
      {
        type: "ARCHITECTURE",
        title: "ARCHITECTURE",
        subtitle: "Define the system before implementation",
        forWho: "Founders and teams with an idea or partially defined architecture.",
        includes: [
          "Contract architecture & state machine design",
          "Tokenomics & access control threat modeling",
          "Upgradeability pattern & proxy selection",
          "Technical specification & interface definitions",
          "Testing & verification plan",
        ],
        ctaText: "DISCUSS ARCHITECTURE →",
      },
      {
        type: "BUILD",
        title: "BUILD",
        subtitle: "Take the system from specification to implementation",
        forWho: "Teams ready to build production-ready smart contracts.",
        includes: [
          "Complete smart contract codebase implementation",
          "Comprehensive Foundry unit & integration test suites",
          "Automated invariant & property-based fuzz tests",
          "Testnet deployment, verification & test execution",
          "NatSpec documentation & client integration guide",
        ],
        ctaText: "START BUILD DISCUSSION →",
      },
      {
        type: "OPTIMIZE",
        title: "OPTIMIZE",
        subtitle: "Improve an existing system",
        forWho: "Teams with existing contracts needing gas reduction or security reviews.",
        includes: [
          "Storage packing & memory expansion audit",
          "Gas consumption profiling & inline Yul rewrites",
          "State invariant verification & edge case fuzzing",
          "Remediation diffs & gas comparison benchmarks",
          "Pre-audit code readiness check",
        ],
        ctaText: "REQUEST REVIEW →",
      },
    ],
  },
  {
    id: "srv-web3-applications",
    number: "03",
    title: "WEB3 APPLICATION ENGINEERING",
    shortTitle: "WEB3 APPLICATIONS",
    headline: "Complete blockchain applications from wallet connection to backend.",
    shortDescription: "Turn blockchain protocols into complete user-facing products.",
    tagline: "Complete User-Facing Products, Reactive DApps & Real-Time Indexers",
    whoThisIsFor:
      "Protocols, dApps, fintech platforms, and Web3 teams needing performant interfaces and indexing.",
    typicalClient: "Protocol teams, DeFi products, and consumer Web3 applications",
    cardPipeline: ["Wallet", "Contract", "Indexer", "Interface"],
    pipeline: ["UX/UI Architecture", "Wallet Orchestration", "Contract Hooks", "Event Indexer", "Production DApp"],
    technologies: ["Next.js 15", "TypeScript", "TailwindCSS", "viem / wagmi", "RainbowKit", "Subsquid", "The Graph", "IPFS"],
    whatCanYouBuild: [
      {
        capability: "Decentralized Applications",
        whatItMeans: "Performance-focused Next.js applications optimized for responsive interaction",
      },
      {
        capability: "Multi-Wallet Orchestration",
        whatItMeans: "Frictionless connection across browser extensions, mobile wallets, and smart accounts",
      },
      {
        capability: "Blockchain Event Indexing",
        whatItMeans: "Real-time custom ledger event listeners, GraphQL APIs, and cached historical data",
      },
      {
        capability: "On-Chain Analytics Dashboards",
        whatItMeans: "Real-time telemetry, transaction status monitors, and protocol health indicators",
      },
      {
        capability: "Decentralized Storage Pipelines",
        whatItMeans: "IPFS / Arweave permanent metadata pinning and decentralized content delivery",
      },
      {
        capability: "Type-Safe Contract Abstractions",
        whatItMeans: "End-to-end type safety with automatic ABI synchronization and wagmi hooks",
      },
    ],
    deliverablesList: [
      {
        number: "01",
        title: "Frontend System Architecture",
        description: "Clean component hierarchy, state management design, and contract interaction patterns",
      },
      {
        number: "02",
        title: "Type-Safe Contract Integration Hooks",
        description: "Wagmi v2 / Viem hooks with automated transaction simulation and error handling",
      },
      {
        number: "03",
        title: "Responsive Web3 Application Repository",
        description: "Modern, high-performance Next.js 15 frontend matching Figma specifications",
      },
      {
        number: "04",
        title: "GraphQL Indexing Schema & API",
        description: "Custom Subsquid or The Graph subgraph indexing on-chain protocol events",
      },
      {
        number: "05",
        title: "Automated E2E Playwright Test Suite",
        description: "End-to-end user flows testing wallet connections, transactions, and state changes",
      },
      {
        number: "06",
        title: "Production Vercel / Cloudflare Setup",
        description: "Edge caching, environment configuration, and automated CI/CD preview pipelines",
      },
      {
        number: "07",
        title: "Component & State Documentation",
        description: "Clear architectural documentation of state flow, hooks, and external dependencies",
      },
      {
        number: "08",
        title: "Deployment & CI/CD Handover",
        description: "Full production deployment, secrets management handover, and team walkthrough",
      },
    ],
    proof: [
      {
        name: "Stylus Vault Interactive Web3 Interface",
        id: "proj-stylus-ui",
        tags: ["NEXT.JS", "TYPESCRIPT", "WAGMI", "VIEM", "TAILWIND"],
        problem:
          "Users needed a seamless, real-time reactive interface to deposit, redeem, and monitor yield on Stylus vaults.",
        built:
          "Type-safe Web3 dashboard with instant transaction simulation, slippage guards, and live APY metrics.",
        engineering: ["Next.js 15", "Wagmi v2", "Viem", "RainbowKit", "TailwindCSS"],
        githubUrl: "https://github.com/psbharathkumarachari/stylus-vault-rust",
      },
      {
        name: "Merkle-Patricia Trie State Inspector",
        id: "proj-merkle-trie",
        tags: ["REACT", "EVM INTERNALS", "STATE VISUALIZER", "ALGORITHMS"],
        problem:
          "Engineers needed an interactive tool to inspect, verify, and debug complex Ethereum trie node hashes.",
        built:
          "Visualizer rendering Leaf, Extension, and Branch trie structures with cryptographic proof validation.",
        engineering: ["TypeScript", "Canvas Graphics", "RLP Encoding", "Cryptographic Proofs"],
        githubUrl: "https://github.com/psbharathkumarachari/mpt-trie-visualizer",
      },
    ],
    engagementModels: [
      {
        type: "ARCHITECTURE",
        title: "ARCHITECTURE",
        subtitle: "Define the system before implementation",
        forWho: "Founders and teams with an idea or partially defined architecture.",
        includes: [
          "User flow & Web3 interaction design",
          "Contract hook & transaction lifecycle design",
          "Indexer & GraphQL schema architecture",
          "Wallet compatibility & network switching spec",
          "Component system & state hierarchy design",
        ],
        ctaText: "DISCUSS ARCHITECTURE →",
      },
      {
        type: "BUILD",
        title: "BUILD",
        subtitle: "Take the system from specification to implementation",
        forWho: "Teams ready to build complete Web3 products.",
        includes: [
          "Turnkey Next.js 15 dApp frontend development",
          "Wagmi v2 & RainbowKit wallet integration",
          "Custom Subsquid / Subgraph event indexer",
          "Automated Playwright E2E transaction testing",
          "Production deployment on Vercel / Cloudflare",
        ],
        ctaText: "START BUILD DISCUSSION →",
      },
      {
        type: "OPTIMIZE",
        title: "OPTIMIZE",
        subtitle: "Improve an existing system",
        forWho: "Teams with an existing dApp looking to improve UX, speed, or indexing.",
        includes: [
          "Frontend performance & re-render profiling",
          "Transaction failure & RPC latency debugging",
          "Indexer query speedup & database caching",
          "Mobile responsive & wallet connection fixes",
          "Codebase refactoring to modern Wagmi / Viem",
        ],
        ctaText: "REQUEST REVIEW →",
      },
    ],
  },
  {
    id: "srv-blockchain-infrastructure",
    number: "04",
    title: "BLOCKCHAIN INFRASTRUCTURE & DEVOPS",
    shortTitle: "INFRASTRUCTURE & DEVOPS",
    headline: "Nodes, RPC, indexing, monitoring and production deployment.",
    shortDescription: "Deploy and operate blockchain infrastructure built for reliability.",
    tagline: "High-Availability RPC Nodes, Custom Indexers & Cluster Orchestration",
    whoThisIsFor:
      "Protocol teams operating validators, RPC infrastructure, indexers and production blockchain networks.",
    typicalClient: "Protocols, validator networks, node operators, and infrastructure providers",
    cardPipeline: ["Node", "RPC", "Cluster", "Telemetry"],
    pipeline: ["Node Provisioning", "Clustering", "RPC Routing", "Telemetry", "CI/CD Automation"],
    technologies: ["Docker", "Kubernetes", "AWS", "Rust / Tokio", "PostgreSQL", "Prometheus", "Grafana", "Redis"],
    whatCanYouBuild: [
      {
        capability: "Validator Infrastructure",
        whatItMeans: "High-security validator setups with sentry node architectures and automated failovers",
      },
      {
        capability: "RPC Gateways & Proxies",
        whatItMeans: "Low-latency (<5ms cached) RPC routing proxies with intelligent load balancing",
      },
      {
        capability: "Dedicated Node Clusters",
        whatItMeans: "Archive, full, and light node deployments across EVM and Substrate ecosystems",
      },
      {
        capability: "Containerization & Orchestration",
        whatItMeans: "Repeatable Docker Compose & Kubernetes manifests for one-command network spinups",
      },
      {
        capability: "Observability & Alerting",
        whatItMeans: "Prometheus metrics scrapers & Grafana dashboards with incident alerts",
      },
      {
        capability: "CI/CD & Release Automation",
        whatItMeans: "Automated binary compilation, testnet deployment, and zero-downtime rolling upgrades",
      },
    ],
    deliverablesList: [
      {
        number: "01",
        title: "Infrastructure Architecture Blueprint",
        description: "Network topology, security isolation zones, and redundancy specifications",
      },
      {
        number: "02",
        title: "Containerized Deployment Manifests",
        description: "Production-ready Docker Compose & Helm / Kubernetes configurations",
      },
      {
        number: "03",
        title: "High-Throughput RPC Proxy Service",
        description: "Rust / Caddy caching proxy with load balancing and rate limiting",
      },
      {
        number: "04",
        title: "Prometheus & Grafana Dashboards",
        description: "Pre-configured telemetry tracking block production, peer count, memory & RPC latency",
      },
      {
        number: "05",
        title: "Automated CI/CD Deployment Pipelines",
        description: "GitHub Actions workflows for automated testing, container builds, and releases",
      },
      {
        number: "06",
        title: "Disaster Recovery & Backup Runbooks",
        description: "Automated snapshot backups, state recovery scripts, and failover protocols",
      },
      {
        number: "07",
        title: "Security Hardening Guide",
        description: "Firewall rules, SSH key policies, sentry node routing, and secrets management",
      },
      {
        number: "08",
        title: "Ops Team Training & Runbook Handover",
        description: "Hands-on operations handover, simulated incident drills, and emergency procedures",
      },
    ],
    proof: [
      {
        name: "High-Speed Rust RPC Gateway",
        id: "proj-rust-rpc",
        tags: ["RUST", "TOKIO", "REDIS", "RPC GATEWAY", "DOCKER"],
        problem:
          "Public RPC nodes struggled with high-concurrency request surges, leading to timeout cascades.",
        built:
          "Lightweight asynchronous RPC proxy in Rust caching static requests in Redis and load balancing across nodes.",
        engineering: ["Rust", "Tokio Async I/O", "Redis Caching", "Health Checking"],
        githubUrl: "https://github.com/psbharathkumarachari/rust-rpc-gateway",
      },
      {
        name: "libp2p Block Propagation Simulator",
        id: "proj-p2p-gossip-sim",
        tags: ["RUST", "LIBP2P", "GOSSIPSUB", "NETWORKING"],
        problem:
          "Understanding mesh network propagation delays under varying geographic latencies and node dropouts.",
        built:
          "Discrete-event simulator modeling GossipSub v1.1 propagation across 100+ concurrent simulated peers.",
        engineering: ["libp2p", "GossipSub v1.1", "Async Channels", "Network Telemetry"],
        githubUrl: "https://github.com/psbharathkumarachari/p2p-gossip-sim",
      },
    ],
    engagementModels: [
      {
        type: "ARCHITECTURE",
        title: "ARCHITECTURE",
        subtitle: "Define the system before implementation",
        forWho: "Founders and teams with an idea or partially defined architecture.",
        includes: [
          "Infrastructure sizing & hardware requirements",
          "Network topology & sentry node security design",
          "Cloud vs bare-metal cost/performance analysis",
          "RPC caching & traffic routing architecture",
          "Disaster recovery & backup strategy",
        ],
        ctaText: "DISCUSS ARCHITECTURE →",
      },
      {
        type: "BUILD",
        title: "BUILD",
        subtitle: "Take the system from specification to implementation",
        forWho: "Teams ready to deploy high-availability infrastructure.",
        includes: [
          "Full cluster deployment (Docker / Kubernetes)",
          "Low-latency RPC caching proxy setup",
          "Prometheus & Grafana telemetry dashboards",
          "Automated backup & snapshot automation",
          "Comprehensive operations runbooks & handover",
        ],
        ctaText: "START BUILD DISCUSSION →",
      },
      {
        type: "OPTIMIZE",
        title: "OPTIMIZE",
        subtitle: "Improve an existing system",
        forWho: "Teams with existing node infrastructure suffering from latency or outages.",
        includes: [
          "RPC response time & bottleneck profiling",
          "Node synchronization speedup & database tuning",
          "Security audit of firewall & sentry network",
          "Cost optimization across cloud providers",
          "Failover testing & automated recovery tuning",
        ],
        ctaText: "REQUEST REVIEW →",
      },
    ],
  },
  {
    id: "srv-protocol-review",
    number: "05",
    title: "PROTOCOL REVIEW & OPTIMIZATION",
    shortTitle: "PROTOCOL REVIEW",
    headline: "Performance, execution, storage and architecture analysis.",
    shortDescription: "Find bottlenecks, correctness issues and unnecessary execution costs before production.",
    tagline: "State Invariant Verification, Gas Profiling & System Bottleneck Remediation",
    disclaimer: "Technical reviews are limited to the agreed engineering scope and do not constitute a formal third-party security audit.",
    whoThisIsFor:
      "Teams with an existing protocol, contract or infrastructure stack preparing for mainnet or scaling.",
    typicalClient: "Protocols, DeFi projects, node infrastructure teams, and scaling L2s",
    cardPipeline: ["Threat Model", "Test", "Profile", "Remediate"],
    pipeline: ["Threat Modeling", "Invariant Harnesses", "Profiling", "Analysis", "Remediation Diffs"],
    technologies: ["Foundry Invariants", "EVM Bytecode", "Yul", "Slither", "Rust Profiling", "Valgrind", "Echidna"],
    scopeCategories: ["Smart Contracts", "Runtime", "Consensus", "Execution", "Storage", "RPC", "Infrastructure"],
    whatCanYouBuild: [
      {
        capability: "State Invariant Analysis",
        whatItMeans: "Validating that critical protocol invariants hold across complex multi-step state transitions",
      },
      {
        capability: "Runtime & Consensus Review",
        whatItMeans: "Inspecting state transition logic, validator weighting, and finality boundaries",
      },
      {
        capability: "Gas & Weight Optimization",
        whatItMeans: "Profiling storage slot layouts, eliminating quadratic memory growth, and inline Yul tuning",
      },
      {
        capability: "RPC & Node Concurrency",
        whatItMeans: "Uncovering thread bottlenecks, mutex contention, and unindexed database queries",
      },
      {
        capability: "Fuzzing & Property Harnesses",
        whatItMeans: "Configuring property-based test suites that stress edge cases with millions of iterations",
      },
      {
        capability: "Storage & State Profiling",
        whatItMeans: "Analyzing trie read/write overhead and benchmarking disk I/O bottlenecks",
      },
    ],
    deliverablesList: [
      {
        number: "01",
        title: "Comprehensive Review Findings Report",
        description: "Detailed breakdown of execution bottlenecks, invariant violations, and gas inefficiencies",
      },
      {
        number: "02",
        title: "Vulnerability & Bottleneck Severity Matrix",
        description: "Prioritized severity categorization (Critical, High, Medium, Optimization) with impact analysis",
      },
      {
        number: "03",
        title: "Executable Exploit / Failing Invariant PoCs",
        description: "Reproducible test cases demonstrating discovered edge cases in automated harnesses",
      },
      {
        number: "04",
        title: "Direct Remediation Code Patches",
        description: "Production-ready Git diffs and pull requests fixing identified vulnerabilities and bottlenecks",
      },
      {
        number: "05",
        title: "Gas & Memory Profiling Comparison Data",
        description: "Empirical before-and-after benchmarks measuring gas consumption and memory savings",
      },
      {
        number: "06",
        title: "Long-Term Property Test Harnesses",
        description: "CI-ready Foundry invariant test suites for continuous regression prevention",
      },
      {
        number: "07",
        title: "Security Invariant Documentation",
        description: "Formal documentation of system assumptions, trust boundaries, and verified invariants",
      },
      {
        number: "08",
        title: "Live Findings Walkthrough & Remediation Sync",
        description: "Direct video session with core developers walking through every finding and fix",
      },
    ],
    proof: [
      {
        name: "EVM Memory & Storage Profiler",
        id: "proj-evm-profiler",
        tags: ["YUL", "EVM BYTECODE", "GAS PROFILING", "STORAGE"],
        problem:
          "Smart contracts suffered from hidden quadratic memory expansion gas costs during batch operations.",
        built:
          "Bytecode analysis tool identifying unaligned storage slots, memory allocation spikes, and optimization diffs.",
        engineering: ["EVM Opcodes", "Bytecode Decompilation", "Gas Tracking", "Yul"],
        githubUrl: "https://github.com/psbharathkumarachari/evm-memory-profiler",
      },
      {
        name: "ZK-Rollup State Batcher & Verifier",
        id: "proj-zk-batcher",
        tags: ["ROLLUPS", "ZK PROOFS", "STATE BATCHING", "SECURITY"],
        problem:
          "Validating that batch commitment transactions correctly enforced state root transition invariants.",
        built:
          "Invariant test harness simulating malicious operator injections and invalid Merkle state transitions.",
        engineering: ["Foundry Invariants", "Merkle Trees", "Fuzzing", "Solidity"],
        githubUrl: "https://github.com/psbharathkumarachari/zk-rollup-batcher",
      },
    ],
    engagementModels: [
      {
        type: "ARCHITECTURE",
        title: "ARCHITECTURE",
        subtitle: "Define the system before implementation",
        forWho: "Founders and teams with an idea or partially defined architecture.",
        includes: [
          "Pre-implementation threat modeling",
          "State invariant & trust boundary specification",
          "Economic attack vector analysis",
          "Verification & testing strategy roadmap",
          "Architectural review recommendations",
        ],
        ctaText: "DISCUSS ARCHITECTURE →",
      },
      {
        type: "BUILD",
        title: "BUILD",
        subtitle: "Take the system from specification to implementation",
        forWho: "Teams ready to build comprehensive verification harnesses.",
        includes: [
          "Custom invariant & property fuzzing harness development",
          "Automated regression test suite integration",
          "Automated static analysis CI pipeline setup",
          "Gas profiling & benchmark test fixtures",
          "Testing documentation & team training",
        ],
        ctaText: "START BUILD DISCUSSION →",
      },
      {
        type: "OPTIMIZE",
        title: "OPTIMIZE",
        subtitle: "Improve an existing system",
        forWho: "Teams with an existing protocol, contract or infrastructure stack.",
        includes: [
          "Comprehensive protocol review across agreed scope",
          "Executable proof-of-concept demonstrations",
          "Direct remediation code patches (Git diffs)",
          "Gas & memory optimization rewrites",
          "Live findings walkthrough & remediation sync",
        ],
        ctaText: "REQUEST REVIEW →",
      },
    ],
  },
  {
    id: "srv-technical-architecture",
    number: "06",
    title: "TECHNICAL ARCHITECTURE & ADVISORY",
    shortTitle: "SYSTEM ARCHITECTURE",
    headline: "Architectural strategy, system specifications and proof-of-concept validation.",
    shortDescription: "Turn an idea into an implementable technical architecture.",
    tagline: "Turn an Idea into a Technical Architecture Ready for Implementation",
    whoThisIsFor:
      "Founders, CTOs, and protocol teams making critical foundational decisions before writing code.",
    typicalClient: "Founders, CTOs, enterprise blockchain leads, and protocol architects",
    cardPipeline: ["Problem", "Constraints", "Architecture", "PoC"],
    pipeline: ["Problem Definition", "Constraints Analysis", "Architecture Specification", "PoC Validation", "Roadmap"],
    technologies: ["System Design", "Substrate / Polkadot", "EVM / L2s", "Distributed Systems", "Rust", "RFC Specs"],
    whatCanYouBuild: [
      {
        capability: "L1 / L2 / L3 Selection",
        whatItMeans: "Objective trade-off analysis between app-chains, rollups, sovereign runtimes, and smart contracts",
      },
      {
        capability: "Consensus & State Design",
        whatItMeans: "Formulating custom validator rules, finality mechanisms, and deterministic state models",
      },
      {
        capability: "Token & Protocol Architecture",
        whatItMeans: "Designing mathematically sound incentive mechanisms, bonding curves, and governance flows",
      },
      {
        capability: "Technical Specification (RFC)",
        whatItMeans: "Authoring comprehensive, developer-ready technical blueprints with state diagrams",
      },
      {
        capability: "Proof-of-Concept Development",
        whatItMeans: "Rapidly building a minimal working prototype to validate feasibility before full build",
      },
      {
        capability: "Engineering Roadmap",
        whatItMeans: "De-risking delivery with clear technical milestones, dependency ordering, and hiring profiles",
      },
    ],
    deliverablesList: [
      {
        number: "01",
        title: "System Architecture Blueprint",
        description: "RFC-grade document detailing components, data flow, trust model, and interfaces",
      },
      {
        number: "02",
        title: "Threat Model & Security Invariant Spec",
        description: "Formal specification of security invariants, failure modes, and threat mitigations",
      },
      {
        number: "03",
        title: "Technology Trade-off Matrix",
        description: "Objective evaluation of framework, database, network, and consensus options",
      },
      {
        number: "04",
        title: "Executable Proof-of-Concept (PoC)",
        description: "Minimal working prototype proving critical architectural assumptions in code",
      },
      {
        number: "05",
        title: "Data Flow & State Diagrams",
        description: "Visual architectural diagrams illustrating transaction lifecycles and state transitions",
      },
      {
        number: "06",
        title: "Interface & API Definitions",
        description: "Formal RPC schemas, contract interfaces, and client integration specifications",
      },
      {
        number: "07",
        title: "Phased Implementation Roadmap",
        description: "Milestone-by-milestone engineering plan with timeline and team composition guidance",
      },
      {
        number: "08",
        title: "Advisory & Steering Sessions",
        description: "Direct advisory calls during project kickoff, investor pitches, or engineering milestones",
      },
    ],
    proof: [
      {
        name: "ZK-Rollup State Batcher & Proof Architecture",
        id: "proj-zk-batcher",
        tags: ["ARCHITECTURE", "L2 ROLLUPS", "STATE PROOFS", "SPECIFICATION"],
        problem:
          "Architecting a scalable L2 state commitment pipeline with fraud-proofable dispute windows.",
        built:
          "End-to-end architecture specification and prototype batching state transitions with Merkle proofs.",
        engineering: ["L2 Protocol Design", "State Merkle Trees", "Dispute Windows", "RFC Document"],
        githubUrl: "https://github.com/psbharathkumarachari/zk-rollup-batcher",
      },
      {
        name: "Parallel EVM Execution Engine Blueprint",
        id: "proj-parallel-evm",
        tags: ["ARCHITECTURE", "PARALLEL EVM", "STM", "BENCHMARKING"],
        problem:
          "Designing a high-throughput execution architecture eliminating single-threaded EVM bottleneck.",
        built:
          "Complete architectural specification, memory safety constraints, and benchmarked Rust prototype.",
        engineering: ["Concurrency Calculus", "State Access Lists", "Conflict Graph", "Rust"],
        githubUrl: "https://github.com/psbharathkumarachari/parallel-evm-engine",
      },
    ],
    engagementModels: [
      {
        type: "ARCHITECTURE",
        title: "ARCHITECTURE",
        subtitle: "Define the system before implementation",
        forWho: "Founders and teams with an idea or partially defined architecture.",
        includes: [
          "Full system architecture & protocol design",
          "Technology & framework selection matrix",
          "RFC-grade technical specification document",
          "Threat modeling & invariant specification",
          "Engineering delivery roadmap & milestone planning",
        ],
        ctaText: "DISCUSS ARCHITECTURE →",
      },
      {
        type: "BUILD",
        title: "BUILD",
        subtitle: "Take the system from specification to implementation",
        forWho: "Teams ready to validate architecture with working software.",
        includes: [
          "Rapid proof-of-concept (PoC) development",
          "Critical path benchmark & feasibility tests",
          "Architecture validation & failure mode testing",
          "Developer-ready repository & documentation",
          "Handover to internal engineering team",
        ],
        ctaText: "START BUILD DISCUSSION →",
      },
      {
        type: "OPTIMIZE",
        title: "OPTIMIZE",
        subtitle: "Improve an existing system",
        forWho: "Teams with an existing system facing architectural bottlenecks or scaling limits.",
        includes: [
          "Holistic system architecture review",
          "Scalability bottleneck & constraint analysis",
          "Re-architecture recommendations & migration plan",
          "Technical debt & maintenance audit",
          "Executive summary for founders and investors",
        ],
        ctaText: "REQUEST REVIEW →",
      },
    ],
  },
];

// Export fully typed servicesData with guaranteed populated fields
export const servicesData: ServiceItem[] = rawServicesData.map((s) => ({
  ...s,
  description: s.shortDescription,
  capabilities: s.whatCanYouBuild.map((c) => c.capability),
  deliverables: s.deliverablesList.map((d) => `${d.number} ${d.title}: ${d.description}`),
  relevantProjects: s.proof.map((p) => ({
    name: p.name,
    id: p.id,
    role: "Protocol / Systems Engineer",
    githubUrl: p.githubUrl,
  })),
  assemblyModules: s.cardPipeline,
}));

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
    tagline: "System Design & Proof-of-Concept",
    description:
      "Formulate deterministic state machine invariants, consensus rules, storage layouts, and API boundaries. Prototype critical paths to validate performance constraints.",
    deliverable: "System Architecture Blueprint (RFC) & Feasibility PoC Code",
  },
  {
    number: "03",
    title: "ENGINEER",
    tagline: "Deterministic Production Implementation",
    description:
      "Implement production-grade Rust, Solidity, or Go systems with strict zero-cost abstractions, memory safety, and comprehensive inline documentation.",
    deliverable: "Modular Production Codebase & Automated Build Tooling",
  },
  {
    number: "04",
    title: "VERIFY",
    tagline: "Fuzzing, Invariants & Security Profiling",
    description:
      "Stress state transition machines with Foundry invariant fuzzing, Echidna property tests, differential testing, and bytecode memory/gas profiling.",
    deliverable: "Comprehensive Invariant Test Suite & Verification Report",
  },
  {
    number: "05",
    title: "OPERATE",
    tagline: "Deployment, Telemetry & Mainnet Transition",
    description:
      "Deploy deterministic binaries to production networks, establish Prometheus metrics scrapers, Grafana dashboards, and execute live state handovers.",
    deliverable: "Production Mainnet Deployment & Real-Time Telemetry Dashboard",
  },
];

export const engagementModelsData: EngagementModel[] = [
  {
    id: "eng-architecture",
    number: "01",
    title: "SYSTEM ARCHITECTURE & ADVISORY",
    subtitle: "Turn an idea into an implementable technical architecture",
    idealFor: "Founders, CTOs, and protocol teams making critical foundational decisions",
    scopeType: "Strategic Technical Advisory",
    commitment: "Sprint / Milestone-Based",
    deliverables: [
      "System Architecture Document (RFC)",
      "Threat Model & Security Invariant Spec",
      "Technology Trade-off Matrix",
      "Engineering Delivery Roadmap",
    ],
  },
  {
    id: "eng-build",
    number: "02",
    title: "CORE ENGINEERING & IMPLEMENTATION",
    subtitle: "Take the system from specification to production implementation",
    idealFor: "Protocols and teams ready to build high-throughput infrastructure",
    scopeType: "Dedicated Engineering Execution",
    commitment: "Sprint / Milestone-Based",
    deliverables: [
      "Production-Grade Rust / Solidity / Go Codebase",
      "Automated Unit, Fork & Invariant Test Harnesses",
      "Deployment Scripts & Verified Network Artifacts",
      "Comprehensive Developer & Operations Runbooks",
    ],
  },
  {
    id: "eng-review",
    number: "03",
    title: "PROTOCOL REVIEW & PERFORMANCE TUNING",
    subtitle: "Find bottlenecks, correctness issues and unnecessary execution costs",
    idealFor: "Teams with existing systems preparing for mainnet launch or scaling",
    scopeType: "Targeted Invariant & Performance Review",
    commitment: "Fixed Scope Sprint",
    deliverables: [
      "Comprehensive Findings Report & Severity Matrix",
      "Executable Exploit / Failing Invariant PoCs",
      "Direct Remediation Code Patches (Git Diffs)",
      "Gas & Memory Profiling Comparison Benchmarks",
    ],
  },
];

