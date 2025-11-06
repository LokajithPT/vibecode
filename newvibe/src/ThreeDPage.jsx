import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ThreeScene from './ThreeScene'

function ThreeDPage() {
  const navigate = useNavigate()
  const [grid, setGrid] = useState(Array(9).fill(null))
  const [gameOver, setGameOver] = useState(false)
  const [shatter, setShatter] = useState(false)
  const [hideUI, setHideUI] = useState(false)

  const handleBackToMain = () => {
    navigate('/')
  }

  const checkWinner = (board) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ]
    
    for (let [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]
      }
    }
    return null
  }

  const minimax = (board, depth, isMaximizing) => {
    const winner = checkWinner(board)
    
    if (winner === 'O') return 10 - depth
    if (winner === 'X') return depth - 10
    if (board.every(cell => cell !== null)) return 0
    
    if (isMaximizing) {
      let bestScore = -Infinity
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          board[i] = 'O'
          const score = minimax(board, depth + 1, false)
          board[i] = null
          bestScore = Math.max(score, bestScore)
        }
      }
      return bestScore
    } else {
      let bestScore = Infinity
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          board[i] = 'X'
          const score = minimax(board, depth + 1, true)
          board[i] = null
          bestScore = Math.min(score, bestScore)
        }
      }
      return bestScore
    }
  }

  const getBestMove = (board) => {
    let bestScore = -Infinity
    let bestMove = -1
    
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = 'O'
        const score = minimax(board, 0, false)
        board[i] = null
        
        if (score > bestScore) {
          bestScore = score
          bestMove = i
        }
      }
    }
    
    return bestMove
  }

  const handleLoserClick = () => {
    // Remove blur overlay immediately
    setGameOver(false)
    
    // Start board vanishing animation
    setTimeout(() => {
      setShatter(true)
    }, 100)
    
    // Hide UI elements after board starts vanishing
    setTimeout(() => {
      setHideUI(true)
    }, 1000)
    
    // Reset everything after animations complete
    setTimeout(() => {
      setGrid(Array(9).fill(null))
      setShatter(false)
      // Keep hideUI true - UI stays hidden forever
    }, 3000)
  }

  const handleGridClick = (index) => {
    if (grid[index] === null && !gameOver) {
      const newGrid = [...grid]
      newGrid[index] = 'X'
      setGrid(newGrid)
      
      // Check if user won
      if (checkWinner(newGrid) === 'X') {
        setTimeout(() => alert('You won! (This shouldn\'t happen...)'), 100)
        return
      }
      
      // Check if draw
      if (newGrid.every(cell => cell !== null)) {
        setTimeout(() => alert('Draw!'), 100)
        return
      }
      
      // Computer move
      setTimeout(() => {
        const computerMove = getBestMove([...newGrid])
        if (computerMove !== -1) {
          const finalGrid = [...newGrid]
          finalGrid[computerMove] = 'O'
          setGrid(finalGrid)
          
          // Check if computer won
          if (checkWinner(finalGrid) === 'O') {
            setTimeout(() => setGameOver(true), 100)
          } else if (finalGrid.every(cell => cell !== null)) {
            setTimeout(() => alert('Draw!'), 100)
          }
        }
      }, 500)
    }
  }

  return (
    <div style={{ 
      position: 'relative', 
      width: '100vw', 
      height: '100vh',
      cursor: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'10\' cy=\'10\' r=\'8\' fill=\'none\' stroke=\'white\' stroke-width=\'2\'/%3E%3C/svg%3E") 10 10, auto'
    }}>
      <ThreeScene grid={grid} shatter={shatter} />
      
      {/* Game Over Overlay */}
      {gameOver && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(10px)',
          zIndex: 2000,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'fadeIn 0.5s ease-in',
        }}>
          <img 
            src="/youlost.png"
            style={{
              width: '400px',
              height: 'auto',
              marginBottom: '50px',
              animation: 'scaleIn 0.8s ease-out',
            }}
            alt="you lost"
          />
          
          <button
            onClick={handleLoserClick}
            style={{
              padding: '15px 30px',
              fontSize: '20px',
              fontWeight: 'bold',
              backgroundColor: '#ff00ff',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              animation: 'pulse 1s infinite',
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.1)'
              e.target.style.backgroundColor = '#ff66ff'
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)'
              e.target.style.backgroundColor = '#ff00ff'
            }}
          >
            I'm a loser
          </button>
        </div>
      )}
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
      
      {/* Current player indicator */}
      <img 
        src="/yourturn.png"
        style={{
          position: 'absolute',
          bottom: hideUI ? '-500px' : '240px',
          left: '20px',
          width: '150px',
          zIndex: 1000,
          transition: 'all 1s ease-in',
          opacity: hideUI ? 0 : 1,
        }}
        alt="your turn"
      />
      
      {/* 3x3 Grid in bottom left */}
      <div style={{
        position: 'absolute',
        bottom: '220px',
        left: '20px',
        zIndex: 1000,
        transition: 'all 1s ease-in',
        opacity: hideUI ? 0 : 1,
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
                {cell && (
                  <img 
                    src={
                      cell === 'X' 
                        ? `/sx${((index % 3) + 1)}.png`
                        : `/so${((index % 3) + 1)}.png`
                    }
                    style={{
                      width: '50px',
                      height: '50px',
                      objectFit: 'contain',
                    }}
                    alt={cell}
                  />
                )}
              </div>
            )
          })}
        </div>
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