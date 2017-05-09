import moment from 'moment';
import { api } from 'utils/api';
import endpoints from 'configs/endpoints';
import { getVehicleById } from 'services/FleetModel/reducer';
import {
  jrnGetLatestRecievedTS,
  jrnIsWaiting,
  getAlertConditionById,
} from '../reducer';

export const JR_OPEN = 'jrn/open';
export const JR_ADD_ENTRIES = 'jrn/add';
export const JR_SET_WAITING = 'jrn/wait';

// update once a minute
const ALERTS_HISOTYR_FETCH_INTERVAL_MS = 1000 * 60;
let fetchProcId = null;

export const fetchAlertsHistory = () => _startFetching;

export const jrnOpen = doOpen => ({
  type: JR_OPEN,
  doOpen,
});

export const jrnAddEntries = (newEntriesList, latestRecievedTS) => ({
  type: JR_ADD_ENTRIES,
  newEntriesList,
  latestRecievedTS,
});


function _startFetching(dispatch, getState) {
  if (fetchProcId !== null) {
    return;
  }
  // do the first tick right away - so we are actual
  _fetchAlertsHistory(dispatch, getState);
  fetchProcId = window.setInterval(_fetchAlertsHistory(dispatch, getState), ALERTS_HISOTYR_FETCH_INTERVAL_MS);
}

function _fetchAlertsHistory(dispatch, getState) {
  if (jrnIsWaiting(getState())) {
    return;
  }
  dispatch({
    type: JR_SET_WAITING,
  });

  const state = getState();
  const backTimeLimit = moment().subtract(1, 'days').toDate().getTime();
  const fromTicks = Math.max(backTimeLimit, jrnGetLatestRecievedTS(state));
  const dateFrom = new Date(fromTicks);
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
    .then((alertEvents) => {
      const journalEntries = alertEvents.map(alertEntry =>
        createJournalEntry(alertEntry, state),
      );
      dispatch(jrnAddEntries(journalEntries, nextLatestMS));
    }, (e) => {
      console.error(e);
    });
}

function createJournalEntry(alertEvent, state) {
  const crossTime = alertEvent.ev.crossTime !== undefined ? alertEvent.ev.crossTime : 0;
  const eventDate = new Date(alertEvent.ev.ts !== undefined ? alertEvent.ev.ts : crossTime);
  const theVehicle = getVehicleById(state, alertEvent.ev.vehicleId);
  const condition = getAlertConditionById(state, alertEvent.ev.conditionId);

  return {
    eventTS: eventDate.getTime(),
    eventKind: alertEvent.ev.conditionKind,
    eventName: condition.name,
    ownerName: !theVehicle ? 'loading cars..' : theVehicle.getIn(['original', 'name']),
  };
}
