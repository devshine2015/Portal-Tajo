import { List, Map, fromJS } from 'immutable';
import * as vehiclesActions from '../actions/vehiclesActions';
import * as socketActions from '../actions/socketActions';

const vehiclesInitialState = fromJS({
  processedList: new Map(),
  orderedList: new List(),
  deadList: new List(),
  delayedList: new List(),
  // keep gloabl selelcted vehicle - to be persistent wneh switching screens/lists
  // TODO: move it to separate reducer (userContext?), with mapView params, etc
  slectedVehicleId: '',
});

function vehiclesReducer(state = vehiclesInitialState, action) {
  switch (action.type) {
    case vehiclesActions.FLEET_MODEL_VEHICLES_SET:
      return state.withMutations(s => {
        s.set('processedList', fromJS(action.localVehicles))
         .set('deadList', new List(action.deadList))
         .set('delayedList', new List(action.delayedList))
         .set('orderedList', new List(action.orderedVehicles));
      });

    case vehiclesActions.FLEET_MODEL_VEHICLE_ADD:
      return state.withMutations(s => {
        s.setIn(['processedList', action.id], action.localVehicle)
         .set('orderedList', action.orderedList);
      });

    case vehiclesActions.FLEET_MODEL_ORDER_UPDATE:
      return state.set('orderedList', new List(action.orderedList));

    case vehiclesActions.FLEET_MODEL_VEHICLE_UPDATE:
      return state.mergeIn(['processedList', action.id], action.details);

    case vehiclesActions.FLEET_MODEL_VEHICLES_UPDATE_LIST:
      return state.mergeIn(['processedList'], action.vehicles);

    case vehiclesActions.FLEET_MODEL_VEHICLES_FILTER:
      return state.set('processedList', fromJS(action.vehicles));

    case vehiclesActions.FLEET_MODEL_VEHICLE_SELECT:
      return state.set('slectedVehicleId', action.id);

    case socketActions.FLEET_MODEL_SOCKET_SET_BATCH: {
      return state.withMutations(s => {
        s.mergeIn(['processedList'], action.updates)
         .set('deadList', action.deadList)
         .set('delayedList', action.delayedList);
      });
    }

    case vehiclesActions.FLEET_MODEL_DETACH_DEVICE:
      return state.deleteIn(['processedList', action.id, 'deviceId']);

    case vehiclesActions.FLEET_MODEL_ATTACH_DEVICE:
      return state.setIn(['processedList', action.id, 'deviceId'], action.deviceId);

    default:
      return state;
  }
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
  state.get('slectedVehicleId');
export const getVehiclesAmount = state =>
  state.get('processedList').size;

export const hasProcessedVehicles = state =>
  state.get('processedList').size > 0;

export const getDeadList = state =>
  state.get('deadList');

export const getDeadAmount = state =>
  state.get('deadList').size;

export const getDelayedList = state =>
  state.get('delayedList');

export const getDelayedAmount = state =>
  state.get('delayedList').size;

export const getAmounts = state => ({
  deadAmount: getDeadAmount(state),
  delayedAmount: getDelayedAmount(state),
  vehiclesAmount: getVehiclesAmount(state),
});
