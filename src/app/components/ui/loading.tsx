"use client";

import { motion } from "framer-motion";
import { cn } from "@/app/lib/utils";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  variant?: "spinner" | "dots" | "pulse";
  className?: string;
}

export const Loading = ({ 
  size = "md", 
  variant = "spinner", 
  className 
}: LoadingProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  if (variant === "spinner") {
    return (
      <motion.div
        className={cn(
          "border-2 border-gray-300 border-t-blue-500 rounded-full",
          sizeClasses[size],
          className
        )}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    );
  }

  if (variant === "dots") {
    return (
      <div className={cn("flex space-x-1", className)}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={cn(
              "bg-blue-500 rounded-full",
              size === "sm" ? "w-1 h-1" : size === "md" ? "w-2 h-2" : "w-3 h-3"
            )}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === "pulse") {
    return (
      <motion.div
        className={cn(
          "bg-blue-500 rounded-full",
          sizeClasses[size],
          className
        )}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    );
  }

  return null;
};

export default Loading;