import qs from 'query-string';
import api from 'utils/api';
import endpoints from 'configs/endpoints';
import reporter from 'utils/reports';
import { setLoader } from './loaderActions';
import { setErrorMessage } from './configuratorActions';
import {
  getSavedReportData,
  getSelectedFields,
  getAvailableFields,
} from '../reducer';
import {
  prepareDataForReport,
  getReportParams,
} from '../utils/prepareReport';
import getPeriods from '../utils/periods';
import getVehiclesForReport from '../utils/reportVehicles';

export const REPORT_DATA_SAVE = 'portal/Report/REPORT_DATA_SAVE';
export const REPORT_DATA_REMOVE = 'portal/Report/REPORT_DATA_REMOVE';

export const generateReport = params => (dispatch, getState) =>
  _generateReport(params, dispatch, getState);
export const saveGenerated = () => _saveGenerated;
export const removeReportData = () => ({
  type: REPORT_DATA_REMOVE,
});

function _generateReport({ timePeriod, frequency, dateFormat }, dispatch, getState) {
  dispatch(setLoader(true));
  dispatch(removeReportData());

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
      dispatch(setLoader(false));
      dispatch(_saveReportData(table));
    })
    .catch(e => {
      if (e && e.response && e.response.status === 500) {
        dispatch(setLoader(false));
        dispatch(setErrorMessage('Server error'));
      }
    });
}

function _saveGenerated(dispatch, getState) {
  const reportData = getSavedReportData(getState()).toArray();
  const headers = _getHeaders(getState());

  return reporter(reportData, headers);
}

const _saveReportData = (reportData) => ({
  type: REPORT_DATA_SAVE,
  reportData,
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
  const selectedReports = getSelectedFields(state).toArray();
  const availableFields = getAvailableFields(state).toArray();
  const result = {};

  selectedReports.forEach(i => {
    result[availableFields[i].reportType] = availableFields[i];
  });

  return result;
}

function _getHeaders(state) {
  const selectedReports = getSelectedFields(state).toArray();
  const availableFields = getAvailableFields(state).toArray();
  const result = [];

  selectedReports.forEach((index) => {
    result.push(availableFields[index].label);
  });

  return result;
}
