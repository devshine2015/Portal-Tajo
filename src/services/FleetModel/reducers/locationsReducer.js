import { List, fromJS } from 'immutable';
import {
  locationsActions,
} from '../actions';

const locationsInitialState = fromJS({
  list: new List(),
  processedList: {},
});

function locationsReducer(state = locationsInitialState, action) {
  switch (action.type) {
    case locationsActions.FLEET_MODEL_LOCATIONS_SET:
      return state.set('list', new List(action.locations))
          .set('processedList', fromJS(action.localLocs));
    default:
      return state;
  }
}

export default locationsReducer;

export const getLocations = (state) =>
  state.get('list');

export const getLocationsEx = (state) => {
  const theObj = state.get('processedList');
  if (theObj.size === 0) {
    return [];
  }
  const jsObj = theObj.toJS();
  const aList = Object.values(jsObj);
  return aList;
};
