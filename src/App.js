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
import Row from './components/Row';
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
      this.setState({ lineBet: configuration.result.minCoins });
    });
    this.props.actions.getState();
  };

  spin = () => {
    this.props.actions.spin(
      this.state.lineBet,
      this.props.configuration.result.rows
    );
  };

  handleLineBetChange = lineBet => {
    this.setState({ lineBet });
  };

  render() {
    const { configuration, slotState } = this.props;
    const { lineBet } = this.state;

    const coins = slotState.result
      && configuration.result
      && slotState.result.balance
      && configuration.result.coinValue
      && Number(slotState.result.balance / configuration.result.coinValue).toFixed(2);

    let rows = [];

    if (configuration.result && configuration.result.rows) {
      for (let i = 0; i < configuration.result.rows; i++) {
        rows.push(<Row key={i} row={i} reels={configuration.result.reels} />);
      }
    }

    return (
      <div className="wrapper">
        <header className="header">
          <span>
            Balance:&nbsp;
            {slotState.result && slotState.result.balance ? `€${slotState.result.balance}` : '...'}
          </span>
          <span>Coins: {coins || '...'}</span>
        </header>

        <div className="sub-header">
          {lineBet
            && <div>
                Line Bet:&nbsp;
                <InputNumber
                  min={configuration.result.minCoins}
                  max={configuration.result.maxCoins}
                  step={1}
                  value={lineBet}
                  style={{ width: 80 }}
                  onChange={this.handleLineBetChange}
                  disabled={configuration.loading || slotState.loading}
                />&nbsp;
                conins
              </div>}
          <div>
            Coin Value: {configuration.result ? configuration.result.coinValue : '...'}
          </div>
        </div>

        <div>
          {configuration.loading && !configuration.result ? 'Loading...' : rows}
        </div>

        <footer className="footer">
          <button onClick={this.spin} className="button">Spin</button>
          {!slotState.loading && slotState.result && slotState.result.totalWin
            ? <div className="win animated flash">
                Win: {slotState.result.totalWin}
              </div>
            : null}
        </footer>

        <Errors />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
