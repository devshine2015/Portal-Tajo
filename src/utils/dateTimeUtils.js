import moment from 'moment';

export const makePeriodForLast24Hours = () => {
  const startDate = moment().subtract(24, 'hours').toDate();
  const endDate = moment().toDate();

  return {
    startDate,
    endDate,
  };
};

/**
 * Create time range for current day
 * @returns {Object} defaultPeriod
 * @returns {Date} defaultPeriod.startDate - current date
 * @returns {Date} defaultPeriod.startTime - date with time set to 00:00:00
 * @returns {Date} defaultPeriod.endTime - current date
 * @returns {Date} defaultPeriod.endTime - date with time set to 23:59:59
 */
export const makeDefaultDatePeriod = () => {
  const defaultDate = new Date();

  return {
    startDate: defaultDate,
    startTime: _makeStartTime(),
    endDate: defaultDate,
    endTime: _makeEndTime(),
  };
};

const _makeStartTime = () => {
  const t = moment().set({
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
  });
  return t.toDate();
};

const _makeEndTime = () => {
  const t = moment().set({
    hour: 23,
    minute: 59,
    second: 59,
    millisecond: 999,
  });

  return t.toDate();
};

/**
 * if *Time param it undefined, their value will be taken
 * from provided *Date
 */
export const makeTimeRangeParams = ({
  startDate,
  startTime = undefined,
  endDate = undefined,
  endTime = undefined,
}) => {
  const endD = endDate || startDate;

  const fromFormatted = _formateDateForRequest(startDate, startTime);
  const toFormatted = _formateDateForRequest(endD, endTime);

  return {
    from: fromFormatted,
    to: toFormatted,
  };
};

// Just formatting to ISO string. Keep actual date and time values
function _formateDateForRequest(date, time = undefined) {
  const d = moment.isMoment(date) ? date.toDate() : date;

  const result = moment({
    y: d.getFullYear(),
    M: d.getMonth(),
    d: d.getDate(),
    h: time ? time.getHours() : d.getHours(),
    m: time ? time.getMinutes() : d.getMinutes(),
    s: time ? time.getSeconds() : d.getSeconds(),
  }).toISOString();

  return `${result.slice(0, -1)}+0000`;
}
