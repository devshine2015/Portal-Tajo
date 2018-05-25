// import moment from 'moment';
import { api } from 'utils/api';
import endpoints from 'configs/endpoints';
import {
  makeTimeRangeParams,
} from 'utils/dateTimeUtils';
import { getVehiclesExSorted } from '../../../services/FleetModel/reducer';

export const UPDATE_VEHICLE_FUEL_REPORT = 'upVehFuel';
export const VEHICLE_FUEL_REPORT_LOADING = 'upVehFuelLoad';
export const UPDATE_VEHICLE_FUEL_REPORT_TIME = 'upVehRange';

export const fetchVehicleFuelReport = (vehicleId, timeRange) => (dispatch) => {
  const params = { ...makeTimeRangeParams(timeRange.fromDate, timeRange.toDate),
    tzoffset: 0,
  };
  const localReportsData = {};
  const { url, method } = endpoints.getVehicleFuelReport(vehicleId, params);

  dispatch(_setLoading(true));
  return api[method](url)
    .then(response => response.json())
    .then((reportData) => {
      localReportsData[vehicleId] = reportData;
    })
    .then(() => {
      dispatch(_setVehicleFuelReportTime(timeRange));
      dispatch(_setLoading(false));
      dispatch(_setVehicleFuel(localReportsData));
      Promise.resolve({ ready: true });
    });

  // return Promise.all(
  //   urls.map(({ url, method, id }) =>
  //     api[method](url)
  //       .then(response => response.json())
  //       .then((reportData) => {
  //         localReportsData[id] = reportData;
  //       }),
  //   ),
  // )
  //   .then(() => {
  //     dispatch(_setVehicleFuelReportTime(timeRange));
  //     dispatch(_setLoading(false));
  //     dispatch(_setVehicleFuel(localReportsData));
  //   });
};

const _setVehicleFuel = reportData => ({
  type: UPDATE_VEHICLE_FUEL_REPORT,
  consumption: reportData,
});

const _setVehicleFuelReportTime = timeRange => ({
  type: UPDATE_VEHICLE_FUEL_REPORT_TIME,
  timeRange,
});

const _setLoading = isLoading => ({
  type: VEHICLE_FUEL_REPORT_LOADING,
  isLoading,
});
