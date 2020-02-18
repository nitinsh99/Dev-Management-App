import axios from 'axios';
import {
  SEARCH_USER,
  SEARCH_USER_FAIL,
  SEARCH_USER_LOADING
} from '../../util/constantVariables';
import { searchUsers } from '../../util/constantRoutes';
import { catchAsyncRedux } from '../../util/method';
export const searchUserAction = search => dispatch =>
  catchAsyncRedux(
    async () => {
      const res = await axios.get(searchUsers, {
        params: { search: search }
      });
      dispatch({ type: SEARCH_USER, payload: res.data.data });
    },
    dispatch,
    'Fail to search project',
    SEARCH_USER_FAIL
  );

export const searchingAction = () => dispatch => {
  dispatch({
    type: SEARCH_USER_LOADING
  });
};
