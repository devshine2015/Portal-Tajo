import { combineReducers } from 'redux-immutable';
import globalFleetReducer, * as fromGlobalFleetReducer from './reducers/globalFleetReducer';
import onlineReducer, * as fromOnlineReducer from './reducers/onlineReducer';
import errorsReducer, * as fromErrorsReducer from './reducers/errorsReducer';

export default combineReducers({
  errors: errorsReducer,
  online: onlineReducer,
  fleet: globalFleetReducer,
});

export const getFleetName = state =>
  fromGlobalFleetReducer.getFleetName(state.getIn(['global', 'fleet']));

export const getAppOnlineState = state =>
  fromOnlineReducer.getAppOnlineState(state.getIn(['global', 'online']));

export const getErrorMessage = state =>
  fromErrorsReducer.getErrorMessage(state.getIn(['global', 'errors']));
