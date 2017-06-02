import { fromJS } from 'immutable';
import { driversActions } from '../actions';

const driversInitialState = fromJS({
  processedList: {},
});

function driversReducer(state = driversInitialState, action) {
  switch (action.type) {
    case driversActions.FLEET_MODEL_DRIVERS_SET:
      return state.set('processedList', fromJS(action.drivers));
    default:
      return state;
  }
}

export default driversReducer;

export const getDrivers = (state) => {
  const theObj = imGetDrivers(state);

  if (theObj.size === 0) {
    return [];
  }

  const jsObj = theObj.toJS();
  const aList = Object.values(jsObj);

  return aList;
};

const imGetDrivers = state =>
  state.get('processedList');
