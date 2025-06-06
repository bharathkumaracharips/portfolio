import React from "react";
import { BackgroundBeamsWithCollision } from "@/app/components/ui/background-beams-with-collision";
import { TabsDemo } from "./tabs-demo";

export function BackgroundBeamsWithCollisionDemo() {
  return (
    <BackgroundBeamsWithCollision className="min-h-[800px] sm:min-h-[1000px] md:min-h-[1200px] lg:min-h-[1400px] bg-inherit py-8 sm:py-12 md:py-16 overflow-hidden">
      <div className="relative z-20 w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
        <h2 className="text-2xl sm:text-4xl lg:text-7xl font-bold text-center text-black dark:text-white font-sans tracking-tight">
          <TabsDemo />
        </h2>
        <div className="relative mx-auto inline-block w-full max-w-full mt-4 sm:mt-8 md:mt-12 [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
          <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]"></div>
          <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4"></div>
        </div>
      </div>
    </BackgroundBeamsWithCollision>
  );
}
