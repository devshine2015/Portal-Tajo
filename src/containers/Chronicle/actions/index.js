// import moment from 'moment';
import api from 'utils/api.next';
import endpoints from 'configs/endpoints';
// import { setLoader } from './loaderActions';
import createHistoryFrame from './../utils/chronicleVehicleFrame';
import { getChronicleTimeFrame } from './../reducer';

export const CHRONICLE_ITEM_NEW_FRAME = 'chronicle/newFrame';
export const CHRONICLE_SET_T = 'chronicle/setT';
export const CHRONICLE_SET_TIMEFRAME = 'chronicle/setTimeFrame';
export const CHRONICLE_VALIDATE_TIMEFRAME = 'chronicle/validateTimeFrame';

export const requestHistory = (vehicleId, dateFrom, dateTo) => dispatch =>
  _requestHistory(vehicleId, dateFrom, dateTo, dispatch);

export const setChronicleNormalizedT = (normalized100T) => (dispatch) => {
  dispatch(_chronicleSetT(normalized100T));
};
export const setChronicleTimeFrame = (dateFrom, dateTo) => (dispatch, getState) => {
  // TODO: fix dates comparison (use moments?)
  //
  if (getChronicleTimeFrame(getState()).fromDate === dateFrom) {
    return;
  }
  dispatch(_chronicleSetTimeFrame(dateFrom, dateTo));
  dispatch(_chronicleValidateTimeFrame());
  dispatch(_chronicleSetT(0));
};

function _requestHistory(vehicleId, dateFrom, dateTo, dispatch) {
//  dispatch(setLoader(true));
// TODO: properly generate from and to
//  const fromString = '2016-08-21T04:38:32.000+0000';// date.toString();
  let fromString = dateFrom.toISOString();
  fromString = fromString.slice(0,-1) + '+0000';
  let toString = dateTo.toISOString();
  toString = toString.slice(0,-1) + '+0000';

  const { url, method } = endpoints.getEventsInTimeRange(vehicleId, {
    from: fromString,
    to: toString,
    max: 20000,
    filter: 'PG',
  });
  // setting loading state for local frame
  dispatch(_newVehicleChronicleFrame(vehicleId,
    createHistoryFrame(dateFrom, dateTo, null, true)));
  // const fromString = moment(date).format();
  // const toString = moment(date).add(1, 'days').format();
//  const toString = '2016-08-22T04:38:32.000+0000';// date.toString();

  return api[method](url)
    .then(toJson)
    .then(events =>
      dispatch(_newVehicleChronicleFrame(vehicleId,
              createHistoryFrame(dateFrom, dateTo, events)))
    );
}

function toJson(response) {
  return response.json();
}

const _newVehicleChronicleFrame = (vehicleId, chronicleFrame) => ({
  type: CHRONICLE_ITEM_NEW_FRAME,
  vehicleId,
  chronicleFrame,
});

const _chronicleSetT = (normalized100T) => ({
  type: CHRONICLE_SET_T,
  normalized100T,
});

const _chronicleSetTimeFrame = (dateFrom, dateTo) => ({
  type: CHRONICLE_SET_TIMEFRAME,
  dateFrom,
  dateTo,
});

const _chronicleValidateTimeFrame = () => ({
  type: CHRONICLE_VALIDATE_TIMEFRAME,
});
