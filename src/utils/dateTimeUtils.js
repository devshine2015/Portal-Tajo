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
