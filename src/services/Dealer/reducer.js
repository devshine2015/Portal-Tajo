import { fromJS/* , List */ } from 'immutable';
import { SESSION_CLEAN } from 'services/Session/actions';
import {
  DEALER_PORTAL_READY,
  DEALER_PORTAL_FLEET_READY_STATE_SET,
} from './actions';

const initialState = fromJS({
  isReady: false,
  fleetReadyState: 'not ready',
  subfleets: [],
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case SESSION_CLEAN:
      return initialState;

    case DEALER_PORTAL_READY:
      return state.withMutations((st) => {
        st.set('isReady', action.isReady)
          .set('subfleets', action.fleets);
      });

    case DEALER_PORTAL_FLEET_READY_STATE_SET:
      return state.set('fleetReadyState', action.readyState);

    default:
      return state;
  }
}

export default reducer;

export const reducerKey = 'Dealer';
