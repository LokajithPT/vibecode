import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars, Text, Float, MeshDistortMaterial } from '@react-three/drei'
import { useRef, useState } from 'react'
import * as THREE from 'three'
import BlenderModel from './BlenderModel'
import { useTexture } from '@react-three/drei'

function AnimatedBox() {
  const meshRef = useRef()
  
  return (
    <Float speed={4} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} scale={[2, 2, 2]}>
        <boxGeometry args={[1, 1, 1]} />
        <MeshDistortMaterial color="#ff00ff" attach="material" distort={0.3} speed={2} />
      </mesh>
    </Float>
  )
}

function AnimatedSphere() {
  const meshRef = useRef()
  
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={[3, 0, 0]} scale={[1.5, 1.5, 1.5]}>
        <sphereGeometry args={[1, 32, 32]} />
        <MeshDistortMaterial color="#00ffff" attach="material" distort={0.4} speed={3} />
      </mesh>
    </Float>
  )
}

function AnimatedTorus() {
  const meshRef = useRef()
  
  return (
    <Float speed={3} rotationIntensity={1.5} floatIntensity={1.5}>
      <mesh ref={meshRef} position={[-3, 0, 0]} scale={[1.2, 1.2, 1.2]}>
        <torusGeometry args={[1, 0.4, 16, 100]} />
        <MeshDistortMaterial color="#ffff00" attach="material" distort={0.2} speed={1.5} />
      </mesh>
    </Float>
  )
}

function FloatingText() {
  return (
    <Text
      position={[0, 3, 0]}
      fontSize={0.5}
      color="white"
      anchorX="center"
      anchorY="middle"
    >
      WELCOME TO THE 3D ZONE
    </Text>
  )
}

function ParticleField() {
  const pointsRef = useRef()
  
  const particlesCount = 1000
  const positions = new Float32Array(particlesCount * 3)
  
  for (let i = 0; i < particlesCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10
  }
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="white" size={0.02} sizeAttenuation />
    </points>
  )
}

function XoBoard() {
  const meshRef = useRef()
  
  // Load the texture
  const texture = useTexture('/xoboardu.png')
  
  return (
    <Float speed={3} rotationIntensity={1} floatIntensity={2}>
      <mesh 
        ref={meshRef} 
        scale={[4, 4, 4]}
      >
        <planeGeometry args={[2, 2]} />
        <meshStandardMaterial 
          map={texture} 
          transparent={true}
          alphaTest={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
    </Float>
  )
}

export default function ThreeScene() {
  return (
    <div style={{ height: '100vh', width: '100%', background: 'black' }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />
        
        {/* XO Board in the center */}
        <XoBoard />
        
        <Stars 
          radius={100} 
          depth={50} 
          count={5000} 
          factor={4} 
          saturation={0} 
          fade 
          speed={1}
        />
        
        <OrbitControls 
          enableZoom={true} 
          enablePan={true} 
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}