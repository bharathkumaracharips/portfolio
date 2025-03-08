"use client";

import React from "react";
import { BackgroundLines } from "@/app/components/ui/background-lines";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";

export function BackgroundLinesDemo() {
  return (
    <BackgroundLines className="min-h-[60vh] md:min-h-[70vh] lg:min-h-[80vh] w-full flex items-center justify-center relative">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        <div className="flex flex-col items-center justify-center space-y-6 md:space-y-8 lg:space-y-10">
          {/* Typing Effect for Name */}
          <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 dark:from-yellow-400 dark:via-red-500 dark:to-purple-500 text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-mono relative z-20 font-bold tracking-tight text-center max-w-[90vw] sm:max-w-[85vw] md:max-w-[80vw] leading-tight">
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .pauseFor(1000)
                  .typeString("PS BHARATH KUMAR ACHARI")
                  .pauseFor(5000)
                  .deleteAll()
                  .start();
              }}
              options={{
                loop: true,
                cursor: "_",
                delay: 75,
                deleteSpeed: 50,
                autoStart: true,
              }}
            />
          </h1>

          {/* Subheading with Gradient Effect */}
          <motion.h2 
            className="text-lg sm:text-xl md:text-2xl text-center font-medium relative z-20 bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-gray-900 dark:from-white dark:to-gray-300 max-w-[95vw] sm:max-w-[90vw] md:max-w-[85vw] leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2 }}
          >
            BLOCKCHAIN DEVELOPER | ETHICAL HACKER | WEB DEVELOPER
          </motion.h2>

          {/* Description with Subtle Gradient */}
          <motion.p 
            className="max-w-xs sm:max-w-sm md:max-w-xl mx-auto text-sm sm:text-base md:text-lg text-center relative z-20 bg-clip-text text-transparent bg-gradient-to-r from-gray-600 to-gray-800 dark:from-gray-300 dark:to-gray-500 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2.5 }}
          >
            Get the best advice from top experts, including elite developers, cybersecurity professionals, and blockchain innovators.
          </motion.p>
        </div>
      </div>
    </BackgroundLines>
  );
}