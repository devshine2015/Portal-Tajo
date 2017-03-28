import { fromJS, List } from 'immutable';
import {
  PERMISSIONS_FETCH_SUCCESS,
  PERMISSION_CREATE,
  PERMISSION_DELETE,
} from '../actions/permissionsActions';

const initialState = fromJS({
  list: undefined,
  map: undefined,
  isLoading: false,
});

function permissionsReducer(state = initialState, action) {
  switch (action.type) {
    case PERMISSIONS_FETCH_SUCCESS:
      return state.withMutations(s => {
        s.set('list', fromJS(action.permsList))
         .set('map', fromJS(action.permsMap));
      });

    case PERMISSION_CREATE:
      return state.update('list', list => {
        let nextList = list;

        if (list === undefined) {
          nextList = new List();
        }

        return nextList.push(fromJS(action.permission));
      });

    case PERMISSION_DELETE:
      return state.update('list', list => list.remove(action.index));

    default:
      return state;
  }
}

export default permissionsReducer;

export const getPermissions = state =>
  state.get('map');
export const getPermissionsList = state =>
  state.get('list');
