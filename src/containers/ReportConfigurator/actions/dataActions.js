import {
  api,
  reporter,
} from 'utils';
import getReportParams from 'utils/reports/formatPeriodURL';
import { setLoader } from './loaderActions';
import { getSavedReportData } from '../reducer';

export const REPORT_DATA_SAVE = 'portal/ReportConfigurator/REPORT_DATA_SAVE';
export const REPORT_DATA_REMOVE = 'portal/ReportConfigurator/REPORT_DATA_REMOVE';

export const generateReport = (params) => (dispatch) =>
  _generateReport(params, dispatch);
export const saveGenerated = () => (dispatch, getState) =>
  _saveGenerated(dispatch, getState);
export const removeReportData = () => ({
  type: REPORT_DATA_REMOVE,
});

function _generateReport({ timePeriod, isOneDay, fleet }, dispatch) {
  dispatch(setLoader(true));
  dispatch(removeReportData());

  const baseVehiclesUrl = `${fleet}/vehicles`;
  const { daysCount, periodQueryString } = getReportParams(timePeriod, isOneDay);

  return api(baseVehiclesUrl)
    .then(toJson)
    .then(vehicles => (
      Promise.all([
        _reportRequest(baseVehiclesUrl, vehicles, {
          reportType: 'mileage',
          params: periodQueryString,
        }),
        _reportRequest(baseVehiclesUrl, vehicles, {
          reportType: 'temperature',
          params: `${periodQueryString}&downsampleSec=0`,
        }),
        daysCount,
      ])
    ))
    .then(reporter.prepareDataForReport)
    .then(reporter.createReport)
    .then(vehiclesReportData => {
      dispatch(_saveReportData(vehiclesReportData));
      dispatch(setLoader(false));
    })
    .catch(error => {
      dispatch(setLoader(false));
      console.error(error);
    });
}

function _saveGenerated(dispatch, getState) {
  const reportData = getSavedReportData(getState()).toArray();

  return reporter.createReport(reportData);
}

const _saveReportData = (reportData) => ({
  type: REPORT_DATA_SAVE,
  reportData,
});

function _reportRequest(baseVehiclesUrl, vehicles = [], {
  reportType = 'mileage',
  params,
} = {}) {
  const pathname = `report/${reportType}`;

  return Promise.all(vehicles.map(v => (
    api(`${baseVehiclesUrl}/${v.id}/${pathname}?${params}`)
      .then(toJson)
  )));
}

function toJson(response) {
  return response.json();
}
