import axios from 'axios';

export const RESET_START = 'RESET_START';
export const RESET_SUCCESS = 'RESET_SUCCESS';
export const RESET_FAIL = 'RESET_FAIL';

export const resetStart = () => ({
  type: RESET_START,
});

export const resetSuccess = payload => ({
  type: RESET_SUCCESS,
  payload,
});

export const resetFail = error => ({
  type: RESET_FAIL,
  error,
})

export const reset = (lineBet, linesCount) => dispatch => {
  dispatch(resetStart());

  return axios({
    method: 'get',
    url: `/reset`,
  })
    .then(res => dispatch(resetSuccess(res.data)))
    .catch(error => dispatch(resetFail(error)));
}
