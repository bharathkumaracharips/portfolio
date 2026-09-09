import { ProtocolNarrative } from "@/components/narrative/ProtocolNarrative";
import { ExperienceBlockchainSection } from "@/components/experience/ExperienceBlockchainSection";
import { WorkProjectsSection } from "@/components/projects/WorkProjectsSection";
import { TeachingSection } from "@/components/teaching/TeachingSection";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-[#050505] text-[#F5F5F2]">
      <ProtocolNarrative />
      <ExperienceBlockchainSection />
      <WorkProjectsSection />
      <TeachingSection />
    </main>
  );
}

