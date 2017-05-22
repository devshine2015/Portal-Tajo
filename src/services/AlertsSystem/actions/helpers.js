import uuid from 'node-uuid';
import endpoints from 'configs/endpoints';
import { api } from 'utils/api';
import { makeTimeRangeParams } from 'utils/dateTimeUtils';
import { getVehicleById } from 'services/FleetModel/reducer';
import { getAlertConditionById } from '../reducer';

/**
 * Get all events for last 24 hours, or withing specified time range
 * @param {Object} - range
 * @returns {Array} - events for the required timerange
 */
export function fetchNotificationsForTimeRange(range) {
  const rangeParams = makeTimeRangeParams(range);
  const { url, method } = endpoints.getAlertsInTimeRange(rangeParams);

  return api[method](url).then(res => res.json());
}

export function createJournalEntry(alertEvent, state) {
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
