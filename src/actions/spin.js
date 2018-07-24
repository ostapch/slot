import axios from 'axios';
import { normalize } from 'normalizr';
import * as schema from './schema';

export const SPIN_START = 'SPIN_START';
export const SPIN_SUCCESS = 'SPIN_SUCCESS';
export const SPIN_FAIL = 'SPIN_FAIL';

export const spinStart = () => ({
  type: SPIN_START,
});

export const spinSuccess = payload => ({
  type: SPIN_SUCCESS,
  payload,
});

export const spinFail = error => ({
  type: SPIN_FAIL,
  error,
})

export const spin = (lineBet, linesCount) => dispatch => {
  dispatch(spinStart());

  return axios({
    method: 'get',
    url: `/spin?lineBet=${lineBet}&linesCount=${linesCount}`,
  })
    .then(res => {
      const normalizedData = normalize(res.data, schema.slotState);
      dispatch(spinSuccess(normalizedData));
      return normalizedData;
    })
    .catch(error => dispatch(spinFail(error)));
}
