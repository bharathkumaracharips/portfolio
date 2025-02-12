"use client";

import React from "react";
import { BackgroundLines } from "@/app/components/ui/background-lines";
import Typewriter from "typewriter-effect";
export function BackgroundLinesDemo() {
  return (
    <BackgroundLines className="flex items-center  justify-center w-full flex-col px-4 relative">
      {/* Typing Effect for Name */}
      <h1 className="bg-clip-text text-transparent bg-transparent text-center bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 dark:from-yellow-400 dark:via-red-500 dark:to-purple-500 text-4xl md:text-5xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
        <Typewriter
          onInit={(typewriter) => {
            typewriter.typeString("PS BHARATH KUMAR ACHARI").start();
          }}
        />
      </h1>

      {/* Subheading with Gradient Effect */}
      <h2 className="text-xl md:text-2xl text-center  font-medium relative z-20 bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-gray-900 dark:from-white dark:to-gray-300">
        BLOCKCHAIN DEVELOPER | ETHICAL HACKER | WEB DEVELOPER
      </h2>

      {/* Description with Subtle Gradient */}
      <p className="max-w-xl mx-auto text-sm md:text-lg text-center mt-4 relative z-20 bg-clip-text text-transparent bg-gradient-to-r from-gray-600 to-gray-800 dark:from-gray-300 dark:to-gray-500">
        Get the best advice from top experts, including elite developers, cybersecurity professionals, and blockchain innovators.
      </p>
    </BackgroundLines>
  );
}