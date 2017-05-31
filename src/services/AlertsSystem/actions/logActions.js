import {
  fetchNotificationsForTimeRange,
  createJournalEntries,
} from './helpers';

export const LOGS_SET = 'alrtSys/LOGS_SET';

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
  }

  return result;
};
