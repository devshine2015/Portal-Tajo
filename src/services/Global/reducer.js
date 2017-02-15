import { combineReducers } from 'redux-immutable';
import onlineReducer, * as fromOnlineReducer from './reducers/onlineReducer';
import errorsReducer, * as fromErrorsReducer from './reducers/errorsReducer';
import contextReducer, * as fromContextReducer from './reducers/contextReducer';

export default combineReducers({
  errors: errorsReducer,
  online: onlineReducer,
  context: contextReducer,
});

export const getAppOnlineState = state =>
  fromOnlineReducer.getAppOnlineState(state.getIn(['global', 'online']));

export const getErrorMessage = state =>
  fromErrorsReducer.getErrorMessage(state.getIn(['global', 'errors']));

export const getVehicleFilterString = state =>
  fromContextReducer.getVehicleFilterString(state.getIn(['global', 'context']));
