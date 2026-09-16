import { EndorsementsSection } from "@/components/endorsements/EndorsementsSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Endorsements & Signals | Bharath Kumar Achari",
  description:
    "Genuine feedback, testimonials, and signals from protocol architects, infrastructure leads, and engineering collaborators working with Bharath Kumar Achari.",
};

export default function EndorsementsPage() {
  return (
    <main className="relative w-full min-h-screen bg-[#050505] text-[#F5F5F2]">
      <EndorsementsSection isStandalonePage={true} />
    </main>
  );
}
