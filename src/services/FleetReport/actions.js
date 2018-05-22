import { api } from 'utils/api';
import endpoints from 'configs/endpoints';
import {
  makeTimeRangeParams,
} from 'utils/dateTimeUtils';
import dealerSelectors from 'services/Dealer/selectors';


export const UPDATE_FLEET_OVERVIEW = 'UPDATE_FLEET_OVERVIEW';
export const UPDATE_FLEET_FUEL_OVERVIEW = 'UPDATE_FLEET_FUEL_OVERVIEW';
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
      dispatch(_setFleetOverviewData(overview));
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
      dispatch(_setFleetFuelData(overview));
      dispatch(_setFleetFuelAlerts(overview.alerts));
      Promise.resolve({ ready: true });
    });
};


const _setFleetOverviewData = data => ({
  type: UPDATE_FLEET_OVERVIEW,
  overview: data,
});

const _setFleetFuelData = data => ({
  type: UPDATE_FLEET_FUEL,
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

export const clearFleetOverview = () => ({
  type: CLEAR_FLEET_OVERVIEW,
});
