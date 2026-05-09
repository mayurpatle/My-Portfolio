import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

export default function Nav() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  // Different links depending on which page we're on.
  // On home: Work goes to /work, others scroll to anchors.
  // On any other page: all links point home with anchors.
  const links = [
    { to: "/work", label: "Work", isRoute: true },
    { to: isHome ? "#stack"   : "/#stack",   label: "Stack",   isRoute: false },
    { to: isHome ? "#about"   : "/#about",   label: "About",   isRoute: false },
    { to: isHome ? "#contact" : "/#contact", label: "Contact", isRoute: false },
  ];

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-1/2 top-6 z-40 -translate-x-1/2"
    >
      <div className="glass-strong flex items-center gap-2 rounded-full px-2 py-2">
        <Link
          to="/"
          data-cursor="hover"
          className="flex items-center gap-2 rounded-full px-4 py-1.5 font-display text-sm tracking-tight"
        >
          <span className="h-2 w-2 rounded-full bg-neon-cyan animate-pulse" />
          MP
        </Link>
        <div className="h-5 w-px bg-white/10" />
        {links.map((l) =>
          l.isRoute ? (
            <Link
              key={l.label}
              to={l.to}
              data-cursor="hover"
              className={`rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors hover:bg-white/10 hover:text-white ${
                location.pathname === l.to ? "text-neon-cyan" : "text-white/65"
              }`}
            >
              {l.label}
            </Link>
          ) : (
            <a
              key={l.label}
              href={l.to}
              data-cursor="hover"
              className="rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-white/65 transition-colors hover:bg-white/10 hover:text-white"
            >
              {l.label}
            </a>
          )
        )}
      </div>
    </motion.nav>
  );
}