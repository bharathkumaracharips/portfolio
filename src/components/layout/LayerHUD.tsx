"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const layers = [
  { id: "hero", label: "HERO", num: "01", color: "#00f0ff" },
  { id: "stack", label: "STACK", num: "02", color: "#00f0ff" },
  { id: "l1", label: "L1 PROTOCOL", num: "03", color: "#00f0ff" },
  { id: "l2", label: "L2 SCALING", num: "04", color: "#00ff9d" },
  { id: "infrastructure", label: "INFRASTRUCTURE", num: "05", color: "#a855f7" },
  { id: "performance", label: "PERFORMANCE", num: "06", color: "#00ff9d" },
  { id: "case-studies", label: "CASE STUDIES", num: "07", color: "#ffb800" },
  { id: "cbc-chain", label: "CBC CHAIN", num: "08", color: "#00f0ff" },
  { id: "client-work", label: "CLIENT WORK", num: "09", color: "#00ff9d" },
  { id: "projects", label: "PROJECTS", num: "10", color: "#a855f7" },
  { id: "open-source", label: "OPEN SOURCE", num: "11", color: "#00f0ff" },
  { id: "experience", label: "EXPERIENCE", num: "12", color: "#00ff9d" },
  { id: "certifications", label: "CERTS", num: "13", color: "#ffb800" },
  { id: "testimonials", label: "REVIEWS", num: "14", color: "#00ff9d" },
  { id: "about", label: "PHILOSOPHY", num: "15", color: "#00f0ff" },
  { id: "contact", label: "CONTACT", num: "16", color: "#a855f7" },
];

export function LayerHUD() {
  const [activeLayer, setActiveLayer] = useState<string>("hero");
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      setScrollPct(Math.min(1, window.scrollY / maxScroll));

      for (let i = layers.length - 1; i >= 0; i--) {
        const section = document.getElementById(layers[i].id);
        if (section && scrollPos >= section.offsetTop) {
          setActiveLayer(layers[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeLayerObj = layers.find((l) => l.id === activeLayer);
  const activeIndex = layers.findIndex((l) => l.id === activeLayer);

  return (
    <div className="fixed right-3 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-1 pointer-events-auto select-none">
      {/* Progress Arc */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        className="bg-glass px-2.5 py-3 rounded-lg border border-slate-800/80 shadow-2xl flex flex-col gap-1 text-[9px] font-mono mb-2"
      >
        <div className="flex items-center justify-end gap-1.5 mb-1 text-slate-500 tracking-widest border-b border-slate-800/80 pb-1">
          <span>LAYER HUD</span>
        </div>

        {/* Scrollable progress indicator */}
        <div className="relative flex justify-end mb-1">
          <div className="w-0.5 bg-slate-800 rounded-full overflow-hidden" style={{ height: `${layers.length * 14}px` }}>
            <motion.div
              className="w-full"
              style={{
                height: `${scrollPct * 100}%`,
                background: `linear-gradient(to bottom, #00f0ff, ${activeLayerObj?.color || "#00f0ff"})`,
              }}
            />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2 }}
        className="bg-glass px-2 py-3 rounded-lg border border-slate-800/80 shadow-2xl flex flex-col gap-1.5 text-[9px] font-mono"
      >
        {layers.map((layer, i) => {
          const isActive = activeLayer === layer.id;
          const isNearActive = Math.abs(i - activeIndex) <= 2;

          return (
            <motion.a
              key={layer.id}
              href={`#${layer.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: isActive ? 1 : isNearActive ? 0.6 : 0.3 }}
              whileHover={{ opacity: 1, x: -4 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2 group cursor-pointer"
              title={layer.label}
            >
              {/* Hover label */}
              <AnimatePresence>
                {isActive && (
                  <motion.span
                    key="label"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="text-[8px] font-bold tracking-wider whitespace-nowrap"
                    style={{ color: layer.color }}
                  >
                    {layer.label}
                  </motion.span>
                )}
              </AnimatePresence>

              <span
                className={cn(
                  "text-[9px] px-1 rounded transition-all",
                  isActive
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                    : "bg-slate-900 text-slate-600 group-hover:text-slate-300"
                )}
              >
                {layer.num}
              </span>

              {/* Active indicator dot */}
              <motion.span
                animate={isActive ? {
                  scale: [1, 1.5, 1],
                  boxShadow: [`0 0 0px ${layer.color}`, `0 0 8px ${layer.color}`, `0 0 0px ${layer.color}`],
                } : { scale: 1 }}
                transition={{ duration: 1.5, repeat: isActive ? Infinity : 0 }}
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-all",
                  isActive ? "" : "bg-slate-700 group-hover:bg-slate-400"
                )}
                style={isActive ? { backgroundColor: layer.color } : {}}
              />
            </motion.a>
          );
        })}
      </motion.div>
    </div>
  );
}
