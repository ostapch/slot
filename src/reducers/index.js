import { combineReducers } from 'redux';
import configuration from './configuration';
import slotState from './slotState';

export default combineReducers({
  configuration,
  slotState,
});
