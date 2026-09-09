export interface TeachingExperienceItem {
  id: string;
  chapter: string;
  organization: string;
  role: string;
  period: string;
  location: string;
  description: string;
  topics: string[];
  evidenceBadge: string;
}

export interface LectureItem {
  id: string;
  number: string;
  title: string;
  source: "ONE DEV" | "FREELANCE";
  category: "EVM & SOLIDITY" | "SUBSTRATE & RUST" | "CONSENSUS & L2" | "ARCHITECTURE";
  duration: string;
  summary: string;
  topics: string[];
  keyTakeaways: string[];
  videoSnippetTitle: string;
  videoUrl?: string; // Optional direct video URL or fallback to high-fidelity canvas simulation
  terminalTrace: string[];
  architectureSteps: { step: string; detail: string }[];
}

export interface TeachingMethodStage {
  number: string;
  title: string;
  tagline: string;
  description: string;
  stackLayer: string;
  codeSnippet: string;
}

export const teachingExperiencesData: TeachingExperienceItem[] = [
  {
    id: "exp-onedev",
    chapter: "CHAPTER 01",
    organization: "ONE DEV",
    role: "Tutor – Blockchain Engineering",
    period: "Feb 2026 – May 2026",
    location: "Nairobi County, Kenya · Remote",
    description:
      "Created and delivered high-quality curriculum content for the comprehensive Blockchain Engineering Diploma program, leading structured live hands-on coding sessions twice weekly on EVM, WASM, and decentralized protocol architecture.",
    topics: ["Solidity", "EVM Internals", "WASM Runtimes", "Curriculum Architecture", "Technical Mentorship"],
    evidenceBadge: "OFFICIAL DIPLOMA PROGRAM CURRICULUM",
  },
  {
    id: "exp-freelance",
    chapter: "CHAPTER 02",
    organization: "Freelance Protocol Labs",
    role: "Protocol Mentor & Technical Educator",
    period: "2024 – Present",
    location: "Remote",
    description:
      "Delivered structured 1-on-1 and small group technical mentoring for engineers transitioning into Web3. Guided developers through Substrate state transition pallets, custom consensus logic, smart contract gas profiling, and protocol security auditing.",
    topics: ["Rust for Blockchain", "Substrate Pallets", "Gas Profiling", "Smart Contract Auditing"],
    evidenceBadge: "TECHNICAL CODEBASE & REPO REVIEWS",
  },
];

export const lectureArchiveData: LectureItem[] = [
  {
    id: "lec-01-evm-internals",
    number: "LECTURE 01",
    title: "EVM Opcode Execution & Memory Stack Lifecycle",
    source: "ONE DEV",
    category: "EVM & SOLIDITY",
    duration: "14:20",
    summary:
      "Deconstructing how EVM bytecode executes sequentially on the stack. Step-by-step trace of memory expansion quadratic gas costs, storage slot packing, and low-level Yul assembly patterns.",
    topics: ["EVM Bytecode", "Stack / Memory / Storage", "Yul Assembly", "Gas Optimization"],
    keyTakeaways: [
      "Understand the 1024-element stack depth limit and memory expansion gas curve.",
      "How to pack multiple state variables into 32-byte storage slots to avoid expensive SSTORE opcodes.",
      "Inline Yul assembly optimization techniques for zero-copy calldata slicing.",
    ],
    videoSnippetTitle: "Deconstructing MSTORE, MLOAD, and Quadratic Memory Expansion",
    terminalTrace: [
      "$ evm-trace --bytecode 0x608060405234801561001057600080fd5b50",
      "[0000] PUSH1 0x80  (gas=3)  stack: [0x80]",
      "[0002] PUSH1 0x40  (gas=3)  stack: [0x80, 0x40]",
      "[0004] MSTORE      (gas=6)  mem[0x40..0x60] = 0x80 (free memory pointer initialized)",
      "[0005] CALLVALUE   (gas=2)  stack: [0x00]",
      "[0006] DUP1        (gas=3)  stack: [0x00, 0x00]",
      "[0007] ISZERO      (gas=3)  stack: [0x00, 0x01]",
      "✓ Free memory pointer successfully configured at 0x80",
    ],
    architectureSteps: [
      { step: "01. Calldata Ingestion", detail: "Transaction payload pushed to execution context" },
      { step: "02. Free Memory Initialization", detail: "MSTORE packs pointer at memory slot 0x40" },
      { step: "03. Function Selector Resolution", detail: "First 4 bytes of Keccak-256 hash matched via jump table" },
      { step: "04. Opcode Execution Loop", detail: "Stack operations consume deterministic gas units" },
    ],
  },
  {
    id: "lec-02-substrate-runtimes",
    number: "LECTURE 02",
    title: "Substrate State Transition Runtimes & WASM Compilation",
    source: "FREELANCE",
    category: "SUBSTRATE & RUST",
    duration: "18:45",
    summary:
      "Deep dive into constructing sovereign Layer-1 runtimes using Substrate and Rust. How runtime logic compiles to deterministic WebAssembly for forkless on-chain upgrades.",
    topics: ["Substrate FRAME", "Rust WASM", "State Transition", "Forkless Upgrades"],
    keyTakeaways: [
      "How Substrate separates the native host node from the deterministic WASM runtime blob.",
      "Designing custom FRAME storage maps and dispatchable pallet calls with weight benchmarking.",
      "Executing forkless on-chain runtime upgrades via `set_code` dispatch.",
    ],
    videoSnippetTitle: "Building a Custom FRAME Pallet & WASM State Transition Sandbox",
    terminalTrace: [
      "$ cargo build --release --target wasm32-unknown-unknown",
      "[pallet-telemetry] Compiling substrate-runtime-pallet v0.1.0",
      "[pallet-telemetry] Generated WASM binary: target/wbuild/runtime.compact.compressed.wasm",
      "$ subkey inspect-runtime ./runtime.compact.compressed.wasm",
      "✓ Runtime Spec: cbc-node-101 | Core API Version: 4 | Forkless Upgrade Ready",
    ],
    architectureSteps: [
      { step: "01. Pallet Declaration", detail: "Storage items and dispatchable calls defined in Rust" },
      { step: "02. Weight Benchmarking", detail: "Execution duration measured in picoseconds on reference hardware" },
      { step: "03. WASM Blob Generation", detail: "Compiled into deterministic standalone binary" },
      { step: "04. Host Node Execution", detail: "Wasmtime engine executes state transitions inside host consensus" },
    ],
  },
  {
    id: "lec-03-p2p-consensus",
    number: "LECTURE 03",
    title: "Distributed P2P Gossip & Consensus Finality Gadgets",
    source: "ONE DEV",
    category: "CONSENSUS & L2",
    duration: "16:10",
    summary:
      "Explaining how block proposals propagate across peer-to-peer topologies via libp2p Gossipsub, and how Byzantine fault-tolerant finality gadgets lock immutable state.",
    topics: ["libp2p", "Gossipsub Mesh", "BFT Consensus", "Finality Gadgets"],
    keyTakeaways: [
      "Understanding peer scoring, mesh pruning, and message deduplication in Gossipsub v1.1.",
      "The mathematical difference between probabilistic finality (Nakamoto) and deterministic finality (GRANDPA / PBFT).",
      "Handling network partitions and asynchronous validator voting rounds.",
    ],
    videoSnippetTitle: "Visualizing Gossip Propagation Latency Across 10,000 Nodes",
    terminalTrace: [
      "$ gossip-net --peers 10000 --topology mesh --degree 8",
      "[peer-0x3a] Broadcasting Block #48120 to 8 connected mesh neighbors",
      "[mesh-router] Hop 1: 8 nodes reached (latency: 12ms)",
      "[mesh-router] Hop 2: 64 nodes reached (latency: 38ms)",
      "[mesh-router] Hop 3: 512 nodes reached (latency: 110ms)",
      "[mesh-router] Hop 4: 4,096 nodes reached (latency: 280ms)",
      "[mesh-router] Hop 5: 10,000 nodes reached (99.8% coverage in 580ms)",
      "✓ Finality Round #48120 Committed: 2/3+ validator signatures received",
    ],
    architectureSteps: [
      { step: "01. Peer Discovery", detail: "Kademlia DHT identifies and connects active validator nodes" },
      { step: "02. Gossipsub Broadcast", detail: "Epidemic block propagation ensures sub-second global distribution" },
      { step: "03. Signature Aggregation", detail: "BLS signature threshold proves 2/3+ quorum agreement" },
      { step: "04. Finality Commit", detail: "Block hash locked immutably into canonical chain head" },
    ],
  },
  {
    id: "lec-04-security-auditing",
    number: "LECTURE 04",
    title: "Smart Contract Security, Reentrancy & Storage Collision Auditing",
    source: "FREELANCE",
    category: "EVM & SOLIDITY",
    duration: "15:30",
    summary:
      "Real-world security breakdown of classic and cross-function reentrancy vulnerabilities, read-only reentrancy in AMM price oracles, and transparent upgradeable proxy storage collision traps.",
    topics: ["Reentrancy Attacks", "Read-Only Reentrancy", "Storage Collisions", "Foundry Fuzzing"],
    keyTakeaways: [
      "Applying the Checks-Effects-Interactions (CEI) pattern and mutex reentrancy locks.",
      "How view functions without state locks can cause read-only reentrancy exploit vectors in price oracle integrations.",
      "Writing automated invariant and fuzz testing suites in Foundry to catch state anomalies.",
    ],
    videoSnippetTitle: "Live Exploitation & Remediation of a Vulnerable DeFi Vault",
    terminalTrace: [
      "$ forge test --match-contract ReentrancyExploitTest -vvvv",
      "[FAIL. Reason: Reentrancy vulnerability triggered] testExploit()",
      "Logs:",
      "  Attacker balance before: 1 ETH",
      "  Vault balance drained: 50 ETH",
      "  Attacker balance after: 51 ETH",
      "$ forge test --match-contract PatchedVaultTest",
      "[PASS] testExploitFailsWithMutexReentrancyGuard() (gas: 24,112)",
      "✓ Invariant holds across 100,000 randomized state permutations",
    ],
    architectureSteps: [
      { step: "01. Vulnerability Analysis", detail: "External call executed prior to internal state variable decrement" },
      { step: "02. Exploit Contract Setup", detail: "Fallback handler invokes re-entrant withdraw sequence" },
      { step: "03. CEI Patch Application", detail: "State balances zeroed before transfer dispatch" },
      { step: "04. Fuzz Invariant Validation", detail: "Foundry fuzz engine proves state consistency" },
    ],
  },
  {
    id: "lec-05-l2-rollups",
    number: "LECTURE 05",
    title: "Layer-2 Rollup Architecture & Calldata Compression Mechanics",
    source: "ONE DEV",
    category: "CONSENSUS & L2",
    duration: "17:00",
    summary:
      "Explaining how Optimistic and ZK Rollups scale Ethereum throughput. Deep dive into sequencer queues, EIP-4844 Blobspace submission, and binary-search interactive dispute games.",
    topics: ["Optimistic Rollups", "ZK Rollups", "EIP-4844 Blobspace", "Dispute Games"],
    keyTakeaways: [
      "How rollups decouple execution from data availability and consensus.",
      "Comparing calldata compression economics with EIP-4844 ephemeral blob transactions.",
      "How interactive bisection games pinpoint the exact single-instruction execution fault on L1.",
    ],
    videoSnippetTitle: "Tracing a Transaction from L2 Sequencer Batch to L1 Blob Verification",
    terminalTrace: [
      "$ rollup-batcher submit --tx-count 5000 --compress zstd",
      "[batcher] Raw transaction calldata: 640 KB",
      "[batcher] BLS signature aggregation: 5000 signatures -> 1 aggregate proof (96 bytes)",
      "[batcher] zstd compressed payload: 38 KB (94.1% reduction)",
      "[batcher] Submitting to Ethereum EIP-4844 Blobspace (Blob Hash: 0x01a8f9...)",
      "✓ Batch confirmed in Block #19840212 | Total L1 Fee: $4.20 (vs $180.00 standard calldata)",
    ],
    architectureSteps: [
      { step: "01. Sequencer Ingestion", detail: "Off-chain mempool processes instant user transactions" },
      { step: "02. Batch Aggregation", detail: "Transactions compressed into batched state delta" },
      { step: "03. Blob Posting", detail: "Payload published to EIP-4844 transient data availability storage" },
      { step: "04. Dispute / Proof Window", detail: "7-day challenge period or zero-knowledge proof verification" },
    ],
  },
];

export const teachingMethodStages: TeachingMethodStage[] = [
  {
    number: "01",
    title: "FUNDAMENTALS",
    tagline: "Understand the core concept from first principles",
    description:
      "We strip away framework jargon and analyze the cryptographic and distributed systems problem: What invariant are we enforcing? Why does state consistency matter across untrusted peers?",
    stackLayer: "CRYPTOGRAPHIC INVARIANTS & SYSTEM PROBLEM",
    codeSnippet: "// Problem: How do we reach state agreement without a central authority?\n// Invariant: Total token supply must remain conserved across all transfers.",
  },
  {
    number: "02",
    title: "INTERNALS",
    tagline: "Decompose what happens underneath the abstraction",
    description:
      "We step through the virtual machine stack, opcode gas costs, memory layout, and storage slot pointers. We inspect byte-by-byte how the runtime actually executes the logic.",
    stackLayer: "VIRTUAL MACHINE & STATE STORAGE LAYOUT",
    codeSnippet: "// Inspection: Free memory pointer at 0x40, storage slot packed at keccak256(key . slot)\n// Opcode cost: SLOAD (2100 cold gas / 100 warm gas), SSTORE (20000 gas)",
  },
  {
    number: "03",
    title: "IMPLEMENTATION",
    tagline: "Transform concepts into production-grade code",
    description:
      "We build the system in Rust, Solidity, or Substrate FRAME. We write low-level unit tests, fuzz testing invariants, and benchmark execution bottlenecks on real testnets.",
    stackLayer: "DETERMINISTIC LOW-LEVEL CODE & TESTS",
    codeSnippet: "pub fn execute_state_transition(origin: OriginFor<T>, data: TelemetryLog) -> DispatchResult {\n    let who = ensure_signed(origin)?;\n    T::ConsensusGuard::verify_signature(&who, &data)?;\n    StorageMap::<T>::insert(&who, data);\n    Ok(())\n}",
  },
  {
    number: "04",
    title: "SYSTEM THINKING",
    tagline: "Understand how the pieces connect into a live network",
    description:
      "We scale from single-node execution to the entire decentralized topology: p2p message gossip latency, consensus finality latency, MEV resistance, and forkless upgradeability.",
    stackLayer: "DISTRIBUTED TOPOLOGY & NETWORK FINALITY",
    codeSnippet: "// Full System: Client dApp -> JSON-RPC Gateway -> Sequencer -> P2P Mesh -> BFT Finality\n// Result: 99.999% uptime, zero-downtime forkless upgradeability.",
  },
];

export const knowledgeStackLayers = [
  { id: "layer-6", label: "APPLICATION / CONTRACTS", tech: "Solidity / Vyper / Rust", color: "#38BDF8" },
  { id: "layer-5", label: "VIRTUAL MACHINE / RUNTIME", tech: "EVM / Substrate WASM", color: "#00F0FF" },
  { id: "layer-4", label: "STATE TRANSITION ENGINE", tech: "Merkle-Patricia Trie / RocksDB", color: "#34D399" },
  { id: "layer-3", label: "CONSENSUS & FINALITY", tech: "PoS / PoI / GRANDPA / BFT", color: "#A78BFA" },
  { id: "layer-2", label: "P2P NETWORK & GOSSIP", tech: "libp2p / Gossipsub Mesh", color: "#F59E0B" },
  { id: "layer-1", label: "CRYPTOGRAPHY & SIGNATURES", tech: "BLS12-381 / Ed25519 / Keccak", color: "#EC4899" },
];
