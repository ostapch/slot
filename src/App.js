import React, { Component } from 'react';
import InputNumber from 'rc-input-number';
import 'rc-input-number/assets/index.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import 'animate.css/animate.min.css'
import './App.css';
import { reset } from './actions/reset';
import { getConfiguration } from './actions/configuration';
import { getState } from './actions/slotState';
import { spin } from './actions/spin';
import Line from './components/Line';
import Errors from './components/Errors';

const mapStateToProps = ({ configuration, slotState }) => ({
  configuration,
  slotState,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    reset,
    getConfiguration,
    getState,
    spin,
  }, dispatch),
})

class App extends Component {
  state = {};

  componentDidMount() {
    this.init();
  }

  init = async () => {
    await this.props.actions.reset();
    this.props.actions.getConfiguration().then(configuration => {
      this.setState({ lineBet: configuration.minCoins });
    });
    this.props.actions.getState();
  };

  spin = () => {
    this.props.actions.spin(
      this.state.lineBet,
      this.props.configuration.rows
    );
  };

  handleLineBetChange = lineBet => {
    this.setState({ lineBet });
  };

  render() {
    const { configuration, slotState } = this.props;
    const { lineBet } = this.state;

    const coins = slotState.balance
      && configuration.coinValue
      && Number(slotState.balance / configuration.coinValue).toFixed(2);

    return (
      <div className="wrapper">
        <header className="header">
          <span>Balance: {slotState.balance ? `€${slotState.balance}` : '...'}</span>
          <span>Coins: {coins || '...'}</span>
        </header>

        <div className="sub-header">
          {lineBet
            && <div>
                Line Bet:&nbsp;
                <InputNumber
                  min={configuration.minCoins}
                  max={configuration.maxCoins}
                  step={1}
                  value={lineBet}
                  style={{ width: 80 }}
                  onChange={this.handleLineBetChange}
                  disabled={configuration.loading || slotState.loading}
                />&nbsp;
                conins
              </div>}
          <div>
            Coin Value: {configuration.coinValue || '...'}
          </div>
        </div>

        <div>
          {configuration.loading
            ? 'Loading...'
            : configuration.lines && slotState.lineResults &&
              configuration.lines.map(({ id, cells }) => (
                <Line
                  key={id}
                  cells={cells}
                  isWinning={
                    !slotState.loading
                    && slotState.lineResults.length
                    && slotState.lineResults.find(({ lineId }) => id === lineId).win
                  }
                />
              ))}
        </div>

        <footer className="footer">
          <button onClick={this.spin} className="button">Spin</button>
          {slotState.totalWin && !slotState.loading
            ? <div className="win animated flash">
                Win: {slotState.totalWin}
              </div>
            : null}
        </footer>

        <Errors />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
