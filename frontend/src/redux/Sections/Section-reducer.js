import {
  UPDATE_SECTION_FAIL,
  GET_SECTION_FAIL,
  DELETE_SECTION_FAIL,
  CREATE_SECTION_FAIL,
  CREATE_SECTION,
  GET_SECTION,
  DELETE_SECTION,
  UPDATE_SECTION,
  ///////////
  UPDATE_TASK,
  CREATE_TASK,
  DELETE_TASK,
  CREATE_TASK_FAIL,
  DELETE_TASK_FAIL,
  UPDATE_TASK_FAIL,
  ///////////
  SECTION_LOADING
} from '../../util/constantVariables';
const initialState = {
  error: {},
  allSections: null,
  loaded: true
};
const projectReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_SECTION:
    case GET_SECTION:
    case DELETE_SECTION:
    case UPDATE_SECTION:
    case UPDATE_TASK:
    case CREATE_TASK:
    case DELETE_TASK:
      return {
        ...state,
        allSections: payload,
        loaded: true
      };
    case SECTION_LOADING:
      return {
        ...state,
        loaded: false
      };
    case CREATE_TASK_FAIL:
    case DELETE_TASK_FAIL:
    case UPDATE_TASK_FAIL:
    case UPDATE_SECTION_FAIL:
    case GET_SECTION_FAIL:
    case DELETE_SECTION_FAIL:
    case CREATE_SECTION_FAIL:
      return {
        ...state,
        error: payload,
        loaded: true
      };
    default:
      return state;
  }
};

export default projectReducer;
