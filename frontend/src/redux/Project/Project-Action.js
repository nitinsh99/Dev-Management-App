import axios from 'axios';
import {
  GET_PROJECT,
  GET_PROJECT_FAIL,
  CREATE_PROJECT,
  CREATE_PROJECT_FAIL,
  UPDATE_PROJECT,
  UPDATE_PROJECT_FAIL,
  DELETE_PROJECT_FAIL,
  DELETE_PROJECT,
  ISPM,
  PROJECT_LOADING
} from '../../util/constantVariables';
import { config } from '../../util/constantConfig';
import {
  createProject,
  updateProject,
  deleteProject,
  getProject
} from '../../util/constantRoutes';
import { catchAsyncRedux, convertRouteId } from '../../util/method';
import { getUserInfo } from '../Auth/userinfo-action';
export const CRUDProjectAction = (method, projectId, body, history) => {
  return dispatch => {
    const argsObject = {
      defaultMessage:
        method === 'get' ? 'No Project Found' : `Fail to ${method} Project`
    };
    let successType = null;
    switch (method) {
      case 'get':
        argsObject.errorType = GET_PROJECT_FAIL;
        successType = GET_PROJECT;
        break;
      case 'create':
        argsObject.errorType = CREATE_PROJECT_FAIL;
        successType = CREATE_PROJECT;
        break;
      case 'change':
        successType = UPDATE_PROJECT;
        argsObject.errorType = UPDATE_PROJECT_FAIL;
        break;
      case 'delete':
        successType = DELETE_PROJECT;
        argsObject.errorType = DELETE_PROJECT_FAIL;
        break;
      default:
        break;
    }

    const mainFunc = async () => {
      let res;

      dispatch({
        type: PROJECT_LOADING
      });
      switch (method) {
        case 'create':
          res = await axios.post(createProject, JSON.stringify(body), config);
          break;
        case 'delete':
          res = await axios.delete(
            convertRouteId(deleteProject, { project: projectId })
          );
          break;
        case 'change':
          res = await axios.put(
            convertRouteId(updateProject, { project: projectId }),
            JSON.stringify(body),
            config
          );
          break;
        case 'get':
          res = await axios.get(
            convertRouteId(getProject, { project: projectId })
          );
          break;
        default:
          break;
      }
      dispatch({
        type: successType,
        payload: {
          projectInfo: res.data.data
        }
      });
      if (method === 'delete' || method === 'create') {
        dispatch(getUserInfo());
        if(history) {
          history.push('/');
        }
      }
    };
    return catchAsyncRedux(
      mainFunc,
      dispatch,
      argsObject.defaultMessage,
      argsObject.errorType
    );
  };
};

export const isPMAction = (currentUserId, pmUserId) => dispatch => {
  if (currentUserId === pmUserId) {
    dispatch({
      type: ISPM
    });
  }
};
