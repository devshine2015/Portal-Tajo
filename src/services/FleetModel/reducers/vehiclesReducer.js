import { combineReducers } from 'redux-immutable';
import { List, Map, fromJS } from 'immutable';
import * as vehiclesActions from '../actions/vehiclesActions';
import * as socketActions from '../actions/socketActions';
//

const vehiclesInitialState = fromJS({
  processedList: {},
  orderedList: [],
  deadList: [],
  delayedList: [],
});

function vehiclesReducer(state = vehiclesInitialState, action) { // !
  switch (action.type) {
    case vehiclesActions.FLEET_MODEL_VEHICLES_SET:
      return state.withMutations((st) => {
        st.set('processedList', new Map(action.localVehicles))
          .set('deadList', new List(action.deadList))
          .set('delayedList', new List(action.delayedList))
          .set('orderedList', new List(action.orderedVehicles));
      });

    case vehiclesActions.FLEET_MODEL_VEHICLE_ADD:
      return state.withMutations((st) => {
        st.setIn(['processedList', action.id], action.localVehicle)
          .set('orderedList', new List(action.orderedList));
      });

    case vehiclesActions.FLEET_MODEL_ORDER_UPDATE:
      return state.set('orderedList', new List(action.orderedList));

    case vehiclesActions.FLEET_MODEL_VEHICLE_UPDATE:
      return state.mergeIn(['processedList', action.id], action.details);
    case vehiclesActions.FLEET_MODEL_VEHICLE_BATCH_UPDATE:
      return state.mergeIn(['processedList'], action.updates);
    case vehiclesActions.FLEET_MODEL_VEHICLES_UPDATE_LIST:
      return state.set('processedList', action.vehicles);

    case vehiclesActions.FLEET_MODEL_VEHICLES_FILTER:
      return state.set('processedList', new Map(action.vehicles));

    case socketActions.FLEET_MODEL_SOCKET_SET_BATCH: {
      return state.withMutations((st) => {
        st.mergeIn(['processedList'], action.updates)
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

      return state.withMutations((st) => {
        st.deleteIn(['processedList', action.id])
          .deleteIn(['orderedList', orderedListIndex])
          .deleteIn(['deadList', deadListIndex])
          .deleteIn(['delayedList', delayedListIndex]);
      });
    }
    case vehiclesActions.VEHICLE_SERVICE_HISTORY_ADD:
      return state;
      // return state.setIn(
      //   ['processedList', action.vehicleId, 'serviceHistory'],
      //   action.odometer.odometer,
      // );
    case vehiclesActions.VEHICLE_SERVICE_HISTORY_SET:
      return state.setIn(
        ['processedList', action.vehicleId, 'serviceHistory'],
        action.serviceHistory,
      );
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

const staticInitialState = fromJS({
  // fleet data is very important for other services/components -
  // they are literally cannot work without it.
  // we need to track loading process of it to be sure
  // all we need are ready for using.
  isReady: false,
  // keep gloabl selelcted vehicle - to be persistent wneh switching screens/lists
  // TODO: move it to separate reducer (userContext?), with mapView params, etc
  selectedVehicleId: '',
});

function staticReducer(state = staticInitialState, action) {
  switch (action.type) {
    case vehiclesActions.FLEET_MODEL_READY_SET:
      return state.set('isReady', action.isReady);

    case vehiclesActions.FLEET_MODEL_VEHICLES_SET:
      return state.set('isReady', true);

    case vehiclesActions.FLEET_MODEL_VEHICLE_SELECT:
      return state.set('selectedVehicleId', action.id);

    case vehiclesActions.FLEET_MODEL_VEHICLE_DISABLE:
      return state.set('selectedVehicleId', '');

    default:
      return state;
  }
}

export default combineReducers({
  // isolate dynamic, frequently changed data
  // into dynamic reducer. With that we can eleminate
  // unnecessaty updates of UI.
  dynamic: vehiclesReducer,
  // keep other, more "static" data here. For example:
  // - fleet loadin state
  // - user interactions-related stuff, like id of selected vehicle
  static: staticReducer,
});

export const getDynamicSlice = s =>
  s.get('dynamic');

export const getStaticSlice = s =>
  s.get('static');

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
  const orderedList = getDynamicSlice(state).get('orderedList');

  return orderedList.map(id => theObj.get(id)).toJS();
};
export const getProcessedVehicles = state =>
  getDynamicSlice(state).get('processedList');

export const getVehiclesAmount = state =>
  getSizeSafe(getDynamicSlice(state).get('processedList'));

export const getDeadList = state =>
  getValuesSafe(getDynamicSlice(state).get('deadList'));

export const getDeadAmount = state =>
  getSizeSafe(getDynamicSlice(state).get('deadList'));

export const getDelayedList = state =>
  getValuesSafe(getDynamicSlice(state).get('delayedList'));

export const getDelayedAmount = state =>
  getSizeSafe(getDynamicSlice(state).get('delayedList'));

export const getAmounts = state => ({
  deadAmount: getDeadAmount(state),
  delayedAmount: getDelayedAmount(state),
  vehiclesAmount: getVehiclesAmount(state),
});

export const getVehicleById = (state, id) =>
  getDynamicSlice(state).getIn(['processedList', id]);

export const getIsReady = (state) => state.get('isReady');

export const getSelectedVehicleId = state =>
  getStaticSlice(state).get('selectedVehicleId');

export const reducerKey = 'Vehicles';
