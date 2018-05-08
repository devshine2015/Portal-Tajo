// import moment from 'moment';
import { api } from 'utils/api';
import endpoints from 'configs/endpoints';
import { requestSamplesLimit, isMwa } from 'configs';
import { getVehicleByIdFunc } from 'services/FleetModel/reducer';
import createHistoryFrame from './../utils/chronicleVehicleFrame';
import { getChronicleTimeFrame } from './../reducer';

import { trip as trip11 } from './demo/vehicle1-trip1';
import { trip as trip12 } from './demo/vehicle1-trip2';
import { trip as trip21 } from './demo/vehicle2-trip1';

export const CHRONICLE_CLEAR_FRAMES = 'chronicle/clearFrames';
export const CHRONICLE_ITEM_NEW_FRAME = 'chronicle/newFrame';
export const CHRONICLE_SET_T = 'chronicle/setT';
export const CHRONICLE_SET_TIMEFRAME = 'chronicle/setTimeFrame';
export const CHRONICLE_VALIDATE_TIMEFRAME = 'chronicle/validateTimeFrame';

export const CHRONICLE_MWA_JOBS = 'chronicle/mwaJobs';

export const requestHistory = (vehicleId, selectedTrip, dateFrom, dateTo) => (dispatch, getState) =>
  _requestHistory(vehicleId, selectedTrip, dateFrom, dateTo, dispatch, getState);

export const setChronicleNormalizedT = normalized100T => ({
  type: CHRONICLE_SET_T,
  normalized100T,
});
export const setChronicleTimeFrame = (dateFrom, dateTo) => (dispatch, getState) => {
  dispatch(_chronicleSetTimeFrame(dateFrom, dateTo));
  dispatch(_chronicleValidateTimeFrame());
  dispatch(setChronicleNormalizedT(0));
};

function _requestHistory(vehicleId, selectedTrip, dateFrom, dateTo, dispatch, getState) {

  dispatch(_chronicleClearTimeFrames());

  const theVehicle = getVehicleByIdFunc(getState())(vehicleId);

  dispatch(_newVehicleChronicleFrame(vehicleId,
    createHistoryFrame(dateFrom, dateTo, theVehicle, null, true)));
  if (selectedTrip === 'trip11') {
    console.log('1');
    return dispatch(_newVehicleChronicleFrame(vehicleId,
      createHistoryFrame(new Date("2018-05-03T15:09:57.000+0000"), new Date("2018-05-03T15:38:21.000+0000"), theVehicle, trip11)))
  } else if (selectedTrip === 'trip12') {
    console.log('2');
    return dispatch(_newVehicleChronicleFrame(vehicleId,
      createHistoryFrame(new Date("2018-05-03T15:38:21.000+0000"), new Date("2018-05-03T16:53:49.000+0000"), theVehicle, trip12)))
  } else if (selectedTrip === 'trip21') {
    console.log('3');
    return dispatch(_newVehicleChronicleFrame(vehicleId,
      createHistoryFrame(new Date("2018-05-04T03:55:35.000+0000"), new Date("2018-05-04T05:02:21.000+0000"), theVehicle, trip21)))
  }
  return null;

  // return dispatch(_newVehicleChronicleFrame(vehicleId,
  //   createHistoryFrame(dateFrom, dateTo, theVehicle, trip12)))
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
const _chronicleClearTimeFrames = () => ({
  type: CHRONICLE_CLEAR_FRAMES,
});

const _chronicleValidateTimeFrame = () => ({
  type: CHRONICLE_VALIDATE_TIMEFRAME,
});

export const chronicleMWAJobs = (vehicleId, mwaJobs) => ({
  type: CHRONICLE_MWA_JOBS,
  vehicleId,
  mwaJobs,
});
