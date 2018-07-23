import React from 'react';
import './Line.css';
import Cell from '../Cell';

export default function Line({ cells, isWinning }) {
  return (
    <div className="line">
      <div className={`line-inner animated ${isWinning ? 'bounceIn' : ''}`}>
        {cells.map(({ row, reel }) => (
          <Cell key={`${row}${reel}`} row={row} reel={reel} />
        ))}
      </div>
    </div>
  );
}
