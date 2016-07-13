import { List, fromJS } from 'immutable';
import {
  vehiclesActions,
} from '../actions';

const vehiclesInitialState = fromJS({
  list: new List(),
});

function vehiclesReducer(state = vehiclesInitialState, action) {
  switch (action.type) {
    case vehiclesActions.FLEET_MODEL_VEHICLES_SET:
      return state.set('list', new List(action.vehicles));
    default:
      return state;
  }
}

export default vehiclesReducer;

export const getVehicles = (state) =>
  state.get('list');
