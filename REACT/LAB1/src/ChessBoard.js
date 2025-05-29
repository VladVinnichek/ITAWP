import React from 'react';
import './ChessBoard.css';

function ChessBoard() {
  const rows = 8;
  const cols = 8;
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  
  const board = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      row.push((i + j) % 2 === 0 ? 'white' : 'black');
    }
    board.push(row);
  }
  
  return (
    <div className="chess-container">
      {/* Верхние буквенные обозначения */}
      <div className="notation-row">
        <div className="empty-corner"></div>
        {letters.map((letter, index) => (
          <div key={`top-${index}`} className="col-notation">{letter}</div>
        ))}
      </div>
      
      {/* Доска и боковые обозначения */}
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          <div className="row-notation">{rows - rowIndex}</div>
          {row.map((cell, colIndex) => (
            <div key={`${rowIndex}-${colIndex}`} className={`cell ${cell}`}></div>
          ))}
          <div className="row-notation">{rows - rowIndex}</div>
        </div>
      ))}
      
      {/* Нижние буквенные обозначения */}
      <div className="notation-row">
        <div className="empty-corner"></div>
        {letters.map((letter, index) => (
          <div key={`bottom-${index}`} className="col-notation">{letter}</div>
        ))}
      </div>
    </div>
  );
}

export default ChessBoard;