import { CaseStudy } from "@/types";

export const caseStudiesData: CaseStudy[] = [
  {
    id: "case-01-parallel-evm",
    title: "Parallel EVM Execution Engine",
    subtitle: "Scaling L1 State Transition Throughput via STM Concurrency",
    category: "L1 Protocol Engineering",
    clientType: "Enterprise Protocol",
    problem:
      "Sequential transaction execution in EVM runtimes creates severe bottlenecks, capping block execution at ~1,500 TPS and causing extreme gas spikes during network congestion.",
    analysis:
      "Profiling revealed that over 78% of transactions in an average block touch disjoint state addresses (e.g. separate DEX pools or ERC-20 transfers). Sequential processing wastes multi-core CPU capacity.",
    architecture:
      "Engineered an optimistic execution model using Software Transactional Memory (STM). Transactions execute concurrently on separate worker threads; conflict detection checks read/write sets prior to state commitment.",
    implementation:
      "Implemented in Rust using lock-free atomic pointers and a dynamic dependency graph. When a state collision occurs, only the conflicting transaction is re-executed rather than halting the entire thread pool.",
    optimization:
      "Optimized storage lookups by maintaining an in-memory transactional cache layer and SIMD-accelerated Merkle key comparisons.",
    result:
      "Achieved a 16x boost in execution throughput (24,500 TPS peak), while maintaining 100% strict EVM state compatibility.",
    technologies: ["Rust", "EVM Engine", "STM Concurrency", "RocksDB", "Rayon"],
    metrics: [
      { label: "Execution Speedup", value: "16x" },
      { label: "Peak TPS", value: "24,500" },
      { label: "EVM Compatibility", value: "100%" },
    ],
    githubUrl: "https://github.com/psbharathkumarachari/parallel-evm-engine",
  },
  {
    id: "case-02-zk-batcher",
    title: "High-Speed ZK-Rollup Batcher",
    subtitle: "Calldata Compression & Proof Verification Protocol",
    category: "L2 Rollup Engineering",
    clientType: "Client Infrastructure",
    problem:
      "High L1 gas submission costs for rollup calldata were reducing the economic advantage of an active ZK-Rollup system.",
    analysis:
      "Calldata contained redundant zero bytes, uncompressed signatures, and non-aggregated proofs, leading to expensive L1 posting transactions.",
    architecture:
      "Designed a dual-stage batching system: BLS signature aggregation combines 5,000 transaction signatures into 1 aggregate proof, while custom zstd dictionary compression shrinks transaction call data.",
    implementation:
      "Built a Go & Rust daemon that monitors the L2 sequencer queue, dynamically triggers batch sealing when gas thresholds are met, and posts to EIP-4844 Blobspace.",
    optimization:
      "Integrated emergency fallback to Celestia DA if Ethereum blobspace fees exceed predefined target limits.",
    result:
      "Reduced L1 rollup posting expenses by 94.2%, saving over $180,000 monthly in gas costs for the client protocol.",
    technologies: ["Go", "Rust", "BLS Signatures", "EIP-4844 Blobspace", "Celestia DA", "Solidity"],
    metrics: [
      { label: "Gas Cost Savings", value: "94.2%" },
      { label: "Monthly Savings", value: "$180,000" },
      { label: "Batch Size", value: "5,000 Tx" },
    ],
    githubUrl: "https://github.com/psbharathkumarachari/zk-rollup-batcher",
  },
  {
    id: "case-03-geo-rpc",
    title: "Geo-Distributed RPC Proxy Engine",
    subtitle: "Sub-100ms Latency Infrastructure for Web3 dApps",
    category: "Infrastructure & DevOps",
    clientType: "Client Infrastructure",
    problem:
      "Global dApp users experienced 400ms+ latency and frequent timeout errors due to centralized RPC endpoints overwhelmed by high traffic spikes.",
    analysis:
      "Nodes were spent executing duplicate read-only `eth_call` and `eth_getLogs` requests on state databases without effective edge caching.",
    architecture:
      "Architected an Anycast geo-routed RPC proxy layer with intelligent query routing, Redis response caching, and automated websocket health checks across 6 continents.",
    implementation:
      "Developed a custom Rust-based proxy service utilizing Tokio async I/O with zero-copy JSON parsing and automated connection pooling.",
    optimization:
      "Implemented cache warming for hot smart contract state variables (e.g. Uniswap V3 pool prices) via real-time block header listeners.",
    result:
      "Reduced median RPC latency from 420ms to 110ms and achieved 99.999% RPC uptime during major NFT/Token minting spikes.",
    technologies: ["Rust", "Tokio", "Redis", "Kubernetes", "Cloudflare Anycast", "Prometheus"],
    metrics: [
      { label: "Median Latency", value: "110ms" },
      { label: "Uptime SLA", value: "99.999%" },
      { label: "Request Cache Rate", value: "68%" },
    ],
  },
];
