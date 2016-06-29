import moment from 'moment';

export const prepareDataForReport = (selectedReports = {}, dates = []) =>
  (reports = {}) => {
    const result = [];

    console.time('time');

    dates.forEach((date, i) => {
      const row = result[i] = [];

      row.push(date);

      Object.entries(reports).forEach(([reportType, records]) => {
        row.push(selectedReports[reportType].calc({ records, date }));
      });

      result.push(row);
    });

    console.timeEnd('time');

    return Promise.resolve(result);
  };

/**
 *
 * reportData = [[date, <mileage_data>, <minTemp_data>, ...], [date, ...], ...]
 *
 **/

export const createReportTable = (reportData) => {
  const table = [];
  let totalRowsCount = 0;
  let maxRowsCount = 0;

  for (let i = 0; i < reportData.length; i++) {
    const columns = reportData[i];
    const date = columns[0];
    let rowNumber = totalRowsCount;

    // start with column next to dates
    for (let k = 1; k < columns.length; k++) {
      const dataType = columns[k];

      for (let j = 0; j < dataType.length; j++, rowNumber++) {
        // create new if such row not exists
        if (!table[rowNumber]) {
          table[rowNumber] = [];
          table[rowNumber][0] = moment(date).format('L');
        }

        // place report value to table
        table[rowNumber][k] = dataType[j];
      }

      // save maximum rows count from each report
      maxRowsCount = dataType.length > maxRowsCount ? dataType.length : maxRowsCount;
      // reset rows for current date
      rowNumber = totalRowsCount;
    }

    // increase table count for start looping over next day
    // i.e. next day data will start from this row number;
    totalRowsCount += maxRowsCount;
  }

  return Promise.resolve(table);
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
