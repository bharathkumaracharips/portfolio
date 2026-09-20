export interface CourseTopicGroup {
  number: string;
  title: string;
  note?: string;
  subgroups?: {
    subtitle: string;
    items: string[];
  }[];
  items?: string[];
}

export interface CapstoneOption {
  code: string;
  title: string;
  description: string;
  tag: string;
}

export interface CourseModuleData {
  id: string;
  number: string;
  title: string;
  weeks: string;
  headlineNote?: string;
  learningObjectives?: string[];
  sections: CourseTopicGroup[];
  modernSolidityNote?: {
    title: string;
    description: string;
    highlightPill?: string;
  };
  tools?: string[];
  deliverables?: string[];
  capstoneProjects?: CapstoneOption[];
  capstoneDeliverables?: string[];
}

export type CourseTrackCategory = "BLOCKCHAIN" | "PROGRAMMING" | "CORE_SUBJECTS";

export interface CourseCategoryMeta {
  id: CourseTrackCategory;
  title: string;
  shortLabel: string;
  tagline: string;
  badge: string;
  count: number;
}

export const courseCategoryList: CourseCategoryMeta[] = [
  {
    id: "BLOCKCHAIN",
    title: "Blockchain & Protocols",
    shortLabel: "BLOCKCHAIN",
    tagline: "Smart contract security, L0–L3 modular runtimes, and Substrate app-chains",
    badge: "3 PROGRAMS",
    count: 3,
  },
  {
    id: "PROGRAMMING",
    title: "Systems Programming",
    shortLabel: "PROGRAMMING",
    tagline: "Memory safety without GC, high-concurrency event loops, and native runtimes",
    badge: "2 PROGRAMS",
    count: 2,
  },
  {
    id: "CORE_SUBJECTS",
    title: "Core Computer Science",
    shortLabel: "CORE SUBJECTS",
    tagline: "Operating systems, kernel internals, and peer-to-peer network protocols",
    badge: "2 PROGRAMS",
    count: 2,
  },
];

export interface CourseCapability {
  number: string;
  role: string; // "Design", "Engineer", "Secure", "Architect", "Ship"
  title: string;
  description: string;
}

export interface CourseJourneyStage {
  stageNumber: string;
  stageName: string;
  weeks: string;
  objective: string;
  technologies: string[];
  project: string;
  competency: string;
}

export interface CourseProject {
  number: string;
  title: string;
  weeks: string;
  type: string;
  learn: string;
  build: string;
  prove: string;
  tech: string[];
}

export interface CourseAudience {
  idealFor: string[];
  notIdealFor: string[];
}

export interface CoursePrerequisites {
  required: string[];
  helpful: string[];
  notRequired: string[];
}

export interface CourseMentorshipStep {
  step: string;
  title: string;
  action: string;
  deliverable: string;
  detail: string;
}

export interface CourseCapstone {
  title: string;
  subtitle: string;
  description: string;
  systemComponents: {
    name: string;
    role: string;
  }[];
  qualityGate: string;
  deliverables: {
    number: string;
    title: string;
    description: string;
  }[];
}

export interface ArchitectureNodeDetail {
  title: string;
  role: string;
  concepts: string[];
}

export interface ArchitectureNode {
  id: string;
  label: string;
  sublabel: string;
  category: "input" | "process" | "storage" | "output" | "runtime";
  detail: ArchitectureNodeDetail;
}

export interface CourseArchitectureDiagramData {
  title: string;
  subtitle: string;
  nodes: ArchitectureNode[];
}

export interface CourseInspectionDetail {
  courseId: string;
  capabilities: CourseCapability[];
  journey: CourseJourneyStage[];
  projects: CourseProject[];
  audience: CourseAudience;
  prerequisites: CoursePrerequisites;
  mentorshipModel: CourseMentorshipStep[];
  capstone: CourseCapstone;
  architectureDiagram: CourseArchitectureDiagramData;
  moduleLabs?: Record<
    string,
    {
      lab: { title: string; subtitle: string; description: string };
      prove: string;
      skillsAcquired: string[];
    }
  >;
}

export interface CourseCatalogItem {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  tagline: string;
  category: string;
  trackGroup: "BLOCKCHAIN" | "PROGRAMMING" | "CORE_SUBJECTS";
  trackGroupName: string;
  badge: string;
  duration: string;
  totalWeeks: number;
  level: string;
  compilerTarget: string;
  author: string;
  authorRole: string;
  description: string;
  highlights: string[];
  keyTopics: string[];
  tools: string[];
  stats: {
    duration: string;
    toolchain: string;
    securityOrFocus: string;
    capstone: string;
  };
  outcomes: {
    title: string;
    desc: string;
  }[];
  deliverables: string[];
  modules: CourseModuleData[];
}

// -----------------------------------------------------------------------------
// COURSE 1: SOLIDITY SMART CONTRACT & PROTOCOL ENGINEERING
// -----------------------------------------------------------------------------
export const bkaSolidityModules: CourseModuleData[] = [
  {
    id: "mod-01",
    number: "01",
    title: "Blockchain Foundations & Solidity Essentials",
    weeks: "Weeks 1–4",
    headlineNote: "EVM state transition, cryptographic primitives & idiomatic Solidity 0.8.37 syntax.",
    learningObjectives: [
      "Understand blockchain fundamentals, peer-to-peer networks and distributed ledger systems.",
      "Understand centralized, decentralized, and distributed consensus architectures.",
      "Learn PoW, PoS, DPoS and validator-based consensus finality models.",
      "Understand cryptographic hashing, digital signatures, public/private keys and wallets.",
      "Understand Ethereum Virtual Machine (EVM) architecture, opcodes and state tries.",
      "Understand Ethereum accounts, transactions, gas metering, calldata, memory and storage.",
      "Set up a professional Solidity development environment with Foundry and Hardhat.",
      "Write, test, debug and deploy your first production-grade Solidity smart contracts.",
    ],
    sections: [
      {
        number: "1",
        title: "Introduction to Blockchain Technology",
        items: [
          "History and evolution of decentralized state machines",
          "Centralized vs decentralized systems",
          "Permissioned vs permissionless networks",
          "Deterministic state execution & transition functions",
          "Blocks, transactions, gas limits and state commitments",
          "Blockchain finality, forks and chain reorganizations",
        ],
      },
      {
        number: "2",
        title: "Blockchain Architecture & Consensus Mechanics",
        items: [
          "Blocks, transaction receipts and Patricia Merkle Trees",
          "P2P networking, gossip protocols and node topology",
          "Miners vs validators and block proposer algorithms",
          "Proof of Work vs Proof of Stake (LMD-GHOST / Casper FFG)",
          "Finality concepts: probabilistic vs deterministic finality",
        ],
      },
      {
        number: "3",
        title: "Ethereum & EVM Architecture",
        items: [
          "Ethereum as a global decentralized state machine",
          "EOA (Externally Owned Accounts) vs Contract Accounts",
          "Gas mechanics: base fee, priority fee (EIP-1559), gas limits",
          "EVM memory hierarchy: Stack, Memory, Calldata, Storage, Transient Storage",
          "EVM bytecode execution and standard opcodes",
          "Ethereum world state, storage tries and receipt trees",
        ],
      },
      {
        number: "4",
        title: "Solidity Essentials & Core Syntax",
        items: [
          "Solidity pragmas, compiler versions and compilation targets",
          "Contract structure, state variables, local variables and global variables",
          "Value types: uint, int, bool, address, address payable, bytes1-bytes32",
          "Reference types: strings, bytes, fixed-size arrays, dynamic arrays, structs, mappings",
          "Nested mappings and iterable mapping patterns",
          "Variable scoping, constants and immutable variables",
          "Function visibility: public, external, internal, private",
          "State mutability: view, pure, payable, non-payable",
          "Custom function modifiers and execution flow",
          "Constructors and contract initialization",
          "Custom errors (revert CustomError()) vs require/assert string reverts",
          "Events, indexed parameters, bloom filters and emit semantics",
          "Receive and fallback functions with low-level calldata handling",
        ],
      },
    ],
    modernSolidityNote: {
      title: "Modern Solidity Toolchain",
      description: "Targets latest stable Solidity 0.8.37 with --via-ir optimizer pipeline, custom errors, and push0 opcode compatibility.",
      highlightPill: "Solidity 0.8.37 Stable",
    },
    tools: ["Foundry", "Hardhat", "Remix IDE", "VS Code", "MetaMask", "Alchemy", "Etherscan API"],
    deliverables: [
      "Deploy deterministic Simple Storage contract with access control",
      "Build production Counter contract with custom revert errors",
      "Multi-owner Treasury contract with role-based withdraw rules",
      "Comprehensive Foundry test suite with 100% statement coverage",
    ],
  },
  {
    id: "mod-02",
    number: "02",
    title: "Professional Smart Contract Development",
    weeks: "Weeks 5–8",
    headlineNote: "ERC token standards, OpenZeppelin architecture, transient storage & proxy patterns.",
    learningObjectives: [
      "Master ERC-20, ERC-721, ERC-1155, and ERC-4626 Tokenized Vault standards.",
      "Integrate OpenZeppelin contract libraries securely and avoid common anti-patterns.",
      "Understand EVM storage packing, slot layout, storage collisions, and transient storage (EIP-1153).",
      "Architect upgradeable contracts: Transparent, UUPS, and Diamond Proxy (ERC-2535).",
      "Build comprehensive automated unit, integration, and fuzz testing pipelines in Foundry.",
    ],
    sections: [
      {
        number: "1",
        title: "ERC Standards & Token Engineering",
        items: [
          "ERC-20 standard: balances, allowances, transferFrom, approve-spend race conditions",
          "ERC-721 NFT standard: tokenURI, minting, transfer security and royalty hooks (ERC-2981)",
          "ERC-1155 Multi-Token standard: batch transfers and gas efficiency",
          "ERC-2612 Permit: gasless approvals via EIP-712 typed cryptographic signatures",
          "ERC-4626 Tokenized Vaults: shares, assets, deposit, withdraw, and yield accrual math",
        ],
      },
      {
        number: "2",
        title: "OpenZeppelin & Reusable Architectures",
        items: [
          "Ownable2Step vs AccessControl with role-based administration",
          "Pausable, ReentrancyGuard, and SafeERC20 defensive wrappers",
          "Contract interfaces, abstract contracts, and library link mechanics",
          "Upgradeable contracts: delegatecall mechanics and proxy patterns",
          "Transparent Proxy vs UUPS (Universal Upgradeable Proxy Standard)",
          "Storage slots, namespaced storage (ERC-7201), and avoiding upgrade collisions",
        ],
      },
      {
        number: "3",
        title: "Solidity Storage & Data Locations",
        note: "Critical curriculum focus on EVM memory hierarchy and gas-efficient storage slot layout.",
        items: [
          "Storage layout: 32-byte slots, tight variable packing, mapping slot hashing (keccak256)",
          "Transient Storage (TSTORE & TLOAD opcodes from EIP-1153)",
          "Memory vs Calldata slicing in modern Solidity",
          "Storage pointer mechanics vs memory copies",
        ],
      },
      {
        number: "4",
        title: "Foundry & Hardhat Testing Harnesses",
        subgroups: [
          {
            subtitle: "Foundry Forge Framework",
            items: [
              "Forge test runners, test assertions, expectRevert, and vm.expectEmit",
              "Foundry Cheatcodes: vm.prank, vm.deal, vm.warp, vm.roll, vm.store",
              "Stateless property-based Fuzz testing with random input bounds",
              "Mainnet fork testing with pin-point block simulation",
            ],
          },
          {
            subtitle: "Hardhat Framework",
            items: [
              "Hardhat project configuration, TypeScript scripts, and typechain bindings",
              "Deployment automation and verified source verification scripts",
            ],
          },
        ],
      },
    ],
    tools: ["Foundry", "Hardhat", "OpenZeppelin", "TypeChain", "Ethers.js / Viem"],
    deliverables: [
      "Production ERC-20 Token with EIP-2612 Permit & Gasless Meta-Transactions",
      "Full ERC-721 NFT Collection with IPFS metadata & Merkle whitelist minting",
      "ERC-4626 Tokenized Yield Vault with deposit/redeem share mechanics",
      "Upgradeable UUPS Contract with automated upgrade test verification",
    ],
  },
  {
    id: "mod-03",
    number: "03",
    title: "Smart Contract Security, Auditing & DeFi Architecture",
    weeks: "Weeks 9–12",
    headlineNote: "Invariant testing, Slither/Echidna auditing, flash loans & DeFi protocol mechanics.",
    learningObjectives: [
      "Analyze historical Web3 exploits: reentrancy, oracle manipulation, flash loans, and access control bugs.",
      "Run static analysis tools (Slither) and automated fuzzers (Echidna) against protocol codebases.",
      "Design and execute stateful Invariant Testing in Foundry to prove mathematical system invariants.",
      "Architect decentralized finance primitives: Uniswap-style AMMs, staking engines, and lending protocols.",
      "Write formal smart contract audit reports with severity classifications and remediation proofs.",
    ],
    sections: [
      {
        number: "1",
        title: "Smart Contract Vulnerabilities & Attack Vectors",
        items: [
          "Reentrancy attacks: Single-function, cross-function, and cross-contract reentrancy",
          "Oracle manipulation attacks and flash loan spot-price distortions",
          "Arithmetic overflow/underflow and unsafe downcasting",
          "Access control failures and uninitialized proxy logic",
          "Frontrunning, MEV (Maximal Extractable Value), and sandwich attacks",
          "Signature replay attacks and missing replay protection (EIP-712)",
          "Denial of Service (DoS): gas exhaustion, unexpected reverts, and griefing",
        ],
      },
      {
        number: "2",
        title: "Security Auditing & Formal Invariant Testing",
        items: [
          "Static analysis workflows using Slither and custom AST detectors",
          "Stateful Invariant testing in Foundry with handler-based test harness design",
          "Echidna property-based fuzzing with invariant assertions",
          "Threat modeling, system state invariants, and attack surface mapping",
          "Writing professional audit findings: Title, Severity, Impact, PoC, Remediation",
        ],
      },
      {
        number: "3",
        title: "DeFi Protocol Architecture",
        items: [
          "Constant Product Automated Market Maker (Uniswap v2 x*y=k formula)",
          "Liquidity provision, LP token mint/burn math, and 0.3% fee collection",
          "Slippage protection, deadlocks, and minimum output validation",
          "Collateralized lending pools: collateral factors, borrow index, and liquidation math",
          "Chainlink decentralized price feeds, heartbeat checks, and stale round guards",
          "Flash loans: borrowing without upfront collateral and deterministic repayment",
        ],
      },
    ],
    tools: ["Slither", "Echidna", "Foundry Invariants", "Chainlink", "Uniswap v2/v3 Core", "DefiLlama"],
    deliverables: [
      "Custom Automated Market Maker (AMM) with LP pool, swap math, and fee accounting",
      "Decentralized Staking & Reward Distribution Protocol with linear reward decay",
      "Automated Foundry Invariant Handler Suite proving protocol solvency",
      "Formal Smart Contract Security Audit Report with runnable exploit PoCs",
    ],
  },
  {
    id: "mod-04",
    number: "04",
    title: "Advanced Protocol Engineering & Capstone Project",
    weeks: "Weeks 13–16",
    headlineNote: "Layer-2 scaling, Arbitrum Stylus (WASM), account abstraction & production capstone.",
    learningObjectives: [
      "Understand Layer-2 scaling: Optimistic Rollups vs ZK-Rollups, bridges, and cross-domain messaging.",
      "Explore Arbitrum Stylus: writing high-performance smart contracts in Rust compiled to WebAssembly.",
      "Implement Account Abstraction (ERC-4337): smart contract wallets, bundlers, and paymasters.",
      "Execute an end-to-end production Capstone project with complete architecture, tests, and documentation.",
      "Prepare for high-paying protocol engineering and smart contract auditing careers.",
    ],
    sections: [
      {
        number: "1",
        title: "Layer-2 Rollups & Scaling Architecture",
        items: [
          "The scalability trilemma and Layer-1 throughput constraints",
          "Optimistic Rollups (Arbitrum, Optimism): Sequencers, fraud proofs, challenge periods",
          "Zero-Knowledge Rollups (zkSync, Starknet, Scroll): zk-SNARKs/STARKs & validity proofs",
          "L1-to-L2 canonical bridges, cross-chain messaging, and message relayers",
        ],
      },
      {
        number: "2",
        title: "Arbitrum Stylus & Next-Gen Smart Contracts",
        items: [
          "Stylus architecture: EVM + WASM co-processor execution on Arbitrum",
          "Writing high-throughput smart contracts in Rust with Stylus SDK",
          "Gas benchmarking: Rust/WASM vs native EVM bytecode execution",
          "Interoperability between Solidity EVM contracts and Rust Stylus modules",
        ],
      },
      {
        number: "3",
        title: "Account Abstraction (ERC-4337)",
        items: [
          "EOA limitations vs Smart Contract Accounts",
          "UserOperations, Bundlers, EntryPoint contract architecture",
          "Paymasters for gas sponsorship (gasless dApps) and custom fee tokens",
          "Social recovery, session keys, and multisig validation logic",
        ],
      },
    ],
    tools: ["Arbitrum Stylus SDK", "Rust", "Foundry", "ERC-4337 EntryPoint", "Biconomy", "Alchemy AA"],
    capstoneProjects: [
      {
        code: "CAP-01",
        title: "Decentralized Exchange (DEX AMM)",
        description: "Constant product automated market maker with router, liquidity staking, flash swaps, and automated fee distribution.",
        tag: "DeFi Infrastructure",
      },
      {
        code: "CAP-02",
        title: "Collateralized Lending & Borrowing Protocol",
        description: "Over-collateralized loan protocol with interest rate curves, oracle price feeds, and automated liquidation bot integration.",
        tag: "Lending Primitives",
      },
      {
        code: "CAP-03",
        title: "NFT Marketplace with Auction Engine",
        description: "Order-book / Dutch auction NFT trading protocol with royalty enforcement, lazy minting, and signature-based trades.",
        tag: "Digital Assets",
      },
      {
        code: "CAP-04",
        title: "DAO Governance & Timelock Treasury",
        description: "Compound-style governance protocol with ERC-20 voting delegation, proposal lifecycle, and timelocked multi-sig execution.",
        tag: "Decentralized Governance",
      },
      {
        code: "CAP-05",
        title: "Cross-Chain Token Bridge",
        description: "Cryptographic relay bridge with validator multisig proof verification, nonce tracking, and replay-proof mint/burn mechanics.",
        tag: "Interoperability",
      },
      {
        code: "CAP-06",
        title: "ERC-4337 Smart Contract Wallet",
        description: "Account abstraction smart wallet with session keys, daily spending limits, biometric verification, and paymaster integration.",
        tag: "Account Abstraction",
      },
    ],
    capstoneDeliverables: [
      "Production smart contract repository with clean modular architecture",
      "Foundry test harness with >95% branch coverage including fuzz tests",
      "Formal Smart Contract Security Audit Threat Model and Report",
      "Deployment script on live Ethereum testnet (Sepolia/Arbitrum)",
      "Technical architecture documentation with sequence diagrams and specifications",
    ],
  },
];

// Backwards compatibility for existing imports
export const bkaSolidityCourseData = {
  title: "Blockchain from Basic to Advance in Solidity",
  subtitle: "Comprehensive 16-Week Protocol & Smart Contract Engineering Curriculum",
  author: "PS BHARATH KUMAR ACHARI (BKA)",
  authorRole: "Blockchain Protocol Engineer & Technical Educator",
  duration: "16 Weeks (4 Intensive Modules)",
  totalWeeks: 16,
  compilerTarget: "Solidity 0.8.37 (Latest Stable Toolchain) • Foundry • Hardhat",
  modules: bkaSolidityModules,
};

// -----------------------------------------------------------------------------
// ALL 7 COURSES CATALOG DATA
// -----------------------------------------------------------------------------
export const coursesCatalogData: CourseCatalogItem[] = [
  // 1. SOLIDITY
  {
    id: "solidity",
    number: "01",
    title: "Solidity Protocol & Smart Contract Engineering",
    shortTitle: "01. Solidity Protocol Dev",
    tagline: "Comprehensive 16-Week Protocol & Smart Contract Engineering Curriculum",
    category: "Blockchain",
    trackGroup: "BLOCKCHAIN",
    trackGroupName: "Blockchain Architecture & Protocols",
    badge: "SOLIDITY 0.8.37",
    duration: "16 Weeks",
    totalWeeks: 16,
    level: "Intermediate to Advanced",
    compilerTarget: "Solidity 0.8.37 • Foundry • Hardhat",
    author: "PS BHARATH KUMAR ACHARI (BKA)",
    authorRole: "Blockchain Protocol Engineer & Technical Educator",
    description:
      "A deterministic, production-grade engineering curriculum built to transform developers into autonomous protocol engineers. From cryptographic state commitments and EVM opcodes to automated invariant testing, DeFi architectures, and formal security audits.",
    highlights: [
      "EVM Opcodes & Storage Packing",
      "Foundry Invariants & Fuzzing",
      "Slither & Echidna Security",
      "6 Production Capstone Tracks",
    ],
    keyTopics: [
      "EVM Memory, Calldata & Transient Storage (EIP-1153)",
      "ERC Standards (ERC-20, ERC-721, ERC-1155, ERC-4626)",
      "UUPS, Transparent & Diamond Proxy Architecture",
      "Automated Invariant Testing in Foundry",
      "DeFi AMM Protocols, Lending Pools & Oracles",
      "Arbitrum Stylus (Rust/WASM) & Layer-2 Scaling",
    ],
    tools: ["Foundry", "Hardhat", "Slither", "Echidna", "Remix", "OpenZeppelin", "Arbitrum Stylus"],
    stats: {
      duration: "16 Weeks (4 Modules)",
      toolchain: "Foundry & Hardhat",
      securityOrFocus: "Slither & Echidna Fuzzing",
      capstone: "6 Production Tracks",
    },
    outcomes: [
      {
        title: "EVM & Low-Level Mechanics",
        desc: "Master calldata, memory, storage packing, transient storage (EIP-1153), and opcode gas profiling.",
      },
      {
        title: "Production Standards & Upgrades",
        desc: "Architect ERC-20, ERC-721, ERC-1155, ERC-4626 Tokenized Vaults, and modern UUPS / Diamond proxies.",
      },
      {
        title: "Enterprise Testing Pipelines",
        desc: "Write unit, fuzz, and stateful invariant testing suites in Foundry (>95% branch coverage) with Hardhat automation.",
      },
      {
        title: "Smart Contract Security & Auditing",
        desc: "Identify and patch reentrancy, access control bugs, and flash loan exploits using Slither and Echidna.",
      },
      {
        title: "DeFi Architecture & Math",
        desc: "Build Automated Market Makers (CPAMM), collateralized lending pools, and integrate Chainlink oracle feeds.",
      },
      {
        title: "Layer-2s & Next-Gen Runtimes",
        desc: "Deploy across Arbitrum Stylus (Rust + WASM), Optimism rollups, and evaluate zk-EVM execution environments.",
      },
    ],
    deliverables: [
      "Audited Production Capstone Repository (>95% test coverage)",
      "Formal Smart Contract Security Audit Report",
      "Foundry Invariant & Fuzz Test Suite",
      "BKA Protocol Engineer Credential Verification",
    ],
    modules: bkaSolidityModules,
  },

  // 2. RUST
  {
    id: "rust",
    number: "02",
    title: "Rust for Systems & Protocol Engineering",
    shortTitle: "02. Rust Systems & Protocols",
    tagline: "Memory Safety Without Garbage Collection, Async Engines & High-Performance Runtimes",
    category: "Programming",
    trackGroup: "PROGRAMMING",
    trackGroupName: "Systems Programming",
    badge: "RUST 2024 / LLVM",
    duration: "12 Weeks",
    totalWeeks: 12,
    level: "Beginner to Advanced Systems",
    compilerTarget: "Rust 2024 Edition • Cargo • Tokio • LLVM",
    author: "PS BHARATH KUMAR ACHARI (BKA)",
    authorRole: "Blockchain Protocol Engineer & Technical Educator",
    description:
      "Master modern systems programming in Rust. Dive deep into memory ownership, the borrow checker, low-level concurrency, Tokio asynchronous execution, C FFI bindings, and architecting zero-panic protocol state machines.",
    highlights: [
      "Ownership & Lifetime Calculus",
      "Tokio Async I/O Runtime",
      "Unsafe Rust, Atomics & FFI",
      "Protocol State Machine Capstone",
    ],
    keyTopics: [
      "Stack vs Heap Memory Layout & Pointer Semantics",
      "Ownership, Move Semantics & Borrowing Rules",
      "Smart Pointers (Box, Rc, Arc, RefCell, Cell)",
      "Traits, Dynamic Dispatch vs Monomorphization",
      "Multi-threaded Concurrency, Mutexes & Channels",
      "Asynchronous Rust, Pinning, Futures & Tokio Engine",
    ],
    tools: ["Rustc", "Cargo", "Tokio", "Miri", "Clippy", "LLVM", "GDB/LLDB"],
    stats: {
      duration: "12 Weeks (4 Modules)",
      toolchain: "Cargo & Tokio Engine",
      securityOrFocus: "Miri & Memory Profiling",
      capstone: "High-Speed Protocol Engine",
    },
    outcomes: [
      {
        title: "Memory Safety & Ownership",
        desc: "Master move semantics, borrowing rules, and lifetime annotations without a garbage collector.",
      },
      {
        title: "Zero-Cost Abstractions",
        desc: "Leverage traits, associated types, generics, and monomorphization for compile-time optimization.",
      },
      {
        title: "Concurrent & Multi-threaded Systems",
        desc: "Write lock-free concurrent algorithms with std::sync::atomic, crossbeam channels, and thread pools.",
      },
      {
        title: "Asynchronous Protocol Engines",
        desc: "Architect non-blocking I/O event loops and high-throughput network clients using Tokio and Futures.",
      },
      {
        title: "Unsafe Rust & FFI Bindings",
        desc: "Safely encapsulate unsafe code blocks, raw pointers, custom allocators, and foreign function interfaces (C ABI).",
      },
      {
        title: "Production CLI & Protocol Runtimes",
        desc: "Build verified state machine runtimes with serialization (Serde) and zero-panic error handling.",
      },
    ],
    deliverables: [
      "Multi-threaded Key-Value Storage Engine with WAL (Write-Ahead Log)",
      "Asynchronous P2P Gossip Broadcast Protocol in Tokio",
      "Zero-Panic Binary Protocol Parser with Serde integration",
      "Verified Rust Protocol Runtime with Miri-proven memory safety",
    ],
    modules: [
      {
        id: "rust-01",
        number: "01",
        title: "Rust Foundations, Memory Ownership & The Borrow Checker",
        weeks: "Weeks 1–3",
        headlineNote: "Deep dive into stack vs heap allocation, move semantics, and lifetime parameters.",
        learningObjectives: [
          "Understand memory management: Stack vs Heap, pointers, and memory layout.",
          "Master Rust ownership rules, move semantics, and copy vs clone types.",
          "Understand the borrow checker: shared references (&T) vs mutable references (&mut T).",
          "Master lifetime annotations ('a), lifetime elision rules, and static lifetimes.",
          "Use structs, enums, pattern matching, and Option/Result error handling idioms.",
        ],
        sections: [
          {
            number: "1",
            title: "Memory Architecture & Ownership",
            items: [
              "Process memory layout: stack frames, heap fragmentation, data segment",
              "Variables, mutability, and RAII (Resource Acquisition Is Initialization)",
              "Ownership rules: single owner, move semantics, and drop order",
              "Shared references vs unique mutable references and aliasing XOR mutability",
            ],
          },
          {
            number: "2",
            title: "Lifetimes & Borrow Checker Internals",
            items: [
              "Lifetime parameters and compile-time borrow validation",
              "Lifetime subtyping and covariance/contravariance basics",
              "Structs with references and lifetime elision patterns",
              "Common borrow checker errors and refactoring techniques",
            ],
          },
          {
            number: "3",
            title: "Data Structures & Idiomatic Pattern Matching",
            items: [
              "Structs, tuple structs, and memory alignment",
              "Enums with payloads and expressive algebraic data types",
              "Exhaustive pattern matching with match and if-let expressions",
              "Robust error handling with Result<T, E> and the ? question mark operator",
            ],
          },
        ],
        tools: ["Rustc", "Cargo", "Clippy", "VS Code rust-analyzer"],
        deliverables: [
          "Memory-efficient string and byte buffer manipulator",
          "Custom linked list implementing safe ownership semantics",
          "Command-line file analyzer with structured Result error propagation",
        ],
      },
      {
        id: "rust-02",
        number: "02",
        title: "Advanced Traits, Generics, Macros & Smart Pointers",
        weeks: "Weeks 4–6",
        headlineNote: "Compile-time polymorphism, interior mutability, and metaprogramming.",
        learningObjectives: [
          "Implement custom traits, trait bounds, and associated types.",
          "Understand static dispatch (monomorphization) vs dynamic dispatch (trait objects dyn).",
          "Master smart pointers: Box<T>, Rc<T>, Arc<T>, and interior mutability (RefCell/Cell).",
          "Write declarative macro_rules! and derive procedural macros.",
        ],
        sections: [
          {
            number: "1",
            title: "Traits & Generic Type Systems",
            items: [
              "Defining and implementing traits, default implementations, and supertraits",
              "Generic functions, where clauses, and trait bounds",
              "Monomorphization: compile-time codegen and performance implications",
              "Trait objects (dyn Trait) and vtable pointer dispatch",
            ],
          },
          {
            number: "2",
            title: "Smart Pointers & Interior Mutability",
            items: [
              "Box<T> for heap allocation and recursive data structures",
              "Reference counting with Rc<T> and thread-safe Arc<T>",
              "Interior mutability pattern: Cell<T> and RefCell<T> runtime borrow checking",
              "Memory leak prevention using Weak<T> pointers",
            ],
          },
          {
            number: "3",
            title: "Metaprogramming & Macros",
            items: [
              "Declarative macros with macro_rules! and syntax matchers",
              "Overview of procedural macros: derive, attribute, and function-like",
              "Serde custom serialization/deserialization implementations",
            ],
          },
        ],
        tools: ["Cargo", "Serde", "Cargo-expand", "Clippy"],
        deliverables: [
          "Generic collections library with custom iterator implementations",
          "High-performance JSON/Binary serialization engine using Serde",
          "Custom derive macro for automated metric telemetry logging",
        ],
      },
      {
        id: "rust-03",
        number: "03",
        title: "Concurrency, Multi-Threading & Async Systems with Tokio",
        weeks: "Weeks 7–9",
        headlineNote: "Fearless concurrency, atomic synchronization, and non-blocking asynchronous event loops.",
        learningObjectives: [
          "Spawn native OS threads and pass data safely between threads.",
          "Master thread synchronization: Mutex, RwLock, Barrier, and Condvar.",
          "Implement lock-free concurrency using atomic primitives (std::sync::atomic).",
          "Understand the async/await paradigm, Futures, and Waker mechanics.",
          "Build scalable asynchronous network services using Tokio runtime.",
        ],
        sections: [
          {
            number: "1",
            title: "Native Threading & Message Passing",
            items: [
              "Spawning threads and capturing environments with move closures",
              "Send and Sync marker traits and thread safety invariants",
              "Message passing concurrency using mpsc and crossbeam channels",
              "Shared state concurrency: Arc<Mutex<T>> and Arc<RwLock<T>>",
            ],
          },
          {
            number: "2",
            title: "Atomics & Memory Ordering",
            items: [
              "Atomic primitives: AtomicBool, AtomicUsize, AtomicPtr",
              "Memory orderings: Relaxed, Acquire, Release, SeqCst",
              "Building lock-free counters and spinlocks",
            ],
          },
          {
            number: "3",
            title: "Asynchronous I/O with Tokio",
            items: [
              "The async/await state machine transformation by rustc",
              "Futures trait, Poll::Ready, Poll::Pending, and Pin/Unpin semantics",
              "Tokio runtime architecture: multi-threaded work-stealing scheduler",
              "Asynchronous TCP streams, timers, cancellation tokens, and channels",
            ],
          },
        ],
        tools: ["Tokio", "Crossbeam", "Rayon", "Tracing"],
        deliverables: [
          "Multi-threaded worker pool with dynamic load balancing",
          "Asynchronous TCP chat server handling 10,000+ concurrent connections",
          "Lock-free concurrent cache with atomic read/write synchronization",
        ],
      },
      {
        id: "rust-04",
        number: "04",
        title: "Unsafe Rust, FFI, SIMD & Protocol Runtime Capstone",
        weeks: "Weeks 10–12",
        headlineNote: "Low-level system access, foreign function interfaces, and production protocol runtime capstone.",
        learningObjectives: [
          "Understand the 5 superpowers of Unsafe Rust and how to safely encapsulate them.",
          "Work with raw pointers (*const T, *mut T) and manual memory management.",
          "Build Foreign Function Interface (FFI) bindings between C and Rust.",
          "Verify memory safety and detect undefined behavior with Miri.",
          "Build and benchmark a production-ready protocol execution runtime capstone.",
        ],
        sections: [
          {
            number: "1",
            title: "Unsafe Rust & Undefined Behavior",
            items: [
              "The Unsafe boundary: dereferencing raw pointers, calling unsafe functions",
              "Undefined behavior (UB) in Rust: data races, unaligned reads, invalid references",
              "Verifying unsafe code safety invariants using Miri sanitizers",
              "Implementing custom memory allocators with Allocator API",
            ],
          },
          {
            number: "2",
            title: "Foreign Function Interface (FFI)",
            items: [
              "Exposing Rust libraries to C (extern \"C\" and #[no_mangle])",
              "Consuming C libraries in Rust with bindgen",
              "Memory safety boundaries when passing pointers across FFI boundaries",
            ],
          },
          {
            number: "3",
            title: "Capstone: Protocol State Machine Engine",
            items: [
              "Architecting deterministic blockchain state transition runtime in Rust",
              "High-throughput transaction validation pipeline",
              "In-memory RocksDB-backed state storage with Merkle trie commitments",
              "Benchmark and latency profiling with criterion.rs and flamegraphs",
            ],
          },
        ],
        tools: ["Miri", "Bindgen", "Criterion", "Flamegraph", "RocksDB"],
        deliverables: [
          "C-compatible shared library (.so / .dylib) with safe Rust wrapper API",
          "Deterministic state transition protocol runtime processing 20,000+ tx/sec",
          "Comprehensive Miri memory validation test suite with zero UB reports",
        ],
      },
    ],
  },

  // 3. POLKADOT & SUBSTRATE
  {
    id: "polkadot",
    number: "03",
    title: "Polkadot, Substrate SDK & Parachain Architecture",
    shortTitle: "03. Polkadot & Substrate",
    tagline: "Building Sovereign Blockchains, Custom FRAME Pallets & XCM Cross-Consensus Systems",
    category: "Blockchain",
    trackGroup: "BLOCKCHAIN",
    trackGroupName: "Blockchain Architecture & Protocols",
    badge: "SUBSTRATE / POLKADOT SDK",
    duration: "10 Weeks",
    totalWeeks: 10,
    level: "Advanced Protocol Engineering",
    compilerTarget: "Rust • Polkadot SDK • Substrate FRAME • WASM",
    author: "PS BHARATH KUMAR ACHARI (BKA)",
    authorRole: "Blockchain Protocol Engineer & Technical Educator",
    description:
      "A specialized protocol engineering curriculum on the Polkadot ecosystem. Build custom FRAME pallets, implement deterministic WebAssembly state transitions, configure consensus engines (BABE/GRANDPA), and orchestrate cross-consensus messaging via XCM v4.",
    highlights: [
      "Custom FRAME Pallet Architecture",
      "Deterministic WASM Runtimes",
      "XCM v4 Cross-Chain Messaging",
      "Forkless On-Chain Upgrades",
    ],
    keyTopics: [
      "Substrate Architecture: Client, P2P, Pool & StateDB",
      "FRAME Pallet Macros (#[pallet::storage], #[pallet::call])",
      "Weight Benchmarking & Gas Accounting Mechanics",
      "BABE Slot Block Authorship & GRANDPA Finality",
      "XCM (Cross-Consensus Messaging) Asset Transfers",
      "Cumulus Parachain Integration & Relay Chain Launch",
    ],
    tools: ["Polkadot SDK", "Substrate FRAME", "Zombienet", "Chopsticks", "polkadot-js", "Subxt"],
    stats: {
      duration: "10 Weeks (4 Modules)",
      toolchain: "Polkadot SDK & FRAME",
      securityOrFocus: "Weight Benchmarking & Auditing",
      capstone: "Sovereign Parachain on Zombienet",
    },
    outcomes: [
      {
        title: "Substrate Core Architecture",
        desc: "Understand how Substrate decouples networking, transaction pool, consensus, and WebAssembly runtime.",
      },
      {
        title: "FRAME Pallet Engineering",
        desc: "Design modular on-chain logic using FRAME macros: storage values, maps, double maps, and hooks.",
      },
      {
        title: "Weight & Fee Accounting",
        desc: "Write automated weight benchmarking to protect the blockchain runtime against computational exhaustion attacks.",
      },
      {
        title: "Consensus & Finality Engines",
        desc: "Configure BABE (Blind Assignment for Blockchain Extension) and GRANDPA finality gadget.",
      },
      {
        title: "Cross-Consensus Messaging (XCM)",
        desc: "Implement XCM v4 multi-location routing and trustless cross-chain token teleportation.",
      },
      {
        title: "Parachain Deployment & Cumulus",
        desc: "Connect an application-specific blockchain as a parachain to the Polkadot relay chain via Cumulus.",
      },
    ],
    deliverables: [
      "Custom Multi-Asset Settlement Pallet with fee deductions",
      "Automated Weight Benchmarking Suite using Polkadot SDK CLI",
      "Local Multi-Node Zombienet Relay Chain & Parachain Testnet",
      "Sovereign App-Specific Blockchain with XCM Asset Transfers",
    ],
    modules: [
      {
        id: "polk-01",
        number: "01",
        title: "Substrate Core Architecture, Storage & State Transitions",
        weeks: "Weeks 1–2",
        headlineNote: "Architecture of Substrate nodes, RocksDB state storage, and WASM runtime execution.",
        learningObjectives: [
          "Understand Substrate's modular architecture: outer node client vs on-chain WASM runtime.",
          "Learn how state transitions are executed deterministically inside the WebAssembly sandbox.",
          "Understand Substrate's storage model: Blake2_128Concat, Twox64Concat, and Merkle-Trie hashing.",
          "Set up a Substrate development environment and launch a local Substrate node.",
        ],
        sections: [
          {
            number: "1",
            title: "Substrate Node vs Runtime Architecture",
            items: [
              "Outer Node components: libp2p network, RPC client, transaction queue, DB backend",
              "Runtime Execution: Native binary vs on-chain Wasm runtime blob",
              "Forkless runtime upgrades: set_code extrinsic and on-chain governance",
            ],
          },
          {
            number: "2",
            title: "Substrate Storage Primitives",
            items: [
              "Trie DB and state proof generation",
              "Storage Value, Storage Map, Storage Double Map, and Counted Storage Map",
              "Hashing algorithms: cryptographic (Blake2) vs non-cryptographic (Twox)",
            ],
          },
        ],
        tools: ["Polkadot SDK", "Substrate Node Template", "Cargo"],
        deliverables: ["Configured local Substrate development node with custom genesis spec"],
      },
      {
        id: "polk-02",
        number: "02",
        title: "FRAME Pallet Engineering & Weight Benchmarking",
        weeks: "Weeks 3–5",
        headlineNote: "Building custom on-chain pallets, dispatchables, events, errors, and weight calculations.",
        learningObjectives: [
          "Master FRAME attribute macros: #[pallet::pallet], #[pallet::config], #[pallet::call].",
          "Write custom dispatchable extrinsics with input validation and defensive programming.",
          "Implement runtime hooks: on_initialize, on_finalize, on_idle, and integrity_test.",
          "Perform automated weight benchmarking to measure execution time and calculate fees.",
        ],
        sections: [
          {
            number: "1",
            title: "FRAME Attribute Macros & Dispatchables",
            items: [
              "Config trait: associated types, currency traits, and event triggers",
              "Dispatchable calls: origin validation (ensure_signed, ensure_root)",
              "Emitting typed events and declaring custom pallet errors",
            ],
          },
          {
            number: "2",
            title: "Weight Benchmarking & Fee Mechanics",
            items: [
              "Substrate computational weight model: 1 second = 1,000,000,000,000 weight units",
              "Writing benchmark files using the frame_benchmarking macro",
              "Generating auto-tuned WeightInfo implementations from machine benchmarks",
            ],
          },
        ],
        tools: ["FRAME", "Substrate Benchmarking CLI", "Polkadot JS"],
        deliverables: [
          "Custom Decentralized Identity (DID) & Credential Verification Pallet",
          "Generated WeightInfo benchmarks with calibrated execution fees",
        ],
      },
      {
        id: "polk-03",
        number: "03",
        title: "Consensus, Finality & On-Chain Governance",
        weeks: "Weeks 6–7",
        headlineNote: "Hybrid consensus: BABE slot block authorship, GRANDPA finality gadget, and OpenGov.",
        learningObjectives: [
          "Understand hybrid consensus: decoupling block production from deterministic finality.",
          "Configure BABE (Blind Assignment for Blockchain Extension) for block authorship.",
          "Understand GRANDPA (GHOST-based Recursive ANcestor Deriving Prefix Agreement) finality.",
          "Configure pallet-collective, pallet-democracy, and Polkadot OpenGov tracks.",
        ],
        sections: [
          {
            number: "1",
            title: "BABE & GRANDPA Hybrid Consensus",
            items: [
              "VRF (Verifiable Random Function) lottery for slot leaders in BABE",
              "GRANDPA vote rounds, commit messages, and fast finality guarantees",
              "Slashing conditions and equivocation reporting for misbehaving validators",
            ],
          },
          {
            number: "2",
            title: "On-Chain Governance & Treasury",
            items: [
              "Referenda lifecycle, conviction voting math, and tally calculations",
              "Treasury proposals, tipping, and council multi-sig approvals",
            ],
          },
        ],
        tools: ["Substrate Consensus", "Polkadot Apps UI"],
        deliverables: ["Multi-validator consensus cluster running BABE and GRANDPA with active finality"],
      },
      {
        id: "polk-04",
        number: "04",
        title: "XCM Cross-Consensus Messaging & Parachain Launch",
        weeks: "Weeks 8–10",
        headlineNote: "Cross-consensus communication via XCM v4 and launching a sovereign parachain with Cumulus.",
        learningObjectives: [
          "Understand Cross-Consensus Messaging (XCM) architecture and multi-locations.",
          "Implement XCM asset transfers: Teleporting vs Reserve Asset Transfers.",
          "Configure Cumulus and integrate parachain collators with the Relay Chain.",
          "Test multi-chain topologies locally using Zombienet and Chopsticks.",
        ],
        sections: [
          {
            number: "1",
            title: "XCM v4 Mechanics & Multilocations",
            items: [
              "Multilocations: parents, junctions, and relative address routing",
              "XCM instructions: WithdrawAsset, BuyExecution, DepositAsset, Transact",
              "XCMP (Cross-Chain Message Passing) transport channels and HRMP configuration",
            ],
          },
          {
            number: "2",
            title: "Cumulus Parachain & Zombienet Launch",
            items: [
              "Cumulus node architecture: collator duties and relay chain follow-up",
              "Zombienet DSL configuration for spinning up multi-chain testnets",
              "Executing cross-chain extrinsics and testing forkless upgrades on parachains",
            ],
          },
        ],
        tools: ["XCM v4", "Cumulus", "Zombienet", "Chopsticks"],
        deliverables: [
          "Production-ready sovereign Parachain connected to local Polkadot relay chain",
          "Verified XCM cross-chain token transfer verified across 2 parachains",
        ],
      },
    ],
  },

  // 4. BLOCKCHAIN LAYERS & ARCHITECTURE
  {
    id: "blockchain-layers",
    number: "04",
    title: "Blockchain Layers, Modular Runtimes & Multi-Layer Applications",
    shortTitle: "04. Blockchain Layers & Modular Architecture",
    tagline: "Decoupling Execution, Settlement, Consensus & Data Availability Across L0 to L3",
    category: "Blockchain",
    trackGroup: "BLOCKCHAIN",
    trackGroupName: "Blockchain Architecture & Protocols",
    badge: "MODULAR L0 - L3",
    duration: "12 Weeks",
    totalWeeks: 12,
    level: "Comprehensive Architecture",
    compilerTarget: "Modular Stack (Ethereum, Arbitrum, Celestia, EigenLayer, Hyperlane)",
    author: "PS BHARATH KUMAR ACHARI (BKA)",
    authorRole: "Blockchain Protocol Engineer & Technical Educator",
    description:
      "Understand the modern modular blockchain paradigm. Explore the architectural decoupling of execution from consensus, examine rollups (Optimistic vs ZK), Data Availability layers (Celestia, EIP-4844), and design cross-layer decentralized applications with intent-based bridges.",
    highlights: [
      "L0, L1, L2 & L3 System Decomposition",
      "Optimistic vs ZK Rollup Mechanics",
      "Data Availability Sampling & Blobspace",
      "Cross-Layer Multi-Domain dApps",
    ],
    keyTopics: [
      "Layer 0: P2P Transport, libp2p & Consensus Overlays",
      "Layer 1: Monolithic State Machines & Execution Bottlenecks",
      "Layer 2: Rollup Sequencers, Fraud Proofs & State Commitments",
      "Zero-Knowledge Rollups: Arithmetic Circuits & Validity Verifiers",
      "Data Availability: EIP-4844 Blobs, Celestia & EigenDA",
      "Cross-Layer Bridges, Intent Solvers & Shared Sequencers",
    ],
    tools: ["Arbitrum Orbit", "OP Stack", "Celestia Node", "EigenLayer", "Foundry", "Hyperlane"],
    stats: {
      duration: "12 Weeks (4 Modules)",
      toolchain: "OP Stack & Arbitrum Orbit",
      securityOrFocus: "Fraud Proofs & DA Verification",
      capstone: "Modular L2/L3 Rollup Deployment",
    },
    outcomes: [
      {
        title: "Modular vs Monolithic Architectures",
        desc: "Understand trade-offs between monolithic blockchains (Solana, early Ethereum) and modular decoupled stacks.",
      },
      {
        title: "Layer 0 & Layer 1 Consensus Invariants",
        desc: "Analyze P2P network topologies, Byzantine Fault Tolerant consensus, and state serialization bottlenecks.",
      },
      {
        title: "Optimistic Rollups & Fraud Proofs",
        desc: "Dissect rollup sequencers, batch posters, one-step interactive fraud proofs (Arbitrum Nitro), and challenge games.",
      },
      {
        title: "Zero-Knowledge Rollup Verification",
        desc: "Understand polynomial commitments, circuit arithmetization, state diffs, and L1 on-chain validity verifiers.",
      },
      {
        title: "Data Availability (DA) Layers",
        desc: "Master 2D Reed-Solomon erasure coding, Data Availability Sampling (DAS), Celestia light nodes, and EIP-4844 blobs.",
      },
      {
        title: "Cross-Layer Decentralized Applications",
        desc: "Architect dApps spanning L1, L2, and L3 with intent-based cross-chain routing and asynchronous state synchronization.",
      },
    ],
    deliverables: [
      "Custom OP Stack / Arbitrum Orbit Layer-2 Rollup running locally",
      "Celestia Data Availability namespace integration for rollup block posting",
      "Interactive Fraud Proof challenge simulation test harness in Foundry",
      "Cross-Layer Yield Aggregator dApp with unified liquidity routing",
    ],
    modules: [
      {
        id: "layers-01",
        number: "01",
        title: "Layer 0 & Layer 1: Consensus, State Models & Monolithic Bottlenecks",
        weeks: "Weeks 1–3",
        headlineNote: "Deconstructing the base layer: P2P communication, state execution, and the scalability trilemma.",
        learningObjectives: [
          "Understand the 4 core functions of a blockchain: Execution, Settlement, Consensus, Data Availability.",
          "Analyze Layer 0 network transport: libp2p, gossip protocols, and network latency bounds.",
          "Compare UTXO vs Account-based state models and their concurrency limits.",
          "Identify the physical hardware bottlenecks of Layer-1 nodes (I/O, state growth, CPU).",
        ],
        sections: [
          {
            number: "1",
            title: "The 4 Core Blockchain Primitives",
            items: [
              "Execution: State transitions and transaction processing",
              "Consensus: Ordering transactions and preventing double spends",
              "Settlement: Finality guarantees and dispute resolution",
              "Data Availability: Ensuring transaction data is publicly accessible for verification",
            ],
          },
          {
            number: "2",
            title: "L1 State Machine Bottlenecks",
            items: [
              "State storage growth and RocksDB random disk reads/writes",
              "Sequential vs Parallel transaction execution (EVM vs Solana Sealevel / Aptos Block-STM)",
              "The Scalability Trilemma: Decentralization, Security, and Scalability",
            ],
          },
        ],
        tools: ["Foundry", "Geth Inspector", "Wireshark"],
        deliverables: ["Comparative throughput and state growth benchmark report across L1 architectures"],
      },
      {
        id: "layers-02",
        number: "02",
        title: "Layer 2 Rollups: Optimistic Execution, Fraud Proofs & Sequencers",
        weeks: "Weeks 4–6",
        headlineNote: "How rollups execute off-chain and inherit Layer-1 security via fraud proofs.",
        learningObjectives: [
          "Understand rollup architecture: Sequencer, Batcher, Proposer, and Challenge contracts.",
          "Analyze the transaction lifecycle from L2 submission to L1 batch posting.",
          "Master Optimistic Rollup fraud proofs: non-interactive vs multi-round interactive bisection.",
          "Configure and launch a private Layer-2 rollup using OP Stack or Arbitrum Orbit.",
        ],
        sections: [
          {
            number: "1",
            title: "Rollup Mechanics & Data Flow",
            items: [
              "Sequencer operation: transaction ordering, mempool, and soft finality",
              "Compressing transaction calldata and posting batches to L1",
              "L1-to-L2 deposit contracts and L2-to-L1 withdrawal challenge periods (7-day delay)",
            ],
          },
          {
            number: "2",
            title: "Fraud Proof Verification Engines",
            items: [
              "Interactive fraud proofs: binary search over execution trace steps",
              "One-step execution verifier inside the L1 EVM (WAVM / Cannon)",
              "Economic bonds, challenge games, and anti-censorship escape hatches",
            ],
          },
        ],
        tools: ["OP Stack", "Arbitrum Nitro", "Foundry", "Docker"],
        deliverables: ["Functional local Optimistic Rollup testnet with customized gas token"],
      },
      {
        id: "layers-03",
        number: "03",
        title: "ZK-Rollups, Validity Proofs & Data Availability Layers",
        weeks: "Weeks 7–9",
        headlineNote: "Zero-Knowledge validity proofs, zkEVM types, and modular Data Availability sampling.",
        learningObjectives: [
          "Understand how Zero-Knowledge validity proofs guarantee state correctness mathematically.",
          "Compare zkEVM approaches: Type 1 (Ethereum-equivalent) through Type 4 (high-level language).",
          "Master Data Availability: why DA is not storage, and how Data Availability Sampling (DAS) works.",
          "Explore EIP-4844 Proto-Danksharding blobs vs dedicated DA layers like Celestia and EigenDA.",
        ],
        sections: [
          {
            number: "1",
            title: "ZK-Rollups & Validity Proof Verification",
            items: [
              "Prover vs Verifier architecture: off-chain proof generation, on-chain verification",
              "State diffs vs full transaction calldata posting",
              "Instant finality once L1 validity proof verification succeeds",
            ],
          },
          {
            number: "2",
            title: "Modular Data Availability (DA)",
            items: [
              "The Data Availability Problem: block withholding attacks",
              "Erasure coding and 2D Reed-Solomon mathematical guarantees",
              "Celestia light nodes: verifying DA with logarithmic bandwidth",
              "EIP-4844 Blob transactions: temporary storage with separate fee market",
            ],
          },
        ],
        tools: ["Celestia Node", "Polygon CDK / zkSync", "Foundry"],
        deliverables: ["Rollup batch submission pipeline integrated with Celestia DA namespace"],
      },
      {
        id: "layers-04",
        number: "04",
        title: "Layer 3 Hyperchains, Shared Sequencers & Cross-Layer dApps",
        weeks: "Weeks 10–12",
        headlineNote: "Application-specific L3s, shared sequencing, intent-based bridges, and modular capstone.",
        learningObjectives: [
          "Understand Layer-3 (L3) execution environments built on top of Layer-2 rollups.",
          "Analyze shared sequencer networks (Espresso, Astria) to eliminate centralized sequencer risk.",
          "Understand cross-layer interoperability: cross-rollup messaging and intent-based solvers.",
          "Architect and deploy an end-to-end multi-layer decentralized application capstone.",
        ],
        sections: [
          {
            number: "1",
            title: "Layer 3s & App-Specific Execution",
            items: [
              "Custom gas tokens, ultra-low fees, and custom state transition logic in L3s",
              "Recursive proofs: proving L3 validity proofs inside an L2 rollup",
            ],
          },
          {
            number: "2",
            title: "Cross-Layer Interoperability & Intent Systems",
            items: [
              "Shared sequencing for atomic cross-rollup composability",
              "Intent-based architecture: users sign desired state, solvers execute across layers",
              "Hyperlane & LayerZero multi-domain state relayers",
            ],
          },
        ],
        tools: ["Hyperlane", "Arbitrum Orbit L3", "Foundry", "Docker"],
        deliverables: [
          "End-to-end deployed Layer-3 application rollup settled on Layer-2 with Celestia DA",
          "Cross-layer token bridge with automated relayer service and fraud monitoring",
        ],
      },
    ],
  },

  // 5. GO (GOLANG)
  {
    id: "go",
    number: "05",
    title: "Go (Golang) for Distributed Systems & EVM Nodes",
    shortTitle: "05. Go Distributed Systems",
    tagline: "High-Concurrency Backend Engineering, Geth Client Internals & RPC Infrastructure",
    category: "Programming",
    trackGroup: "PROGRAMMING",
    trackGroupName: "Systems Programming",
    badge: "GO 1.23+ / GETH",
    duration: "10 Weeks",
    totalWeeks: 10,
    level: "Intermediate to Advanced",
    compilerTarget: "Go 1.23+ • Go-Ethereum (Geth) • gRPC • LevelDB",
    author: "PS BHARATH KUMAR ACHARI (BKA)",
    authorRole: "Blockchain Protocol Engineer & Technical Educator",
    description:
      "Harness Go's lightweight concurrency and battle-tested runtime to build enterprise blockchain infrastructure. Dive into Go-Ethereum (Geth) codebases, implement custom JSON-RPC engines, build high-throughput transaction pool monitors, and stream live chain events.",
    highlights: [
      "Goroutines & CSP Concurrency",
      "Geth Core Node Architecture",
      "High-Throughput RPC & Indexers",
      "LevelDB & MPT Trie Inspection",
    ],
    keyTopics: [
      "Go Concurrency: Goroutines, Channels, Select & Context",
      "Go Runtime Memory Allocator & Garbage Collector Tuning",
      "JSON-RPC 2.0 Engine & WebSocket Live Subscriptions",
      "Geth Architecture: P2P Network, TxPool & StateDB",
      "EVM Bytecode Interpreter Implementation in Go",
      "High-Speed Chain Indexer & Event Processing Pipelines",
    ],
    tools: ["Go 1.23", "Go-Ethereum (geth)", "gRPC", "Protocol Buffers", "LevelDB / Pebble", "PostgreSQL"],
    stats: {
      duration: "10 Weeks (4 Modules)",
      toolchain: "Go 1.23 & Geth Core",
      securityOrFocus: "Memory Profiling & Race Detector",
      capstone: "High-Speed Real-time Indexer",
    },
    outcomes: [
      {
        title: "Idiomatic Go & Systems Concurrency",
        desc: "Master communicating sequential processes (CSP), channel patterns, sync primitives, and race detection.",
      },
      {
        title: "Low-Level Go Memory Mechanics",
        desc: "Understand escape analysis, memory allocation on stack vs heap, and tuning garbage collection thresholds.",
      },
      {
        title: "RPC & WebSocket Server Architecture",
        desc: "Build resilient JSON-RPC 2.0 microservices handling thousands of simultaneous client connections.",
      },
      {
        title: "Go-Ethereum (Geth) Internals",
        desc: "Inspect core Geth components: p2p protocol stack, transaction pool, state database, and EVM interpreter.",
      },
      {
        title: "Database Engines & Merkle Tries",
        desc: "Read and write raw Ethereum state tries from LevelDB / PebbleDB with high-throughput key-value lookups.",
      },
      {
        title: "Production Real-Time Indexer",
        desc: "Build an event ingestion pipeline that parses blockchain blocks, decodes logs, and stores state in PostgreSQL.",
      },
    ],
    deliverables: [
      "High-throughput JSON-RPC 2.0 proxy with caching and rate limiting",
      "Standalone Merkle-Patricia Trie inspector querying raw Geth databases",
      "Real-time token transfer indexing engine with PostgreSQL and GraphQL API",
      "Custom EVM bytecode execution simulator implemented in native Go",
    ],
    modules: [
      {
        id: "go-01",
        number: "01",
        title: "Idiomatic Go, Concurrency Patterns & Low-Level Memory Mechanics",
        weeks: "Weeks 1–2",
        headlineNote: "Goroutines, channels, memory allocator internals, and race detection in Go.",
        learningObjectives: [
          "Master idiomatic Go conventions, interfaces, error handling, and type assertions.",
          "Understand CSP concurrency: Goroutines, buffered/unbuffered channels, and select.",
          "Master sync package: Mutex, RWMutex, WaitGroup, Once, and Pool.",
          "Understand escape analysis, garbage collection pauses, and profiling with pprof.",
        ],
        sections: [
          {
            number: "1",
            title: "Go Concurrency & Synchronization",
            items: [
              "Goroutine lightweight threads and the Go runtime M:N scheduler",
              "Channel patterns: pipelines, fan-out/fan-in, worker pools, cancellation via context.Context",
              "Sync primitives vs channel communication; atomic operations in sync/atomic",
              "Detecting data races using go test -race and avoiding deadlocks",
            ],
          },
          {
            number: "2",
            title: "Go Memory Management & Performance",
            items: [
              "Stack allocation vs heap allocation and compiler escape analysis",
              "Tuning GC pacing (GOGC) and reducing allocations using sync.Pool",
              "Profiling CPU and memory bottlenecks with runtime/pprof and go tool pprof",
            ],
          },
        ],
        tools: ["Go 1.23", "pprof", "Delve Debugger"],
        deliverables: ["High-throughput multi-worker concurrent job processor with backpressure handling"],
      },
      {
        id: "go-02",
        number: "02",
        title: "Networking, RPC Protocols & WebSocket Stream Infrastructure",
        weeks: "Weeks 3–5",
        headlineNote: "Building resilient JSON-RPC servers, streaming WebSockets, and gRPC endpoints.",
        learningObjectives: [
          "Implement high-concurrency TCP network listeners and HTTP connection pooling.",
          "Build a fully compliant JSON-RPC 2.0 server supporting batch requests.",
          "Implement real-time pub/sub streaming over WebSockets with heartbeat keep-alives.",
          "Design low-latency internal microservice communication using gRPC and Protocol Buffers.",
        ],
        sections: [
          {
            number: "1",
            title: "JSON-RPC 2.0 Engine & WebSockets",
            items: [
              "JSON-RPC 2.0 specification: request parsing, error codes, and batch processing",
              "Handling thousands of concurrent WebSocket connections with gorilla/websocket",
              "Broadcasting live block events with pub/sub channel multiplexing",
            ],
          },
          {
            number: "2",
            title: "High-Performance gRPC Microservices",
            items: [
              "Defining Protocol Buffer schemas (.proto) and generating Go code",
              "gRPC client and server interceptors for authentication and metrics",
              "Benchmarking latency: JSON-RPC over HTTP vs gRPC binary streaming",
            ],
          },
        ],
        tools: ["gRPC", "Protobuf", "Gorilla WebSocket"],
        deliverables: ["Production JSON-RPC proxy with live WebSocket pub/sub block event streamer"],
      },
      {
        id: "go-03",
        number: "03",
        title: "Geth Node Internals: StateDB, EVM Interpreter & TxPool",
        weeks: "Weeks 6–8",
        headlineNote: "Dissecting the Go-Ethereum codebase: state tries, gas calculation, and node architecture.",
        learningObjectives: [
          "Navigate and understand the architecture of the go-ethereum (Geth) repository.",
          "Inspect the Geth Transaction Pool (TxPool): pricing, pending vs queued, and eviction.",
          "Explore the StateDB: accounts, balances, nonces, storage root, and code hashes.",
          "Trace EVM opcode execution inside Geth's core/vm package.",
        ],
        sections: [
          {
            number: "1",
            title: "Geth Core Package Walkthrough",
            items: [
              "core/types: Block, Header, Transaction, Receipt data structures and RLP encoding",
              "core/txpool: Validation, gas price thresholds, and nonce ordering",
              "eth/protocols/eth: P2P block propagation and consensus sync algorithms",
            ],
          },
          {
            number: "2",
            title: "StateDB & The EVM in Go",
            items: [
              "core/state/statedb.go: In-memory dirty state tracking and snapshot reverts",
              "core/vm: The EVM interpreter loop, jump tables, and opcode execution functions",
              "Reading raw account balances and contract storage from LevelDB/PebbleDB",
            ],
          },
        ],
        tools: ["Go-Ethereum", "LevelDB", "Pebble"],
        deliverables: ["Custom CLI tool that inspects and decodes raw Geth blockchain database files"],
      },
      {
        id: "go-04",
        number: "04",
        title: "Production Real-Time Indexer & Node Monitor Capstone",
        weeks: "Weeks 9–10",
        headlineNote: "Building an enterprise-grade blockchain indexer with PostgreSQL and event streams.",
        learningObjectives: [
          "Build an end-to-end blockchain indexing service that ingests blocks and transaction receipts.",
          "Decode contract events using generated ABI bindings (abigen).",
          "Handle chain reorganizations (reorgs) gracefully with block confirmation windows.",
          "Expose indexed data through a fast REST/GraphQL API with sub-10ms query response times.",
        ],
        sections: [
          {
            number: "1",
            title: "Indexer Architecture & Reorg Resilience",
            items: [
              "Worker pool block polling and WebSocket head subscription fallback",
              "Parsing raw transaction logs and ABI event decoding",
              "Handling blockchain reorgs: tracking parent hashes and rolling back invalidated blocks",
              "Batch insertion into PostgreSQL with transactional integrity",
            ],
          },
          {
            number: "2",
            title: "Capstone Delivery & Production Deployment",
            items: [
              "Metrics instrumentation with Prometheus and Grafana dashboards",
              "Docker containerization and production deployment configuration",
            ],
          },
        ],
        tools: ["PostgreSQL", "abigen", "Docker", "Prometheus"],
        deliverables: ["Enterprise-grade Ethereum Event Indexer processing 500+ blocks/sec with reorg safety"],
      },
    ],
  },

  // 6. OPERATING SYSTEMS
  {
    id: "os",
    number: "06",
    title: "Operating Systems & Kernel Internals",
    shortTitle: "06. Operating Systems & Kernel",
    tagline: "Process Scheduling, Virtual Memory, Page Tables, Syscalls & Concurrency Primitives",
    category: "Core Subjects",
    trackGroup: "CORE_SUBJECTS",
    trackGroupName: "Core Systems & CS Foundations",
    badge: "C / LINUX KERNEL",
    duration: "10 Weeks",
    totalWeeks: 10,
    level: "Core Systems Foundation",
    compilerTarget: "C99 • GCC • x86_64 / ARM64 Assembly • Linux Kernel",
    author: "PS BHARATH KUMAR ACHARI (BKA)",
    authorRole: "Blockchain Protocol Engineer & Technical Educator",
    description:
      "Understand the software layer directly beneath all decentralized infrastructure. Explore CPU privilege levels, interrupt handlers, virtual memory and page faulting, process scheduling algorithms, atomic memory barriers, and the POSIX kernel interface.",
    highlights: [
      "Virtual Memory & Multi-Level Page Tables",
      "Process Context Switches & CFS Scheduler",
      "Lock-Free Concurrency & Atomics",
      "Linux Syscall Interface & File Systems",
    ],
    keyTopics: [
      "CPU Privilege Rings (Ring 0 Kernel vs Ring 3 User)",
      "Virtual Memory, MMU & Translation Lookaside Buffer (TLB)",
      "Multi-Level Page Tables & Page Fault Resolution",
      "Process Lifecycle: fork, execve, waitpid & Signals",
      "CPU Scheduling: Completely Fair Scheduler (CFS) & Priority",
      "Synchronization Primitives: Futex, Semaphores, Spinlocks & Mutexes",
    ],
    tools: ["C (GCC/Clang)", "QEMU", "GDB", "Valgrind", "Linux ftrace/perf", "x86_64 Assembly"],
    stats: {
      duration: "10 Weeks (4 Modules)",
      toolchain: "C99 & Linux Kernel",
      securityOrFocus: "Memory & Syscall Profiling",
      capstone: "Bare-Metal Microkernel in C",
    },
    outcomes: [
      {
        title: "Hardware & CPU Architecture",
        desc: "Understand CPU instruction execution, registers, stack pointers, and privilege level transitions (syscalls/traps).",
      },
      {
        title: "Virtual Memory & Paging",
        desc: "Master how the MMU translates virtual addresses to physical RAM via multi-level page tables and TLBs.",
      },
      {
        title: "Process & Thread Management",
        desc: "Understand context switching, task_struct in Linux, thread stacks, and process synchronization.",
      },
      {
        title: "CPU Scheduling Algorithms",
        desc: "Analyze preemptive scheduling algorithms: Round Robin, Multilevel Feedback Queues, and Linux CFS.",
      },
      {
        title: "Storage & File System Internals",
        desc: "Understand inodes, directory trees, block allocation, page caches, and ACID write-ahead logging.",
      },
      {
        title: "Bare-Metal Kernel Programming",
        desc: "Write bare-metal C code running under QEMU with interrupt handlers and a minimal memory allocator.",
      },
    ],
    deliverables: [
      "Custom memory allocator (malloc/free) implementing free lists and coalescing",
      "User-space cooperative thread scheduler with manual setjmp/longjmp context switching",
      "Simplified Ext2-style Virtual File System reader in C",
      "Minimal x86_64 bootloader and microkernel running under QEMU emulator",
    ],
    modules: [
      {
        id: "os-01",
        number: "01",
        title: "Computer Architecture, Kernel Modes & Bootstrapping",
        weeks: "Weeks 1–2",
        headlineNote: "CPU privilege rings, system call traps, and x86_64 boot sequence.",
        learningObjectives: [
          "Understand the von Neumann architecture and memory hierarchies (L1/L2/L3 caches, RAM).",
          "Understand CPU privilege levels: Ring 0 (Kernel) vs Ring 3 (User Space).",
          "Trace the system call transition: SYSCALL instruction, interrupt vector table, and kernel stack switch.",
          "Understand how an operating system boots from BIOS/UEFI to kernel initialization.",
        ],
        sections: [
          {
            number: "1",
            title: "CPU Modes & Privilege Transitions",
            items: [
              "User mode vs Kernel mode and hardware memory protection",
              "Hardware interrupts, software exceptions, and system call traps",
              "The cost of a context switch: register saving, cache invalidation, and TLB flushes",
            ],
          },
          {
            number: "2",
            title: "The Boot Sequence",
            items: [
              "BIOS/UEFI firmware execution and master boot record (MBR/GPT)",
              "Switching from Real Mode to 32-bit Protected Mode to 64-bit Long Mode",
              "Kernel entry point: initializing the Global Descriptor Table (GDT) and stack pointer",
            ],
          },
        ],
        tools: ["QEMU", "GDB", "x86_64 Assembly"],
        deliverables: ["Bootable x86_64 'Hello World' kernel image loaded via QEMU"],
      },
      {
        id: "os-02",
        number: "02",
        title: "Virtual Memory, Paging, Page Faults & Memory Management",
        weeks: "Weeks 3–5",
        headlineNote: "MMU translation, 4-level page tables, demand paging, and custom memory allocators.",
        learningObjectives: [
          "Understand virtual memory concepts and why modern operating systems isolate process address spaces.",
          "Master multi-level page table walking (PML4, PDPT, PD, PT in x86_64).",
          "Understand the Translation Lookaside Buffer (TLB) and page fault interrupt handling.",
          "Implement a custom memory allocator (malloc/free) in C.",
        ],
        sections: [
          {
            number: "1",
            title: "Virtual Memory & Multi-Level Page Tables",
            items: [
              "Virtual address structure: page directory index, page table index, page offset",
              "MMU hardware translation and TLB hit vs miss penalties",
              "Page Faults: demand paging, copy-on-write (COW) on fork(), and segmentation faults",
            ],
          },
          {
            number: "2",
            title: "Memory Allocation Algorithms",
            items: [
              "Kernel buddy allocator for contiguous physical page allocation",
              "User-space heap management: sbrk and mmap system calls",
              "Implementing a free-list malloc with boundary tags and chunk coalescing",
            ],
          },
        ],
        tools: ["C99", "Valgrind", "GDB"],
        deliverables: ["Production-grade C malloc/free implementation with zero memory leaks"],
      },
      {
        id: "os-03",
        number: "03",
        title: "Process Lifecycle, CPU Scheduling & Multithreaded Concurrency",
        weeks: "Weeks 6–8",
        headlineNote: "Process state machines, scheduling algorithms, futexes, and atomic synchronization.",
        learningObjectives: [
          "Understand process creation: fork(), execve(), waitpid(), and zombie process management.",
          "Understand thread models: kernel threads (1:1) vs green threads (M:N).",
          "Analyze CPU scheduling: Round Robin, Multi-level Feedback Queues, and Linux CFS.",
          "Master synchronization: Race conditions, spinlocks, semaphores, and futexes.",
        ],
        sections: [
          {
            number: "1",
            title: "Process State Machine & Context Switching",
            items: [
              "Process Control Block (task_struct): PID, memory maps, file descriptors, signal masks",
              "Context switching mechanics: saving CPU registers and switching page directory base (CR3)",
              "Inter-process communication (IPC): pipes, shared memory, and message queues",
            ],
          },
          {
            number: "2",
            title: "CPU Scheduling & Synchronization Primitives",
            items: [
              "Scheduling metrics: turnaround time, response time, fairness, and CPU utilization",
              "The Linux Completely Fair Scheduler (CFS) and red-black tree runqueues",
              "Mutual exclusion: test-and-set, compare-and-swap (CAS), and atomic memory barriers",
              "Futex (Fast Userspace Mutex) architecture: avoid kernel mode switch when uncontended",
            ],
          },
        ],
        tools: ["POSIX pthreads", "Linux ftrace", "htop"],
        deliverables: ["User-space cooperative multi-threading library with custom yield() scheduling"],
      },
      {
        id: "os-04",
        number: "04",
        title: "Storage Subsystems, File Systems & Minimal OS Kernel Lab",
        weeks: "Weeks 9–10",
        headlineNote: "File systems, Virtual File System (VFS), page cache, and capstone microkernel.",
        learningObjectives: [
          "Understand disk block addressing, partition tables, and I/O scheduling.",
          "Understand file system architecture: Inodes, data blocks, directory structures, and links.",
          "Master the Linux Virtual File System (VFS) abstraction: superblock, inode, dentry, file.",
          "Complete a bare-metal microkernel capstone demonstrating process isolation and syscalls.",
        ],
        sections: [
          {
            number: "1",
            title: "File System Architecture & Inodes",
            items: [
              "File system layout: Superblock, Inode bitmap, Block bitmap, Inode table, Data blocks",
              "Hard links vs symbolic links and directory traversal mechanics",
              "Journaling file systems: write-ahead logging to prevent corruption during power failure",
              "Page cache: read-ahead, write-back, and dirty page flushing (sync/fsync)",
            ],
          },
          {
            number: "2",
            title: "Capstone: Minimal Protected Microkernel",
            items: [
              "Final integration: GDT, IDT (Interrupt Descriptor Table), and timer interrupts",
              "Preemptive round-robin switching between two isolated user tasks",
              "Syscall handler for printing text and requesting memory",
            ],
          },
        ],
        tools: ["QEMU", "GCC", "GDB", "Make"],
        deliverables: ["Working bare-metal x86_64 microkernel running preemptive multitasking under QEMU"],
      },
    ],
  },

  // 7. COMPUTER NETWORKING
  {
    id: "networking",
    number: "07",
    title: "Computer Networking, P2P Protocols & libp2p",
    shortTitle: "07. Computer Networking & libp2p",
    tagline: "Socket Programming, Transport Layers, Kademlia DHT, GossipSub & NAT Traversal",
    category: "Core Subjects",
    trackGroup: "CORE_SUBJECTS",
    trackGroupName: "Core Systems & CS Foundations",
    badge: "LIBP2P / TCP / UDP",
    duration: "8 Weeks",
    totalWeeks: 8,
    level: "Foundational to Advanced Distributed Systems",
    compilerTarget: "libp2p • TCP/UDP Sockets • Wireshark • Go / Rust",
    author: "PS BHARATH KUMAR ACHARI (BKA)",
    authorRole: "Blockchain Protocol Engineer & Technical Educator",
    description:
      "Master the communication substrate that powers decentralized networks. Learn TCP/UDP socket programming, packet flow, framing, routing, Kademlia Distributed Hash Tables, GossipSub block propagation, NAT traversal with STUN/TURN, and cryptographic Noise handshakes.",
    highlights: [
      "libp2p Modular Protocol Architecture",
      "Kademlia Distributed Hash Table (DHT)",
      "GossipSub v1.1 Mesh Broadcasting",
      "TCP/UDP Socket Programming & Wireshark",
    ],
    keyTopics: [
      "OSI 7-Layer Model & TCP/IP Protocol Stack",
      "Socket Programming: bind, listen, accept, epoll & Async I/O",
      "TCP Flow Control (Sliding Window) & Congestion Avoidance",
      "P2P Topologies vs Centralized Client-Server Architectures",
      "Kademlia DHT, XOR Distance Metric & Routing Buckets",
      "GossipSub Mesh Protocol & Message Deduplication",
    ],
    tools: ["libp2p", "Wireshark", "tcpdump", "Socket APIs", "Go / Rust Networking", "Docker"],
    stats: {
      duration: "8 Weeks (4 Modules)",
      toolchain: "libp2p & Sockets",
      securityOrFocus: "Wireshark Packet Analysis",
      capstone: "P2P Block Gossip Simulator",
    },
    outcomes: [
      {
        title: "TCP/IP Transport Mechanics",
        desc: "Master packet framing, TCP 3-way handshakes, sequence numbers, sliding windows, and congestion control (CUBIC/BBR).",
      },
      {
        title: "High-Concurrency Socket Programming",
        desc: "Write non-blocking socket servers using Linux epoll / kqueue to handle thousands of simultaneous active connections.",
      },
      {
        title: "Peer-to-Peer Network Topologies",
        desc: "Understand decentralized topologies, bootstrap nodes, peer discovery, and peer reputation scoring.",
      },
      {
        title: "Kademlia Distributed Hash Tables (DHT)",
        desc: "Implement Kademlia routing algorithms, XOR distance metrics, k-buckets, and distributed value storage.",
      },
      {
        title: "GossipSub Block & Transaction Propagation",
        desc: "Master libp2p GossipSub v1.1 mesh construction, gossip emission, message scoring, and sybil defense.",
      },
      {
        title: "NAT Traversal & Cryptographic Encryption",
        desc: "Navigate firewalls using STUN, TURN, ICE, and AutoNAT while securing connections with the Noise protocol handshake.",
      },
    ],
    deliverables: [
      "Custom non-blocking TCP chat server built with raw OS socket APIs",
      "Kademlia Distributed Hash Table implementation in Go/Rust with XOR routing",
      "Wireshark packet capture analysis report dissecting real Ethereum p2p traffic",
      "Production-ready libp2p decentralized peer gossip simulator with message deduplication",
    ],
    modules: [
      {
        id: "net-01",
        number: "01",
        title: "Networking Foundations, TCP/IP Stack & Socket Programming",
        weeks: "Weeks 1–2",
        headlineNote: "OSI model, TCP vs UDP, packet framing, and raw non-blocking socket APIs.",
        learningObjectives: [
          "Understand the OSI 7-layer model and the practical TCP/IP 4-layer internet stack.",
          "Master TCP mechanics: 3-way handshake, sequence/ACK numbers, and 4-way connection termination.",
          "Understand TCP flow control (sliding window) and congestion control (Slow Start, Congestion Avoidance).",
          "Write non-blocking socket servers in C/Go using epoll event-driven I/O.",
        ],
        sections: [
          {
            number: "1",
            title: "Transport Protocols: TCP vs UDP",
            items: [
              "IP addressing, subnetting, routing tables, and ARP resolution",
              "TCP reliable stream delivery: packet ordering, retransmissions, and checksums",
              "UDP datagrams: low latency, fire-and-forget, and real-time streaming use cases",
              "Packet inspection with Wireshark: dissecting SYN, ACK, and FIN flags",
            ],
          },
          {
            number: "2",
            title: "Socket Programming & I/O Multiplexing",
            items: [
              "Socket lifecycle: socket(), bind(), listen(), accept(), connect()",
              "Blocking vs Non-blocking I/O and the C10K connection problem",
              "I/O multiplexing: select, poll, and Linux epoll event notification",
            ],
          },
        ],
        tools: ["Wireshark", "tcpdump", "Socket APIs", "Netcat"],
        deliverables: ["Event-driven non-blocking TCP chat server handling 5,000+ simultaneous connections"],
      },
      {
        id: "net-02",
        number: "02",
        title: "Peer-to-Peer Topologies, Discovery & Kademlia DHT",
        weeks: "Weeks 3–4",
        headlineNote: "Decentralized peer discovery, XOR metric space, and distributed hash tables.",
        learningObjectives: [
          "Analyze peer-to-peer network topologies: unstructured vs structured overlays.",
          "Understand peer discovery mechanisms: bootstrap nodes, mDNS, and peer exchange (PEX).",
          "Master the Kademlia Distributed Hash Table (DHT) algorithm.",
          "Implement Kademlia distance metrics (XOR metric), k-buckets, and FIND_NODE lookups.",
        ],
        sections: [
          {
            number: "1",
            title: "P2P Network Topologies & Discovery",
            items: [
              "Client-Server vs P2P: single point of failure vs high resilience",
              "Unstructured P2P (Gnutella) flooding attacks vs structured overlays",
              "Bootstrap node mechanisms and maintaining active peer routing tables",
            ],
          },
          {
            number: "2",
            title: "Kademlia Distributed Hash Table (DHT)",
            items: [
              "The 160-bit ID space and the XOR metric d(x, y) = x ^ y",
              "k-buckets, alpha concurrency parameter, and replacement cache",
              "RPC protocol: PING, STORE, FIND_NODE, FIND_VALUE",
              "Iterative node lookup algorithm with logarithmic O(log N) hop bounds",
            ],
          },
        ],
        tools: ["libp2p-dht", "Go / Rust", "Wireshark"],
        deliverables: ["Standalone Kademlia DHT node with interactive key-value store and node lookup routing"],
      },
      {
        id: "net-03",
        number: "03",
        title: "GossipSub Mesh Routing, NAT Traversal & Encryption (Noise)",
        weeks: "Weeks 5–6",
        headlineNote: "GossipSub v1.1 mesh routing, firewall penetration, and encrypted peer handshakes.",
        learningObjectives: [
          "Understand pub/sub messaging over P2P networks and message amplification risks.",
          "Master GossipSub v1.1: mesh construction (D, D_low, D_high), IHAVE/IWANT metadata gossip.",
          "Understand NAT (Network Address Translation) types: full cone, restricted cone, symmetric.",
          "Implement NAT traversal: STUN, TURN, ICE, and UPnP protocols.",
          "Secure peer-to-peer connections using the Noise Protocol Framework handshake.",
        ],
        sections: [
          {
            number: "1",
            title: "GossipSub v1.1 Protocol Mechanics",
            items: [
              "Mesh formation and fan-out management for topic-based message propagation",
              "Metadata gossip: IHAVE/IWANT messages for bandwidth-efficient recovery",
              "Peer scoring and Sybil attack mitigation: evaluating delivery latency and topic validity",
            ],
          },
          {
            number: "2",
            title: "NAT Traversal & Peer Encryption",
            items: [
              "Why NATs block incoming peer connections and how STUN discovers public IP/ports",
              "TURN relays for symmetric NAT fallback and ICE candidate negotiation",
              "Cryptographic peer identification (PeerID derived from public key)",
              "Noise protocol handshakes: mutual authentication and ChaCha20-Poly1305 transport encryption",
            ],
          },
        ],
        tools: ["libp2p GossipSub", "STUN/TURN", "Noise Protocol"],
        deliverables: ["P2P publish-subscribe broadcast network with dynamic peer scoring and mesh pruning"],
      },
      {
        id: "net-04",
        number: "04",
        title: "Production libp2p Network Simulator & Block Propagation Lab",
        weeks: "Weeks 7–8",
        headlineNote: "Integrating the full modular libp2p stack: multistream-select, multiplexing, and capstone.",
        learningObjectives: [
          "Understand libp2p's modular architecture: Transports, Security, Stream Multiplexers, Protocols.",
          "Use multistream-select to negotiate application protocols over a single connection.",
          "Stream multiplexing with Yamux (multiple logical streams over one TCP connection).",
          "Build a multi-node P2P block and transaction propagation simulator capstone.",
        ],
        sections: [
          {
            number: "1",
            title: "The Modular libp2p Stack",
            items: [
              "Multiaddresses (/ip4/127.0.0.1/tcp/4001/p2p/Qm...) composable network addressing",
              "Stream multiplexers (Yamux, Mplex): opening sub-streams for RPC, gossip, and ping",
              "Protocol negotiation via /multistream-select/1.0.0",
            ],
          },
          {
            number: "2",
            title: "Capstone: P2P Blockchain Network Simulator",
            items: [
              "Simulating a 20-node decentralized P2P cluster in Docker containers",
              "Broadcasting new blocks via GossipSub and measuring propagation latency (p50, p99)",
              "Handling churn (nodes joining/leaving) and network partitions gracefully",
            ],
          },
        ],
        tools: ["libp2p", "Docker", "Go / Rust", "Wireshark"],
        deliverables: [
          "20-Node P2P Blockchain Propagation Simulator with live latency telemetry and metrics dashboard",
        ],
      },
    ],
  },
];
