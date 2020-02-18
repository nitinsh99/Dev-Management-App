import axios from 'axios';
import {
  SEARCH_PROJECT,
  SEARCH_PROJECT_FAIL,
  SEARCH_PROJECT_LOADING
} from '../../util/constantVariables';
import { searchProject } from '../../util/constantRoutes';
import { catchAsyncRedux } from '../../util/method';
export const searchProjectAction = search => dispatch =>
  catchAsyncRedux(
    async () => {
      const res = await axios.get(searchProject, {
        params: { search }
      });
      dispatch({
        type: SEARCH_PROJECT,
        payload: res.data.data
      });
    },
    dispatch,
    'Fail to search project',
    SEARCH_PROJECT_FAIL
  );

export const searchingAction = () => dispatch => {
  dispatch({
    type: SEARCH_PROJECT_LOADING
  });
};
