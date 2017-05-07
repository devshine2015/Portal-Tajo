import { Map, fromJS } from 'immutable';
import { conditionsActions } from './actions';

const initialState = fromJS({
  conditions: new Map(), // map by ids
  vehicleConditions: new Map(), // map - [alertIds] by VehIds
});

function alertsReducer(state = initialState, action) {
  switch (action.type) {
    case conditionsActions.ALRT_CONDITON_SET:
      return state.setIn(['conditions', action.condition.id], action.condition);
    case conditionsActions.ALRT_VEHICLE_SET:
      return state.setIn(['vehicleConditions', action.vehicleId], action.conditions);
    default:
      return state;
  }
}

export default alertsReducer;

const _alertsRx = state =>
  state.get('alerts');

export const getAlertTypes = state =>
  _alertsRx(state).get('types').toJS();

export const getAlertConditions = (state) => {
  const imObj = _alertsRx(state).get('conditions');
  if (imObj.size === 0) {
    return [];
  }
  const jsObj = imObj.toJS();
  const aList = Object.values(jsObj);
  return aList;
};

export const getAlertConditionByIdFunc = state => (id) => {
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

export const getVehicleAlertConditions = state => (vehicleId) => {
  const vehAlerts = _alertsRx(state).getIn(['vehicleConditions', vehicleId]);
  if (vehAlerts === undefined) {
    return null;
  }
  return vehAlerts;
};

