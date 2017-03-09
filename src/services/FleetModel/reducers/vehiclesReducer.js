import { List, Map, fromJS } from 'immutable';
import * as vehiclesActions from '../actions/vehiclesActions';
import * as socketActions from '../actions/socketActions';

const vehiclesInitialState = fromJS({
  processedList: {},
  orderedList: [],
  deadList: [],
  delayedList: [],
  // keep gloabl selelcted vehicle - to be persistent wneh switching screens/lists
  // TODO: move it to separate reducer (userContext?), with mapView params, etc
  selectedVehicleId: '',
});

function vehiclesReducer(state = vehiclesInitialState, action) {
  switch (action.type) {
    case vehiclesActions.FLEET_MODEL_VEHICLES_SET:
      return state.withMutations(s => {
        s.set('processedList', new Map(action.localVehicles))
         .set('deadList', new List(action.deadList))
         .set('delayedList', new List(action.delayedList))
         .set('orderedList', new List(action.orderedVehicles));
      });

    case vehiclesActions.FLEET_MODEL_VEHICLE_ADD:
      return state.withMutations(s => {
        s.setIn(['processedList', action.id], action.localVehicle)
         .set('orderedList', new List(action.orderedList));
      });

    case vehiclesActions.FLEET_MODEL_ORDER_UPDATE:
      return state.set('orderedList', new List(action.orderedList));

    case vehiclesActions.FLEET_MODEL_VEHICLE_UPDATE:
      return state.mergeIn(['processedList', action.id], action.details);

    case vehiclesActions.FLEET_MODEL_VEHICLES_UPDATE_LIST:
      return state.set('processedList', action.vehicles);

    case vehiclesActions.FLEET_MODEL_VEHICLES_FILTER:
      return state.set('processedList', new Map(action.vehicles));

    case vehiclesActions.FLEET_MODEL_VEHICLE_SELECT:
      return state.set('selectedVehicleId', action.id);

    case socketActions.FLEET_MODEL_SOCKET_SET_BATCH: {
      return state.withMutations(s => {
        s.mergeIn(['processedList'], action.updates)
         .set('deadList', action.deadList)
         .set('delayedList', action.delayedList);
      });
    }

    case vehiclesActions.FLEET_MODEL_DETACH_DEVICE:
      return state.deleteIn(['processedList', action.id, 'original', 'deviceId']);

    case vehiclesActions.FLEET_MODEL_ATTACH_DEVICE:
      return state.setIn(['processedList', action.id, 'original', 'deviceId'], action.deviceId);

    // remove all references to the vehicle
    case vehiclesActions.FLEET_MODEL_VEHICLE_DISABLE: {
      const orderedListIndex = state.get('orderedList').indexOf(action.id);
      const deadListIndex = state.get('deadList').indexOf(action.id);
      const delayedListIndex = state.get('delayedList').indexOf(action.id);

      return state.withMutations(s => {
        s.deleteIn(['processedList', action.id])
         .deleteIn(['orderedList', orderedListIndex])
         .deleteIn(['deadList', deadListIndex])
         .deleteIn(['delayedList', delayedListIndex])
         .set('selectedVehicleId', '');
      });
    }

    default:
      return state;
  }
}

function getSizeSafe(aList) {
  if (aList === undefined) {
    return 0;
  }
  return aList.size;
}

function getValuesSafe(aList) {
  if (aList === undefined) {
    return new List([]);
  }
  return aList;
}

export default vehiclesReducer;

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
  const theObj = getProcessedVehicles(state);
  const orderedList = state.get('orderedList');

  return orderedList.map(id => theObj.get(id)).toJS();
};
export const getProcessedVehicles = (state) =>
  state.get('processedList');
export const getSelectedVehicleId = (state) =>
  state.get('selectedVehicleId');
export const getVehiclesAmount = state =>
  getSizeSafe(state.get('processedList'));

export const hasProcessedVehicles = state =>
  getSizeSafe(state.get('processedList')) > 0;

export const getDeadList = state =>
  getValuesSafe(state.get('deadList'));

export const getDeadAmount = state =>
  getSizeSafe(state.get('deadList'));

export const getDelayedList = state =>
  getValuesSafe(state.get('delayedList'));

export const getDelayedAmount = state =>
  getSizeSafe(state.get('delayedList'));

export const getAmounts = state => ({
  deadAmount: getDeadAmount(state),
  delayedAmount: getDelayedAmount(state),
  vehiclesAmount: getVehiclesAmount(state),
});
