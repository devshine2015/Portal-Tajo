import moment from 'moment';
import qs from 'query-string';
import api from 'utils/api';
import reporter from 'utils/reports';
import { setLoader } from './loaderActions';
import {
  getSavedReportData,
  getSelectedFields,
  getAvailableFields,
} from '../reducer';
import {
  prepareDataForReport,
  getReportParams,
} from '../utils/prepareReport';

export const REPORT_DATA_SAVE = 'portal/ReportConfigurator/REPORT_DATA_SAVE';
export const REPORT_DATA_REMOVE = 'portal/ReportConfigurator/REPORT_DATA_REMOVE';

export const generateReport = (params) => (dispatch, getState) =>
  _generateReport(params, dispatch, getState);
export const saveGenerated = () => (dispatch, getState) =>
  _saveGenerated(dispatch, getState);

// TODO -- make configuratorAvailableFields truly flexible (depends on screen)

function _generateReport({ timePeriod, fleet, frequency }, dispatch, getState) {
  dispatch(setLoader(true));
  dispatch(_removeReportData());

  const baseVehiclesUrl = `${fleet}/vehicles`;
  const periods = _getPeriods(timePeriod, frequency);
  const periodQueryString = getReportParams(timePeriod);
  const selectedReports = getSelectedReportsTypes(getState);
  const fieldsToCall = {};

  Object.values(selectedReports)
    .filter(sr => sr.hasOwnProperty('endpoint'))
    .forEach((ff) => {
      if (!fieldsToCall[ff.endpoint]) {
        fieldsToCall[ff.endpoint] = ff;
      }
    });

  return api(baseVehiclesUrl)
    .then(toJson)
    .then(vehicles => (
      Promise.all(
        Object.values(fieldsToCall)
        .map(({ domain, query = {}, endpoint = '' }) => (
          _reportRequest(baseVehiclesUrl, vehicles, {
            domain,
            endpoint,
            queryString: `${periodQueryString}&${qs.stringify(query)}`,
          })
        ))
      ).then((reports = []) => {
        const result = {};

        /**
         *
         * we need to inject all data
         * user chose for report
         *
         * and create report for each report type,
         * i.e. if needed minTemp and maxTemp in report
         * but _reportRequest was called only for firstOne,
         * then create maxTemp: [data] from its result
         *
         **/
        Object.values(selectedReports).forEach(({ domain }) => {
          if (domain === 'base' && !result[domain]) {
            result[domain] = vehicles;
          }
        });

        reports.forEach(r => {
          result[r.domain] = r.report;
        });

        return result;
      })
    ))
    .then(prepareDataForReport(selectedReports, periods, frequency))
    .then(table => {
      dispatch(setLoader(false));
      dispatch(_saveReportData(table));
    });
}

function _saveGenerated(dispatch, getState) {
  const reportData = getSavedReportData(getState()).toArray();
  const headers = _getHeaders(getState);

  return reporter(reportData, headers);
}

const _saveReportData = (reportData) => ({
  type: REPORT_DATA_SAVE,
  reportData,
});

const _removeReportData = () => ({
  type: REPORT_DATA_REMOVE,
});

function _reportRequest(baseVehiclesUrl, vehicles = [], {
  endpoint,
  domain,
  queryString,
} = {}) {
  return Promise.all(
    vehicles.map(v => (
      api(`${baseVehiclesUrl}/${v.id}/${endpoint}?${queryString}`)
      .then(toJson)
    )),
  ).then(res => ({
    domain,
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

// compose array of dates presented in period start to end
// result = [<date_as_ISO_string>]
function _getPeriods({
  start,
  end = undefined,
  startTime = undefined,
  endTime = undefined,
}, frequency) {
  const supportMultiPeriods = frequency !== undefined;
  const periods = [];
  let momentFrom;
  let momentTo;

  if (startTime) {
    momentFrom = _setTime(start, startTime);
  } else {
    momentFrom = moment(start);
  }

  if (end && endTime) {
    momentTo = _setTime(end, endTime);
  } else if (end) {
    momentTo = moment(momentFrom);
  } else if (endTime) {
    momentTo = _setTime(momentFrom, endTime);
  }

  periods.push(momentFrom);

  if (supportMultiPeriods) {
    const differ = frequency === 'daily' ? 'days' : 'hours';
    // because 01.00 AM.diff(00.00, 'hours') === 0
    // or 30.06.diff(29.06, 'days') === 0
    const periodsCount = momentTo.diff(momentFrom, differ) + 1;

    if (periodsCount !== 1) {
      for (let i = 0; i < periodsCount; i++) {
        momentFrom.add(1, differ);

        if (momentFrom.isBefore(momentTo)) {
          periods.push(momentFrom);
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

function _getHeaders(getState) {
  const selectedReportsIndexes = getSelectedFields(getState()).toArray();
  const availableFields = getAvailableFields(getState()).toArray();
  const result = [];

  selectedReportsIndexes.forEach((index) => {
    result.push(availableFields[index].label);
  });

  return result;
}
