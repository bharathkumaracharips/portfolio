import { ProtocolNarrative } from "@/components/narrative/ProtocolNarrative";
import { ExperienceBlockchainSection } from "@/components/experience/ExperienceBlockchainSection";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-[#050505] text-[#F5F5F2]">
      <ProtocolNarrative />
      <ExperienceBlockchainSection />
    </main>
  );
}

