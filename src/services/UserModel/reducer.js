import { fromJS } from 'immutable';
import {
  USER_SET,
  USER_RESET,
} from './actions';

const initialState = fromJS({
  role: undefined,
  username: undefined,
});

function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_SET:
      return fromJS({ ...action.data });
    case USER_RESET:
      return initialState;
    default:
      return state;
  }
}

export default userReducer;

export const getUserData = state =>
  state.get('user');
