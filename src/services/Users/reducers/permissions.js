import { fromJS } from 'immutable';
import { permissionsActions } from '../actions';

const initialState = fromJS({
  list: [],
  isLoading: false,
});

function permissionsReducer(state = initialState, action) {
  switch (action.type) {
    case permissionsActions.PERMISSIONS_CREATE:
      return state.update('list', list => list.push(fromJS(action.permission)));

    case permissionsActions.PERMISSIONS_DELETE:
      return state.update('list', list => list.remove(action.index));

    default:
      return state;
  }
}

export default permissionsReducer;

export const getPermissions = state =>
  state.get('list');
