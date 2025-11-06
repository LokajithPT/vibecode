import { useGLTF } from '@react-three/drei'

export default function BlenderModel({ modelPath, position = [0, 0, 0], scale = [1, 1, 1] }) {
  const { scene } = useGLTF(modelPath)
  
  return (
    <primitive 
      object={scene} 
      position={position} 
      scale={scale}
    />
  )
}

// Preload the model for better performance
useGLTF.preload('/models/your-model.glb')