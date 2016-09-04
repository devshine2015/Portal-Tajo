import moment from 'moment';
import api from 'utils/api';
// import { setLoader } from './loaderActions';
import { getFleetName, getAuthenticationSession } from 'containers/App/reducer';
import createHistoryFrame from './../utils/chronicleVehicleFrame';

export const CHRONICLE_NEW_FRAME = 'chronicle/newFrame';
export const CHRONICLE_SET_T = 'chronicle/setT';

export const requestHistory = (inVehicleId, date) => (dispatch, getState) =>
  _requestHistory(inVehicleId, date, dispatch, getState);

export const setChronicleNormalizedT = (normalized100T) => (dispatch) => {
  dispatch(_chronicleSetT(normalized100T));
};

function _requestHistory(inVehicleId, date, dispatch, getState) {
//  dispatch(setLoader(true));
  const fleet = getFleetName(getState());
  const baseVehiclesUrl = `${fleet}/vehicles`;
  const vehicleId = inVehicleId;
// TODO: properly generate from and to
//  const fromString = '2016-08-21T04:38:32.000+0000';// date.toString();
  let fromString = date.toISOString();
  fromString = fromString.slice(0,-1) + '+0000';
  const dateTo = new Date(date);
  dateTo.setDate(dateTo.getDate()+1);
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
      const theFrame = createHistoryFrame(events, date, dateTo);
      dispatch(_newVehicleChronicleFrame(vehicleId, theFrame));
    });
}

function toJson(response) {
  return response.json();
}

const _newVehicleChronicleFrame = (vehicleId, chronicleFrame) => ({
  type: CHRONICLE_NEW_FRAME,
  vehicleId,
  chronicleFrame,
});

const _chronicleSetT = (normalized100T) => ({
  type: CHRONICLE_SET_T,
  normalized100T,
});
