import axios from 'axios';
import { normalize } from 'normalizr';
import * as schema from './schema';

export const GET_CONFIGURATION_START = 'GET_CONFIGURATION_START';
export const GET_CONFIGURATION_SUCCESS = 'GET_CONFIGURATION_SUCCESS';
export const GET_CONFIGURATION_FAIL = 'GET_CONFIGURATION_FAIL';

export const getConfigurationStart = () => ({
  type: GET_CONFIGURATION_START,
});

export const getConfigurationSuccess = payload => ({
  type: GET_CONFIGURATION_SUCCESS,
  payload,
});

export const getConfigurationFail = error => ({
  type: GET_CONFIGURATION_FAIL,
  error,
})

export const getConfiguration = () => dispatch => {
  dispatch(getConfigurationStart());

  return axios({
    method: 'get',
    url: '/config',
  })
    .then(res => {
      const normalizedData = normalize(res.data, schema.configuration);
      dispatch(getConfigurationSuccess(normalizedData));
      return normalizedData;
    })
    .catch(error => dispatch(getConfigurationFail(error)));
}
