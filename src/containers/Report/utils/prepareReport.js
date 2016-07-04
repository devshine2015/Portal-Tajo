import moment from 'moment';

export const prepareDataForReport = (selectedReports = {}, periods = [], frequency) =>
  (reports = {}) => {
    const result = [];
    const selectedTypes = Object.keys(selectedReports);
    const filteredTypesByDomain = {};

    for (let i = 0; i < selectedTypes.length; i++) {
      const domain = selectedReports[selectedTypes[i]].domain;

      if (filteredTypesByDomain[domain]) continue;

      filteredTypesByDomain[domain] = selectedReports[selectedTypes[i]];
    }

    let rowNumber = 0;
    let totalRowsCount = 0;
    let maxRowsCount = 0;

    periods.forEach((momentDate, j, a) => {
      const isLastDate = j === a.length - 1;

      // don't calculate for last period
      // if splitting not defined (frequency == undefined)
      if (!frequency && isLastDate) return;

      const period = {};

      if (!isLastDate) {
        period.start = momentDate;
        period.end = a[j + 1];
      } else {
        period.start = a[j - 1];
        period.end = momentDate;
      }

      Object.entries(reports).forEach(([domain, recordsForAllVehicles]) => {
        if (recordsForAllVehicles.length === 0) return;

        rowNumber = totalRowsCount;

        let filteredTypesToCalc = selectedTypes;

        if (typeof filteredTypesByDomain[domain].filterSimilar === 'function') {
          filteredTypesToCalc = filteredTypesByDomain[domain].filterSimilar(selectedTypes);
        }

        for (let i = 0; i < recordsForAllVehicles.length; i++, rowNumber++) {
          if (!result[rowNumber]) {
            result[rowNumber] = [];
          }

          const column = _calculateColumn({
            filteredTypesToCalc,
            frequency,
            period,
            calculate: filteredTypesByDomain[domain].calc,
            record: recordsForAllVehicles[i],
          });

          result[rowNumber] = result[rowNumber].concat(column);
        }

        maxRowsCount = recordsForAllVehicles.length;
      });

      totalRowsCount += maxRowsCount;
    });

    return Promise.resolve(result);
  };

export const getReportParams = ({
  start,
  end = undefined,
  startTime = undefined,
  endTime = undefined,
} = {}) => {
  const endDate = end || start;

  const fromFormatted = _formateDateForRequest(start, startTime);
  const toFormatted = _formateDateForRequest(endDate, endTime);

  return `from=${fromFormatted}&to=${toFormatted}&tzoffset=${0}`;
};

function _calculateColumn({
  filteredTypesToCalc,
  calculate,
  frequency,
  period,
  record,
}) {
  let recordsToCalc = record;

  if (record.hasOwnProperty('reportRecords')) {
    recordsToCalc = record.reportRecords;
  }

  return calculate(recordsToCalc, {
    frequency,
    period,
    selectedTypes: filteredTypesToCalc,
  });
}

// Just formatting to ISO string. Keep actual date and time values
function _formateDateForRequest(date, time) {
  const result = moment(date).utcOffset(0).set({
    hour: time.getHours(),
    minute: time.getMinutes(),
    second: time.getSeconds(),
  }).toISOString();
  return `${result.slice(0, -1)}+0000`;
}
