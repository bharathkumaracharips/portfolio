export const featuredProjectData = {
  id: "cbc-chain",
  name: "CBC CHAIN",
  tagline: "High-Throughput Layer-1 Protocol & Institutional Staking Network",
  category: "L1 PROTOCOL & INFRASTRUCTURE",
  description:
    "Designed and engineered a high-performance Layer 1 blockchain architecture built in Rust, featuring a parallelized EVM execution environment, custom BFT consensus engine, and automated multi-region validator node orchestration.",
  metrics: [
    { label: "PEAK THROUGHPUT", value: "24,500 TPS" },
    { label: "BLOCK FINALITY", value: "850 ms" },
    { label: "VALIDATOR UPTIME", value: "99.998%" },
    { label: "NODES IN TOPOLOGY", value: "1,250+" },
  ],
  architecture: {
    protocol: "Custom BFT consensus with optimistic leader proposals and BLS signature aggregation for validator voting.",
    execution: "Parallel EVM runtime utilizing software transactional memory (STM) to execute non-conflicting state transactions concurrently.",
    infrastructure: "Geo-distributed Kubernetes cluster deployment using Terraform and Ansible with automated P2P node health monitoring.",
    storage: "Optimized RocksDB storage engine with flat state representation and historical state tree pruning.",
  },
  myContribution: [
    "Architected and implemented the core P2P networking layer in Rust using libp2p and Gossipsub v1.1.",
    "Built the parallel transaction execution scheduler, boosting EVM throughput from 1.5k TPS to over 24k TPS.",
    "Designed the high-availability RPC proxy network with custom zero-copy JSON-RPC serialization.",
    "Engineered zero-downtime automated deployment pipelines for protocol version updates across 1,000+ validator nodes.",
  ],
  techStack: ["Rust", "libp2p", "Parallel EVM", "RocksDB", "Kubernetes", "Terraform", "Prometheus", "Go"],
  githubUrl: "https://github.com/psbharathkumarachari/cbc-chain",
  demoUrl: "https://explorer.cbcchain.io",
};
