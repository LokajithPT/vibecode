import { useNavigate } from 'react-router-dom'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { Suspense, useRef, useEffect } from 'react'
import * as THREE from 'three'

function WASDCamera() {
  const moveSpeed = 0.1
  const keys = useRef({ w: false, a: false, s: false, d: false })

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase()
      if (key in keys.current) {
        keys.current[key] = true
      }
    }

    const handleKeyUp = (e) => {
      const key = e.key.toLowerCase()
      if (key in keys.current) {
        keys.current[key] = false
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  useFrame(({ camera }) => {
    if (!camera) return

    const forward = new THREE.Vector3()
    const right = new THREE.Vector3()

    camera.getWorldDirection(forward)
    right.crossVectors(forward, camera.up)

    if (keys.current.w) {
      camera.position.addScaledVector(forward, moveSpeed)
    }
    if (keys.current.s) {
      camera.position.addScaledVector(forward, -moveSpeed)
    }
    if (keys.current.a) {
      camera.position.addScaledVector(right, -moveSpeed)
    }
    if (keys.current.d) {
      camera.position.addScaledVector(right, moveSpeed)
    }
  })
}

function Car() {
  const { scene } = useGLTF('/car.glb')
  return <primitive object={scene} scale={[1, 1, 1]} />
}

function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="#2a2a2a" />
    </mesh>
  )
}

function Environment() {
  return (
    <>
      <Ground />
      
      {/* Some monochromatic geometry */}
      <mesh position={[10, 2, -10]} castShadow>
        <boxGeometry args={[4, 4, 4]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      
      <mesh position={[-15, 1, 5]} castShadow>
        <coneGeometry args={[3, 6, 8]} />
        <meshStandardMaterial color="#0f0f0f" />
      </mesh>
      
      <mesh position={[20, 0.5, 15]} castShadow>
        <cylinderGeometry args={[2, 2, 1, 16]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
    </>
  )
}

export default function CarPage() {
  const navigate = useNavigate()

  const handleBackToMain = () => {
    navigate('/')
  }

  return (
    <div style={{ 
      position: 'relative', 
      width: '100vw', 
      height: '100vh',
      cursor: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'10\' cy=\'10\' r=\'8\' fill=\'none\' stroke=\'white\' stroke-width=\'2\'/%3E%3C/svg%3E") 10 10, auto'
    }}>
      <Canvas 
        camera={{ position: [5, 5, 10], fov: 60 }}
        shadows
        style={{ background: 'linear-gradient(to bottom, #1a1a1a, #3a3a3a)' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 20, 10]}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, 10, -10]} intensity={0.5} />
        
        <Suspense fallback={null}>
          <Car />
          <Environment />
        </Suspense>
        
        <OrbitControls 
          enableZoom={true} 
          enablePan={true} 
          enableRotate={true}
          autoRotate={false}
        />
        
        <WASDCamera />
      </Canvas>
      
      {/* Controls info */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        color: 'white',
        fontSize: '16px',
        fontWeight: 'bold',
        zIndex: 1000,
        textAlign: 'right',
        textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
      }}>
        WASD to move<br/>
        Mouse to look around
      </div>

      {/* Back button to return to main experience */}
      <img 
        src="/backbutton.png"
        onClick={handleBackToMain}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          width: '150px',
          cursor: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'10\' cy=\'10\' r=\'8\' fill=\'none\' stroke=\'white\' stroke-width=\'2\'/%3E%3C/svg%3E") 10 10, pointer',
          zIndex: 1000,
        }}
        alt="back button"
      />
    </div>
  )
}