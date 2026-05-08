import { motion } from "framer-motion";

export default function Nav() {
  const links = [
    { href: "#projects", label: "Work" },
    { href: "#stack",    label: "Stack" },
    { href: "#about",    label: "About" },
    { href: "#contact",  label: "Contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-1/2 top-6 z-40 -translate-x-1/2"
    >
      <div className="glass-strong flex items-center gap-2 rounded-full px-2 py-2">
        <a
          href="#"
          data-cursor="hover"
          className="flex items-center gap-2 rounded-full px-4 py-1.5 font-display text-sm tracking-tight"
        >
          <span className="h-2 w-2 rounded-full bg-neon-cyan animate-pulse" />
          MP
        </a>
        <div className="h-5 w-px bg-white/10" />
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            data-cursor="hover"
            className="rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-white/65 transition-colors hover:bg-white/10 hover:text-white"
          >
            {l.label}
          </a>
        ))}
      </div>
    </motion.nav>
  );
}
