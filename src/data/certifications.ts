export interface Certification {
  id: string;
  code: string;
  name: string;
  issuer: string;
  date: string;
  category: "BLOCKCHAIN & PROTOCOL" | "CLOUD & ARCHITECTURE" | "INFRASTRUCTURE & DEVOPS";
  credentialId: string;
  verificationUrl?: string;
  skills: string[];
  description: string;
  documentType: "DIGITAL CREDENTIAL" | "OFFICIAL CERTIFICATE" | "ACCREDITATION";
}

export const certificationsData: Certification[] = [
  {
    id: "cert-01",
    code: "CERT / 001",
    name: "Certified Blockchain Security & Protocol Architect",
    issuer: "Blockchain Protocol Institute",
    date: "2024",
    category: "BLOCKCHAIN & PROTOCOL",
    credentialId: "BPI-ARCH-98240",
    verificationUrl: "https://verify.blockchaininstitute.org/BPI-ARCH-98240",
    skills: [
      "Consensus Security",
      "Parallel EVM Execution",
      "Zero-Knowledge Proof Invariants",
      "P2P Network Topologies",
      "State Trie Auditing",
    ],
    description:
      "Formal technical accreditation certifying deep proficiency in distributed consensus security, deterministic WASM runtimes, parallel transaction concurrency models, and low-level bytecode auditing.",
    documentType: "OFFICIAL CERTIFICATE",
  },
  {
    id: "cert-02",
    code: "CERT / 002",
    name: "AWS Certified Solutions Architect – Professional",
    issuer: "Amazon Web Services",
    date: "2023",
    category: "CLOUD & ARCHITECTURE",
    credentialId: "AWS-PSA-771942",
    verificationUrl: "https://aws.amazon.com/verification/AWS-PSA-771942",
    skills: [
      "Multi-Region Cloud Topology",
      "High-Availability RPC Clusters",
      "K8s Auto-scaling",
      "Disaster Recovery Systems",
      "Zero-Downtime Migration",
    ],
    description:
      "Advanced professional certification validating enterprise-grade distributed cloud architecture, multi-region fault tolerance, zero-downtime ledger deployments, and high-throughput network engineering.",
    documentType: "DIGITAL CREDENTIAL",
  },
  {
    id: "cert-03",
    code: "CERT / 003",
    name: "Certified Kubernetes Administrator (CKA)",
    issuer: "Cloud Native Computing Foundation (CNCF)",
    date: "2023",
    category: "INFRASTRUCTURE & DEVOPS",
    credentialId: "CKA-2309-8814",
    verificationUrl: "https://www.cncf.io/certification/cka/verify/CKA-2309-8814",
    skills: [
      "Container Orchestration",
      "StatefulSet Node Clusters",
      "Ingress Routing & TLS",
      "Cluster Storage & CSI",
      "Prometheus Telemetry",
    ],
    description:
      "Hands-on performance-based certification establishing mastery in deploying, configuring, and managing resilient multi-node Kubernetes clusters for high-availability validator and RPC node fleets.",
    documentType: "OFFICIAL CERTIFICATE",
  },
];
