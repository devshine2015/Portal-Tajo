import { fromJS, List } from 'immutable';
import { SESSION_CLEAN } from 'services/Session/actions';
import {
  USERS_MANAGER_USERS_SET,
  USERS_MANAGER_USER_CREATED,
  USERS_MANAGER_USER_DELETED,
  USERS_MANAGER_PERMISSION_ASSIGN,
  USERS_MANAGER_PERMISSION_UNASSIGN,
  USERS_MANAGER_USER_UPDATED,
} from '../actions/usersActions';

const initialState = fromJS({
  usersList: [],
});

function findUserIndex(state, userId) {
  return state.get('usersList').findIndex(user =>
    user.get('user_id') === userId,
  );
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case SESSION_CLEAN:
      return initialState;

    case USERS_MANAGER_USERS_SET:
      return state.set('usersList', fromJS(action.users));

    case USERS_MANAGER_USER_CREATED:
      return state.update('usersList', list =>
        list.push(fromJS(action.user)));

    case USERS_MANAGER_USER_DELETED: {
      const index = findUserIndex(state, action.id);

      return state.update('usersList', list => list.delete(index));
    }

    case USERS_MANAGER_USER_UPDATED: {
      const index = findUserIndex(state, action.id);

      return state.mergeIn(['usersList', index], fromJS(action.user));
    }

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
        perms.delete(perms.indexOf(action.permissionId)),
      );

    default:
      return state;
  }
}

export default reducer;

export const reducerKey = 'users';
