import {
  GET_CONFIGURATION_START,
  GET_CONFIGURATION_SUCCESS,
  GET_CONFIGURATION_FAIL,
} from '../actions/configuration';

const initialState = {
  loading: false,
};

export default function configuration(state = initialState, { type, payload, error }) {
  switch (type) {
    case GET_CONFIGURATION_START:
      return {
        ...state,
        loading: true,
      };
    case GET_CONFIGURATION_SUCCESS:
      return {
        ...state,
        ...payload,
        loading: false,
      };
    case GET_CONFIGURATION_FAIL:
      return {
        ...state,
        error,
        loading: false,
      };
    default:
      return state;
  }
}
