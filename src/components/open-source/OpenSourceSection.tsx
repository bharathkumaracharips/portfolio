"use client";

import { motion, AnimatePresence } from "framer-motion";
import { githubStats, githubRepos } from "@/data/github-repos";
import { Github, Star, GitFork, Terminal, Code2, ExternalLink } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export function OpenSourceSection() {
  return (
    <section id="open-source" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
      <div className="absolute right-10 top-20 w-64 h-64 bg-cyan-500/5 blur-3xl pointer-events-none rounded-full" />

      <Reveal direction="up" className="flex flex-col items-start mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-900 border border-slate-800 text-cyan-400 font-mono text-xs mb-3">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          >
            <Github className="w-3.5 h-3.5 text-cyan-400" />
          </motion.div>
          11 // OPEN SOURCE &amp; CONTRIBUTION TELEMETRY
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          GITHUB METRICS &{" "}
          <span className="text-shimmer">OPEN SOURCE</span>
        </h2>
        <p className="text-slate-400 text-base sm:text-lg max-w-3xl font-normal">
          Active protocol contributions, open-source Rust crates, and distributed system tools.
        </p>
      </Reveal>

      {/* Terminal telemetry */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="p-6 sm:p-8 rounded-2xl bg-slate-950 border border-slate-800 font-mono mb-12 relative overflow-hidden"
      >
        <div className="scan-beam opacity-20" />
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6 text-xs text-slate-400 relative z-10">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span className="text-white font-bold">GITHUB TELEMETRY // @{githubStats.username}</span>
          </div>
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-emerald-400 font-bold"
          >
            {githubStats.contributionsCount} COMMITS THIS YEAR
          </motion.span>
        </div>

        {/* Language Bar */}
        <div className="mb-6 relative z-10">
          <div className="flex justify-between text-xs text-slate-400 mb-2">
            <span>LANGUAGE BREAKDOWN</span>
            <span>TOP: RUST (48%)</span>
          </div>
          <div className="h-3 rounded-full bg-slate-900 overflow-hidden flex">
            {githubStats.topLanguages.map((lang, i) => (
              <motion.div
                key={lang.name}
                initial={{ width: 0 }}
                whileInView={{ width: `${lang.percentage}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: i * 0.1, ease: "easeOut" }}
                style={{ backgroundColor: lang.color }}
                className="h-full first:rounded-l-full last:rounded-r-full"
                title={`${lang.name}: ${lang.percentage}%`}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-4 mt-3 text-xs">
            {githubStats.topLanguages.map((lang, i) => (
              <motion.div
                key={lang.name}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 + 0.5 }}
                className="flex items-center gap-1.5 text-slate-300"
              >
                <motion.span
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: lang.color }}
                />
                <span>{lang.name}</span>
                <span className="text-slate-500">({lang.percentage}%)</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Repo Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {githubRepos.map((repo, i) => (
          <motion.a
            key={repo.name}
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            whileHover={{ y: -8, borderColor: "rgba(0,240,255,0.5)", boxShadow: "0 20px 40px rgba(0,240,255,0.1)" }}
            className="p-6 rounded-xl bg-glass-card border border-slate-800 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3 font-mono text-xs">
                <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
                  <Code2 className="w-4 h-4" />
                  {repo.name}
                </span>
                <motion.div whileHover={{ scale: 1.2, rotate: 15 }}>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                </motion.div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">{repo.description}</p>

              {/* animated stars bar */}
              <div className="h-0.5 bg-slate-800 rounded-full mb-4 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${Math.min(90, (repo.stars / 200) * 100)}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.1 + 0.3 }}
                  className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-full"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between font-mono text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <motion.span
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: repo.languageColor }}
                />
                {repo.language}
              </div>
              <div className="flex items-center gap-3">
                <motion.span whileHover={{ scale: 1.1 }} className="flex items-center gap-1 hover:text-amber-400 transition-colors">
                  <Star className="w-3.5 h-3.5" />
                  {repo.stars}
                </motion.span>
                <span className="flex items-center gap-1">
                  <GitFork className="w-3.5 h-3.5" />
                  {repo.forks}
                </span>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
