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
  createReportTable,
  getReportParams,
} from '../utils/prepareReport';

export const REPORT_DATA_SAVE = 'portal/ReportConfigurator/REPORT_DATA_SAVE';
export const REPORT_DATA_REMOVE = 'portal/ReportConfigurator/REPORT_DATA_REMOVE';

export const generateReport = (params) => (dispatch, getState) =>
  _generateReport(params, dispatch, getState);
export const saveGenerated = () => (dispatch, getState) =>
  _saveGenerated(dispatch, getState);

// TODO -- don't perform requests with same endpoint (i.e. for temperature)
// TODO -- make configuratorAvailableFields truly flexible

function _generateReport({ timePeriod, fleet }, dispatch, getState) {
  dispatch(setLoader(true));
  dispatch(_removeReportData());

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
        ))
      ).then((reports = []) => {
        const result = {};

        // we need to inject all data
        // user chose to result
        Object.keys(selectedReports).forEach(reportType => {
          if (reportType === 'vehicles' || reportType === 'license') {
            result[reportType] = vehicles;
          }
        });

        reports.forEach(r => {
          if (!selectedReports[r.reportType]) return;

          result[r.reportType] = r.report;
        });

        return result;
      })
    ))
    .then(prepareDataForReport(selectedReports, dates))
    .then(createReportTable)
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
  reportType,
  queryString,
} = {}) {
  const pathname = `report/${endpoint}`;

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

function _getHeaders(getState) {
  const selectedReportsIndexes = getSelectedFields(getState()).toArray();
  const availableFields = getAvailableFields(getState()).toArray();
  const result = [];

  selectedReportsIndexes.forEach((index) => {
    result.push(availableFields[index].label);
  });

  return result;
}
