import {
  GET_STATE_START,
  GET_STATE_SUCCESS,
  GET_STATE_FAIL,
} from '../actions/slotState';
import {
  SPIN_START,
  SPIN_SUCCESS,
  SPIN_FAIL,
} from '../actions/spin';

const initialState = {
  loading: false,
};

export default function state(state = initialState, { type, payload, error }) {
  switch (type) {
    case GET_STATE_START:
    case SPIN_START:
      return {
        ...state,
        loading: true,
      };
    case GET_STATE_SUCCESS:
    case SPIN_SUCCESS:
      return {
        ...state,
        ...payload,
        loading: false,
      };
    case GET_STATE_FAIL:
    case SPIN_FAIL:
      return {
        ...state,
        error,
        loading: false,
      };
    default:
      return state;
  }
}
