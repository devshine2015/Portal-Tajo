import { combineReducers } from 'redux-immutable';
import onlineReducer, * as fromOnlineReducer from './reducers/onlineReducer';
import errorsReducer, * as fromErrorsReducer from './reducers/errorsReducer';
import contextReducer from './reducers/contextReducer';
import journalReducer from 'containers/Journal/reducer';

export default combineReducers({
  errors: errorsReducer,
  online: onlineReducer,
  context: contextReducer,
  journal: journalReducer,
});

export const getAppOnlineState = state =>
  fromOnlineReducer.getAppOnlineState(state.getIn(['global', 'online']));

export const getErrorMessage = state =>
  fromErrorsReducer.getErrorMessage(state.getIn(['global', 'errors']));
