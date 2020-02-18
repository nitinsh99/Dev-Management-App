import axios from 'axios';
import {
  UPDATE_SECTION_FAIL,
  GET_SECTION_FAIL,
  DELETE_SECTION_FAIL,
  CREATE_SECTION_FAIL,
  CREATE_SECTION,
  GET_SECTION,
  DELETE_SECTION,
  UPDATE_SECTION,
  ////////////////////////
  UPDATE_TASK_FAIL,
  DELETE_TASK_FAIL,
  CREATE_TASK_FAIL,
  UPDATE_TASK,
  CREATE_TASK,
  DELETE_TASK,
  SECTION_LOADING
} from '../../util/constantVariables';
import { config } from '../../util/constantConfig';
import {
  createSection,
  updateSection,
  deleteSection,
  getAllSections,
  createTask,
  updateTask,
  deleteTask
} from '../../util/constantRoutes';
import { catchAsyncRedux, convertRouteId } from '../../util/method';
import { addAlertAction } from '../Alert/Alert-Action';
//  * get section ('get', projectId)
//  * delete section eg. ('delete', projectId, sectionId)
//  * update section eg. ('change', projectId, sectionId)
//  * create section eg. ('create', projectId, null, body)
//  * create task eg. ('create-task', projectId, sectionId, body)
//  * update task eg .('update-task', projectId, sectionId, body, taskId)
//  * delete task eg. ('delete-task', projectId, sectionId, null, taskId)
export const CRUDSectionAction = (
  method,
  projectId,
  sectionId,
  body,
  taskId
) => dispatch => {
  const argsObject = {
    defaultMessage: `Fail to ${method} section`
  };
  let successType = null;
  switch (method) {
    case 'get':
      argsObject.errorType = GET_SECTION_FAIL;
      successType = GET_SECTION;
      break;
    case 'create':
      argsObject.errorType = CREATE_SECTION_FAIL;
      successType = CREATE_SECTION;
      break;
    case 'change':
      argsObject.errorType = UPDATE_SECTION_FAIL;
      successType = UPDATE_SECTION;
      break;
    case 'delete':
      argsObject.errorType = DELETE_SECTION_FAIL;
      successType = DELETE_SECTION;
      break;
    case 'update-task':
      argsObject.errorType = UPDATE_TASK_FAIL;
      successType = UPDATE_TASK;
      break;
    case 'delete-task':
      argsObject.errorType = DELETE_TASK_FAIL;
      successType = DELETE_TASK;
      break;
    case 'create-task':
      argsObject.errorType = CREATE_TASK_FAIL;
      successType = CREATE_TASK;
      break;
    default:
      break;
  }
  return catchAsyncRedux(
    async () => {
      dispatch({
        type: SECTION_LOADING
      });
      let res;
      switch (method) {
        case 'create':
          res = await axios.post(
            convertRouteId(createSection, { project: projectId }),
            JSON.stringify(body),
            config
          );
          break;
        case 'delete':
          res = await axios.delete(
            convertRouteId(deleteSection, {
              project: projectId,
              section: sectionId
            })
          );
          break;
        case 'change':
          res = await axios.put(
            convertRouteId(updateSection, {
              project: projectId,
              section: sectionId
            }),
            JSON.stringify(body),
            config
          );
          break;
        case 'get':
          res = await axios.get(
            convertRouteId(getAllSections, {
              project: projectId
            })
          );
          break;
        case 'create-task':
          res = await axios.post(
            convertRouteId(createTask, {
              project: projectId,
              section: sectionId
            }),
            JSON.stringify(body),
            config
          );
          break;
        case 'update-task':
          res = await axios.put(
            convertRouteId(updateTask, {
              project: projectId,
              section: sectionId,
              task: taskId
            }),
            JSON.stringify(body),
            config
          );
          break;
        case 'delete-task':
          res = await axios.delete(
            convertRouteId(deleteTask, {
              project: projectId,
              section: sectionId,
              task: taskId
            })
          );
          break;
        default:
          break;
      }
      const { data, message } = res.data;
      dispatch(addAlertAction(message));
      dispatch({
        type: successType,
        payload: data
      });
    },
    dispatch,
    argsObject.defaultMessage,
    argsObject.errorType
  );
};
