import moment from 'moment';

/**
 * combine date and time from two Date objects to a single one
 * @param {Date} date
 * @param {Date} time
 * @returns {Date} date (DDMM) taken from dateDate; time (HHMM) taken from dateTime
 */
export const makeDateWithTime = (dateDate, dateTime) => {
  const dateWithTime = moment(dateDate).toDate();
  dateWithTime.setHours(dateTime.getHours());
  dateWithTime.setMinutes(dateTime.getMinutes());
  return dateWithTime;
};


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

  const fromObj = makeSingleDateString(startDate, startTime);
  const toObj = makeSingleDateString(endD, endTime);

  return {
    from: _formatDateForRequest(fromObj),
    to: _formatDateForRequest(toObj),
  };
};

export function makeSingleDateString(date, time = undefined) {
  const d = moment.isMoment(date) ? date.toDate() : date;

  return moment({
    y: d.getFullYear(),
    M: d.getMonth(),
    d: d.getDate(),
    h: time ? time.getHours() : d.getHours(),
    m: time ? time.getMinutes() : d.getMinutes(),
    s: time ? time.getSeconds() : d.getSeconds(),
  });
}

// Just formatting to ISO string. Keep actual date and time values
function _formatDateForRequest(dateStr) {
  const isoDate = dateStr.toISOString();

  return `${isoDate.slice(0, -1)}+0000`;
}
