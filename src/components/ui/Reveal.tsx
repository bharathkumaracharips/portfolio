"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  once?: boolean;
  duration?: number;
  distance?: number;
}

export function Reveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
  once = true,
  duration = 0.7,
  distance = 50,
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  const variants = {
    hidden: prefersReducedMotion
      ? { opacity: 0 }
      : {
          opacity: 0,
          y: direction === "up" ? distance : direction === "down" ? -distance : 0,
          x: direction === "left" ? distance : direction === "right" ? -distance : 0,
          scale: 0.95,
        },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerRevealProps {
  children: ReactNode[];
  staggerDelay?: number;
  baseDelay?: number;
  direction?: "up" | "left" | "right";
  className?: string;
  childClassName?: string;
}

export function StaggerReveal({
  children,
  staggerDelay = 0.1,
  baseDelay = 0,
  direction = "up",
  className = "",
  childClassName = "",
}: StaggerRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: baseDelay,
      },
    },
  };

  const item = {
    hidden: prefersReducedMotion
      ? { opacity: 0 }
      : {
          opacity: 0,
          y: direction === "up" ? 40 : 0,
          x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
          scale: 0.92,
        },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={container}
      className={className}
    >
      {children.map((child, i) => (
        <motion.div key={i} variants={item} className={childClassName}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

interface CountUpProps {
  value: string;
  className?: string;
}

export function AnimatedCounter({ value, className = "" }: CountUpProps) {
  const numericMatch = value.match(/[\d,]+/);
  if (!numericMatch) return <span className={className}>{value}</span>;

  const numeric = parseInt(numericMatch[0].replace(/,/g, ""));
  const prefix = value.slice(0, value.indexOf(numericMatch[0]));
  const suffix = value.slice(value.indexOf(numericMatch[0]) + numericMatch[0].length);

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "backOut" }}
    >
      {prefix}
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {numericMatch[0]}
      </motion.span>
      {suffix}
    </motion.span>
  );
}
