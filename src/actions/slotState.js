import axios from 'axios';
import { normalize } from 'normalizr';
import * as schema from './schema';

export const GET_STATE_START = 'GET_STATE_START';
export const GET_STATE_SUCCESS = 'GET_STATE_SUCCESS';
export const GET_STATE_FAIL = 'GET_STATE_FAIL';

export const getStateStart = () => ({
  type: GET_STATE_START,
});

export const getStateSuccess = payload => ({
  type: GET_STATE_SUCCESS,
  payload,
});

export const getStateFail = error => ({
  type: GET_STATE_FAIL,
  error,
})

export const getState = () => dispatch => {
  dispatch(getStateStart());

  return axios({
    method: 'get',
    url: '/state',
  })
    .then(res => {
      const normalizedData = normalize(res.data, schema.slotState);
      dispatch(getStateSuccess(normalizedData));
      return normalizedData;
    })
    .catch(error => dispatch(getStateFail(error)));
}
