import { motion } from "framer-motion";

/**
 * Reveal — orchestrated entrance animation.
 * Default: subtle 24px rise + fade with Apple easing.
 * Use `delay` and `as` to compose into staggered groups.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 24,
  className = "",
  as: As = "div",
  once = true,
}) {
  const Component = motion[As] || motion.div;
  return (
    <Component
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </Component>
  );
}
