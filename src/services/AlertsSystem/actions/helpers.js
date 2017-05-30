import uuid from 'node-uuid';
import endpoints from 'configs/endpoints';
import { api } from 'utils/api';
import { makeTimeRangeParams } from 'utils/dateTimeUtils';
import { getVehicleById } from 'services/FleetModel/reducer';
import { getAlertConditionById } from '../reducer';

/**
 * keep this function to test notifications
 */
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

/**
 * Get all events for last 24 hours, or withing specified time range
 * @param {Object} - range
 * @param {Date} - range.fromDate
 * @param {Date} - range.toDate
 * @returns {Array} - events for the required timerange
 */
export function fetchNotificationsForTimeRange(range = {}) {
  const rangeParams = makeTimeRangeParams(range.fromDate, range.toDate);
  const { url, method } = endpoints.getAlertsInTimeRange(rangeParams);

  // return makeFakeNotifs();
  return api[method](url).then(res => res.json());
}

/**
 * Filter out events with conditions id not represented in state
 * and creates local representations of other events
 * @param {Array} entries - alerts entries from backend
 * @param {ImmutableMap} state - app state
 * @return {Array}
 */
export function createJournalEntries(entries = [], state) {
  return entries.filter(entry => Boolean(getAlertConditionById(state, entry.ev.conditionId)))
    .map(entry => _createJournalEntry(entry, state));
}

function _createJournalEntry(alertEvent, state) {
  const crossTime = alertEvent.ev.crossTime !== undefined ? alertEvent.ev.crossTime : 0;
  const eventDate = new Date(alertEvent.ev.ts !== undefined ? alertEvent.ev.ts : crossTime);
  const imVehicle = getVehicleById(state, alertEvent.ev.vehicleId);
  const imCondition = getAlertConditionById(state, alertEvent.ev.conditionId);

  return {
    id: uuid.v4(),
    eventTS: eventDate.getTime(),
    eventKind: alertEvent.ev.conditionKind,
    eventName: imCondition.get('name'),
    ownerName: imVehicle.getIn(['original', 'name']),
    ownerId: imVehicle.get('id'),
  };
}
