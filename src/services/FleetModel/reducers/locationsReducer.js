import { List, fromJS } from 'immutable';
import {
  locationsActions,
} from '../actions';

const locationsInitialState = fromJS({
  list: new List(),
});

function locationsReducer(state = locationsInitialState, action) {
  switch (action.type) {
    case locationsActions.FLEET_MODEL_LOCATIONS_SET:
      return state.set('list', new List(action.locations));
    default:
      return state;
  }
}

export default locationsReducer;

export const getLocations = (state) =>
  state.get('list');
