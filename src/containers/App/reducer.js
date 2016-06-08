import { fromJS } from 'immutable';
import {
  GLOBAL_SET_FLEET,
  GLOBAL_SET_USER_AUTHENTICATION,
} from './actions';

const initialState = fromJS({
  user: {
    isAuthenticated: false,
  },
  fleet: null,
});

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GLOBAL_SET_FLEET: {
      return state.set('fleet', action.fleet);
    }
    case GLOBAL_SET_USER_AUTHENTICATION: {
      return state.setIn(['user', 'isAuthenticated'], action.isAuthenticated);
    }
    default:
      return state;
  }
}
