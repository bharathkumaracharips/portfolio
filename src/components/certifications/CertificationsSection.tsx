"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { certificationsData } from "@/data/certifications";
import { Certification } from "@/types";
import { Award, ExternalLink, ShieldCheck, X } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export function CertificationsSection() {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  return (
    <section id="certifications" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
      <div className="absolute left-10 top-40 w-64 h-64 bg-amber-500/5 blur-3xl pointer-events-none rounded-full" />

      <Reveal direction="up" className="flex flex-col items-start mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-900 border border-amber-500/30 text-amber-400 font-mono text-xs mb-3">
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
          </motion.div>
          13 // VERIFIED CREDENTIALS
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          CERTIFICATIONS &{" "}
          <span className="text-gradient-fire">CREDENTIALS</span>
        </h2>
        <p className="text-slate-400 text-base sm:text-lg max-w-3xl font-normal">
          Formal protocol architecture, AWS cloud systems, and Kubernetes admin certifications.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {certificationsData.map((cert, i) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            whileHover={{ y: -8, borderColor: "rgba(255,184,0,0.4)" }}
            className="p-6 rounded-xl bg-glass-card border border-slate-800 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-4 font-mono text-xs text-slate-500">
                <span>{cert.issuer}</span>
                <motion.span
                  animate={{ color: ["#ffb800", "#ffd60a", "#ffb800"] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                  className="font-bold"
                >
                  {cert.date}
                </motion.span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">{cert.name}</h3>
              <p className="text-xs font-mono text-slate-400 mb-6">ID: {cert.credentialId}</p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {cert.skills.map((skill, si) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + si * 0.04 }}
                    whileHover={{ scale: 1.1 }}
                    className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-300"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <motion.button
                onClick={() => setSelectedCert(cert)}
                whileHover={{ scale: 1.05, color: "#00f0ff" }}
                whileTap={{ scale: 0.95 }}
                className="text-xs font-mono font-bold text-slate-300 transition-colors"
              >
                PREVIEW CREDENTIAL
              </motion.button>
              <motion.a
                href={cert.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-1 text-xs font-mono text-amber-400 font-bold hover:text-amber-300 transition-colors"
              >
                VERIFY
                <ExternalLink className="w-3.5 h-3.5" />
              </motion.a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Animated modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 40 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-cyan-500/40 p-8 text-slate-200 shadow-2xl"
            >
              <motion.button
                onClick={() => setSelectedCert(null)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                className="absolute top-6 right-6 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </motion.button>

              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  animate={{ boxShadow: ["0 0 0 0 rgba(0,240,255,0)", "0 0 0 10px rgba(0,240,255,0.1)", "0 0 0 0 rgba(0,240,255,0)"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400"
                >
                  <ShieldCheck className="w-6 h-6" />
                </motion.div>
                <div>
                  <span className="text-xs font-mono text-emerald-400 font-bold block">CRYPTOGRAPHICALLY VERIFIED</span>
                  <h3 className="text-xl font-bold text-white">{selectedCert.name}</h3>
                </div>
              </div>

              <div className="space-y-3 font-mono text-xs bg-slate-950 p-4 rounded-xl border border-slate-800 mb-6">
                {[
                  { label: "ISSUER:", value: selectedCert.issuer },
                  { label: "DATE ISSUED:", value: selectedCert.date },
                  { label: "CREDENTIAL ID:", value: selectedCert.credentialId, highlight: true },
                ].map((row, ri) => (
                  <motion.div
                    key={row.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: ri * 0.1 }}
                    className="flex justify-between"
                  >
                    <span className="text-slate-500">{row.label}</span>
                    <span className={row.highlight ? "text-cyan-400" : "text-white font-bold"}>{row.value}</span>
                  </motion.div>
                ))}
              </div>

              <motion.a
                href={selectedCert.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-cyan-500 text-slate-950 font-mono font-bold text-xs hover:bg-cyan-400 transition-colors"
              >
                OPEN VERIFICATION PROVIDER LINK
                <ExternalLink className="w-4 h-4" />
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
