import { motion } from "framer-motion";
import HeroScene from "../three/HeroScene";
import Magnetic from "../components/Magnetic";


export default function Hero() {
  return (
    
    <section className="relative min-h-[100svh] w-full overflow-hidden">
      {/* Background grid + radial glow */}
      {/* Background grid + radial glow */}
<div className="absolute inset-0 bg-grid pointer-events-none" />
<div className="absolute inset-0 bg-radial-fade pointer-events-none" />
      <div className="absolute inset-0 bg-grid pointer-events-none" />
      <div className="absolute inset-0 bg-radial-fade pointer-events-none" />

      {/* 3D Canvas — sits behind content, full bleed */}
      <div className="absolute inset-0 z-0">
        <HeroScene />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-between px-6 pt-28 pb-12 lg:px-12">
        {/* Top bar with status pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3"
        >
          <div className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-mono tracking-wide">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-cyan opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-cyan" />
            </span>
            <span className="text-white/70">AVAILABLE FOR FREELANCE — Q3 2026</span>
          </div>
        </motion.div>

        {/* Headline */}
        <div className="max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-white/50"
          >
            Backend Engineer · Distributed Systems · Mumbai → Remote
          </motion.p>

          <h1 className="font-display text-display-xl leading-none">
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              Mayur Patle.
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="block italic-display text-white/60"
            >
              I build the
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              <span className="text-shimmer">unbreakable</span>
              <span className="text-white/40"> layer.</span>
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-xl text-base text-white/60 md:text-lg"
          >
            Java 17, Spring Boot, Kafka, Kubernetes — engineered for scale.
            I architect systems that handle the messy reality between
            <span className="text-white/90"> intent and outcome</span>.
          </motion.p>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <a
                href="#projects"
                className="group relative inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-ink-950 transition-colors hover:bg-neon-cyan"
              >
                View Selected Work
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-1">
                  <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </Magnetic>

            <Magnetic strength={0.25}>
              <a
                href="https://github.com/mayurpatle"
                target="_blank"
                rel="noreferrer"
                className="glass inline-flex items-center gap-3 rounded-full px-6 py-3.5 text-sm font-medium text-white/85 transition-colors hover:text-white"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.27-.01-.99-.02-1.95-3.2.69-3.87-1.54-3.87-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.69 1.25 3.34.95.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.27-5.24-5.66 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.17a10.95 10.95 0 0 1 5.74 0c2.19-1.48 3.15-1.17 3.15-1.17.62 1.58.23 2.75.11 3.04.74.8 1.18 1.82 1.18 3.07 0 4.4-2.69 5.37-5.26 5.65.41.36.78 1.06.78 2.13 0 1.54-.01 2.78-.01 3.16 0 .31.21.67.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z"/>
                </svg>
                GitHub
              </a>
            </Magnetic>
          </motion.div>
        </div>

        {/* Bottom meta strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.0 }}
          className="mt-16 flex items-center justify-between text-xs font-mono text-white/40"
        >
          <span>[ 01 / HERO ]</span>
          <div className="hidden md:flex items-center gap-6">
            <span>JAVA · SPRING · KAFKA · K8S</span>
            <span className="h-px w-12 bg-white/20" />
            <span>scroll →</span>
          </div>
          <span>{new Date().getFullYear()}</span>
        </motion.div>
      </div>
    </section>
  );
}
