import { List, fromJS } from 'immutable';
import {
  vehiclesActions,
//  webSocketActions,
} from '../actions';

const vehiclesInitialState = fromJS({
  list: new List(),
  processedList: {},
});

function vehiclesReducer(state = vehiclesInitialState, action) {
  switch (action.type) {
    case vehiclesActions.FLEET_MODEL_VEHICLES_SET:
      return state.set('list', new List(action.vehicles))
              .set('processedList', fromJS(action.localVehicles));
    case vehiclesActions.FLEET_MODEL_VEHICLE_UPDATE:
      return state.setIn(['list', action.index], action.details);
    case 'asdf': {  // webSocketActions.FLEET_MODEL_SOCKET_SET: {
      const inStatus = action.statusObj;
      return state.setIn(['processedList', inStatus.id, 'pos'],
                      [inStatus.pos.latlon.lat, inStatus.pos.latlon.lng]);
//      return state.setIn(['processedList', inStatus.id, 'name'], 'isUpdated');
    }
    default:
      return state;
  }
}

export default vehiclesReducer;

export const getVehicles = (state) =>
  state.get('list');

export const getVehiclesEx = (state) => {
  const theObj = state.get('processedList');
  if (theObj.size === 0) {
    return [];
  }
  const jsObj = theObj.toJS();
  const aList = Object.values(jsObj);
  return aList;
};
export const getVehicleByIdFunc = (state) => {
  return function (id) {
    const theObj = state.get('processedList');
    if (theObj.size === 0) {
      return null;
    }
    const jsObj = theObj.get(id).toJS();
    return jsObj;
  };
};

// export const getVehiclesEx = (state) =>
//     Object.values(state.get('processedList'));
