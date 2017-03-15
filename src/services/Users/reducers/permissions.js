import { fromJS, List } from 'immutable';
import { permissionsActions } from '../actions';

const initialState = fromJS({
  list: undefined,
  isLoading: false,
});

function permissionsReducer(state = initialState, action) {
  switch (action.type) {
    case permissionsActions.PERMISSIONS_FETCH_SUCCESS:
      return state.set('list', new List(action.permissions));

    case permissionsActions.PERMISSIONS_CREATE:
      return state.update('list', list => {
        let nextList = list;

        if (list === undefined) {
          nextList = new List();
        }

        return nextList.push(fromJS(action.permission));
      });

    case permissionsActions.PERMISSIONS_DELETE:
      return state.update('list', list => list.remove(action.index));

    default:
      return state;
  }
}

export default permissionsReducer;

export const getPermissions = state =>
  state.get('list');
