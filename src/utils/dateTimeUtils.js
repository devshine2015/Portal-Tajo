import moment from 'moment';

export const makeDefaultDatePeriod = () => {
  const defaultStartDate = moment().subtract(1, 'days').toDate();

  return {
    startDate: defaultStartDate,
    startTime: _makeStartTime(),
    endDate: defaultStartDate,
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

export const makeTimeRangeParams = ({
  startDate,
  endDate = undefined,
  startTime = undefined,
  endTime = undefined,
} = { ...makeDefaultDatePeriod() }) => {
  const endD = endDate || startDate;

  const fromFormatted = _formateDateForRequest(startDate, startTime);
  const toFormatted = _formateDateForRequest(endD, endTime);

  return {
    from: fromFormatted,
    to: toFormatted,
  };
};

// Just formatting to ISO string. Keep actual date and time values
function _formateDateForRequest(date, time) {
  const d = moment.isMoment(date) ? date.toDate() : date;

  const result = moment({
    y: d.getFullYear(),
    M: d.getMonth(),
    d: d.getDate(),
    h: time ? time.getHours() : '00',
    m: time ? time.getMinutes() : '00',
    s: time ? time.getSeconds() : '00',
  }).toISOString();

  return `${result.slice(0, -1)}+0000`;
}
