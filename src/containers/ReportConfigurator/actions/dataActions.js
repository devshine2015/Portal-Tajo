import moment from 'moment';
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
  const { periods, daysCount } = _getPeriods(timePeriod, frequency);
  const periodQueryString = getReportParams(timePeriod, daysCount);
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
        .map(({ domain, query = '', endpoint = '' }) => (
          _reportRequest(baseVehiclesUrl, vehicles, {
            domain,
            endpoint,
            queryString: `${periodQueryString}&${query}`,
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
  const headers = ['Date'].concat(_getHeaders(getState));

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
  const pathname = `report/${endpoint}`;

  return Promise.all(
    vehicles.map(v => (
      api(`${baseVehiclesUrl}/${v.id}/${pathname}?${queryString}`)
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

// compose array of dates presented in period fromTs to toTs
// result = [<date_as_ISO_string>]
function _getPeriods({ fromTs, toTs }, frequency) {
  const differ = frequency === 'daily' ? 'days' : 'hours';
  const momentFrom = moment(fromTs);
  const momentTo = toTs === undefined ? moment(fromTs) : moment(toTs);

  momentTo.add(1, 'days');

  const periodsCount = momentTo.diff(momentFrom, differ);
  const daysCount = momentTo.diff(momentFrom, 'days');
  const periods = [momentFrom.toISOString()];

  if (periodsCount !== 1) {
    for (let i = 0; i < periodsCount; i++) {
      momentFrom.add(1, differ);

      if (momentFrom.isBefore(momentTo)) {
        periods.push(momentFrom.toISOString());
      }
    }
  }

  return {
    periods,
    daysCount,
  };
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
