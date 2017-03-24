import { fromJS, List } from 'immutable';
import { rolesActions } from '../actions';

const initialState = fromJS({
  list: [{
    text: 'uber',
    id: 'uber',
  }, {
    text: 'admin',
    id: 'admin',
  }, {
    text: 'executive',
    id: 'executive',
  }],
  isLoading: false,
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case rolesActions.ROLES_FETCH_SUCCESS:
      return state.set('list', new List(action.roles));

    case rolesActions.ROLE_CREATE:
      return state.update('list', list => {
        let nextList = list;

        if (list === undefined) {
          nextList = new List();
        }

        return nextList.push(fromJS(action.role));
      });

    case rolesActions.ROLE_DELETE:
      return state.update('list', list => list.remove(action.index));

    default:
      return state;
  }
}

export default reducer;

export const getRoles = state =>
  state.get('list');
