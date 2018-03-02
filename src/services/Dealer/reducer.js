import { fromJS } from 'immutable';
import { SESSION_CLEAN } from 'services/Session/actions';
import {
  DEALER_PORTAL_READY,
  DEALER_PORTAL_FLEET_READY_STATE_SET,
  DEALER_PORTAL_SELECT_FLEET,
  DEALER_PORTAL_SELECT_TIME_RANGE,
} from './actions';

const initialState = fromJS({
  isReady: false,
  fleetReadyState: 'not ready',
  subfleets: [],
  selectedFleet: '',
  selectedTimeRange: {},
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case SESSION_CLEAN:
      return initialState;

    case DEALER_PORTAL_READY:
      return state.withMutations((st) => {
        st.set('isReady', action.isReady)
          .set('subfleets', action.fleets)
          .set('selectedFleet', action.selectedFleet);
      });

    case DEALER_PORTAL_SELECT_FLEET:
      return state.set('selectedFleet', action.selectedFleet);

    case DEALER_PORTAL_FLEET_READY_STATE_SET:
      return state.set('fleetReadyState', action.readyState);
    case DEALER_PORTAL_SELECT_TIME_RANGE:
      return state.set('selectedTimeRange', action.selectedTimeRange);
    default:
      return state;
  }
}

export default reducer;

export const reducerKey = 'Dealer';
