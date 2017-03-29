import { fromJS, List } from 'immutable';
import {
  ROLES_FETCH_SUCCESS,
  ROLE_CREATE,
  ROLE_DELETE,
  ROLE_ASSIGN,
  ROLE_UNASSIGN,
} from '../actions/rolesActions';
import { SESSION_CLEAN } from 'services/Session/actions';

const initialState = fromJS({
  list: undefined,
  map: undefined,
  isLoading: false,
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case SESSION_CLEAN:
      return initialState;

    case ROLES_FETCH_SUCCESS:
      return state.withMutations(s => {
        s.set('list', fromJS(action.rolesList))
         .set('map', fromJS(action.rolesMap));
      });

    case ROLE_CREATE:
      return state.update('list', list => {
        let nextList = list;

        if (list === undefined) {
          nextList = new List();
        }

        return nextList.push(fromJS(action.role));
      });

    case ROLE_DELETE:
      return state.update('list', list => list.remove(action.index));

    case ROLE_ASSIGN:
      return state.updateIn(['map', action.roleId, 'users'], users => (
        users.push(action.userId)
      ));

    case ROLE_UNASSIGN: {
      const userIdIndex = state.getIn(['map', action.roleId, 'users']).indexOf(action.userId);

      return state.deleteIn(['map', action.roleId, 'users', userIdIndex]);
    }

    default:
      return state;
  }
}

export default reducer;

function findEntries(state, userId) {
  const roles = state.get('map').toArray();

  return roles.filter(role => {
    const users = role.get('users');
    if (users !== undefined) {
      return users.indexOf(userId) !== -1;
    }

    return false;
  });
}

export const getRoles = state =>
  state.get('map');
export const getRolesList = state =>
  state.get('list');
export const getRoleIdByUserId = (state, userId) => {
  const entries = findEntries(state, userId);

  if (entries.length !== 0) {
    return entries[0].get('_id');
  }

  return null;
};
