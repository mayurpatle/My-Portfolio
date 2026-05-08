import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { useRef, useMemo, Suspense } from "react";

/**
 * Drifting particle field — same vibe as the hero, but spread wider
 * and rotating very slowly so it reads as ambient, not active.
 */
function GlobalParticles() {
  const ref = useRef();
  const count = 1200;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Spread across a wide volume so they fill the viewport at any scroll position
      arr[i * 3 + 0] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.015;
      ref.current.rotation.x = state.clock.elapsedTime * 0.005;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.012}
        color="#5EEAD4"
        transparent
        opacity={0.45}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/**
 * Global Backdrop — fixed-position layer that lives behind ALL content.
 * Three layered visuals: Three.js particles + sparkles, CSS grid, radial glows.
 * z-index: 0. Content sits on z-10+.
 */
export default function Backdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Layer 1: Base color — gradient mesh behind everything */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 60% at 50% -10%, rgba(94,234,212,0.10), transparent 60%)," +
            "radial-gradient(ellipse 80% 60% at 100% 100%, rgba(167,139,250,0.08), transparent 60%)," +
            "radial-gradient(ellipse 60% 40% at 0% 50%, rgba(252,211,77,0.04), transparent 60%)," +
            "#05060A",
        }}
      />

      {/* Layer 2: Faint grid — masked so it fades at edges, doesn't fight content */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px)," +
            "linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, black 40%, transparent 100%)",
        }}
      />

      {/* Layer 3: Three.js particles + sparkles */}
      <div className="absolute inset-0">
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 8], fov: 60 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        >
          <Suspense fallback={null}>
            <GlobalParticles />
            <Sparkles
              count={80}
              scale={[20, 12, 8]}
              size={1.5}
              speed={0.3}
              color="#FCD34D"
              opacity={0.35}
            />
            <Sparkles
              count={40}
              scale={[18, 10, 6]}
              size={2}
              speed={0.2}
              color="#A78BFA"
              opacity={0.25}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Layer 4: Vignette — darkens corners, focuses attention on content */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 80% at 50% 50%, transparent 50%, rgba(5,6,10,0.6) 100%)",
        }}
      />
    </div>
  );
}