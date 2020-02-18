import { addAlertAction } from '../redux/Alert/Alert-Action';

import axios from 'axios';

const isoTimeConvertWithOutTimeZone = isotime => {
  var startTime = new Date(isotime);
  return new Date(startTime.getTime() + startTime.getTimezoneOffset() * 60000);
};
/**
 * @Purpose Set the global headers if the token exists
 */
export const setAuthToken = token => {
  if (token) {
    //set gloabl headers
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export const catchAsyncRedux = (fn, dispatch, defaultMessage, errorType) => {
  return fn().catch(error => {
    if (error.response) {
      dispatch(addAlertAction(error.response.data.message));
    } else {
      dispatch(addAlertAction(defaultMessage));
    }
    if (error && errorType) {
      dispatch({
        type: errorType,
        payload: {
          msg: `${error === undefined ? defaultMessage : error}`,
          status: 400 //`${error === undefined ? 400 : error.response.status}`
        }
      });
    }
  });
};

export const capitalize = s => {
  const splitStr = s.toLowerCase().split(' ');
  for (let i = 0; i < splitStr.length; i++) {
    // Assign it back to the array
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(' ');
};

export const convertTimeToYearMonthDay = isoTime => {
  const date = new Date(isoTimeConvertWithOutTimeZone(isoTime));
  return (
    date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
  );
};

export const convertRouteId = (route, objectIds) => {
  let finalAns = route;

  for (const i in objectIds) {
    if (
      JSON.parse(JSON.stringify(objectIds[i])) !== undefined &&
      JSON.parse(JSON.stringify(objectIds[i])) !== null
    ) {
      switch (i) {
        case 'project':
          finalAns = finalAns.replace(':projectId', objectIds[i]);
          break;
        case 'section':
          finalAns = finalAns.replace(':sectionId', objectIds[i]);
          break;
        case 'task':
          finalAns = finalAns.replace(':taskId', objectIds[i]);
          break;
        case 'user':
          finalAns = finalAns.replace(':currentUserId', objectIds[i]);
          break;
        case 'notification':
          finalAns = finalAns.replace(':notificationId', objectIds[i]);
          break;
        default:
          break;
      }
    }
  }
  return finalAns;
};

export const secondsToDhms = seconds => {
  seconds = Number(seconds);
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const dDisplay = d > 0 ? d + (d === 1 ? ' day ' : ' days ') : '';
  const hDisplay = h > 0 ? h + (h === 1 ? ' hour ' : ' hours ') : '';
  const mDisplay = m > 0 ? m + (m === 1 ? ' minute ' : ' minutes ') : '';
  const sDisplay = s > 0 ? s + (s === 1 ? ' second' : ' seconds') : '';
  return dDisplay + hDisplay + mDisplay + sDisplay + ' ago';
};

export const getDateYearMonthDayFormat = isoDate => {
  let today = isoDate
    ? new Date(isoTimeConvertWithOutTimeZone(isoDate))
    : new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();

  today = yyyy + '-' + mm + '-' + dd;
  return today;
};

export const fullText = text => text.split('_').join(' ');

export const camelCaseToText = text => {
  let newString = '';
  text.split('').forEach(e => {
    if (e === e.toUpperCase()) {
      newString += ' ' + e;
    } else {
      newString += e;
    }
  });
  return newString;
};
