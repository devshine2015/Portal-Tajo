import { combineReducers } from 'redux-immutable';
// @deprecated -- remove after publishing new portal
import globalFleetReducer, * as fromGlobalFleetReducer from './reducers/globalFleetReducer';
import onlineReducer, * as fromOnlineReducer from './reducers/onlineReducer';
import errorsReducer, * as fromErrorsReducer from './reducers/errorsReducer';

export default combineReducers({
  errors: errorsReducer,
  online: onlineReducer,
  // @deprecated -- remove after publishing new portal
  fleet: globalFleetReducer,
});

// @deprecated -- remove after publishing new portal
export const getFleetName = state =>
  fromGlobalFleetReducer.getFleetName(state.getIn(['global', 'fleet']));

export const getAppOnlineState = state =>
  fromOnlineReducer.getAppOnlineState(state.getIn(['global', 'online']));

export const getErrorMessage = state =>
  fromErrorsReducer.getErrorMessage(state.getIn(['global', 'errors']));
