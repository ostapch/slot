import axios from 'axios';

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
    .then(res => dispatch(getStateSuccess(res.data)))
    .catch(error => dispatch(getStateFail(error)));
}
