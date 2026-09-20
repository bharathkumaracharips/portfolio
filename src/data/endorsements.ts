import { Endorsement } from "@/types";
import { ScrollReelTestimonial } from "@/components/ui/scroll-reel-testimonials";

export const endorsementsData: Endorsement[] = [
  {
    id: "review-01",
    person: {
      role: "Chief Technology Officer",
      organization: "Blockchain Infrastructure Company",
      avatarInitials: "CTO",
      image:
        "https://cdn.21st.dev/assets/mirror/52/5216da152597678ee4f7cab615388a50ee8aa802c43e5faba6bcf909fe0efafc.jpg",
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
      image:
        "https://cdn.21st.dev/assets/mirror/c0/c0c060c53a1cd5b3d59a402b9b361d3fb8fdec13271d174282c6700cb7258bdd.jpg",
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
      image:
        "https://cdn.21st.dev/assets/mirror/37/37f69283028651a2e72bc9ed9486be14d8101f1d8444d4ea23462964a5c68d22.jpg",
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
  {
    id: "review-04",
    person: {
      role: "Director of Engineering",
      organization: "Distributed Systems Lab",
      avatarInitials: "DE",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=faces",
    },
    category: "ENGINEERING",
    year: "2025",
    relationship: "Consensus Partner",
    workedTogetherOn: "State Machine Replication & Byzantine Fault Proofs",
    role: "Consensus Architecture",
    quote:
      "Working with Bharath on consensus state-machine verification was a masterclass in deterministic engineering. He caught Byzantine edge cases that multiple auditing firms completely overlooked.",
    confidential: true,
  },
  {
    id: "review-05",
    person: {
      role: "Core Systems Contributor",
      organization: "Decentralized Runtime Ecosystem",
      avatarInitials: "CC",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=faces",
    },
    category: "MENTORSHIP",
    year: "2025",
    relationship: "Systems Mentor & Peer",
    workedTogetherOn: "Substrate FRAME Runtime & Custom Pallets",
    role: "Systems Education & Architecture",
    quote:
      "His ability to translate intricate academic cryptography papers into production-ready Rust crates with zero-cost abstractions is second to none. Thorough, principled, and extraordinarily fast.",
    confidential: true,
  },
];

export const scrollReelTestimonialsData: ScrollReelTestimonial[] =
  endorsementsData.map((e) => ({
    quote: e.quote,
    author: e.person.name ?? e.person.role,
    role: e.person.role,
    organization: e.person.organization,
    category: e.category,
    year: e.year,
    image:
      e.person.image ??
      "https://cdn.21st.dev/assets/mirror/52/5216da152597678ee4f7cab615388a50ee8aa802c43e5faba6bcf909fe0efafc.jpg",
    alt: `Portrait of ${e.person.name ?? e.person.role}`,
  }));

export const endorsementMetrics = {
  total: endorsementsData.length,
  client: endorsementsData.filter((e) => e.category === "CLIENT").length,
  engineering: endorsementsData.filter((e) => e.category === "ENGINEERING").length,
  mentorship: endorsementsData.filter((e) => e.category === "MENTORSHIP").length,
};

