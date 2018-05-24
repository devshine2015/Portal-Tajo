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
export const UPDATE_VEHICLES_OVERVIEW = 'UPDATE_VEHICLES_OVERVIEW';
export const CLEAR_FLEET_OVERVIEW = 'CLEAR_FLEET_OVERVIEW';
export const UPDATE_FLEET_FUEL_ALERTS = 'UPDATE_FLEET_FUEL_ALERTS';
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
      dispatch(setFleetOverviewData(overview));
      dispatch(setVehiclesOverviewData(overview.vehicleOverviews));
      dispatch(setGeneralOverviewData(overview));
      Promise.resolve({ ready: true });
    });
};

export const fetchFleetFuelStats = timeRange => (dispatch, getState) => {
  const fuelParams = makeTimeParams(timeRange);
  const selectedSubFleet = dealerSelectors.getSelectedSubFleet(getState());
  if (selectedSubFleet) {
    fuelParams.subFleetId = selectedSubFleet;
  }
  const { url, method } = endpoints.getFleetFuel(fuelParams);

  return api[method](url)
    .then(response => response.json())
    .then((overview) => {
      dispatch(setFleetFuelData(overview));
      dispatch(_setFleetFuelAlerts(overview.alerts));
      dispatch(setGeneralFuelData(overview));
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
export const setFleetOverviewData = data => ({
  type: UPDATE_FLEET_OVERVIEW,
  overview: data,
});
export const setVehiclesOverviewData = data => ({
  type: UPDATE_VEHICLES_OVERVIEW,
  overview: data,
});


const setFleetFuelData = data => ({
  type: UPDATE_FLEET_FUEL_OVERVIEW,
  fuelOverview: data,
});

const _setFleetFuelAlerts = alerts => ({
  type: UPDATE_FLEET_FUEL_ALERTS,
  alerts,
});

export const changeTimeRange = data => ({
  type: SELECT_TIME_RANGE,
  timeRange: data,
});

export const clearOverview = () => ({
  type: CLEAR_FLEET_OVERVIEW,
});
