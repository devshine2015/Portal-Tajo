import { api } from 'utils/api';
import endpoints from 'configs/endpoints';
import {
  makeTimeRangeParams,
} from 'utils/dateTimeUtils';
import dealerSelectors from 'services/Dealer/selectors';


export const UPDATE_FLEET_OVERVIEW = 'upFleetOverView';
export const UPDATE_FLEET_FUEL = 'upFleetFuel';
export const CLEAR_FLEET_OVERVIEW = 'clearFleetOverview';
export const UPDATE_FLEET_FUEL_ALERTS = 'UPDATE_FLEET_FUEL_ALERTS';

const makeTimeParams = timeRange => ({
  ...makeTimeRangeParams(timeRange.fromDate, timeRange.toDate),
  tzoffset: 0,
});

export const fetchFleetVehicleStats = timeRange => (dispatch, getState) => {
  const overviewParams = makeTimeParams(timeRange);
  const selectedSubFleet = dealerSelectors.getSelectedSubFleet(getState());
  if (selectedSubFleet) {
    overviewParams.subFleetId = selectedSubFleet;
  }

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
  ...data,
});

const _setFleetFuelData = overview => ({
  type: UPDATE_FLEET_FUEL,
  totalFuel: overview.totalConsumption,
  totalGain: overview.totalGain,
  totalLoss: overview.totalLoss,
});

const _setFleetFuelAlerts = alerts => ({
  type: UPDATE_FLEET_FUEL_ALERTS,
  alerts,
});

export const clearFleetOverview = () => ({
  type: CLEAR_FLEET_OVERVIEW,
});

