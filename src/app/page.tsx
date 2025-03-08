"use client";
import { useEffect } from "react";

import FloatingDockDemo from "@/app/components/floating-dock-demo";
import { BackgroundLinesDemo } from "@/app/components/background-lines-demo";
import { InfiniteMovingCardsDemo } from "@/app/components/infinite-moving-cards-demo";
import AnimatedModalDemo from "./components/Animated-Modal-Demo";
import { TimelineDemo } from "./components/timeline-demo";
import { SpotlightNewDemo } from "./components/spotlight-new-demo";
import { LampDemo } from "./components/lamp-demo";
import { BackgroundBeamsWithCollisionDemo } from "./components/background-beams-with-collision-demo";
export default function Page() {
  useEffect(() => {
    document.documentElement.classList.add("dark"); // Forces dark mode
  }, []);

  return (
    <div className="flex flex-col bg-black text-white items-center justify-center gap-10 p-5 w-full overflow-hidden">
      {/* Background Lines */}
      <div className="relative z-10 w-full " id="Home">
        <BackgroundLinesDemo />
      </div>
    
      <div className="relative z-10 w-full" id="Skills">
        <SpotlightNewDemo />
      </div>
      
      <div className="relative z-10 w-full" id="Projects">
        <BackgroundBeamsWithCollisionDemo />
      </div>
      
      {/* Animated Modal */}
      <div className="relative z-100 w-full">
        <AnimatedModalDemo />
      </div>

      {/* Timeline */}
      <div className="relative z-10   w-full" id="Timeline">
        <TimelineDemo />
      </div>

    
    
      {/* Infinite Moving Cards */}
      <div className="relative z-10 w-full" id="Certificates">
        <InfiniteMovingCardsDemo />
      </div>

      <div className="relative z-9 w-full" id="Contact">
        <LampDemo />
      </div>
      
      <br />
      <br />

      {/* Floating Dock */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-[1000]">
        <FloatingDockDemo />
      </div>
    </div>
  );
}