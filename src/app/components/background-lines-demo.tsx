"use client";

import React, { useState, useEffect } from "react";
import { BackgroundLines } from "@/app/components/ui/background-lines";
import { motion, useAnimation } from "framer-motion";
import Typewriter from "typewriter-effect";

export function BackgroundLinesDemo() {
  const [isLoaded, setIsLoaded] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    setIsLoaded(true);
    controls.start("visible");
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <BackgroundLines className="min-h-[60vh] md:min-h-[70vh] lg:min-h-[80vh] w-full flex items-center justify-center relative overflow-hidden">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        <motion.div 
          className="flex flex-col items-center justify-center space-y-6 md:space-y-8 lg:space-y-10"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Typing Effect for Name */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 dark:from-blue-400 dark:via-purple-500 dark:to-pink-400 text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-mono relative z-20 font-bold tracking-tight text-center max-w-[90vw] sm:max-w-[85vw] md:max-w-[80vw] leading-tight">
              {isLoaded && (
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
              )}
            </h1>
            
            {/* Glow effect behind text */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-600/20 to-pink-500/20 blur-3xl"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* Subheading with Gradient Effect */}
          <motion.h2 
            variants={itemVariants}
            className="text-lg sm:text-xl md:text-2xl text-center font-medium relative z-20 bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-gray-900 dark:from-white dark:to-gray-300 max-w-[95vw] sm:max-w-[90vw] md:max-w-[85vw] leading-relaxed"
          >
            <motion.span
              className="inline-block"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                background: "linear-gradient(90deg, #374151, #1f2937, #6b7280, #374151)",
                backgroundSize: "300% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              BLOCKCHAIN DEVELOPER | ETHICAL HACKER | WEB DEVELOPER
            </motion.span>
          </motion.h2>

          {/* Description with Subtle Gradient */}
          <motion.p 
            variants={itemVariants}
            className="max-w-xs sm:max-w-sm md:max-w-xl mx-auto text-sm sm:text-base md:text-lg text-center relative z-20 text-gray-600 dark:text-gray-300 leading-relaxed"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 3 }}
            >
              Get the best advice from top experts, including elite developers, cybersecurity professionals, and blockchain innovators.
            </motion.span>
          </motion.p>

          {/* Call to action buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 mt-8"
          >
            <motion.a
              href="#Projects"
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 text-center glass-effect backdrop-blur-sm border border-white/20"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects
            </motion.a>
            <motion.a
              href="#Contact"
              className="px-6 py-3 bg-transparent border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 text-center backdrop-blur-sm"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Get in Touch
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </BackgroundLines>
  );
}