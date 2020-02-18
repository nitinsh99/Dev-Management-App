import {
  LOGIN,
  LOGIN_FAIL,
  SIGNUP,
  SIGNUP_FAIL,
  UPDATE_USER,
  UPDATE_USER_FAIL,
  UPDATE_USER_PASSWORD_FAIL,
  UPDATE_USER_PASSWORD,
  DELETE_USER_FAIL,
  GET_USER,
  GET_USER_FAIL,
  USER_LOADING
} from '../../util/constantVariables';
import { setAuthToken } from '../../util/method';
const initialState = {
  token: localStorage.getItem('token'),
  isAuth: false,
  userInfo: null,
  loaded: true,
  error: {}
};
const loadUserReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADING:
      return {
        ...state,
        loaded: false
      };
    case LOGIN:
    case SIGNUP:
    case UPDATE_USER_PASSWORD:
      localStorage.setItem('token', payload.token);
      setAuthToken(localStorage.token);
      return {
        ...state,
        ...payload,
        isAuth: true,
        loaded: true
      };
    case GET_USER:
    case UPDATE_USER:
      return {
        ...state,
        userInfo: payload,
        loaded: true
      };
    case GET_USER_FAIL:
    case DELETE_USER_FAIL:
    case UPDATE_USER_FAIL:
    case UPDATE_USER_PASSWORD_FAIL:
    case SIGNUP_FAIL:
    case LOGIN_FAIL:
      return {
        ...state,
        error: payload,
        loaded: true
      };
    default:
      localStorage.removeItem('token');
      return state;
  }
};

export default loadUserReducer;
