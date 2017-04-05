import endpoints from 'configs/endpoints';
import { api } from 'utils/api';
import { createJournalEntry, createJournalEntryDbg } from 'containers/Journal/entryHelpers';
import { getVehiclesExSorted } from 'services/FleetModel/reducer';

import moment from 'moment';

export const JR_OPEN = 'jrn/open';
export const JR_ADD_ENTRIES = 'jrn/add';

export const fetchAlertsHistory = (getState) => (dispatch) => _startFetching(dispatch, getState);
// export const startAlertsPulling = () => (dispatch) =>


export const jrnOpen = (doOpen) => (dispatch) =>
  dispatch({
    type: JR_OPEN,
    doOpen,
  });

export const jrnAddEntries = (newEntriesList) => (dispatch) =>
  dispatch({
    type: JR_ADD_ENTRIES,
    newEntriesList,
  });

// update once a minute or so
const ALERTS_HISOTYR_FETCH_INTERVAL_MS = 1000 * 60;
let fetchProcId = null;

function _devGenerateDummyAlertsHistory(dispatch) {
  const journalEntries = [];
  for (let i = 0; i < 32; ++i) {
    journalEntries.push(createJournalEntryDbg());
  }
  jrnAddEntries(journalEntries)(dispatch);
}

function _startFetching(dispatch, getState) {
  // _devGenerateDummyAlertsHistory(dispatch);
  // return;
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
