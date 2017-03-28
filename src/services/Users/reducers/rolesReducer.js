import { fromJS, List } from 'immutable';
import {
  ROLES_FETCH_SUCCESS,
  ROLE_CREATE,
  ROLE_DELETE,
} from '../actions/rolesActions';

const initialState = fromJS({
  list: undefined,
  map: undefined,
  isLoading: false,
});

function reducer(state = initialState, action) {
  switch (action.type) {
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

    default:
      return state;
  }
}

export default reducer;

export const getRoles = state =>
  state.get('map');
export const getRolesList = state =>
  state.get('list');
