import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment, Sparkles } from "@react-three/drei";
import { useRef, useMemo, Suspense } from "react";
import * as THREE from "three";

/**
 * Central hero geometry — an icosahedron with displacement noise.
 * It's iconic, recognizable, and reads as "computational" without being literal.
 * Mouse position drives a damped rotation for that "responsive object" feel.
 */
function Crystal({ mouse }) {
  const meshRef = useRef();
  const targetRot = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    // Mouse-driven target with idle drift
    targetRot.current.x = mouse.current.y * 0.4 + Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    targetRot.current.y = mouse.current.x * 0.6 + state.clock.elapsedTime * 0.15;

    // Damped lerp = Apple-style smoothness, never snappy
    meshRef.current.rotation.x += (targetRot.current.x - meshRef.current.rotation.x) * 0.04;
    meshRef.current.rotation.y += (targetRot.current.y - meshRef.current.rotation.y) * 0.04;
  });

  return (
    // speed for the centre ball 
    // default  speed  1.2 rotation intensity 0.3 floatintentsity 0.8
    <Float speed={5} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={meshRef} scale={1.0}>
        <icosahedronGeometry args={[1, 12]} />
        <MeshDistortMaterial
          color="#0a0b12"
          emissive="#5EEAD4"
          emissiveIntensity={0.15}
          roughness={0.15}
          metalness={0.9}
          distort={0.35}
          speed={1.4}
          envMapIntensity={1.2}
        />
      </mesh>
      {/* Inner glow core */}
      <mesh scale={1.2}>
        <icosahedronGeometry args={[1, 4]} />
        <meshBasicMaterial
          color="#A78BFA"
          transparent
          opacity={0.04}
          side={THREE.BackSide}
        />
      </mesh>
    </Float>
  );
}

/** Subtle particle field for atmosphere */
function ParticleField() {
  const ref = useRef();
  const count = 900;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.02;
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
        size={0.015}
        color="#5EEAD4"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/** Mouse tracker that lives inside Canvas */
function MouseTracker({ mouse }) {
  const { viewport } = useThree();
  useFrame((state) => {
    // Normalize to -1..1 with slight damping
    const targetX = (state.pointer.x * viewport.width)  / viewport.width;
    const targetY = (state.pointer.y * viewport.height) / viewport.height;
    mouse.current.x += (targetX - mouse.current.x) * 0.06;
    mouse.current.y += (targetY - mouse.current.y) * 0.06;
  });
  return null;
}

export default function HeroScene() {
  const mouse = useRef({ x: 0, y: 0 });

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <Suspense fallback={null}>
        <MouseTracker mouse={mouse} />

        {/* Three-point lighting */}
        <ambientLight intensity={0.25} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-4, -2, -3]} intensity={1.5} color="#A78BFA" />
        <pointLight position={[4, 3, 2]}    intensity={1.0} color="#5EEAD4" />

        <Crystal mouse={mouse} />
        <ParticleField />
        <Sparkles count={60} scale={[10, 6, 6]} size={2} speed={0.4} color="#FCD34D" opacity={0.4} />

        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
