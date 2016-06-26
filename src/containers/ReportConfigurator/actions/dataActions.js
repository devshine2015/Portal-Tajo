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

function _generateReport({ timePeriod, isOneDay, fleet }, dispatch, getState) {
  dispatch(setLoader(true));
  dispatch(removeReportData());

  const baseVehiclesUrl = `${fleet}/vehicles`;
  const { daysCount, periodQueryString } = getReportParams(timePeriod, isOneDay);
  const selectedReports = getSelectedReportsTypes(getState);
  let vehicles = [];

  return api(baseVehiclesUrl)
    .then(toJson)
    .then(vs => {
      vehicles = vs;

      return Promise.all(
        selectedReports.filter(sr => sr.hasOwnProperty('endpoint'))
        .map(({ reportType, query = '', endpoint = '' }) => (
          _reportRequest(baseVehiclesUrl, vehicles, {
            reportType,
            endpoint,
            queryString: `${periodQueryString}&${query}`,
          })
        )),
      ).then(reports => {
        const result = { vehicles };

        reports.forEach(r => {
          result[r.reportType] = r.report;
        });

        return result;
      });
    })
    // .then(reports => ({
    //   vehiclesCount: vehicles.length,
    //   reports,
    //   daysCount,
    // }))
    .then(prepareDataForReport(selectedReports))
    // .then(reporter.prepareDataForReport)
    // .then(reporter.createReport)
    // .then(vehiclesReportData => {
    //   dispatch(_saveReportData(vehiclesReportData));
    //   dispatch(setLoader(false));
    // })
    .catch(error => {
      dispatch(setLoader(false));
      console.error(error);
    });
}

const prepareDataForReport = (selectedReports = []) => (reports = {}) => {
  const result = {};

  selectedReports.forEach(sr => {
    result[sr.reportType] = sr.calc(reports[sr.reportType]);
  });

  console.log(result);
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
  const selectedReports = getSelectedFields(getState()).toArray();
  const availableFields = getAvailableFields(getState()).toArray();
  const result = [];

  selectedReports.forEach(sr => {
    result.push({
      ...availableFields[sr],
    });
  });

  return result;
}
