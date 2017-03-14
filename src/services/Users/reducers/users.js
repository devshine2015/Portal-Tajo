import { fromJS, Map, List } from 'immutable';
import {
  USERS_MANAGER_USERS_SET,
  USERS_MANAGER_GROUPBY_CHANGE,
  USERS_MANAGER_NEW_USER_TOGGLE,
  USERS_MANAGER_NEW_USER_ADD,
} from '../actions/usersActions';

const initialState = fromJS({
  users: new List(),
  grouped: new Map(),
  groupBy: 'fleet',
  isAddingNewUser: false,
  isLoading: false,
});

function reducer(state = initialState, action) {
  switch (action.type) {
    // initial settings:
    // group by fleet name by default
    // set users as is
    case USERS_MANAGER_USERS_SET:
      return state.withMutations(s => {
        s.set('users', new List(action.users))
         .set('grouped', new Map(action.grouped));
      });
    case USERS_MANAGER_GROUPBY_CHANGE:
      return state.withMutations(s => {
        s.set('groupBy', action.groupBy)
         .set('grouped', new Map(action.grouped));
      });
    case USERS_MANAGER_NEW_USER_TOGGLE:
      return state.withMutations(s => {
        s.set('isAddingNewUser', action.nextState)
         .set('isLoading', action.isLoading);
      });
    case USERS_MANAGER_NEW_USER_ADD:
      return state.withMutations(s => {
        s.set('grouped', new Map(action.grouped))
         .set('isLoading', action.isLoading)
         .set('users', new List(action.users));
      });
    default:
      return state;
  }
}

export default reducer;

export const getUsers = state =>
  state.get('users');
export const getGroupBy = state =>
  state.get('groupBy');
export const getGrouping = state =>
  state.get('grouped');

export const getIsAddingNewUser = state =>
  state.get('isAddingNewUser');

export const getIsLoading = state =>
  state.get('isLoading');
