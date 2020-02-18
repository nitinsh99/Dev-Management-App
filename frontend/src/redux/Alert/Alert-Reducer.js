import { ALERT, ALERT_REMOVE } from '../../util/constantVariables';
const init = [];

const checkIfDuplicateObject = (newMsg, arrayOfObject) => {
  let itsDuplicate = false;
  arrayOfObject.forEach(e => {
    if (e.msg === newMsg) {
      itsDuplicate = true;
    }
  });
  return itsDuplicate;
};

const alertReducer = (state = init, action) => {
  const { type, payload } = action;
  switch (type) {
    case ALERT:
      if (checkIfDuplicateObject(payload, state) === false) {
        return [...state, payload];
      }
      break;
    case ALERT_REMOVE:
      return state.filter(alert => alert.id !== payload);
    default:
      return state;
  }
};
export default alertReducer;
