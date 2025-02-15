"use client";
import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "@/app/components/ui/lamp";
import ContactFormDemo from "@/app/components/contact-form-demo";

export function LampDemo() {
  return (
    <LampContainer className=" p-4 max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-[400px] flex items-center justify-center h-screen">
      <div className="text-center">
        <motion.h1
          initial={{ opacity: 0.5, y: 500 }}
          whileInView={{ opacity: 1, y: 280 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className= " mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        >
          Contact Me
        </motion.h1>

        <div className="mt-8 md:mt-[300px] ">
          <ContactFormDemo />
        </div>
      </div>
    </LampContainer>
  );
}


