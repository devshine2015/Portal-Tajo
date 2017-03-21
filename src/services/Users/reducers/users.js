import { fromJS, List } from 'immutable';
import {
  USERS_MANAGER_USERS_SET,
  USERS_MANAGER_NEW_USER_ADD,
  USERS_MANAGER_PERMISSION_ASSIGN,
  USERS_MANAGER_PERMISSION_UNASSIGN,
} from '../actions/usersActions';

const initialState = fromJS({
  usersList: new List(),
  isLoading: false,
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case USERS_MANAGER_USERS_SET:
      return state.set('usersList', fromJS(action.users));

    case USERS_MANAGER_NEW_USER_ADD:
      return state;

    case USERS_MANAGER_PERMISSION_ASSIGN: {
      const nextState = state.updateIn(['usersList', action.index], user => {
        let nextUser = user;

        if (!user.has('permissions')) {
          nextUser = user.set('permissions', new List());
        }

        return nextUser.update('permissions', perms => perms.push(action.permissionId));
      });

      return nextState;
    }
    case USERS_MANAGER_PERMISSION_UNASSIGN:
      return state.updateIn(['usersList', action.index, 'permissions'], perms =>
        perms.delete(perms.indexOf(action.permissionId))
      );

    default:
      return state;
  }
}

export default reducer;

export const getUsers = state =>
  state.get('usersList');
export const getGroupBy = state =>
  state.get('groupBy');
export const getGrouping = state =>
  state.get('grouped');

export const getIsLoading = state =>
  state.get('isLoading');
