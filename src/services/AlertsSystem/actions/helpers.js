import R from 'ramda';
import uuid from 'node-uuid';
import endpoints from 'configs/endpoints';
import { api } from 'utils/api';
import {
  makeTimeRangeParams,
  formatForBrowsers,
} from 'utils/dateTimeUtils';
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
    .map(entry => _createJournalEntry(entry, state))
    .filter(entry => entry !== undefined);
}

function getEventDate(alertEvent) {
  const ts = R.path(['ev', 'ts']);
  const crossTime = R.path(['ev', 'crossTime']);
  const hasCrossTime = R.compose(R.not, R.isNil, crossTime);
  const hasTimestamp = R.compose(R.not, R.isNil, ts);
  const getCrossTime = R.ifElse(hasCrossTime, crossTime, R.always(0));
  const getDate = R.compose(formatForBrowsers, R.ifElse(hasTimestamp, ts, getCrossTime));

  return new Date(getDate(alertEvent));
}

function _createJournalEntry(alertEvent, state) {
  const imVehicle = getVehicleById(state, alertEvent.ev.vehicleId);

  // handeling sub-fleets - when dealer, we get alerts for all the sub - feets,
  // but intetested in the selected one
  if (imVehicle === undefined) {
    return undefined;
  }

  const imCondition = getAlertConditionById(state, alertEvent.ev.conditionId);
  const eventDate = getEventDate(alertEvent);

  return {
    id: uuid.v4(),
    eventTS: eventDate.valueOf(),
    eventKind: alertEvent.ev.conditionKind,
    eventName: imCondition.get('name'),
    ownerName: imVehicle.getIn(['original', 'name']),
    ownerId: imVehicle.get('id'),
  };
}
