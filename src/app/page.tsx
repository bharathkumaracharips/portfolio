"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";

import FloatingDockDemo from "@/app/components/floating-dock-demo";
import { BackgroundLinesDemo } from "@/app/components/background-lines-demo";
import { InfiniteMovingCardsDemo } from "@/app/components/infinite-moving-cards-demo";
import AnimatedModalDemo from "./components/Animated-Modal-Demo";
import { TimelineDemo } from "./components/timeline-demo";
import { SpotlightNewDemo } from "./components/spotlight-new-demo";
import { LampDemo } from "./components/lamp-demo";
import { BackgroundBeamsWithCollisionDemo } from "./components/background-beams-with-collision-demo";
import { RainTextDemo } from "./components/matrix-demo";

export default function Page() {
  useEffect(() => {
    document.documentElement.classList.add("dark"); // Forces dark mode
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
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
    <div className="flex flex-col bg-black text-white items-center justify-center w-full overflow-hidden">
      {/* Hero Section */}
      <motion.section 
        className="relative z-10 w-full min-h-screen" 
        id="Home"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <BackgroundLinesDemo />
        <div className="absolute inset-0 pointer-events-none">
          <RainTextDemo />
        </div>
      </motion.section>
      
      {/* Skills Section */}
      <motion.section 
        className="relative z-10 w-full py-20" 
        id="Skills"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <SpotlightNewDemo />
      </motion.section>
      
      {/* Projects Section */}
      <motion.section 
        className="relative z-10 w-full py-20" 
        id="Projects"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <BackgroundBeamsWithCollisionDemo />   
      </motion.section>
      
      {/* Animated Modal Section */}
      <motion.section 
        className="relative z-10 w-full py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <AnimatedModalDemo />
      </motion.section>

      {/* Timeline Section */}
      <motion.section 
        className="relative z-10 w-full py-20" 
        id="Timeline"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <TimelineDemo />
      </motion.section>

      {/* Certificates Section */}
      <motion.section 
        className="relative z-10 w-full py-20" 
        id="Certificates"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <div className="max-w-7xl mx-auto px-4 mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Certifications & Achievements
          </motion.h2>
          <motion.p 
            className="text-center text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            A showcase of my professional certifications and continuous learning journey in technology and development.
          </motion.p>
        </div>
        <InfiniteMovingCardsDemo />
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        className="relative z-10 w-full" 
        id="Contact"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <LampDemo />
      </motion.section>
      
      {/* Spacer for floating dock */}
      <div className="h-24" />

      {/* Floating Dock */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[1000]">
        <FloatingDockDemo />
      </div>

      {/* Scroll to top button */}
      <motion.button
        className="fixed bottom-20 right-6 z-[999] p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.2 }}
        aria-label="Scroll to top"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </motion.button>
    </div>
  );
}