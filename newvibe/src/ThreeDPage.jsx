import { useNavigate } from 'react-router-dom'
import ThreeScene from './ThreeScene'

function ThreeDPage() {
  const navigate = useNavigate()

  const handleBackToMain = () => {
    navigate('/')
  }

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <ThreeScene />
      
      {/* Back button to return to main experience */}
      <img 
        src="/backbutton.png"
        onClick={handleBackToMain}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          width: '150px',
          cursor: 'pointer',
          zIndex: 1000,
        }}
        alt="back button"
      />
    </div>
  )
}

export default ThreeDPage