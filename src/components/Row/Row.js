import React from 'react';
import './Row.css';
import Cell from '../Cell';

export default function Row({ row, reels }) {
  let cells = [];

  for (let i = 0; i < reels; i++) {
    cells.push(<Cell key={i} row={row} reel={i} />);
  }

  return (
    <div className="row">
      <div className="row-inner">
        {cells}
      </div>
    </div>
  );
}
