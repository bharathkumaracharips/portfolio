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
    <div className="h-auto min-h-[40rem] py-10 md:py-16 lg:py-20 rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <InfiniteMovingCards 
          items={items} 
          direction="right" 
          speed="slow" 
          className="py-4 md:py-8"
        />
      </div>
    </div>
  );
}