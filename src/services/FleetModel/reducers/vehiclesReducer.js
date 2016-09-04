import { List, Map, fromJS } from 'immutable';
import * as vehiclesActions from '../actions/vehiclesActions';
import * as socketActions from '../actions/socketActions';
import { CHRONICLE_ITEM_NEW_FRAME,
      CHRONICLE_ITEM_SET_STATE,
      CHRONICLE_VALIDATE_TIMEFRAME,
      CHRONICLE_LOCAL_INCTANCE_STATE_NONE } from 'containers/Chronicle/actions';
import { checkZombieVehicle } from '../utils/vehicleHelpers';

const vehiclesInitialState = fromJS({
  list: new List(),
  processedList: new Map(),
  orderedList: new List(),
});

function vehiclesReducer(state = vehiclesInitialState, action) {
  switch (action.type) {
    case vehiclesActions.FLEET_MODEL_VEHICLES_SET:
      return state.set('list', new List(action.vehicles))
              .set('processedList', fromJS(action.localVehicles))
              .set('orderedList', new List(action.orderedVehicles));

    case vehiclesActions.FLEET_MODEL_VEHICLE_UPDATE:
      return state.mergeIn(['processedList', action.id], action.details);

    case vehiclesActions.FLEET_MODEL_VEHICLES_FILTER:
      return state.set('processedList', fromJS(action.vehicles));

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
    // TODO: the history - maybe have separate reducer for this
    case CHRONICLE_ITEM_NEW_FRAME: {
      return state.setIn(['processedList', action.vehicleId, 'chronicleFrame'],
        action.chronicleFrame);
    }
    // TODO: move to state inside chronicleFrame (or separate reducer)
    case CHRONICLE_ITEM_SET_STATE: {
      return state.setIn(['processedList', action.vehicleId, 'chronicleState'],
        action.chronicleState);
    }
    // TODO: quick and dirty - just reset all
    case CHRONICLE_VALIDATE_TIMEFRAME: {
      let newState = state;
      const vehicles = newState.get('processedList');
      vehicles.forEach((aValue, aKey) => {
        newState = newState.setIn(['processedList', aKey, 'chronicleState'],
            CHRONICLE_LOCAL_INCTANCE_STATE_NONE);
        return true;
      });
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
  const theObj = getProcessedVehicles(state);

  if (theObj.size === 0) {
    return [];
  }

  const jsObj = theObj.toJS();
  const aList = Object.values(jsObj);

  return aList;
};
export const getVehiclesExSorted = (state) => {
  const theObj = getProcessedVehicles(state).toJS();
  const orderedList = state.get('orderedList');

  return orderedList.map(id => theObj[id]).toJS();
};
export const getProcessedVehicles = (state) =>
  state.get('processedList');
