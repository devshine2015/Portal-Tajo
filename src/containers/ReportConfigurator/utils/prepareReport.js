import moment from 'moment';

export const prepareDataForReport = (selectedReports = {}, periods = [], frequency) =>
  (reports = {}) => {
    const result = [];
    const selectedTypes = Object.keys(selectedReports);
    const filteredTypesByDomain = {};
    const format = frequency === 'daily' ? 'L' : 'L LTS';

    for (let i = 0; i < selectedTypes.length; i++) {
      const domain = selectedReports[selectedTypes[i]].domain;

      if (filteredTypesByDomain[domain]) continue;

      filteredTypesByDomain[domain] = selectedReports[selectedTypes[i]];
    }

    let rowNumber = 0;
    let totalRowsCount = 0;
    let maxRowsCount = 0;

    periods.forEach((period) => {
      Object.entries(reports).forEach(([domain, recordsForAllVehicles]) => {
        if (recordsForAllVehicles.length === 0) return;

        let filteredTypesToCalc = selectedTypes;

        rowNumber = totalRowsCount;

        if (typeof filteredTypesByDomain[domain].filterSimilar === 'function') {
          filteredTypesToCalc = filteredTypesByDomain[domain].filterSimilar(selectedTypes);
        }

        for (let i = 0; i < recordsForAllVehicles.length; i++, rowNumber++) {
          if (!result[rowNumber]) {
            result[rowNumber] = [];
            result[rowNumber].push(moment(period).format(format));
          }

          let recordsToCalc = recordsForAllVehicles[i];

          if (recordsForAllVehicles[i].hasOwnProperty('reportRecords')) {
            recordsToCalc = recordsForAllVehicles[i].reportRecords;
          }

          const calculatedRow = filteredTypesByDomain[domain].calc({
            period,
            frequency,
            records: recordsToCalc,
            selectedTypes: filteredTypesToCalc,
          });

          result[rowNumber] = result[rowNumber].concat(calculatedRow);
        }

        maxRowsCount = recordsForAllVehicles.length;
      });

      totalRowsCount += maxRowsCount;
    });

    return Promise.resolve(result);
  };

export const getReportParams = ({ fromTs, toTs } = {}, datesCount) => {
  const toPlusTs = _generateToDate(fromTs, toTs, datesCount);
  const offsetInMinutes = new Date().getTimezoneOffset();
  const offsetInMilliseconds = 1000 * 60 * offsetInMinutes;

  const toFormatted = _formateDate(toPlusTs, offsetInMilliseconds);
  const fromFormatted = _formateDate(fromTs);

  return `from=${fromFormatted}&to=${toFormatted}&tzoffset=${0}`;
};

// Just formatting to ISO string. Keep actual date and time values
function _formateDate(dateTs, offsetInMilliseconds = 0) {
  const dateISO = new Date(dateTs - offsetInMilliseconds).toISOString();

  return `${dateISO.slice(0, -1)}+0000`;
}

function _generateToDate(fromTs, toTs, daysCount) {
  let result;

  if (daysCount === 1) {
    result = new Date(fromTs);
    result.setHours(23);
    result.setMinutes(59);
    result.setSeconds(59);
  } else {
    // add one second to count day amount
    result = new Date(toTs);
    result.setSeconds(1);
  }

  return result.getTime();
}
