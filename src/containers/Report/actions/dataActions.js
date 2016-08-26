import moment from 'moment';
import qs from 'query-string';
import api from 'utils/api';
import reporter from 'utils/reports';
import { setLoader } from './loaderActions';
import {
  getSavedReportData,
  getSelectedFields,
  getAvailableFields,
  getIsFiltering,
  getSelectedVehicles,
} from '../reducer';
import { getFleetName, getAuthenticationSession } from 'containers/App/reducer';
import { getVehiclesEx } from 'services/FleetModel/reducer';
import {
  prepareDataForReport,
  getReportParams,
} from '../utils/prepareReport';

export const REPORT_DATA_SAVE = 'portal/Report/REPORT_DATA_SAVE';
export const REPORT_DATA_REMOVE = 'portal/Report/REPORT_DATA_REMOVE';

export const generateReport = (params) => (dispatch, getState) =>
  _generateReport(params, dispatch, getState);
export const saveGenerated = () => (dispatch, getState) =>
  _saveGenerated(dispatch, getState);
export const removeReportData = () => ({
  type: REPORT_DATA_REMOVE,
});

// TODO -- make configuratorAvailableFields truly flexible (depends on screen)

function _generateReport({ timePeriod, frequency }, dispatch, getState) {
  dispatch(setLoader(true));
  dispatch(removeReportData());

  const fleet = getFleetName(getState());
  const baseVehiclesUrl = `${fleet}/vehicles`;
  const periods = _getPeriods(timePeriod, frequency);
  const periodQueryString = getReportParams(timePeriod);
  const selectedReports = getSelectedReportsTypes(getState());
  const vehicles = _getVehiclesForReport(getState());

  const fieldsToCall = {};
  const sessionId = getAuthenticationSession(getState());
  const optionalHeaders = {
    ['DRVR-SESSION']: sessionId,
  };

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
        _reportRequest(baseVehiclesUrl, vehicles, optionalHeaders, {
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

        reports.forEach(r => {
          if (r.domain === domain) {
            result[domain] = r.report;
          }
        });
      });


      return result;
    }).then(prepareDataForReport(selectedReports, periods, frequency))
    .then(table => {
      dispatch(setLoader(false));
      dispatch(_saveReportData(table));
    });
}

function _getVehiclesForReport(state) {
  const selectedVehicles = getSelectedVehicles(state).toArray();
  const vehicles = getVehiclesEx(state);
  const isFiltering = getIsFiltering(state);

  const takeSelected = () => vehicles.filter(v => selectedVehicles.indexOf(v.id) !== -1);
  const takeFiltered = () => vehicles.filter(v => !v.filteredOut);
  const takeFilteredAndSelected = () => vehicles.filter(v => (
    selectedVehicles.indexOf(v.id) !== -1 && !v.filteredOut
  ));

  let vehiclesToReport = [];

  // take only selected from filtered vehicles
  if (isFiltering && selectedVehicles.length) {
    vehiclesToReport = takeFilteredAndSelected();
  } else if (!isFiltering && selectedVehicles.length) {
  // take only selected vehicles
    vehiclesToReport = takeSelected();
  }

  // take filtered
  if (vehiclesToReport.length === 0) {
    vehiclesToReport = takeFiltered();
  }

  return vehiclesToReport;
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

function _reportRequest(baseVehiclesUrl, vehicles = [], optionalHeaders, {
  endpoint,
  domain,
  queryString,
} = {}) {
  return Promise.all(
    vehicles.map(v => {
      const url = `${baseVehiclesUrl}/${v.id}/${endpoint}?${queryString}`;
      return api(url, { optionalHeaders })
        .then(toJson);
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
  const selectedReports = getSelectedFields(getState()).toArray();
  const availableFields = getAvailableFields(getState()).toArray();
  const result = [];

  selectedReports.forEach((index) => {
    result.push(availableFields[index].label);
  });

  return result;
}
