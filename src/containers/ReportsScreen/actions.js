import api from 'utils/api';
import { prepareDataForReport, createReport } from './reporter';

export const REPORT_SCREEN_SET_LOADER = 'portal/ReportsScreen/REPORT_SCREEN_SET_LOADER';
export const REPORT_SCREEN_SET_REPORT_DATA = 'portal/ReportsScreen/REPORT_SCREEN_SET_REPORT_DATA';
export const REPORT_SCREEN_RESET_REPORT_DATA = 'portal/ReportsScreen/REPORT_SCREEN_RESET_REPORT_DATA';

export const generateReport = (timePeriod, isOneDay) => (dispatch, getState) => {
  _generateReport(timePeriod, isOneDay, dispatch, getState);
};
export const saveGenerated = () => (dispatch, getState) => {
  _saveGenerated(dispatch, getState);
};
export const resetReportData = () => ({
  type: REPORT_SCREEN_RESET_REPORT_DATA,
});

function _generateReport(timePeriod, isOneDay, dispatch, getState) {
  dispatch(_setLoader(true));
  dispatch(resetReportData());

  const fleet = getState().getIn(['global', 'fleet']);
  const baseVehiclesUrl = `${fleet}/vehicles`;
  const tzoffset = new Date().getTimezoneOffset();
  const {
    to,
    from,
    daysCount,
  } = periodForReport(timePeriod, isOneDay);
  const periodParam = `from=${from}&to=${to}&tzoffset=${tzoffset}`;

  api(baseVehiclesUrl)
    .then(toJson)
    .then(vehicles => (
      Promise.all([
        _reportRequest(baseVehiclesUrl, vehicles, {
          reportType: 'mileage',
          params: periodParam,
        }),
        _reportRequest(baseVehiclesUrl, vehicles, {
          reportType: 'temperature',
          params: `${periodParam}&downsampleSec=0`,
        }),
        daysCount,
      ])
    ))
    .then(prepareDataForReport)
    .then(createReport)
    .then(vehiclesReportData => {
      dispatch(_setReportData(vehiclesReportData));
      dispatch(_setLoader(false));
    })
    .catch(error => {
      dispatch(_setLoader(false));
      console.error(error);
    });
}

function _saveGenerated(dispatch, getState) {
  const reportData = getState().getIn(['reports', 'reportData']).toArray();

  createReport(reportData);
}

const _setLoader = (nextState) => ({
  type: REPORT_SCREEN_SET_LOADER,
  nextState,
});

const _setReportData = (reportData) => ({
  type: REPORT_SCREEN_SET_REPORT_DATA,
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

function periodForReport({ from, to } = {}, isOneDay = false) {
  const fromPlus = new Date(from);
  const toPlus = _generateToDate(from, to, isOneDay);
  const dt = (toPlus - fromPlus) / (1000 * 60 * 60 * 24);
  let daysCount;

  if (dt < 1) {
    daysCount = 1;
  } else {
    daysCount = parseInt(dt, 10) + 1;
  }

  return {
    daysCount,
    to: _formateDate(toPlus),
    from: _formateDate(fromPlus),
  };
}

function _formateDate(date) {
  const dateISO = new Date(date).toISOString();

  return `${dateISO.slice(0, -1)}+0000`;
}

function _generateToDate(fromDate, toDate, isOneDay = false) {
  let result;

  if (isOneDay) {
    result = new Date(fromDate);
    result.setHours(23);
    result.setMinutes(59);
    result.setSeconds(59);
  } else {
    // add one second to count day amount
    result = new Date(toDate);
    result.setSeconds(1);
  }

  return result;
}
