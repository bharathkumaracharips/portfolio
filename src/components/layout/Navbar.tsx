"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Mail, Menu, X, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "STACK", href: "#stack" },
  { name: "L1", href: "#l1" },
  { name: "L2", href: "#l2" },
  { name: "INFRA", href: "#infrastructure" },
  { name: "PERF", href: "#performance" },
  { name: "PROJECTS", href: "#projects" },
  { name: "EXPERIENCE", href: "#experience" },
  { name: "CONTACT", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [tps, setTps] = useState(24.5);
  const [latency, setLatency] = useState(12);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    const tpsInterval = setInterval(() => {
      setTps((p) => parseFloat((p + (Math.random() - 0.5) * 0.5).toFixed(1)));
      setLatency((p) => Math.max(8, Math.min(20, p + Math.floor((Math.random() - 0.5) * 3))));
    }, 2000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(tpsInterval);
    };
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled ? "bg-glass py-3 backdrop-blur-xl shadow-2xl border-b border-cyan-500/10" : "py-5 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <motion.a
          href="#"
          className="flex items-center gap-2 group"
          whileHover={{ scale: 1.02 }}
        >
          <motion.div
            animate={{ boxShadow: ["0 0 0 0 rgba(0,240,255,0)", "0 0 0 6px rgba(0,240,255,0.1)", "0 0 0 0 rgba(0,240,255,0)"] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="w-8 h-8 rounded bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 group-hover:bg-cyan-500/20 transition-all"
          >
            <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}>
              <Cpu className="w-4 h-4" />
            </motion.div>
          </motion.div>
          <div className="flex flex-col">
            <span className="text-xs font-mono tracking-widest text-slate-400 group-hover:text-cyan-400 transition-colors">
              PROTOCOL // ENG
            </span>
            <span className="text-sm font-bold tracking-tight text-white">BHARATH ACHARI</span>
          </div>
        </motion.a>

        {/* Live telemetry badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="hidden lg:flex items-center gap-3 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-[11px] font-mono text-slate-400"
        >
          <motion.span
            animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex h-2 w-2 relative"
          >
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </motion.span>
          <span className="text-emerald-400 font-semibold">MAINNET ACTIVE</span>
          <span className="text-slate-600">|</span>
          <motion.span key={latency} initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-slate-300">
            {latency}ms PING
          </motion.span>
          <span className="text-slate-600">|</span>
          <motion.span key={tps} initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-cyan-400">
            {tps}k TPS
          </motion.span>
        </motion.div>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-5">
          {navItems.map((item, i) => (
            <motion.a
              key={item.name}
              href={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              whileHover={{ y: -2, color: "#00f0ff" }}
              className="text-xs font-mono text-slate-400 tracking-wider transition-colors"
            >
              {item.name}
            </motion.a>
          ))}
          <motion.a
            href="#contact"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.07, boxShadow: "0 0 20px rgba(0,240,255,0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 hover:border-cyan-400 transition-all"
          >
            <Mail className="w-3.5 h-3.5" />
            CONNECT
          </motion.a>
        </nav>

        {/* Mobile toggle */}
        <motion.button
          onClick={() => setMobileOpen(!mobileOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="md:hidden p-2 text-slate-400 hover:text-white"
          aria-label="Toggle Navigation"
        >
          <AnimatePresence mode="wait">
            {mobileOpen
              ? <motion.div key="x" initial={{ rotate: -90 }} animate={{ rotate: 0 }}><X className="w-6 h-6" /></motion.div>
              : <motion.div key="menu" initial={{ rotate: 90 }} animate={{ rotate: 0 }}><Menu className="w-6 h-6" /></motion.div>
            }
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-slate-950/98 border-b border-slate-800 px-4 pt-4 pb-6 space-y-2 font-mono text-sm backdrop-blur-xl overflow-hidden"
          >
            <div className="flex items-center gap-2 py-2 text-xs text-emerald-400 border-b border-slate-800/80 mb-2">
              <motion.span animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1, repeat: Infinity }} className="h-2 w-2 rounded-full bg-emerald-500" />
              NODE STATUS: OPERATIONAL ({latency}ms)
            </div>
            {navItems.map((item, i) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setMobileOpen(false)}
                className="block py-2.5 text-slate-300 hover:text-cyan-400 transition-colors border-b border-slate-900"
              >
                {item.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
