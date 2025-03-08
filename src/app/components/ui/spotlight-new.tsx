"use client";
import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";

type SpotlightProps = {
  gradientFirst?: string;
  gradientSecond?: string;
  gradientThird?: string;
  translateY?: number;
  width?: number;
  height?: number;
  smallWidth?: number;
  duration?: number;
  xOffset?: number;
};

export const Spotlight = ({
  gradientFirst = "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(210, 100%, 85%, .08) 0, hsla(210, 100%, 55%, .02) 50%, hsla(210, 100%, 45%, 0) 80%)",
  gradientSecond = "radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .06) 0, hsla(210, 100%, 55%, .02) 80%, transparent 100%)",
  gradientThird = "radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .04) 0, hsla(210, 100%, 45%, .02) 80%, transparent 100%)",
  translateY = 0,
  width = 1200,
  height = 400,
  smallWidth = 200,
  duration = 10,
  xOffset = 100,
}: SpotlightProps = {}) => {
  const [isMobile, setIsMobile] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const adjustedWidth = isMobile ? width * 0.6 : width;
  const adjustedHeight = isMobile ? height * 0.8 : height;
  const adjustedSmallWidth = isMobile ? smallWidth * 0.6 : smallWidth;
  const adjustedXOffset = isMobile ? xOffset * 0.5 : xOffset;

  const rotateX = useTransform(mouseY, [0, height], [-10, 10]);
  const rotateY = useTransform(mouseX, [0, width], [-10, 10]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="pointer-events-none absolute inset-0 h-full w-full overflow-hidden"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }}
    >
      {/* Left to Right Moving Gradient */}
      <motion.div
        animate={{
          x: [0, adjustedXOffset, 0],
        }}
        transition={{
          duration,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        style={{
          rotateX,
          rotateY,
        }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <motion.div
          className="relative"
          style={{
            width: adjustedWidth,
            height: adjustedHeight,
          }}
        >
          {/* Main gradient */}
          <motion.div
            className="absolute inset-0 rounded-full opacity-50"
            style={{
              background: gradientFirst,
              filter: "blur(60px)",
            }}
          />
          
          {/* Secondary gradients */}
          <motion.div
            className="absolute inset-0 rounded-full opacity-30"
            style={{
              background: gradientSecond,
              filter: "blur(30px)",
              transform: "scale(0.8)",
            }}
          />
          
          <motion.div
            className="absolute inset-0 rounded-full opacity-20"
            style={{
              background: gradientThird,
              filter: "blur(45px)",
              transform: "scale(1.2)",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Floating particles */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 20% 20%, hsla(210, 100%, 85%, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 80%, hsla(210, 100%, 85%, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 20%, hsla(210, 100%, 85%, 0.1) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: duration * 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </motion.div>
  );
};

