import { fromJS/* , List */ } from 'immutable';
import { SESSION_CLEAN } from 'services/Session/actions';
import { DEALER_PORTAL_READY_SET } from './actions';

const initialState = fromJS({
  isReady: false,
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case SESSION_CLEAN:
      return initialState;

    case DEALER_PORTAL_READY_SET:
      return state.set('isReady', action.isReady);

    default:
      return state;
  }
}

export default reducer;

export const reducerKey = 'Dealer';
