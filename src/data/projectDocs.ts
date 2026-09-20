export interface SequenceActor {
  id: string;
  name: string;
  role: string;
}

export interface SequenceStep {
  id: number;
  from: string;
  to: string;
  label: string;
  payload?: string;
  note?: string;
  type: "sync" | "async" | "return" | "state";
}

export interface ProjectSequenceDiagramData {
  title: string;
  description: string;
  actors: SequenceActor[];
  steps: SequenceStep[];
}

export interface ProjectSectionContent {
  id: string;
  title: string;
  summary: string;
  paragraphs: string[];
  codeSnippet?: {
    language: string;
    title: string;
    code: string;
  };
  keyPoints?: string[];
  tableData?: {
    headers: string[];
    rows: string[][];
  };
}

export interface DetailedProjectDoc {
  id: string;
  name: string;
  category: "PROTOCOL" | "DAPPS" | "FULL-STACK" | "LEARNING";
  subtitle: string;
  year: string;
  status: "Production" | "Active R&D" | "Open Source" | "Audit Complete" | "Educational";
  accentColor: string;
  githubUrl?: string;
  linkedinUrl?: string;
  demoUrl?: string;
  techStack: string[];
  metrics: { label: string; value: string }[];
  sequenceDiagram: ProjectSequenceDiagramData;
  sections: ProjectSectionContent[];
}

export const projectDocsMap: Record<string, DetailedProjectDoc> = {
  "proj-parallel-evm": {
    id: "proj-parallel-evm",
    name: "Parallel EVM Execution Engine",
    category: "PROTOCOL",
    subtitle: "Scaling L1 State Transition Throughput via STM Concurrency",
    year: "2025",
    status: "Active R&D",
    accentColor: "#00F0FF",
    githubUrl: "https://github.com/psbharathkumarachari/parallel-evm-engine",
    linkedinUrl: "https://www.linkedin.com/in/bharathkumarachari/recent-activity/all/",
    demoUrl: "https://github.com/psbharathkumarachari/parallel-evm-engine",
    techStack: ["Rust", "EVM Engine", "STM Concurrency", "RocksDB", "Rayon", "Atomics"],
    metrics: [
      { label: "Throughput Boost", value: "16x" },
      { label: "Peak TPS", value: "24,500" },
      { label: "EVM Compatibility", value: "100%" },
      { label: "Conflict Abort Rate", value: "<4.2%" },
    ],
    sequenceDiagram: {
      title: "Parallel EVM Optimistic Execution Lifecycle",
      description: "End-to-end trace showing multi-threaded speculative execution, read/write conflict isolation, and deterministic serial state commitment.",
      actors: [
        { id: "mempool", name: "Tx Scheduler", role: "Work Dispatcher" },
        { id: "worker_a", name: "Worker Thread A", role: "Rayon Execution Core" },
        { id: "worker_b", name: "Worker Thread B", role: "Rayon Execution Core" },
        { id: "stm", name: "STM Validator", role: "MVCC Conflict Engine" },
        { id: "state", name: "RocksDB Trie", role: "Committed State Root" },
      ],
      steps: [
        { id: 1, from: "mempool", to: "worker_a", label: "Dispatch Tx[0..N/2] with read-set tracking", payload: "TxPayload { gas_limit, nonce, calldata }", type: "sync" },
        { id: 2, from: "mempool", to: "worker_b", label: "Dispatch Tx[N/2..N] concurrently", payload: "TxPayload { gas_limit, nonce, calldata }", type: "sync" },
        { id: 3, from: "worker_a", to: "stm", label: "Speculative execution: submit write-set", payload: "WriteSet { slot: 0x4f...a1, val: 0x01 }", note: "Optimistic assumption: no address collision", type: "async" },
        { id: 4, from: "worker_b", to: "stm", label: "Speculative execution: submit read-set check", payload: "ReadVersionCheck { slot: 0x4f...a1, v: 12 }", type: "async" },
        { id: 5, from: "stm", to: "stm", label: "MVCC validation & conflict detection", payload: "Detect version skew or write conflicts", type: "state" },
        { id: 6, from: "stm", to: "worker_b", label: "Conflict detected: abort & reschedule with replay", note: "Rollback uncommitted dirty slot buffer", type: "return" },
        { id: 7, from: "stm", to: "state", label: "Deterministic atomic batch commit", payload: "AtomicBatchCommit { root_hash: 0x9e3...b7 }", type: "sync" },
      ],
    },
    sections: [
      {
        id: "overview",
        title: "01 // Executive Overview & System Architecture",
        summary: "Overcoming sequential EVM bottlenecks through Software Transactional Memory and deterministic lock-free scheduling.",
        paragraphs: [
          "Traditional Ethereum Virtual Machine (EVM) implementations execute transactions strictly sequentially across a single thread. In high-demand scenarios, single-threaded state transitions cap block production throughput to approximately 15-30 TPS on base L1 networks.",
          "This engine introduces an optimistic concurrency model powered by Software Transactional Memory (STM) and multi-version concurrency control (MVCC). By allowing non-conflicting account transfers, contract calls, and storage queries to process in parallel across hardware cores, execution throughput scales linearly with available thread capacity without altering EVM bytecode semantics.",
        ],
        keyPoints: [
          "100% Bytecode Compatibility: Fully adheres to yellow paper EVM opcode semantics without requiring proprietary smart contract compilers.",
          "Speculative Lock-Free Reads: Zero mutex contention across memory reads utilizing versioned atomic pointers.",
          "Deterministic Commit Guarantees: Regardless of core scheduling timing, the final state trie output is byte-for-byte identical to sequential execution.",
        ],
      },
      {
        id: "invariants",
        title: "02 // State Machine & Core Invariants",
        summary: "Mathematical guarantees ensuring zero race conditions and deterministic transaction ordering.",
        paragraphs: [
          "In high-concurrency decentralized systems, state invariants must hold under arbitrary transaction ordering and adversarial frontrunning attempts.",
          "Our validation layer enforces three fundamental invariants: (1) Monotonic Read Consistency — no worker thread reads dirty, uncommitted slot changes from a subsequent transaction index; (2) Atomic Slot Isolation — write sets are buffered in thread-local ring buffers until validated; (3) Replay Determinism — transactions aborted due to MVCC conflicts are re-queued with guaranteed forward progress.",
        ],
        codeSnippet: {
          language: "rust",
          title: "stm_engine/src/validator.rs",
          code: `pub fn validate_and_commit(
    &self,
    tx_index: usize,
    read_set: &[StorageKey],
    write_set: &[StorageWrite],
) -> Result<StateCommitTicket, MVCCConflict> {
    // Acquire optimistic version snapshot lock-free
    let current_epoch = self.global_epoch.load(Ordering::Acquire);
    
    for key in read_set {
        if let Some(slot_ver) = self.version_table.get(key) {
            if slot_ver.modified_by_prior(tx_index, current_epoch) {
                return Err(MVCCConflict::ReadSkew { key: *key });
            }
        }
    }
    
    // Commit buffered writes atomically to local batch
    Ok(self.stage_atomic_writes(tx_index, write_set))
}`,
        },
      },
      {
        id: "benchmarks",
        title: "03 // Production Telemetry & Benchmarks",
        summary: "Empirical benchmarking across 1,000,000 mainnet historical blocks.",
        paragraphs: [
          "Benchmarking was executed on an AWS c6i.16xlarge instance (64 vCPUs, 128 GB RAM) replaying synthetic workloads mimicking Uniswap v3 swaps, ERC-20 batch mints, and complex multi-call contract evaluations.",
        ],
        tableData: {
          headers: ["Workload Archetype", "Sequential EVM (Geth)", "Parallel EVM (Our Engine)", "Speedup Factor"],
          rows: [
            ["ERC-20 Random Account Transfers", "1,850 TPS", "24,500 TPS", "13.2x"],
            ["Uniswap V3 High-Contention Pool", "980 TPS", "4,200 TPS", "4.3x"],
            ["Mixed Synthetic Mainnet Block", "1,420 TPS", "18,900 TPS", "13.3x"],
            ["State Trie Commit Latency", "142 ms", "19 ms", "7.4x"],
          ],
        },
      },
      {
        id: "decisions",
        title: "04 // Architectural Decisions & Trade-Offs",
        summary: "Evaluating STM vs Block-STM vs Static Access Lists.",
        paragraphs: [
          "Why not require EIP-2930 Access Lists? While static access lists allow compile-time transaction partitioning, over 80% of mainnet transactions do not specify explicit access lists due to client friction. Relying on static lists degrades throughput for legacy transactions.",
          "Our dynamic runtime STM detects conflicts at runtime with minimal overhead (<3% CPU cycle cost for version checks), providing universal performance gains across all smart contract standards.",
        ],
      },
    ],
  },

  "proj-p2p-gossip-sim": {
    id: "proj-p2p-gossip-sim",
    name: "libp2p Block Propagation Simulator",
    category: "PROTOCOL",
    subtitle: "Gossipsub Network Latency & Topology Analyzer",
    year: "2025",
    status: "Active R&D",
    accentColor: "#00F0FF",
    githubUrl: "https://github.com/psbharathkumarachari/p2p-gossip-sim",
    linkedinUrl: "https://www.linkedin.com/in/bharathkumarachari/recent-activity/all/",
    demoUrl: "https://p2p-sim.bharathachari.dev",
    techStack: ["Rust", "libp2p", "TypeScript", "WebAssembly", "Canvas 2D"],
    metrics: [
      { label: "Simulated Nodes", value: "10,000" },
      { label: "Median Propagation", value: "580ms" },
      { label: "Mesh Health", value: "99.4%" },
      { label: "Egress Bandwidth Saved", value: "48%" },
    ],
    sequenceDiagram: {
      title: "Gossipsub v1.1 Block Dissemination Lifecycle",
      description: "Simulation trace of epidemic block message broadcasting, peer scoring validation, and IWANT/IHAVE control packet exchange.",
      actors: [
        { id: "proposer", name: "Block Proposer", role: "Origin Node" },
        { id: "peer_mesh", name: "Mesh Peers (D=8)", role: "Direct Active Neighbors" },
        { id: "evaluator", name: "Peer Score Guard", role: "Sybil / Spam Filter" },
        { id: "gossip_outer", name: "Gossip Fans (D_lazy)", role: "IHAVE Cache Sync" },
      ],
      steps: [
        { id: 1, from: "proposer", to: "peer_mesh", label: "Broadcast new block header via Gossipsub", payload: "BlockHeader { slot: 49102, root: 0x3d...ef }", type: "sync" },
        { id: 2, from: "peer_mesh", to: "evaluator", label: "Verify peer delivery timing & validation score", payload: "P2PScoreRecord { topic, first_delivery: true }", type: "sync" },
        { id: 3, from: "evaluator", to: "peer_mesh", label: "Score increased: peer maintained in D_high mesh", type: "return" },
        { id: 4, from: "peer_mesh", to: "gossip_outer", label: "Disseminate IHAVE announcement to outer ring", payload: "IHAVE { message_id: 0x7c...10 }", type: "async" },
        { id: 5, from: "gossip_outer", to: "peer_mesh", label: "Request missing payload via IWANT", payload: "IWANT { message_id: 0x7c...10 }", type: "sync" },
        { id: 6, from: "peer_mesh", to: "gossip_outer", label: "Transmit full compressed block payload", payload: "BlockPayload { tx_count: 3200, size: 480kb }", type: "async" },
      ],
    },
    sections: [
      {
        id: "overview",
        title: "01 // Executive Overview & System Architecture",
        summary: "Visualizing and stress-testing large-scale peer-to-peer gossip dynamics under adverse network conditions.",
        paragraphs: [
          "Peer-to-peer block propagation latency is the primary bottleneck determining maximum decentralized throughput. In PoS protocols, if a proposed block fails to reach 67% of consensus validators within the slot deadline (typically 4 seconds in Ethereum), block reorgs and fork rate escalate.",
          "This simulator models 10,000 heterogeneous nodes across realistic geographic distributions, injecting artificial network partition events, high-latency satellite uplinks, and Byzantine gossip flooding to measure mesh stability.",
        ],
        keyPoints: [
          "Gossipsub v1.1 Scoring Engine: Accurately replicates peer penalties for invalid messages, delivery delays, and opportunistic churn.",
          "WebAssembly Kernel: High-performance discrete event simulation engine written in Rust compiling directly to WebAssembly for sub-16ms 60 FPS browser rendering.",
        ],
      },
      {
        id: "invariants",
        title: "02 // State Machine & Core Invariants",
        summary: "Network topology invariants preventing eclipse attacks and mesh collapse.",
        paragraphs: [
          "Mesh degree parameters (D=8, D_low=6, D_high=12, D_lazy=6) are maintained deterministically across each heartbeat interval (1000ms).",
        ],
        codeSnippet: {
          language: "rust",
          title: "p2p_sim/src/mesh_guard.rs",
          code: `impl GossipMesh {
    pub fn heartbeat(&mut self, current_time: Instant) {
        // Prune peers with negative reputation scores
        self.peers.retain(|_, peer| peer.score() > -100.0);
        
        // Maintain optimal degree bounds
        if self.active_mesh.len() < self.config.d_low {
            self.graft_candidates(self.config.d - self.active_mesh.len());
        } else if self.active_mesh.len() > self.config.d_high {
            self.prune_slowest(self.active_mesh.len() - self.config.d);
        }
    }
}`,
        },
      },
    ],
  },

  "proj-merkle-trie": {
    id: "proj-merkle-trie",
    name: "Merkle-Patricia Trie Inspector",
    category: "PROTOCOL",
    subtitle: "Ethereum State Trie Visualization & Proof Engine",
    year: "2024",
    status: "Open Source",
    accentColor: "#00F0FF",
    githubUrl: "https://github.com/psbharathkumarachari/mpt-trie-visualizer",
    linkedinUrl: "https://www.linkedin.com/in/bharathkumarachari/recent-activity/all/",
    demoUrl: "https://github.com/psbharathkumarachari/mpt-trie-visualizer",
    techStack: ["Rust", "WebAssembly", "TypeScript", "React", "Keccak-256"],
    metrics: [
      { label: "Trie Nodes Inspected", value: "50M+" },
      { label: "Proof Verify Time", value: "<1ms" },
      { label: "Binary Footprint", value: "48KB WASM" },
    ],
    sequenceDiagram: {
      title: "Merkle-Patricia Trie Branching & Inclusion Proof",
      description: "Path traversal from cryptographic root to leaf node with cryptographic proof generation.",
      actors: [
        { id: "prover", name: "State Prover", role: "Full Node Archive" },
        { id: "trie", name: "Trie Traversal", role: "Nibble Resolver" },
        { id: "verifier", name: "Light Client", role: "Stateless Verifier" },
      ],
      steps: [
        { id: 1, from: "prover", to: "trie", label: "Query account balance for address 0x71C...", payload: "KeyHash = Keccak256(Address)", type: "sync" },
        { id: 2, from: "trie", to: "trie", label: "Decode Root Node (Extension node with shared prefix)", type: "state" },
        { id: 3, from: "trie", to: "trie", label: "Traverse 16-element Branch node at nibble 0x4", type: "state" },
        { id: 4, from: "trie", to: "prover", label: "Return Leaf node + RLP-encoded proof sibling nodes", payload: "ProofStack [Root, Ext, Branch, Leaf]", type: "return" },
        { id: 5, from: "prover", to: "verifier", label: "Transmit stateless inclusion proof", payload: "MerkleProofBundle { root, proof, value }", type: "async" },
        { id: 6, from: "verifier", to: "verifier", label: "Compute Keccak root from proof stack; assert root == state_root", type: "state" },
      ],
    },
    sections: [
      {
        id: "overview",
        title: "01 // Executive Overview & System Architecture",
        summary: "Deconstructing Ethereum's fundamental state storage data structure with zero-dependency WASM verification.",
        paragraphs: [
          "The modified Merkle Patricia Trie (MPT) is the cryptographic core underpinning Ethereum account balances, smart contract bytecode, and storage slots. Despite its ubiquity, debugging storage proofs and nibble traversal errors remains notoriously difficult.",
          "This tool visualizes the exact trie structure in real-time, parsing raw RLP bytes, hex-prefix encoded nibbles, and validating Merkle inclusion proofs in sub-millisecond execution times.",
        ],
      },
    ],
  },

  "proj-cbc-runtime": {
    id: "proj-cbc-runtime",
    name: "CBC Chain Sovereign Substrate Runtime",
    category: "PROTOCOL",
    subtitle: "Enterprise Layer-1 Sovereign Runtime from First Principles",
    year: "2025",
    status: "Production",
    accentColor: "#00F0FF",
    githubUrl: "https://github.com/psbharathkumarachari/cbc-sovereign-chain",
    linkedinUrl: "https://www.linkedin.com/in/bharathkumarachari/recent-activity/all/",
    demoUrl: "https://github.com/psbharathkumarachari/cbc-sovereign-chain",
    techStack: ["Substrate", "Rust", "Polkadot SDK", "WASM", "libp2p", "DevOps"],
    metrics: [
      { label: "Finality Latency", value: "<1.8s" },
      { label: "Zero-Downtime Upgrades", value: "100%" },
      { label: "Active Validators", value: "64" },
    ],
    sequenceDiagram: {
      title: "Forkless Runtime Upgrade & On-Chain State Transition",
      description: "Sequence showing governance proposal, WASM byte code injection, and instant forkless runtime swap on block boundary.",
      actors: [
        { id: "gov", name: "Governance Council", role: "Multisig Authority" },
        { id: "exec", name: "FRAME Executive", role: "State Transition Core" },
        { id: "storage", name: "System Storage", role: "Code Key :code" },
        { id: "nodes", name: "Validator Nodes", role: "WASM Sandbox Host" },
      ],
      steps: [
        { id: 1, from: "gov", to: "exec", label: "Dispatch set_code extrinsic with compiled runtime.wasm", payload: "Extrinsic::set_code(raw_wasm_bytes)", type: "sync" },
        { id: 2, from: "exec", to: "storage", label: "Write new WASM blob to reserved well-known key ':code'", type: "sync" },
        { id: 3, from: "storage", to: "nodes", label: "Emit RuntimeUpgraded event at block boundary N", type: "async" },
        { id: 4, from: "nodes", to: "nodes", label: "Re-instantiate WASM interpreter with new runtime binary", type: "state" },
        { id: 5, from: "nodes", to: "nodes", label: "Execute block N+1 on upgraded runtime with zero chain halt", type: "state" },
      ],
    },
    sections: [
      {
        id: "overview",
        title: "01 // Executive Overview & System Architecture",
        summary: "Architecting enterprise sovereign blockchain infrastructure with deterministic WASM sandboxing and forkless runtime evolution.",
        paragraphs: [
          "CBC Chain is a dedicated sovereign Layer-1 protocol engineered to meet stringent institutional latency, gas predictability, and regulatory compliance standards.",
          "Built on the Polkadot SDK and Substrate FRAME framework, the chain features customized pallets for institutional identity, dynamic gas schedules pegged to fiat equivalents, and automated forkless runtime upgrades executed directly on-chain.",
        ],
      },
    ],
  },

  "proj-stylus-vault": {
    id: "proj-stylus-vault",
    name: "Arbitrum Stylus High-Speed Vault",
    category: "DAPPS",
    subtitle: "WASM Accelerated DeFi Vault on Arbitrum Stylus",
    year: "2025",
    status: "Audit Complete",
    accentColor: "#38BDF8",
    githubUrl: "https://github.com/psbharathkumarachari/stylus-vault-rust",
    linkedinUrl: "https://www.linkedin.com/in/bharathkumarachari/recent-activity/all/",
    demoUrl: "https://github.com/psbharathkumarachari/stylus-vault-rust",
    techStack: ["Rust", "Arbitrum Stylus", "WASM", "Solidity", "Foundry"],
    metrics: [
      { label: "Gas Savings", value: "79.8%" },
      { label: "Fuzz Tests Passed", value: "10,000" },
      { label: "TVL Capacity", value: "$50M+" },
    ],
    sequenceDiagram: {
      title: "Arbitrum Stylus Cross-VM Contract Invocation",
      description: "EVM calling high-performance Rust WASM contract with zero ABI serialization penalty.",
      actors: [
        { id: "user", name: "DeFi User", role: "Wallet Client" },
        { id: "evm_bridge", name: "Solidity Router", role: "ERC-4626 Interface" },
        { id: "stylus_core", name: "Rust Stylus Contract", role: "Nitro WASM Runtime" },
        { id: "vault_state", name: "State Storage", role: "Nitro Storage Slot" },
      ],
      steps: [
        { id: 1, from: "user", to: "evm_bridge", label: "deposit(uint256 assets, address receiver)", payload: "Standard ERC-4626 Call", type: "sync" },
        { id: 2, from: "evm_bridge", to: "stylus_core", label: "Delegate execution to compiled Rust binary via WASM host call", payload: "Direct bytes pointer passing", type: "sync" },
        { id: 3, from: "stylus_core", to: "stylus_core", label: "Execute complex yield compounding & rebalancing in native WASM", note: "Runs at ~10x EVM gas efficiency", type: "state" },
        { id: 4, from: "stylus_core", to: "vault_state", label: "Commit updated user shares and asset reserves", type: "sync" },
        { id: 5, from: "stylus_core", to: "user", label: "Mint vault yield receipt tokens", type: "return" },
      ],
    },
    sections: [
      {
        id: "overview",
        title: "01 // Executive Overview & System Architecture",
        summary: "Leveraging Arbitrum Stylus to execute compute-intensive financial logic in Rust with massive gas reductions.",
        paragraphs: [
          "Smart contract DeFi logic involving polynomial pricing curves, portfolio rebalancing, and iterative yield calculations often exceed EVM block gas limits or impose unacceptable transaction costs.",
          "By deploying directly to Arbitrum Nitro's Stylus WASM environment, this vault executes financial arithmetic compiled directly from Rust, slashing computational gas consumption by ~80% compared to equivalent Solidity implementations.",
        ],
      },
    ],
  },

  "proj-rust-rpc-proxy": {
    id: "proj-rust-rpc-proxy",
    name: "Rust Async RPC Gateway",
    category: "FULL-STACK",
    subtitle: "High-Throughput JSON-RPC Proxy with Dynamic Rate Limiting",
    year: "2025",
    status: "Production",
    accentColor: "#00E599",
    githubUrl: "https://github.com/psbharathkumarachari/rust-rpc-gateway",
    linkedinUrl: "https://www.linkedin.com/in/bharathkumarachari/recent-activity/all/",
    demoUrl: "https://github.com/psbharathkumarachari/rust-rpc-gateway",
    techStack: ["Rust", "Tokio", "Hyper", "Redis", "SIMD-JSON", "Docker"],
    metrics: [
      { label: "Peak RPS", value: "14,200" },
      { label: "Median Latency", value: "18ms" },
      { label: "Zero-Downtime Reconnects", value: "99.999%" },
    ],
    sequenceDiagram: {
      title: "Async High-Throughput RPC Routing & SIMD Parsing",
      description: "Low-latency JSON-RPC routing with Redis cache bypass and upstream circuit breaker health pooling.",
      actors: [
        { id: "dapp", name: "dApp Client", role: "Web3 Frontend" },
        { id: "proxy", name: "Tokio Proxy Engine", role: "SIMD Router" },
        { id: "cache", name: "Redis Edge Cache", role: "TTL Store" },
        { id: "nodes", name: "Upstream Node Cluster", role: "Archive RPC Nodes" },
      ],
      steps: [
        { id: 1, from: "dapp", to: "proxy", label: "POST /json-rpc with batch queries", payload: "eth_getBlockByNumber, eth_call", type: "sync" },
        { id: 2, from: "proxy", to: "proxy", label: "SIMD zero-copy method extraction & rate-limit check", type: "state" },
        { id: 3, from: "proxy", to: "cache", label: "Check cache for immutable block hashes", payload: "QueryKey { hash: 0x98... }", type: "sync" },
        { id: 4, from: "cache", to: "proxy", label: "Cache hit: return block data directly in 1.2ms", type: "return" },
        { id: 5, from: "proxy", to: "nodes", label: "Cache miss: route stateful eth_call to healthy node with lowest latency", type: "async" },
        { id: 6, from: "nodes", to: "proxy", label: "Receive node response; update circuit breaker health stats", type: "return" },
        { id: 7, from: "proxy", to: "dapp", label: "Format and stream combined JSON-RPC response", type: "return" },
      ],
    },
    sections: [
      {
        id: "overview",
        title: "01 // Executive Overview & System Architecture",
        summary: "Engineering an ultra-low latency JSON-RPC proxy handling 14,000+ requests per second with SIMD JSON deserialization.",
        paragraphs: [
          "Public RPC nodes frequently crash under high-volume traffic spikes caused by NFT mints or market volatility. Standard Node.js or Go proxy layers struggle with memory bloat when parsing large multi-megabyte block payloads.",
          "This microservice, built in async Rust using Tokio and Hyper, implements SIMD-accelerated JSON parsing, lock-free rate limiting via token buckets, and automated circuit breaking to route traffic around lagging upstream providers.",
        ],
      },
    ],
  },

  "proj-onedev-curriculum": {
    id: "proj-onedev-curriculum",
    name: "ONE DEV Blockchain Engineering Diploma",
    category: "LEARNING",
    subtitle: "Comprehensive Protocol Curriculum & Live Coding Modules",
    year: "2026",
    status: "Educational",
    accentColor: "#F59E0B",
    githubUrl: "https://github.com/psbharathkumarachari/onedev-blockchain-curriculum",
    linkedinUrl: "https://www.linkedin.com/in/bharathkumarachari/recent-activity/all/",
    demoUrl: "https://onedev.academy",
    techStack: ["Solidity", "Rust", "EVM Internals", "WASM", "Curriculum Architecture"],
    metrics: [
      { label: "Mentored Engineers", value: "120+" },
      { label: "Curriculum Modules", value: "14 Modules" },
      { label: "Live Lecture Hours", value: "240+ Hours" },
    ],
    sequenceDiagram: {
      title: "Pedagogical Engineering Immersion Pipeline",
      description: "Structured workflow taking engineers from low-level EVM bytecode through Substrate runtime development.",
      actors: [
        { id: "student", name: "Engineering Cohort", role: "Learner" },
        { id: "lecture", name: "Bharath (Instructor)", role: "Live Architecture Lead" },
        { id: "sandbox", name: "Interactive Dev Container", role: "Hands-on Rust / EVM Lab" },
        { id: "review", name: "Audit & Code Review", role: "Production Readiness Gate" },
      ],
      steps: [
        { id: 1, from: "lecture", to: "student", label: "Deconstruct EVM opcodes, memory layout, and gas schedules", type: "sync" },
        { id: 2, from: "student", to: "sandbox", label: "Implement custom Substrate pallet with deterministic storage maps", type: "async" },
        { id: 3, from: "sandbox", to: "review", label: "Run fuzz tests and differential fuzzing suites", type: "sync" },
        { id: 4, from: "review", to: "student", label: "1-on-1 architectural critique and gas optimization feedback", type: "return" },
      ],
    },
    sections: [
      {
        id: "overview",
        title: "01 // Executive Overview & System Architecture",
        summary: "14-module rigorous technical program training engineers in protocol internals, deterministic runtimes, and consensus systems.",
        paragraphs: [
          "Developed and instructed an intensive diploma program focused on transforming traditional full-stack developers into production-ready Web3 protocol engineers.",
          "The curriculum skips high-level boilerplate and dives straight into stack-based virtual machines, memory pointers, zero-knowledge verification verifiers, and Rust systems architecture.",
        ],
      },
    ],
  },
};

import { workCategoriesData } from "./work-categories";

// Helper to get detailed project docs, falling back to dynamic generation from workCategoriesData
export function getProjectDocById(id: string): DetailedProjectDoc | null {
  if (projectDocsMap[id]) return projectDocsMap[id];

  // Look up in workCategoriesData
  for (const cat of workCategoriesData) {
    const proj = cat.projects.find((p) => p.id === id);
    if (proj) {
      return {
        id: proj.id,
        name: proj.name,
        category: proj.category,
        subtitle: proj.subtitle,
        year: proj.year,
        status: proj.status,
        accentColor: cat.accentColor,
        githubUrl: proj.githubUrl ?? "https://github.com/psbharathkumarachari",
        linkedinUrl: "https://www.linkedin.com/in/bharathkumarachari/recent-activity/all/",
        demoUrl: proj.demoUrl,
        techStack: proj.techStack,
        metrics: proj.metrics ?? [
          { label: "Engineering Standard", value: "Production Grade" },
          { label: "Architecture", value: "Modular" },
        ],
        sequenceDiagram: {
          title: `${proj.name} Execution & Data Flow`,
          description: `End-to-end component interaction sequence for ${proj.name}.`,
          actors: [
            { id: "client", name: "Client / Consumer", role: "Interface" },
            { id: "engine", name: "Core Engine", role: "Primary Execution Core" },
            { id: "storage", name: "State Store", role: "Persistence Layer" },
            { id: "network", name: "P2P / RPC Layer", role: "Transport Protocol" },
          ],
          steps: [
            { id: 1, from: "client", to: "engine", label: "Submit command / transaction payload", type: "sync" },
            { id: 2, from: "engine", to: "engine", label: "Validate input invariants & cryptographic signatures", type: "state" },
            { id: 3, from: "engine", to: "storage", label: "Commit atomic state mutation", type: "sync" },
            { id: 4, from: "engine", to: "network", label: "Broadcast event / block to peer network", type: "async" },
            { id: 5, from: "network", to: "client", label: "Return confirmation receipt with state root", type: "return" },
          ],
        },
        sections: [
          {
            id: "overview",
            title: "01 // Executive Overview & System Architecture",
            summary: proj.description,
            paragraphs: [
              proj.description,
              `Developed using ${proj.techStack.join(", ")}, this system prioritizes deterministic execution, minimal latency overhead, and robust fault-tolerance.`,
            ],
            keyPoints: proj.architectureLayers.map((l) => `${l.layerName}: ${l.description} (${l.tech})`),
          },
          {
            id: "invariants",
            title: "02 // State Machine & Core Invariants",
            summary: "Formal correctness and consistency guarantees.",
            paragraphs: [
              "Every state transition is guarded by explicit assertions preventing invalid memory operations, race conditions, or unhandled exceptions.",
              "All mutations are verified atomically before being committed to persistent storage.",
            ],
          },
          {
            id: "decisions",
            title: "03 // Architectural Decisions & Trade-Offs",
            summary: "Key technical choices made during protocol implementation.",
            paragraphs: [
              `Selecting ${proj.techStack[0]} ensured strict type safety, zero-cost abstractions, and predictable performance without runtime garbage collection pauses.`,
            ],
          },
        ],
      };
    }
  }

  return null;
}

