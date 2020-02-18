import {
  GET_TASKS,
  GET_TASKS_FAIL,
  TASKS_LOADING
} from '../../util/constantVariables';
const initialState = {
  error: {},
  allTasks: null,
  loaded: true
};
const TaskReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TASKS_LOADING:
      return {
        ...state,
        loaded: false
      };
    case GET_TASKS_FAIL:
      return {
        ...state,
        loaded: true,
        error: payload
      };
    case GET_TASKS:
      return {
        ...state,
        allTasks: payload.length === 0 ? null : payload,
        loaded: true
      };
    default:
      return state;
  }
};

export default TaskReducer;
