// redux/actions/authActions.js
import AxiosInstance from '../../helpers/AxiosInstance';
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from '../actionTypes';

export const registerUser = userData => async dispatch => {
  dispatch({type: REGISTER_REQUEST});

  try {
    const response = await AxiosInstance().post('/auth/signup', userData);
    dispatch({type: REGISTER_SUCCESS, payload: response});
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response?.data?.message || 'Registration failed',
    });
  }
};

export const loginRequest = () => ({type: 'LOGIN_REQUEST'});
export const loginSuccess = (user, token) => ({
  type: 'LOGIN_SUCCESS',
  payload: {user, token},
});
export const loginFailure = error => ({type: 'LOGIN_FAILURE', payload: error});
