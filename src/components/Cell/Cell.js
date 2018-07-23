import React from 'react';
import { connect } from 'react-redux';
import './Cell.css';

const mapStateToProps = ({ slotState }, { row, reel }) => ({
  symbol: slotState.symbols && slotState.symbols[row][reel],
  loading: slotState.loading,
});

const Cell = ({ symbol, loading }) => (
  <div
    className={`cell cell-${symbol} ${loading ? 'loading' : ''}`}
  >
    {loading ? '...' : symbol}
  </div>
);

export default connect(mapStateToProps)(Cell);
