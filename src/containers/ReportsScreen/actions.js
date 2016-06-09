import api from 'utils/api';
import createBook from './spreadsheetGenerator';

export const generateReport = (data) => (dispatch, getState) => {
  _generateReport(data, dispatch, getState);
};

function _generateReport(data, dispatch, getState) {
  const fleet = getState().getIn(['global', 'fleet']);
  const baseVehiclesUrl = `${fleet}/vehicles`;

  api(baseVehiclesUrl)
    .then(toJson)
    .then(vehicles => _allVehiclesMileage(baseVehiclesUrl, vehicles))
    .then(_prepareReport)
    .catch(error => {
      console.error(error);
    });
}

function _prepareReport(vehiclesReportData) {
  // Here the data we can output now
  const headers = [
    'Vehicle name',
    'Date',
    'Driving Distance',
    'Max Temp.',
    'Min Temp.',
    'Average Temp.',
  ];

  createBook(headers, vehiclesReportData);
}

function _allVehiclesMileage(baseVehiclesUrl, vehicles) {
  const request = Promise.all(vehicles.map(v => {
    return api(`${baseVehiclesUrl}/${v.id}/report/mileage?from=2016-05-21T04:38:32.000+0000&to=2016-05-23T04:39:14.000+0000&tzoffset=120`)
            .then(toJson);
  }));

  return request;
}

function toJson(response) {
  return response.json();
}
