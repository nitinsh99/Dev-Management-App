import axios from 'axios';
import {
  UPDATE_USER,
  UPDATE_USER_FAIL,
  UPDATE_USER_PASSWORD,
  UPDATE_USER_PASSWORD_FAIL,
  LOGOUT,
  DELETE_USER_FAIL,
  GET_USER,
  GET_USER_FAIL,
  USER_LOADING
} from '../../util/constantVariables';
import { config } from '../../util/constantConfig';
import {
  updateUserRoute,
  updateUserPasswordRoute,
  deleteUser,
  getUser,
  deleteUserFromProject
} from '../../util/constantRoutes';
import { catchAsyncRedux, convertRouteId, capitalize } from '../../util/method';
import { addAlertAction } from '../Alert/Alert-Action';
import { CRUDTeamReqAction } from '../TeamReq/TeamReq-Action';
import { CRUDProjectAction } from '../Project/Project-Action';
export const deleteUserFromAProjectAction = (
  userId,
  projectId,
  pmId
) => dispatch =>
  catchAsyncRedux(
    async () => {
      dispatch({
        type: USER_LOADING
      });
      const res = await axios.delete(
        convertRouteId(deleteUserFromProject, { user: userId })
      );
      const { message } = res.data;
      dispatch(addAlertAction(message));
      dispatch(
        CRUDTeamReqAction('create', projectId, null, {
          result: 'remove',
          sender: pmId,
          receiver: userId
        })
      );
      dispatch(CRUDProjectAction('get', projectId));
    },
    dispatch,
    'Fail to remove user from your project'
  );
export const updateUserAction = updateDataObject => dispatch => {
  return catchAsyncRedux(
    async () => {
      dispatch({
        type: USER_LOADING
      });
      const {
        firstName,
        lastName,
        email,
        username,
        provinceOrState,
        country,
        role,
        company
      } = updateDataObject;

      const res = await axios.put(
        updateUserRoute,
        JSON.stringify({
          firstName: capitalize(firstName),
          lastName: capitalize(lastName),
          email,
          username,
          provinceOrState: provinceOrState.toUpperCase(),
          country: capitalize(country),
          role: capitalize(role),
          company: capitalize(company)
        }),
        config
      );
      const { message, data } = res.data;

      dispatch({
        type: UPDATE_USER,
        payload: data
      });
      dispatch(addAlertAction(message));
    },
    dispatch,
    'Fail to update user info',
    UPDATE_USER_FAIL
  );
};
const checkFile = image => {
  let ans = false;
  const array = ['image/gif', 'image/jpeg', 'image/png'];
  array.forEach(e => {
    if (image === e) {
      ans = true;
    }
  });
  return ans;
};
export const updateImageAction = imageBody => dispatch =>
  catchAsyncRedux(
    async () => {
      dispatch({
        type: USER_LOADING
      });
      if (checkFile(imageBody.type) === false) {
        return dispatch(
          addAlertAction('File must be either gif or jpeg or png')
        );
      }
      let url = null;
      if (imageBody) {
        const dataI = new FormData();
        dataI.append('file', imageBody);
        dataI.append('upload_preset', 'ml_default');
        const resp = await fetch(
          'https://api.cloudinary.com/v1_1/drh2w8wna/image/upload',
          {
            method: 'POST',
            body: dataI
          }
        );
        const file = await resp.json();
        url = file.url;
      }
      const res = await axios.put(
        updateUserRoute,
        { profileImage: url },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      const { data, message } = res.data;
      dispatch({
        type: UPDATE_USER,
        payload: data
      });
      dispatch(addAlertAction(message));
    },
    dispatch,
    'Fail to Update User',
    UPDATE_USER_FAIL
  );

export const updateUserPasswordAction = (
  currentPassword,
  password
) => dispatch => {
  return catchAsyncRedux(
    async () => {
      dispatch({
        type: USER_LOADING
      });
      const body = {
        currentPassword,
        password
      };
      const res = await axios.put(
        updateUserPasswordRoute,
        JSON.stringify(body),
        config
      );
      const { token, message } = res.data;
      dispatch({
        type: UPDATE_USER_PASSWORD,
        payload: {
          token
        }
      });
      dispatch(addAlertAction(message));
    },
    dispatch,
    'Fail to update user password',
    UPDATE_USER_PASSWORD_FAIL
  );
};

export const deleteUserAction = () => dispatch =>
  catchAsyncRedux(
    async () => {
      dispatch({
        type: USER_LOADING
      });
      const res = await axios.delete(deleteUser);
      dispatch({
        type: LOGOUT
      });
      dispatch(addAlertAction(res.data.message));
    },
    dispatch,
    'Fail to delete user',
    DELETE_USER_FAIL
  );

export const getUserInfo = () => dispatch =>
  catchAsyncRedux(
    async () => {
      dispatch({
        type: USER_LOADING
      });
      const res = await axios.get(getUser);
      dispatch({
        type: GET_USER,
        payload: res.data.data
      });
    },
    dispatch,
    'Fail to get user info',
    GET_USER_FAIL
  );
