import { List, Map, fromJS } from 'immutable';
import {
  vehiclesActions,
} from '../actions';

const vehiclesInitialState = fromJS({
  list: new List(),
  devNumber: 23,
  devDummy: { init: 'none' },
  processedList: {},
});

function vehiclesReducer(state = vehiclesInitialState, action) {
  switch (action.type) {
    case vehiclesActions.FLEET_MODEL_VEHICLES_SET:
//      state.set('container', action.vehiclesContainer);
      // const aMap = new Map(action.localVehicles);
      // const locaDD = { asdf: 'qwert', srt01: 'zxcvbn' };
      // let aState=state.set('devDummy', locaDD);
      // aState = aState.set('devNumber', 61);
      //
      // aState = aState.set('processedList', action.localVehicles);
      // const aList = Object.values(action.localVehicles);
      // debugger;
      return state.set('list', new List(action.vehicles))
              .set('processedList', action.localVehicles);
    case vehiclesActions.FLEET_MODEL_VEHICLE_UPDATE:
      return state.setIn(['list', action.index], action.details);
    default:
      return state;
  }
}

export default vehiclesReducer;

export const getVehicles = (state) =>
  state.get('list');

export const getVehiclesEx = (state) => {
  const derList = state.get('list');
  const ddd = state.get('devDummy');
  const ddN = state.get('devNumber');
  const ddV = state.get('devNone');
  const theObj = state.get('processedList');
  if (theObj.size === 0) {
    return [];
  }
  const aList = Object.values(theObj);
  return aList;
};
// export const getVehiclesEx = (state) =>
//     Object.values(state.get('processedList'));
