// import moment from 'moment';
import { api } from 'utils/api';
import endpoints from 'configs/endpoints';
import { requestSamplesLimit, isMwa } from 'configs';
import { getVehicleByIdFunc } from 'services/FleetModel/reducer';
import createHistoryFrame from './../utils/chronicleVehicleFrame';
import { getChronicleTimeFrame } from './../reducer';

import { mwaFetchChronicleJobs } from 'services/MWA/actions';
import { trip as trip11 } from './demo/vehicle1-trip1';
import { trip as trip12 } from './demo/vehicle1-trip2';

export const CHRONICLE_ITEM_NEW_FRAME = 'chronicle/newFrame';
export const CHRONICLE_SET_T = 'chronicle/setT';
export const CHRONICLE_SET_TIMEFRAME = 'chronicle/setTimeFrame';
export const CHRONICLE_VALIDATE_TIMEFRAME = 'chronicle/validateTimeFrame';

export const CHRONICLE_MWA_JOBS = 'chronicle/mwaJobs';

export const requestHistory = (vehicleId, dateFrom, dateTo) => (dispatch, getState) =>
  _requestHistory(vehicleId, dateFrom, dateTo, dispatch, getState);

export const setChronicleNormalizedT = normalized100T => ({
  type: CHRONICLE_SET_T,
  normalized100T,
});
export const setChronicleTimeFrame = (dateFrom, dateTo) => (dispatch, getState) => {
  // TODO: fix dates comparison (use moments?)
  //
  if (getChronicleTimeFrame(getState()).fromDate === dateFrom
      && getChronicleTimeFrame(getState()).toDate === dateTo) {
    return;
  }
  dispatch(_chronicleSetTimeFrame(dateFrom, dateTo));
  dispatch(_chronicleValidateTimeFrame());
  dispatch(setChronicleNormalizedT(0));
};

function _requestHistory(vehicleId, dateFrom, dateTo, dispatch, getState) {
// TODO: properly generate from and to
//  const fromString = '2016-08-21T04:38:32.000+0000';// date.toString();
  let fromString = dateFrom.toISOString();
  fromString = `${fromString.slice(0, -1)}+0000`;
  let toString = dateTo.toISOString();
  toString = `${toString.slice(0, -1)}+0000`;

  const theVehicle = getVehicleByIdFunc(getState())(vehicleId);

  const { url, method } = endpoints.getEventsInTimeRange(vehicleId, {
    from: fromString,
    to: toString,
    max: requestSamplesLimit,
    filter: 'PG',
  });

  dispatch(_newVehicleChronicleFrame(vehicleId,
    createHistoryFrame(dateFrom, dateTo, theVehicle, null, true)));

  // console.log(trip12);
  // return dispatch(_newVehicleChronicleFrame(vehicleId,
  //   createHistoryFrame(dateFrom, dateTo, theVehicle, trip12)))
  return api[method](url)
    .then(toJson)
    .then(events => {
      console.log(events);
      dispatch(_newVehicleChronicleFrame(vehicleId,
        createHistoryFrame(dateFrom, dateTo, theVehicle, events)));
    }
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

const _chronicleSetTimeFrame = (dateFrom, dateTo) => ({
  type: CHRONICLE_SET_TIMEFRAME,
  dateFrom,
  dateTo,
});

const _chronicleValidateTimeFrame = () => ({
  type: CHRONICLE_VALIDATE_TIMEFRAME,
});

export const chronicleMWAJobs = (vehicleId, mwaJobs) => ({
  type: CHRONICLE_MWA_JOBS,
  vehicleId,
  mwaJobs,
});
