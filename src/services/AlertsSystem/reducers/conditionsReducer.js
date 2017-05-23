import { Map, fromJS } from 'immutable';
import { conditionsActions } from '../actions';

const initialState = fromJS({
  conditions: new Map(), // map by ids
  // TODO: think about move vehicle conditions to vehiclesEditor reducer or to fleetModel
  vehicleConditions: new Map(), // map - [alertIds] by VehIds
  isReady: false,
});

function alertsReducer(state = initialState, action) {
  switch (action.type) {
    case conditionsActions.ALRT_CONDITIONS_READY_SET:
      return state.set('isReady', action.isReady);

    case conditionsActions.ALRT_CONDITONS_SET:
      return state.withMutations((st) => {
        st.mergeIn(['conditions'], fromJS(action.conditions))
          .set('isReady', true);
      });

    case conditionsActions.ALRT_VEHICLE_SET:
      return state.setIn(['vehicleConditions', action.vehicleId], action.conditions);

    case conditionsActions.ALRT_CONDITON_DEL:
      return state.deleteIn(['conditions', action.alertId]);

    default:
      return state;
  }
}

export default alertsReducer;

export const getAlertConditions = (state) => {
  const imObj = state.get('conditions');
  if (imObj.size === 0) {
    return [];
  }
  const jsObj = imObj.toJS();
  const aList = Object.values(jsObj);
  return aList;
};

export const getAlertConditionByIdFunc = state => (id) => {
  const imObj = state.get('conditions');
  if (imObj.size === 0) {
    return null;
  }
  const theObj = imObj.get(id);
  if (theObj === undefined) {
    return null;
  }
  return theObj.toJS();
};

export const getVehicleAlertConditions = state => (vehicleId) => {
  const vehAlerts = state.getIn(['vehicleConditions', vehicleId]);
  if (vehAlerts === undefined) {
    return null;
  }
  return vehAlerts;
};

export const getAlertConditionById = (state, id) =>
  state.getIn(['conditions', id]);

export const getIsConditionsReady = state =>
  state.get('isReady');
