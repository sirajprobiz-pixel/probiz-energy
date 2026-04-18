import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox, Environment } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";

const Panel = ({
  position,
  size,
  color,
  rotation = [0, 0, 0],
}: {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  rotation?: [number, number, number];
}) => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.position.y = position[1] + Math.sin(t + position[0]) * 0.08;
  });
  return (
    <RoundedBox ref={ref} args={size} radius={0.08} smoothness={4} position={position} rotation={rotation}>
      <meshStandardMaterial color={color} metalness={0.3} roughness={0.25} />
    </RoundedBox>
  );
};

const Scene = () => {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    const { x, y } = state.pointer;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, x * 0.25, 0.05);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -y * 0.15, 0.05);
  });

  return (
    <group ref={group}>
      <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.4}>
        {/* Main dashboard */}
        <Panel position={[0, 0, 0]} size={[4.2, 2.6, 0.12]} color="#0b1220" />
        {/* Header bar */}
        <Panel position={[0, 1, 0.08]} size={[3.9, 0.35, 0.04]} color="#101a2e" />
        {/* Sidebar */}
        <Panel position={[-1.55, -0.2, 0.08]} size={[0.7, 1.7, 0.04]} color="#0e1626" />
        {/* Big chart */}
        <Panel position={[0.4, 0.25, 0.08]} size={[2.6, 1.0, 0.05]} color="#1d4ed8" />
        {/* Small chart 1 */}
        <Panel position={[-0.3, -0.85, 0.08]} size={[1.1, 0.55, 0.05]} color="#0ea5e9" />
        {/* Small chart 2 */}
        <Panel position={[1.1, -0.85, 0.08]} size={[1.1, 0.55, 0.05]} color="#3b82f6" />

        {/* Floating side cards */}
        <Panel position={[-2.8, 0.8, 0.6]} size={[1.2, 0.8, 0.1]} color="#0e1626" rotation={[0, 0.35, 0]} />
        <Panel position={[-2.8, 0.8, 0.7]} size={[1.0, 0.18, 0.04]} color="#1d4ed8" rotation={[0, 0.35, 0]} />

        <Panel position={[2.8, -0.6, 0.6]} size={[1.3, 0.9, 0.1]} color="#0e1626" rotation={[0, -0.35, 0]} />
        <Panel position={[2.8, -0.4, 0.7]} size={[1.0, 0.2, 0.04]} color="#0ea5e9" rotation={[0, -0.35, 0]} />

        {/* Floating orbs */}
        <Float speed={2} floatIntensity={1}>
          <mesh position={[-3.5, -1.4, 1]}>
            <sphereGeometry args={[0.25, 32, 32]} />
            <meshStandardMaterial color="#1d4ed8" metalness={0.6} roughness={0.2} emissive="#1d4ed8" emissiveIntensity={0.3} />
          </mesh>
        </Float>
        <Float speed={1.6} floatIntensity={1.2}>
          <mesh position={[3.6, 1.5, 1]}>
            <sphereGeometry args={[0.18, 32, 32]} />
            <meshStandardMaterial color="#0ea5e9" metalness={0.6} roughness={0.2} emissive="#0ea5e9" emissiveIntensity={0.3} />
          </mesh>
        </Float>
      </Float>
    </group>
  );
};

export const Dashboard3D = () => {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-5, -3, 2]} intensity={0.5} color="#0ea5e9" />
        <Environment preset="city" />
        <Scene />
      </Suspense>
    </Canvas>
  );
};
