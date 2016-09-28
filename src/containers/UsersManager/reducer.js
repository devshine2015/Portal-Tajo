import { fromJS, Map, List } from 'immutable';
import {
  USERS_MANAGER_USERS_SET,
  USERS_MANAGER_GROUPBY_UPDATE,
} from './actions';

const initialState = fromJS({
  users: new List(),
  grouped: new Map(),
  groupBy: 'fleet',
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case USERS_MANAGER_USERS_SET:
      return state.withMutations(s => {
        s.set('users', new List(action.users))
         .set('grouped', new Map(action.grouped));
      });
    case USERS_MANAGER_GROUPBY_UPDATE:
      return state.withMutations(s => {
        s.set('groupBy', action.groupBy)
         .set('grouped', new Map(action.grouped));
      });
    default:
      return state;
  }
}

export default reducer;

export const getUsers = state =>
  state.getIn(['usersManager', 'users']);
export const getGroupBy = state =>
  state.getIn(['usersManager', 'groupBy']);
export const getGrouping = state =>
  state.getIn(['usersManager', 'grouped']);
