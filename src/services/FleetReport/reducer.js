import {
  UPDATE_FLEET_OVERVIEW,
  UPDATE_FLEET_FUEL_OVERVIEW,
  // CLEAR_FLEET_OVERVIEW,
  SELECT_TIME_RANGE,
} from './actions';

const initialState = {
  // avgSpeed: 0,
  // idleOver: 0,
  // idleUnder: 0,
  // normalDriving: 0,
  // totalDistance: 0,
  // totalDrivingTime: 0,
  // totalIdleTime: 0,
  // totalIdleFuelUsed: 0,
  // totalRunningTime: 0,
  // vehicleCount: 0,
  // totalFuel: 0,
  // totalGain: 0,
  // totalLoss: 0,
  selectedTimeRange: null,
  overviewReport: null,
  fuelUsageReport: null,
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
    // case CLEAR_FLEET_OVERVIEW:
    //   return initialState;
    default:
      return state;
  }
}
export default reducer;

const _fleetOverviewSlice = state =>
  state.get('fleetReport');

export const getFleetOverview = state =>
  _fleetOverviewSlice(state).toJS();
