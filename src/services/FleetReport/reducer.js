import {
  UPDATE_GENERAL_OVERVIEW,
  UPDATE_GENERAL_FUEL,
  UPDATE_FLEET_OVERVIEW,
  UPDATE_FLEET_FUEL_OVERVIEW,
  UPDATE_VEHICLES_OVERVIEW,
  CLEAR_FLEET_OVERVIEW,
  CLEAR_FUEL_OVERVIEW,
  SELECT_TIME_RANGE,
} from './actions';

const initialState = {
  selectedTimeRange: null,
  generalReport: {
    overviewReport: {},
    fuelUsageReport: {},
  },
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
    case UPDATE_GENERAL_OVERVIEW:
      return {
        ...state,
        generalReport: {
          ...state.generalReport,
          overviewReport: action.overview,
        },
      };
    case UPDATE_GENERAL_FUEL:
      return {
        ...state,
        generalReport: {
          ...state.generalReport,
          fuelUsageReport: action.overview,
        },
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
    case CLEAR_FLEET_OVERVIEW:
      return {
        ...state,
        overviewReport: initialState.overviewReport,
      };
    case CLEAR_FUEL_OVERVIEW:
      return {
        ...state,
        fuelUsageReport: initialState.fuelUsageReport,
      };
    default:
      return state;
  }
}
export default reducer;

export const getGeneralReport = state =>
state.get('fleetReport').generalReport;

export const getFleetOverview = state =>
  state.get('fleetReport').overviewReport;

export const getFleetFuelOverview = state =>
  state.get('fleetReport').fuelUsageReport;

export const getOverviewRange = state =>
  state.get('fleetReport').selectedTimeRange;
