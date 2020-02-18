import {
  GET_TEAM_REQ,
  GET_TEAM_REQ_FAIL,
  UPDATE_TEAM_REQ_FAIL,
  CREATE_TEAM_REQ_FAIL
} from '../../util/constantVariables';
const initialState = {
  error: {},
  teamReq: null,
  loaded: true
};
const teamReqReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_TEAM_REQ:
      return {
        ...state,
        teamReq: payload,
        loaded: true
      };
    case GET_TEAM_REQ_FAIL:
    case UPDATE_TEAM_REQ_FAIL:
    case CREATE_TEAM_REQ_FAIL:
      return { ...state, error: payload, loaded: true };
    default:
      return state;
  }
};

export default teamReqReducer;
