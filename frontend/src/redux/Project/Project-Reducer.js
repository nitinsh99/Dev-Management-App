import {
  GET_PROJECT,
  GET_PROJECT_FAIL,
  CREATE_PROJECT,
  CREATE_PROJECT_FAIL,
  UPDATE_PROJECT,
  UPDATE_PROJECT_FAIL,
  DELETE_PROJECT_FAIL,
  DELETE_PROJECT,
  ISPM,
  PROJECT_LOADING
} from '../../util/constantVariables';
const initialState = {
  error: {},
  projectInfo: null,
  loaded: true,
  isPM: false
};
const projectReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PROJECT:
    case CREATE_PROJECT:
    case UPDATE_PROJECT:
      return {
        ...state,
        ...payload,
        loaded: true
      };
    case DELETE_PROJECT:
      return {
        ...state,
        projectInfo: null,
        loaded: true,
        isPM: false
      };
    case GET_PROJECT_FAIL:
    case CREATE_PROJECT_FAIL:
    case UPDATE_PROJECT_FAIL:
    case DELETE_PROJECT_FAIL:
      return {
        ...state,
        error: payload,
        loaded: true
      };
    case ISPM:
      return {
        ...state,
        isPM: true
      };
    case PROJECT_LOADING:
      return {
        ...state,
        loaded: false
      };
    default:
      return state;
  }
};

export default projectReducer;
