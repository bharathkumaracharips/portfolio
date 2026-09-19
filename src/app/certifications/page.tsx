import { CertificationsSection } from "@/components/certifications/CertificationsSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Attestations & Certifications | Bharath Kumar Achari",
  description:
    "Formal records of technical qualifications in EVM chain architecture, Web3 smart contracts, Microsoft Azure cloud computing, cybersecurity, and Java systems.",
};

export default function CertificationsPage() {
  return (
    <main className="relative w-full min-h-screen bg-[#050505] text-[#F5F5F2]">
      <CertificationsSection />
    </main>
  );
}
