import { CinematicProtocolExperience } from "@/components/canvas/CinematicProtocolExperience";

export const metadata = {
  title: "3D Cinematic Protocol Sequence // Three.js & GSAP Demo",
  description: "Technical 16-stage continuous 3D cinematic visualization: Raw Material → Silicon → Microchip → Compute Node → Distributed Network → Transaction → Propagation → Validation → Consensus → Blockchain.",
};

export default function CinematicDemoPage() {
  return (
    <main className="w-full min-h-screen bg-[#040405] overflow-x-hidden">
      <CinematicProtocolExperience />
    </main>
  );
}
