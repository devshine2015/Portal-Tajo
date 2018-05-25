import { api } from 'utils/api';
import endpoints from 'configs/endpoints';
import {
  makeTimeRangeParams,
} from 'utils/dateTimeUtils';
import dealerSelectors from 'services/Dealer/selectors';
// import test from './test';

export const UPDATE_FLEET_OVERVIEW = 'UPDATE_FLEET_OVERVIEW';
export const UPDATE_GENERAL_OVERVIEW = 'UPDATE_GENERAL_OVERVIEW';
export const UPDATE_GENERAL_FUEL = 'UPDATE_GENERAL_FUEL';
export const UPDATE_FLEET_FUEL_OVERVIEW = 'UPDATE_FLEET_FUEL_OVERVIEW';
export const CLEAR_FLEET_OVERVIEW = 'CLEAR_FLEET_OVERVIEW';
export const CLEAR_FUEL_OVERVIEW = 'CLEAR_FUEL_OVERVIEW';
export const SELECT_TIME_RANGE = 'SELECT_TIMERANGE';

const makeTimeParams = timeRange => ({
  ...makeTimeRangeParams(timeRange.fromDate, timeRange.toDate),
  tzoffset: 0,
});

export const fetchFleetVehicleStats = timeRange => (dispatch) => {
  const overviewParams = makeTimeParams(timeRange);

  const { url, method } = endpoints.getFleetOverview(overviewParams);

  return api[method](url)
    .then(response => response.json())
    .then((overview) => {
      dispatch(setGeneralOverviewData(overview));
      dispatch(setFleetOverviewData(overview));
      Promise.resolve({ ready: true });
    });
};

export const fetchFleetFuelStats = timeRange => (dispatch, getState) => {
  const fuelParams = makeTimeParams(timeRange);

  const { url, method } = endpoints.getFleetFuel(fuelParams);

  return api[method](url)
    .then(response => response.json())
    .then((overview) => {
      dispatch(setFleetFuelData(overview));
      dispatch(setGeneralFuelData(overview));
      Promise.resolve({ ready: true });
    });
};

export const fetchVehicleFuelStats = (id, timeRange) => (dispatch, getState) => {
  const fuelParams = makeTimeParams(timeRange);
  const { url, method } = endpoints.getVehicleFuelReport(id, fuelParams);

  return api[method](url)
    .then(response => response.json())
    .then((fuelStats) => {
      dispatch(setFleetFuelData(fuelStats));
      Promise.resolve({ ready: true });
    });
};


const setGeneralOverviewData = data => ({
  type: UPDATE_GENERAL_OVERVIEW,
  overview: data,
});

const setGeneralFuelData = data => ({
  type: UPDATE_GENERAL_FUEL,
  overview: data,
});

export const setFleetFuelData = data => ({
  type: UPDATE_FLEET_FUEL_OVERVIEW,
  fuelOverview: data,
});

export const setFleetOverviewData = data => ({
  type: UPDATE_FLEET_OVERVIEW,
  overview: data,
});

export const changeTimeRange = data => ({
  type: SELECT_TIME_RANGE,
  timeRange: data,
});

export const clearOverview = () => ({
  type: CLEAR_FLEET_OVERVIEW,
});
export const clearFuelOverview = () => ({
  type: CLEAR_FUEL_OVERVIEW,
});
