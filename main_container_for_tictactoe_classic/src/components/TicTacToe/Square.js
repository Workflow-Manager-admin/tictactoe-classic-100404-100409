import React from 'react';

/**
 * Square component represents a single cell in the TicTacToe game grid.
 * 
 * @param {Object} props - Component props
 * @param {string|null} props.value - Value to display (X, O, or null)
 * @param {Function} props.onClick - Click handler function
 * @returns {JSX.Element} A button representing a square in the game
 */
// PUBLIC_INTERFACE
const Square = ({ value, onClick }) => {
  return (
    <button 
      className="square" 
      onClick={onClick}
      aria-label={value ? `Square with ${value}` : "Empty square"}
    >
      {value}
    </button>
  );
};

export default Square;
