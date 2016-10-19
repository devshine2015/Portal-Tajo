import qs from 'query-string';
import api from 'utils/api';
import endpoints from 'configs/endpoints';
import reporter from 'utils/reports';
import {
  getSavedReportData,
  getSelectedReports,
  getAvailableReports,
} from '../reducer';
import {
  prepareDataForReport,
  getReportParams,
} from '../utils/prepareReport';
import getPeriods from '../utils/periods';
import getVehiclesForReport from '../utils/reportVehicles';

export const REPORT_DATA_SAVE = 'portal/Report/REPORT_DATA_SAVE';
export const REPORT_DATA_REMOVE = 'portal/Report/REPORT_DATA_REMOVE';
export const REPORT_BEFORE_GENERATING = 'portal/Report/REPORT_BEFORE_GENERATING';
export const REPORT_GENERATING_SUCCESS = 'portal/Report/REPORT_GENERATING_SUCCESS';
export const REPORT_GENERATING_FAILURE = 'portal/Report/REPORT_GENERATING_FAILURE';
export const REPORT_SELECTED_ADD = 'portal/Report/REPORT_SELECTED_ADD';
export const REPORT_SELECTED_REMOVE = 'portal/Report/REPORT_SELECTED_REMOVE';

export const generateReport = params => (dispatch, getState) =>
  _generateReport(params, dispatch, getState);
export const saveGenerated = () => _saveGenerated;
export const removeReportData = () => ({
  type: REPORT_DATA_REMOVE,
});
export const addSelectedReport = index => ({
  type: REPORT_SELECTED_ADD,
  index,
});

export const removeSelectedReport = index => ({
  type: REPORT_SELECTED_REMOVE,
  index,
});

function _generateReport({ timePeriod, frequency, dateFormat }, dispatch, getState) {
  dispatch(_beforeGenerating());

  const periods = getPeriods(timePeriod, frequency);
  const periodParams = getReportParams(timePeriod);
  const selectedReports = getSelectedReportsTypes(getState());
  const vehicles = getVehiclesForReport(getState());

  const fieldsToCall = {};

  Object.values(selectedReports)
    .filter(sr => sr.hasOwnProperty('endpoint'))
    .forEach((ff) => {
      if (!fieldsToCall[ff.endpoint]) {
        fieldsToCall[ff.endpoint] = ff;
      }
    });

  return Promise.all(
    Object.values(fieldsToCall)
      .map(({ domain, query = {}, endpoint = '' }) => (
        _reportRequest(vehicles, {
          domain,
          endpoint,
          queryString: `${qs.stringify(periodParams)}&${qs.stringify(query)}`,
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

        reports.forEach(r => {
          if (r.domain === domain) {
            result[domain] = r.report;
          }
        });
      });


      return result;
    })
    .then(prepareDataForReport(selectedReports, periods, frequency, dateFormat))
    .then(table => {
      dispatch(_generatingSuccess(table));
    })
    .catch(e => {
      if (e && e.response && e.response.status === 500) {
        dispatch(_generatingFail('Server error'));
      }
      console.error(e);
    });
}

function _saveGenerated(dispatch, getState) {
  const reportData = getSavedReportData(getState()).toArray();
  const headers = _getHeaders(getState());

  return reporter(reportData, headers);
}

const _beforeGenerating = () => ({
  type: REPORT_BEFORE_GENERATING,
});

const _generatingSuccess = reportData => ({
  type: REPORT_GENERATING_SUCCESS,
  reportData,
});

const _generatingFail = errorMessage => ({
  type: REPORT_GENERATING_FAILURE,
  message: errorMessage,
});


function _reportRequest(vehicles = [], {
  endpoint,
  domain,
  queryString,
} = {}) {
  return Promise.all(
    vehicles.map(v => {
      const url = `${endpoints.getVehicle(v.id).url}/${endpoint}?${queryString}`;

      return api.get(url).then(toJson);
    }),
  ).then(res => ({
    domain,
    report: res,
  }));
}

function toJson(response) {
  return response.json();
}

function getSelectedReportsTypes(state) {
  const selectedReports = getSelectedReports(state).toArray();
  const availableFields = getAvailableReports(state).toArray();
  const result = {};

  selectedReports.forEach(i => {
    result[availableFields[i].reportType] = availableFields[i];
  });

  return result;
}

function _getHeaders(state) {
  const selectedReports = getSelectedReports(state).toArray();
  const availableFields = getAvailableReports(state).toArray();
  const result = [];

  selectedReports.forEach((index) => {
    result.push(availableFields[index].label);
  });

  return result;
}

