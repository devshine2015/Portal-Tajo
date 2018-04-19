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
  return makePeriodForHoursBack(24);
};

/**
  * Create time range ending now, starting 'hours' back from now
  * @returns {Object}
  * @returns {Date} fromDate - now minus hours
  * @returns {Date} toDate - now
  */
export const makePeriodForHoursBack = (hours) => {
  const fromDate = moment().subtract(hours, 'hours').toDate();
  const toDate = moment().toDate();

  return {
    fromDate,
    toDate,
  };
};

/**
  * Create time range ending now, starting 'months' back from today
  * @returns {Object}
  * @returns {Date} fromDate - now minus months day with 00:00:00 time
  * @returns {Date} toDate - today with 23:59:59 time
  */
export const makePeriodForMonthsBack = (months) => {
  const fromDate = moment().subtract(months, 'months').startOf('day').toDate();
  const toDate = moment().endOf('day').toDate();

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
    from: _formatFromDateForRequest(fromDate),
    to: _formatToDateForRequest(to),
  };
};


/**
  * formatting argument to DRVR ENGINE compatible date string
  * output date example - 2018-01-15T00:00:00.000+0200
  * @param {Date} dateStr - date to be formatted
  * @return {String}
  */
function _formatFromDateForRequest(dateStr) {
  const startTime = dateStr.setHours(0, 0, 0, 0);
  const date = moment(startTime).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
  return date;
}

/**
  * formatting argument to end of the day (of DRVR ENGINE compatible date string)
  * output date example - 2018-01-29T23:59:59.000+0200
  * @param {Date} dateStr - date to be formatted
  * @return {String}
  */
function _formatToDateForRequest(dateStr) {
  const endTime = dateStr.setHours(23, 59, 59, 999);
  const date = moment(endTime).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
  return date;
}


/**
 * Make date string compatible with browsers.
 * i.e. Cut off '+0000' suffix if string has it
 * and append Z to indicate timezone
 * @param {String} dateStr - date to formate
 * @returns {String} formatted date string
 *
 * @example
 * input - "2017-08-29T04:00:47.000+0000"
 * output = "2017-08-29T04:00:47.000Z"
 */
export function formatForBrowsers(dateStr = undefined) {
  if (!dateStr) return dateStr;

  const noZeroes = dateStr.endsWith('+0000') ? dateStr.slice(0, -5) : dateStr;
  const withZ = !noZeroes.endsWith('Z') ? `${noZeroes}Z` : noZeroes;

  return withZ;
}
