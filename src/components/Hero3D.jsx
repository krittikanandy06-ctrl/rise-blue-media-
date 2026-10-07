import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  Stars, 
  Float, 
  Sphere, 
  Torus, 
  MeshDistortMaterial,
  Environment,
  Sparkles,
  Html
} from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

// Complex geometric globe wireframe
const WireframeGlobe = () => {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.15;
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, -2, -5]}>
      <icosahedronGeometry args={[8, 2]} />
      <meshStandardMaterial 
        color="#3b82f6" 
        wireframe 
        transparent 
        opacity={0.15} 
        emissive="#3b82f6"
        emissiveIntensity={0.5}
      />
    </mesh>
  );
};

const generateGalaxyPositions = (count) => {
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const radius = 20 + Math.random() * 30;
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos((Math.random() * 2) - 1);
    
    pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    pos[i * 3 + 2] = radius * Math.cos(phi);
  }
  return pos;
};

// Particles galaxy
const GalaxyParticles = () => {
  const count = 3000;
  const positions = useMemo(() => generateGalaxyPositions(count), [count]);

  const pointsRef = useRef();

  useFrame(({ clock, pointer }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.03;
      // Mouse interaction parallax
      pointsRef.current.position.x = THREE.MathUtils.lerp(pointsRef.current.position.x, (pointer.x * 2), 0.02);
      pointsRef.current.position.y = THREE.MathUtils.lerp(pointsRef.current.position.y, (pointer.y * 2), 0.02);
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
        size={0.08} 
        color="#8b5cf6" 
        transparent 
        opacity={0.6} 
        sizeAttenuation 
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Abstract floating shapes
const AbstractShapes = () => {
  return (
    <>
      <Float speed={2} rotationIntensity={2} floatIntensity={3} position={[-6, 2, -4]}>
        <Sphere args={[1.5, 64, 64]}>
          <MeshDistortMaterial 
            color="#3b82f6" 
            envMapIntensity={1} 
            clearcoat={1} 
            clearcoatRoughness={0.1} 
            metalness={0.8} 
            roughness={0.2}
            distort={0.4}
            speed={2}
          />
        </Sphere>
      </Float>

      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={2} position={[5, -3, -6]}>
        <Torus args={[2, 0.4, 32, 100]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
          <meshStandardMaterial 
            color="#8b5cf6" 
            metalness={0.9} 
            roughness={0.1} 
            emissive="#4c1d95"
            emissiveIntensity={0.5}
          />
        </Torus>
      </Float>

      <Float speed={3} rotationIntensity={1} floatIntensity={2} position={[7, 4, -8]}>
        <Sphere args={[1, 32, 32]}>
          <MeshDistortMaterial 
            color="#ec4899" 
            envMapIntensity={1} 
            clearcoat={1} 
            clearcoatRoughness={0.1} 
            metalness={0.8} 
            roughness={0.2}
            distort={0.6}
            speed={3}
          />
        </Sphere>
      </Float>
    </>
  );
};

// Camera Controller inside Canvas
const CameraController = () => {
  const { camera } = useThree();
  
  useFrame((state) => {
    // Subtle mouse responsive camera movement
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.pointer.x * 1, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, state.pointer.y * 1 + 2, 0.05);
    state.camera.lookAt(0, 0, 0);
  });
  
  return null;
};

// Content Overlay (HTML)
const HeroContent = () => {
  return (
    <Html center className="pointer-events-none w-full max-w-[90vw] md:max-w-4xl">
      <div className="flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="glass border border-white/10 px-6 py-2 rounded-full mb-6 inline-flex backdrop-blur-xl"
        >
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent font-medium tracking-wide text-sm md:text-base pulse-text">
            AI-POWERED DIGITAL GROWTH AGENCY
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
          className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white leading-tight md:leading-tight mb-6 -tracking-[0.03em] drop-shadow-2xl"
        >
          Complete Digital Growth. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-600 text-glow-purple">
            One Powerful Agency.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
          className="text-lg md:text-xl text-white/70 font-sans max-w-2xl mx-auto mb-10 tracking-wide font-light flex flex-wrap justify-center gap-2 md:gap-3"
        >
          <span>Paid Ads</span> <span className="text-blue-500">•</span>
          <span>SEO</span> <span className="text-blue-500">•</span>
          <span>Development</span> <span className="text-purple-500">•</span>
          <span>Reputation</span> <span className="text-purple-500">•</span>
          <span className="text-white font-medium">AI SEO</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center pointer-events-auto"
        >
          <button className="relative overflow-hidden group bg-blue-600 text-white px-8 py-4 rounded-full font-medium text-lg w-full sm:w-auto shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:shadow-[0_0_40px_rgba(59,130,246,0.8)] neon-border transition-all duration-300 transform hover:scale-105">
            <span className="relative z-10 flex items-center justify-center gap-2">
              Get Free Strategy
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          
          <button className="glass border border-white/20 text-white hover:bg-white/10 px-8 py-4 rounded-full font-medium text-lg w-full sm:w-auto transition-all duration-300 transform hover:scale-105 hover:border-white/40">
            View Services
          </button>
        </motion.div>
      </div>
    </Html>
  );
};

const Hero3D = () => {
  return (
    <div className="absolute inset-0 w-full h-full bg-black z-0">
      <Canvas
        camera={{ position: [0, 2, 10], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        className="w-full h-full"
      >
        <color attach="background" args={['#020008']} />
        
        {/* Fog for depth */}
        <fog attach="fog" args={['#020008', 5, 25]} />
        
        {/* Lighting setup */}
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#3b82f6" />
        <directionalLight position={[-10, -10, -5]} intensity={2} color="#8b5cf6" />
        <pointLight position={[0, -5, 5]} intensity={2} color="#ec4899" />
        
        <Environment preset="night" />
        
        {/* 3D Objects */}
        <AbstractShapes />
        <WireframeGlobe />
        <GalaxyParticles />
        <Sparkles count={500} scale={20} size={2} speed={0.4} opacity={0.5} color="#3b82f6" />
        
        {/* Scene Logic */}
        <CameraController />
        <HeroContent />
        
      </Canvas>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 z-10 pointer-events-none">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-white/50 to-transparent"></div>
      </div>
    </div>
  );
};

export default Hero3D;
