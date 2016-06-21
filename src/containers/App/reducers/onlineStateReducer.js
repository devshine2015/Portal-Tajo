import { fromJS } from 'immutable';
import { onlineStateActions } from '../actions';

const initialState = fromJS({
  isOnline: navigator.onLine,
});

function onlineStateReducer(state = initialState, action) {
  switch (action.type) {
    case onlineStateActions.GLOBAL_ONLINE_STATE_CHANGE:
      return state.set('isOnline', action.onLine);
    default:
      return state;
  }
}

export default onlineStateReducer;

export const getOnlineStatus = (state) =>
  state.get('isOnline');
