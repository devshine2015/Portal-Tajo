import qs from 'query-string';
import { api } from 'utils/api';
import endpoints from 'configs/endpoints';
import reporter from 'utils/reports';
import { makeTimeRangeParams } from 'utils/dateTimeUtils';
import fetchJobsCall from 'services/MWA/helpers';
import {
  getSavedReportData,
  getSavedReportSecondaryData,
  getSelectedReports,
  getAvailableReports,
} from '../reducer';
import { prepareDataForReport } from '../utils/prepareReport';
import getPeriods from '../utils/periods';
import getVehiclesForReport from '../utils/reportVehicles';

export const REPORT_DATA_SAVE = 'portal/Report/REPORT_DATA_SAVE';
export const REPORT_DATA_REMOVE = 'portal/Report/REPORT_DATA_REMOVE';
export const REPORT_BEFORE_GENERATING = 'portal/Report/REPORT_BEFORE_GENERATING';
export const REPORT_GENERATING_SUCCESS = 'portal/Report/REPORT_GENERATING_SUCCESS';
export const REPORT_GENERATING_FAILURE = 'portal/Report/REPORT_GENERATING_FAILURE';
export const REPORT_SELECTED_ADD = 'portal/Report/REPORT_SELECTED_ADD';
export const REPORT_SELECTED_REMOVE = 'portal/Report/REPORT_SELECTED_REMOVE';
export const REPORT_SET_MWA = 'portal/Report/SET_MWA';

export const setReportsMWA = () => ({
  type: REPORT_SET_MWA,
});

export const generateReport = params => (dispatch, getState) =>
  _generateReport(params, dispatch, getState);
export const saveGenerated = translator => (dispatch, getState) => _saveGenerated(translator, dispatch, getState);
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
  const periodParams = makeTimeRangeParams(timePeriod.fromDate, timePeriod.toDate);
  const selectedReports = getSelectedReportsTypes(getState());
  const vehicles = getVehiclesForReport(getState());

  const fieldsToCall = {};

  Object.values(selectedReports)
    .filter(sr => Object.hasOwnProperty.call(sr, 'endpoint'))
    .forEach((ff) => {
      if (!fieldsToCall[ff.endpoint]) {
        fieldsToCall[ff.endpoint] = ff;
      }
    });

  return Promise.all(
    Object.values(fieldsToCall)
      .map(({ domain, query = {}, endpoint = '', customReportKind = undefined, customReportGenerator = undefined }) => (
        _reportRequest(vehicles, {
          domain,
          endpoint,
          customReportKind,
          customReportGenerator,
          timePeriod,
          queryString: `${qs.stringify(periodParams)}&${qs.stringify(query)}`,
        })
      )),
  )
    .then((reports = []) => {
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
       */
      Object.values(selectedReports).forEach(({ domain }) => {
        if (domain === 'base' && !result[domain]) {
          result[domain] = vehicles;
        }

        reports.forEach((r) => {
          if (r.domain === domain) {
            result[domain] = r.report;
            if (r.customReportKind !== undefined) {
              result[domain].customReportKind = r.customReportKind;
              result[domain].customReportGenerator = r.customReportGenerator;
              result[domain].vehicles = vehicles;
            }
          }
        });
      });


      return result;
    })
    .then(prepareDataForReport(selectedReports, periods, frequency, dateFormat))
    .then((generatedTables) => {
      dispatch(_generatingSuccess(generatedTables));
    })
    .catch((e) => {
      if (e && e.response && e.response.status === 500) {
        dispatch(_generatingFail('Server error'));
      }
      console.error(e);
    });
}

function _saveGenerated(translator, dispatch, getState) {
  const reportData = getSavedReportData(getState()).toArray();
  const headers = _getHeaders(translator, getState(), false);

  const reportSecondaryData = getSavedReportSecondaryData(getState()).toArray();
  const headersSecondary = _getHeaders(translator, getState(), true);

  reporter(reportData, headers, { fileName: 'CustomReport' });
  if (reportSecondaryData.length > 0) {
    reporter(reportSecondaryData, headersSecondary, { fileName: 'PipeSizeReport' });
  }
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
  // custom query needs peroidParam
  customReportKind,
  customReportGenerator,
  timePeriod,
  domain,
  queryString,
} = {}) {
  let requestsToResolve = [];
  if (customReportKind === 'mwa'
  || customReportKind === 'mwaTime'
  || customReportKind === 'mwaSizeNbr') {
    requestsToResolve = [fetchJobsCall({
      fromDate: timePeriod.fromDate,
      toDate: timePeriod.toDate,
    })];
  } else {
    requestsToResolve = vehicles.map((v) => {
      const url = `${endpoints.getVehicle(v.id).url}/${endpoint}?${queryString}`;
      return withTimeout(10000, api.get(url)).then(toJson);
    });
  }
  return Promise.all(
    requestsToResolve,
  ).then(res => ({
    domain,
    customReportKind,
    customReportGenerator,
    report: res,
  }));
}

function toJson(response) {
  return response.json && typeof response.json === 'function' ? response.json() : response;
}

function getSelectedReportsTypes(state) {
  const selectedReports = getSelectedReports(state).toArray();
  const availableFields = getAvailableReports(state).toArray();
  const result = {};

  selectedReports.forEach((i) => {
    result[availableFields[i].reportType] = availableFields[i];
  });

  return result;
}

function _getHeaders(translator, state, useSecondary) {
  return getHeaders(translator, getSelectedReports(state).toArray(),
    getAvailableReports(state).toArray(), useSecondary);
}

export function getHeaders(translator, selectedReports, availableFields, useSecondary) {
  const result = [];

  selectedReports.forEach((index) => {
    const isSecondary = availableFields[index].isSecondary === true;
    if (isSecondary === useSecondary) {
      if (availableFields[index].multiLabel !== undefined) {
        result.push(...(availableFields[index].multiLabel.map(
          lbl => translator.getTranslation(lbl))));
      } else {
        result.push(translator.getTranslation(availableFields[index].name));
      }
    }
  });

  return result;
}

function withTimeout(ms, promise) {
  return new Promise((resolve) => {
    const timeoutId = setTimeout(() => {
      resolve('error while fetching data');
    }, ms);

    promise.then((res) => {
      clearTimeout(timeoutId);
      resolve(res);
    });
  });
}
