
import { InfiniteMovingCards } from "@/app/components/ui/infinite-moving-cards"; 
import { EVMCard, EthicalHackingCard, CloudPractitionerCard, InternshipCard } from "@/app/components/3d-card-demo"; // Adjust the import path

export function InfiniteMovingCardsDemo() {
  const items: { type: "component"; component: React.ReactNode }[] = [
    { type: "component", component: <EVMCard /> },
    { type: "component", component: <EthicalHackingCard /> },
    { type: "component", component: <CloudPractitionerCard /> },
    { type: "component", component: <InternshipCard /> },
  ];

  return (
    <div className="h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards items={items} direction="right" speed="slow" />
    </div>
  );
}