// import moment from 'moment';
import api from 'utils/api';
// import { setLoader } from './loaderActions';
import { getAuthenticationSession } from 'services/Auth/reducer';
import { getFleetName } from 'services/Global/reducer';
import createHistoryFrame from './../utils/chronicleVehicleFrame';

export const CHRONICLE_ITEM_NEW_FRAME = 'chronicle/newFrame';
export const CHRONICLE_ITEM_SET_STATE = 'chronicle/state';
export const CHRONICLE_SET_T = 'chronicle/setT';
export const CHRONICLE_SET_TIMEFRAME = 'chronicle/setTimeFrame';
export const CHRONICLE_VALIDATE_TIMEFRAME = 'chronicle/validateTimeFrame';

// TODO: move to separate place, those dont really belong to actions...
export const CHRONICLE_LOCAL_INCTANCE_STATE_NONE = 'chronLocStateNone';
export const CHRONICLE_LOCAL_INCTANCE_STATE_LOADING = 'chronLocStateLoading';
export const CHRONICLE_LOCAL_INCTANCE_STATE_VALID = 'chronLocStateValid';

export const requestHistory = (inVehicleId, dateFrom, dateTo) => (dispatch, getState) =>
  _requestHistory(inVehicleId, dateFrom, dateTo, dispatch, getState);

export const setChronicleState = (vehicleId, chronicleState) => (dispatch) => {
  dispatch(_chronicleSetState(vehicleId, chronicleState));
};

export const setChronicleNormalizedT = (normalized100T) => (dispatch) => {
  dispatch(_chronicleSetT(normalized100T));
};
export const setChronicleTimeFrame = (dateFrom, dateTo) => (dispatch) => {
  dispatch(_chronicleSetTimeFrame(dateFrom, dateTo));
};
// TODO: this should be incapsulated in setTimeFrame
export const validateChronicleTimeFrame = () => (dispatch) => {
  dispatch(_chronicleValidateTimeFrame());
};

function _requestHistory(inVehicleId, dateFrom, dateTo, dispatch, getState) {
//  dispatch(setLoader(true));
  const vehicleId = inVehicleId;
  dispatch(_chronicleSetState(vehicleId, CHRONICLE_LOCAL_INCTANCE_STATE_LOADING));
  const fleet = getFleetName(getState());
  const baseVehiclesUrl = `${fleet}/vehicles`;
// TODO: properly generate from and to
//  const fromString = '2016-08-21T04:38:32.000+0000';// date.toString();
  let fromString = dateFrom.toISOString();
  fromString = fromString.slice(0,-1) + '+0000';
  let toString = dateTo.toISOString();
  toString = toString.slice(0,-1) + '+0000';

  // const fromString = moment(date).format();
  // const toString = moment(date).add(1, 'days').format();
//  const toString = '2016-08-22T04:38:32.000+0000';// date.toString();
  const sessionId = getAuthenticationSession(getState());
  const optionalHeaders = {
    ['DRVR-SESSION']: sessionId,
  };
  const requestUrl = baseVehiclesUrl + '/'
                            + vehicleId
                            + '/events?from=' + fromString
                            + '&to=' + toString
                            + '&max=20000'
                            + '&filter=PG';

  return api(requestUrl, { optionalHeaders })
    .then(toJson)
    .then(events => {
      const theFrame = createHistoryFrame(events, dateFrom, dateTo);
      dispatch(_newVehicleChronicleFrame(vehicleId, theFrame));
      dispatch(_chronicleSetState(vehicleId, CHRONICLE_LOCAL_INCTANCE_STATE_VALID));
    });
}

function toJson(response) {
  return response.json();
}

const _newVehicleChronicleFrame = (vehicleId, chronicleFrame) => ({
  type: CHRONICLE_ITEM_NEW_FRAME,
  vehicleId,
  chronicleFrame,
});

const _chronicleSetState = (vehicleId, chronicleState) => ({
  type: CHRONICLE_ITEM_SET_STATE,
  vehicleId,
  chronicleState,
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
