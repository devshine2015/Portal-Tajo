import moment from 'moment';
import {
  api,
  reporter,
} from 'utils';
import getReportParams from 'utils/reports/formatPeriodURL';
import { setLoader } from './loaderActions';
import {
  getSavedReportData,
  getSelectedFields,
  getAvailableFields,
} from '../reducer';

export const REPORT_DATA_SAVE = 'portal/ReportConfigurator/REPORT_DATA_SAVE';
export const REPORT_DATA_REMOVE = 'portal/ReportConfigurator/REPORT_DATA_REMOVE';

export const generateReport = (params) => (dispatch, getState) =>
  _generateReport(params, dispatch, getState);
export const saveGenerated = () => (dispatch, getState) =>
  _saveGenerated(dispatch, getState);
export const removeReportData = () => ({
  type: REPORT_DATA_REMOVE,
});

// TODO -- save report on disk
// TODO -- don't perform requests with same endpoint (i.e. for temperature)
// TODO -- make similar calculations in single loop (i.e. min/max/avg temperature)

function _generateReport({ timePeriod, fleet }, dispatch, getState) {
  dispatch(setLoader(true));
  dispatch(removeReportData());

  const baseVehiclesUrl = `${fleet}/vehicles`;
  const dates = _getDates(timePeriod);
  const periodQueryString = getReportParams(timePeriod, dates.length);
  const selectedReports = getSelectedReportsTypes(getState);

  return api(baseVehiclesUrl)
    .then(toJson)
    .then(vehicles => (
      Promise.all(
        Object.values(selectedReports).filter(sr => sr.hasOwnProperty('endpoint'))
        .map(({ reportType, query = '', endpoint = '' }) => (
          _reportRequest(baseVehiclesUrl, vehicles, {
            reportType,
            endpoint,
            queryString: `${periodQueryString}&${query}`,
          })
        )),
      ).then(reports => {
        const result = {};

        reports.forEach(r => {
          result[r.reportType] = r.report;
        });

        return result;
      })
    ))
    .then(prepareDataForReport(selectedReports, dates))
    .then(_createReportTable)
    .then(table => {
      dispatch(setLoader(false));
      dispatch(_saveReportData(table));
    });
}

const prepareDataForReport = (selectedReports = {}, dates = []) => (reports = {}) => {
  const result = [];

  console.time('time');
  dates.forEach((date, i) => {
    const row = result[i] = [];
    row.push(date);
    Object.entries(reports).forEach(([reportType, records]) => {
      row.push(selectedReports[reportType].calc(records, date));
    });
  });
  console.timeEnd('time');
  // const calculated = [];
  return Promise.resolve(result);
};

function _saveGenerated(dispatch, getState) {
  const reportData = getSavedReportData(getState()).toArray();

  return reporter.createReport(reportData);
}

const _saveReportData = (reportData) => ({
  type: REPORT_DATA_SAVE,
  reportData,
});

function _reportRequest(baseVehiclesUrl, vehicles = [], {
  endpoint,
  reportType,
  queryString,
} = {}) {
  const pathname = `report/${endpoint}`;

  console.log(reportType);

  return Promise.all(
    vehicles.map(v => (
      api(`${baseVehiclesUrl}/${v.id}/${pathname}?${queryString}`)
      .then(toJson)
    )),
  ).then(res => ({
    reportType,
    report: res,
  }));
}

function toJson(response) {
  return response.json();
}

function getSelectedReportsTypes(getState) {
  const selectedReportsIndexes = getSelectedFields(getState()).toArray();
  const availableFields = getAvailableFields(getState()).toArray();
  const result = {};

  availableFields.forEach((field, i) => {
    if (selectedReportsIndexes.indexOf(i) === -1) return;

    result[field.reportType] = field;
  });

  return result;
}

// compose array of dates presented in period fromTs to toTs
// toTs equeal fromTs if not defined in UI
// result = ['MM/DD/YYYY']
function _getDates({ fromTs, toTs }) {
  const momentFrom = moment(fromTs);
  const momentTo = moment(toTs);
  const daysCount = momentTo.diff(momentFrom, 'days') + 1;
  const dates = [momentFrom.toISOString()];

  if (daysCount !== 1) {
    for (let i = 0; i < daysCount; i++) {
      momentFrom.add(1, 'days');

      if (momentFrom.isBefore(momentTo)) {
        dates.push(momentFrom.toISOString());
      } else if (momentFrom.isSame(momentTo)) {
        dates.push(momentFrom.toISOString());
        break;
      }
    }
  }

  return dates;
}

function _createReportTable(reportData) {
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
}

function _createHeaders(selectedReports) {
  return Object.values(selectedReports).map(sr => ({
    label: sr.label,
  }));
}
