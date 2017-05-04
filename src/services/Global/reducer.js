import { combineReducers } from 'redux-immutable';
import onlineReducer, * as fromOnlineReducer from './reducers/onlineReducer';
import errorsReducer, * as fromErrorsReducer from './reducers/errorsReducer';
import contextReducer, * as fromContextReducer from './reducers/contextReducer';
import journalReducer from 'containers/Journal/reducer';

export default combineReducers({
  errors: errorsReducer,
  online: onlineReducer,
  context: contextReducer,
  journal: journalReducer,
});

export function getPathToGlobalContext(state) {
  return state.getIn(['global', 'context']);
}

export const getAppOnlineState = state =>
  fromOnlineReducer.getAppOnlineState(state.getIn(['global', 'online']));

export const getError = state =>
  fromErrorsReducer.getError(state.getIn(['global', 'errors']));

export const getErrorType = state =>
  fromErrorsReducer.getErrorType(state.getIn(['global', 'errors']));

export const getVehicleFilterString = state =>
  fromContextReducer.getVehicleFilterString(getPathToGlobalContext(state));
