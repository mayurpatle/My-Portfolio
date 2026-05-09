import { motion } from "framer-motion";
import Reveal from "../components/Reveal";

/**
 * Bento grid — explicit row/column spans, no auto-flow magic.
 * Layout (desktop, 4 columns):
 *
 *   Row 1-2:  [ Java 2×2 ]  [ Kafka 2×1     ]
 *                           [ K8s 1×1 ][Redis 1×1]
 *   Row 3-4:  [ Postgres 2×2 ] [ AWS 1×1 ][LangGraph 1×1]
 *                              [    DSA Arsenal 2×1 (full-width below)    ]
 *
 * Total: 4 cols × 5 rows. Each tile uses col-start + row-start for predictability.
 */
export default function Stack() {
  return (
    <section id="stack" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">
            [ 03 / Toolkit ]
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-4 mb-16 max-w-3xl font-display text-display-lg">
            Calibrated for <span className="italic-display text-white/50">production</span>.
          </h2>
        </Reveal>

        {/* Mobile: stacked column. Desktop: 4-col × 5-row explicit grid. */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-5" style={{ gridAutoRows: "minmax(180px, auto)" }}>

          {/* TILE 1 — Java/Spring — 2 cols × 2 rows, top-left */}
          <Reveal className="md:col-span-2 md:row-span-2">
            <div
              data-cursor="hover"
              className="glass group relative h-full min-h-[260px] overflow-hidden rounded-3xl p-8 transition-all duration-500 hover:border-white/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/10 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
              <div className="relative">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
                  <span className="font-display text-2xl text-neon-cyan">J</span>
                </div>
                <h3 className="font-display text-3xl leading-tight">Java 17 + Spring Boot 3</h3>
                <p className="mt-3 max-w-md text-sm text-white/60">
                  Daily driver. Reactive endpoints, AOP-driven cross-cutting concerns,
                  hand-tuned JVM flags, the whole observability stack.
                </p>
                <div className="mt-6 flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-wider">
                  {["Webflux", "AOP", "Actuator", "Micrometer", "Hibernate"].map((t) => (
                    <span key={t} className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-white/70">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* TILE 2 — Kafka — 2 cols × 1 row, top-right */}
          <Reveal delay={0.05} className="md:col-span-2 md:row-span-1">
            <div
              data-cursor="hover"
              className="glass group relative h-full min-h-[180px] overflow-hidden rounded-3xl p-6 transition-all duration-500 hover:border-white/20"
            >
              <div className="flex h-full items-center justify-between gap-6">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-neon-violet">Streaming</p>
                  <h3 className="mt-1 font-display text-2xl">Apache Kafka</h3>
                  <p className="mt-2 text-xs text-white/55">KRaft mode · Saga · Idempotent producers</p>
                </div>
                <div className="flex flex-col gap-1.5">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ scaleX: [0.4, 1, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
                      className="h-1 w-16 origin-left rounded-full bg-neon-violet/60"
                    />
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* TILE 3 — K8s — 1 col × 1 row, second row right side */}
          <Reveal delay={0.1} className="md:col-span-1 md:row-span-1">
            <div
              data-cursor="hover"
              className="glass group relative h-full min-h-[180px] overflow-hidden rounded-3xl p-6 transition-all duration-500 hover:border-white/20"
            >
              <div className="flex h-full flex-col justify-between">
                <div className="grid aspect-square w-full max-w-[120px] grid-cols-3 gap-1.5">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0.3 }}
                      whileInView={{ opacity: [0.3, 1, 0.3] }}
                      viewport={{ once: false }}
                      transition={{ duration: 1.8, repeat: Infinity, delay: (i % 3) * 0.2 }}
                      className="aspect-square rounded-md bg-neon-cyan/40"
                    />
                  ))}
                </div>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-white/50">EKS · K8s · Docker</p>
              </div>
            </div>
          </Reveal>

          {/* TILE 4 — Redis — 1 col × 1 row */}
          <Reveal delay={0.15} className="md:col-span-1 md:row-span-1">
            <div
              data-cursor="hover"
              className="glass group relative h-full min-h-[180px] overflow-hidden rounded-3xl p-6 transition-all duration-500 hover:border-white/20"
            >
              <div className="flex h-full flex-col justify-between">
                <p className="font-display text-5xl text-neon-rose">⌬</p>
                <div>
                  <h3 className="font-display text-xl">Redis</h3>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-white/50">
                    SETNX · Pub/Sub · TTL caching
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* TILE 5 — Postgres — 2 cols × 2 rows, bottom-left */}
          <Reveal delay={0.2} className="md:col-span-2 md:row-span-2">
            <div
              data-cursor="hover"
              className="glass group relative h-full min-h-[260px] overflow-hidden rounded-3xl p-8 transition-all duration-500 hover:border-white/20"
            >
              <p className="font-mono text-[10px] uppercase tracking-widest text-neon-amber">Persistence</p>
              <h3 className="mt-2 font-display text-3xl">Postgres · pgvector · Elastic</h3>
              <p className="mt-3 max-w-md text-sm text-white/60">
                Relational where consistency rules; vector search for semantic
                memory; ES for full-text. The right tool for the right query plan.
              </p>
              <div className="mt-8 space-y-2 font-mono text-[11px]">
                {[
                  { lbl: "SELECT users WHERE …", w: "85%", c: "bg-neon-amber/70" },
                  { lbl: "VECTOR <-> embedding", w: "62%", c: "bg-neon-cyan/70" },
                  { lbl: "MATCH name^3 desc",    w: "48%", c: "bg-neon-violet/70" },
                ].map((q) => (
                  <div key={q.lbl} className="flex items-center gap-3">
                    <span className="w-44 truncate text-white/50">{q.lbl}</span>
                    <div className="flex-1 overflow-hidden rounded-full bg-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: q.w }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className={`h-1.5 rounded-full ${q.c}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* TILE 6 — AWS Orbital — 1 col × 1 row */}
          <Reveal delay={0.25} className="md:col-span-1 md:row-span-1">
            <div
              data-cursor="hover"
              className="glass group relative h-full min-h-[180px] overflow-hidden rounded-3xl p-6 transition-all duration-500 hover:border-white/20"
            >
              <div className="absolute right-2 top-2 h-24 w-24">
                <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
                  <circle cx="50" cy="50" r="22" fill="none" stroke="rgba(94,234,212,0.18)" strokeWidth="0.5" />
                  <circle cx="50" cy="50" r="32" fill="none" stroke="rgba(94,234,212,0.12)" strokeWidth="0.5" strokeDasharray="2 3" />
                  <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(168,85,247,0.12)" strokeWidth="0.5" />
                </svg>

                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="absolute inset-0 -m-2 rounded-full bg-neon-cyan/15 blur-sm" />
                    <motion.div
                      animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="h-2 w-2 rounded-full bg-neon-cyan"
                    />
                  </div>
                </div>

                <div className="absolute inset-0" style={{ animation: "orbit-spin 6s linear infinite" }}>
                  <div className="absolute left-[72%] top-1/2 -translate-y-1/2">
                    <div className="absolute -inset-1 rounded-full bg-neon-cyan/25 blur-[2px]" />
                    <div className="relative h-1.5 w-1.5 rounded-full bg-neon-cyan" />
                  </div>
                </div>
                <div className="absolute inset-0" style={{ animation: "orbit-spin-rev 10s linear infinite" }}>
                  <div className="absolute left-1/2 top-[18%] -translate-x-1/2">
                    <div className="absolute -inset-1 rounded-full bg-neon-violet/25 blur-[2px]" />
                    <div className="relative h-1.5 w-1.5 rounded-full bg-neon-violet" />
                  </div>
                </div>
                <div className="absolute inset-0" style={{ animation: "orbit-spin 14s linear infinite" }}>
                  <div className="absolute left-[92%] top-1/2 -translate-y-1/2">
                    <div className="absolute -inset-1 rounded-full bg-neon-amber/25 blur-[2px]" />
                    <div className="relative h-2 w-2 rounded-full bg-neon-amber" />
                  </div>
                </div>
              </div>

              <div className="relative flex h-full flex-col justify-end">
                <p className="font-mono text-[10px] uppercase tracking-widest text-neon-cyan">Cloud</p>
                <h3 className="mt-2 font-display text-2xl">AWS</h3>
                <p className="mt-1 text-xs text-white/55">EKS · S3 · RDS · Lambda</p>
              </div>
            </div>
          </Reveal>

          {/* TILE 7 — LangGraph — 1 col × 1 row */}
          <Reveal delay={0.3} className="md:col-span-1 md:row-span-1">
            <div
              data-cursor="hover"
              className="glass group relative h-full min-h-[180px] overflow-hidden rounded-3xl p-6 transition-all duration-500 hover:border-white/20"
            >
              <svg viewBox="0 0 100 60" className="absolute inset-x-0 top-4 h-20 w-full opacity-70" fill="none">
                <motion.line x1="20" y1="30" x2="50" y2="15" stroke="#5EEAD4" strokeWidth="0.5" strokeDasharray="2 2"
                  initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.2 }} />
                <motion.line x1="20" y1="30" x2="50" y2="45" stroke="#5EEAD4" strokeWidth="0.5" strokeDasharray="2 2"
                  initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.4 }} />
                <motion.line x1="50" y1="15" x2="80" y2="30" stroke="#A855F7" strokeWidth="0.5" strokeDasharray="2 2"
                  initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.6 }} />
                <motion.line x1="50" y1="45" x2="80" y2="30" stroke="#A855F7" strokeWidth="0.5" strokeDasharray="2 2"
                  initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.8 }} />
                <motion.circle cx="20" cy="30" r="3" fill="#5EEAD4" animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0 }} />
                <motion.circle cx="50" cy="15" r="2.5" fill="#5EEAD4" animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.4 }} />
                <motion.circle cx="50" cy="45" r="2.5" fill="#5EEAD4" animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.8 }} />
                <motion.circle cx="80" cy="30" r="3" fill="#A855F7" animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 1.2 }} />
              </svg>
              <div className="relative flex h-full flex-col justify-end">
                <p className="font-mono text-[10px] uppercase tracking-widest text-white/50">↗ Now learning</p>
                <h3 className="mt-1 font-display text-xl">LangGraph + RAG</h3>
                <p className="mt-1 text-xs text-white/55">Agent orchestration, vector pipelines</p>
              </div>
            </div>
          </Reveal>

        </div>

        {/* TILE 8 — DSA Arsenal — SEPARATE full-width row below the bento.
            Pulled out of the grid entirely so it can't accidentally break the layout above. */}
        <Reveal delay={0.35}>
          <div
            data-cursor="hover"
            className="glass group relative mt-5 overflow-hidden rounded-3xl p-7 transition-all duration-500 hover:border-white/20 md:p-8"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              style={{
                background:
                  "linear-gradient(120deg, rgba(94,234,212,0.08), transparent 50%, rgba(168,85,247,0.08))",
              }}
            />

            <div className="relative grid gap-6 md:grid-cols-12 md:gap-8">

              {/* LEFT — Big number + difficulty distribution */}
              <div className="md:col-span-4 md:border-r md:border-white/10 md:pr-8">
                <p className="font-mono text-[10px] uppercase tracking-widest text-neon-cyan">
                  DSA · LeetCode arsenal
                </p>
                <div className="mt-3 flex items-baseline gap-2">
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="font-display text-6xl leading-none md:text-7xl"
                  >
                    500
                  </motion.span>
                  <span className="font-display text-3xl leading-none text-neon-cyan">+</span>
                </div>
                <p className="mt-2 text-sm text-white/60">
                  problems solved · pattern-led practice
                </p>

                <div className="mt-5">
                  <div className="flex h-1.5 overflow-hidden rounded-full bg-white/5">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: "30%" }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }} className="h-full bg-emerald-400/70" />
                    <motion.div initial={{ width: 0 }} whileInView={{ width: "55%" }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }} className="h-full bg-neon-amber/70" />
                    <motion.div initial={{ width: 0 }} whileInView={{ width: "15%" }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }} className="h-full bg-neon-rose/70" />
                  </div>
                  <div className="mt-2 flex justify-between font-mono text-[9px] uppercase tracking-widest text-white/45">
                    <span><span className="text-emerald-400">●</span> Easy 30%</span>
                    <span><span className="text-neon-amber">●</span> Medium 55%</span>
                    <span><span className="text-neon-rose">●</span> Hard 15%</span>
                  </div>
                </div>
              </div>

              {/* RIGHT — Pattern coverage matrix */}
              <div className="md:col-span-8">
                <p className="font-mono text-[10px] uppercase tracking-widest text-white/50">
                  Pattern coverage
                </p>
                <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-3">
                  {[
                    { name: "Trees · BST",            pct: 92, color: "#5EEAD4" },
                    { name: "Graphs · BFS/DFS",       pct: 88, color: "#5EEAD4" },
                    { name: "Dynamic Programming",    pct: 85, color: "#A855F7" },
                    { name: "Heap · Priority Queue",  pct: 80, color: "#A855F7" },
                    { name: "Sliding Window",         pct: 90, color: "#5EEAD4" },
                    { name: "Stack · Monotonic",      pct: 78, color: "#FCD34D" },
                    { name: "Backtracking",           pct: 72, color: "#FCD34D" },
                    { name: "Greedy · Math",          pct: 75, color: "#A855F7" },
                    { name: "Trie · Union-Find",      pct: 65, color: "#FCD34D" },
                  ].map((p, i) => (
                    <motion.div
                      key={p.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-mono uppercase tracking-wider text-white/70">{p.name}</span>
                        <span className="font-mono text-white/40">{p.pct}%</span>
                      </div>
                      <div className="mt-1 h-0.5 overflow-hidden rounded-full bg-white/5">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${p.pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3 + i * 0.04, ease: "easeOut" }}
                          className="h-full rounded-full"
                          style={{ background: p.color }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                    // pattern-first, brute-force last
                  </span>
                  <a
                    href="https://leetcode.com/u/mayurpatle/"
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="hover"
                    className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-neon-cyan transition-opacity hover:opacity-70"
                  >
                    View on LeetCode
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                      <path d="M7 17 17 7M17 7H8m9 0v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}