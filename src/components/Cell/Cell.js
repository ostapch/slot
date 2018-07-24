import React from 'react';
import { connect } from 'react-redux';
import './Cell.css';

const mapStateToProps = ({ slotState, configuration }, { row, reel }) => {
  const cellEntity = configuration.entities.cell[`${row}-${reel}`];
  let isWinning = false;

  if (cellEntity && !slotState.loading && slotState.entities.lineResult) {
    isWinning = Array.isArray(cellEntity.lineId)
      ? cellEntity.lineId.some(id => slotState.entities.lineResult[id])
      : slotState.entities.lineResult[cellEntity.lineId];
  }

  return {
    symbol: slotState.result && slotState.result.symbols[row][reel],
    loading: slotState.loading,
    cellEntity,
    isWinning,
  };
};

const Cell = ({ symbol, loading, isWinning }) => (
  <div
    className={`
      cell cell-${symbol} animated ${isWinning ? 'bounceIn' : ''} ${loading ? 'loading' : ''}
    `}
  >
    {loading ? '...' : symbol}
  </div>
);

export default connect(mapStateToProps)(Cell);
