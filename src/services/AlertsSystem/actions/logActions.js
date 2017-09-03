import {
  fetchNotificationsForTimeRange,
  createJournalEntries,
} from './helpers';

export const LOGS_SET = 'alrtSys/LOGS_SET';
export const LOGS_PERIOD_SET = 'alertSystem/LOGS_PERIOD_SET';

export const fetchLogs = range => async (dispatch, getState) => {
  const state = getState();
  let result;

  try {
    result = await fetchNotificationsForTimeRange(range);
  } catch (e) {
    throw e;
  }

  if (result.length > 0) {
    const logEntries = createJournalEntries(result, state);

    dispatch({
      type: LOGS_SET,
      entries: logEntries,
    });
  } else {
    dispatch({
      type: LOGS_PERIOD_SET,
      period: range,
    });
  }

  return result;
};
