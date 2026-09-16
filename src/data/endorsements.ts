import { Endorsement } from "@/types";

export const endorsementsData: Endorsement[] = [
  {
    id: "signal-001",
    signalNumber: "001",
    quote:
      "Bharath is one of the rare protocol engineers who truly understands the entire vertical stack — from low-level Rust execution runtimes to multi-region Kubernetes node orchestration. His work doubled our execution throughput while cutting infrastructure spend in half.",
    author: "Chief Technology Officer",
    role: "CTO",
    organization: "Confidential L2 Scaling Protocol",
    relationship: "Client & Architecture Lead",
    category: "ENGINEERING",
    source: "CLIENT FEEDBACK",
    sourceUrl: "https://linkedin.com/in/bharathkumarachari",
    featured: true,
    projectContext: "Parallel Execution & Batcher Architecture",
    highlights: ["Vertical stack mastery", "2x execution throughput", "50% infrastructure cost reduction"],
  },
  {
    id: "signal-002",
    signalNumber: "002",
    quote:
      "When our validator cluster faced network desynchronization during an unannounced mainnet surge, Bharath diagnosed the P2P Gossipsub bottleneck and deployed a fix within hours. He operates with extreme precision.",
    author: "Head of Infrastructure",
    role: "Head of Infra",
    organization: "Institutional Staking Network",
    relationship: "Infrastructure Client",
    category: "ENGINEERING",
    source: "CLIENT FEEDBACK",
    sourceUrl: "https://linkedin.com/in/bharathkumarachari",
    featured: true,
    projectContext: "Validator Cluster Resilience & Remote Signer",
    highlights: ["P2P Gossipsub resolution", "Rapid emergency deployment", "Extreme operational precision"],
  },
  {
    id: "signal-003",
    signalNumber: "003",
    quote:
      "The custom Substreams indexer and RPC proxy gateway Bharath built reduced our dApp's data ingestion latency from 15 seconds to under 120 milliseconds. Incredible engineering quality.",
    author: "Lead Protocol Developer",
    role: "Lead Protocol Dev",
    organization: "High-Frequency DeFi Platform",
    relationship: "Collaborator / Core Developer",
    category: "ENGINEERING",
    source: "CLIENT FEEDBACK",
    sourceUrl: "https://linkedin.com/in/bharathkumarachari",
    featured: true,
    projectContext: "Substreams Indexing & RPC Gateway",
    highlights: ["Sub-120ms ingestion latency", "Custom Substreams pipeline", "Production reliability"],
  },
];

// Helper calculations based exclusively on genuine data
export const endorsementMetrics = {
  total: endorsementsData.length,
  engineering: endorsementsData.filter((e) => e.category === "ENGINEERING").length,
  teaching: endorsementsData.filter((e) => e.category === "TEACHING").length,
  collaboration: endorsementsData.filter((e) => e.category === "COLLABORATION").length,
};
