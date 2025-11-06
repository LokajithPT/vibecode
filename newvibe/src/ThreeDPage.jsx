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
        bottom: '220px',
        left: '20px',
        zIndex: 1000,
      }}>
        <img 
          src="/sidegrid.png"
          style={{
            width: '200px',
            height: '200px',
            position: 'absolute',
            top: '0',
            left: '0',
          }}
          alt="grid"
        />
        <div style={{
          position: 'absolute',
          top: '0',
          left: '20px',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 66px)',
          gridTemplateRows: 'repeat(3, 66px)',
          gap: '0px',
        }}>
          {grid.map((cell, index) => {
            const col = index % 3
            return (
              <div
                key={index}
                onClick={() => handleGridClick(index)}
                style={{
                  width: '66px',
                  height: '66px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: cell === 'X' ? '#ff00ff' : '#00ffff',
                  cursor: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'10\' cy=\'10\' r=\'8\' fill=\'none\' stroke=\'white\' stroke-width=\'2\'/%3E%3C/svg%3E") 10 10, pointer',
                  transition: 'all 0.3s ease',
                  marginLeft: col === 1 ? '-10px' : col === 2 ? '-35px' : '0px',
                }}
              >
                {cell}
              </div>
            )
          })}
        </div>
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