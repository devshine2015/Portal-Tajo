import { fromJS, Map, List } from 'immutable';
import {
  USERS_MANAGER_USERS_SET,
  USERS_MANAGER_GROUPBY_CHANGE,
  USERS_MANAGER_NEW_USER_TOGGLE,
  USERS_MANAGER_NEW_USER_ADD,
  USERS_MANAGER_PERMISSION_ASSIGN,
  USERS_MANAGER_PERMISSION_UNASSIGN,
} from '../actions/usersActions';

const initialState = fromJS({
  users: new List(),
  grouped: new Map(),
  groupBy: 'fleet',
  isLoading: false,
});

function reducer(state = initialState, action) {
  switch (action.type) {
    // initial settings:
    // group by fleet name by default
    // set users as is
    case USERS_MANAGER_USERS_SET:
      return state.withMutations(s => {
        s.set('users', fromJS(action.users))
         .set('grouped', new Map(action.grouped));
      });
    case USERS_MANAGER_GROUPBY_CHANGE:
      return state.withMutations(s => {
        s.set('groupBy', action.groupBy)
         .set('grouped', new Map(action.grouped));
      });
    case USERS_MANAGER_NEW_USER_TOGGLE:
      return state.set('isLoading', action.isLoading);

    case USERS_MANAGER_NEW_USER_ADD:
      return state.withMutations(s => {
        s.set('grouped', new Map(action.grouped))
         .set('isLoading', action.isLoading)
         .set('users', fromJS(action.users));
      });
    case USERS_MANAGER_PERMISSION_ASSIGN: {
      const nextState = state.updateIn(['users', action.index], user => {
        let nextUser = user;

        if (!user.has('permissions')) {
          nextUser = user.set('permissions', new List());
        }

        return nextUser.update('permissions', perms => perms.push(action.permissionId));
      });

      return nextState;
    }
    case USERS_MANAGER_PERMISSION_UNASSIGN:
      return state.updateIn(['users', action.index, 'permissions'], perms =>
        perms.delete(perms.indexOf(action.permissionId))
      );

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

export const getIsLoading = state =>
  state.get('isLoading');
