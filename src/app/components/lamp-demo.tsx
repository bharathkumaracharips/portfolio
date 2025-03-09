"use client";
import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "@/app/components/ui/lamp";
import ContactFormDemo from "@/app/components/contact-form-demo";

export function LampDemo() {
  return (
    <LampContainer className="p-4 max-w-7xl mx-auto relative z-10 w-full min-h-screen flex flex-col items-center justify-center">
      {/* Contact Heading */}
      <motion.h1
        initial={{ opacity: 0.5, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="bg-gradient-to-br from-white to-gray-300 py-4 bg-clip-text text-center text-3xl font-semibold tracking-tight text-transparent sm:text-4xl md:text-5xl lg:text-6xl"
      >
        Contact Me
      </motion.h1>

      {/* Contact Form Section */}
      <div className="mt-600 w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl px-4">
        <ContactFormDemo />
      </div>
    </LampContainer>
  );
}