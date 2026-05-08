import { motion } from "framer-motion";
import Reveal from "../components/Reveal";

/**
 * Bento Grid — tiles of varied size, each with its own micro-interaction.
 * The asymmetry is the point. Aim for "magazine layout, not table."
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

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:grid-rows-4 md:gap-5">
          {/* TILE 1 — Big feature: Java/Spring */}
          <Reveal delay={0.0} className="md:col-span-2 md:row-span-2">
            <div
              data-cursor="hover"
              className="glass group relative h-full min-h-[260px] overflow-hidden rounded-3xl p-8 transition-all duration-500 hover:border-white/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/10 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
              <div className="relative">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
                  <span className="font-display text-2xl text-neon-cyan">J</span>
                </div>
                <h3 className="font-display text-3xl leading-tight">
                  Java 17 + Spring Boot 3
                </h3>
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

          {/* TILE 2 — Kafka with animated pulse */}
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
                {/* Animated topic stream */}
                <div className="flex flex-col gap-1.5">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ scaleX: [0.4, 1, 0.4] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.15,
                        ease: "easeInOut",
                      }}
                      className="h-1 w-16 origin-left rounded-full bg-neon-violet/60"
                    />
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* TILE 3 — K8s/Docker compact */}
          <Reveal delay={0.1} className="md:col-span-1 md:row-span-1">
            <div
              data-cursor="hover"
              className="glass group relative h-[90%] min-h-[180px] overflow-hidden rounded-3xl p-6 transition-all duration-500 hover:border-white/20"
            >
              <div className="grid h-[90%] grid-cols-3 gap-1.5">
                {Array.from({ length: 9 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0.3 }}
                    whileInView={{ opacity: [0.3, 1, 0.3] }}
                    viewport={{ once: false }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      delay: (i % 3) * 0.2,
                    }}
                    className="rounded-md bg-neon-cyan/40"
                  />
                ))}
              </div>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-white/50">EKS · K8s · Docker</p>
            </div>
          </Reveal>

          {/* TILE 4 — Redis */}
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

          {/* TILE 5 — Databases (wider) */}
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

              {/* Mini "query plan" visual */}
              <div className="mt-8 space-y-2 font-mono text-[11px]">
                {[
                  { lbl: "SELECT users WHERE …", w: "85%", c: "bg-neon-amber/70" },
                  { lbl: "VECTOR <-> embedding",  w: "62%", c: "bg-neon-cyan/70" },
                  { lbl: "MATCH name^3 desc",     w: "48%", c: "bg-neon-violet/70" },
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

          {/* TILE 6 — Cloud (AWS) — orbital, fixed motion */}
<Reveal delay={0.25} className="md:col-span-1 md:row-span-1">
  <div
    data-cursor="hover"
    className="glass group relative h-full min-h-[180px] overflow-hidden rounded-3xl p-6 transition-all duration-500 hover:border-white/20"
  >
    {/* Orbital system in top-right corner */}
    <div className="absolute right-2 top-2 h-24 w-24">
      <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible">
        {/* Static orbit rings */}
        <circle cx="50" cy="50" r="22" fill="none" stroke="rgba(94,234,212,0.18)" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="32" fill="none" stroke="rgba(94,234,212,0.12)" strokeWidth="0.5" strokeDasharray="2 3" />
        <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(167,139,250,0.12)" strokeWidth="0.5" />

        {/* Pulsing core glow */}
        <circle cx="50" cy="50" r="10" fill="#5EEAD4" opacity="0.12" />
        <motion.circle
          cx="50" cy="50"
          fill="#5EEAD4"
          animate={{ r: [3.5, 5, 3.5], opacity: [1, 0.6, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Orbiting node 1 — inner ring, fast (cyan) */}
<motion.g
  animate={{ rotate: 360 }}
  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
  style={{ originX: "50%", originY: "50%", transformBox: "fill-box" }}
>
  <circle cx="72" cy="50" r="2.5" fill="#5EEAD4" />
  <circle cx="72" cy="50" r="5" fill="#5EEAD4" opacity="0.25" />
</motion.g>

{/* Orbiting node 2 — middle ring, medium (violet) */}
<motion.g
  animate={{ rotate: -360 }}
  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
  style={{ originX: "50%", originY: "50%", transformBox: "fill-box" }}
>
  <circle cx="50" cy="18" r="2.5" fill="#A78BFA" />
  <circle cx="50" cy="18" r="5" fill="#A78BFA" opacity="0.25" />
</motion.g>

{/* Orbiting node 3 — outer ring, slow (amber) */}
<motion.g
  animate={{ rotate: 360 }}
  transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
  style={{ originX: "50%", originY: "50%", transformBox: "fill-box" }}
>
  <circle cx="92" cy="50" r="3" fill="#FCD34D" />
  <circle cx="92" cy="50" r="6" fill="#FCD34D" opacity="0.25" />
</motion.g>
      </svg>
    </div>

    {/* Text content */}
    <div className="relative flex h-full flex-col justify-end">
      <p className="font-mono text-[10px] uppercase tracking-widest text-neon-cyan">
        Cloud
      </p>
      <h3 className="mt-2 font-display text-2xl">AWS</h3>
      <p className="mt-1 text-xs text-white/55">EKS · S3 · RDS · Lambda</p>
    </div>
  </div>
</Reveal>

          {/* TILE 7 — Currently learning */}
<Reveal delay={0.3} className="md:col-span-1 md:row-span-1">
  <div
    data-cursor="hover"
    className="glass group relative h-full min-h-[180px] overflow-hidden rounded-3xl p-6 transition-all duration-500 hover:border-white/20"
  >
    {/* Animated node-graph SVG — represents agent orchestration visually */}
    <svg
      viewBox="0 0 100 60"
      className="absolute inset-x-0 top-4 h-20 w-full opacity-70"
      fill="none"
    >
      {/* Connecting lines (drawn first so nodes sit on top) */}
      <motion.line
        x1="20" y1="30" x2="50" y2="15"
        stroke="#5EEAD4" strokeWidth="0.5" strokeDasharray="2 2"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.2 }}
      />
      <motion.line
        x1="20" y1="30" x2="50" y2="45"
        stroke="#5EEAD4" strokeWidth="0.5" strokeDasharray="2 2"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.4 }}
      />
      <motion.line
        x1="50" y1="15" x2="80" y2="30"
        stroke="#A78BFA" strokeWidth="0.5" strokeDasharray="2 2"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.6 }}
      />
      <motion.line
        x1="50" y1="45" x2="80" y2="30"
        stroke="#A78BFA" strokeWidth="0.5" strokeDasharray="2 2"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.8 }}
      />

      {/* Nodes — pulsing dots representing agent steps */}
      <motion.circle
        cx="20" cy="30" r="3" fill="#5EEAD4"
        animate={{ opacity: [1, 0.4, 1] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0 }}
      />
      <motion.circle
        cx="50" cy="15" r="2.5" fill="#5EEAD4"
        animate={{ opacity: [1, 0.4, 1] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
      />
      <motion.circle
        cx="50" cy="45" r="2.5" fill="#5EEAD4"
        animate={{ opacity: [1, 0.4, 1] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}
      />
      <motion.circle
        cx="80" cy="30" r="3" fill="#A78BFA"
        animate={{ opacity: [1, 0.4, 1] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1.2 }}
      />
    </svg>

    {/* Text — pushed to the bottom */}
    <div className="relative flex h-full flex-col justify-end">
      <p className="font-mono text-[10px] uppercase tracking-widest text-white/50">
        ↗ Now learning
      </p>
      <h3 className="mt-1 font-display text-xl">LangGraph + RAG</h3>
      <p className="mt-1 text-xs text-white/55">Agent orchestration, vector pipelines</p>
    </div>
  </div>
</Reveal>
        </div>
      </div>
    </section>
  );
}
