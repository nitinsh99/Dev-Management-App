import {
  SEARCH_PROJECT,
  SEARCH_PROJECT_FAIL,
    SEARCH_PROJECT_LOADING
} from '../../util/constantVariables';
const initialState = {
  error: {},
  projectResults: null,
  loaded: true
};
const searchProjectReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SEARCH_PROJECT_LOADING:
      return {
        loaded: false
      };
    case SEARCH_PROJECT:
      return {
        ...state,
        projectResults: payload,
        loaded: true
      };
    case SEARCH_PROJECT_FAIL:
      return { ...state, error: payload, loaded: true };
    default:
      return state;
  }
};

export default searchProjectReducer;
