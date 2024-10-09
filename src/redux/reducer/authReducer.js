// redux/reducers/authReducer.js
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from '../actionTypes';

const initialState = {
  loading: false,
  error: null,
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {...state, loading: true, error: null};
    case REGISTER_SUCCESS:
      return {...state, loading: false, user: action.payload};
    case REGISTER_FAILURE:
      return {...state, loading: false, error: action.payload};

    case LOGIN_REQUEST:
      return {...state, loading: true, error: null};
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
      };
    case LOGIN_FAILURE:
      return {...state, loading: false, error: action.payload};
    default:
      return state;
  }
};

export default authReducer;
