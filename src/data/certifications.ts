import { Certification } from "@/types";

export const certificationsData: Certification[] = [
  {
    id: "cert-01",
    name: "Certified Blockchain Security & Protocol Architect",
    issuer: "Blockchain Protocol Institute",
    date: "2024",
    credentialId: "BPI-ARCH-98240",
    verificationUrl: "https://verify.blockchaininstitute.org/BPI-ARCH-98240",
    skills: ["Consensus Security", "Parallel Execution", "Zero-Knowledge Proofs", "P2P Topologies"],
  },
  {
    id: "cert-02",
    name: "AWS Certified Solutions Architect – Professional",
    issuer: "Amazon Web Services",
    date: "2023",
    credentialId: "AWS-PSA-771942",
    verificationUrl: "https://aws.amazon.com/verification/AWS-PSA-771942",
    skills: ["Multi-Region Cloud", "K8s Auto-scaling", "Disaster Recovery", "High-Availability RPC"],
  },
  {
    id: "cert-03",
    name: "Certified Kubernetes Administrator (CKA)",
    issuer: "Cloud Native Computing Foundation (CNCF)",
    date: "2023",
    credentialId: "CKA-2309-8814",
    verificationUrl: "https://www.cncf.io/certification/cka/verify/CKA-2309-8814",
    skills: ["Container Orchestration", "StatefulSet Nodes", "Ingress Controllers", "K8s Telemetry"],
  },
];
