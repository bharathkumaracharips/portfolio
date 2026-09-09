import { Testimonial } from "@/types";

export const testimonialsData: Testimonial[] = [
  {
    id: "test-01",
    quote:
      "Bharath is one of the rare protocol engineers who truly understands the entire vertical stack — from low-level Rust execution runtimes to multi-region Kubernetes node orchestration. His work doubled our execution throughput while cutting infrastructure spend in half.",
    author: "Chief Technology Officer",
    role: "CTO",
    company: "Confidential L2 Scaling Protocol",
    project: "Parallel Execution & Batcher Architecture",
    linkedInUrl: "https://linkedin.com",
  },
  {
    id: "test-02",
    quote:
      "When our validator cluster faced network desynchronization during an unannounced mainnet surge, Bharath diagnosed the P2P Gossipsub bottleneck and deployed a fix within hours. He operates with extreme precision.",
    author: "Head of Infrastructure",
    role: "Head of Infra",
    company: "Institutional Staking Network",
    project: "Validator Cluster Resilience & Remote Signer",
    linkedInUrl: "https://linkedin.com",
  },
  {
    id: "test-03",
    quote:
      "The custom Substreams indexer and RPC proxy gateway Bharath built reduced our dApp's data ingestion latency from 15 seconds to under 120 milliseconds. Incredible engineering quality.",
    author: "Lead Protocol Developer",
    role: "Lead Protocol Dev",
    company: "High-Frequency DeFi Platform",
    project: "Substreams Indexing & RPC Gateway",
    linkedInUrl: "https://linkedin.com",
  },
];
