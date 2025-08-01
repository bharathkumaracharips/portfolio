import { cn } from "@/app/lib/utils";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";

// Define types for items
type TextItem = {
  type: "text";
  quote: string;
  name: string;
  title: string;
};

type ComponentItem = {
  type: "component";
  component: React.ReactNode;
};

type Item = TextItem | ComponentItem;

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: Item[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  // Memoized speed mapping for better performance
  const speedMap = useMemo(() => ({
    fast: 120,
    normal: 60,
    slow: 30,
  }), []);

  // Memoized function to set animation direction
  const getDirection = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse"
      );
    }
  }, [direction]);

  // Optimized addAnimation function with better performance
  const addAnimation = useCallback(() => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      // Only duplicate if not already duplicated
      if (scrollerContent.length === items.length) {
        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true);
          scrollerRef.current?.appendChild(duplicatedItem);
        });
      }

      const totalWidth = scrollerRef.current.scrollWidth / 2; // Divide by 2 since we duplicated
      const duration = totalWidth / speedMap[speed];

      containerRef.current.style.setProperty(
        "--animation-duration",
        `${duration}s`
      );

      getDirection();
      setStart(true);
    }
  }, [getDirection, speed, speedMap, items.length]);

  useEffect(() => {
    addAnimation();
  }, [addAnimation]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative z-20 max-w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max gap-6 md:gap-8 py-4 flex-nowrap will-change-transform",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        style={{
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
        }}
      >
        {items.map((item, idx) => (
          <motion.li 
            key={idx} 
            className="w-[280px] sm:w-[320px] md:w-[400px] lg:w-[480px] flex-shrink-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5, 
              delay: idx * 0.1,
              ease: "easeOut"
            }}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
          >
            {item.type === "text" ? (
              <motion.blockquote 
                className="glass-effect dark:glass-effect p-6 rounded-xl border border-white/10 dark:border-white/5 backdrop-blur-sm hover:backdrop-blur-md transition-all duration-300 hover:shadow-lg hover:border-white/20 dark:hover:border-white/10"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-sm md:text-base text-gray-100 leading-relaxed block mb-4">
                  &ldquo;{item.quote}&rdquo;
                </span>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-gray-200">{item.name}</span>
                  <span className="text-xs text-gray-400">{item.title}</span>
                </div>
              </motion.blockquote>
            ) : (
              <motion.div 
                className="w-full h-full"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                {item.component}
              </motion.div>
            )}
          </motion.li>
        ))}
      </ul>
    </div>
  );
};