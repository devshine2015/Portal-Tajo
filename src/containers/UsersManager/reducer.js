import { fromJS, List } from 'immutable';
import {
  USERS_MANAGER_USERS_SET,
} from './actions';

const initialState = fromJS({
  users: new List(),
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case USERS_MANAGER_USERS_SET:
      return state.set('users', new List(action.users));
    default:
      return state;
  }
}

export default reducer;

export const getUsers = state =>
  state.getIn(['usersManager', 'users']);
