"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

/* Floating purple particles with cursor drift */
function PurpleParticles({ count = 120 }) {
  const ref = useRef<THREE.Points>(null);
  const particles = useMemo(() => {
    const temp = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      temp[i * 3] = (Math.random() - 0.5) * 25;
      temp[i * 3 + 1] = (Math.random() - 0.5) * 15;
      temp[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      // Rotate standard background speed
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.012;
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.006;

      // Add a slight shift following the mouse
      ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, state.pointer.x * 0.6, 0.05);
      ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, state.pointer.y * 0.4, 0.05);
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[particles, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.09}
        color="#a78bfa"
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* Wireframe Icosahedron - subtle geometric element */
function FloatingGeo() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.x = t * 0.1;
      ref.current.rotation.y = t * 0.15;
      ref.current.position.y = Math.sin(t * 0.3) * 0.3;
      // Mild rotation drift toward cursor
      ref.current.rotation.z = THREE.MathUtils.lerp(ref.current.rotation.z, state.pointer.x * 0.3, 0.05);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4} position={[5, 1.5, -4]}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[1.5, 0]} />
        <meshBasicMaterial color="#7c3aed" wireframe transparent opacity={0.15} blending={THREE.AdditiveBlending} />
      </mesh>
    </Float>
  );
}

/* 3D Arrow meshes that rotate to point directly at the user's cursor */
function InteractiveArrows() {
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  const positions: [number, number, number][] = [
    [-6, 2.5, -4],
    [6.5, -1, -5],
    [-4.5, -2, -3],
    [3.5, 3, -6],
    [-1, 4, -5],
    [1.5, -3.5, -4]
  ];

  useFrame((state) => {
    // Project mouse 2D coords to a target 3D vector
    const mouseX = state.pointer.x * 8;
    const mouseY = state.pointer.y * 5;
    const target = new THREE.Vector3(mouseX, mouseY, 0);

    refs.current.forEach((mesh) => {
      if (mesh) {
        // Smoothly orient arrow to face the cursor position
        mesh.lookAt(target);
        
        // Rotate cones so their tips point to the mouse
        mesh.rotateX(Math.PI / 2);
      }
    });
  });

  return (
    <>
      {positions.map((pos, i) => (
        <Float key={i} speed={1.2 + i * 0.2} rotationIntensity={0.1} floatIntensity={0.5} position={pos}>
          <mesh ref={(el) => { refs.current[i] = el; }}>
            <coneGeometry args={[0.15, 0.45, 4]} />
            <meshBasicMaterial color="#a78bfa" wireframe transparent opacity={0.35} blending={THREE.AdditiveBlending} />
          </mesh>
        </Float>
      ))}
    </>
  );
}

/* Interactive connection lines that stretch and connect directly to the user's cursor */
function ConnectionLines() {
  const lineRefs = useRef<(any | null)[]>([]);
  
  // Starting nodes for the lines
  const starts = useMemo(() => {
    const temp: THREE.Vector3[] = [];
    for (let i = 0; i < 8; i++) {
      temp.push(new THREE.Vector3(
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 6 - 2
      ));
    }
    return temp;
  }, []);

  useFrame((state) => {
    // Project mouse coordinates to 3D space
    const mouseX = state.pointer.x * 8;
    const mouseY = state.pointer.y * 5;
    const target = new THREE.Vector3(mouseX, mouseY, 0);

    starts.forEach((start, i) => {
      const geometry = lineRefs.current[i];
      if (geometry) {
        // Set lines between static start point and current mouse target
        geometry.setFromPoints([start, target]);
      }
    });
  });

  return (
    <group>
      {starts.map((_, i) => (
        <line key={i}>
          <bufferGeometry ref={(el) => { lineRefs.current[i] = el; }} />
          <lineBasicMaterial color="#a78bfa" transparent opacity={0.12} blending={THREE.AdditiveBlending} />
        </line>
      ))}
    </group>
  );
}

/* Camera rig to handle smooth mouse parallax */
function CameraRig() {
  useFrame((state) => {
    // Increased target camera bounds for a more visible depth shift
    const targetX = (state.pointer.x * 2.2);
    const targetY = (state.pointer.y * 1.5);
    
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY + 0.5, 0.05);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

/* Glowing pointlight that tracks mouse pointer coordinates */
function MouseLight() {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (lightRef.current) {
      // Map normalized pointer coordinates [-1, 1] to 3D space bounds
      const targetX = state.pointer.x * 8;
      const targetY = state.pointer.y * 5;
      
      lightRef.current.position.x = THREE.MathUtils.lerp(lightRef.current.position.x, targetX, 0.1);
      lightRef.current.position.y = THREE.MathUtils.lerp(lightRef.current.position.y, targetY, 0.1);
    }
  });

  return (
    <pointLight
      ref={lightRef}
      color="#c4b5fd"
      intensity={2.5}
      distance={8}
      decay={2}
      position={[0, 0, 2]}
    />
  );
}

export default function Workspace3D() {
  return (
    <div className="fixed inset-0 z-0 w-full h-full pointer-events-none">
      <Canvas camera={{ position: [0, 0, 7], fov: 60 }} dpr={[1, 1.5]}>
        <color attach="background" args={["#0a0118"]} />
        <fog attach="fog" args={["#0a0118", 8, 20]} />

        <ambientLight intensity={0.15} />
        <pointLight position={[-5, 4, 3]} color="#7c3aed" intensity={1.5} distance={15} decay={1.5} />
        <pointLight position={[5, -2, 2]} color="#a78bfa" intensity={1} distance={12} decay={1.5} />

        <PurpleParticles count={140} />
        <FloatingGeo />
        <InteractiveArrows />
        <ConnectionLines />
        <CameraRig />
        <MouseLight />

        <Stars radius={80} depth={50} count={700} factor={4} saturation={0.3} fade speed={1.2} />
      </Canvas>
    </div>
  );
}
