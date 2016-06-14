import { fromJS } from 'immutable';
import {
  GLOBAL_SET_FLEET,
  GLOBAL_SET_USER_AUTHENTICATION,
  GLOBAL_CHANGE_ONLINE_STATE,
} from './actions';

const initialState = fromJS({
  user: {
    isAuthenticated: false,
  },
  fleet: null,
  isOnline: navigator.onLine,
});

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GLOBAL_SET_FLEET: {
      return state.set('fleet', action.fleet);
    }
    case GLOBAL_SET_USER_AUTHENTICATION: {
      return state.setIn(['user', 'isAuthenticated'], action.isAuthenticated);
    }
    case GLOBAL_CHANGE_ONLINE_STATE: {
      const nextState = state.set('isOnline', action.onLine);

      return nextState;
    }
    default:
      return state;
  }
}
