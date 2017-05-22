import endpoints from 'configs/endpoints';
import { api } from 'utils/api';
import { makeTimeRangeParams } from 'utils/dateTimeUtils';

/**
 * Get all events for last 24 hours, or withing specified time range
 * @param {Object} - range
 * @returns {Array} - events for the required timerange
 */
export default (range) => {
  const rangeParams = makeTimeRangeParams(range);
  const { url, method } = endpoints.getAlertsInTimeRange(rangeParams);

  return api[method](url).then(res => res.json());
};
