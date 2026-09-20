import { Endorsement } from "@/types";
 
export const endorsementsData: Endorsement[] = [
  {
    id: "review-01",
    person: {
      role: "Chief Technology Officer",
      organization: "Blockchain Infrastructure Company",
      avatarInitials: "CTO",
    },
    category: "CLIENT",
    year: "2026",
    relationship: "Client & Architecture Lead",
    workedTogetherOn: "Parallel Execution & Batcher Architecture",
    role: "Blockchain / Protocol Engineering",
    quote:
      "Bharath is one of the rare protocol engineers who truly understands the entire vertical stack — from low-level Rust execution runtimes to multi-region Kubernetes node orchestration. His work doubled our execution throughput while cutting infrastructure spend in half.",
    confidential: true,
  },
  {
    id: "review-02",
    person: {
      role: "Head of Infrastructure",
      organization: "Institutional Staking Network",
      avatarInitials: "HI",
    },
    category: "CLIENT",
    year: "2026",
    relationship: "Infrastructure Client",
    workedTogetherOn: "Validator Cluster Resilience & Remote Signer",
    role: "Protocol Infrastructure Engineering",
    quote:
      "When our validator cluster faced network desynchronization during an unannounced mainnet surge, Bharath diagnosed the P2P Gossipsub bottleneck and deployed a fix within hours. He operates with extreme precision.",
    confidential: true,
  },
  {
    id: "review-03",
    person: {
      name: "Lead Protocol Developer",
      role: "Lead Protocol Developer",
      organization: "High-Frequency DeFi Platform",
      avatarInitials: "LP",
      linkedinUrl: "https://linkedin.com/in/bharathkumarachari",
    },
    category: "ENGINEERING",
    year: "2026",
    relationship: "Collaborator / Core Developer",
    workedTogetherOn: "Substreams Indexing & RPC Gateway",
    role: "Rust Systems Engineering",
    quote:
      "The custom Substreams indexer and RPC proxy gateway Bharath built reduced our dApp's data ingestion latency from 15 seconds to under 120 milliseconds. Incredible engineering quality.",
    confidential: false,
  },
];

export const endorsementMetrics = {
  total: endorsementsData.length,
  client: endorsementsData.filter((e) => e.category === "CLIENT").length,
  engineering: endorsementsData.filter((e) => e.category === "ENGINEERING").length,
  mentorship: endorsementsData.filter((e) => e.category === "MENTORSHIP").length,
};
