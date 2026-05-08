/**
 * Infinite marquee strip — used as a visual "breath" between dense sections.
 * Pure CSS animation, GPU-friendly.
 */
export default function Marquee() {
  const tokens = [
    "DISTRIBUTED SYSTEMS", "★", "EVENT-DRIVEN", "★", "LOW LATENCY",
    "★", "SPRING BOOT 3", "★", "KUBERNETES", "★", "KAFKA STREAMS",
    "★", "OBSERVABILITY", "★", "DESIGNED IN MUMBAI",
  ];
  const seq = [...tokens, ...tokens]; // duplicate for seamless loop

  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-ink-900/40 py-6">
      <div className="flex animate-marquee whitespace-nowrap will-change-transform">
        {seq.map((t, i) => (
          <span
            key={i}
            className={`mx-6 font-display text-3xl tracking-tight md:text-5xl ${
              t === "★" ? "text-neon-cyan/80" : "text-white/60"
            }`}
          >
            {t === "★" ? t : <em className="not-italic">{t}</em>}
          </span>
        ))}
      </div>
    </div>
  );
}
