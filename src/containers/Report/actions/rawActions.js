import moment from 'moment';
import api from 'utils/api';
import endpoints from 'configs/endpoints';
import reporter from 'utils/reports';
import { setLoader } from './loaderActions';
import getVehiclesForReport from '../utils/reportVehicles';
import { getReportParams } from '../utils/prepareReport';
import calculateVehicleRows from '../specs/events';

export const getRawEvents = params => (dispatch, getState) =>
  _generateRawReport(params, dispatch, getState);

function _generateRawReport({ timePeriod, frequency, dateFormat }, dispatch, getState) {
  dispatch(setLoader(true));

  const dateFormatWithTime = `${dateFormat} HH:mm:ss`;
  const vehiclesForRequest = getVehiclesForReport(getState());
  const periodParamsWithOptions = Object.assign({}, getReportParams(timePeriod), {
    max: 20000,
    filter: 'PG',
  });

  return Promise.all(
    vehiclesForRequest.map(v => {
      const {
        url,
        method,
        apiVersion,
      } = endpoints.getEventsInTimeRange(v.id, periodParamsWithOptions);

      return api[method](url, { apiVersion })
        .then(res => res.json())
        .then(calculateVehicleRows({
          dateFormat: dateFormatWithTime,
          name: v.name,
          licensePlate: v.licensePlate,
        }));
    })
  )
  .then((vehicles = []) => {
    const headers = [
      'License Plate',
      'Vehicle Name',
      'Type',
      'Time',
      'Position',
      'Speed',
      'Additional Info',
    ];
    let rows = [];
    const startTime = moment.utc(periodParamsWithOptions.from).format(dateFormatWithTime);
    const endTime = moment.utc(periodParamsWithOptions.to).format(dateFormatWithTime);
    const fileName = `events for period [${startTime} - ${endTime}]`;

    vehicles.forEach(vehicle => {
      rows = rows.concat(vehicle);
    });

    dispatch(setLoader(false));

    return reporter(rows, headers, { fileName });
  }, error => {
    console.warn(error);
    dispatch(setLoader(false));
  });
}
