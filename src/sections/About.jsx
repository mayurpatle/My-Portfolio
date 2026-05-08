import { motion } from "framer-motion";
import Reveal from "../components/Reveal";

const EXPERIENCE = [
  {
    company: "Capgemini",
    role: "Senior Software Engineer",
    period: "Jun 2024 — Present",
    location: "Mumbai, IN",
    status: "current",
    accent: "cyan",
    bullets: [
      "Building production backend systems on Java 17 + Spring Boot 3 across enterprise client engagements",
      "Owning services in event-driven architectures using Apache Kafka, deployed to AWS EKS via Kubernetes",
      "Designing for the messy reality of partial failure — idempotency, distributed locks, and graceful degradation",
    ],
    stack: ["Java 17", "Spring Boot 3", "Kafka", "Redis", "EKS", "PostgreSQL"],
  },
  // Add more entries here later — internships, freelance, etc.
];

const accentMap = {
  cyan:   { dot: "bg-neon-cyan",   ring: "ring-neon-cyan/30",   text: "text-neon-cyan",   line: "from-neon-cyan/60" },
  violet: { dot: "bg-neon-violet", ring: "ring-neon-violet/30", text: "text-neon-violet", line: "from-neon-violet/60" },
  amber:  { dot: "bg-neon-amber",  ring: "ring-neon-amber/30",  text: "text-neon-amber",  line: "from-neon-amber/60" },
};

function ExperienceEntry({ exp, index, isLast }) {
  const a = accentMap[exp.accent];

  return (
    <div className="relative grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 md:grid-cols-[140px_auto_1fr] md:gap-x-8">
      {/* Date column — visible on desktop only */}
      <div className="hidden md:block pt-1">
        <p className="font-mono text-xs uppercase tracking-widest text-white/40">
          {exp.period.split(" — ")[0]}
        </p>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-white/30">
          {exp.period.split(" — ")[1]}
        </p>
      </div>

      {/* Timeline rail with animated dot */}
      <div className="relative flex flex-col items-center">
        {/* Animated dot */}
        <div className="relative z-10 mt-1.5">
          {/* Outer ping */}
          {exp.status === "current" && (
            <motion.span
              className={`absolute inset-0 rounded-full ${a.dot}`}
              animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
          {/* Solid dot with glow ring */}
          <span className={`relative block h-3 w-3 rounded-full ${a.dot} ring-4 ${a.ring}`} />
        </div>

        {/* Vertical line down to next entry */}
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "top" }}
            className={`mt-2 w-px flex-1 bg-gradient-to-b ${a.line} via-white/10 to-transparent`}
          />
        )}
      </div>

      {/* Content */}
      <Reveal delay={0.1 + index * 0.1} className="pb-12 md:pb-16">
        {/* Mobile-only date */}
        <p className="md:hidden mb-3 font-mono text-[10px] uppercase tracking-widest text-white/40">
          {exp.period}
        </p>

        {/* Status badge */}
        {exp.status === "current" && (
          <div className={`inline-flex items-center gap-2 mb-4 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest ${a.text}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${a.dot}`} />
            Currently here
          </div>
        )}

        {/* Role + Company */}
        <h3 className="font-display text-2xl leading-tight md:text-3xl">
          {exp.role}
          <span className="text-white/40"> at </span>
          <em className="italic-display text-white/85">{exp.company}</em>
        </h3>

        <p className="mt-1.5 font-mono text-xs text-white/45">
          {exp.location}
        </p>

        {/* Bullets — narrative-style, not résumé bullets */}
        <ul className="mt-6 space-y-3">
          {exp.bullets.map((b, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex gap-3 text-sm text-white/65"
            >
              <span className={`mt-2 block h-px w-4 shrink-0 ${a.dot} opacity-40`} />
              <span>{b}</span>
            </motion.li>
          ))}
        </ul>

        {/* Stack pills */}
        <div className="mt-6 flex flex-wrap gap-2">
          {exp.stack.map((s) => (
            <span
              key={s}
              className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white/65"
            >
              {s}
            </span>
          ))}
        </div>
      </Reveal>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-12">

          {/* LEFT COLUMN — sidebar facts */}
          <div className="lg:col-span-4">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">
                [ 04 / Approach ]
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 font-display text-display-md">
                Engineering as <em className="italic-display text-white/50">a craft</em>.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-8 space-y-3 font-mono text-xs text-white/50">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span>Based</span><span className="text-white/80">Mumbai · Nagpur</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span>Role</span><span className="text-white/80">Backend Engineer</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span>Focus</span><span className="text-white/80">Distributed systems</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span>Open to</span><span className="text-white/80">Senior · Staff · Remote</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* RIGHT COLUMN — narrative + experience timeline */}
          <div className="lg:col-span-8">
            <Reveal delay={0.15}>
              <p className="font-display text-3xl leading-snug text-white/85 md:text-4xl">
                I work on the parts of software that{" "}
                <span className="italic-display text-white/55">most people never see</span>
                — the backbone where milliseconds matter, queues never lie, and
                a bad migration costs a Saturday.
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <p className="mt-8 max-w-2xl text-base leading-relaxed text-white/55">
                My focus is on the architecture between intent and outcome:
                event-driven flows that survive partial failure, caches that
                actually stay coherent, and APIs that age well. I'm currently
                preparing for senior backend roles at top-tier product companies,
                pairing deep Spring Boot internals work with system-design rigor.
              </p>
            </Reveal>

            {/* Stats grid */}
            <Reveal delay={0.35}>
              <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
                {[
                  { k: "5+", l: "shipped projects" },
                  { k: "1.5y", l: "production experience" },
                  { k: "p99", l: "latency obsessed" },
                  { k: "24/7", l: "for the right work" },
                ].map((s) => (
                  <div key={s.l} className="border-l border-white/15 pl-4">
                    <div className="font-display text-3xl text-white">{s.k}</div>
                    <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-white/40">
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* ===== EXPERIENCE TIMELINE ===== */}
            <div className="mt-24">
              <Reveal>
                <div className="mb-12 flex items-baseline justify-between border-b border-white/10 pb-4">
                  <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">
                    Experience
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-white/30">
                    /// trajectory
                  </p>
                </div>
              </Reveal>

              {/* Timeline entries */}
              <div className="relative">
                {EXPERIENCE.map((exp, i) => (
                  <ExperienceEntry
                    key={exp.company + exp.period}
                    exp={exp}
                    index={i}
                    isLast={i === EXPERIENCE.length - 1}
                  />
                ))}

                {/* Trailing "→ next chapter" marker */}
                <Reveal delay={0.6}>
                  <div className="grid grid-cols-[auto_1fr] gap-x-6 md:grid-cols-[140px_auto_1fr] md:gap-x-8">
                    <div className="hidden md:block" />
                    <div className="flex flex-col items-center">
                      <motion.div
                        animate={{ y: [0, 6, 0], opacity: [0.4, 0.8, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="text-white/40"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <path d="M12 5v14m-6-6 6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </motion.div>
                    </div>
                    <div className="pb-4">
                      <p className="font-display italic-display text-lg text-white/40">
                        next chapter — let's write it together.
                      </p>
                      <a
                        href="#contact"
                        data-cursor="hover"
                        className="mt-2 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neon-cyan transition-opacity hover:opacity-70"
                      >
                        Get in touch
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                          <path d="M7 17 17 7M17 7H8m9 0v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}