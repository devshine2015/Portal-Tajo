import moment from 'moment';
import uuid from 'node-uuid';
import { getVehicleById } from 'services/FleetModel/reducer';
import { fetchNotificationsForTimeRange } from './helpers';
import { getAlertConditionById } from '../reducer';

// update once a minute
const ALERTS_HISTORY_FETCH_INTERVAL_MS = 1000 * 60;
let notificationsTimerId = null;

export const JOURNAL_ENTRIES_ADD = 'alertsSystem/JOURNAL_ENTRIES_ADD';

const listenForNotifications = (dispatch, initialStartDate) => {
  let fromDate = initialStartDate;

  notificationsTimerId = window.setInterval(() => {
    const toDate = moment().toDate();
    const nextRange = { fromDate, toDate };

    dispatch(fetchNotifications(nextRange));

    // make current toDate start date for the next request
    fromDate = toDate;
  }, ALERTS_HISTORY_FETCH_INTERVAL_MS);
};

export const clearNotificationsListener = () => {
  window.clearInterval(notificationsTimerId);
};

/**
 * Get all events for last 24 hours, or withing specified time range
 * @param {Object} - range
 */
export const fetchNotifications = range => async (dispatch, getState) => {
  const state = getState();
  let result;

  try {
    result = await fetchNotificationsForTimeRange(range);
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
    listenForNotifications(dispatch, range.toDate);
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
