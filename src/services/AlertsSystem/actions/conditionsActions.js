  // {
  //   "aboveTemp": -1,
  //   "created": "2017-03-06T18:29:50.950+1100",
  //   "status": "",
  //   "meta": {
  //     "key1": "val1",
  //     "key2": "val2"
  //   },
  //   "kind": "temperature-alert"
  // },
  // {
  //   "gfId": "123456",
  //   "created": "2017-03-06T18:29:50.952+1100",
  //   "status": "",
  //   "meta": {
  //     "key1": "val1",
  //     "key2": "val2"
  //   },
  //   "kind": "geofence-alert"
  // }

import endpoints from 'configs/endpoints';
import { api } from 'utils/api';
import { makeLocalAlertCondition } from '../alertConditionHelper';

export const ALRT_CONDITIONS_READY_SET = 'alrtSys/ALRT_CONDITIONS_READY_SET';
export const ALRT_CONDITONS_SET = 'AlertsSystem/ALERT_CONDITONS_SET';
export const ALRT_VEHICLE_SET = 'AlertsSystem/vehAlertConditionsSet';
export const ALRT_CONDITON_DEL = 'AlertsSystem/ALERT_CONDITION_DELETE';

export const createAlertConditions = newAlerts => (dispatch, getState) =>
  _createAlertConditionRequest(newAlerts, dispatch, getState);

export const deleteAlertCondition = alertId => dispatch =>
  _deleteAlertRequest(alertId, dispatch);

export const updateAlertCondition = newAlerts => dispatch =>
  _updateAlertRequest(newAlerts, dispatch);

export const fetchAlertConditions = () => _fetchConditions;

export const fetchVehicleAlertConditions = vehicleId => dispatch =>
  _fetchVehicleAlerConditions(vehicleId, dispatch);

export const postVehicleAlertConditions = (vehicleId, alerts) => dispatch =>
  _postVehicleAlerConditions(vehicleId, alerts, dispatch);

function _fetchConditions(dispatch, getState) {
  const { url, method } = endpoints.getAlertConditions;
  const state = getState();

  dispatch(_conditionsReadySet(false));

  return api[method](url)
    .then(toJson)
    .then((conditions) => {
      _setConditions(dispatch, state, conditions);
    })
    .catch((e) => {
      console.error(e);
      dispatch(_conditionsReadySet(true));
    });
}
function _setConditions(dispatch, state, conditions) {
  const result = {};

  conditions.forEach((aElement) => {
    result[aElement.id] = makeLocalAlertCondition(aElement, state);
  });

  dispatch(_conditionSet(result));
}

function _fetchVehicleAlerConditions(vehicleId, dispatch) {
  const { url, method } = endpoints.getVehicleAlertConditions(vehicleId);

  return api[method](url)
    .then(toJson)
    .then((alerts) => {
      dispatch(_vehicleConditionsSet(vehicleId, alerts));
    })
    .catch(console.error);
}

function _postVehicleAlerConditions(vehicleId, alerts, dispatch) {
  const { url, method } = endpoints.postVehicleAlertConditions(vehicleId);

  return api[method](url, {
    payload: alerts,
  }).then(() => {
    dispatch(_vehicleConditionsSet(vehicleId, alerts));
 // this.props.fetchVehicleAlertConditions(nextProps.vehicleId)
    return Promise.resolve();
  }, error => Promise.reject(error));
}

function toJson(response) {
  return response.json();
}

/**
 * POST - new Alerts details to the server
 **/
function _createAlertConditionRequest(alertObject, dispatch, getState) {
  const { url, method } = endpoints.createAlertConditions;

  return api[method](url, {
    payload: alertObject,
  }).then(() => {
    _fetchConditions(dispatch, getState);
    return Promise.resolve();
  }, error => Promise.reject(error));
}

/**
 * PUT - update existing Alert
 **/
function _updateAlertRequest(alertObject, dispatch) {
  const { url, method } = endpoints.updateAlertConditions(alertObject.id);

  return api[method](url, {
    payload: alertObject,
  }).then(() => {
    _fetchConditions(dispatch);
    return Promise.resolve();
  }, error => Promise.reject(error));
}

/**
 * DELETE - remove existing Alert
 **/
function _deleteAlertRequest(alertId, dispatch) {
  const { url, method } = endpoints.deleteAlertConditions(alertId);

  return api[method](url, {
  }).then(() => {
    dispatch(_conditionDelete(alertId));
    return Promise.resolve();
  }, error => Promise.reject(error));
}

const _conditionDelete = alertId => ({
  type: ALRT_CONDITON_DEL,
  alertId,
});

const _conditionSet = conditions => ({
  type: ALRT_CONDITONS_SET,
  conditions,
});

const _vehicleConditionsSet = (vehicleId, conditions) => ({
  type: ALRT_VEHICLE_SET,
  vehicleId,
  conditions,
});

const _conditionsReadySet = isReady => ({
  type: ALRT_CONDITIONS_READY_SET,
  isReady,
});
