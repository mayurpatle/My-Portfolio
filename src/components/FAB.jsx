import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Magnetic from "./Magnetic";

export default function FAB() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 md:bottom-10 md:right-10">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.92 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="glass-strong absolute bottom-20 right-0 w-[300px] rounded-3xl p-6 shadow-deep"
          >
            <p className="font-mono text-[10px] uppercase tracking-widest text-neon-cyan">
              Let's talk
            </p>
            <h4 className="mt-2 font-display text-2xl">Available for hire.</h4>
            <p className="mt-2 text-xs text-white/55">
              Backend / distributed systems work. Avg. response: under 12 hours.
            </p>

            <div className="mt-5 space-y-2">
              <a
                href="mailto:mayurpatle108@gmail.com"
                data-cursor="hover"
                className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3 text-sm transition-colors hover:bg-white/10"
              >
                <span className="font-mono">email →</span>
                <span className="text-white/70">Click to mail</span>
              </a>
              <a
                href="https://www.linkedin.com/in/mayurpatle/"
                target="_blank" rel="noreferrer"
                data-cursor="hover"
                className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3 text-sm transition-colors hover:bg-white/10"
              >
                <span className="font-mono">linkedin →</span>
                <span className="text-white/70">/in/mayurpatle</span>
              </a>
              <a
                href="https://github.com/mayurpatle"
                target="_blank" rel="noreferrer"
                data-cursor="hover"
                className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3 text-sm transition-colors hover:bg-white/10"
              >
                <span className="font-mono">github →</span>
                <span className="text-white/70">@mayurpatle</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Magnetic strength={0.4}>
        <motion.button
          onClick={() => setOpen((o) => !o)}
          whileTap={{ scale: 0.94 }}
          className="group relative flex h-16 w-16 items-center justify-center rounded-full bg-white text-ink-950 shadow-deep transition-all hover:bg-neon-cyan"
          aria-label="Hire me"
        >
          {/* Pulse ring */}
          <span className="absolute inset-0 animate-ping rounded-full bg-neon-cyan opacity-20" />
          <motion.div
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {open ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M3 8l9 6 9-6M5 6h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </motion.div>
        </motion.button>
      </Magnetic>
    </div>
  );
}
