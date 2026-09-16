import { ProtocolNarrative } from "@/components/narrative/ProtocolNarrative";
import { ExperienceBlockchainSection } from "@/components/experience/ExperienceBlockchainSection";
import { WorkProjectsSection } from "@/components/projects/WorkProjectsSection";
import { TeachingSection } from "@/components/teaching/TeachingSection";
import { CertificationsSection } from "@/components/certifications/CertificationsSection";
import { ServicesSection } from "@/components/services/ServicesSection";
import { EndorsementsSection } from "@/components/endorsements/EndorsementsSection";
import { TransactionSection } from "@/components/contact/TransactionSection";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-[#050505] text-[#F5F5F2]">
      <ProtocolNarrative />
      <ExperienceBlockchainSection />
      <WorkProjectsSection />
      <TeachingSection />
      <CertificationsSection />
      <ServicesSection />
      <EndorsementsSection />
      <TransactionSection />
    </main>
  );
}




