import axios from 'axios';
import {
  GET_TASKS_FAIL,
  GET_TASKS,
  TASKS_LOADING
} from '../../util/constantVariables';
import { getTasksFromCurrentProject } from '../../util/constantRoutes';
import { catchAsyncRedux, convertRouteId } from '../../util/method';
/**
 * get all tasks eg. (projectId)
 */
export const getTasksAction = projectId => dispatch =>
  catchAsyncRedux(
    async () => {
      dispatch({
        type: TASKS_LOADING
      });
      const res = await axios.get(
        convertRouteId(getTasksFromCurrentProject, {
          project: projectId
        })
      );
      const { data } = res.data;
      dispatch({
        type: GET_TASKS,
        payload: data
      });
    },
    dispatch,
    'Fail to get tasks',
    GET_TASKS_FAIL
  );
