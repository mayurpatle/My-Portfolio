import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import Magnetic from "../components/Magnetic";

/* ============================================================
   DATA
   ============================================================ */

const PERSONAL_PROJECTS = [
  {
    n: "P01",
    title: "AutoOps AI Agent",
    tag: "AI · LANGGRAPH · ASYNC",
    blurb:
      "Production-style ReAct agent gateway. Spring Boot + Python LangGraph runtime. 12 tools, dual memory (Redis + pgvector), Kafka streaming, SSE.",
    stack: ["Spring Boot", "LangGraph", "Kafka", "pgvector"],
    accent: "cyan",
    href: "https://github.com/mayurpatle",
    metric: "12 tools · 4 services",
    year: "2026",
    featured: true,
  },
  {
    n: "P02",
    title: "MovieBook",
    tag: "EVENT-DRIVEN · CONCURRENCY",
    blurb:
      "Ticket booking platform built around Kafka, Redis SETNX distributed locks, and the Saga pattern. Idempotent consumers throughout.",
    stack: ["Kafka", "Redis", "Saga", "K8s"],
    accent: "violet",
    href: "https://github.com/mayurpatle",
    metric: "10k req/min target",
    year: "2025",
  },
  {
    n: "P03",
    title: "Auth-App",
    tag: "MICROSERVICES · OTP",
    blurb:
      "5-service auth platform behind Eureka + Gateway. Two-step OTP via Redis, internal-secret header pattern, Docker Compose stack.",
    stack: ["Spring Cloud", "Eureka", "Redis", "React"],
    accent: "cyan",
    href: "https://github.com/mayurpatle/Auth-App",
    metric: "5 microservices",
    year: "2025",
  },
  {
    n: "P04",
    title: "Search API Optimization",
    tag: "PERFORMANCE · CACHING",
    blurb:
      "Search-API spike: Redis caching, Elasticsearch, autocomplete indexing, async DB-to-ES sync. p99 cut substantially.",
    stack: ["Elasticsearch", "Redis", "Spring"],
    accent: "violet",
    href: "https://github.com/mayurpatle",
    metric: "p99 latency ↓",
    year: "2025",
  },
  {
    n: "P05",
    title: "TradeNest CI/CD",
    tag: "JENKINS · DEVOPS",
    blurb:
      "Demo Spring Boot app wired to a Jenkins Declarative Pipeline. Heavily annotated for teaching backend juniors.",
    stack: ["Jenkins", "Docker", "Spring"],
    accent: "amber",
    href: "https://github.com/mayurpatle",
    metric: "fully automated",
    year: "2025",
  },
  {
    n: "P06",
    title: "BANKNIFTY Indicator",
    tag: "PINE SCRIPT · TRADING",
    blurb:
      "TradingView Pine Script indicator computing dynamic support/resistance from prior day's last 5-minute candle close.",
    stack: ["Pine Script", "TradingView"],
    accent: "cyan",
    href: "https://github.com/mayurpatle",
    metric: "live in TradingView",
    year: "2024",
  },
];

const FREELANCE_PROJECTS = [
  {
    n: "F01",
    title: "Enterprise Order Service",
    tag: "FINTECH · BACKEND",
    blurb:
      "Architected and shipped an order-processing backend for a fintech client. Event-sourced, multi-region, integrated with three legacy systems.",
    stack: ["Spring Boot", "Kafka", "PostgreSQL", "AWS"],
    accent: "amber",
    href: "#",
    metric: "$XM in monthly orders",
    year: "2025",
    client: "Confidential — Fintech",
    featured: false,
  },
  {
    n: "F02",
    title: "Healthcare API Layer",
    tag: "HEALTHCARE · INTEGRATION",
    blurb:
      "Built a secure HL7-aware API layer between EMR and a patient-facing mobile app. HIPAA-aware logging, audit trail, role-based access.",
    stack: ["Spring Boot", "OAuth2", "Redis"],
    accent: "violet",
    href: "#",
    metric: "8-week delivery",
    year: "2025",
    client: "Healthcare SaaS",
    featured: true,
  },
  {
    n: "F03",
    title: "Notification Pipeline",
    tag: "MESSAGING · SCALE",
    blurb:
      "Migrated a startup's monolithic notification system to a Kafka-based pipeline. 50× throughput improvement, retry/DLQ handling.",
    stack: ["Kafka", "Spring", "Redis"],
    accent: "cyan",
    href: "#",
    metric: "50× throughput",
    year: "2024",
    client: "B2B SaaS Startup",
  },
  {
    n: "F04",
    title: "Reporting Backend",
    tag: "ANALYTICS · ETL",
    blurb:
      "Designed an analytics reporting backend with materialized views, scheduled aggregations, and a query API consumed by a Tableau front-end.",
    stack: ["PostgreSQL", "Spring", "Quartz"],
    accent: "amber",
    href: "#",
    metric: "20+ dashboards",
    year: "2024",
    client: "E-commerce",
  },
];

const accentMap = {
  cyan:   { dot: "bg-neon-cyan",   text: "text-neon-cyan",   border: "border-neon-cyan/30",   glow: "rgba(94,234,212,0.5)",  bg: "bg-neon-cyan/10" },
  violet: { dot: "bg-neon-violet", text: "text-neon-violet", border: "border-neon-violet/30", glow: "rgba(168,85,247,0.5)",  bg: "bg-neon-violet/10" },
  amber:  { dot: "bg-neon-amber",  text: "text-neon-amber",  border: "border-neon-amber/30",  glow: "rgba(252,211,77,0.5)",  bg: "bg-neon-amber/10" },
};

/* ============================================================
   FEATURED CARD
   ============================================================ */

function FeaturedProject({ p, isFreelance }) {
  const cardRef = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 200, damping: 18 });
  const sy = useSpring(ry, { stiffness: 200, damping: 18 });

  const onMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * 6);
    rx.set(-(py - 0.5) * 5);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };

  const a = accentMap[p.accent];

  return (
    <motion.a
      href={p.href}
      target={p.href.startsWith("http") ? "_blank" : "_self"}
      rel="noreferrer"
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-cursor="hover"
      style={{ rotateX: sx, rotateY: sy, transformStyle: "preserve-3d", transformPerspective: 1400 }}
      className="group relative col-span-1 block md:col-span-2"
    >
      <div
        className="glass relative h-full min-h-[360px] overflow-hidden rounded-3xl p-7 transition-all duration-700 ease-apple group-hover:border-white/20 md:p-10"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{ background: `radial-gradient(circle at 80% 20%, ${a.glow}, transparent 60%)` }}
        />

        <div
          className="pointer-events-none absolute -right-8 -top-12 font-display text-[16rem] leading-none text-white/[0.03]"
          style={{ transform: "translateZ(40px)" }}
        >
          {p.n}
        </div>

        <div className="relative mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest">
          <span className={`h-1.5 w-1.5 rounded-full ${a.dot}`} />
          <span className={a.text}>Featured · {isFreelance ? "client work" : "open source"}</span>
        </div>

        <div className="relative grid gap-6 md:grid-cols-2" style={{ transform: "translateZ(30px)" }}>
          <div>
            <p className={`font-mono text-xs tracking-widest ${a.text}`}>
              {p.n} · {p.year}
            </p>
            <h3 className="mt-2 font-display text-4xl leading-tight tracking-tight md:text-5xl">
              {p.title}
            </h3>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
              {p.tag}
            </p>
            {isFreelance && p.client && (
              <p className="mt-3 font-mono text-xs text-white/55">
                client / <span className="italic-display text-white/80 font-display">{p.client}</span>
              </p>
            )}
          </div>

          <div className="flex flex-col justify-between">
            <p className="text-base leading-relaxed text-white/70">{p.blurb}</p>

            <div className="mt-6">
              <div className="mb-4 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className={`rounded-full border ${a.border} ${a.bg} ${a.text} px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider`}
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between border-t border-white/10 pt-4">
                <span className="font-mono text-xs text-white/55">↗ {p.metric}</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition-all group-hover:border-white group-hover:bg-white group-hover:text-ink-950">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M7 17 17 7M17 7H8m9 0v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.a>
  );
}

/* ============================================================
   STANDARD PROJECT CARD
   ============================================================ */

function ProjectCard({ p, isFreelance }) {
  const cardRef = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 200, damping: 18 });
  const sy = useSpring(ry, { stiffness: 200, damping: 18 });

  const onMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * 8);
    rx.set(-(py - 0.5) * 6);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };

  const a = accentMap[p.accent];

  return (
    <motion.a
      href={p.href}
      target={p.href.startsWith("http") ? "_blank" : "_self"}
      rel="noreferrer"
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-cursor="hover"
      style={{ rotateX: sx, rotateY: sy, transformStyle: "preserve-3d", transformPerspective: 1200 }}
      className="group relative block"
    >
      <div className="glass relative h-full min-h-[340px] overflow-hidden rounded-3xl p-6 transition-all duration-700 ease-apple group-hover:border-white/20">
        <div
          className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-30"
          style={{ background: a.glow }}
        />

        <div className="relative flex h-full flex-col justify-between gap-5" style={{ transform: "translateZ(20px)" }}>
          <div>
            <div className="mb-4 flex items-center justify-between">
              <span className={`font-mono text-xs tracking-widest ${a.text}`}>
                {p.n} · {p.year}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                {p.tag}
              </span>
            </div>

            <h3 className="font-display text-3xl leading-tight tracking-tight">
              {p.title}
            </h3>

            {isFreelance && p.client && (
              <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-white/45">
                {p.client}
              </p>
            )}

            <p className="mt-4 text-sm leading-relaxed text-white/65">{p.blurb}</p>
          </div>

          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className={`rounded-full border ${a.border} ${a.bg} ${a.text} px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider`}
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-white/10 pt-4 font-mono text-xs">
              <span className="text-white/55">↗ {p.metric}</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition-all group-hover:border-white group-hover:bg-white group-hover:text-ink-950">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M7 17 17 7M17 7H8m9 0v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.a>
  );
}

/* ============================================================
   TOGGLE
   ============================================================ */

function CategoryToggle({ category, setCategory }) {
  return (
    <div className="glass-strong relative inline-flex items-center rounded-full p-1.5">
      <motion.div
        layout
        layoutId="toggle-pill"
        transition={{ type: "spring", stiffness: 400, damping: 32 }}
        className={`absolute inset-y-1.5 w-1/2 rounded-full ${
          category === "personal" ? "left-1.5 bg-neon-cyan/15" : "left-[calc(50%-0.375rem)] bg-neon-amber/15"
        }`}
        style={{
          boxShadow:
            category === "personal"
              ? "inset 0 0 0 1px rgba(94,234,212,0.3), 0 0 20px rgba(94,234,212,0.2)"
              : "inset 0 0 0 1px rgba(252,211,77,0.3), 0 0 20px rgba(252,211,77,0.2)",
        }}
      />

      <button
        data-cursor="hover"
        onClick={() => setCategory("personal")}
        className={`relative z-10 flex items-center gap-2 rounded-full px-6 py-2.5 font-mono text-xs uppercase tracking-widest transition-colors ${
          category === "personal" ? "text-neon-cyan" : "text-white/55 hover:text-white/80"
        }`}
      >
        <span className={`h-1.5 w-1.5 rounded-full ${category === "personal" ? "bg-neon-cyan" : "bg-white/30"}`} />
        Personal
      </button>

      <button
        data-cursor="hover"
        onClick={() => setCategory("freelance")}
        className={`relative z-10 flex items-center gap-2 rounded-full px-6 py-2.5 font-mono text-xs uppercase tracking-widest transition-colors ${
          category === "freelance" ? "text-neon-amber" : "text-white/55 hover:text-white/80"
        }`}
      >
        <span className={`h-1.5 w-1.5 rounded-full ${category === "freelance" ? "bg-neon-amber" : "bg-white/30"}`} />
        Freelance
      </button>
    </div>
  );
}

/* ============================================================
   STATS BAR
   ============================================================ */

function StatsBar({ category }) {
  const stats = category === "personal"
    ? [
        { k: "06+", l: "shipped projects" },
        { k: "100%", l: "open source" },
        { k: "Java", l: "primary language" },
        { k: "2024→", l: "active builder" },
      ]
    : [
        { k: "04+", l: "client deliveries" },
        { k: "100%", l: "on-time shipped" },
        { k: "<12h", l: "avg. response" },
        { k: "remote", l: "globally available" },
      ];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
      {stats.map((s, i) => (
        <motion.div
          key={s.l}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="border-l-2 pl-4"
          style={{
            borderColor: category === "personal" ? "rgba(94,234,212,0.4)" : "rgba(252,211,77,0.4)",
          }}
        >
          <div className="font-display text-3xl text-white md:text-4xl">{s.k}</div>
          <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-white/45">
            {s.l}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ============================================================
   MAIN PAGE
   ============================================================ */

export default function Work() {
  const [category, setCategory] = useState("personal");

  const projects = category === "personal" ? PERSONAL_PROJECTS : FREELANCE_PROJECTS;
  const featured = projects.find((p) => p.featured) || projects[0];
  const rest = projects.filter((p) => p.n !== featured.n);

  return (
    // TIGHTENED: pt-32 pb-32  →  pt-24 pb-20
    <main className="relative z-10 min-h-screen pb-20 pt-24">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">

        {/* Back link */}
        <Reveal>
          <Link
            to="/"
            data-cursor="hover"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/50 transition-colors hover:text-white"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5m6-6-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back home
          </Link>
        </Reveal>

        {/* HERO — TIGHTENED */}
        <div className="mt-8">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">
              [ Work · two paths ]
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            {/* Inline fluid font-size — caps at 4.5rem instead of 5.5rem */}
            <h1
              className="mt-5 font-display leading-[0.95]"
              style={{ fontSize: "clamp(2rem, 4.5vw, 4.5rem)", letterSpacing: "-0.035em" }}
            >
              The portfolio.
              <br />
              <span className="italic-display text-white/45">Two ways in.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.25}>
            <p className="mt-6 max-w-2xl text-base text-white/60 md:text-lg">
              Open-source projects where I get to choose the architecture, and
              client work where I get to defend it.{" "}
              <span className="text-white/85">Both teach you something different.</span>
            </p>
          </Reveal>
        </div>

        {/* TOGGLE — TIGHTENED: mt-14 → mt-10 */}
        <Reveal delay={0.35}>
          <div className="mt-10 flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <CategoryToggle category={category} setCategory={setCategory} />

            <AnimatePresence mode="wait">
              <motion.p
                key={category}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
                className="font-mono text-xs uppercase tracking-widest text-white/45"
              >
                {category === "personal"
                  ? `// ${PERSONAL_PROJECTS.length} projects · all on github`
                  : `// ${FREELANCE_PROJECTS.length} engagements · select case studies`}
              </motion.p>
            </AnimatePresence>
          </div>
        </Reveal>

        {/* STATS — TIGHTENED: mt-14 py-10 → mt-10 py-7 */}
        <div className="mt-10 border-y border-white/10 py-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={category}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <StatsBar category={category} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* PROJECTS GRID — TIGHTENED: mt-16 → mt-12 */}
        <div className="mt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-6 md:grid-cols-2"
            >
              <FeaturedProject p={featured} isFreelance={category === "freelance"} />

              {rest.map((p, i) => (
                <motion.div
                  key={p.n}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ProjectCard p={p} isFreelance={category === "freelance"} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CTA — TIGHTENED: mt-32 pt-16 → mt-24 pt-12 */}
        <Reveal delay={0.2}>
          <div className="mt-24 border-t border-white/10 pt-12 text-center">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">
              [ Don't see what you need? ]
            </p>
            <h2
              className="mt-5 font-display"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 3rem)", lineHeight: "1.05", letterSpacing: "-0.025em" }}
            >
              {category === "personal"
                ? <>Want to see <em className="italic-display text-white/55">how I think</em>?</>
                : <>Want to be <em className="italic-display text-white/55">the next case study</em>?</>}
            </h2>
            <p className="mt-4 mx-auto max-w-xl text-white/60">
              {category === "personal"
                ? "Each repo has a thorough README, with the architecture decisions and tradeoffs spelled out."
                : "Currently taking 1–2 new engagements per quarter. Backend, distributed systems, system design reviews."}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Magnetic>
                <Link
                  to="/"
                  className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-medium text-ink-950 transition-colors hover:bg-neon-cyan"
                >
                  Get in touch
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </Magnetic>
              <Magnetic strength={0.25}>
                <a
                  href="https://github.com/mayurpatle"
                  target="_blank"
                  rel="noreferrer"
                  className="glass inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-medium text-white/85 transition-colors hover:text-white"
                >
                  Browse all repos
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M7 17 17 7M17 7H8m9 0v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </a>
              </Magnetic>
            </div>
          </div>
        </Reveal>

      </div>
    </main>
  );
}