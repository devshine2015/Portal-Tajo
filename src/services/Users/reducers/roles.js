import { fromJS, List } from 'immutable';
import { SESSION_CLEAN } from 'services/Session/actions';
import {
  ROLES_FETCH_SUCCESS,
  ROLE_CREATE,
  ROLE_DELETE,
  ROLE_ASSIGN,
  ROLE_UNASSIGN,
} from '../actions/rolesActions';

const initialState = fromJS({
  list: [],
  map: {},
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
      let nextState;

      // remove user from each role he has been unassigned from
      action.rolesIds.forEach((roleId) => {
        nextState = state.updateIn(['map', roleId, 'users'], (usersList) => {
          return usersList.delete(usersList.indexOf(action.userId));
        });
      });

      return nextState;
    }

    default:
      return state;
  }
}

export default reducer;

export const reducerKey = 'roles';
