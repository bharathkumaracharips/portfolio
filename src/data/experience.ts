import { ExperienceItem } from "@/types";

export const experienceData: ExperienceItem[] = [
  {
    id: "exp-01",
    organization: "Distributed Systems & Protocol Engineering Lab",
    position: "Senior Protocol & Infrastructure Engineer",
    period: "2023 — PRESENT",
    location: "Remote / Global",
    responsibilities: [
      "Architect and maintain core protocol state engines, P2P networking runtimes, and L2 rollup batching infrastructure.",
      "Lead performance optimization initiatives targeting node RPC latency, parallel transaction execution, and state database disk I/O.",
      "Manage multi-region Kubernetes RPC clusters delivering 99.999% SLA across high-demand Web3 dApps.",
    ],
    achievements: [
      "Boosted EVM state execution throughput from 1,500 TPS to 24,500 TPS using STM parallel execution in Rust.",
      "Cut client L2 rollup calldata posting expenses by 94.2% via BLS signature aggregation & EIP-4844 Blobspace integration.",
      "Designed zero-downtime blue/green validator deployment pipelines for over 1,000 active nodes.",
    ],
    technologies: ["Rust", "Go", "Parallel EVM", "libp2p", "Kubernetes", "EIP-4844", "RocksDB", "Terraform"],
  },
  {
    id: "exp-02",
    organization: "Web3 Infrastructure & Scaling Solutions",
    position: "Blockchain Infrastructure Lead",
    period: "2021 — 2023",
    location: "Remote",
    responsibilities: [
      "Engineered geo-distributed JSON-RPC proxy gateways, custom Substreams block indexers, and real-time WebSocket push pipelines.",
      "Configured high-security Remote Signer architectures for institutional POS staking networks.",
      "Provided protocol security audits and gas profiling for client smart contracts and custom execution layers.",
    ],
    achievements: [
      "Reduced median client RPC node latency from 420ms to 110ms with custom Rust caching proxies.",
      "Zero slashing penalties maintained across $450M+ in institutional staked assets under management.",
      "Automated CI/CD infrastructure reducing node provisioning time from 4.2 hours to 22 minutes.",
    ],
    technologies: ["Go", "Rust", "Substreams", "Docker", "AWS EKS", "Solidity", "Grafana", "TimescaleDB"],
  },
  {
    id: "exp-03",
    organization: "Cloud & Distributed Systems Consultancy",
    position: "Systems & DevOps Engineer",
    period: "2019 — 2021",
    location: "Hybrid",
    responsibilities: [
      "Built resilient cloud backend architectures, containerized microservices, and automated infrastructure as code (IaC).",
      "Optimized Linux kernel parameters, TCP socket buffers, and database connection pooling for high-concurrency systems.",
    ],
    achievements: [
      "Migrated monolithic deployments to Kubernetes with zero unexpected outage reports.",
      "Implemented comprehensive Prometheus/Grafana telemetry alerting pipelines.",
    ],
    technologies: ["Go", "Python", "Kubernetes", "Docker", "Terraform", "Linux Kernel", "PostgreSQL"],
  },
];
