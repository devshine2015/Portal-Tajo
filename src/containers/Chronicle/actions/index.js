import moment from 'moment';
import api from 'utils/api';
// import { setLoader } from './loaderActions';
import { getFleetName, getAuthenticationSession } from 'containers/App/reducer';
import createHistoryFrame from './../utils/HistoryVehicleFrame';

export const CHRONICLE_NEW_FRAME = 'chronicle/newFrame';

export const requestHistory = (inVehicleId, date) => (dispatch, getState) =>
  _requestHistory(inVehicleId, date, dispatch, getState);

function _requestHistory(inVehicleId, date, dispatch, getState) {
//  dispatch(setLoader(true));
  const fleet = getFleetName(getState());
  const baseVehiclesUrl = `${fleet}/vehicles`;
  // const periods = _getPeriods(timePeriod, frequency);
  // const periodQueryString = getReportParams(timePeriod);
//  const vehicles = _getVehiclesForReport(getState());
  const vehicleId = inVehicleId;
  const fromString = '2016-08-21T04:38:32.000+0000';// date.toString();
  const toString = '2016-08-22T04:38:32.000+0000';// date.toString();
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
      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const theFrame = createHistoryFrame(events, yesterday, today);
      dispatch(_newVehicleChronicleFrame(vehicleId, theFrame));
    });
}


function toJson(response) {
  return response.json();
}


// compose array of dates presented in period start to end
// result = [<date_as_ISO_string>]
function _getPeriods({
  start,
  end = undefined,
  startTime = undefined,
  endTime = undefined,
}, frequency) {
  const supportMultiPeriods = frequency !== undefined;
  const periods = [];
  let momentFrom;
  let momentTo;

  if (startTime) {
    momentFrom = _setTime(start, startTime);
  } else {
    momentFrom = moment(start);
  }

  if (end && endTime) {
    momentTo = _setTime(end, endTime);
  } else if (end) {
    momentTo = moment(momentFrom);
  } else if (endTime) {
    momentTo = _setTime(momentFrom, endTime);
  }

  periods.push(momentFrom);

  if (supportMultiPeriods) {
    const differ = frequency === 'daily' ? 'days' : 'hours';
    // because 01.00 AM.diff(00.00, 'hours') === 0
    // or 30.06.diff(29.06, 'days') === 0
    const periodsCount = momentTo.diff(momentFrom, differ) + 1;

    if (periodsCount !== 1) {
      for (let i = 0; i < periodsCount; i++) {
        momentFrom.add(1, differ);

        if (momentFrom.isBefore(momentTo)) {
          periods.push(momentFrom);
        }
      }

      periods[periods.length - 1] = momentTo;
    }
  } else {
    periods.push(momentTo);
  }

  return periods;
}

function _setTime(date, time) {
  const d = moment(date);

  return d.set({
    hour: time.getHours(),
    minute: time.getMinutes(),
    second: time.getSeconds(),
  });
}

const _newVehicleChronicleFrame = (vehicleId, chronicleFrame) => ({
  type: CHRONICLE_NEW_FRAME,
  vehicleId,
  chronicleFrame,
});
