"use client";

import { motion } from "framer-motion";
import { cn } from "@/app/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  duration?: number;
}

export const SectionWrapper = ({
  children,
  className,
  id,
  delay = 0,
  duration = 0.8,
}: SectionWrapperProps) => {
  const variants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration,
        delay,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      id={id}
      className={cn("relative w-full", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={variants}
    >
      {children}
    </motion.section>
  );
};

export default SectionWrapper;