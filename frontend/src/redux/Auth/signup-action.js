import axios from 'axios';
import { SIGNUP, SIGNUP_FAIL } from '../../util/constantVariables';
import { config } from '../../util/constantConfig';
import { signupRoute } from '../../util/constantRoutes';
import { catchAsyncRedux, capitalize } from '../../util/method';
import { addAlertAction } from '../../redux/Alert/Alert-Action';
export const signupAction = (
  firstName,
  lastName,
  email,
  password,
  username,
  provinceOrState,
  country,
  role,
  history
) => dispatch =>
  catchAsyncRedux(
    async () => {
      const body = {
        firstName: capitalize(firstName),
        lastName: capitalize(lastName),
        email,
        password,
        username,
        provinceOrState: provinceOrState.toUpperCase(),
        country: capitalize(country),
        role: capitalize(role)
      };
      const res = await axios.post(signupRoute, JSON.stringify(body), config);
      dispatch(addAlertAction('You are registered'));
      dispatch({
        type: SIGNUP,
        payload: {
          token: res.data.token,
          userInfo: res.data.data
        }
      });
      history.push('/dashboard');
    },
    dispatch,
    'Fail to Sign up',
    SIGNUP_FAIL
  );
