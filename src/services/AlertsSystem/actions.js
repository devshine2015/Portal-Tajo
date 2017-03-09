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
import api from 'utils/api';
import { makeLocalAlertCondition } from './alertConditionHelper';

export const ALRT_TYPES_SET = 'alrt/typesSet';
export const ALRT_CONDITON_ADD = 'alrt/conditionAdd';
export const ALRT_EVEENTS_ADD = 'alrt/eventsAdd';

export const createAlertConditions = (newAlerts) => (dispatch) =>
  _createAlertRequest(newAlerts, dispatch);

export const fetchAlertConditions = () => _fetchAlerts;

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

const _conditionAdd = (alertObj) => ({
  type: ALRT_CONDITON_ADD,
  alertObj,
});