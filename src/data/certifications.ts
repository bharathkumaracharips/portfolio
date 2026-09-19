export interface Certification {
  id: string;
  code: string;
  name: string;
  issuer: string;
  date: string;
  issueDateFull?: string;
  category:
    | "BLOCKCHAIN & PROTOCOL"
    | "CLOUD & ARCHITECTURE"
    | "CYBERSECURITY & SYSTEMS"
    | "SOFTWARE & PROGRAMMING"
    | "INFRASTRUCTURE & DEVOPS";
  credentialId: string;
  verificationUrl?: string;
  verificationNote?: string;
  documentFile?: string;
  skills: string[];
  description: string;
  documentType: "DIGITAL CREDENTIAL" | "OFFICIAL CERTIFICATE" | "ACCREDITATION";
}

export const certificationsData: Certification[] = [
  {
    id: "cert-01",
    code: "CERT / 001",
    name: "EVM Chain Certification",
    issuer: "Alchemy University",
    date: "2025",
    issueDateFull: "2025",
    category: "BLOCKCHAIN & PROTOCOL",
    credentialId: "AU-EVM-2025",
    verificationUrl: "https://university.alchemy.com",
    skills: [
      "Blockchain Cryptography",
      "Ethereum Node API",
      "Smart Contract Development",
      "Solidity",
      "Ethereum",
      "EVM",
    ],
    description:
      "Official accreditation from Alchemy University certifying deep technical proficiency in Ethereum Virtual Machine architecture, blockchain cryptography, Ethereum JSON-RPC / node APIs, and smart contract development in Solidity.",
    documentType: "OFFICIAL CERTIFICATE",
  },
  {
    id: "cert-02",
    code: "CERT / 002",
    name: "Transition to Web3 – Course 3 | How Smart Contracts Work",
    issuer: "Rise In",
    date: "2025",
    issueDateFull: "June 2025",
    category: "BLOCKCHAIN & PROTOCOL",
    credentialId: "RISEIN-W3C3-2025",
    verificationUrl: "https://www.risein.com",
    documentFile:
      "Certificates-Transition to Web3 - Course 3 _ How Smart Contracts Work-PS BHARATH KUMAR ACHARI.pdf",
    skills: [
      "Web3",
      "Smart Contracts",
      "Blockchain",
      "Ethereum",
      "Solidity Execution",
      "DApp Interactions",
    ],
    description:
      "Technical credential awarded for successfully completing all lessons, projects, and practical smart contract implementations covering EVM execution mechanics, state storage, and decentralized protocol interaction.",
    documentType: "OFFICIAL CERTIFICATE",
  },
  {
    id: "cert-03",
    code: "CERT / 003",
    name: "Microsoft Certified: Azure Fundamentals",
    issuer: "Microsoft",
    date: "2024",
    issueDateFull: "May 8, 2024",
    category: "CLOUD & ARCHITECTURE",
    credentialId: "MSFT-AZ900-MAY2024",
    verificationUrl: "https://learn.microsoft.com",
    verificationNote: "Online verification available through Microsoft Learn",
    skills: [
      "Microsoft Azure",
      "Cloud Computing",
      "Cloud Fundamentals",
      "Azure Architecture & Services",
      "Cloud Security & Governance",
    ],
    description:
      "Official Microsoft credential validating foundational knowledge of cloud concepts, core Azure architectural components, cloud compute, storage, networking, security, privacy, and compliance governance.",
    documentType: "DIGITAL CREDENTIAL",
  },
  {
    id: "cert-04",
    code: "CERT / 004",
    name: "Introduction to Cyber Security",
    issuer: "Infosys Springboard",
    date: "2024",
    issueDateFull: "May 7, 2024",
    category: "CYBERSECURITY & SYSTEMS",
    credentialId: "INFOSYS-CS-MAY2024",
    verificationUrl: "https://springboard.infosys.com",
    verificationNote: "Official certificate with QR-code verification",
    documentFile: "infosys.pdf",
    skills: [
      "Cybersecurity",
      "Information Security",
      "Security Fundamentals",
      "Threat Analysis & Mitigation",
      "Network & System Defense",
    ],
    description:
      "Professional cybersecurity certification from Infosys Springboard establishing core competencies in information security, threat vectors, cryptographic fundamentals, and defensive security architectures with QR-code verification.",
    documentType: "OFFICIAL CERTIFICATE",
  },
  {
    id: "cert-05",
    code: "CERT / 005",
    name: "Java Course for Placements",
    issuer: "CodeTantra.com",
    date: "2024",
    issueDateFull: "January 31, 2024",
    category: "SOFTWARE & PROGRAMMING",
    credentialId: "CODETANTRA-JAVA-2024",
    verificationUrl: "https://codetantra.com",
    skills: [
      "Java",
      "Object-Oriented Programming",
      "Programming Fundamentals",
      "Data Structures & Algorithms",
      "JVM Architecture",
    ],
    description:
      "Comprehensive software engineering qualification from CodeTantra certifying hands-on proficiency in Java, object-oriented programming (OOP) paradigms, core data structures, algorithms, and placement-level problem solving.",
    documentType: "OFFICIAL CERTIFICATE",
  },
];

