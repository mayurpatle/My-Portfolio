import Reveal from "../components/Reveal";

export default function About() {
  return (
    <section id="about" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12">
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
            <Reveal delay={0.35}>
              <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
                {[
                  { k: "5+", l: "shipped projects" },
                  { k: "2y", l: "production experience" },
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
          </div>
        </div>
      </div>
    </section>
  );
}
