import React, { useState } from 'react';
import Board from './Board';
import './TicTacToe.css';

/**
 * Calculate winner of the game by checking all winning combinations.
 * 
 * @param {Array} squares - Current state of the board
 * @returns {string|null} - 'X', 'O', or null if no winner
 */
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // diagonal top-left to bottom-right
    [2, 4, 6], // diagonal top-right to bottom-left
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

/**
 * Check if the game is a draw (all squares filled with no winner).
 * 
 * @param {Array} squares - Current state of the board
 * @param {string|null} winner - Current winner state
 * @returns {boolean} - True if game is a draw, false otherwise
 */
function isDraw(squares, winner) {
  return !winner && squares.every(square => square !== null);
}

/**
 * TicTacToe component represents the main game container.
 * Manages game state, player turns, win/draw detection, and game reset.
 * 
 * @returns {JSX.Element} The complete TicTacToe game UI
 */
// PUBLIC_INTERFACE
const TicTacToe = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(squares);
  const draw = isDraw(squares, winner);
  
  const handleClick = (i) => {
    // Create a copy of the squares array
    const squaresCopy = [...squares];
    
    // Return early if there's a winner or the square is already filled
    if (winner || squaresCopy[i]) {
      return;
    }
    
    // Mark the square with the current player's symbol
    squaresCopy[i] = xIsNext ? 'X' : 'O';
    
    // Update state
    setSquares(squaresCopy);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  // Determine game status message
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (draw) {
    status = 'Game ended in a draw!';
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="tictactoe-container">
      <h2 className="game-title">Tic Tac Toe</h2>
      
      <div className="game-status">{status}</div>
      
      <Board 
        squares={squares} 
        onClick={handleClick} 
      />
      
      <button 
        className="btn reset-button" 
        onClick={resetGame}
      >
        Reset Game
      </button>
    </div>
  );
};

export default TicTacToe;
