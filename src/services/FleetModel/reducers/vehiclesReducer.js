import { List, Map, fromJS } from 'immutable';
import * as vehiclesActions from '../actions/vehiclesActions';
import * as socketActions from '../actions/socketActions';
// import { filterByName } from '../utils/filtering';
import { checkZombieVehicle } from '../utils/vehicleHelpers';

const vehiclesInitialState = fromJS({
  list: new List(),
  processedList: new Map(),
});

function vehiclesReducer(state = vehiclesInitialState, action) {
  switch (action.type) {
    case vehiclesActions.FLEET_MODEL_VEHICLES_SET: {
      return state.set('list', new List(action.vehicles))
              .set('processedList', fromJS(action.localVehicles));}
    case vehiclesActions.FLEET_MODEL_VEHICLE_UPDATE:
      return state.setIn(['list', action.index], action.details);
    case vehiclesActions.FLEET_MODEL_VEHICLES_FILTER:
      return state.set('processedList', new Map(action.vehicles));
    case socketActions.FLEET_MODEL_SOCKET_SET: {
      const inStatus = action.statusObj;
      let newState = state;
//      const tsDate = new Date(inStatus.ts);
      const sinceEpoch = (new Date(inStatus.ts)).getTime();
      const isZombie = checkZombieVehicle(sinceEpoch);
      newState = newState.setIn(['processedList', inStatus.id, 'lastUpdateSinceEpoch'], sinceEpoch);
      newState = newState.setIn(['processedList', inStatus.id, 'isZombie'], isZombie);
      newState = newState.setIn(['processedList', inStatus.id, 'isDead'], false);
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
      if (inStatus.pos !== undefined) {
        newState = newState.setIn(['processedList', inStatus.id, 'pos'],
              [inStatus.pos.latlon.lat, inStatus.pos.latlon.lng])
          .setIn(['processedList', inStatus.id, 'speed'],
                          inStatus.pos.speed);
      }

      return newState;
    }
    default:
      return state;
  }
}

export default vehiclesReducer;

export const getVehicles = (state) =>
  state.get('list');
export const getVehiclesById = (state, ids = []) =>
 state.get('list').filter(v => ids.indexOf(v.id) !== -1);

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
export const getProcessedVehicles = (state) =>
  state.get('processedList');
