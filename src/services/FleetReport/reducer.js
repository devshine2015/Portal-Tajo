import {
  UPDATE_FLEET_OVERVIEW,
  UPDATE_FLEET_FUEL_OVERVIEW,
  // CLEAR_FLEET_OVERVIEW,
  SELECT_TIME_RANGE,
} from './actions';

const initialState = {
  selectedTimeRange: null,
  overviewReport: {
    vehicleCount: 0,
    reportingVehicleCount: 0,
    totalDistance: 0,
    avgSpeed: 0,
    totalRunningTime: 0,
    totalDrivingTime: 0,
    totalIdleTime: 0,
    totalIdleFuelUsed: 0,
  },
  fuelUsageReport: {
    totalConsumption: 0,
    vehicleCount: 0,
    totalLoss: 0,
    totalGain: 0,
    alerts: [],
  },
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_FLEET_OVERVIEW:
      return {
        ...state,
        overviewReport: action.overview,
      };
    case UPDATE_FLEET_FUEL_OVERVIEW:
      return {
        ...state,
        fuelUsageReport: action.fuelOverview,
      };
    case SELECT_TIME_RANGE:
      return {
        ...state,
        selectedTimeRange: action.timeRange,
      };
    default:
      return state;
  }
}
export default reducer;

export const getFleetOverview = state =>
  state.get('fleetReport').overviewReport;

export const getFleetFuelOverview = state =>
  state.get('fleetReport').fuelUsageReport;

export const getOverviewRange = state =>
  state.get('fleetReport').selectedTimeRange;
