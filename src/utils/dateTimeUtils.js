import moment from 'moment';

const DEFAULT_START_TIME = {
  h: 0,
  m: 0,
  s: 0,
  ms: 0,
};

const DEFAULT_END_TIME = {
  h: 23,
  m: 59,
  s: 59,
  ms: 999,
};

/**
 * combine date and time from two Date objects to a single one
 * @param {Date} dateDate
 * @param {Date} dateTime
 * @returns {Date} date (DDMM) taken from dateDate; time (HHMM) taken from dateTime
 */
export const makeDateWithTime = (dateDate, dateTime) => {
  const dateWithTime = moment(dateDate).toDate();

  dateWithTime.setHours(dateTime.getHours());
  dateWithTime.setMinutes(dateTime.getMinutes());
  dateWithTime.setSeconds(dateTime.getSeconds());

  return dateWithTime;
};


export const makePeriodForLast24Hours = () => {
  const fromDate = moment().subtract(24, 'hours').toDate();
  const toDate = moment().toDate();

  return {
    fromDate,
    toDate,
  };
};

/**
 * Create time range for current day
 * @returns {Object} defaultPeriod
 * @returns {Date} defaultPeriod.fromDate - date of the start of the period
 * @returns {Date} defaultPeriod.toDate - date of the end of the period
 */
export const makeDefaultDatePeriod = () => {
  const defaultDate = moment();

  return {
    fromDate: defaultDate.clone().set(DEFAULT_START_TIME).toDate(),
    toDate: defaultDate.clone().set(DEFAULT_END_TIME).toDate(),
  };
};

/**
 * Converts date period to format backend will undestand (ISO)
 * @param {Date} - fromDate - start of the period
 * @param {Date} - toDate - end of the period
 * @return {Object}
 * @return {String} - from - fromDate arg formatted for request
 * @return {String} - to - toDate arg formatted for request
 */
export const makeTimeRangeParams = (fromDate, toDate) => {
  const to = toDate || fromDate;

  return {
    from: _formatDateForRequest(fromDate),
    to: _formatDateForRequest(to),
  };
};

/**
 * formatting argument to DRVR ENGINE compatible date string
 * @param {Date} dateStr - date to be formatted
 * @return {String}
 */
function _formatDateForRequest(dateStr) {
  const isoDate = dateStr.toISOString();

  return `${isoDate.slice(0, -1)}+0000`;
}
