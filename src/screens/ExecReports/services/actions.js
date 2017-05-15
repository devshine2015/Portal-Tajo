// import moment from 'moment';
import { api } from 'utils/api';
import endpoints from 'configs/endpoints';
import { requestSamplesLimit } from 'configs';
// import { setLoader } from './loaderActions';
import createReportFrame from './../utils/reportVehicleFrame';
// import { getReportTimeFrame } from './reducer';

export const EXEC_REPORT_ITEM_NEW_FRAME = 'exReport/newFrame';

export const requestSoloReport = (vehicleId, dateFrom, dateTo) => dispatch =>
  _requestSoloReport(vehicleId, dateFrom, dateTo, dispatch);

// export const setChronicleTimeFrame = (dateFrom, dateTo) => (dispatch, getState) => {
//   // TODO: fix dates comparison (use moments?)
//   //
//   if (getChronicleTimeFrame(getState()).fromDate === dateFrom) {
//     return;
//   }
//   dispatch(_chronicleSetTimeFrame(dateFrom, dateTo));
//   dispatch(_chronicleValidateTimeFrame());
//   dispatch(setChronicleNormalizedT(0));
// };

function _requestSoloReport(vehicleId, dateFrom, dateTo, dispatch) {
//  dispatch(setLoader(true));
// TODO: properly generate from and to
//  const fromString = '2016-08-21T04:38:32.000+0000';// date.toString();
  let fromString = dateFrom.toISOString();
  fromString = `${fromString.slice(0, -1)}+0000`;
  let toString = dateTo.toISOString();
  toString = `${toString.slice(0, -1)}+0000`;

  const { url, method } = endpoints.getEventsInTimeRange(vehicleId, {
    from: fromString,
    to: toString,
    max: requestSamplesLimit,
    filter: 'PG',
    // tzoffset: new Date().getTimezoneOffset(),
  });
  // setting loading state for local frame
  dispatch(_newVehicleChronicleFrame(vehicleId,
    createReportFrame(dateFrom, dateTo, null, true)));
  // const fromString = moment(date).format();
  // const toString = moment(date).add(1, 'days').format();
//  const toString = '2016-08-22T04:38:32.000+0000';// date.toString();

  return api[method](url)
    .then(data => data.json())
    .then(events =>
      dispatch(_newVehicleChronicleFrame(vehicleId,
              createReportFrame(dateFrom, dateTo, events))),
    );
}

const _newVehicleChronicleFrame = (vehicleId, reportFrame) => ({
  type: EXEC_REPORT_ITEM_NEW_FRAME,
  vehicleId,
  reportFrame,
});

// const _chronicleSetTimeFrame = (dateFrom, dateTo) => ({
//   type: CHRONICLE_SET_TIMEFRAME,
//   dateFrom,
//   dateTo,
// });

// const _chronicleValidateTimeFrame = () => ({
//   type: CHRONICLE_VALIDATE_TIMEFRAME,
// });
