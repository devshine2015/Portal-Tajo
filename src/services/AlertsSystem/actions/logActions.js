import { makeDefaultDatePeriod } from 'utils/dateTimeUtils';
import {
  fetchNotificationsForTimeRange,
  createJournalEntry,
} from './helpers';

export const LOGS_ADD = 'alrtSys/LOGS_ADD';

export const fetchLogs = (range = makeDefaultDatePeriod()) => async (dispatch, getState) => {
  const state = getState();
  let result;

  try {
    result = await fetchNotificationsForTimeRange(range);
  } catch (e) {
    throw e;
  }

  if (result.length > 0) {
    const logEntries = result.map(entry =>
      createJournalEntry(entry, state),
    );

    dispatch({
      type: LOGS_ADD,
      entries: logEntries,
    });
  }

  return result;
};
