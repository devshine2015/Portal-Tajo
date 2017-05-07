import moment from 'moment';
import { api } from 'utils/api';
import endpoints from 'configs/endpoints';
import { getVehiclesExSorted } from 'services/FleetModel/reducer';
import { getVehicleById } from 'services/FleetModel/utils/vehicleHelpers';
import {
  jrnGetLatestRecievedTS,
  jrnIsWaiting,
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

  const backTimeLimit = moment().subtract(1, 'days').toDate().getTime();
  const fromTicks = Math.max(backTimeLimit, jrnGetLatestRecievedTS(getState()));
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
    .then(alertEvents => {
      const vehicles = getVehiclesExSorted(getState());
      const journalEntries = alertEvents.map((alertEntry) =>
        createJournalEntry(alertEntry, vehicles)
      );
      dispatch(jrnAddEntries(journalEntries, nextLatestMS));
    })
    .catch(e => {
      console.error(e);
    });
}

function createJournalEntry(backEndAlertEvent, vehicles) {
  const crossTime = backEndAlertEvent.ev.crossTime !== undefined ? backEndAlertEvent.ev.crossTime : 0;
  const eventDate = new Date(backEndAlertEvent.ev.ts !== undefined ? backEndAlertEvent.ev.ts : crossTime);
  const theVehicle = vehicles.length === 0 ? null : getVehicleById(backEndAlertEvent.ev.vehicleId, vehicles);

  return {
    eventTS: eventDate.getTime(),
    eventKind: backEndAlertEvent.ev.conditionKind,
    eventName: backEndAlertEvent.ev.meta.name,
    ownerName: theVehicle === null ? 'loading cars..' : theVehicle.vehicle.original.name,
    name: backEndAlertEvent.ev.meta.name,
  };
}
