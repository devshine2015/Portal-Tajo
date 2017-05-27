import moment from 'moment';

/**
 * @param {Object} time range
 * @param {Date} fromDate - start of the period
 * @param {Date} toDate - end of the period
 * @param {String} frequency - DEPRECATED
 * @return {Array} array of Moment dates presented in period start to end
 */
export default function ({
  fromDate,
  toDate,
}, frequency = undefined) {
  const supportMultiPeriods = frequency !== undefined;
  const periods = [];
  const momentFrom = moment(fromDate);
  const momentTo = moment(toDate);

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
