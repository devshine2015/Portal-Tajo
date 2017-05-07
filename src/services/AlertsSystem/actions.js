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
import { makeLocalAlertCondition } from './alertConditionHelper';

export const ALRT_TYPES_SET = 'alrt/typesSet';
export const ALRT_CONDITON_ADD = 'alrt/conditionAdd';
export const ALRT_CONDITON_DEL = 'alrt/conditionDel';
export const ALRT_EVENTS_ADD = 'alrt/eventsAdd';
export const ALRT_VEHICLE_ADD = 'alrt/vehEventsAdd';

export const createAlertConditions = newAlerts => dispatch =>
  _createAlertRequest(newAlerts, dispatch);

export const deleteAlertCondition = alertId => dispatch =>
  _deleteAlertRequest(alertId, dispatch);

export const updateAlertCondition = newAlerts => dispatch =>
  _updateAlertRequest(newAlerts, dispatch);

export const fetchAlertConditions = () => _fetchAlerts;

export const fetchVehicleAlertConditions = vehicleId => dispatch =>
  _fetchVehicleAlerConditions(vehicleId, dispatch);

export const postVehicleAlertConditions = (vehicleId, alerts) => dispatch =>
  _postVehicleAlerConditions(vehicleId, alerts, dispatch);

function _fetchAlerts(dispatch, state) {
  const { url, method } = endpoints.getAlertConditions;

  return api[method](url)
    .then(toJson)
    .then((alerts) => {
      _addAlerts(dispatch, state, alerts);
    })
    .catch((e) => {
      console.error(e);
    });
}
function _addAlerts(dispatch, state, backEndAlerts) {
  backEndAlerts.forEach((aElement) => {
    dispatch(_conditionAdd(makeLocalAlertCondition(aElement, state)));
  }, this);
}

function _fetchVehicleAlerConditions(vehicleId, dispatch) {
  const { url, method } = endpoints.getVehicleAlertConditions(vehicleId);

  return api[method](url)
    .then(toJson)
    .then((alerts) => {
      _setVehicleAlertConditions(dispatch, vehicleId, alerts);
    })
    .catch((e) => {
      console.error(e);
    });
}
function _setVehicleAlertConditions(dispatch, vehicleId, alertsList) {
  dispatch(_vehicleAlerts(vehicleId, alertsList));
}

function _postVehicleAlerConditions(vehicleId, alerts, dispatch) {
  const { url, method } = endpoints.postVehicleAlertConditions(vehicleId);

  return api[method](url, {
    payload: alerts,
  }).then(() => {
    _setVehicleAlertConditions(dispatch, vehicleId, alerts);
 // this.props.fetchVehicleAlertConditions(nextProps.vehicleId)
    return Promise.resolve();
  }, error => Promise.reject(error));
}

function toJson(response) {
  return response.json();
}

// export const addAlertCondition = (alertObj) => dispatch => {
//   dispatch(_conditionAdd(alertObj));
// };

/**
 * POST - new Alerts details to the server
 **/
function _createAlertRequest(alertObject, dispatch) {
  const { url, method } = endpoints.createAlertConditions;

  return api[method](url, {
    payload: alertObject,
  }).then(() => {
    _fetchAlerts(dispatch);
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
    _fetchAlerts(dispatch);
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

const _conditionAdd = alertObj => ({
  type: ALRT_CONDITON_ADD,
  alertObj,
});

const _conditionDelete = alertId => ({
  type: ALRT_CONDITON_DEL,
  alertId,
});

const _vehicleAlerts = (vehicleId, alertsList) => ({
  type: ALRT_VEHICLE_ADD,
  vehicleId,
  alertsList,
});
