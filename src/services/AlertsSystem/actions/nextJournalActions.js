import moment from 'moment';
import { api } from 'utils/api';
import uuid from 'node-uuid';
import endpoints from 'configs/endpoints';
import {
  makeTimeRangeParams,
  makePeriodForLast24Hours,
} from 'utils/dateTimeUtils';
import { getVehicleById } from 'services/FleetModel/reducer';
import { getAlertConditionById } from '../reducer';

// update once a minute
const ALERTS_HISTORY_FETCH_INTERVAL_MS = 1000 * 60;
let notificationsTimerId = null;

export const JOURNAL_ENTRIES_ADD = 'alertsSystem/JOURNAL_ENTRIES_ADD';

// const makeFakeNotifs = () => [{
//   ev: {
//     ts: new Date(),
//     vehicleId: '89058b4f-aecd-4f0b-97ea-36cec6dfc766',
//     conditionId: 'a5f4f295-97ab-41cc-8638-553abd705ac7',
//     conditionKind: 'temperature-alert',
//     meta: { name: 'postman tempAlert 1' },
//     pos: {
//       latlon: { lat: 16.8573055267334, lng: 96.0805892944336 },
//       speed: 0,
//       azimuth: 286,
//       accuracy: 1,
//     },
//     temp: 1.5,
//   },
//   type: 'vehicle-temperature-alert',
// }];

const listenForNotifications = (dispatch, initialStartDate) => {
  let startDate = initialStartDate;

  notificationsTimerId = window.setInterval(() => {
    const endDate = moment().toDate();
    const nextRange = { startDate, endDate };

    dispatch(fetchNotifications(nextRange));

    // make current endDate start date for the next request
    startDate = endDate;
  }, ALERTS_HISTORY_FETCH_INTERVAL_MS);
};

export const clearNotificationsListener = () => {
  window.clearInterval(notificationsTimerId);
};

/**
 * Get all events for last 24 hours, or withing specified time range
 * @param {Object} - range
 */
export const fetchNotifications = (range = makePeriodForLast24Hours()) => async (dispatch, getState) => {
  const rangeParams = makeTimeRangeParams(range);
  const { url, method } = endpoints.getAlertsInTimeRange(rangeParams);
  const state = getState();
  let result;

  try {
    result = await api[method](url).then(res => res.json());
  } catch (e) {
    throw e;
  }

  // update state only if ne alerts coming
  if (result.length > 0) {
    const journalEntries = result.map(entry =>
      createJournalEntry(entry, state),
    );

    dispatch({
      type: JOURNAL_ENTRIES_ADD,
      entries: journalEntries,
    });
  }

  // start listening just once
  if (notificationsTimerId === null) {
    listenForNotifications(dispatch, range.endDate);
  }

  return result;
};

function createJournalEntry(alertEvent, state) {
  const crossTime = alertEvent.ev.crossTime !== undefined ? alertEvent.ev.crossTime : 0;
  const eventDate = new Date(alertEvent.ev.ts !== undefined ? alertEvent.ev.ts : crossTime);
  const imVehicle = getVehicleById(state, alertEvent.ev.vehicleId);
  const imCondition = getAlertConditionById(state, alertEvent.ev.conditionId);

  return {
    id: uuid.v4(),
    eventTS: eventDate.getTime(),
    eventKind: alertEvent.ev.conditionKind,
    eventName: imCondition.get('name'),
    ownerName: !imVehicle ? 'loading cars..' : imVehicle.getIn(['original', 'name']),
  };
}
