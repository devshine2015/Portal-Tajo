import { fromJS } from 'immutable';
import { authActions } from '../actions';

const initialState = fromJS({
  isAuthenticated: false,
  sessionId: undefined,
});

function authReducer(state = initialState, action) {
  switch (action.type) {
    case authActions.GLOBAL_AUTH_SET:
      return state.set('isAuthenticated', true)
        .set('sessionId', action.sessionId);
    case authActions.GLOBAL_AUTH_RESET:
      return initialState;
    default:
      return state;
  }
}

export default authReducer;

export const getIsAuthenticated = (state) =>
  state.get('isAuthenticated');
export const getAuthenticationData = (state) => state;
export const getAuthenticationSession = (state) =>
  state.get('sessionId');
