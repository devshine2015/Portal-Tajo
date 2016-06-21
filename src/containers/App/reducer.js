import { combineReducers } from 'redux-immutable';
import fleetReducer, * as fromFleetReducer from './reducers/fleetReducer';
import authReducer, * as fromAuthReducer from './reducers/authReducer';
import onlineStateReducer, * as fromOnlineStateReducer from './reducers/onlineStateReducer';

const globalReducer = combineReducers({
  onlineState: onlineStateReducer,
  auth: authReducer,
  fleet: fleetReducer,
});

export default globalReducer;

export const getFleetName = (state) =>
  fromFleetReducer.getFleetName(state.getIn(['global', 'fleet']));
export const getIsUserAuthenticated = (state) =>
  fromAuthReducer.getIsAuthenticated(state.getIn(['global', 'auth']));
export const getAppOnlineState = (state) =>
  fromOnlineStateReducer.getOnlineStatus(state.getIn(['global', 'onlineState']));
