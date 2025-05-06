import React, { useState } from 'react'

// Constantes para los turnos
const TURNS = {
  X: 'x',
  O: 'o',
}

// Combinaciones ganadoras del juego
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

import './App.css'

// Componente Square: Representa cada casilla del tablero
const Square = ({ children, isSelected, updateBoard, index }) => {
  // Clase CSS dinámica para resaltar la casilla seleccionada
  const className = `square ${isSelected ? 'is-selected' : ''}`

  // Maneja el clic en la casilla
  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

// Componente principal del juego
function App() {
  // Estado del tablero (9 casillas vacías al inicio)
  const [board, setBoard] = useState(Array(9).fill(null))
  // Estado del turno actual (X comienza)
  const [turn, setTurn] = useState(TURNS.X)
  // Estado del ganador (null al inicio)
  const [winner, setWinner] = useState(null)

  // Función para verificar si hay un ganador
  const checkWinner = (boardToCheck) => {
    for (const combination of WINNING_COMBINATIONS) {
      const [a, b, c] = combination
      // Si las tres casillas de una combinación son iguales, hay un ganador
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a]
      }
    }
    return null // Si no hay ganador, retorna null
  }

  // Reinicia el juego
  const resetGame = () => {
    setBoard(Array(9).fill(null)) // Limpia el tablero
    setTurn(TURNS.X) // Reinicia el turno a X
    setWinner(null) // Limpia el ganador
  }

  // Actualiza el tablero al hacer clic en una casilla
  const updateBoard = (index) => {
    // Si la casilla ya está ocupada o hay un ganador, no hace nada
    if (board[index] || winner) return

    // Crea una copia del tablero y actualiza la casilla seleccionada
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    // Verifica si hay un ganador con el nuevo tablero
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner) // Actualiza el ganador
    } else {
      // Cambia el turno al siguiente jugador
      setTurn(turn === TURNS.X ? TURNS.O : TURNS.X)
    }
  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      {/* Tablero del juego */}
      <section className='game'>
        {board.map((_, index) => {
          return (
            <Square
              key={index} // Clave única para cada casilla
              index={index} // Índice de la casilla
              updateBoard={updateBoard} // Función para actualizar el tablero
            >
              {board[index]} {/* Contenido de la casilla (X, O o vacío) */}
            </Square>
          )
        })}
      </section>
      {/* Indicador del turno actual */}
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      {/* Mensaje del ganador y botón para reiniciar */}
      {winner && (
        <section className='winner'>
          <h2>
            {winner === TURNS.X || winner === TURNS.O
              ? `Ganador: ${winner}` // Muestra el ganador
              : 'Empate'} // En caso de empate
          </h2>
          <button onClick={resetGame}>Reiniciar</button>
        </section>
      )}
    </main>
  )
}

export default App