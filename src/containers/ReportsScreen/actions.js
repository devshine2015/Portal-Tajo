import api from 'utils/api';
import { prepareDataForReport, createReport } from './reporter';

export const generateReport = (timePeriod) => (dispatch, getState) => {
  _generateReport(timePeriod, dispatch, getState);
};

function _generateReport(timePeriod, dispatch, getState) {
  const fleet = getState().getIn(['global', 'fleet']);
  const baseVehiclesUrl = `${fleet}/vehicles`;
  const tzoffset = new Date().getTimezoneOffset();
  const {
    to,
    from,
    daysCount,
  } = periodForReport(timePeriod);
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
    .catch(error => {
      console.error(error);
    });
}

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

function periodForReport({ from, to } = {}) {
  const fromPlus = new Date(from);
  const toPlus = new Date(to).setSeconds(1);
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
