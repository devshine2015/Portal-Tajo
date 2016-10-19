import { fromJS } from 'immutable';
import { commonActions, loginActions } from './actions';

const initialState = fromJS({
  isAuthenticated: false,
  sessionId: undefined,
});

function authReducer(state = initialState, action) {
  switch (action.type) {
    case commonActions.AUTH_SET:
    case loginActions.LOGIN_SUCCESS:
      return state.withMutations(s => {
        s.set('isAuthenticated', true)
         .set('sessionId', action.sessionId);
      });

    case commonActions.AUTH_RESET:
      return initialState;

    default:
      return state;
  }
}

export default authReducer;

export const getIsUserAuthenticated = state =>
  state.getIn(['auth', 'isAuthenticated']);
export const getAuthenticationData = state =>
  state.get('auth');
export const getAuthenticationSession = state =>
  state.getIn(['auth', 'sessionId']);
