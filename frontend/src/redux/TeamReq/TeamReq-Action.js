import axios from 'axios';
import {
  GET_TEAM_REQ_FAIL,
  GET_TEAM_REQ,
  UPDATE_TEAM_REQ_FAIL,
  CREATE_TEAM_REQ_FAIL,
  TEAM_REQ_LOADING,
  UPDATE_TEAM_REQ,
  CREATE_TEAM_REQ
} from '../../util/constantVariables';
import { config } from '../../util/constantConfig';
import {
  getTeamReq,
  updateTeamReq,
  createTeamReq
} from '../../util/constantRoutes';
import { convertRouteId, catchAsyncRedux } from '../../util/method';
import { addAlertAction } from '../Alert/Alert-Action';

export const CRUDTeamReqAction = (
  method,
  projectId,
  notificationId,
  body
) => dispatch => {
  const argsObject = {
    defaultMessage: `Fail to ${method} Team Notification`
  };
  let successType = null;
  switch (method) {
    case 'get':
      argsObject.errorType = GET_TEAM_REQ_FAIL;
      successType = GET_TEAM_REQ;
      break;
    case 'create':
      argsObject.errorType = CREATE_TEAM_REQ_FAIL;
      successType = CREATE_TEAM_REQ;
      break;
    case 'change':
      argsObject.errorType = UPDATE_TEAM_REQ_FAIL;
      successType = UPDATE_TEAM_REQ;
      break;
    default:
      break;
  }
  return catchAsyncRedux(
    async () => {
      dispatch({
        type: TEAM_REQ_LOADING
      });
      let res;
      switch (method) {
        case 'create':
          res = await axios.post(
            convertRouteId(createTeamReq, {
              project: projectId
            }),
            JSON.stringify(body),
            config
          );
          break;
        case 'change':
          res = await axios.put(
            convertRouteId(updateTeamReq, {
              notification: notificationId
            }),
            JSON.stringify(body),
            config
          );
          break;
        case 'get':
          res = await axios.get(getTeamReq);
          break;
        default:
          break;
      }
      dispatch(addAlertAction(res.data.message));
      if (method === 'get') {
        dispatch({
          type: successType,
          payload: res.data.data
        });
      }
    },
    dispatch,
    argsObject.defaultMessage,
    argsObject.errorType
  );
};
