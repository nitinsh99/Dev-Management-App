import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { persistStore, persistReducer } from 'redux-persist';
import localStorageWindow from 'redux-persist/lib/storage';
//All Reducers===========================
import alertdata from './Alert/Alert-Reducer';
import authdata from './Auth/auth-reducer';
import team_req_data from './TeamReq/TeamReq-Reducer';
import projectdata from './Project/Project-Reducer';
import searchprojectdata from './Search-Project/SearchProject-Reducer';
import searchuserdata from './Search-User/SearchUser-Reducer';
import taskdata from './Tasks/Task-reducer';
import sectiondata from './Sections/Section-reducer';
//All Reducers===========================

import { setAuthToken } from '../util/method';

import { LOGOUT } from '../util/constantVariables';
const initialState = {};
const persistConfig = {
  key: 'root',
  storage: localStorageWindow,
  whitelist: ['authdata']
};

const allReducer = combineReducers({
  authdata,
  alertdata,
  projectdata,
  team_req_data,
  searchprojectdata,
  searchuserdata,
  taskdata,
  sectiondata
});
const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    state = undefined;
    localStorage.removeItem('token');
    setAuthToken();
    localStorage.removeItem('persist:root');
  }
  return allReducer(state, action);
};

const middleWare = [thunk];
export const storage = createStore(
  persistReducer(persistConfig, rootReducer),
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export const persistor = persistStore(storage);
