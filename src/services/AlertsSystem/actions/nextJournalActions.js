import { api } from 'utils/api';
import uuid from 'node-uuid';
import endpoints from 'configs/endpoints';
import { makeTimeRangeParams } from 'utils/dateTimeUtils';
import { getVehicleById } from 'services/FleetModel/reducer';
import { getAlertConditionById } from '../reducer';

export const JOURNAL_ENTRIES_ADD = 'alertsSystem/JOURNAL_ENTRIES_ADD';

export const fetchNotifications = (range = undefined) => async (dispatch, getState) => {
  const rangeParams = makeTimeRangeParams(range);
  const { url, method } = endpoints.getAlertsInTimeRange(rangeParams);
  const state = getState();
  let result;

  try {
    result = await api[method](url).then(res => res.json());
  } catch (e) {
    throw e;
  }

  const journalEntries = result.map(entry =>
    createJournalEntry(entry, state),
  );

  dispatch({
    type: JOURNAL_ENTRIES_ADD,
    entries: journalEntries,
  });

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
