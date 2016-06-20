import api from 'utils/api';
import { prepareDataForReport, createReport } from 'utils/reports';

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
  const tzoffset = 0;
  const {
    to,
    from,
    daysCount,
  } = _periodForReport(timePeriod, isOneDay);
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

function _periodForReport({ fromTs, toTs } = {}, isOneDay = false) {
  const toPlusTs = _generateToDate(fromTs, toTs, isOneDay);
  const dt = (toPlusTs - fromTs) / (1000 * 60 * 60 * 24);
  const offsetInMinutes = new Date().getTimezoneOffset();
  const offsetInMilliseconds = 1000 * 60 * offsetInMinutes;
  let daysCount;

  if (dt < 1) {
    daysCount = 1;
  } else {
    daysCount = parseInt(dt, 10) + 1;
  }

  return {
    daysCount,
    to: _formateDate(toPlusTs, offsetInMilliseconds),
    from: _formateDate(fromTs),
  };
}

// Just formatting to ISO string. Keep actual date and time values
function _formateDate(dateTs, offsetInMilliseconds = 0) {
  const dateISO = new Date(dateTs - offsetInMilliseconds).toISOString();

  return `${dateISO.slice(0, -1)}+0000`;
}

function _generateToDate(fromTs, toTs, isOneDay = false) {
  let result;

  if (isOneDay) {
    result = new Date(fromTs);
    result.setHours(23);
    result.setMinutes(59);
    result.setSeconds(59);
  } else {
    // add one second to count day amount
    result = new Date(toTs);
    result.setSeconds(1);
  }

  return result.getTime();
}
