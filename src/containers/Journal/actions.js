import endpoints from 'configs/endpoints';
import { api } from 'utils/api';
import { createJournalEntry, createJournalEntryDbg } from './entryHelpers';
import { getVehiclesExSorted } from 'services/FleetModel/reducer';
import { jrnGetLatestRecievedTS, jrnIsWating } from './reducer';
import storage from 'utils/localStorage';

import moment from 'moment';

export const JR_OPEN = 'jrn/open';
export const JR_ADD_ENTRIES = 'jrn/add';
export const JR_SET_WAITING = 'jrn/wait';

export const fetchAlertsHistory = (getState) => (dispatch) => _startFetching(dispatch, getState);
// export const startAlertsPulling = () => (dispatch) =>


export const jrnOpen = (doOpen) => (dispatch) =>
  dispatch({
    type: JR_OPEN,
    doOpen,
  });

export const jrnAddEntries = (newEntriesList, latestRecievedTS) => (dispatch) =>
  dispatch({
    type: JR_ADD_ENTRIES,
    newEntriesList,
    latestRecievedTS,
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
  _fetchFunc(dispatch, getState)();
  fetchProcId = window.setInterval(_fetchFunc(dispatch, getState), ALERTS_HISOTYR_FETCH_INTERVAL_MS);
}

const _fetchFunc = (dispatch, getState) => () => _fetchAlertsHistory(dispatch, getState);

function _fetchAlertsHistory(dispatch, getState) {
  if (jrnIsWating(getState())) {
    return;
  }
  dispatch({
    type: JR_SET_WAITING,
  });
  // const dateFrom = moment().subtract(10, 'days').toDate();

   storage.  latestRecievedTS

  const dateFrom = new Date(jrnGetLatestRecievedTS(getState()));
  // const dateFrom = new Date(0);
  const dateTo = moment().toDate();
  const nextLatestMS = dateTo.getTime();
  let fromString = dateFrom.toISOString();
  fromString = `${fromString.slice(0, -1)}+0000`;
  let toString = dateTo.toISOString();
  toString = `${toString.slice(0, -1)}+0000`;

  const { url, method } = endpoints.getAlertsInTimeRange({
    from: fromString,
    to: toString,
  });

  api[method](url)
    .then(response => response.json())
    .then(alertEvents => {
      const vehicles = getVehiclesExSorted(getState());
      const journalEntries = alertEvents.map((alertEntry) =>
        createJournalEntry(alertEntry, vehicles)
      );
      jrnAddEntries(journalEntries, nextLatestMS)(dispatch);
      // dispatch(_alertEventsAdd(alertEvents));
    })
    .catch(e => {
      console.error(e);
    });
}
