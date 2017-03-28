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
import { jrnAddEntries } from 'containers/Journal/actions';
import { createJournalEntry } from 'containers/Journal/entryHelpers';
import { getVehiclesExSorted } from 'services/FleetModel/reducer';

import moment from 'moment';

export const ALRT_TYPES_SET = 'alrt/typesSet';
export const ALRT_CONDITON_ADD = 'alrt/conditionAdd';
export const ALRT_EVENTS_ADD = 'alrt/eventsAdd';
export const ALRT_VEHICLE_ADD = 'alrt/vehEventsAdd';

export const createAlertConditions = (newAlerts) => (dispatch) =>
  _createAlertRequest(newAlerts, dispatch);

export const updateAlertCondition = (newAlerts) => (dispatch) =>
  _updateAlertRequest(newAlerts, dispatch);

export const fetchAlertConditions = () => _fetchAlerts;

export const fetchVehicleAlertConditions = (vehicleId) => (dispatch) =>
  _fetchVehicleAlerConditions(vehicleId, dispatch);

export const postVehicleAlertConditions = (vehicleId, alerts) => (dispatch) =>
  _postVehicleAlerConditions(vehicleId, alerts, dispatch);

export const fetchAlertsHistory = (getState) => (dispatch) => _startFetching(dispatch, getState);
// export const startAlertsPulling = () => (dispatch) =>

function _fetchAlerts(dispatch) {
  const { url, method } = endpoints.getAlertConditions;

  return api[method](url)
    .then(toJson)
    .then(alerts => {
      _addAlerts(dispatch, alerts);
    })
    .catch(e => {
      console.error(e);
    });
}
function _addAlerts(dispatch, backEndAlerts) {
  backEndAlerts.forEach((aElement) => {
    dispatch(_conditionAdd(makeLocalAlertCondition(aElement)));
  }, this);
}

function _fetchVehicleAlerConditions(vehicleId, dispatch) {
  const { url, method } = endpoints.getVehicleAlertConditions(vehicleId);

  return api[method](url)
    .then(toJson)
    .then(alerts => {
      _setVehicleAlertConditions(dispatch, vehicleId, alerts);
    })
    .catch(e => {
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


// update once a minute or so
const ALERTS_HISOTYR_FETCH_INTERVAL_MS = 1000 * 60;
let fetchProcId = null;

function _startFetching(dispatch, getState) {
  if (fetchProcId !== null) {
    return;
  }
  // do the first tick right away - so we are actual
  _fetchFunk(dispatch, getState)();
  fetchProcId = window.setInterval(_fetchFunk(dispatch, getState), ALERTS_HISOTYR_FETCH_INTERVAL_MS);
}

const _fetchFunk = (dispatch, getState) => () => {
  _fetchAlertsHistory(dispatch, getState);
};

function _fetchAlertsHistory(dispatch, getState) {
  const dateFrom = moment().subtract(2, 'days').toDate();
  const dateTo = moment().toDate();
  let fromString = dateFrom.toISOString();
  fromString = fromString.slice(0, -1) + '+0000';
  let toString = dateTo.toISOString();
  toString = toString.slice(0, -1) + '+0000';

  const { url, method } = endpoints.getAlertsInTimeRange({
    from: fromString,
    to: toString,
  });

  return api[method](url)
    .then(toJson)
    .then(alertEvents => {
      const vehicles = getVehiclesExSorted(getState());
      const journalEntries = [];
      alertEvents.forEach((alertEntry) => {
        journalEntries.push(createJournalEntry(alertEntry, vehicles));
      });
      jrnAddEntries(journalEntries)(dispatch);
      // dispatch(_alertEventsAdd(alertEvents));
    })
    .catch(e => {
      console.error(e);
    });
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

const _conditionAdd = (alertObj) => ({
  type: ALRT_CONDITON_ADD,
  alertObj,
});

const _vehicleAlerts = (vehicleId, alertsList) => ({
  type: ALRT_VEHICLE_ADD,
  vehicleId,
  alertsList,
});

const _alertEventsAdd = (alertEvents) => ({
  type: ALRT_EVENTS_ADD,
  alertEvents,
});
