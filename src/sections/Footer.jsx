import Reveal from "../components/Reveal";
import Magnetic from "../components/Magnetic";

export default function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden border-t border-white/10 py-32">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">

        {/* KICKER */}
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">
            [ 05 / Let's build ]
          </p>
        </Reveal>

        {/* MAIN HEADLINE */}
        <Reveal delay={0.05}>
          <h2 className="mt-6 font-display text-[clamp(3rem,10vw,9rem)] leading-[0.92] tracking-tight">
            Have a problem
            <br />
            <span className="italic-display text-white/45">worth solving?</span>
          </h2>
        </Reveal>

        {/* EMAIL LINK */}
        <Reveal delay={0.2}>
          <Magnetic>
            <a
              href="mailto:mayurpatle108@gmail.com"
              className="mt-12 inline-flex items-center gap-3 border-b border-white/30 pb-2 font-display text-2xl text-white transition-colors hover:border-neon-cyan hover:text-neon-cyan md:text-3xl"
            >
              mayurpatle108@gmail.com
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:rotate-45">
                <path d="M7 17 17 7M17 7H8m9 0v9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </a>
          </Magnetic>
        </Reveal>

        {/* ===== BOTTOM RAIL — signature photo + links + copyright ===== */}
        <Reveal delay={0.3}>
          <div className="mt-24 grid gap-10 border-t border-white/10 pt-10 md:grid-cols-[auto_1fr_auto] md:items-end md:gap-12">

            {/* SIGNATURE — photo + identity */}
            <div className="flex items-center gap-4">
              <div className="relative shrink-0">
                {/* Soft cyan glow halo behind photo */}
                <div
                  className="absolute -inset-1 rounded-full opacity-60 blur-md"
                  style={{ background: "radial-gradient(circle, rgba(94,234,212,0.35), transparent 70%)" }}
                />
                <img
                  src="/Mayur.jpg.jpeg"
                  alt="Mayur Patle"
                  className="relative h-14 w-14 rounded-full object-cover ring-1 ring-white/20"
                  style={{ filter: "grayscale(15%) contrast(1.05)" }}
                />
                {/* Live indicator dot — green pulse in bottom-right of photo */}
                <span className="absolute bottom-0 right-0 flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-cyan opacity-60" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-neon-cyan ring-2 ring-ink-950" />
                </span>
              </div>
              <div>
                <p className="font-display text-base text-white">Mayur Patle</p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-white/45">
                  Backend Engineer · Mumbai
                </p>
              </div>
            </div>

            {/* ELSEWHERE — social links */}
            <div className="md:px-8">
              <p className="font-mono text-xs uppercase tracking-widest text-white/35">elsewhere</p>
              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                {[
                  { l: "GitHub",      h: "https://github.com/mayurpatle" },
                  { l: "LinkedIn",    h: "https://www.linkedin.com/in/mayurpatle/" },
                  { l: "X / Twitter", h: "#" },
                  { l: "LeetCode",    h: "https://leetcode.com/u/mayurpatle/" },
                ].map((s) => (
                  <a
                    key={s.l}
                    href={s.h}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="hover"
                    className="text-white/70 underline-offset-4 transition-colors hover:text-white hover:underline"
                  >
                    {s.l} ↗
                  </a>
                ))}
              </div>
            </div>

            {/* COPYRIGHT */}
            <div className="font-mono text-xs text-white/35 md:text-right">
              <div>© {new Date().getFullYear()} Mayur Patle</div>
              <div className="mt-1">Built with React · Three.js · Framer Motion</div>
            </div>

          </div>
        </Reveal>

      </div>
    </footer>
  );
}