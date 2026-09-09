export const l1Pillars = [
  {
    title: "Consensus Mechanism",
    tag: "PROTOCOL CORE",
    description: "Validator set selection, Byzantine Fault Tolerance (bFT), block proposal rounds, slashing conditions, and finality gadgets (GHOST/FFG).",
    details: ["BFT Finality Engine", "Validator Stake Delegation", "Slashing Protection Modules", "Dynamic Leader Election"],
  },
  {
    title: "P2P Network Topology",
    tag: "NETWORKING",
    description: "Kademlia DHT peer discovery, libp2p transport streams, transaction gossip protocols, and block headers propagation subnets.",
    details: ["libp2p Multiplexing", "Gossipsub v1.1 Optimization", "Peer Reputation Scoring", "Sub-100ms Block Propagation"],
  },
  {
    title: "Execution Engine",
    tag: "COMPUTATION",
    description: "State transition function (STF), EVM bytecode execution, gas metering, lock-free mempool sorting, and parallel EVM transaction execution.",
    details: ["Parallel EVM (Block-level Concurrency)", "Mempool Lock-Free Ring Buffers", "Custom Precompiles", "WASM Runtime JIT"],
  },
  {
    title: "State Tree Management",
    tag: "CRYPTOGRAPHY",
    description: "Patricia-Merkle tree structures, Verkle trees, cryptographic state roots generation, state pruning, and stateless client validation.",
    details: ["Sparse Merkle Trie (SMT)", "Verkle Vector Commitments", "Historical State Pruning", "Stateless Proof Verification"],
  },
  {
    title: "Persistent Storage Engine",
    tag: "DATABASE TUNING",
    description: "Low-level Key-Value store optimization (RocksDB/PebbleDB), write-ahead logging (WAL), LSM-tree compaction, and block archive indexing.",
    details: ["RocksDB Tuning & Column Families", "Flat State Representation", "Zero-Copy Disk Read/Write", "Write-Ahead Log Compression"],
  },
];

export const l1FlowSteps = [
  { step: "01", label: "TRANSACTION", desc: "User signs payload & broadcast to P2P peer node" },
  { step: "02", label: "MEMPOOL", desc: "Lock-free queue validates nonces & prioritizes gas fees" },
  { step: "03", label: "EXECUTION", desc: "Parallel EVM engine executes STF & computes state delta" },
  { step: "04", label: "CONSENSUS", desc: "Validator Leader proposes block; committee votes via BFT" },
  { step: "05", label: "BLOCK", desc: "Block sealed with state root & merkle receipt proof" },
  { step: "06", label: "NETWORK", desc: "Header broadcast via Gossipsub across global P2P topology" },
];

export const l2Pillars = [
  {
    title: "Sequencer Architecture",
    tag: "TX ORDERING",
    description: "High-frequency transaction ingestion engine, MEV-resistant ordering rules, instant soft-finality guarantees, and fallback decentralized sequencer sets.",
    details: ["Instant Soft Receipts (<50ms)", "Fair Sequencing Services (FSS)", "Sequencer Rotation Safeguards"],
  },
  {
    title: "Rollup Compression & Batching",
    tag: "DATA EFFICIENCY",
    description: "Transaction payload compression (zlib/zstd), BLS signature aggregation, state diff batching, and cost reduction algorithms.",
    details: ["BLS Signature Merging", "State Diff Compression", "Calldata Cost Optimization (-95%)"],
  },
  {
    title: "Data Availability (DA)",
    tag: "SCALING",
    description: "Integration with modular Data Availability networks (EigenDA, Celestia) and Ethereum EIP-4844 Blobspace for cost-effective data commitment.",
    details: ["EigenDA / Celestia Sampling", "Blobspace (EIP-4844) Postings", "Reed-Solomon Erasure Coding"],
  },
  {
    title: "Bridge & L1 Settlement",
    tag: "SECURITY",
    description: "Canonical L1 rollup contract, fraud proof dispute games for Optimistic rollups, and STARK/SNARK zero-knowledge validity proof verifiers.",
    details: ["ZK Validity Proof Verifiers", "Dispute Game Contracts", "Cross-Chain Canonical Messaging"],
  },
];

export const l2FlowSteps = [
  { step: "01", label: "USERS / DAPPS", desc: "Submits transactions to L2 RPC node" },
  { step: "02", label: "L2 SEQUENCER", desc: "Orders transactions with instant soft finality (<50ms)" },
  { step: "03", label: "BATCH & COMPRESS", desc: "Aggregates 5,000+ transactions into compressed blob payloads" },
  { step: "04", label: "DATA AVAILABILITY", desc: "Posts blob payloads to Celestia / EIP-4844 DA layer" },
  { step: "05", label: "L1 SETTLEMENT", desc: "Submits state root + ZK/Fraud proof to Ethereum L1 contract" },
];
