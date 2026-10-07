import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  Stars, 
  Float, 
  Sphere, 
  Torus, 
  MeshDistortMaterial,
  Line,
  Grid
} from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const generateGalaxyPositions = (count) => {
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const radius = 25 + Math.random() * 45;
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos((Math.random() * 2) - 1);
    
    pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    pos[i * 3 + 2] = radius * Math.cos(phi);
  }
  return pos;
};

// Particle Starfield Galaxy
const GalaxyParticles = () => {
  const count = 4000;
  const positions = useMemo(() => generateGalaxyPositions(count), [count]);

  const pointsRef = useRef();

  useFrame(({ clock, pointer }) => {
    if (pointsRef.current) {
      // 1.5x - 2x rotation speed, smooth continuous loop
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.035;
      pointsRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.05; // slight orbit
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          count={count} 
          array={positions} 
          itemSize={3} 
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.06} 
        color="#00E5FF" 
        transparent 
        opacity={0.4} 
        sizeAttenuation 
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Wireframe Globe
const WireframeGlobe = () => {
  const meshRef = useRef();
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      // 2x rotation, smooth eased (using sine base for acceleration/deceleration illusion though it's continuous)
      const t = clock.getElapsedTime();
      meshRef.current.rotation.y = t * 0.2 + Math.sin(t * 0.5) * 0.05;
      meshRef.current.rotation.x = t * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={[4, 0, -8]}>
      <icosahedronGeometry args={[5, 3]} />
      <meshStandardMaterial 
        color="#00E5FF" 
        wireframe 
        transparent 
        opacity={0.15} 
        emissive="#00E5FF"
        emissiveIntensity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};

const generateNeuralNodes = (nodeCount) => {
  return Array.from({ length: nodeCount }).map(() => [
    (Math.random() - 0.5) * 20,
    (Math.random() - 0.5) * 15,
    (Math.random() - 0.5) * 10 - 5
  ]);
};

// Neural Network Data Nodes
const NeuralNetwork = () => {
  const nodeCount = 30;
  
  const nodes = useMemo(() => generateNeuralNodes(nodeCount), [nodeCount]);

  const lines = useMemo(() => {
    const connections = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dist = new THREE.Vector3(...nodes[i]).distanceTo(new THREE.Vector3(...nodes[j]));
        if (dist < 6) {
          connections.push([nodes[i], nodes[j]]);
        }
      }
    }
    return connections;
  }, [nodes]);

  const groupRef = useRef();

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime();
      groupRef.current.rotation.y = Math.sin(t * 0.08) * 0.3 + t * 0.05; // orbit + rotation
      groupRef.current.position.y = Math.sin(t * 0.3) * 0.8;
    }
  });

  return (
    <group ref={groupRef} position={[0,0,-5]}>
      {nodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#00E5FF" toneMapped={false} />
        </mesh>
      ))}
      {lines.map((line, i) => (
        <Line 
          key={`line-${i}`}
          points={line}
          color="#22D3EE"
          lineWidth={1}
          transparent
          opacity={0.15}
        />
      ))}
    </group>
  );
};

// Abstract Torus and Shapes with depth layering variations
const AbstractShapes = () => {
  return (
    <>
      <Float speed={2.5} rotationIntensity={2} floatIntensity={3} position={[-8, 3, -10]}>
        <Torus args={[2.5, 0.02, 16, 100]} rotation={[Math.PI / 3, 0, 0]}>
          <meshBasicMaterial color="#7C3AED" transparent opacity={0.6} />
        </Torus>
      </Float>
      
      <Float speed={1.8} rotationIntensity={3} floatIntensity={2} position={[6, -4, -4]}>
        <Torus args={[1.5, 0.05, 16, 100]} rotation={[0, Math.PI / 4, 0]}>
          <meshBasicMaterial color="#00E5FF" transparent opacity={0.4} />
        </Torus>
      </Float>

      <Float speed={3} rotationIntensity={1} floatIntensity={2} position={[2, 4, -15]}>
        <Sphere args={[0.5, 16, 16]}>
           <meshBasicMaterial color="#22D3EE" transparent opacity={0.8} />
        </Sphere>
      </Float>
    </>
  );
};

// Scene Camera Controller with gsap scroll
const SceneController = () => {
  const { camera } = useThree();
  const [cameraGroup] = useState(() => new THREE.Group());
  
  useEffect(() => {
    // Add camera to group
    cameraGroup.add(camera);
    
    // Scroll animation for camera depth and rotation
    gsap.to(camera.position, {
      z: 5,
      y: -2,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      }
    });

    gsap.to(cameraGroup.rotation, {
      y: Math.PI / 8,
      x: -Math.PI / 16,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      }
    });
    
  }, [camera]);

  useFrame(({ pointer }) => {
    // Mouse Parallax
    gsap.to(cameraGroup.position, {
      x: pointer.x * 2,
      y: pointer.y * 2,
      duration: 1.5,
      ease: "power2.out"
    });
  });

  return <primitive object={cameraGroup} />;
};

const PersistentBackground = () => {
  return (
    <div className="fixed inset-0 w-full h-full z-0 bg-gradient-to-b from-[#0A192F] to-black pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        className="w-full h-full"
      >
        <color attach="background" args={['#040814']} />
        
        {/* Depth Fog */}
        <fog attach="fog" args={['#040814', 5, 30]} />
        
        <SceneController />

        {/* Ambient & Soft Volumetric Lighting fake */}
        <ambientLight intensity={0.5} color="#00E5FF" />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#00E5FF" />
        <directionalLight position={[-10, -10, -5]} intensity={3} color="#7C3AED" />
        
        {/* Animated Perspective Grid Floor */}
        <Grid 
          position={[0, -6, -5]} 
          args={[50, 50]} 
          cellSize={1} 
          cellThickness={0.5} 
          cellColor="#22D3EE" 
          sectionSize={5} 
          sectionThickness={1} 
          sectionColor="#7C3AED" 
          fadeDistance={30} 
          fadeStrength={1}
        />

        {/* 3D Elements */}
        <WireframeGlobe />
        <NeuralNetwork />
        <GalaxyParticles />
        <AbstractShapes />

        {/* Post-processing Bloom Glow */}
        <EffectComposer disableNormalPass>
          <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} />
        </EffectComposer>
        
      </Canvas>
    </div>
  );
};

export default PersistentBackground;
