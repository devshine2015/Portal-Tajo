import { fromJS } from 'immutable';
import { authActions } from '../actions';

const initialState = fromJS({
  isAuthenticated: false,
});

function authReducer(state = initialState, action) {
  switch (action.type) {
    case authActions.GLOBAL_AUTH_SET:
      return state.set('isAuthenticated', action.isAuthenticated);
    default:
      return state;
  }
}

export default authReducer;

export const getIsAuthenticated = (state) =>
  state.get('isAuthenticated');
