import { List, Map, fromJS } from 'immutable';
import {
  ALRT_CONDITON_ADD,
  ALRT_CONDITON_DEL,
  ALRT_EVENTS_ADD,
  ALRT_VEHICLE_ADD,
} from './actions';

const initialState = fromJS({
  types: [],
  conditions: new Map(), // map by ids
  events: [], // what happened, pulling this periodicaly from backEnd
  vehicleAlerts: new Map(), // map - [alertIds] by VehIds
});

function alertsReducer(state = initialState, action) {
  switch (action.type) {
    case ALRT_CONDITON_ADD:
      return state.setIn(['conditions', action.alertObj.id], action.alertObj);
    case ALRT_CONDITON_DEL:
      return state.deleteIn('conditions', action.alertId);
    case ALRT_VEHICLE_ADD:
      return state.setIn(['vehicleAlerts', action.vehicleId], action.alertsList);
    case ALRT_EVENTS_ADD:
      return state.set('events', new List(action.alertEvents));
    default:
      return state;
  }
}

export default alertsReducer;

const _alertsRx = state =>
  state.get('alerts');

export const getAlertTypes = state =>
  _alertsRx(state).get('types').toJS();

export const getAlertConditions = state => {
  const imObj = _alertsRx(state).get('conditions');
  if (imObj.size === 0) {
    return [];
  }
  const jsObj = imObj.toJS();
  const aList = Object.values(jsObj);
  return aList;
};

export const getAlertConditionByIdFunc = state => id => {
  const imObj = _alertsRx(state).get('conditions');
  if (imObj.size === 0) {
    return null;
  }
  const theObj = imObj.get(id);
  if (theObj === undefined) {
    return null;
  }
  return theObj;
};

export const getVehicleAlertConditions = state => vehicleId => {
  const vehAlerts = _alertsRx(state).getIn(['vehicleAlerts', vehicleId]);
  if (vehAlerts === undefined) {
    return null;
  }
  return vehAlerts;
};

