import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import ThreeScene from './ThreeScene'

function ThreeDPage() {
  const navigate = useNavigate()
  const [grid, setGrid] = useState(Array(9).fill(null))
  const [currentPlayer, setCurrentPlayer] = useState('X')

  const handleBackToMain = () => {
    navigate('/')
  }

  const handleGridClick = (index) => {
    if (grid[index] === null) {
      const newGrid = [...grid]
      newGrid[index] = currentPlayer
      setGrid(newGrid)
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
    }
  }

  return (
    <div style={{ 
      position: 'relative', 
      width: '100vw', 
      height: '100vh',
      cursor: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'10\' cy=\'10\' r=\'8\' fill=\'none\' stroke=\'white\' stroke-width=\'2\'/%3E%3C/svg%3E") 10 10, auto'
    }}>
      <ThreeScene grid={grid} />
      
      {/* 3x3 Grid in bottom left */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 60px)',
        gridTemplateRows: 'repeat(3, 60px)',
        gap: '5px',
        zIndex: 1000,
      }}>
        {grid.map((cell, index) => (
          <div
            key={index}
            onClick={() => handleGridClick(index)}
            style={{
              width: '60px',
              height: '60px',
              border: '2px solid white',
              backgroundColor: cell ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              fontWeight: 'bold',
              color: cell === 'X' ? '#ff00ff' : '#00ffff',
              cursor: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'10\' cy=\'10\' r=\'8\' fill=\'none\' stroke=\'white\' stroke-width=\'2\'/%3E%3C/svg%3E") 10 10, pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              if (!cell) {
                e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'
              }
            }}
            onMouseLeave={(e) => {
              if (!cell) {
                e.target.style.backgroundColor = 'rgba(0,0,0,0.5)'
              }
            }}
          >
            {cell}
          </div>
        ))}
      </div>

      {/* Current player indicator */}
      <div style={{
        position: 'absolute',
        bottom: '220px',
        left: '20px',
        color: 'white',
        fontSize: '18px',
        fontWeight: 'bold',
        zIndex: 1000,
      }}>
        Current: <span style={{ color: currentPlayer === 'X' ? '#ff00ff' : '#00ffff' }}>{currentPlayer}</span>
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

export default ThreeDPage