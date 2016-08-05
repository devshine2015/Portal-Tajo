import { List, fromJS } from 'immutable';
import * as vehiclesActions from '../actions/vehiclesActions';
import * as socketActions from '../actions/socketActions';

const vehiclesInitialState = fromJS({
  list: new List(),
  processedList: {},
});

function vehiclesReducer(state = vehiclesInitialState, action) {
  switch (action.type) {
    case vehiclesActions.FLEET_MODEL_VEHICLES_SET: {
      const immtbl = fromJS(action.localVehicles);
      const sorted = immtbl.sort((a, b) => {
        const nameA = a.toJS().name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.toJS().name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      return state.set('list', new List(action.vehicles))
              .set('processedList', sorted);}
    case vehiclesActions.FLEET_MODEL_VEHICLE_UPDATE:
      return state.setIn(['list', action.index], action.details);
    case socketActions.FLEET_MODEL_SOCKET_SET: {
      const inStatus = action.statusObj;
      let newState = state;
      if (inStatus.temp !== undefined) {
        newState = newState.setIn(['processedList', inStatus.id, 'temp'],
          inStatus.temp.temperature);
      }
      if (inStatus.dist !== undefined) {
        newState = newState.setIn(['processedList', inStatus.id, 'dist', 'total'],
          inStatus.dist.total);
        newState = newState.setIn(['processedList', inStatus.id, 'dist', 'lastTrip'],
          inStatus.dist.lastTrip);
      }
      return newState.setIn(['processedList', inStatus.id, 'pos'],
                      [inStatus.pos.latlon.lat, inStatus.pos.latlon.lng])
                  .setIn(['processedList', inStatus.id, 'speed'],
                                  inStatus.pos.speed);
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
  // return aList.sort((a, b) => {
  //   const nameA = a.name.toUpperCase(); // ignore upper and lowercase
  //   const nameB = b.name.toUpperCase(); // ignore upper and lowercase
  //   if (nameA < nameB) {
  //     return -1;
  //   }
  //   if (nameA > nameB) {
  //     return 1;
  //   }
  //   return 0;
  // });
  return aList;
};
export const getVehicleByIdFunc = (state) => (id) => {
  const theObj = state.get('processedList');
  if (theObj.size === 0) {
    return null;
  }
  const jsObj = theObj.get(id);
  if (jsObj === undefined) {
    return null;
  }
  return jsObj.toJS();
};

// export const getVehiclesEx = (state) =>
//     Object.values(state.get('processedList'));
