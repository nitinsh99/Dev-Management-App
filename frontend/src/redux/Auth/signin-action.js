import axios from 'axios';
import { LOGIN_FAIL, LOGIN, LOGOUT } from '../../util/constantVariables';
import { config } from '../../util/constantConfig';
import { signinRoute } from '../../util/constantRoutes';
import { catchAsyncRedux } from '../../util/method';
import { addAlertAction } from '../Alert/Alert-Action';
export const loginAction = (email, password, history) => dispatch =>
  catchAsyncRedux(
    async () => {
      const body = {
        email,
        password
      };
      const res = await axios.post(signinRoute, JSON.stringify(body), config);
      dispatch({
        type: LOGIN,
        payload: {
          token: res.data.token,
          userInfo: res.data.data
        }
      });
      history.push('/dashboard');
      dispatch(addAlertAction('Login Successful'));
    },
    dispatch,
    'Fail to login',
    LOGIN_FAIL
  );
//Logout
export const logoutAction = history => dispatch => {
  dispatch({
    type: LOGOUT
  });
  history.push('/sign-in');
  dispatch(addAlertAction('You are logout'));
};
