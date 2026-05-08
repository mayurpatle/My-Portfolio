import Reveal from "../components/Reveal";
import Magnetic from "../components/Magnetic";

export default function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden border-t border-white/10 py-32">
      {/* <div className="absolute inset-0 bg-grid pointer-events-none opacity-50" /> */}

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">
            [ 05 / Let's build ]
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-6 font-display text-[clamp(3rem,10vw,9rem)] leading-[0.92] tracking-tight">
            Have a problem
            <br />
            <span className="italic-display text-white/45">worth solving?</span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <Magnetic>
            <a
              href="mailto:hello@mayurpatle.dev"
              className="mt-12 inline-flex items-center gap-3 border-b border-white/30 pb-2 font-display text-2xl text-white transition-colors hover:border-neon-cyan hover:text-neon-cyan md:text-3xl"
            >
              mayurpatle108@gmail.com
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:rotate-45">
                <path d="M7 17 17 7M17 7H8m9 0v9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </a>
          </Magnetic>
        </Reveal>

        {/* Bottom rail */}
        <div className="mt-24 flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-white/35">elsewhere</p>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {[
                { l: "GitHub",   h: "https://github.com/mayurpatle" },
                { l: "LinkedIn", h: "https://www.linkedin.com/in/mayurpatle/" },
                { l: "X / Twitter", h: "#" },
                { l: "Read.cv", h: "https://drive.google.com/file/d/1dR1EQBru8FmEOJVvpj-r3lkimiqBg_UP/view?usp=sharing"}
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

          <div className="font-mono text-xs text-white/35">
            <div>© {new Date().getFullYear()} Mayur Patle</div>
            <div className="mt-1">Built with React · Three.js · Framer Motion</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
