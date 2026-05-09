import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import Reveal from "../components/Reveal";

const PROJECTS = [
  {
    n: "01",
    title: "AutoOps AI Agent",
    tag: "FULL-STACK · LLM · ASYNC",
    blurb:
      "ReAct agent gateway pairing a Spring Boot API with a Python LangGraph runtime. 12 tools, dual memory (Redis + pgvector), Kafka streaming, SSE for real-time progress.",
    stack: ["Spring Boot", "LangGraph", "Kafka", "pgvector", "Groq"],
    accent: "cyan",
    href: "https://github.com/mayurpatle",
  },
  {
    n: "02",
    title: "MovieBook",
    tag: "EVENT-DRIVEN · CONCURRENCY",
    blurb:
      "High-concurrency ticket booking platform using Kafka, Redis SETNX for distributed locking, and the Saga pattern for cross-service consistency.",
    stack: ["Kafka", "Redis", "Saga", "PostgreSQL", "K8s"],
    accent: "violet",
    href: "https://github.com/mayurpatle",
  },
  {
    n: "03",
    title: "Auth-App",
    tag: "MICROSERVICES · OAUTH",
    blurb:
      "Production-grade auth platform: 5 Spring Boot services behind Eureka + Gateway, two-step OTP via Redis, internal-secret header pattern, full Docker Compose stack.",
    stack: ["Spring Cloud", "Eureka", "Redis", "React", "Docker"],
    accent: "amber",
    href: "https://github.com/mayurpatle/Auth-App",
  },
  {
    n: "04",
    title: "TradeNest",
    tag: "CI/CD · OBSERVABILITY",
    blurb:
      "Demo Spring Boot app wired to a Jenkins CI/CD pipeline. Heavily annotated, production-grade code that doubles as teaching reference for backend juniors.",
    stack: ["Jenkins", "Spring Boot", "Docker", "Prometheus"],
    accent: "rose",
    href: "https://github.com/mayurpatle",
  },
  {
    n: "05",
    title: "Search API Optimization",
    tag: "PERFORMANCE · CACHING",
    blurb:
      "Search-API spike: Redis caching layer, Elasticsearch index, async background sync, precomputed result paths. p99 latency cut substantially.",
    stack: ["Elasticsearch", "Redis", "Spring", "Async"],
    accent: "cyan",
    href: "https://github.com/mayurpatle",
  },
];

const accentMap = {
  cyan:   { glow: "shadow-neon-cyan", text: "text-neon-cyan",   chip: "bg-neon-cyan/10 text-neon-cyan border-neon-cyan/30" },
  violet: { glow: "shadow-neon-vio",  text: "text-neon-violet", chip: "bg-neon-violet/10 text-neon-violet border-neon-violet/30" },
  amber:  { glow: "shadow-neon-cyan", text: "text-neon-amber",  chip: "bg-neon-amber/10 text-neon-amber border-neon-amber/30" },
  rose:   { glow: "shadow-neon-vio",  text: "text-neon-rose",   chip: "bg-neon-rose/10 text-neon-rose border-neon-rose/30" },
};

function ProjectCard({ p, index, progress }) {
  const cardRef = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 200, damping: 18 });
  const sy = useSpring(ry, { stiffness: 200, damping: 18 });

  const total = PROJECTS.length;
  const slice = 1 / total;
  const center = (index + 0.5) * slice;

  const scale = useTransform(
    progress,
    [center - slice, center, center + slice],
    [0.88, 1.0, 0.88]
  );
  const opacity = useTransform(
    progress,
    [center - slice, center, center + slice],
    [0.55, 1.0, 0.55]
  );

  const onMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * 12);
    rx.set(-(py - 0.5) * 10);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };

  const a = accentMap[p.accent];

  return (
    <motion.a
      href={p.href}
      target="_blank"
      rel="noreferrer"
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-cursor="hover"
      style={{
        rotateX: sx,
        rotateY: sy,
        scale,
        opacity,
        transformStyle: "preserve-3d",
        transformPerspective: 1200,
      }}
      className="group relative block w-[460px] shrink-0"
    >
      {/* CARD HEIGHT — fluid: tries 560px but caps at 62vh so progress bar always fits */}
      <div
        className={`glass relative overflow-hidden rounded-3xl p-7 transition-all duration-700 ease-apple group-hover:border-white/20 group-hover:${a.glow}`}
        style={{ height: "min(560px, 62vh)" }}
      >
        {/* Number watermark */}
        <div
          className="pointer-events-none absolute -right-6 -top-10 font-display text-[14rem] leading-none text-white/[0.03]"
          style={{ transform: "translateZ(40px)" }}
        >
          {p.n}
        </div>

        {/* Glow blob */}
        <div
          className={`pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-40 ${
            p.accent === "cyan"   ? "bg-neon-cyan"   :
            p.accent === "violet" ? "bg-neon-violet" :
            p.accent === "amber"  ? "bg-neon-amber"  : "bg-neon-rose"
          }`}
        />

        <div className="relative flex h-full flex-col justify-between" style={{ transform: "translateZ(30px)" }}>
          <div>
            <div className="mb-5 flex items-center justify-between">
              <span className={`font-mono text-xs tracking-widest ${a.text}`}>
                {p.n} / {String(PROJECTS.length).padStart(2, "0")}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                {p.tag}
              </span>
            </div>

            <h3 className="font-display text-4xl leading-tight tracking-tight md:text-5xl">
              {p.title}
            </h3>

            <p className="mt-5 text-sm leading-relaxed text-white/65">{p.blurb}</p>
          </div>

          <div>
            <div className="mb-5 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className={`rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider ${a.chip}`}
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-white/10 pt-4 text-xs font-mono">
              <span className="text-white/50">view case study</span>
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

export default function Projects() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -1968]);

  return (
    <section
      ref={containerRef}
      id="projects"
      className="relative"
      style={{ height: "500vh" }}
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">

        {/* SECTION HEADER — tighter top padding so cards + bar fit at 100% zoom */}
        <div className="mx-auto w-full max-w-7xl px-6 pt-20 lg:px-12">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">
              [ 02 / Selected Work ]
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-3 max-w-3xl font-display text-display-md">
              Systems that <span className="italic-display text-white/50">don't fall over</span>{" "}
              when traffic does.
            </h2>
          </Reveal>
        </div>

        {/* HORIZONTAL TRACK */}
        <div className="relative flex flex-1 items-center">
          <motion.div
            style={{
              x,
              paddingLeft: "calc(50vw - 230px)",
              paddingRight: "calc(50vw - 230px)",
            }}
            className="flex gap-8 will-change-transform"
          >
            {PROJECTS.map((p, i) => (
              <ProjectCard key={p.n} p={p} index={i} progress={scrollYProgress} />
            ))}
          </motion.div>
        </div>

        {/* PROGRESS BAR — tighter bottom padding */}
        <div className="mx-auto w-full max-w-7xl px-6 pb-6 lg:px-12">
          <div className="flex items-center gap-3 font-mono text-xs text-white/40">
            <span>01</span>
            <div className="h-px flex-1 overflow-hidden bg-white/10">
              <motion.div
                style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
                className="h-full bg-neon-cyan"
              />
            </div>
            <span>05</span>
          </div>
        </div>

      </div>
    </section>
  );
}