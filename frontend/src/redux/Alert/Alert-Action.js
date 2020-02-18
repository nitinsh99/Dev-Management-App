import { ALERT, ALERT_REMOVE } from '../../util/constantVariables';
import uuid from 'uuid';
export const addAlertAction = msg => dispatch => {
  const generateId = uuid.v4();
  dispatch({
    type: ALERT,
    payload: {
      msg,
      id: generateId
    }
  });
  setTimeout(() => {
    dispatch({
      type: ALERT_REMOVE,
      payload: generateId
    });
  }, 4000);
};
export const removeAlertAction = id => dispatch => {
  dispatch({
    type: ALERT_REMOVE,
    payload: id
  });
};
