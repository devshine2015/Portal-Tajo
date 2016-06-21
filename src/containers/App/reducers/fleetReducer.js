import { fromJS } from 'immutable';
import { fleetActions } from '../actions';

const initialState = fromJS({
  name: null,
});

function fleetReducer(state = initialState, action) {
  switch (action.type) {
    case fleetActions.GLOBAL_FLEET_NAME_SET:
      return state.set('name', action.fleet);
    default:
      return state;
  }
}

export default fleetReducer;

export const getFleetName = (state) =>
  state.get('name');
