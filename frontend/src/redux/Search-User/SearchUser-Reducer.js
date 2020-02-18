import {
  SEARCH_USER,
  SEARCH_USER_FAIL,
  SEARCH_USER_LOADING
} from '../../util/constantVariables';
const initialState = {
  error: {},
  userResults: null,
  loaded: true
};
const searchUserReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SEARCH_USER_LOADING:
      return {
        loaded: false
      };
    case SEARCH_USER:
      return {
        ...state,
        userResults: payload,
        loaded: true
      };
    case SEARCH_USER_FAIL:
      return { ...state, error: payload, loaded: true };
    default:
      return state;
  }
};

export default searchUserReducer;
