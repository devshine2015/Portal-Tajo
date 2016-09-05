import { fromJS } from 'immutable';
import { commonActions } from './actions';

const initialState = fromJS({
  isAuthenticated: false,
  sessionId: undefined,
  authenticatedFleet: undefined,
});

function authReducer(state = initialState, action) {
  switch (action.type) {
    case commonActions.AUTH_SET:
      return state.set('isAuthenticated', true)
        .set('sessionId', action.sessionId)
        .set('authenticatedFleet', action.fleet);
    case commonActions.AUTH_RESET:
      return initialState;
    default:
      return state;
  }
}

export default authReducer;

export const getIsUserAuthenticated = (state) =>
  state.getIn(['auth', 'isAuthenticated']);
export const getAuthenticationData = (state) =>
  state.get('auth');
export const getAuthenticationSession = (state) =>
  state.getIn(['auth', 'sessionId']);
export const getAuthenticatedFleet = (state) =>
  state.getIn(['auth', 'authenticatedFleet']);
