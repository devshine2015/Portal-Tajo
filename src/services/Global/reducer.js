import { fromJS } from 'immutable';
import {
  fleetNameActions,
  onlineActions,
} from './actions';

const initialState = fromJS({
  fleetName: null,
  isOnline: window.navigator.onLine,
});

function globalReducer(state = initialState, action) {
  switch (action.type) {
    case fleetNameActions.GLOBAL_FLEET_NAME_SET:
      return state.set('fleetName', action.fleetName);
    case onlineActions.GLOBAL_ONLINE_STATE_CHANGE:
      return state.set('isOnline', action.onLine);
    default:
      return state;
  }
}

export default globalReducer;

export const getFleetName = (state) =>
  state.getIn(['global', 'fleetName']);
export const getAppOnlineState = (state) =>
  state.getIn(['global', 'isOnline']);
