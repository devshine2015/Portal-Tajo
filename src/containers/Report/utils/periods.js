import moment from 'moment';

// compose array of dates presented in period start to end
// result = [<date_as_ISO_string>]
function _getPeriods({
  startDate,
  endDate = undefined,
  startTime = undefined,
  endTime = undefined,
}, frequency = undefined) {
  const supportMultiPeriods = frequency !== undefined;
  const periods = [];
  let momentFrom;
  let momentTo;

  if (startTime) {
    momentFrom = _setTime(startDate, startTime);
  } else {
    momentFrom = moment(startDate);
  }

  if (endDate && endTime) {
    momentTo = _setTime(endDate, endTime);
  } else if (endDate) {
    momentTo = moment(endDate);
  } else if (endTime) {
    momentTo = _setTime(endDate, endTime);
  } else {
    momentTo = moment(startDate);
  }

  periods.push(momentFrom);

  if (supportMultiPeriods) {
    const counter = moment(momentFrom);
    const differ = frequency === 'daily' ? 'days' : 'hours';
    // because 01.00 AM.diff(00.00, 'hours') === 0
    // or 30.06.diff(29.06, 'days') === 0
    const periodsCount = momentTo.diff(momentFrom, differ) + 1;

    if (periodsCount !== 1) {
      for (let i = 0; i < periodsCount; i++) {
        const next = moment(counter.add(1, differ));
        const isBetween = next.isBetween(momentFrom, momentTo, null, '(]');

        if (isBetween) {
          periods.push(next);
        }
      }

      periods[periods.length - 1] = momentTo;
    }
  } else {
    periods.push(momentTo);
  }

  return periods;
}

function _setTime(date, time) {
  const d = moment(date);

  return d.set({
    hour: time.getHours(),
    minute: time.getMinutes(),
    second: time.getSeconds(),
  });
}

export default _getPeriods;
