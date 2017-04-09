import moment from 'moment';
import { mwaCountJobsForVehicle } from 'services/MWA/actions';

export const prepareDataForReport = (
  selectedReports = {}, periods = [], frequency, dateFormat
) =>
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

      Object.entries(reports).forEach(([domain, domainData]) => {
        if (domainData.customReportKind === undefined) {
          const recordsForAllVehicles = domainData;
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
              dateFormat,
              calculate: filteredTypesByDomain[domain].calc,
              record: recordsForAllVehicles[i],
            });

            result[rowNumber] = result[rowNumber].concat(column);
          }

          maxRowsCount = recordsForAllVehicles.length;
        } else if (domainData.customReportKind === 'mwa') {
          // MWA case ---------
          rowNumber = totalRowsCount;

          domainData.vehicles.forEach(aVeh => {
            if (!result[rowNumber]) {
              result[rowNumber] = [];
            }
            const column = {
              order: 2,
              value: mwaCountJobsForVehicle(aVeh.id, domainData[0].RESULTS),
            };

            result[rowNumber] = result[rowNumber].concat(column);
            ++rowNumber;
          });
        }
      });

      // second pass - here we add multiLine per vehicle - depending on jobs count
      // Object.entries(reports).forEach(([domain, domainData]) => {
      //   if (domainData.customReportKind === 'mwaTime') {
      //       // MWA case ---------
      //     rowNumber = totalRowsCount;

      //     domainData.vehicles.forEach(aVeh => {
      //       if (!result[rowNumber]) {
      //         result[rowNumber] = [];
      //       }
      //       const column = {
      //         order: 2,
      //         value: 'DUBL',
      //       };

      //       result[rowNumber] = result[rowNumber].concat(column);
      //       result.splice(rowNumber, 0, result[rowNumber]);
      //       ++rowNumber;
      //       ++rowNumber;
      //     });
      //   }
      // });

      totalRowsCount += maxRowsCount;
    });
    // sort columns in rows
    // accordingly to order property
    for (let k = 0; k < result.length; k++) {
      const sortedRow = result[k]
                         .sort((x, y) => x.order - y.order)
                         .map(obj => obj.value);

      result[k] = sortedRow;
    }

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

  return {
    from: fromFormatted,
    to: toFormatted,
  };
};

function _calculateColumn({
  filteredTypesToCalc,
  calculate,
  frequency,
  period,
  record,
  dateFormat,
}) {
  let recordsToCalc = record;

  if (record.hasOwnProperty('reportRecords')) {
    recordsToCalc = record.reportRecords;
  }

  return calculate(recordsToCalc, {
    frequency,
    period,
    dateFormat,
    selectedTypes: filteredTypesToCalc,
  });
}

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
