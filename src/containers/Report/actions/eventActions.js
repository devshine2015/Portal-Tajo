import moment from 'moment';
import api from 'utils/api';
import endpoints from 'configs/endpoints';
import { requestSamplesLimit } from 'configs';
import reporter from 'utils/reports';
import { setLoader } from './loaderActions';
import getVehiclesForReport from '../utils/reportVehicles';
import { getReportParams } from '../utils/prepareReport';
import calculateVehicleRows from '../specs/events';
import { getVehiclesAmount } from 'services/FleetModel/reducer';
import {
  getSelectedEvents,
  getAvailableEvents,
  getSelectedVehiclesAmount,
} from '../reducer';

export const EVENT_SELECTED_ADD = 'portal/Report/EVENT_SELECTED_ADD';
export const EVENT_SELECTED_REMOVE = 'portal/Report/EVENT_SELECTED_REMOVE';
export const EVENT_ALLOW_PICK_MORE = 'portal/Report/EVENT_ALLOW_PICK_MORE';

export const addSelectedEvent = index => ({
  type: EVENT_SELECTED_ADD,
  index,
});

export const removeSelectedEvent = index => ({
  type: EVENT_SELECTED_REMOVE,
  index,
});

export const allowPickMore = allow => (dispatch, getState) =>
  _allowPickMore(allow, dispatch, getState);

export const getRawEvents = params => (dispatch, getState) =>
  _generateRawReport(params, dispatch, getState);

function _generateRawReport({ timePeriod, frequency, dateFormat }, dispatch, getState) {
  dispatch(setLoader(true));

  const dateFormatWithTime = `${dateFormat} HH:mm:ss`;
  const vehiclesForRequest = getVehiclesForReport(getState());
  const selectedEvents = _getEvents(getState);
  const periodParamsWithOptions = Object.assign({}, getReportParams(timePeriod), {
    max: requestSamplesLimit,
    filter: 'PG',
    // no need to pass tzoffset - from/to already in UTC
    // tzoffset: new Date().getTimezoneOffset(),
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
          name: v.original.name,
          licensePlate: v.original.licensePlate,
          selectedEvents,
        }));
    })
  )
  .then((events = []) => {
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
    const startTime = moment(periodParamsWithOptions.from).format(dateFormatWithTime);
    const endTime = moment(periodParamsWithOptions.to).format(dateFormatWithTime);
    const fileName = `events for period [${startTime} - ${endTime}]`;

    events.forEach(event => {
      if (!event) return;

      rows = rows.concat(event);
    });

    dispatch(setLoader(false));

    return reporter(rows, headers, { fileName });
  }, error => {
    console.warn(error);
    dispatch(setLoader(false));
  });
}

function _getEvents(getState) {
  const availableEvents = getAvailableEvents(getState());
  const selectedIndexies = getSelectedEvents(getState());

  // pick eventTypes and make single array of them
  return selectedIndexies
    .map(selectedIndex => availableEvents.get(selectedIndex).eventTypes)
    .reduce((prev, next) => prev.concat(next));
}

function _allowPickMore(forced, dispatch, getState) {
  if (forced) {
    dispatch(_allow(true, forced));
  } else {
    const selectedVehiclesAmount = getSelectedVehiclesAmount(getState());
    const vehiclesAmount = getVehiclesAmount(getState());
    const allow = (selectedVehiclesAmount === 0 && vehiclesAmount <= 3) ||
                  (selectedVehiclesAmount > 0 && selectedVehiclesAmount <= 3);

    dispatch(_allow(allow, forced));
  }
}

const _allow = (allow, forced) => ({
  type: EVENT_ALLOW_PICK_MORE,
  allow,
  forced,
});
