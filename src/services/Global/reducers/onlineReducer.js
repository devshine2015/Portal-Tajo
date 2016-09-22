import { fromJS } from 'immutable';
import { onlineActions } from '../actions';

const initialState = fromJS({
  isOnline: window.navigator.onLine,
});

function onlineReducer(state = initialState, action) {
  switch (action.type) {
    case onlineActions.GLOBAL_ONLINE_STATE_CHANGE:
      return state.set('isOnline', action.onLine);
    default:
      return state;
  }
}

export default onlineReducer;

export const getAppOnlineState = state =>
  state.get('isOnline');
