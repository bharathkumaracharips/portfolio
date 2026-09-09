import { GitHubRepo } from "@/types";

export const githubStats = {
  username: "psbharathkumarachari",
  totalStars: 480,
  totalCommitsThisYear: 1840,
  contributionsCount: "2,450+",
  topLanguages: [
    { name: "Rust", percentage: 48, color: "#dea584" },
    { name: "Go", percentage: 26, color: "#00ADD8" },
    { name: "TypeScript", percentage: 16, color: "#3178C6" },
    { name: "Solidity", percentage: 7, color: "#AA67DA" },
    { name: "C++", percentage: 3, color: "#f34b7d" },
  ],
};

export const githubRepos: GitHubRepo[] = [
  {
    name: "cbc-chain-core",
    description: "High-performance Layer-1 blockchain core engine written in Rust with parallel EVM execution and custom BFT consensus.",
    stars: 215,
    forks: 42,
    language: "Rust",
    languageColor: "#dea584",
    url: "https://github.com/psbharathkumarachari/cbc-chain-core",
    highlights: ["Parallel EVM Execution", "BFT Consensus Engine", "libp2p Gossipsub v1.1"],
  },
  {
    name: "evm-memory-profiler",
    description: "CLI opcode profiler for EVM runtime memory allocations, stack depth tracking, and gas consumption telemetry.",
    stars: 124,
    forks: 18,
    language: "Rust",
    languageColor: "#dea584",
    url: "https://github.com/psbharathkumarachari/evm-memory-profiler",
    highlights: ["Opcode-level Gas Telemetry", "Flamegraph Generation", "Rust SIMD Parser"],
  },
  {
    name: "high-speed-rpc-gateway",
    description: "Distributed JSON-RPC proxy daemon with Tokio async worker pools, Redis edge caching, and zero-downtime failover.",
    stars: 88,
    forks: 14,
    language: "Go",
    languageColor: "#00ADD8",
    url: "https://github.com/psbharathkumarachari/high-speed-rpc-gateway",
    highlights: ["Sub-100ms Latency", "Zero-Copy JSON Deserialization", "Prometheus Metrics"],
  },
];
