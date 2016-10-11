// @deprecated -- remove after publishing new portal
import { fromJS } from 'immutable';
import { fleetNameActions } from '../actions';

const initialState = fromJS({
  fleetName: null,
});

function globalFleetReducer(state = initialState, action) {
  switch (action.type) {
    case fleetNameActions.GLOBAL_FLEET_NAME_SET:
      return state.set('fleetName', action.fleetName);
    default:
      return state;
  }
}

export default globalFleetReducer;

export const getFleetName = (state) =>
  state.get('fleetName');
