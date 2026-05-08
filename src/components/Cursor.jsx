import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Magnetic dot-and-ring cursor.
 * The dot tracks instantly (precision); the ring lags behind with a spring (weight).
 * On elements marked [data-cursor="hover"], the ring expands.
 */
export default function Cursor() {
  const ringRef = useRef(null);

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const dx = useMotionValue(-100);
  const dy = useMotionValue(-100);

  // Soft spring on ring; tighter on dot
  const sx = useSpring(mx, { stiffness: 350, damping: 35, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 350, damping: 35, mass: 0.6 });

  useEffect(() => {
    const move = (e) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      dx.set(e.clientX);
      dy.set(e.clientY);
    };

    const enter = () => ringRef.current?.classList.add("hover");
    const leave = () => ringRef.current?.classList.remove("hover");

    window.addEventListener("mousemove", move);

    // Delegate hover detection
    const hovers = document.querySelectorAll('[data-cursor="hover"]');
    hovers.forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      hovers.forEach((el) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, [mx, my, dx, dy]);

  return (
    <>
      <motion.div className="cursor-dot" style={{ x: dx, y: dy }} />
      <motion.div ref={ringRef} className="cursor-ring" style={{ x: sx, y: sy }} />
    </>
  );
}
