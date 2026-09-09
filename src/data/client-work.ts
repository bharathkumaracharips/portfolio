import { ClientProject } from "@/types";

export const clientProjectsData: ClientProject[] = [
  {
    id: "client-01-confidential-infra",
    clientName: "Confidential Blockchain Infrastructure Client",
    isConfidential: true,
    projectType: "L2 Sequencer & RPC High-Availability",
    challenge:
      "Client rollup network experienced sequencer downtime under high MEV transaction spikes, causing transaction drops and node desynchronization.",
    engineering:
      "Redesigned sequencer memory management with lock-free transaction queues, decoupled execution from signature validation, and deployed auto-scaling read-replica RPC nodes across 4 AWS regions.",
    result:
      "Zero downtime during 3 major network congestion events; processed over 45,000,000 transactions with zero dropped state transitions.",
    techStack: ["Rust", "Go", "Kubernetes", "AWS EKS", "Terraform", "Prometheus"],
    testimonial: {
      quote:
        "Bharath's protocol-level insight saved our L2 deployment during peak network launch. He diagnosed memory bottlenecks in hours that our internal team struggled with for weeks.",
      author: "Chief Technology Officer",
      role: "CTO",
      company: "Confidential L2 Rollup Foundation",
    },
  },
  {
    id: "client-02-staking-provider",
    clientName: "Institutional Liquid Staking Protocol",
    isConfidential: false,
    projectType: "Validator Node Security & Slashing Prevention",
    challenge:
      "Required an enterprise validator monitoring system to manage 4,000+ active POS validators without risking double-signing slashing penalties.",
    engineering:
      "Engineered a distributed Remote Signer architecture with hardware security module (HSM) key isolation, multi-party consensus check for block signing, and real-time network latency telemetry.",
    result:
      "Zero slashing occurrences across $450M+ staked assets; achieved 99.995% validator uptime and automated instant failover.",
    techStack: ["Go", "YubiHSM", "Docker", "Prometheus/Grafana", "Ansible", "libp2p"],
    testimonial: {
      quote:
        "Bharath built our validator security architecture from scratch. His depth in distributed consensus and operational security is unmatched.",
      author: "Head of Infrastructure",
      role: "Head of Infra",
      company: "Institutional Staking Network",
    },
  },
  {
    id: "client-03-defi-indexer",
    clientName: "High-Frequency DeFi Analytics Platform",
    isConfidential: false,
    projectType: "Real-Time Substreams Indexing Engine",
    challenge:
      "Traditional GraphQL indexers were lagging behind block generation times by up to 15 seconds, breaking real-time arbitrage algorithms.",
    engineering:
      "Built a custom Firehose/Substreams Rust pipeline streaming block deltas directly into TimescaleDB with in-memory WebSocket push subscriptions.",
    result:
      "Indexing latency dropped from 15,000ms to <120ms post-block header, powering real-time DEX liquidity monitoring.",
    techStack: ["Rust", "Substreams", "Firehose", "TimescaleDB", "WebSockets", "Go"],
  },
];
