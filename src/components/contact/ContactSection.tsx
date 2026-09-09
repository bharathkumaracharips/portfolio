"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, Github, Linkedin, CheckCircle2, Terminal } from "lucide-react";
import { heroData } from "@/data/hero";
import { Reveal } from "@/components/ui/Reveal";

const stackItems = ["L1 PROTOCOL", "L2 SCALING", "INFRA", "PERFORMANCE", "WORK", "CONTACT"];

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "", email: "", company: "",
    projectType: "Protocol Engineering",
    description: "", budget: "$25k - $50k", timeline: "1 - 3 Months",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">

      {/* Ambient field */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/3 to-transparent pointer-events-none" />
      <div className="ambient-orb absolute top-20 left-1/4 w-96 h-64 bg-cyan-500/8" />
      <div className="ambient-orb absolute bottom-20 right-1/4 w-80 h-64 bg-violet-500/8" style={{ animationDelay: "4s" }} />

      {/* Collapsing Stack Intro */}
      <div className="flex flex-col items-center text-center mb-20 max-w-3xl mx-auto relative z-10">
        {/* Stack collapse animation */}
        <div className="flex flex-col items-center gap-1 mb-8">
          {stackItems.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: -20, scale: 0.8 }}
              whileInView={{ opacity: [0, 0.4, 0], y: [0, 30 * i, 60], scale: [0.9, 0.7, 0] }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: i * 0.12, ease: "easeIn" }}
              className="px-6 py-1 rounded border border-slate-800 bg-slate-900/50 font-mono text-xs text-slate-500"
            >
              {item}
            </motion.div>
          ))}
        </div>

        <Reveal direction="up" delay={0.3}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-900 border border-cyan-500/30 text-cyan-400 font-mono text-xs mb-4">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            </motion.div>
            16 // SYSTEM TERMINATION & DIRECT INQUIRY
          </div>

          <motion.h2
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4"
          >
            HAVE A SYSTEM THAT{" "}
            <motion.span
              animate={{ color: ["#00f0ff", "#00ff9d", "#8a2be2", "#00f0ff"] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              NEEDS ENGINEERING?
            </motion.span>
          </motion.h2>
          <p className="text-slate-300 text-base sm:text-lg font-normal max-w-2xl">
            Let&apos;s discuss the architecture, the problem and the path to production.
          </p>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
        {/* Contact Details */}
        <div className="lg:col-span-5 space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="p-8 rounded-2xl bg-glass-card border border-slate-800 space-y-6"
          >
            <h3 className="text-xl font-bold text-white font-mono">DIRECT CHANNELS</h3>
            <div className="space-y-3 font-mono text-sm">
              {[
                { href: `mailto:${heroData.socials.email}`, icon: <Mail className="w-4 h-4 text-cyan-400" />, text: heroData.socials.email },
                { href: heroData.socials.github, icon: <Github className="w-4 h-4 text-cyan-400" />, text: "github.com/psbharathkumarachari" },
                { href: heroData.socials.linkedin, icon: <Linkedin className="w-4 h-4 text-cyan-400" />, text: "linkedin.com/in/psbharathkumarachari" },
              ].map((link, i) => (
                <motion.a
                  key={link.text}
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  whileHover={{ x: 6, borderColor: "rgba(0,240,255,0.4)" }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:text-cyan-400 transition-colors"
                >
                  {link.icon}
                  <span>{link.text}</span>
                </motion.a>
              ))}
            </div>

            {/* PGP block */}
            <motion.div
              whileHover={{ borderColor: "rgba(0,240,255,0.3)" }}
              className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-400 transition-colors"
            >
              <div className="text-emerald-400 font-bold mb-1">PGP FINGERPRINT</div>
              <div className="text-[10px] break-all text-slate-500">
                8F2A 9401 B928 C71D 44E2 901F 773A 00B1 9F8A 3B92
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="p-8 sm:p-10 rounded-2xl bg-glass-card border border-slate-800 relative overflow-hidden"
          >
            {/* Card scan beam */}
            <div className="scan-beam opacity-20" />

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="py-12 flex flex-col items-center text-center font-mono space-y-4"
                >
                  <motion.div
                    animate={{ scale: [1, 1.15, 1], boxShadow: ["0 0 0 0 rgba(0,255,157,0.4)", "0 0 0 20px rgba(0,255,157,0)", "0 0 0 0 rgba(0,255,157,0)"] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center"
                  >
                    <CheckCircle2 className="w-8 h-8" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white">INQUIRY QUEUED</h3>
                  <p className="text-sm text-slate-400 max-w-md">Your architecture request has been transmitted. Expect a response within 24 hours.</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-4 py-2 rounded bg-slate-900 text-xs text-cyan-400 border border-slate-800 hover:border-cyan-500"
                  >
                    SEND ANOTHER MESSAGE
                  </motion.button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-5 font-mono text-xs relative z-10"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { id: "name", label: "NAME *", type: "text", required: true, placeholder: "e.g. Satoshi Nakamoto", value: formData.name, key: "name" },
                      { id: "email", label: "EMAIL ADDRESS *", type: "email", required: true, placeholder: "satoshi@protocol.org", value: formData.email, key: "email" },
                    ].map((field) => (
                      <div key={field.id}>
                        <label className="block text-slate-400 mb-2 uppercase">{field.label}</label>
                        <motion.input
                          type={field.type}
                          required={field.required}
                          value={field.value}
                          onFocus={() => setFocusedField(field.id)}
                          onBlur={() => setFocusedField(null)}
                          onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                          placeholder={field.placeholder}
                          animate={{ borderColor: focusedField === field.id ? "rgba(0,240,255,0.6)" : "rgba(30,36,54,1)" }}
                          className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none transition-colors"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-400 mb-2 uppercase">COMPANY / PROTOCOL</label>
                      <motion.input
                        type="text"
                        value={formData.company}
                        onFocus={() => setFocusedField("company")}
                        onBlur={() => setFocusedField(null)}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. L2 Foundation"
                        animate={{ borderColor: focusedField === "company" ? "rgba(0,240,255,0.6)" : "rgba(30,36,54,1)" }}
                        className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-2 uppercase">PROJECT TYPE</label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                      >
                        <option>Protocol Engineering (L1/L2)</option>
                        <option>RPC Infrastructure & Substreams</option>
                        <option>Parallel EVM / VM Optimization</option>
                        <option>Validator Security & Auditing</option>
                        <option>Full Architecture Audit</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-2 uppercase">PROJECT DESCRIPTION *</label>
                    <motion.textarea
                      required
                      rows={4}
                      value={formData.description}
                      onFocus={() => setFocusedField("desc")}
                      onBlur={() => setFocusedField(null)}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Outline your protocol architecture, performance bottleneck, or system requirements..."
                      animate={{ borderColor: focusedField === "desc" ? "rgba(0,240,255,0.6)" : "rgba(30,36,54,1)" }}
                      className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03, boxShadow: "0 0 40px rgba(0,240,255,0.4)" }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-cyan-500 text-slate-950 font-bold text-sm transition-all glow-cyan shadow-lg"
                  >
                    START A CONVERSATION
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <Send className="w-4 h-4" />
                    </motion.div>
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-24 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500"
      >
        <div>© 2026 BHARATH KUMAR ACHARI P S. ALL RIGHTS RESERVED.</div>
        <div className="mt-2 sm:mt-0 text-slate-600">ENGINEERED WITH NEXT.JS, TAILWIND CSS & RUST PHILOSOPHY</div>
      </motion.div>
    </section>
  );
}
